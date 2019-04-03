// @flow

import { keyBy } from 'lodash-es'

import sprite from './spriteAssets'

const iconsAsset = keyBy(
  sprite.keys().map(x => sprite(x).default),
  'id',
)

export default iconsAsset
