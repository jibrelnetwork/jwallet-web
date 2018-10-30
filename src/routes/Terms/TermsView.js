// @flow

import React from 'react'
import uuidv4 from 'uuid/v4'

import ModalHeader from 'components/ModalHeader'
import { JText, JRaisedButton } from 'components/base'

type Props = {|
  +goToHome: () => void,
|}

/* eslint-disable max-len */
const TERMS = [{
  id: uuidv4(),
  size: 'header',
  value: 'Header 1',
}, {
  id: uuidv4(),
  size: 'normal',
  value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}, {
  id: uuidv4(),
  size: 'normal',
  value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}, {
  id: uuidv4(),
  size: 'normal',
  value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}, {
  id: uuidv4(),
  size: 'normal',
  value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}, {
  id: uuidv4(),
  size: 'header',
  value: 'Header 2',
}, {
  id: uuidv4(),
  size: 'normal',
  value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}]
/* eslint-enable max-len */

const TermsView = ({ goToHome }: Props) => (
  <div className='terms-view'>
    <ModalHeader
      onBack={goToHome}
      color='white'
      title='Terms of Service'
      iconName='padding-cross'
    />
    <div className='content'>
      <div className='main'>
        {TERMS.map(({ id, size, value }) => (
          <div className={`item -${size}`} key={id}>
            <JText size={size} value={value} color='white' whiteSpace='wrap' />
          </div>
        ))}
      </div>
      <div className='actions'>
        <JRaisedButton
          onClick={goToHome}
          color='white'
          labelColor='blue'
          label='Try Jwallet'
        />
      </div>
    </div>
  </div>
)

export default TermsView
