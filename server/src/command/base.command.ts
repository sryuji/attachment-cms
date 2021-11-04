import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app/app.module'
import { INestApplication } from '@nestjs/common'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

export abstract class BaseCommand {
  protected app: INestApplication

  constructor(app?: INestApplication) {
    this.app = app
  }

  public async run(): Promise<void> {
    await this.bootstrap()
    await this.perform()
    await this.terminate()
  }

  public abstract perform(): Promise<void>

  protected async bootstrap() {
    if (this.app) return
    this.app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  }
  protected async terminate() {
    return
  }
}
