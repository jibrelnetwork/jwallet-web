// @flow

import { type CoreAction } from './core'
import { type NotFoundAction } from './notFound'
import { type DigitalAssetsModuleAction } from './digitalAssets'

export {
  OPEN_CORE_LAYOUT,
  CLOSE_CORE_LAYOUT,
  OPEN_MENU_LAYOUT,
  CLOSE_MENU_LAYOUT,
} from './core'

export type AppAction =
  CoreAction |
  NotFoundAction |
  DigitalAssetsModuleAction
