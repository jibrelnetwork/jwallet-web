// @flow

import { keyBy } from 'lodash-es'

const files = require.context('../../public/assets/tokens/blue', true, /.*\.svg$/)
const iconsAsset = keyBy(
  files.keys().map((x) => {
    const filesArray = files(x).default

    return filesArray
  }),
  'id',
)

export default iconsAsset
