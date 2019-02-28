// @flow

export const SYNC_STOP = '@@ticker/SYNC_STOP'
export const SYNC_START = '@@ticker/SYNC_START'
export const SYNC_RESTART = '@@ticker/SYNC_RESTART'

export const FIAT_COURSES_ERROR = '@@ticker/FIAT_COURSES_ERROR'
export const FIAT_COURSES_SUCCESS = '@@ticker/FIAT_COURSES_SUCCESS'
export const FIAT_COURSES_REQUEST = '@@ticker/FIAT_COURSES_REQUEST'

export const FIAT_COURSE_ERROR = '@@ticker/FIAT_COURSE_ERROR'
export const FIAT_COURSE_SUCCESS = '@@ticker/FIAT_COURSE_SUCCESS'
export const FIAT_COURSE_REQUEST = '@@ticker/FIAT_COURSE_REQUEST'

export function syncStop() {
  return {
    type: SYNC_STOP,
  }
}

export function syncStart() {
  return {
    type: SYNC_START,
  }
}

export function syncRestart() {
  return {
    type: SYNC_RESTART,
  }
}

export function fiatCoursesError(err: Error) {
  return {
    type: FIAT_COURSES_ERROR,
    payload: err,
    error: true,
  }
}

export function fiatCoursesSuccess(items: FiatCourses) {
  return {
    type: FIAT_COURSES_SUCCESS,
    payload: {
      items,
    },
  }
}

export function fiatCoursesRequest(fiatIds: FiatId[]) {
  return {
    type: FIAT_COURSES_REQUEST,
    payload: {
      fiatIds,
    },
  }
}

export function fiatCourseError(err: Error) {
  return {
    type: FIAT_COURSE_ERROR,
    payload: err,
    error: true,
  }
}

export function fiatCourseSuccess(fiatId: FiatId, timestamp: FiatTimestamp, item: FiatCourse) {
  return {
    type: FIAT_COURSE_SUCCESS,
    payload: {
      item,
      fiatId,
      timestamp,
    },
  }
}

export function fiatCourseRequest(fiatId: FiatId, timestamp: FiatTimestamp) {
  return {
    type: FIAT_COURSE_REQUEST,
    payload: {
      fiatId,
      timestamp,
    },
  }
}

export type TickerAction =
  ExtractReturn<typeof fiatCoursesError> |
  ExtractReturn<typeof fiatCoursesSuccess> |
  ExtractReturn<typeof fiatCoursesRequest> |
  ExtractReturn<typeof fiatCourseError> |
  ExtractReturn<typeof fiatCourseSuccess> |
  ExtractReturn<typeof fiatCourseRequest> |
  ExtractReturn<typeof syncStop> |
  ExtractReturn<typeof syncStart> |
  ExtractReturn<typeof syncRestart>

const initialState: TickerState = {
  persist: {
    items: {},
  },
  isLoading: false,
}

function ticker(state: TickerState = initialState, action: TickerAction): TickerState {
  switch (action.type) {
    case FIAT_COURSES_REQUEST: {
      const { fiatIds } = action.payload
      const { items }: TickerPersist = state.persist

      const itemsMerged: FiatCourses = fiatIds.reduce((
        result: FiatCourses,
        fiatId: FiatId,
      ): FiatCourses => {
        const fiatCourseById: FiatCourseById = items[fiatId] || {}
        const fiatCourse: FiatCourse = fiatCourseById.latest || {}

        return {
          ...result,
          [fiatId]: {
            ...fiatCourseById,
            latest: fiatCourse,
          },
        }
      }, items)

      return {
        ...state,
        persist: {
          ...state.persist,
          items: itemsMerged,
        },
        isLoading: true,
      }
    }

    case FIAT_COURSES_SUCCESS: {
      const { items }: TickerPersist = state.persist
      const itemsNew: FiatCourses = action.payload.items
      const fiatIds: FiatId[] = Object.keys(itemsNew)

      const itemsMerged: FiatCourses = fiatIds.reduce((
        result: FiatCourses,
        fiatId: FiatId,
      ): FiatCourses => {
        const fiatCourseById: FiatCourseById = items[fiatId] || {}
        const fiatCourseByIdNew: ?FiatCourseById = itemsNew[fiatId]

        if (!fiatCourseByIdNew) {
          return result
        }

        const fiatCourse: FiatCourse = fiatCourseById.latest || {}
        const fiatCourseNew: ?FiatCourse = fiatCourseByIdNew.latest

        return {
          ...result,
          [fiatId]: {
            ...fiatCourseById,
            latest: {
              ...fiatCourse,
              ...fiatCourseNew,
            },
          },
        }
      }, items)

      return {
        ...state,
        persist: {
          ...state.persist,
          items: itemsMerged,
        },
        isLoading: false,
      }
    }

    case FIAT_COURSES_ERROR: {
      return {
        ...state,
        isLoading: false,
      }
    }

    case FIAT_COURSE_REQUEST: {
      const {
        fiatId,
        timestamp,
      } = action.payload

      const { items }: TickerPersist = state.persist
      const fiatCourseById: FiatCourseById = items[fiatId] || {}
      const fiatCourse: ?FiatCourse = fiatCourseById[timestamp]

      if (fiatCourse) {
        return state
      }

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...items,
            [fiatId]: {
              ...fiatCourseById,
              [timestamp]: fiatCourse,
            },
          },
        },
      }
    }

    case FIAT_COURSE_SUCCESS: {
      const {
        item,
        fiatId,
        timestamp,
      } = action.payload

      const { items }: TickerPersist = state.persist
      const fiatCourseById: FiatCourseById = items[fiatId] || {}
      const fiatCourse: FiatCourse = fiatCourseById[timestamp] || {}

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...items,
            [fiatId]: {
              ...fiatCourseById,
              [timestamp]: {
                ...fiatCourse,
                ...item,
              },
            },
          },
        },
      }
    }

    default:
      return state
  }
}

export default ticker
