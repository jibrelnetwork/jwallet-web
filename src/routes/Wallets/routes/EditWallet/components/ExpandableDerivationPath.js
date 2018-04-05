// @flow

import React from 'react'

import handle from 'utils/handle'
import { Expandable } from 'components'
import { DerivationPath } from 'components'

const ExpandableDerivationPath = ({
  setKnownDerivationPath,
  setCustomDerivationPath,
  validFields,
  invalidFields,
  knownDerivationPath,
  customDerivationPath,
  selectedDerivationPathType,
}: Props) => (
  <Expandable title='Advanced' color='white'>
    <DerivationPath
      setKnownDerivationPath={handle(setKnownDerivationPath)}
      setCustomDerivationPath={setCustomDerivationPath}
      knownDerivationPath={knownDerivationPath}
      customDerivationPath={customDerivationPath}
      errorMessage={invalidFields.customDerivationPath}
      successMessage={validFields.customDerivationPath}
      selectedDerivationPathType={selectedDerivationPathType}
    />
  </Expandable>
)

type Props = {
  setKnownDerivationPath: (knownDerivationPath: string) => Dispatch,
  setCustomDerivationPath: (customDerivationPath: string) => Dispatch,
  validFields: Object,
  invalidFields: Object,
  knownDerivationPath: string,
  customDerivationPath: string,
  selectedDerivationPathType: 'custom' | 'known'
}

export default ExpandableDerivationPath
