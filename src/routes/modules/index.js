// @flow

import { type LayoutActions } from './layout'
import { type RedirectActions } from './redirect'

export type CoreActions = LayoutActions |
  RedirectActions

export {
  OPEN_ASIDE_LAYOUT,
  CLOSE_ASIDE_LAYOUT,
  OPEN_CORE_LAYOUT,
  CLOSE_CORE_LAYOUT,
} from './layout'

export {
  backOrFallback,
} from './redirect'

