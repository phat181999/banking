import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthConfig {
    constructor(
        private configService: ConfigService
    ){}
    public issuer: string = this.configService.get<string>('OKTA_ORG_URL') + "oauth2/default";
    public clientId: string = this.configService.get<string>('OKTA_CLIENT_ID');
    public audience: string = this.configService.get<string>('OKTA_AUDIENCE');
}