// @flow

import React from 'react'
import { i18n } from 'i18n/lingui'

import {
  CloseableScreen,
  DigitalAssetEditForm,
} from 'components'

export type Props = {
  +close: Function,
  +submit: () => void,
  +openView: Function,
  +closeView: Function,
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
    title={i18n._(
      'AssetsItemAdd.title',
      null,
      { defaults: 'Add digital asset' },
    )}
  >
    <DigitalAssetEditForm
      submit={submit}
      setField={setField}
      formFields={formFields}
      invalidFields={invalidFields}
      submitLabel={i18n._(
        'AssetsItemAdd.primaryButton.title',
        null,
        { defaults: 'Add asset' },
      )}
      isAddressLoading={isAddressLoading}
      isAddressEditable
    />
  </CloseableScreen>
)

export default AddAssetView
