// @flow
import React from 'react'
import FavoritesIndexView from './FavoritesIndexView'

const testData = [
  {
    title: 'some random string that should create symbol for that',
    address: '0x123',
  },
  {
    title: '   hahahaha       ',
    address: '0x1234',
  },
  {
    title: 'Vasisualiy Dmitrievich Konstantinopolsky',
    address: '0x12345',
  },
  {
    title: 'Васисуалий Дмитриевич Константинопольский',
    address: '0x123451',
  },
  {
    title: '🧐 😅 💩',
    address: '0x123456',
  },
  {
    title: '白 崆',
    address: '0x1234567',
  },
].concat(
  new Array(100)
    .fill(0)
    .map((item, idx) => ({
      title: 'Alexey Selikhov',
      address: `0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd${idx}`,
      description: idx % 17 === 0 ? 'Dude!' : null,
    }))
)

export default function FavoritesIndexViewContainer() {
  return (
    <FavoritesIndexView items={testData} />
  )
}
