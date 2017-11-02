import Keystore from 'jwallet-web-keystore'

const keystore = new Keystore({ scryptParams: { N: 2 ** 3, r: 8, p: 1 } })

export default keystore
