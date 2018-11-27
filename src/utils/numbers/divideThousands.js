// @flow

function divideThousands(value: ?number | ?string): string {
  if (!value) {
    return '0'
  }

  const valueStr: string = value.toString()

  try {
    const int: number = parseInt(valueStr, 10)
    const pointIndex: number = valueStr.indexOf('.') + 1
    const dec: string = pointIndex ? valueStr.substr(pointIndex) : ''

    if (int < 1) {
      return valueStr
    }

    const dividedInt: string = int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return dec ? `${dividedInt}.${dec}` : dividedInt
  } catch (e) {
    return valueStr
  }
}

export default divideThousands
