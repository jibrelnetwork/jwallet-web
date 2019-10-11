// @flow strict

import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { type I18n } from '@lingui/core'

import {
  Trans,
  withI18n,
} from '@lingui/react'

import { StartLayout } from 'layouts'
import { gaSendEvent } from 'utils/analytics'
import { CONDITIONS_LIST } from 'data/agreements'
import { selectAgreementsConditions } from 'store/selectors/user'

import {
  JLink,
  JIcon,
  JCheckbox,
  Button,
} from 'components/base'

import {
  setAgreementIsConfirmed,
  setAllAgreementsAreConfirmed,
} from 'store/modules/user'

import styles from './agreements.m.scss'

type OwnProps = {|
  +i18n: I18n,
|}

type Props = {|
  ...OwnProps,
  +setAgreementIsConfirmed: Function,
  +setAllAgreementsAreConfirmed: Function,
  +agreements: {
    [agreement: string]: boolean,
  },
|}

class AgreementsView extends PureComponent<Props> {
  onChange = (key: string) => (isChecked: boolean) => {
    this.props.setAgreementIsConfirmed(key, isChecked)
  }

  handleAgreementsConfirmClick = () => {
    this.props.setAllAgreementsAreConfirmed(true)

    gaSendEvent(
      'CreateAccount',
      'AgreementsConfirmed',
    )
  }

  componentDidMount = () => {
    this.props.setAllAgreementsAreConfirmed(false)
  }

  render() {
    const {
      agreements,
      i18n,
    } = this.props

    /* eslint-disable max-len */
    const conditions = {
      understandPrivateDataPolicy: i18n._(
        'Agreements.understandPrivateDataPolicy',
        null,
        { defaults: 'I understand that my funds are stored securely on my personal computer. No private data is sent to Jibrel AG servers. All encryption is done locally in browser' },
      ),
      consentNoWarranty: i18n._(
        'Agreements.consentNoWarranty',
        null,
        { defaults: 'I consent that Jwallet service is provided as is without warranty. Jibrel AG does not have access to my private information and could not participate in resolution of issues concerning money loss of any kind' },
      ),
      consentTrackingCookies: i18n._(
        'Agreements.consentTrackingCookies',
        null,
        { defaults: 'I consent to allow cookies for collecting anonymous usage data to improve quality of provided service' },
      ),
    }
    /* eslint-enable max-len */

    const isAllAgreementsChecked = CONDITIONS_LIST.every(key => agreements[key])

    return (
      <StartLayout className='__agreements-view'>
        <div className={styles.content}>
          <JIcon
            name='terms-and-conditions-use-fill'
            className={styles.icon}
            color='blue'
          />
          <h1 className={styles.title}>
            {i18n._(
              'Agreements.title',
              null,
              { defaults: 'Terms and Conditions' },
            )}
          </h1>
          <div>
            {CONDITIONS_LIST.map((key: string) => (
              <div className={styles.item} key={key}>
                {key !== 'acceptTermsAndConditions' ? (
                  <JCheckbox
                    onChange={this.onChange(key)}
                    name={key}
                    isChecked={agreements[key]}
                  >
                    {conditions[key]}
                  </JCheckbox>
                ) : (
                  <JCheckbox
                    onChange={this.onChange(key)}
                    name={key}
                    isChecked={agreements[key]}
                  >
                    {/* eslint-disable max-len */}
                    <Trans id='Agreements.acceptTermsAndConditions'>
                      I have read and accepted <JLink theme='text-blue' href='https://jwallet.network/docs/JibrelAG-TermsofUse.pdf'>Terms of Use</JLink> and <JLink theme='text-blue' href='https://jwallet.network/docs/JibrelAG-PrivacyPolicy.pdf'>Privacy Policy</JLink>
                    </Trans>
                    {/* eslint-enable max-len */}
                  </JCheckbox>
                )}
              </div>
            ))}
          </div>
          <div className={styles.action}>
            <JLink href='/wallets'>
              <Button
                className={styles.button}
                theme='general'
                isDisabled={!isAllAgreementsChecked}
                onClick={this.handleAgreementsConfirmClick}
              >
                {i18n._(
                  'Agreements.action.submit',
                  null,
                  { defaults: 'Continue' },
                )}
              </Button>
            </JLink>
          </div>
        </div>
      </StartLayout>
    )
  }
}

function mapStateToProps(state: AppState) {
  return {
    agreements: selectAgreementsConditions(state),
  }
}

const mapDispatchToProps = {
  setAgreementIsConfirmed,
  setAllAgreementsAreConfirmed,
}

export const Agreements = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AgreementsView)
