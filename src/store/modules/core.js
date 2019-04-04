// @flow strict

export const OPEN_MENU_LAYOUT = '@@core/OPEN_MENU_LAYOUT'
export const CLOSE_MENU_LAYOUT = '@@core/CLOSE_MENU_LAYOUT'

export function openMenuLayout() {
  return {
    type: OPEN_MENU_LAYOUT,
  }
}

export function closeMenuLayout() {
  return {
    type: CLOSE_MENU_LAYOUT,
  }
}

export type CoreAction =
  ExtractReturn<typeof openMenuLayout> |
  ExtractReturn<typeof closeMenuLayout>
