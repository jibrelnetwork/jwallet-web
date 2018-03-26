// TODO: Replace info view with KeyButton component

/* @flow */

import React from 'react'

import { JText, JIcon, JButton } from '../../base/__new__'

const WalletManager = ({
  mode,
  icon,
  text,
  title,
  setMode,
  password,
  onEditClick,
  onDeleteClick,
  onBackupClick,
  onPasswordChange,
  onPasswordArrowClick,
  onChangePasswordClick,
}: Props) => (
  <div className='WalletManager'>
    {{
      info: (
        <div className='info'>
          <div
            className='content'
            onClick={() => setMode('password')}
          >
            <div className='icon'>
              <JIcon name={icon} size='medium' />
            </div>
            <div className='data'>
              <div className='title'>
                <JText
                  value={title}
                  variants={['white', 'large']}
                />
              </div>
              <div className='text'>
                <JText
                  value={text}
                  variants={['white', 'normal', 'transparent']}
                />
              </div>
            </div>
          </div>
          <div className='actions'>
            <JButton
              iconName='dots-white'
              iconSize='medium'
              onClick={() => setMode('actions')}
            />
          </div>
        </div>
      ),
      password: (
        <div className='password'>
          <div className='content'>
            <div className='icon'>
              <JIcon name={icon} size='medium' />
            </div>
            <div className='input'>
              <input
                type='password'
                value={password}
                onChange={onPasswordChange}
                placeholder='Type your password'
              />
            </div>
          </div>
          <div className='arrow'>
            <JButton
              minimal
              onClick={onPasswordArrowClick}
              iconName='arrow'
              iconSize='medium'
            />
          </div>
        </div>
      ),
      actions: (
        <div
          className='actions'
          onBlur={() => setMode('info')}
        >
          {onEditClick && (
            <div className='edit'>
              <JButton
                text='Edit'
                color='white'
                minimal
                onClick={onEditClick}
              />
            </div>
          )}
          {onBackupClick && (
            <div className='backup'>
              <JButton
                text='Backup'
                color='white'
                minimal
                onClick={onBackupClick}
              />
            </div>
          )}
          {onChangePasswordClick && (
            <div className='change-password'>
              <JButton
                text='Change password'
                color='white'
                minimal
                onClick={onChangePasswordClick}
              />
            </div>
          )}
          {onDeleteClick && (
            <div className='delete'>
              <JButton
                text='Delete'
                color='white'
                minimal
                onClick={onDeleteClick}
              />
            </div>
          )}
        </div>
      ),
    }[mode]}
  </div>
)

type Props = {
  icon: string,
  text: string,
  mode: 'info' | 'password' | 'actions',
  title: string,
  password: string,
  setMode: (mode: 'info' | 'password' | 'actions') => void,
  onEditClick: () => void,
  onBackupClick: () => void,
  onDeleteClick: () => void,
  onPasswordChange: (event: Event) => void, // TODO: Remove?
  onPasswordArrowClick: (password: string) => void,
  onChangePasswordClick: () => void, // TODO: Rename
}

export default WalletManager
