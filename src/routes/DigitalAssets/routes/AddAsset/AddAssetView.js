// @flow

import React from 'react'

import {
  CloseableScreen,
  DigitalAssetEditForm,
} from 'components'

type Props = {
  openView: () => void,
  closeView: () => void,
  closeClick: () => void,
} & React$ElementConfig<typeof DigitalAssetEditForm>

const AddAssetView = ({
  openView,
  closeView,
  closeClick,
  formFields,
  invalidFields,
  setField,
  submit,
  isAddressLoading,
}: Props) => (
  <CloseableScreen
    title='Add digital asset'
    open={openView}
    close={closeView}
    onCloseClick={closeClick}
  >
    <DigitalAssetEditForm
      formFields={formFields}
      invalidFields={invalidFields}
      setField={setField}
      submit={submit}
      isAddressLoading={isAddressLoading}
      isAddressEditable
      submitLabel='Add asset'
    />
  </CloseableScreen>
)

export default AddAssetView
