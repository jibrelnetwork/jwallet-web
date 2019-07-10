// @flow

import React from 'react'
import { i18n } from 'i18n/lingui'

import { handle } from 'utils/eventHandlers'

import {
  CloseableScreen,
  DigitalAssetEditForm,
} from 'components'

export type Props = {|
  +close: Function,
  +submit: () => void,
  +openView: (Address) => void,
  +setField: SetFieldFunction<EditAssetFormFields>,
  +params: {|
    +assetAddress: Address,
  |},
  +formFields: EditAssetFormFields,
  +invalidFields: EditAssetFormFields,
  +address: Address,
|}

const EditAssetView = ({
  close,
  openView,
  formFields,
  invalidFields,
  setField,
  address,
  submit,
}: Props) => (
  <CloseableScreen
    close={close}
    onOpen={handle(openView)(address)}
    title={i18n._(
      'AssetsItemEdit.title',
      null,
      { defaults: 'Edit digital asset' },
    )}
  >
    <DigitalAssetEditForm
      submit={submit}
      setField={setField}
      formFields={formFields}
      invalidFields={invalidFields}
      submitLabel={i18n._(
        'AssetsItemEdit.submit',
        null,
        { defaults: 'Save' },
      )}
      isAddressEditable={false}
    />
  </CloseableScreen>
)

export default EditAssetView
