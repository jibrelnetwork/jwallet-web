// @flow strict

import { type NotFoundAction } from './notFound'
import { type PasswordAction } from './password'
import { type FavoritesAction } from './favorites'
import { type DigitalAssetsModuleAction } from './digitalAssets'

export type AppAction =
  NotFoundAction |
  PasswordAction |
  FavoritesAction |
  DigitalAssetsModuleAction
