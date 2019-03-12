// @flow

import { keyBy } from 'lodash-es'

const files = require.context('../../public/assets/icons/sprite-pack', true, /.*\.svg$/)
const iconsUI = keyBy(
  files.keys().map((x) => {
    const filesArray = files(x).default
    const sizeArray = filesArray.viewBox.split(/(\s+)/).filter(e => e.trim().length > 0)
    /* eslint-disable prefer-destructuring, fp/no-mutation */
    filesArray.width = sizeArray[2]
    filesArray.height = sizeArray[3]

    /* eslint-enable prefer-destructuring, fp/no-mutation */
    return filesArray
  }),
  'id',
)

export default iconsUI
