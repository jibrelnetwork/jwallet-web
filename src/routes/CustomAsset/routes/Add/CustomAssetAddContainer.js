// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  close,
  setField,
  addAsset,
  openCustomAssetAdd,
} from '../../modules/customAsset'

import { CustomAsset } from '../../components'
import { selectCustomAsset } from '../../../../store/stateSelectors'

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
      <CustomAsset type='add' {...this.props} />
    )
  }
}

const mapDispatchToProps = {
  open: openCustomAssetAdd,
  close,
  submit: addAsset,
  setField,
}

function mapStateToProps(state: State): StateProps {
  const { formFields, invalidFields, isAssetLoading } = selectCustomAsset(state)

  return {
    formFields,
    invalidFields,
    isAssetLoading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomAssetAddContainer)
