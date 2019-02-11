// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import MenuLayout from 'layouts/MenuLayout'

const ModalLayout = ({ children }: Props) => (
  <MenuLayout>
    <div className='modal-layout'>
      <Scrollbars autoHide>
        {children}
      </Scrollbars>
    </div>
  </MenuLayout>
)

type Props = {
  children: ?Object,
}

ModalLayout.defaultProps = {
  children: null,
}

export default ModalLayout
