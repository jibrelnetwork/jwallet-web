// @flow

export const OPEN_VIEW = '@@transactions/OPEN_VIEW'
export const CLOSE_VIEW = '@@transactions/CLOSE_VIEW'

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

/*
type TransactionsAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView>
*/
