// @flow strict

import { migrateToV1 } from './v1'

export async function migrate(password: string): Promise<void> {
  return migrateToV1(password)
}
