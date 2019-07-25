// @flow strict

export function getNote(
  notes: Comments,
  id: TransactionId,
  hash: Hash,
): ?string {
  /**
   * note by transaction id has greater priority than note by transaction hash
   * this is actual for contract events only
   */
  if (notes[id] != null) {
    return notes[id]
  }

  return notes[hash]
}
