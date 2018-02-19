import createKey from '../routes/CreateKey/sagas'
import importKey from '../routes/ImportKey/sagas'
import editKey from '../routes/EditKey/sagas'
import backupKey from '../routes/BackupKey/sagas'
import changeKeyPassword from '../routes/ChangeKeyPassword/sagas'
import clearKey from '../routes/ClearKey/sagas'

export default {
  ...createKey,
  ...importKey,
  ...editKey,
  ...backupKey,
  ...changeKeyPassword,
  ...clearKey,
}
