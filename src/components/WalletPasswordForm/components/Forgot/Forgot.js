// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import { Button } from 'components/base'
import { UserActionInfo } from 'components'

import styles from './forgot.m.scss'

type Props = {|
  +i18n: I18n,
|}

type StateProps = {|
  +isActive: boolean,
|}

class Forgot extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isActive: false,
    }
  }

  handleSetActiveOn = () => {
    this.setState({ isActive: true })
  }

  handleSetActiveOff = () => {
    this.setState({ isActive: false })
  }

  render() {
    const { i18n }: Props = this.props

    return (
      <div className={styles.core}>
        {this.state.isActive && (
          <div className={styles.overlay}>
            <div className={styles.info}>
              <UserActionInfo
                title={i18n._(
                  'Forgot.title',
                  null,
                  { defaults: 'Forgot Security Password' },
                )}
                text={i18n._(
                  'Forgot.description',
                  null,
                  {
                    // eslint-disable-next-line max-len
                    defaults: 'Unfortunately, Security Password can’t be restored. If you would like to reset Jwallet to initial state and drop your old Security Password, please contact Support.',
                  },
                )}
                iconClassName={styles.icon}
                iconColor='blue'
                iconName='ic_attention_48-use-fill'
              />
              <Button
                onClick={this.handleSetActiveOff}
                className={styles.back}
                type='button'
                theme='general-confirm'
              >
                {i18n._(
                  'Forgot.action.back',
                  null,
                  { defaults: 'Try Again' },
                )}
              </Button>
            </div>
          </div>
        )}
        <Button
          onClick={this.handleSetActiveOn}
          className={styles.forgot}
          type='button'
          theme='additional'
        >
          {i18n._(
            'Forgot.action.forgot',
            null,
            { defaults: 'Forgot?' },
          )}
        </Button>
      </div>
    )
  }
}

const ForgotEnhanced = withI18n()(Forgot)
export { ForgotEnhanced as Forgot }
