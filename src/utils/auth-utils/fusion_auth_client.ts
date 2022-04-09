import FusionAuthClient from '@fusionauth/typescript-client';
import { fusionAuth } from '../constants';

class FusionAuthClientConfigs {
  //   env_development =

  private clientId =
    process.env.BACKEND_ENV === 'development'
      ? fusionAuth.CLIENT_ID
      : process.env.CLIENT_ID;

  private clientSecret =
    process.env.BACKEND_ENV === 'development'
      ? fusionAuth.CLIENT_SECRET
      : process.env.CLIENT_SECRET;

  private fusionAuthURL = process.env.FUSION_AUTH_URL_DOCKER
    ? process.env.FUSION_AUTH_URL_DOCKER
    : process.env.BACKEND_ENV === 'development'
    ? fusionAuth.FUSION_AUTH_URL
    : process.env.FUSION_AUTH_URL;

  private client: FusionAuthClient;

  constructor() {
    this.client = new FusionAuthClient(
      process.env.BACKEND_ENV === 'development'
        ? fusionAuth.FUSION_AUTH_API_KEY
        : process.env.FUSION_AUTH_API_KEY,
      this.fusionAuthURL,
    );
  }

  getFusionClientId() {
    return this.clientId;
  }

  getFusionClientSecret() {
    return this.clientSecret;
  }

  getFusionAuthClient() {
    return this.client;
  }
}

const fusionAuthClientConfig = new FusionAuthClientConfigs();

export default fusionAuthClientConfig;
