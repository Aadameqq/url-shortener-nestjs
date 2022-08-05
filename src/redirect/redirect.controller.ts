import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { RedirectIdDto } from './dto/redirect-id.dto';
import { UseAuth } from '../auth/use-auth.decorator';
import { GetAuthUser } from '../auth/get-auth-user.decorator';
import { AuthUser } from '../auth/auth-user.entity';
import { Redirect } from './redirect.entity';
import { RedirectUrlDto } from './dto/redirect-url.dto';
import { RedirectDto } from './dto/redirect.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('redirects')
@ApiTags('Redirect')
export class RedirectController {
  constructor(private urlsService: RedirectService) {}
  @ApiOperation({ summary: 'Redirects to url with given id' })
  @ApiParam({ description: 'Redirect id', name: 'id' })
  @Get('/:id')
  async read(@Param() redirectIdDto: RedirectIdDto): Promise<RedirectUrlDto> {
    const { id } = redirectIdDto;

    const url = await this.urlsService.getUrlById(id);

    return new RedirectUrlDto(url);
  }
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Creates new redirection' })
  @UseAuth()
  @Post()
  async create(
    @Body() createRedirectDto: RedirectUrlDto,
    @GetAuthUser() user: AuthUser,
  ): Promise<RedirectIdDto> {
    const redirect = new Redirect(undefined, createRedirectDto.url, user.id);
    const { id } = await this.urlsService.create(redirect);

    return new RedirectIdDto(id);
  }

  @ApiBearerAuth('auth')
  @ApiOperation({ summary: "Reads all user's redirects" })
  @UseAuth()
  @Get()
  async readAll(@GetAuthUser() user: AuthUser): Promise<RedirectDto[]> {
    const allRedirects = await this.urlsService.readAllByOwnerId(user.id);

    return allRedirects.map(
      ({ id, url, useCount }) => new RedirectDto(id, url, useCount),
    );
  }
}
