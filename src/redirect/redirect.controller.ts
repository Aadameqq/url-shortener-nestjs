import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { RedirectIdDto } from './dto/redirect-id.dto';
import { UseAuth } from '../auth/use-auth.decorator';
import { GetAuthUser } from '../auth/get-auth-user.decorator';
import { Redirect } from './redirect.entity';
import { RedirectUrlDto } from './dto/redirect-url.dto';
import { RedirectDto } from './dto/redirect.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../user/user.entity';

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
    @GetAuthUser() user: User,
  ): Promise<RedirectIdDto> {
    const redirect = new Redirect(createRedirectDto.url, user);
    const { id } = await this.urlsService.create(user, redirect);

    return new RedirectIdDto(id);
  }

  @ApiBearerAuth('auth')
  @ApiOperation({ summary: "Reads all user's redirects" })
  @UseAuth()
  @Get()
  async readAll(@GetAuthUser() user: User): Promise<RedirectDto[]> {
    return user.redirects.map(
      ({ id, url, useCount }) => new RedirectDto(id, url, useCount),
    );
  }
}
