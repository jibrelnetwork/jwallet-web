// @flow

import React from 'react'
import { useI18n } from 'app/hooks'

import {
  CloseableScreen,
  DigitalAssetAddForm,
} from 'components'

export type Props = {
  +submit: () => void,
  +openView: Function,
  +closeView: Function,
  +setField: SetFieldFunction<EditAssetFormFields>,
  +formFields: EditAssetFormFields,
  +invalidFields: EditAssetFormFields,
  +isAddressLoading: boolean,
}

const AddAssetView = ({
  openView,
  closeView,
  formFields,
  invalidFields,
  setField,
  submit,
  isAddressLoading,
}: Props) => {
  const i18n = useI18n()

  return (
    <CloseableScreen
      onOpen={openView}
      onClose={closeView}
      title={i18n._(
        'AssetsItemAdd.title',
        null,
        { defaults: 'Add digital asset' },
      )}
    >
      <DigitalAssetAddForm
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
}

export default AddAssetView
