// @flow

export const ON_ADDRESS_VIEW_CLOSE = '@@favorites/ON_ADDRESS_VIEW_CLOSE'

export const ADD_AUTO = '@@favorites/ADD_AUTO'
export const ADD_BY_USER = '@@favorites/ADD_BY_USER'

export const EDIT = '@@favorites/EDIT'
export const REMOVE = '@@favorites/REMOVE'

export const SET_ITEMS = '@@favorites/SET_ITEMS'

export const SET_IS_LOADING = '@@favorites/SET_IS_LOADING'

export const SET_FORM_FIELD_VALUE = '@@favorites/SET_FORM_FIELD_VALUE'
export const SET_FORM_FIELD_ERROR = '@@favorites/SET_FORM_FIELD_ERROR'

export const CLEAN = '@@favorites/CLEAN'

export function onAddressViewClose() {
  return {
    type: ON_ADDRESS_VIEW_CLOSE,
  }
}

export function addAuto(address: string) {
  return {
    type: ADD_AUTO,
    payload: {
      address,
    },
  }
}

export function addByUser(address: string, name: string, description: string) {
  return {
    type: ADD_BY_USER,
    payload: {
      name,
      address,
      description,
    },
  }
}

export function edit(address: string, name: string, description: string) {
  return {
    type: EDIT,
    payload: {
      name,
      address,
      description,
    },
  }
}

export function remove(address: FavoriteAddress) {
  return {
    type: REMOVE,
    payload: {
      address,
    },
  }
}

export function setItems(items: Favorites) {
  return {
    type: SET_ITEMS,
    payload: {
      items,
    },
  }
}

export function setIsLoading(isLoading: boolean) {
  return {
    type: SET_IS_LOADING,
    payload: {
      isLoading,
    },
  }
}

export function setFormFieldValue(fieldName: $Keys<FavoritesFormFields>, value: string) {
  return {
    type: SET_FORM_FIELD_VALUE,
    payload: {
      value,
      fieldName,
    },
  }
}

export function setFormFieldError(fieldName: $Keys<FavoritesFormFields>, message: string) {
  return {
    type: SET_FORM_FIELD_ERROR,
    payload: {
      message,
      fieldName,
    },
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type FavoriteAction =
  ExtractReturn<typeof onAddressViewClose> |
  ExtractReturn<typeof addAuto> |
  ExtractReturn<typeof addByUser> |
  ExtractReturn<typeof edit> |
  ExtractReturn<typeof remove> |
  ExtractReturn<typeof setItems> |
  ExtractReturn<typeof setIsLoading> |
  ExtractReturn<typeof setFormFieldValue> |
  ExtractReturn<typeof setFormFieldError> |
  ExtractReturn<typeof clean>

const initialState: FavoritesState = {
  persist: {
    items: {},
  },
  formFieldValues: {
    name: '',
    address: '',
    description: '',
  },
  formFieldErrors: {
    name: '',
    address: '',
    description: '',
  },
  isLoading: false,
}

function favorites(
  state: FavoritesState = initialState,
  action: FavoriteAction,
): FavoritesState {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        persist: {
          ...state.persist,
          items: action.payload.items,
        },
        formFieldValues: initialState.formFieldValues,
        formFieldErrors: initialState.formFieldErrors,
      }

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }

    case SET_FORM_FIELD_VALUE: {
      const {
        value,
        fieldName,
      } = action.payload

      return {
        ...state,
        formFieldValues: {
          ...state.formFieldValues,
          [fieldName]: value,
        },
        formFieldErrors: {
          ...state.formFieldErrors,
          [fieldName]: '',
        },
      }
    }

    case SET_FORM_FIELD_ERROR: {
      const {
        message,
        fieldName,
      } = action.payload

      return {
        ...state,
        formFieldErrors: {
          ...state.formFieldErrors,
          [fieldName]: message,
        },
      }
    }

    case CLEAN:
      return {
        ...initialState,
        persist: state.persist,
      }

    default:
      return state
  }
}

export default favorites
