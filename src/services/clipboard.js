// @flow

function copyContent(): void {
  window.document.execCommand('copy')
}

function hideElement(element: Object): void {
  element.setAttribute('style', 'position: absolute; top: -5000px;')
}

function createContainerWithText(content: string): Object {
  const element: Object = window.document.createElement('div')

  hideElement(element)
  element.innerHTML = content

  window.document.body.appendChild(element)

  return element
}

function createContainerWithImage(image: Object): string {
  const element: Object = window.document.createElement('div')

  hideElement(element)
  element.appendChild(image)

  const id = `${Date.now()}`
  element.setAttribute('id', id)

  window.document.body.appendChild(element)

  return id
}

function selectContent(element: Object): void {
  const range: Object = window.document.createRange()
  range.selectNodeContents(element)

  const selection: Object = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
}

function cleanSelection(element: ?Object): void {
  const selection: Object = window.getSelection()
  selection.removeAllRanges()

  if (element) {
    element.remove()
  }
}

function createImageFromCanvas(canvas: Object): Object {
  const image: Object = window.document.createElement('img')

  image.setAttribute('src', canvas.toDataURL())

  return image
}

function removeElementById(id: string): void {
  const element: Object = window.document.getElementById(id)

  if (element) {
    element.remove()
  }
}

function copyText(content: string): boolean {
  try {
    const element: Object = createContainerWithText(content)

    selectContent(element)
    copyContent()
    cleanSelection(element)
  } catch (err) {
    return false
  }

  return true
}

function copyImage(id: string): boolean {
  try {
    const element: Object = window.document.getElementById(id)
    element.setAttribute('contenteditable', true)

    selectContent(element)
    copyContent()
    element.setAttribute('contenteditable', false)
    cleanSelection()
  } catch (err) {
    return false
  }

  return true
}

function copyCanvas(canvas: Object): boolean {
  try {
    const image: Object = createImageFromCanvas(canvas)
    const containerWithImageId: string = createContainerWithImage(image)

    copyImage(containerWithImageId)
    cleanSelection()
    removeElementById(containerWithImageId)
  } catch (err) {
    return false
  }

  return true
}

export default { copyCanvas, copyImage, copyText }
