import { NuxtAppOptions } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosRequestConfig, AxiosError } from 'axios'
import Cookies from 'universal-cookie'
import { JWT_STORAGE_KEY, REFRESH_TOKEN_COOKIE_KEY } from '~/services/constants'
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
import { fetchProperty } from '~/utils/local-storage'

type HandleErrorOptions = { retry: boolean }

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

  private setDefaultConfig(config: AxiosRequestConfig) {
    config = config || {}
    if (process.client) {
      config.headers = config.headers || {}
      const authToken = fetchProperty(JWT_STORAGE_KEY, 'accessToken')
      if (authToken && !config.headers.Authorization) config.headers.Authorization = `Bearer ${authToken}`
    }
    return config
  }

  private async wrapRequest(request: Promise<any>, options?: HandleErrorOptions) {
    try {
      const response = await request
      return Promise.resolve(response.data)
    } catch (error: any) {
      return this.handleError(error, options)
    }
  }

  private handleError(error: AxiosError, options: HandleErrorOptions): Promise<void> {
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
      return this.handleUnauthorizedError(error, baseData, options)
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

  private async handleUnauthorizedError(error: AxiosError, baseData: any, options: HandleErrorOptions) {
    const cookies = new Cookies()
    const isRetry = options && options.retry
    if (isRetry || !cookies.get(REFRESH_TOKEN_COOKIE_KEY)) throw new UnauthorizedError({ baseData })

    const config = error.config
    await this.app.$api.auth.refreshAccessToken().catch(() => {
      throw new UnauthorizedError({ baseData })
    })

    this.setDefaultConfig(config)
    return this.wrapRequest(this.request(config), { retry: true })
  }
}
