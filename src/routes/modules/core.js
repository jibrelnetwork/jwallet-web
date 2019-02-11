// @flow

export const OPEN_CORE_LAYOUT = '@@core/OPEN_CORE_LAYOUT'
export const CLOSE_CORE_LAYOUT = '@@core/CLOSE_CORE_LAYOUT'

export const OPEN_MENU_LAYOUT = '@@core/OPEN_MENU_LAYOUT'
export const CLOSE_MENU_LAYOUT = '@@core/CLOSE_MENU_LAYOUT'

export function openCoreLayout() {
  return {
    type: OPEN_CORE_LAYOUT,
  }
}

export function closeCoreLayout() {
  return {
    type: CLOSE_CORE_LAYOUT,
  }
}

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
  ExtractReturn<typeof openCoreLayout> |
  ExtractReturn<typeof closeCoreLayout> |
  ExtractReturn<typeof openMenuLayout> |
  ExtractReturn<typeof closeMenuLayout>
