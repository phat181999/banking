import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-okta-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OktaStrategy extends PassportStrategy(Strategy, 'okta') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('OKTA_CLIENT_ID'),
      clientSecret: configService.get<string>('OKTA_CLIENT_SECRET'),
      callbackURL: configService.get<string>('OKTA_CALLBACK_URL'),
      issuer: configService.get<string>('OKTA_ISSUER'),
      authorizationURL: `${configService.get<string>('OKTA_ISSUER')}/v1/authorize`,
      tokenURL: `${configService.get<string>('OKTA_ISSUER')}/v1/token`,
      userInfoURL: `${configService.get<string>('OKTA_ISSUER')}/v1/userinfo`,
      scope: ['openid', 'profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    try {
      const user = { 
        id: profile.id, 
        email: profile.emails[0].value, 
        name: profile.displayName 
      };
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
