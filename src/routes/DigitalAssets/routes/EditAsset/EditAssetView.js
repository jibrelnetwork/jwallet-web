// @flow

import React from 'react'

import {
  CloseableScreen,
  DigitalAssetEditForm,
} from 'components'

type Props = {
  openView: () => void,
  closeClick: () => void,
} & React$ElementConfig<typeof DigitalAssetEditForm>

const AddAssetView = ({
  openView,
  closeClick,
  formFields,
  invalidFields,
  setField,
  submit,
}: Props) => (
  <CloseableScreen
    title='Edit digital asset'
    open={openView}
    onCloseClick={closeClick}
  >
    <DigitalAssetEditForm
      formFields={formFields}
      invalidFields={invalidFields}
      setField={setField}
      submit={submit}
      isAddressEditable={false}
      submitLabel='Save'
    />
  </CloseableScreen>
)

export default AddAssetView
