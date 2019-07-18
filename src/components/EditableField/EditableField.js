// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'

import styles from './editableField.m.scss'

type EditableFieldTheme = 'blue' | 'white'
type EditableFieldHandler = (newValue: string) => any

type Props = {|
  +onFocus: ?(() => any),
  +onChange: ?EditableFieldHandler,
  +sanitize: ?EditableFieldHandler,
  +onChangeFinish: EditableFieldHandler,
  +value: string,
  +label: string,
  +className: string,
  +theme: EditableFieldTheme,
  +maxLen: number,
  +isDefaultFocused: boolean,
|}

type StateProps = {|
  +newValue: string,
  +isEditActive: boolean,
|}

export class EditableField extends Component<Props, StateProps> {
  valueRef = React.createRef<HTMLInputElement>()

  static defaultProps = {
    onFocus: undefined,
    onChange: undefined,
    sanitize: undefined,
    label: '',
    theme: 'blue',
    className: '',
    maxLen: 1000,
    isDefaultFocused: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      newValue: props.value,
      isEditActive: props.isDefaultFocused,
    }
  }

  componentDidUpdate() {
    const isPrevActive: boolean = this.state.isEditActive
    const isNowActive: boolean = this.props.isDefaultFocused

    if (!isPrevActive && isNowActive) {
      this.setActive(true)
    }
  }

  handleClick = (e: Event) => {
    this.setActive(true)
    e.stopPropagation()
  }

  setActive = (isEditActive: boolean) => {
    this.setState({ isEditActive: !!isEditActive }, () => {
      if (isEditActive && this.valueRef && this.valueRef.current) {
        this.valueRef.current.focus()
      }
    })
  }

  handleEdit = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      onChange,
      maxLen,
    }: Props = this.props

    const newValue: string = e.target.value.substring(0, maxLen)

    if (onChange) {
      onChange(newValue)
    }

    this.setState({ newValue })
  }

  handleEditFinish = () => {
    this.setActive(false)

    const {
      sanitize,
      onChangeFinish,
      value,
    }: Props = this.props

    const newValue: string = !sanitize ? this.state.newValue : sanitize(this.state.newValue)

    if (!newValue || (value === newValue)) {
      this.setState({ newValue: value })

      return
    }

    onChangeFinish(newValue)
    this.setState({ newValue })
  }

  render() {
    const {
      label,
      theme,
      className,
      onFocus: handleFocus,
    }: Props = this.props

    const {
      newValue,
      isEditActive,
    }: StateProps = this.state

    return (
      <div
        className={classNames(
          styles.core,
          styles[theme],
          className,
        )}
      >
        {label && (
          <div
            onClick={this.handleClick}
            className={styles.label}
          >
            {label}
          </div>
        )}
        <div className={styles.wrapper}>
          <div
            className={classNames(
              styles.value,
              isEditActive && styles.editable,
            )}
            onClick={this.handleClick}
          >
            {isEditActive
            /**
             * Next line is necessarry, because we must render newValue inside div
             * to show background. But ending spaces are ignored,
             * so we have to replace them by something.
             */
              ? newValue.replace(/ /g, '.')
              : newValue
            }
          </div>
          {isEditActive && (
            <input
              onFocus={handleFocus}
              onChange={this.handleEdit}
              onBlur={this.handleEditFinish}
              ref={this.valueRef}
              value={newValue}
              className={styles.input}
              type='text'
            />
          )}
        </div>
      </div>
    )
  }
}
