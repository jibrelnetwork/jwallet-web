// @flow strict

import React from 'react'

import { About } from './components/About/About'
import { Transfers } from './components/Transfers/Transfers'

type Props = {|
  +assetId: string,
|}

export function AssetsItem({ assetId }: Props) {
  return (
    <>
      <About assetId={assetId} />
      <Transfers assetId={assetId} />
    </>
  )
}
