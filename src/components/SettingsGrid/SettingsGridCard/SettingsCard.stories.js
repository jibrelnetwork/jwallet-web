// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import SettingsCard from 'components/SettingsGrid/SettingsGridCard'

storiesOf('SettingsCard')
  .add('Default', () => (
    <div className='story'>
      <h2>Default</h2>
      <div style={{ marginBottom: '40px' }}>
        <SettingsCard
          title='Settings'
          description='Settings of wallet'
          path='hello'
          iconName='setting'
          iconColor='blue'
        />
      </div>
      <div className='box'>
        <SettingsCard
          title='PIN Code'
          description='Babaaaaaaaaah!'
          path='hello'
          iconName='lock-pin'
          iconColor='blue'
        />
      </div>
    </div>
  ))
  .add('In grid', () => (
    <div className='story'>
      <h2>In grid</h2>
      <div className='grid'>
        <div className='box'>
          <SettingsCard
            title='System language'
            description='English'
            path='hello'
            iconName='language'
          />
        </div>
        <div className='box'>
          <SettingsCard
            title='Hello'
            description='Some description'
            path='hello'
            iconName={null}
          />
        </div>
        <div className='box'>
          <SettingsCard
            title='Google'
            description='Global search engine'
            path='https://google.com'
            iconName='search'
            iconColor='gray'
          />
        </div>
        <div className='box'>
          <SettingsCard
            title='World'
            description='LonglonglongdescriptionLonglonglongdescription'
            path='hello'
            iconName='lock-pin'
          />
        </div>
        <div className='box'>
          <SettingsCard
            title='Hello'
            description='Some description'
            path='hello'
            iconName='cross-circle'
            iconColor='red'
          />
        </div>
        <div className='box'>
          <SettingsCard
            title='Default GAS Price'
            description='30,000'
            path='hello'
            iconName='time'
            iconColor='gray'
          />
        </div>
        <div className='box'>
          <SettingsCard
            title='Check a signature'
            description='LonglonglongdescriptionLonglonglongdescription'
            path='hello'
            iconName='protect'
          />
        </div>
      </div>
    </div>
  ))
