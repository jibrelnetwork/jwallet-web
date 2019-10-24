// @flow

import { keyBy } from 'lodash-es'

import { type SpriteIcon } from './types'

import sprite from './spriteUI'
import spriteColored from './coloredIconsUI'

const iconsUI = keyBy<SpriteIcon, string>(
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

const coloredIconsUI = keyBy<SpriteIcon, string>(
  spriteColored.keys().map((x) => {
    const file = spriteColored(x).default
    const [,, width, height] = file.viewBox.split(/(\s+)/).filter(e => e.trim().length > 0)

    /* eslint-disable fp/no-mutation */
    file.width = width
    file.height = height
    file.colored = true
    /* eslint-enable fp/no-mutation */

    return file
  }),
  'id',
)

const icons = {
  ...iconsUI,
  ...coloredIconsUI,
}

export default icons
