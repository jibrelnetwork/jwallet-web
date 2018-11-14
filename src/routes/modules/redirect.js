// @flow

export const BACK_OR_FALLBACK = '@@redirect/BACK_OR_FALLBACK'

export function backOrFallback(fallbackUrl: string) {
  return {
    type: BACK_OR_FALLBACK,
    payload: {
      fallbackUrl,
    },
  }
}

export type RedirectActions = ExtractReturn<typeof backOrFallback>
