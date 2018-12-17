// @flow

import React, { PureComponent } from 'react'

import { JText, JSearch } from 'components/base'
import { FavoriteItem } from 'components'

import './favoritesView.scss'

type Favorite = {
  title: string,
  +address: string,
  description: ?string,
}

type Props = {|
  items: Favorite[]
|}

type State = {|
  searchQuery: string
|}

const createSymbol = (text: string): string => {
  const letters = text
    .trim()
    .split(/\s+/)
    .reduce((memo, part, idx) => {
      /* eslint-disable no-param-reassign, prefer-destructuring, fp/no-mutation */
      // reduce is designed to mutate memo
      // destructuring is not applicable, because those are strings, not arrays
      if (idx === 0) {
        memo.first = part[0]

        if (part.length > 1) {
          memo.last = part[1]
        }
      } else {
        memo.last = part[0]
      }
      /* eslint-enable no-param-reassign, prefer-destructuring, fp/no-mutation */

      return memo
    }, {
      first: '?',
      last: '?',
    })

  return (letters.first + letters.last).toUpperCase()
}

const filterFavoriteByQuery = (re: RegExp) => (favorite: Favorite): boolean =>
  re.test(favorite.title) || re.test(favorite.description || '')

class FavoritesIndexView extends PureComponent<Props, State> {
  static defaultProps = {
    items: [],
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      searchQuery: '',
    }
  }

  setSearchQuery = (query: string): void => {
    this.setState({ searchQuery: query.trim() })
  }

  render() {
    const { items: allItems } = this.props
    const { searchQuery } = this.state
    const searchRegExp = new RegExp(searchQuery, 'gi')
    const filterFavoriteBySearchRegExp = filterFavoriteByQuery(searchRegExp)

    const items = searchQuery.length === 0 ?
      allItems :
      allItems.filter(
        item => filterFavoriteBySearchRegExp(item)
      )

    return (
      <div className='settings-view'>
        <header className='header'>
          <div className='container'>
            <JText value='Favorites' size='tab' color='dark' />
            <div className='actions'>
              <div className='search'>
                <JSearch
                  onChange={this.setSearchQuery}
                  placeholder='Search favorites...'
                />
              </div>
            </div>
          </div>
        </header>
        <main className='content'>
          <div className='container'>
            {items.map(favorite => (
              <div
                key={favorite.address}
                className='box'
              >
                <FavoriteItem
                  address={favorite.address}
                  title={favorite.title}
                  description={favorite.description}
                  symbol={createSymbol(favorite.title)}
                  onClickRemove={console.log}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  }
}

export default FavoritesIndexView
