// @flow

import { connect } from 'react-redux'

import DigitalAssetsList from '../../../components/DigitalAssetsList'

const mapStateToProps: Function = (): { type: 'custom' } => ({ type: 'custom' })

export default connect(mapStateToProps)(DigitalAssetsList)
