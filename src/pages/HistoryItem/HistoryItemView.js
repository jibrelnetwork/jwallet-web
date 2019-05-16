// @flow strict

import React from 'react'

export function HistoryItemView(props: Props) {
  return (
    <div>
      <pre>
        {JSON.stringify(props, null, 4)}
      </pre>
    </div>
  )
}
