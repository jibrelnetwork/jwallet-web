// @flow

import { omit } from 'lodash-es'

export const ADD = '@@favorites/ADD'
export const REMOVE = '@@favorites/REMOVE'
export const UPDATE = '@@favorites/UPDATE'

export function add(contact: Favorite) {
  return {
    type: ADD,
    payload: contact,
  }
}

export function remove(address: string) {
  return {
    type: REMOVE,
    payload: {
      address,
    },
  }
}

export function update(contact: Favorite) {
  return {
    type: UPDATE,
    payload: contact,
  }
}

export type FavoritesAction =
  ExtractReturn<typeof add> |
  ExtractReturn<typeof update> |
  ExtractReturn<typeof remove>

const initialState: FavoritesState = {
  persist: {
    items: {},
  },
}

function favorites(
  state: FavoritesState = initialState,
  action: FavoritesAction,
): FavoritesState {
  switch (action.type) {
    case ADD:
    case UPDATE: {
      const { address } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...state.persist.items,
            [address]: action.payload,
          },
        },
      }
    }

    case REMOVE: {
      const newContacts: Favorites = omit(
        state.persist.items,
        action.payload.address,
      )

      return {
        ...state,
        persist: {
          ...state.persist,
          items: newContacts,
        },
      }
    }

    default:
      return state
  }
}

export default favorites
