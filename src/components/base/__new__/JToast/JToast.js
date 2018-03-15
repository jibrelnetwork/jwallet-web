import React from 'react'
import { toast } from 'react-toastify'
import { pure } from 'recompose'

import JText from '../JText'
import JIcon from '../JIcon'

type Props = {
  type: 'info' | 'error',
  icon: string,
  text: string,
}

const JToast = ({ type, icon, text }: Props) => (
  <div className={`JToast -${type}`}>
    <div className='icon'>
      <JIcon name={icon} small />
    </div>
    <div className='text'>
      <JText value={text} />
    </div>
    <div className='close'>
    </div>
  </div>
)

export const options = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 5000,
  pauseOnHover: true,
  hideProgressBar: true,
  // closeButton: <Button />,
  // transition: CustomTransition
}

export default pure(JToast)
