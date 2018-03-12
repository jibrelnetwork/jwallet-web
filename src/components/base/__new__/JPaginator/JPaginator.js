import React from 'react'
import { pure } from 'recompose'
import { range } from 'ramda'
import classNames from 'classnames'

import './JPaginator.scss'

type Props = {
  stepsCount: number,
  currentStep: number,
}

const JPaginator = ({ stepsCount, currentStep }: Props) => (
  <div className='JPaginator' >
    {range(1, stepsCount).map(step => (
      <div
        key={step}
        className={classNames('step', { '-current': step === currentStep })}
      >
        {step}
      </div>
    ))}
  </div>
)

export default pure(JPaginator)
