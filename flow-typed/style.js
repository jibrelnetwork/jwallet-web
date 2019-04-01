// @flow

declare module CSSModule {
  declare var exports: { [key: string]: string }
}

// The classes are named using the format {property}{sides}{size}
// and adding in `styles/offsets.m.scss`
// property = 'm' | 'p'
// sides = 't' | 'r' | 'b' | 'l' | '' (for all sides) | 'vh' (vertical-horizontal) | 'tvb'
// size - value in pixels
declare type OffsetVariant
  = 'mb8'
  | 'mb16'
  | 'mb32'
