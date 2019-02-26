// @flow

export const OPEN_VIEW = '@@walletsRenameAddress/OPEN_VIEW'
export const CLOSE_VIEW = '@@walletsRenameAddress/CLOSE_VIEW'

export const CHANGE_NAME_INPUT = '@@walletsRenameAddress/CHANGE_NAME_INPUT'
export const RENAME_ADDRESS = '@@walletsRenameAddress/RENAME_ADDRESS'

export const SET_INVALID_FIELD = '@@walletsRenameAddress/SET_INVALID_FIELD'

export const CLEAN = '@@walletsRenameAddress/CLEAN'

export function openView(address: string) {
  return {
    type: OPEN_VIEW,
    payload: {
      address,
    },
  }
}

export function closeView() {
  return {
    type: CLOSE_VIEW,
  }
}

export function changeNameInput(name: string) {
  return {
    type: CHANGE_NAME_INPUT,
    payload: {
      name,
    },
  }
}

export function renameAddress(address: Address, name: string) {
  return {
    type: RENAME_ADDRESS,
    payload: {
      name,
      address,
    },
  }
}

export function setInvalidField(fieldName: string, message: string) {
  return {
    type: SET_INVALID_FIELD,
    payload: {
      fieldName,
      message,
    },
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type WalletsRenameAddressAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof changeNameInput> |
  ExtractReturn<typeof renameAddress> |
  ExtractReturn<typeof setInvalidField> |
  ExtractReturn<typeof clean>

const initialState: WalletsRenameAddressState = {
  invalidFields: {},
  name: '',
}

function walletsRenameAddress(
  state: WalletsRenameAddressState = initialState,
  action: WalletsRenameAddressAction,
): WalletsRenameAddressState {
  switch (action.type) {
    case CHANGE_NAME_INPUT:
      return {
        ...state,
        name: action.payload.name,
        invalidFields: {
          ...state.invalidFields,
          name: null,
        },
      }

    case SET_INVALID_FIELD: {
      const {
        message,
        fieldName,
      } = action.payload

      return {
        ...state,
        invalidFields: {
          ...state.invalidFields,
          [fieldName]: message,
        },
      }
    }

    case CLEAN:
      return initialState

    default:
      return state
  }
}

export default walletsRenameAddress

