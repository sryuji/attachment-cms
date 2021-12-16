import fs from 'fs-extra'
import { resolve } from './utils/file'

function getManifest(): chrome.runtime.ManifestV3 {
  return {
    manifest_version: 3,
    default_locale: 'ja',
    name: '__MSG_ext_name__',
    description: '__MSG_ext_desc__',
    version: '0.1.0',
    permissions: ['contextMenus', 'scripting', 'storage', 'tabs'],
    host_permissions: ['http://*/*', 'https://*/*', '*://*/*'],
    background: {
      service_worker: 'js/background.js',
    },
    content_scripts: [
      {
        matches: ['http://*/*', 'https://*/*', '*://*/*'],
        // NOTE: /dist/js/配下にbuildされるため下記pathとなる
        js: ['js/content-script.js'],
        css: [] as string[],
        run_at: 'document_end',
      },
    ],
  }
}

function writeManifest() {
  fs.writeJSON(resolve('dist/manifest.json'), getManifest(), { spaces: 2 })
}

writeManifest()
