// @flow

import React from 'react'
import { t } from 'ttag'

import { handle } from 'utils/eventHandlers'

import {
  CloseableScreen,
  DigitalAssetEditForm,
} from 'components'

type Props = {|
  +close: () => void,
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
    title={t`Edit digital asset`}
  >
    <DigitalAssetEditForm
      submit={submit}
      setField={setField}
      formFields={formFields}
      invalidFields={invalidFields}
      submitLabel={t`Save`}
      isAddressEditable={false}
    />
  </CloseableScreen>
)

export default EditAssetView
