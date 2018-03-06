// @flow

function copyToBuffer(content: string): boolean {
  try {
    const elementToCopy: Object = createElementToCopy(content)
    selectContent(elementToCopy)
    copyContent()
    cleanSelection(elementToCopy)
  } catch (err) {
    return false
  }

  return true
}

function copyContent(): void {
  window.document.execCommand('copy')
}

function createElementToCopy(address: Address): Object {
  const elementToCopy = window.document.createElement('div')
  elementToCopy.style.position = 'absolute'
  elementToCopy.style.top = '-5000px'
  elementToCopy.innerHTML = address

  if (window.document.body) {
    window.document.body.appendChild(elementToCopy)
  }

  return elementToCopy
}

function selectContent(elementToCopy: Object): void {
  const range = window.document.createRange()
  range.selectNodeContents(elementToCopy)

  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
}

function cleanSelection(elementToCopy: Object): void {
  const selection = window.getSelection()
  selection.removeAllRanges()
  elementToCopy.remove()
}

export default copyToBuffer
