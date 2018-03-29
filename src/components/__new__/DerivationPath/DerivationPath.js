// INFO
// Modified version of old DerivationPath component with
// new inner JRadioButton and JRadioInput components

import React from 'react'
import { getKnownDerivationPaths } from 'utils/knownDerivationPaths'
import { JRadioButton, JRadioInput } from 'components/base/__new__'

const DerivationPath = ({
  errorMessage,
  knownDerivationPath,
  customDerivationPath,
  setKnownDerivationPath,
  setCustomDerivationPath,
  selectedDerivationPathType,
}: Props) => (
  <div className='DerivationPath'>
    {getKnownDerivationPaths().map(({ path, description }, index) => (
      <div className='known-derivation-path' key={index}>
        <JRadioButton
          text={path}
          checked={knownDerivationPath === path && selectedDerivationPathType === 'known'}
          onCheck={setKnownDerivationPath(path)}
          description={description}
        />
      </div>
    ))}
    <div className='custom-derivation-path'>
      <JRadioInput
        value={customDerivationPath}
        checked={selectedDerivationPathType === 'custom'}
        onCheck={() => setCustomDerivationPath(customDerivationPath)}
        onChange={setCustomDerivationPath}
        placeholder={i18n('modals.derivationPath.placeholder.customDerivationPath')}
        errorMessage={errorMessage}
      />
    </div>
  </div>
)

type Props = {
  errorMessage?: string,
  knownDerivationPath: string,
  customDerivationPath: string,
  setKnownDerivationPath: Function,
  setCustomDerivationPath: Function,
  selectedDerivationPathType: 'custom' | 'known'
}

DerivationPath.defaultProps = {
  errorMessage: '',
}

export default DerivationPath
