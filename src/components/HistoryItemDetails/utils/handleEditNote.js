// @flow strict

import { debounce } from 'lodash-es'

export function handleEditNote(
  action: (CommentId, string) => mixed,
  hook: (string) => mixed,
  id: CommentId,
): (string) => void {
  const dispatchActionEditNote = debounce(action, 1000, {
    leading: false,
    trailing: true,
  })

  return (noteText: string) => {
    hook(noteText)
    dispatchActionEditNote(id, noteText)
  }
}
