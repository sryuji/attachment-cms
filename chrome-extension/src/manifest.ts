import fs from 'fs-extra'
import { resolve } from './utils/file'

const getManifest = () => {
  return {
    manifest_version: 3,
    name: 'attachment CMS chrome extension',
    description: '',
    version: '0.1',
    action: {
      default_popup: './dist/popup/index.html',
    },
  }
}

function writeManifest() {
  fs.writeJSON(resolve('dist/manifest.json'), getManifest(), { spaces: 2 })
}

writeManifest()
