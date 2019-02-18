// @flow

import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import { t } from 'ttag'

import FavoriteItem from 'components/FavoriteItem'
import escapeRegExp from 'utils/regexp/escapeRegExp'
import OverlayNotification from 'components/OverlayNotification'

import {
  JText,
  JSearch,
  JIcon,
} from 'components/base'

import './favoritesView.scss'

type Props = {|
  +remove: (FavoriteAddress) => void,
  +items: Favorite[],
  +isWalletReadOnly: boolean,
|}

type State = {|
  +searchQuery: string
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

function filterFavoriteByQuery(favorite: Favorite, searchQuery: string): boolean {
  const re: RegExp = new RegExp(escapeRegExp(searchQuery), 'ig')

  return re.test(favorite.name || '') || re.test(favorite.description || '')
}

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

  renderContent() {
    const {
      items,
      remove,
      isWalletReadOnly,
    }: Props = this.props

    const { searchQuery } = this.state
    const isSearched: boolean = !!searchQuery

    const filteredItems: Favorite[] = !isSearched
      ? items
      : items.filter((item: Favorite): boolean => filterFavoriteByQuery(item, searchQuery))

    if (filteredItems.length > 0) {
      return (
        <div className='container'>
          {filteredItems.map((item: Favorite) => {
            const {
              name,
              address,
              description,
              isAddedByUser,
            }: Favorite = item

            if (!(isAddedByUser && name)) {
              return null
            }

            return (
              <div key={address} className='box'>
                <FavoriteItem
                  remove={remove}
                  name={name}
                  address={address}
                  description={description}
                  symbol={createSymbol(name)}
                  isWalletReadOnly={isWalletReadOnly}
                />
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <div className='container'>
        <OverlayNotification
          color='gray'
          image='screen-no-favorites'
          description={isSearched ? [
            t`There are no favorites to display`,
          ] : [
            t`Looks like you have no favorites yet.`,
          ]}
          isTransparent
        />
      </div>
    )
  }

  render() {
    return (
      <div className='favorites-view'>
        <header className='header'>
          <div className='container'>
            <JText value={t`Favorites`} size='tab' color='dark' />
            <div className='actions'>
              <div className='search'>
                <JSearch
                  onChange={this.setSearchQuery}
                  placeholder={t`Search favorites...`}
                />
              </div>
              <Link className='add' to='/favorites/address' title={t`Add favorite address`}>
                <JIcon
                  name='favorite-address-add'
                  size='medium'
                  color='gray'
                />
              </Link>
            </div>
          </div>
        </header>
        <main className='content'>
          {this.renderContent()}
        </main>
      </div>
    )
  }
}

export default FavoritesIndexView
