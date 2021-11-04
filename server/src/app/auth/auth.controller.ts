import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Req,
  Res,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOAuth2, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ConfigService } from '../../config/config.service'
import { RESPONSE_401 } from '../../constant/swagger.constant'
import { JwtResolveGuard } from '../../guard/jwt-resolve.guard'
import { AuthService, REFRESH_TOKEN_COOKIE_KEY } from './auth.service'
import { FastifyRequest, FastifyReply } from 'fastify'

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludePrefixes: ['_'] })
@ApiTags('認証')
@ApiResponse(RESPONSE_401)
@ApiOAuth2(['auth:write'])
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {}

  @ApiOperation({ summary: 'Google認証画面にリダイレクト' })
  @UseGuards(AuthGuard('google'))
  @Get('google')
  googleAuth(@Req() req: FastifyRequest) {
    return
  }

  @ApiOperation({ summary: 'Google認証後のリダイレクト先' })
  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async googleAuthRedirect(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const { jwtRefreshToken } = await this.authService.authenticateWithPassport(req)

    const maxAge = this.configService.getNumber('JWT_SECRET_TOKEN_EXPIRATION_TIME') * 1000
    const secure = this.configService.isProduction
    res.setCookie(REFRESH_TOKEN_COOKIE_KEY, jwtRefreshToken, {
      maxAge,
      httpOnly: true,
      secure,
      path: '/auth',
      sameSite: 'strict',
    })
    const baseUrl = this.configService.getString('WEB_BASE_URL')
    res.code(302).redirect(`${baseUrl}/auth/callback`)
  }

  @ApiOperation({ summary: 'JWT Access Tokenのリフレッシュ' })
  @Get('refresh')
  async refreshAccessToken(@Req() req: FastifyRequest) {
    const jwtRefreshToken = req.cookies[REFRESH_TOKEN_COOKIE_KEY]
    const { jwtAccessToken, jwtAccessTokenMaxAge } = await this.authService.refreshAccessToken(jwtRefreshToken)
    return { accessToken: jwtAccessToken, accessTokenMaxAge: jwtAccessTokenMaxAge }
  }

  @ApiOperation({ summary: 'ログアウト' })
  @UseGuards(JwtResolveGuard)
  @Delete()
  async signOut(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    await this.authService.signOut(req)
    res.clearCookie(REFRESH_TOKEN_COOKIE_KEY)
    res.code(HttpStatus.OK).send({ accessToken: '' })
  }
}
