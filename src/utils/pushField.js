export default function pushField(fields, name, message = '') {
  let foundIndex = -1

  fields.forEach((field, index) => {
    if (field.name === name) {
      foundIndex = index
    }
  })

  const newFields = [...fields]

  if (foundIndex === -1) {
    newFields.push({ name, message })
  } else {
    newFields.splice(foundIndex, 1, { name, message })
  }

  return newFields
}
