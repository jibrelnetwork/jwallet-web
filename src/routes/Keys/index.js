import KeysLayout from 'layouts/KeysLayout'

import Start from './routes/Start'
import CreateKey from './routes/CreateKey'
import ImportKey from './routes/ImportKey'
import EditKey from './routes/EditKey'
import BackupKey from './routes/BackupKey'
import ChangeKeyPassword from './routes/ChangeKeyPassword'
import ClearKey from './routes/ClearKey'

export default store => ({
  path: 'keys',
  component: KeysLayout,
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        const Keys = require('./containers/KeysContainer').default
        cb(null, Keys)
      }, 'keys')
    },
  },
  childs: [
    Start(store),
    CreateKey(store),
    ImportKey(store),
    EditKey(store),
    BackupKey(store),
    ChangeKeyPassword(store),
    ClearKey(store),
  ],
})
