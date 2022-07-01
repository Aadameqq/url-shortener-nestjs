import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class TokenManager {
  constructor(private configService: ConfigService) {}

  createToken = (data: any, expiresIn: string) => {
    const secret = this.configService.get('JWT_SECRET');
    return jwt.sign(data, secret, { expiresIn });
  };

  validateTokenAndFetchData = <T>(token: string): T | false => {
    const secret = this.configService.get('JWT_SECRET');

    try {
      return jwt.verify(token, secret) || false;
    } catch (err) {
      return false;
    }
  };
}
