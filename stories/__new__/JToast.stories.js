
/* @flow */

import React from 'react'
import { css } from 'glamor'
import { storiesOf } from '@storybook/react'
import { toast, ToastContainer } from 'react-toastify'

import JButton from '../../src/components/base/__new__/JButton'
import JToast, { options } from '../../src/components/base/__new__/JToast'

const styles = css({
  right: '45px',
  width: '365px',
  padding: '5px',
  boxShadow: 'none',
})

storiesOf('JToast', module)
  .add('White', () => (
    <div>
      <JButton
        text='Show toast'
        color='blue'
        minimal
        onClick={() => toast(
          <JToast
            icon='link-blue'
            color='white'
            title='Sync in progress'
            description='Just now'
          />,
          options
        )}
      />
      <ToastContainer toastClassName={styles} />
    </div>
  ))
  .add('Gray', () => (
    <div>
      <JButton
        text='Show toast'
        color='blue'
        minimal
        onClick={() => toast(
          <JToast
            icon='private-key'
            color='gray'
            title='Template deleted'
            description='Just now'
          />,
          options
        )}
      />
      <ToastContainer toastClassName={styles} />
    </div>
  ))
  .add('Red', () => (
    <div>
      <JButton
        text='Show toast'
        color='blue'
        minimal
        onClick={() => toast(
          <JToast
            icon='private-key'
            color='red'
            title='Connection error'
            description='Just now'
          />,
          options
        )}
      />
      <ToastContainer toastClassName={styles} />
    </div>
  ))
  .add('Blue', () => (
    <div>
      <JButton
        text='Show toast'
        color='blue'
        minimal
        onClick={() => toast(
          <JToast
            icon='private-key'
            color='blue'
            title='Key exported'
            description='Just now'
          />,
          options
        )}
      />
      <ToastContainer toastClassName={styles} />
    </div>
  ))
