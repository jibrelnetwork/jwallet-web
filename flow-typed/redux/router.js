// @flow

declare type RouterState = {
  +locationBeforeTransitions: {
    +action: 'POP' | 'PUSH',
    +hash: string,
    +key: ?Object,
    +pathname: string,
    +search: string,
    +state: ?Object,
  },
}
