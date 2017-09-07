const keys = [
  { privateKey: '0x12E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
  { privateKey: '0x22E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
  { privateKey: '0x32E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
  { privateKey: '0x42E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
  { privateKey: '0x52E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
  { privateKey: '0x62E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
]

export default {
  accountsStyle: {
    backgroundColor: '#2d2c3e',
    background: 'linear-gradient(to top, #2d2c3e, #474667)',
  },
  currencyList: [
    { text: 'USD' },
    { text: 'EUR' },
    { text: 'GBK' },
  ],
  loaderStyle: { width: '200px', height: '100px', position: 'relative', border: '3px solid #999' },
  keysManagerProps: {
    setActiveKey: index => { return () => alert(`Key ${index + 1} picked`) },
    addNewKeys: () => alert('addNewKeys handler'),
    importKeys: () => alert('importKeys handler'),
    backupKeys: () => alert('backupKeys handler'),
    clearKeys: () => alert('clearKeys handler'),
    keys: {
      items: keys,
      active: 1,
    },
  },
  transactions: [{
    type: 'receive',
    symbol: 'ETH',
    status: 'Pending',
    from: '0x01360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    to: '0x02360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    txHash: '0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
    fee: '0.0005 ETH 1.5 JNT',
    amount: 0.21234,
    timestamp: (new Date()).setDate(11),
  }, {
    type: 'send',
    symbol: 'ETH',
    status: 'Accepted',
    from: '0x03360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    to: '0x04360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    txHash: '0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
    fee: '0.0005 ETH 1.5 JNT',
    amount: 9.23456,
    timestamp: (new Date()).setDate(1),
  }, {
    type: 'receive',
    symbol: 'ETH',
    status: 'Rejected',
    from: '0x05360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    to: '0x06360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    txHash: '0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
    fee: '0.0005 ETH 1.5 JNT',
    amount: 6.78900009765,
    timestamp: (new Date()).setDate(21),
  }, {
    type: 'send',
    symbol: 'ETH',
    status: 'Waiting',
    from: '0x07360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    to: '0x08360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    txHash: '0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
    fee: '0.0005 ETH 1.5 JNT',
    amount: 3.12313123213,
    timestamp: (new Date()).setDate(3),
  }],
  accounts: [{
    symbol: 'ETH',
    balance: 2.123,
    isLicensed: false,
    isAuthRequired: false,
    isActive: true,
    isCurrent: false,
  }, {
    symbol: 'jUSD',
    balance: 7.890,
    isLicensed: false,
    isAuthRequired: false,
    isActive: true,
    isCurrent: true,
  }, {
    symbol: 'jEUR',
    balance: 8.657,
    isLicensed: false,
    isAuthRequired: true,
    isActive: true,
    isCurrent: false,
  }, {
    symbol: 'JNT',
    balance: 9.999,
    isLicensed: true,
    isAuthRequired: true,
    isActive: true,
    isCurrent: false,
  }],
}
