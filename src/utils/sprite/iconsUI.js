// @flow

import { keyBy } from 'lodash-es'

import sprite from './spriteUI'

const iconsUI = keyBy(
  sprite.keys().map((x) => {
    const file = sprite(x).default
    const [,, width, height] = file.viewBox.split(/(\s+)/).filter(e => e.trim().length > 0)

    /* eslint-disable fp/no-mutation */
    file.width = width
    file.height = height
    /* eslint-enable fp/no-mutation */

    return file
  }),
  'id',
)

export default iconsUI
