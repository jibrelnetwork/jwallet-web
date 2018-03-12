// @flow

import React from 'react'

// import CoreLayout from '../CoreLayout'

const AsideLayout = ({ children }: Props) => (
  <div>
    {
      /* wrap it with <CoreLayout> */
    }
    <div>
      {
        /*
          <div>{'Aside'}</div>
        */
      }
      <div>{children}</div>
    </div>
    {
      /* wrap it with </CoreLayout> */
    }
  </div>
)

type Props = {
  children?: Object,
}

AsideLayout.defaultProps = {
  children: null,
}

export default AsideLayout
