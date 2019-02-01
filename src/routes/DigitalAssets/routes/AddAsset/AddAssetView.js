// @flow

import React from 'react'
import { t } from 'ttag'

import {
  CloseableScreen,
  DigitalAssetEditForm,
} from 'components'

type Props = {
  +close: () => void,
  +openView: () => void,
  +closeView: () => void,
  +submit: () => void,
  +setField: SetFieldFunction<EditAssetFormFields>,
  +formFields: EditAssetFormFields,
  +invalidFields: EditAssetFormFields,
  +isAddressLoading: boolean,
}

const AddAssetView = ({
  close,
  openView,
  closeView,
  formFields,
  invalidFields,
  setField,
  submit,
  isAddressLoading,
}: Props) => (
  <CloseableScreen
    close={close}
    onOpen={openView}
    onClose={closeView}
    title={t`Add digital asset`}
  >
    <DigitalAssetEditForm
      submit={submit}
      setField={setField}
      formFields={formFields}
      invalidFields={invalidFields}
      submitLabel={t`Add asset`}
      isAddressLoading={isAddressLoading}
      isAddressEditable
    />
  </CloseableScreen>
)

export default AddAssetView
