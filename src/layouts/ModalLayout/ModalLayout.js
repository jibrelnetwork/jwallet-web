// @flow

import React from 'react'

import MenuLayout from 'layouts/MenuLayout'
// import ModalHeader from 'components/__new__/ModalHeader'

const ModalLayout = ({ children }: Props) => (
  <MenuLayout>
    <div className='modal-layout'>
      {/* <ModalHeader title='' currentStep={1} totalSteps={3} /> */}
      <div className='modal-content'>{children}</div>
    </div>
  </MenuLayout>
)

type Props = {
  children?: Object,
}

ModalLayout.defaultProps = {
  children: null,
}

export default ModalLayout
