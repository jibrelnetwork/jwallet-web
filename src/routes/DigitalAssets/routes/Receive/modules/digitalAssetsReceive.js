// @flow

export const OPEN_VIEW = '@@digitalAssetsReceive/OPEN_VIEW'
export const CLOSE_VIEW = '@@digitalAssetsReceive/CLOSE_VIEW'

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

export type DigitalAssetsReceiveAction = ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView>

const initialState: {} = {}

const digitalAssetsReceive = (
  state: {} = initialState,
  action: DigitalAssetsReceiveAction,
): {} => {
  switch (action.type) {
    default:
      return state
  }
}

export default digitalAssetsReceive
