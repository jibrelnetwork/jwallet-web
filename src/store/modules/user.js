// @flow

export const SET_INTRODUCTION_IS_PASSED = '@@user/SET_INTRODUCTION_IS_PASSED'
export const SET_AGREEMENT_IS_CONFIRMED = '@@user/SET_AGREEMENT_IS_CONFIRMED'
export const SET_ALL_AGREEMENTS_ARE_CONFIRMED = '@@user/SET_ALL_AGREEMENTS_ARE_CONFIRMED'

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

export function setAllAgreementsAreConfirmed(isConfirmed: boolean) {
  return {
    type: SET_ALL_AGREEMENTS_ARE_CONFIRMED,
    payload: {
      isConfirmed,
    },
  }
}

export type UserAction =
  ExtractReturn<typeof setIntroductionIsPassed> |
  ExtractReturn<typeof setAgreementIsConfirmed> |
  ExtractReturn<typeof setAllAgreementsAreConfirmed>

const initialState: UserState = {
  persist: {
    isIntroductionPassed: false,
    agreementsConditions: {},
    isAgreementsConfirmed: false,
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

    case SET_ALL_AGREEMENTS_ARE_CONFIRMED: {
      const {
        isConfirmed,
      } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          isAgreementsConfirmed: isConfirmed,
        },
      }
    }

    case SET_AGREEMENT_IS_CONFIRMED:
      // eslint-disable-next-line no-case-declarations
      const {
        agreement,
        isConfirmed,
      } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          agreementsConditions: {
            ...state.persist.agreementsConditions,
            [agreement]: isConfirmed,
          },
        },
      }

    default:
      return state
  }
}

export default user
