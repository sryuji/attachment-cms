import { NuxtAppOptions } from '@nuxt/types'
import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime'
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AccountsRepository } from '../../repositories/accounts.repository'
import { AuthRepository } from '../../repositories/auth.repository'
import { ApiRepositories } from './api-repositories.interface'
import { ScopesRepository } from '~/repositories/scopes.repository'
import { ReleasesRepository } from '~/repositories/releases.repository'
import { ContentHistoriesRepository } from '~/repositories/content-histories.repository'

export default class ApiRepositoryFactory {
  private axios: NuxtAxiosInstance
  private app: NuxtAppOptions

  constructor(axios: NuxtAxiosInstance, config: NuxtRuntimeConfig, app: NuxtAppOptions) {
    if (!axios) throw new Error('Need axios instance')
    this.axios = this.initializeAxios(axios, config)
    this.app = app
  }

  createRepositories(): ApiRepositories {
    // TODO: ApiRepositoriesのintarfaceから自動生成させたい
    return {
      accounts: new AccountsRepository(this.axios, this.app),
      auth: new AuthRepository(this.axios, this.app),
      scopes: new ScopesRepository(this.axios, this.app),
      releases: new ReleasesRepository(this.axios, this.app),
      contentHistories: new ContentHistoriesRepository(this.axios, this.app),
    }
  }

  private initializeAxios(axios: NuxtAxiosInstance, config: NuxtRuntimeConfig) {
    return axios.create({
      baseURL: config.API_BASE_URL,
      headers: {
        common: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
      timeout: 3000,
      withCredentials: true,
      data: {},
    })
  }
}
