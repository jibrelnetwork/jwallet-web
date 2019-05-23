// @flow

export const SET_INTRODUCTION_IS_PASSED = '@@user/SET_INTRODUCTION_IS_PASSED'

export function setIntroductionIsPassed() {
  return {
    type: SET_INTRODUCTION_IS_PASSED,
  }
}

export type UserAction =
  ExtractReturn<typeof setIntroductionIsPassed>

const initialState = {
  persist: {
    isIntroductionPassed: false,
  },
}

function user(
  state: UserState = initialState,
  action: UserAction,
): UserState {
  switch (action.type) {
    case SET_INTRODUCTION_IS_PASSED:
      return {
        ...state,
        persist: {
          ...state.persist,
          isIntroductionPassed: true,
        },
      }

    default:
      return state
  }
}

export default user
