// @flow

import { connect } from 'react-redux'

import { setActive } from 'routes/DigitalAssets/modules/digitalAssets'

import AssetsStep from '../components/AssetsStep'

const mapStateToProps = ({ digitalAssets }: State): DigitalAssetsData => digitalAssets
const mapDispatchToProps = { setActive }

export default connect(mapStateToProps, mapDispatchToProps)(AssetsStep)
