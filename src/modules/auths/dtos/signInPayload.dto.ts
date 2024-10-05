// import { ApiProperty } from '@nestjs/swagger';

import { CreateAccountDTO } from "src/modules/customers/dtos";
import { TokenPayloadDto } from "./tokenPayload.dto";


export class SignInPayloadDto {
//   @ApiProperty({ type: () => UserDto })
  readonly user: CreateAccountDTO;

//   @ApiProperty({ type: () => TokenPayloadDto })
  readonly token: TokenPayloadDto;

  // constructor(user: CreateAccountDTO, token: TokenPayloadDto) {
  //   this.user = user;
  //   this.token = token;
  // }
}
