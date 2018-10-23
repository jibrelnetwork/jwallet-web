// @flow

import { connect } from 'react-redux'

import DigitalAssetsList from '../../components/DigitalAssetsList'

const mapStateToProps: Function = (): { type: 'popular' } => ({ type: 'popular' })

export default connect(mapStateToProps)(DigitalAssetsList)
