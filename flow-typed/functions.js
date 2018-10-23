// @flow

declare function i18n(path: string): string

declare type SetFieldFunction<T> = ($Keys<T>, string) => void
