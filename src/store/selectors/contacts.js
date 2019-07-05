// @flow

export function selectContactsItems(state: AppState) {
  return state.contacts.persist.items
}

export function selectContact(state: AppState, id: string): ?Contact {
  const contacts = selectContactsItems(state)

  return contacts[id]
}
