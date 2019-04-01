// @flow

export const OPEN_VIEW = '@@notFound/OPEN_VIEW'
export const CLOSE_VIEW = '@@notFound/CLOSE_VIEW'

export const GO_TO_HOME = '@@notFound/GO_TO_HOME'

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

export type NotFoundAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView>
