import { Plugin } from '@nuxt/types'
import ApiRepositoryFactory from './api-repository.factory'
import { initializeApi } from '~/utils/api-accessor'

const apiPlugin: Plugin = ({ $axios, $config, app }, inject) => {
  const factory = new ApiRepositoryFactory($axios, $config, app)
  const apiRepositories = factory.createRepositories()
  initializeApi(apiRepositories)
  inject('api', apiRepositories)
}

export default apiPlugin
