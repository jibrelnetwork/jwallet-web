// @flow

import { connect } from 'react-redux'

import DigitalAssetsList from '../../components/DigitalAssetsList'

const mapStateToProps: Function = (): { type: 'balance' } => ({ type: 'balance' })

export default connect(mapStateToProps)(DigitalAssetsList)
