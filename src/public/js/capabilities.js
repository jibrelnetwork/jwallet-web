// The global variable for checking capabilities of browser API
window._CAPABILITY = {
  isFailed: false,
  list: []
}

window._CAPABILITY.list = [
  checkIndexedDB,
  checkLocalStorage,
];

// indexedDB
function checkIndexedDB() {
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};
  var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  return indexedDB && IDBTransaction && IDBKeyRange ? null : 'IndexedDB API';
}

// localStorage
function checkLocalStorage() {
  return window.localStorage ? null : 'localStorage API';
}
