// @flow

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import {
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

import style from './AgreementsView.m.scss'

export type Props = {|
  +onSubmit: () => void,
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

class AgreementsView extends PureComponent<Props, StateProps> {
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
      <div className={style.container}>
        <div className={style.content}>
          <h1 className={style.title}>
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
              <div className={style.item} key={key}>
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
                    <a
                      className='j-text -white link'
                      href='https://jwallet.network/docs/JibrelAG-TermsofUse.pdf'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {t`Terms of Use`}
                    </a>
                    <span className='label'>
                      <JText color='white' whiteSpace='wrap' value={t`and`} />
                    </span>
                    <a
                      className='j-text -white link'
                      href='https://jwallet.network/docs/JibrelAG-PrivacyPolicy.pdf'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {t`Privacy Policy`}
                    </a>
                  </JCheckbox>
                )}
              </div>
            ))}
          </div>
          <div className={style.action}>
            <JRaisedButton
              onClick={this.props.onSubmit}
              color='white'
              labelColor='blue'
              label={t`Confirm and continue`}
              isDisabled={isDisabled}
              isWide
            />
          </div>
        </div>
      </div>
    )
  }
}

export default AgreementsView
