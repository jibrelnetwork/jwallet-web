// @flow

export default function formatBoolean(value: boolean): 'Enabled' | 'Disabled' {
  return value ? 'Enabled' : 'Disabled'
}
