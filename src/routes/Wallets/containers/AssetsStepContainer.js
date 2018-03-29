// @flow

import { connect } from 'react-redux'

import AssetsStep from '../components/AssetsStep'
import { setActive } from '../../DigitalAssets/modules/digitalAssets'

const mapStateToProps = ({ digitalAssets }: State): DigitalAssetsData => digitalAssets
const mapDispatchToProps = { setActive }

export default connect(mapStateToProps, mapDispatchToProps)(AssetsStep)
