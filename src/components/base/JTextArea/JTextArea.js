// @flow strict

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import {
  noop,
  omit,
  kebabCase,
} from 'lodash-es'

import getErrorMessage from 'utils/form/getErrorMessage'
import JFieldMessage from 'components/base/JFieldMessage'

import styles from './jTextArea.m.scss'

type Theme = 'white'

type Props = StyleComponent<Theme> & {
  +onChange: MaybeEventHandler<HTMLTextAreaElement>,
  +meta: FinalFormMeta,
  +input: FinalFormInput,
  +id: ?string,
  +label: string,
  +infoMessage: ?string,
  +errorMessage: ?string,
  +validateType: FinalFormValidateType,
  +rows: number,
  +isDisabled: boolean,
}

type TextAreaRef = {
  current: null | HTMLTextAreaElement,
}

const MAX_ROWS = 12

const checkExpandable = ({ rows }) => ((rows >= 1) && (MAX_ROWS >= rows))

const checkHeightIncreased = ({
  clientHeight,
  scrollHeight,
}) => (clientHeight < scrollHeight)

function heightCalc(currentTarget): void {
  if (!currentTarget) {
    return
  }

  const isExpandable: boolean = checkExpandable(currentTarget)
  const isHeightIncreased: boolean = checkHeightIncreased(currentTarget)

  if (!isExpandable) {
    return
  }

  if (isHeightIncreased) {
    while (checkExpandable(currentTarget) && checkHeightIncreased(currentTarget)) {
      // eslint-disable-next-line fp/no-mutation, no-param-reassign
      currentTarget.rows += 1
    }
  }
}

export default class JTextArea extends PureComponent<Props> {
  static defaultProps = {
    meta: {},
    input: {},
    onChange: noop,
    id: null,
    label: '',
    className: '',
    theme: 'white',
    infoMessage: null,
    errorMessage: null,
    validateType: 'dirtySinceLastSubmit',
    rows: 1,
    isDisabled: false,
  }

  constructor(props: Props) {
    super(props)

    this.textArea = React.createRef()
  }

  componentDidMount() {
    heightCalc(this.textArea.current)
  }

  textArea: TextAreaRef

  handleFocus = () => {
    if (this.textArea.current) {
      this.textArea.current.focus()
    }
  }

  handleChange = (event: SyntheticEvent<HTMLTextAreaElement>): void => {
    const {
      onChange,
      input,
    }: Props = this.props

    onChange(event)
    heightCalc(event.currentTarget)

    if (input && input.onChange) {
      input.onChange(event)
    }
  }

  render() {
    const omittedProps = omit(this.props, [
      'onChange',
      'meta',
      'input',
      'children',
      'id',
      'error',
      'theme',
      'label',
      'className',
      'placeholder',
      'infoMessage',
      'errorMessage',
      'validateType',
      'isDisabled',
    ])

    const {
      meta,
      input,
      id,
      label,
      theme,
      className,
      infoMessage,
      errorMessage,
      validateType,
      isDisabled,
    }: Props = this.props

    const errorMsg: ?string = errorMessage || getErrorMessage(meta, validateType)
    const elementID: string = id || `${kebabCase(input.name || label || 'noname')}Id`

    const hasError: boolean = !!errorMsg
    const hasInfo: boolean = !!infoMessage
    const hasMessage: boolean = (hasError || hasInfo)
    const isActive: boolean = (meta.active || (input.value && input.value.length))

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <div
        className={classNames(
          '__textarea',
          styles.core,
          styles[theme],
          className,
        )}
      >
        <div
          onClick={this.handleFocus}
          className={classNames(
            styles.wrap,
            hasError && styles.error,
            isActive && styles.active,
            hasMessage && styles.message,
            isDisabled && styles.disabled,
          )}
        >
          {label && elementID && (
            <label
              className={styles.label}
              htmlFor={elementID}
            >
              {label}
            </label>
          )}
          <textarea
            {...input}
            {...omittedProps}
            onChange={this.handleChange}
            ref={this.textArea}
            id={elementID}
            className={styles.input}
            disabled={isDisabled}
          />
        </div>
        {hasMessage && (
          <JFieldMessage
            message={errorMsg || infoMessage}
            theme={hasError ? 'error' : 'info'}
            className={styles.fieldMessage}
          />
        )}
      </div>
    )
    /* eslint-enable jsx-a11y/label-has-for */
  }
}
