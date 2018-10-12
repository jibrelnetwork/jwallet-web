// @flow

import fileSaver from 'file-saver'
import jsonFormat from 'json-format'

import config from 'config'
import isSafari from 'utils/browser/isSafari'

function saveTXT(data: any, name: string) {
  saveAs(data, getFileName(name, 'txt'))
}

function saveJSON(data: any, name: string) {
  saveAs(jsonFormat(data, config.jsonFormat), getFileName(name, 'json'))
}

function saveCanvas(canvas: any, name: string) {
  canvas.toBlob(blob => fileSaver.saveAs(blob, getFileName(name, 'png')))
}

function saveAs(data: any, fileName: string) {
  fileSaver.saveAs(getBlob(data), fileName)
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

export default {
  saveTXT,
  saveJSON,
  saveCanvas,
}
