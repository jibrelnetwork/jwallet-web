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
    addNewKeys: () => { return alert('addNewKeys handler') },
    importKeys: () => { return alert('importKeys handler') },
    backupKeys: () => { return alert('backupKeys handler') },
    clearKeys: () => { return alert('clearKeys handler') },
    keys: keys,
    active: 1,
  }
}
