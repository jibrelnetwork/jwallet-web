// @flow strict

export const BLOCK_NUMBERS_ERROR = '@@walletsCreate/BLOCK_NUMBERS_ERROR'
export const BLOCK_NUMBERS_SUCCESS = '@@walletsCreate/BLOCK_NUMBERS_SUCCESS'
export const BLOCK_NUMBERS_REQUEST = '@@walletsCreate/BLOCK_NUMBERS_REQUEST'

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

export type WalletsCreateAction =
  ExtractReturn<typeof blockNumbersError> |
  ExtractReturn<typeof blockNumbersSuccess> |
  ExtractReturn<typeof blockNumbersRequest>

const initialState: WalletsCreateState = {
  createdBlockNumber: null,
  isBlocksLoading: false,
}

function walletsCreate(
  state: WalletsCreateState = initialState,
  action: WalletsCreateAction,
): WalletsCreateState {
  switch (action.type) {
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

    default:
      return state
  }
}

export default walletsCreate
