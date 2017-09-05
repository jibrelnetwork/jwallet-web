import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  JbCheckbox,
  JbIcon,
  JbInput,
  JbLoader,
  JbLogo,
  JbSelect,
} from '../src/components/base'

import props from './props'

storiesOf('JbCheckbox', module)
  .add('common', () => {
    let isActive = false
    const toggle = newState => { isActive = newState }

    return <JbCheckbox toggle={toggle} isActive={isActive} />
  })
  .add('with label', () => {
    let isActive = false
    const toggle = newState => { isActive = newState }

    return <JbCheckbox toggle={toggle} isActive={isActive} label={'Label'} />
  })

storiesOf('JbIcon', module)
  .add('common', () => {
    return (
      <JbIcon name='send' />
    )
  })
  .add('small', () => {
    return (
      <JbIcon name='convert' small />
    )
  })

storiesOf('JbInput', module)
  .add('common', () => {
    return (
      <JbInput
        error={null}
        label={'Account name'}
        placeholder={'Mr. Cardholder'}
      />
    )
  })
  .add('error', () => {
    return (
      <JbInput
        error={'Missing name'}
        label={'Account name'}
        placeholder={'Mr. Cardholder'}
      />
    )
  })

storiesOf('JbLoader', module)
  .add('common', () => {
    return (
      <div style={props.loaderStyle}>
        <JbLoader />
      </div>
    )
  })
  .add('fixed', () => {
    return <JbLoader fixed />
  })

storiesOf('JbLogo', module)
  .add('common', () => {
    return (
      <JbLogo />
    )
  })

storiesOf('JbSelect', module)
  .add('common', () => {
    return (
      <JbSelect
        error={null}
        label={'Currency'}
        list={props.currencyList}
      />
    )
  })
  .add('selected', () => {
    return (
      <JbSelect
        error={null}
        label={'Currency'}
        list={props.currencyList}
        selected={props.currencyList[0]}
      />
    )
  })
