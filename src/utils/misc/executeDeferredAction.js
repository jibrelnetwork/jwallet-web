// @flow

import { Deferred } from '.'

type DeferredActionFn<P, V> = (payload: P, deferred: V) => {
  type: string,
  meta: { resolver: V },
  payload: P,
}

function executeDeferredAction<+P, +R>(
  action: DeferredActionFn<P, Deferred<R>>,
  payload: P,
): Promise<R> {
  const resolver: Deferred<R> = new Deferred()
  action(payload, resolver)

  return resolver.promise
}

export default executeDeferredAction
