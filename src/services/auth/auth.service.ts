import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import {
  cookieConstants,
  cookieOptions,
  tomorrowDate,
} from 'src/utils/auth-utils/cookie_utils';
import fusionAuthClientConfig from 'src/utils/auth-utils/fusion_auth_client';
import { fusionAuth } from 'src/utils/constants';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  private readonly fusionAuthClient =
    fusionAuthClientConfig.getFusionAuthClient();

  async fusionOAuthRedirectFlow(req: Request, res: Response): Promise<void> {
    try {
      // The redirect of client browser request from fusion auth will contain a query parameter called code that contains the OAuth authorization code from FusionAuth
      // which we will use to get access Token
      const OAuthAuthorizationCode = req.query.code;
      this.logger.info(`Query code: ${OAuthAuthorizationCode}`);

      const accessTokenResponse =
        await this.fusionAuthClient.exchangeOAuthCodeForAccessToken(
          OAuthAuthorizationCode as string,
          fusionAuthClientConfig.getFusionClientId(),
          fusionAuthClientConfig.getFusionClientSecret(),
          process.env.BACKEND_ENV === 'development'
            ? fusionAuth.OAUTH_REDIRECT_URL
            : process.env.OAUTH_REDIRECT_URL,
        );

      const accesstoken = accessTokenResponse.response.access_token;
      try {
        const userObjResponseUsingJwt =
          await this.fusionAuthClient.retrieveUserUsingJWT(accesstoken);
        const userObj = userObjResponseUsingJwt.response.user;

        const refreshToken = await this.fusionAuthClient.retrieveRefreshTokens(
          userObj.id,
        );

        const tomorrowDateForCookieExpire = tomorrowDate();

        res.cookie(
          cookieConstants.ACCESS_TOKEN,
          accesstoken,
          cookieOptions(tomorrowDateForCookieExpire),
        );
        res.cookie(
          cookieConstants.REFRESH_TOKEN,
          refreshToken,
          cookieOptions(tomorrowDateForCookieExpire),
        );
      } catch (err) {
        console.error(err);
        throw new InternalServerErrorException('some thing went wrong');
      }
    } catch (err) {
      this.logger.error(
        `Error occured during fusion auth redirect flow. Error:${err}`,
      );
      throw new InternalServerErrorException(
        'Some error occured in fusion auth redirect flow',
      );
    }
  }
}
