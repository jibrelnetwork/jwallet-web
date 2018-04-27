// @flow

import React from 'react'

import JRadio from 'components/base/JRadio'
import handle from 'utils/eventHandlers/handle'
import getKnownDerivationPaths from 'utils/keystore/getKnownDerivationPaths'

import Known from './Known'
import Custom from './Custom'

const DerivationPath = ({
  setKnownDerivationPath,
  setCustomDerivationPath,
  errorMessage,
  knownDerivationPath,
  customDerivationPath,
  selectedDerivationPathType,
}: Props) => (
  <div className='derivation-path'>
    {getKnownDerivationPaths().map(({ path, description }, index) => (
      <JRadio
        key={index}
        toggle={setKnownDerivationPath(path)}
        name={index}
        isActive={(knownDerivationPath === path) && (selectedDerivationPathType === 'known')}
      >
        <Known path={path} description={description} />
      </JRadio>
    ))}
    <div className='custom'>
      <JRadio
        toggle={handle(setCustomDerivationPath)(customDerivationPath)}
        name={'custom-path'}
        isActive={selectedDerivationPathType === 'custom'}
      >
        <Custom
          onChange={setCustomDerivationPath}
          value={customDerivationPath}
          error={errorMessage}
        />
      </JRadio>
    </div>
  </div>
)

type Props = {
  setKnownDerivationPath: Function,
  setCustomDerivationPath: Function,
  errorMessage: ?string,
  knownDerivationPath: string,
  customDerivationPath: string,
  selectedDerivationPathType: 'custom' | 'known'
}

export default DerivationPath
