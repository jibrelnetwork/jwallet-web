/* Bookmarklet script to download database snapshot
   Made using ES3 to support more browsers */
;(function () {
  var OBJECT_STORE_NAME = 'keyvaluepairs';
  var DB_NAME = 'localforage'

  function getAllItems(db, callback) {
    var trans = db.transaction(OBJECT_STORE_NAME, IDBTransaction.READ_ONLY);
    var store = trans.objectStore(OBJECT_STORE_NAME);
    var snapshot = {};

    trans.oncomplete = function() {
      callback(snapshot);
    };

    var cursorRequest = store.openCursor();

    cursorRequest.onerror = function(error) {
      console.log(error);
    };

    cursorRequest.onsuccess = function(evt) {
      var cursor = evt.target.result;
      if (cursor) {
        snapshot[cursor.key] = cursor.value;
        cursor.continue();
      }
    };
  }

  var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
      var json = JSON.stringify(data),
        blob = new Blob([json], {type: "octet/stream"}),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }());


  var dbOpen = indexedDB.open(DB_NAME);
  dbOpen.onerror = console.error;
  dbOpen.onsuccess = function () {
    return getAllItems(dbOpen.result, function (data) {
      saveData(data, 'jwallet-idb-snapshot.json');
    });
  }
})();
