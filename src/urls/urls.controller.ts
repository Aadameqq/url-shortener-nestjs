import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { RedirectUrlDto } from './dtos/redirect-url.dto';
import { UseAuth } from '../auth/use-auth.decorator';
import { CreateUrlDto } from './dtos/create-url.dto';
import { GetAuthUser } from '../auth/get-auth-user.decorator';
import { AuthUser } from '../auth/auth-user.entity';
import { Url } from './url.entity';

@Controller('urls')
export class UrlsController {
  constructor(private urlsService: UrlsService) {}
  @Redirect()
  @Get('/:id')
  async redirect(@Param() redirectDto: RedirectUrlDto) {
    const { id } = redirectDto;

    const url = await this.urlsService.getUrlById(id);

    return { statusCode: HttpStatus.FOUND, url };
  }
  @UseAuth()
  @Post()
  async create(
    @Body() createUrlDto: CreateUrlDto,
    @GetAuthUser() user: AuthUser,
  ) {
    const urlObject = new Url(undefined, createUrlDto.url, user.id);
    await this.urlsService.create(urlObject);

    return;
  }

  @UseAuth()
  @Get()
  async readAll(@GetAuthUser() user: AuthUser) {
    const allUrlObjects = await this.urlsService.readAllByOwnerId(user.id);

    return allUrlObjects.map(({ url, useCount }) => ({ url, useCount }));
  }
}
