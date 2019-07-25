// @flow strict

const STUCK_DELAY: number = 30 * 60 * 1000

export function checkStuck(timestamp: number): boolean {
  return ((Date.now() - timestamp * 1000) > STUCK_DELAY)
}
