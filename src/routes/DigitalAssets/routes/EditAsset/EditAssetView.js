// @flow

import React from 'react'
import { handle } from 'utils/eventHandlers'

import {
  CloseableScreen,
  DigitalAssetEditForm,
} from 'components'

type Props = {
  openView: (Address) => void,
  closeClick: () => void,
  address: Address,
  formFields: EditAssetFormFields,
  invalidFields: EditAssetFormFields,
  setField: SetFieldFunction<EditAssetFormFields>,
  submit: () => void,
}

const EditAssetView = ({
  openView,
  closeClick,
  formFields,
  invalidFields,
  setField,
  address,
  submit,
}: Props) => (
  <CloseableScreen
    title='Edit digital asset'
    open={handle(openView)(address)}
    closeClick={closeClick}
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

export default EditAssetView
