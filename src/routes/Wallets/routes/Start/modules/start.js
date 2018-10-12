// @flow

export const OPEN_VIEW: '@@walletsStart/OPEN_VIEW' = '@@walletsStart/OPEN_VIEW'
export const CLOSE_VIEW: '@@walletsStart/CLOSE_VIEW' = '@@walletsStart/CLOSE_VIEW'

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
