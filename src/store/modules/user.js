// @flow

export const SET_INTRODUCTION_IS_PASSED = '@@user/SET_INTRODUCTION_IS_PASSED'
export const SET_AGREEMENT_IS_CONFIRMED = '@@user/SET_AGREEMENT_IS_CONFIRMED'

export function setIntroductionIsPassed() {
  return {
    type: SET_INTRODUCTION_IS_PASSED,
  }
}

export function setAgreementIsConfirmed(agreement: string, isConfirmed: boolean) {
  return {
    type: SET_AGREEMENT_IS_CONFIRMED,
    payload: {
      agreement,
      isConfirmed,
    },
  }
}

export type UserAction =
  ExtractReturn<typeof setIntroductionIsPassed> |
  ExtractReturn<typeof setAgreementsIsPassed>

const initialState = {
  persist: {
    isIntroductionPassed: false,
    agreements: {},
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

    case SET_AGREEMENT_IS_CONFIRMED:
      // eslint-disable-next-line no-case-declarations
      const {
        agreement, isConfirmed,
      } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          agreements: {
            ...state.persist.agreements,
            [agreement]: isConfirmed,
          },
        },
      }

    default:
      return state
  }
}

export default user
