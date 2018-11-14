// @flow

export const OPEN_CORE_LAYOUT = '@@layout/OPEN_CORE_LAYOUT'
export const CLOSE_CORE_LAYOUT = '@@layout/CLOSE_CORE_LAYOUT'

export const OPEN_ASIDE_LAYOUT = '@@layout/OPEN_ASIDE_LAYOUT'
export const CLOSE_ASIDE_LAYOUT = '@@layout/CLOSE_ASIDE_LAYOUT'

export function openAsideLayout() {
  return {
    type: OPEN_ASIDE_LAYOUT,
  }
}

export function closeAsideLayout() {
  return {
    type: CLOSE_ASIDE_LAYOUT,
  }
}

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

export type LayoutAction = ExtractReturn<typeof openAsideLayout> |
  ExtractReturn<typeof closeAsideLayout> |
  ExtractReturn<typeof openCoreLayout> |
  ExtractReturn<typeof closeCoreLayout>
