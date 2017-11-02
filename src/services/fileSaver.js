import fileSaver from 'file-saver'
import jsonFormat from 'json-format'

import config from 'config'

function saveTXT(data, name) {
  return saveAs(data, getFileName(name, 'txt'))
}

function saveJSON(data, name) {
  return saveAs(jsonFormat(data, config.jsonFormat), getFileName(name, 'json'))
}

function saveAs(data, fileName) {
  return fileSaver.saveAs(getBlob(data), fileName)
}

function getBlob(data) {
  return new Blob([data], { type: 'plain/text', endings: 'native' })
}

function getFileName(fileName = 'jwallet-backup', format = 'txt') {
  return `${fileName} ${getTimestamp()}.${format}`
}

function getTimestamp() {
  return (new Date()).toString()
}

export default { saveTXT, saveJSON }
