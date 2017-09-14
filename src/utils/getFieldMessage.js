export default function getFieldMessage(fields, name) {
  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i]

    if (field.name === name) {
      return field.message
    }
  }

  return ''
}
