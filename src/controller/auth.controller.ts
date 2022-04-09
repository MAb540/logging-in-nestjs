import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AuthService } from 'src/services/auth/auth.service';
import { Logger } from 'winston';
import { fusionAuth } from 'src/utils/constants';
@Controller('/auth')
export class AuthController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {}

  @Get('/oauth-redirect')
  async oAuthRedirect(@Req() req: Request, @Res() res: Response) {
    try {
      await this.authService.fusionOAuthRedirectFlow(req, res);

      res.redirect(
        process.env.BACKEND_ENV === 'development'
          ? fusionAuth.FRONTEND_REDIRECT_URL
          : process.env.PROD_FRONTEND_REDIRECT_URL,
      );
    } catch (err) {
      this.logger.error(
        `Error occured in fusion auth redirection flow. Error=${err}`,
      );
      throw new InternalServerErrorException(
        'Some error occured in fusion auth redirect flow',
      );
    }
  }
}
