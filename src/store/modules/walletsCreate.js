// @flow

import type {
  WalletsCreateRequestPayload,
  WalletsSetWalletsActionPayload,
} from 'store/modules/wallets'

export const OPEN_VIEW = '@@walletsCreate/OPEN_VIEW'
export const CLOSE_VIEW = '@@walletsCreate/CLOSE_VIEW'

export const GO_TO_NEXT_STEP = '@@walletsCreate/GO_TO_NEXT_STEP'
export const GO_TO_PREV_STEP = '@@walletsCreate/GO_TO_PREV_STEP'
export const SET_CURRENT_STEP = '@@walletsCreate/SET_CURRENT_STEP'

export const CREATE_ERROR = '@@walletsCreate/CREATE_ERROR'
export const CREATE_SUCCESS = '@@walletsCreate/CREATE_SUCCESS'
export const CREATE_REQUEST = '@@walletsCreate/CREATE_REQUEST'

export const BLOCK_NUMBERS_ERROR = '@@walletsCreate/BLOCK_NUMBERS_ERROR'
export const BLOCK_NUMBERS_SUCCESS = '@@walletsCreate/BLOCK_NUMBERS_SUCCESS'
export const BLOCK_NUMBERS_REQUEST = '@@walletsCreate/BLOCK_NUMBERS_REQUEST'

export const CLEAN = '@@walletsCreate/CLEAN'

export const STEPS: WalletsCreateSteps = {
  NAME: 0,
  PASSWORD: 1,
}

export function openView() {
  return {
    type: OPEN_VIEW,
  }
}

export function closeView() {
  return {
    type: CLOSE_VIEW,
  }
}

export function goToNextStep() {
  return {
    type: GO_TO_NEXT_STEP,
  }
}

export function goToPrevStep() {
  return {
    type: GO_TO_PREV_STEP,
  }
}

export function setCurrentStep(currentStep: WalletsCreateStepIndex) {
  return {
    type: SET_CURRENT_STEP,
    payload: {
      currentStep,
    },
  }
}

export function createError(message: string) {
  return {
    type: CREATE_ERROR,
    payload: {
      message,
    },
    error: true,
  }
}

export function createSuccess(payload: WalletsSetWalletsActionPayload) {
  return {
    type: CREATE_SUCCESS,
    payload,
  }
}

export function createRequest(payload: WalletsCreateRequestPayload) {
  return {
    type: CREATE_REQUEST,
    payload,
  }
}

export function blockNumbersError(err: Error) {
  return {
    type: BLOCK_NUMBERS_ERROR,
    payload: err,
    error: true,
  }
}

export function blockNumbersSuccess(payload: WalletCreatedBlockNumber) {
  return {
    type: BLOCK_NUMBERS_SUCCESS,
    payload,
  }
}

export function blockNumbersRequest() {
  return {
    type: BLOCK_NUMBERS_REQUEST,
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type WalletsCreateAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof goToNextStep> |
  ExtractReturn<typeof goToPrevStep> |
  ExtractReturn<typeof setCurrentStep> |
  ExtractReturn<typeof createError> |
  ExtractReturn<typeof createSuccess> |
  ExtractReturn<typeof createRequest> |
  ExtractReturn<typeof blockNumbersError> |
  ExtractReturn<typeof blockNumbersSuccess> |
  ExtractReturn<typeof blockNumbersRequest> |
  ExtractReturn<typeof clean>

const initialState: WalletsCreateState = {
  createdBlockNumber: {},
  currentStep: STEPS.NAME,
  isBlocksLoading: false,
}

function walletsCreate(
  state: WalletsCreateState = initialState,
  action: WalletsCreateAction,
): WalletsCreateState {
  switch (action.type) {
    case SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload.currentStep,
      }

    case BLOCK_NUMBERS_REQUEST:
      return {
        ...state,
        isBlocksLoading: true,
      }

    case BLOCK_NUMBERS_SUCCESS:
      return {
        ...state,
        createdBlockNumber: action.payload,
        isBlocksLoading: false,
      }

    case BLOCK_NUMBERS_ERROR:
      return {
        ...state,
        isBlocksLoading: false,
      }

    case CLEAN:
      return initialState

    default:
      return state
  }
}

export default walletsCreate
