// @flow strict

import {
  gaSendPageView,
  gaSendException,
} from 'utils/analytics'

const ROUTER5_PAGE_VIEW_ACTION_TYPE = '@@router5/TRANSITION_SUCCESS'

export function pageView() {
  return (next: Function) => (action: any) => {
    try {
      if (action.type === ROUTER5_PAGE_VIEW_ACTION_TYPE) {
        gaSendPageView(action.payload.route.path)
      }
    } catch (error) {
      console.error(error)

      gaSendException({
        exDescription: `Error sending page view: ${error.message}`,
        exFatal: false,
      })
    }

    next(action)
  }
}
