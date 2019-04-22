/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Form,
  Field,
} from 'react-final-form'

import { JIcon } from 'components/base'

import { JPicker } from './JPicker'
import { JPickerCurrent } from './Current/JPickerCurrent'

// import { JIcon } from 'components/base'
// import { JPickerItem } from './Item/Item'
// import { JPickerCurrent } from './Current/JPickerCurrent'
// import { JPickerList } from './List/JPickerList'
// import { DefaultItem } from './List/DefaultItem'

function formStoryWrapper(component, extraProps = {}, initialValues = { }) {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={values => alert(JSON.stringify(values, false, 4))}
      render={({
        form,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name='foo'
            component={component}
            {...extraProps}
          />
        </form>
      )}
    />
  )
}

// function currentRenderer() {
//   return (
//     <JPickerCurrent
//       label='Recipient'
//       isEditable={false}
//       iconRenderer={() => <JIcon name='star' color='blue' />}
//     />
//   )
// }

storiesOf('base|JPicker', module)
  .add('Default', () => (
    <div className='story'>
      {formStoryWrapper(JPicker, {
        label: 'JPicker test',
        items: [{
          key: '1',
          title: 'Address 1',
          description: '0x2223344556677',
        }, {
          key: '2',
          title: 'Address 2',
          description: '0x2223aa45566778899',
        }, {
          key: '3',
          title: 'Address 3',
          description: '0x22233445ss6778899',
        }, {
          key: '4',
          title: 'Address 4',
          description: '0xa1233445566778899',
        }, {
          key: '5',
          title: 'Address 5',
          description: '0xDD233433566778899',
        }, {
          key: '6',
          title: 'Address 3',
          description: '0x22233445ss6778899',
        }, {
          key: '7',
          title: 'Address 4',
          description: '0xa1233445566778899',
        }, {
          key: '8',
          title: 'Address 5',
          description: '0xDD233433566778899',
        }],
      })}
    </div>
  ))
  // .add('JPicker internal list', () => (
  //   <div className='story'>
  //     <JPickerList
  //       activeItemKey='2'
  //       onItemClick={console.log}
  //     >
  //       <DefaultItem title='aaa' key='1' description='Hello' />
  //       <DefaultItem title='aaa' key='2' />
  //       <DefaultItem title='aaa' key='3' />
  //       <DefaultItem title='aaa' key='4' />
  //       <DefaultItem title='aaa' key='5' />
  //     </JPickerList>
  //   </div>
  // ))
  .add('Picker current not editable', () => (
    <div className='story'>
      <JPickerCurrent
        label='Recipient'
        isEditable={false}
        iconRenderer={() => <JIcon name='star' color='blue' />}
      />
    </div>
  ))
  .add('Picker current not editable with value', () => (
    <div className='story'>
      <JPickerCurrent
        label='Recipient'
        value='asfd afs'
        isEditable={false}
        iconRenderer={() => <JIcon name='star' color='blue' />}
      />
    </div>
  ))
  .add('Picker current with icon', () => (
    <div className='story'>
      <JPickerCurrent
        label='Recipient'
        iconRenderer={() => <JIcon name='star' color='blue' />}
      />
    </div>
  ))
  .add('Picker current without icon', () => (
    <div className='story'>
      <JPickerCurrent
        label='Recipient'
        value='abcd'
      />
    </div>
  ))

