// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

import CloseableScreen from 'components/CloseableScreen'

import {
  JInput,
  JRaisedButton,
} from 'components/base'

import {
  handle,
  ignoreEvent,
} from 'utils/eventHandlers'

type Props = {|
  +close: () => void,
  +onClose: () => void,
  +add: (string, string, string) => void,
  +edit: (string, string, string) => void,
  +setFormFieldValue: ($Keys<FavoritesFormFields>, string) => void,
  +params: {|
    +address?: string,
  |},
  +foundFavorite: ?Favorite,
  +formFieldValues: FavoritesFormFields,
  +formFieldErrors: FavoritesFormFields,
  +isLoading: boolean,
|}

class FavoritesAddressView extends Component<Props> {
  componentDidMount() {
    const {
      setFormFieldValue,
      params,
      foundFavorite,
    } = this.props

    if (foundFavorite) {
      const {
        name,
        address,
        description,
      }: Favorite = foundFavorite

      setFormFieldValue('address', address)

      if (name) {
        setFormFieldValue('name', name)
      }

      if (description) {
        setFormFieldValue('description', description)
      }
    } else if (params.address) {
      setFormFieldValue('address', params.address)
    }
  }

  setFormFieldValue = (fieldName: $Keys<FavoritesFormFields>) =>
    (value: string) => this.props.setFormFieldValue(fieldName, value)

  render() {
    const {
      add,
      edit,
      close,
      onClose,
      foundFavorite,
      formFieldValues,
      formFieldErrors,
      isLoading,
    }: Props = this.props

    const {
      name,
      address,
      description,
    }: FavoritesFormFields = formFieldValues

    const isExist: boolean = !!foundFavorite
    const submitHandler = handle(isExist ? edit : add)(address, name, description)

    const screenTitle: string = isExist
      ? t`Edit favorite address`
      : t`Add favorite address`

    return (
      <CloseableScreen
        close={close}
        onClose={onClose}
        title={screenTitle}
      >
        <div className='favorites-view -address'>
          <form className='form' onSubmit={ignoreEvent(isLoading ? null : submitHandler)()}>
            <JInput
              onChange={this.setFormFieldValue('address')}
              value={address}
              errorMessage={formFieldErrors.address}
              color='gray'
              placeholder={t`Address`}
              name='favorite-address'
              isDisabled={isExist}
            />
            <JInput
              onChange={this.setFormFieldValue('name')}
              value={name}
              errorMessage={formFieldErrors.name}
              color='gray'
              placeholder={t`Name`}
              name='favorite-name'
            />
            <JInput
              onChange={this.setFormFieldValue('description')}
              value={description}
              errorMessage={formFieldErrors.description}
              color='gray'
              placeholder={t`Description (optional)`}
              name='favorite-description'
            />
            <div className='actions'>
              <JRaisedButton
                onClick={submitHandler}
                label={t`Save`}
                color='blue'
                labelColor='white'
                isLoading={isLoading}
                isWide
              />
            </div>
          </form>
        </div>
      </CloseableScreen>
    )
  }
}

export default FavoritesAddressView
