// @flow

import { type LayoutAction } from './layout'
import { type RedirectActions } from './redirect'

export type CoreAction = LayoutAction |
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

