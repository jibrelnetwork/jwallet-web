import React from 'react'
import PropTypes from 'prop-types'

import JbButton from 'components/base/JbButton'

function Auth({ addNewKeys, importKeys }) {
  return (
    <div className='auth-wrap'>
      <div className='auth'>
        <h1>{'Authorization'}</h1>
        <h2>{'Lorem ipsum'}</h2>
        <div className='auth__buttons'>
          <JbButton white label={'Create new keys'} onClick={addNewKeys} />
          <JbButton blue label={'Import keys'} onClick={importKeys} />
        </div>
      </div>
    </div>
  )
}

Auth.propTypes = {
  addNewKeys: PropTypes.func.isRequired,
  importKeys: PropTypes.func.isRequired,
}

export default Auth
