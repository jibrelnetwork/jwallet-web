// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCustomAsset } from 'store/stateSelectors'
import { DigitalAssetEditForm } from 'components'

import {
  openView,
  closeView,
  setField,
} from './modules/addAsset'

type StateProps = {
  formFields: CustomAssetFormFields,
  invalidFields: CustomAssetFormFields,
}

type DispatchProps = {
  open: () => void,
  close: () => void,
  submit: () => void,
  setField: SetFieldFunction<CustomAssetFormFields>,
}

class CustomAssetAddContainer extends Component<StateProps & DispatchProps, *> {
  componentDidMount() {
    this.props.open()
  }

  componentWillUnmount() {
    this.props.close()
  }

  render() {
    return (
      <DigitalAssetEditForm {...this.props} />
    )
  }
}

const mapDispatchToProps = {
  open: openView,
  close: closeView,
  setField,
  // submit
}

function mapStateToProps(state: AppState): StateProps {
  const { formFields, invalidFields, isAssetLoading } = selectCustomAsset(state)

  return {
    formFields,
    invalidFields,
    isAddressLoading: isAssetLoading,
    isAddressEditable: true,
    submitLabel: 'Add asset',
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomAssetAddContainer)
