// @flow

import React from 'react'

import MenuLayout from 'layouts/MenuLayout'

const ModalLayout = ({ children }: Props) => (
  <MenuLayout>
    <div className='modal-layout'>{children}</div>
  </MenuLayout>
)

type Props = {
  children?: Object,
}

ModalLayout.defaultProps = {
  children: null,
}

export default ModalLayout
