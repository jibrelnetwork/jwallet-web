// @flow strict

import React from 'react'
import { connect } from 'react-redux'

import { selectToastsData } from 'store/selectors/toasts'

import styles from './toast.m.scss'

type Props = {|
  +data: ?ToastPayload,
|}

function Toast({ data }: Props) {
  if (!data) {
    return <div className={`${styles.core} ${styles.empty}`}/>
  }

  const {
    // controls,
    // icon,
    message,
    // controlsPosition,
  } = data

  return (
    <div className={styles.core}>
      <div className={styles.data}>
        <div className={styles.message}>
          {message}
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state: AppState) {
  return {
    data: selectToastsData(state),
  }
}

const ToastEnhanced = connect<Props, OwnPropsEmpty, _, _, _, _>(
  mapStateToProps,
)(Toast)

export { ToastEnhanced as Toast }
