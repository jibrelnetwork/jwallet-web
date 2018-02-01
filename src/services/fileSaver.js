// @flow

import fileSaver from 'file-saver'
import jsonFormat from 'json-format'

import config from 'config'
import isSafari from 'utils/isSafari'

function saveTXT(data: any, name: string) {
  return saveAs(data, getFileName(name, 'txt'))
}

function saveJSON(data: any, name: string) {
  return saveAs(jsonFormat(data, config.jsonFormat), getFileName(name, 'json'))
}

function saveAs(data: any, fileName: string) {
  return fileSaver.saveAs(getBlob(data), fileName)
}

function getBlob(data: any) {
  return new Blob([data], { type: isSafari() ? 'application/octet-stream' : 'text/plain' })
}

function getFileName(fileName: string = 'jwallet-backup', format: string = 'txt') {
  return `${fileName} ${getTimestamp()}.${format}`
}

function getTimestamp() {
  return (new Date()).toString()
}

export default { saveTXT, saveJSON }
