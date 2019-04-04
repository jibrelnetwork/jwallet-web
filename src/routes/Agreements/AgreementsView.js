// @flow strict

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import {
  JLink,
  JText,
  JCheckbox,
  JRaisedButton,
} from 'components/base'

import {
  checkAgreements,
  getAgreementValue,
  setAgreementValue,
} from 'utils/agreements'

import { CONDITIONS_LIST } from 'data/agreements'

import agreementsViewStyle from './AgreementsView.m.scss'

export type Props = {|
|}

type StateProps = {|
  +isDisabled: boolean,
|}

/* eslint-disable max-len */
const conditions = {
  understandPrivateDataPolicy: t`I understand that my funds are stored securely on my personal computer. No private data is sent to Jibrel AG servers. All encryption is done locally in browser`,
  consentNoWarranty: t`I consent that Jwallet service is provided as is without warranty. Jibrel AG does not have access to my private information and could not participate in resolution of issues concerning money loss of any kind`,
  consentTrackingCookies: t`I consent to allow cookies for collecting anonymous usage data to improve quality of provided service`,
  acceptTermsAndConditions: t`I have read and accepted`,
}
/* eslint-enable max-len */

export class AgreementsView extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isDisabled: !checkAgreements(CONDITIONS_LIST),
    }
  }

  onChange = (key: string) => () => {
    setAgreementValue(key, !getAgreementValue(key))
    this.setState({ isDisabled: !checkAgreements(CONDITIONS_LIST) })
  }

  render() {
    const {
      isDisabled,
    }: StateProps = this.state

    return (
      <div className={`__agreements-view ${agreementsViewStyle.core}`}>
        <div className={agreementsViewStyle.content}>
          <h1 className={agreementsViewStyle.title}>
            <JText
              size='title'
              color='white'
              value={t`Terms and Conditions`}
              whiteSpace='wrap'
              align='center'
            />
          </h1>
          <div>
            {CONDITIONS_LIST.map((key: string) => (
              <div className={agreementsViewStyle.item} key={key}>
                {key !== 'acceptTermsAndConditions' ? (
                  <JCheckbox
                    onChange={this.onChange(key)}
                    label={conditions[key]}
                    color='white'
                    name={key}
                    isChecked={getAgreementValue(key)}
                    isRegular
                  />
                ) : (
                  <JCheckbox
                    onChange={this.onChange(key)}
                    color='white'
                    label={t`I have read and accepted`}
                    name={key}
                    isChecked={getAgreementValue(key)}
                    isRegular
                  >
                    {' '}
                    <JLink
                      theme='text-white'
                      href='https://jwallet.network/docs/JibrelAG-TermsofUse.pdf'
                    >
                      {t`Terms of Use`}
                    </JLink>
                    {' '}
                    <span className='label'>
                      <JText color='white' whiteSpace='wrap' value={t`and`} />
                    </span>
                    {' '}
                    <JLink
                      theme='text-white'
                      href='https://jwallet.network/docs/JibrelAG-PrivacyPolicy.pdf'
                    >
                      {t`Privacy Policy`}
                    </JLink>
                  </JCheckbox>
                )}
              </div>
            ))}
          </div>
          <div className={agreementsViewStyle.action}>
            <JLink href='/wallets'>
              <JRaisedButton
                className={agreementsViewStyle.button}
                theme='white'
                disabled={isDisabled}
              >
                {t`Confirm and continue`}
              </JRaisedButton>
            </JLink>
          </div>
        </div>
      </div>
    )
  }
}
