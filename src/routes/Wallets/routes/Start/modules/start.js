// @flow

export const OPEN = '@@start/OPEN'
export const CLOSE = '@@start/CLOSE'

export const open = (): { type: string } => ({
  type: OPEN,
})

export const close = (): { type: string } => ({
  type: CLOSE,
})
