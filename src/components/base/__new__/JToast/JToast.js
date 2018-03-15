import React from 'react'
import { toast } from 'react-toastify'
import { pure } from 'recompose'

import JText from '../JText'
import JIcon from '../JIcon'
import JButton from '../JButton'

type Props = {
  color: 'blue' | 'red' | 'white' | 'gray',
  icon: string,
  title: string,
  description: string,
}

const JToast = ({ color, icon, title, description }: Props) => (
  <div className={`j-toast -${color}`}>
    <div className='icon'>
      <JIcon
        name={icon}
        size='medium'
      />
    </div>
    <div className='data'>
      <div className='title'>
        <JText
          value={title}
          variants={[
            color === 'white'
              ? 'gray'
              : 'white',
            'regular',
            'bold',
          ]}
        />
      </div>
      <div className='description'>
        <JText
          value={description}
          variants={[
            color === 'white'
              ? 'gray'
              : 'white',
            'normal',
            'transparent',
          ]}
        />
      </div>
    </div>
    <div className='close'>
      <JButton
        minimal
        iconName={`close-popup-${color === 'white' ? 'gray' : 'white'}`}
        iconSize='medium'
      />
    </div>
  </div>
)

export const options = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 5000000,
  pauseOnHover: true,
  hideProgressBar: true,
  closeButton: false,
  // closeButton: ({ closeToast }) => (
  //   <div className='close'>
  //     <JButton
  //       minimal
  //       onClick={closeToast}
  //       iconName='close'
  //       iconSize='medium'
  //     />
  //   </div>
  // ),
  // transition: CustomTransition
}

export default pure(JToast)
