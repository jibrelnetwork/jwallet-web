// @flow

import { connect } from 'react-redux'

import { setActive } from 'routes/DigitalAssets/modules/digitalAssets'

import Popular from '../components/Popular'

const mapStateToProps = ({ digitalAssets }: State): DigitalAssetsData => digitalAssets
const mapDispatchToProps = { setActive }

export default connect(mapStateToProps, mapDispatchToProps)(Popular)
