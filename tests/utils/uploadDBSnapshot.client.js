// This function runs in environment preset by wdio
// So using arguments is valid here

var obj = arguments[0]
var callback = arguments[arguments.length - 1]
var DB_NAME = 'localforage'
var OBJECT_STORE_NAME = 'keyvaluepairs'

function setItem(store, item, key) {
  return new Promise((resolve, reject) => {
    var tx = store.put(item, key)
    tx.onsuccess = resolve
    tx.onerror = reject
  })
}

function setAllItems(db, data, callback) {
  var trans = db.transaction(OBJECT_STORE_NAME, 'readwrite');
  var store = trans.objectStore(OBJECT_STORE_NAME);

  const keys = Object.keys(data)
  Promise
    .all(
      keys.map((key) =>
        setItem(store, data[key], key)
      )
    )
    .then(callback, console.error)
}

var data = typeof obj === 'string' ?
  JSON.parse(obj) :
  obj
var dbOpen = indexedDB.open(DB_NAME)
dbOpen.onerror = err => {
  console.error(err)
  callback(err)
}
dbOpen.onsuccess = () => setAllItems(
  dbOpen.result,
  data,
  callback,
)

