// @flow

import { type CoreAction } from './core'
import { type NotFoundAction } from './notFound'
import { type PasswordAction } from './password'
import { type DigitalAssetsModuleAction } from './digitalAssets'
import { type FavoritesAction } from './favorites'

export {
  OPEN_MENU_LAYOUT,
  CLOSE_MENU_LAYOUT,
} from './core'

export type AppAction =
  CoreAction |
  NotFoundAction |
  PasswordAction |
  FavoritesAction |
  DigitalAssetsModuleAction
