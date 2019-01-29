// @flow

import React, { PureComponent } from 'react'
import { JCheckbox, JText, JRaisedButton } from 'components/base'
import { setAgreementValue, getAgreementValue, checkAgreements } from 'utils/agreements'

export type Props = {|
  +onSubmit: () => void,
|}

type StateProps = {|
  +isDisabled: boolean,
|}

const conditions = {
  understandPrivateDataPolicy: `I understand that my funds are stored securely on my personal
  computer. No private data is sent to Jibrel AG servers.
  All encryption is done locally in browser`,
  consentNoWarranty: `I consent that Jwallet service is provided as is without warranty.
  Jibrel AG does not have access to my private information and could not
  participate in resolution of issues concerning money loss of any kind`,
  consentTrackingCookies: `I consent to allow cookies for collecting anonymous usage data to improve
  quality of provided service`,
  acceptTermsAndConditions: 'I have read and accepted',
}

const conditionsList = [
  'understandPrivateDataPolicy',
  'consentNoWarranty',
  'consentTrackingCookies',
  'acceptTermsAndConditions',
]

class AgreementsView extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isDisabled: !checkAgreements(conditionsList),
    }
  }

  onChange = (key: string, value: boolean) => () => {
    setAgreementValue(key, value)
    this.setState({ isDisabled: !checkAgreements(conditionsList) })
  }

  render() {
    const {
      isDisabled,
    }: StateProps = this.state

    return (
      <div className='agreements-view'>
        <div className='content'>
          <h1 className='title'>
            <JText
              size='title'
              color='white'
              value='Terms and Conditions'
              whiteSpace='wrap'
              align='center'
            />
          </h1>
          <div className='items'>
            {conditionsList.map((key: string) => (
              <div className='item' key={key}>
                {key !== 'acceptTermsAndConditions' ? (
                  <JCheckbox
                    onChange={this.onChange(key, !getAgreementValue(key))}
                    label={conditions[key]}
                    color='white'
                    name={key}
                    isChecked={getAgreementValue(key)}
                    isRegular
                  />
                ) : (
                  <JCheckbox
                    onChange={this.onChange(key, !getAgreementValue(key))}
                    color='white'
                    label='I have read and accepted'
                    name='conditions-3'
                    isChecked={getAgreementValue(key)}
                    isRegular
                  >
                    <a
                      className='j-text -white link'
                      href='https://jwallet.network/docs/JibrelAG-TermsofUse.pdf'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Terms of Use
                    </a>
                    <span className='label'>
                      <JText color='white' whiteSpace='wrap' value='and' />
                    </span>
                    <a
                      className='j-text -white link'
                      href='https://jwallet.network/docs/JibrelAG-PrivacyPolicy.pdf'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Privacy Policy
                    </a>
                  </JCheckbox>
                )}
              </div>
            ))}
          </div>
          <div className='action'>
            <JRaisedButton
              onClick={this.props.onSubmit}
              color='white'
              labelColor='blue'
              label='Confirm and continue'
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
