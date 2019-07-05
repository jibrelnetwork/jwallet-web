// @flow

import { omit } from 'lodash-es'

export const ADD = '@@contacts/ADD'
export const REMOVE = '@@contacts/REMOVE'
export const UPDATE = '@@contacts/UPDATE'

export function add(contact: Contact) {
  return {
    type: ADD,
    payload: contact,
  }
}

export function remove(id: string) {
  return {
    type: REMOVE,
    payload: {
      id,
    },
  }
}

export function update(contact: Contact) {
  return {
    type: UPDATE,
    payload: contact,
  }
}

export type ContactsAction =
  ExtractReturn<typeof add> |
  ExtractReturn<typeof update> |
  ExtractReturn<typeof remove>

const initialState: ContactsState = {
  persist: {
    items: {},
  },
}

function contacts(
  state: ContactsState = initialState,
  action: ContactsAction,
): ContactsState {
  switch (action.type) {
    case ADD:
    case UPDATE: {
      const { id } = action.payload

      return {
        ...state,
        persist: {
          ...state.persist,
          items: {
            ...state.persist.items,
            [id]: action.payload,
          },
        },
      }
    }

    case REMOVE: {
      const newContacts = omit(
        state.persist.items,
        action.payload.id,
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

export default contacts
