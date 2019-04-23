// @flow strict

import { keyBy } from 'lodash-es'

import sprite from './spriteAssets'

// Used in typings
// eslint-disable-next-line no-unused-vars
import { type SpriteIcon } from './types'

const iconsAsset = keyBy/* :: <SpriteIcon, string> */(
  sprite.keys().map((x) => {
    const file = sprite(x).default
    const [,, width, height] = file.viewBox.split(/(\s+)/).filter(e => e.trim().length > 0)

    return {
      id: file.id,
      url: file.url,
      viewBox: file.viewBox,
      width,
      height,
    }
  }),
  'id',
)

export default iconsAsset
