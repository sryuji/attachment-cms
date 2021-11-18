import { NuxtAppOptions } from '@nuxt/types'
import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  BadRequestError,
  ForbiddenError,
  NetworkError,
  NotFoundError,
  RedirectError,
  ServerError,
  ServerValidationError,
  TimeoutError,
  UnauthorizedError,
} from '~/utils/errors'
import { authStore } from '~/store'
import { AUTH_ACCESS_TOKEN_HEADER } from '~/services/constants'

export default abstract class ApiRepository {
  private axios: NuxtAxiosInstance
  private app: NuxtAppOptions

  constructor(axios: NuxtAxiosInstance, app: NuxtAppOptions) {
    this.axios = axios
    this.app = app
  }

  protected get(url: string, config?: AxiosRequestConfig) {
    config = this.setDefaultConfig(config)
    return this.wrapRequest(this.axios.get(url, config))
  }

  protected post(url: string, data: any, config?: AxiosRequestConfig) {
    config = this.setDefaultConfig(config)
    return this.wrapRequest(this.axios.post(url, data, config))
  }

  protected patch(url: string, data: any, config?: AxiosRequestConfig) {
    config = this.setDefaultConfig(config)
    return this.wrapRequest(this.axios.patch(url, data, config))
  }

  protected del(url: string, config?: AxiosRequestConfig) {
    config = this.setDefaultConfig(config)
    return this.wrapRequest(this.axios.delete(url, config))
  }

  protected request(config: AxiosRequestConfig) {
    config = this.setDefaultConfig(config)
    return this.wrapRequest(this.axios.request(config))
  }

  private setDefaultConfig(config: AxiosRequestConfig, options?: { force: boolean }) {
    config = config || {}
    const force = options && options.force
    if (process.client) {
      config.headers = config.headers || {}
      const authToken = authStore.accessToken
      if (authToken && (force || !config.headers.Authorization)) {
        config.headers.Authorization = `Bearer ${authToken}`
      }
    }
    return config
  }

  private async wrapRequest(request: Promise<any>): Promise<any> {
    try {
      const response = await request
      this.applyServerInstruction(response)
      return Promise.resolve(response.data)
    } catch (error: any) {
      const data = await this.handleError(error)
      return Promise.resolve(data)
    }
  }

  private handleError(error: AxiosError): Promise<any> {
    const response = error.response
    const isTimeout = error.code === 'ECONNABORTED'

    if (isTimeout) throw new TimeoutError({ baseError: error })
    if (!response)
      throw new NetworkError({
        message: 'response is none. so NetworkError or request rejected Bug.',
        baseError: error,
      })

    const status = response.status
    const baseData = response.data
    if (status === 400) {
      throw new BadRequestError({ message: error.message, baseData })
    } else if (status === 401) {
      throw new UnauthorizedError({ message: error.message, baseData })
    } else if (status === 403) {
      throw new ForbiddenError({ message: error.message, baseData })
    } else if (status === 404) {
      throw new NotFoundError({ baseData })
    } else if (baseData && baseData.location) {
      throw new RedirectError({ baseData })
    } else if (status === 422) {
      throw new ServerValidationError({ message: error.message, baseData })
    } else {
      throw new ServerError({ message: error.message, baseData, baseError: error })
    }
  }

  private applyServerInstruction(response: AxiosResponse) {
    const authAccessTokenHeader = response.headers[AUTH_ACCESS_TOKEN_HEADER]
    this.handleAuthAccessToken(authAccessTokenHeader)
  }

  private handleAuthAccessToken(authAccessTokenHeader: string) {
    switch (authAccessTokenHeader) {
      case 'clear':
        authStore.clearAuth()
        break
    }
  }
}
