import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { camelizeKeys, decamelizeKeys } from 'humps'

export default function ({ $axios }: { $axios: NuxtAxiosInstance }) {
  $axios.onResponse((response) => {
    if (response.data) {
      response.data = camelizeKeys(response.data)
    }

    return response
  })

  $axios.onRequest((config) => {
    const newConfig = { ...config }

    if (config.params) {
      newConfig.params = decamelizeKeys(config.params)
    }
    if (config.data) {
      newConfig.data = decamelizeKeys(config.data)
    }

    return newConfig
  })
}
