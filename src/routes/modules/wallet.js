// @flow

export const OPEN_LAYOUT = '@@wallet/OPEN_LAYOUT'
export const CLOSE_LAYOUT = '@@wallet/CLOSE_LAYOUT'

export function openLayout() {
  return {
    type: OPEN_LAYOUT,
  }
}

export function closeLayout() {
  return {
    type: CLOSE_LAYOUT,
  }
}
