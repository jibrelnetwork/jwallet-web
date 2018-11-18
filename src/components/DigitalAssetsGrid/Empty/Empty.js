// @flow

import React, { PureComponent } from 'react'

import JThumbnail from 'components/base/JThumbnail'

type Props = {|
  +image: 'screen-search',
  +color: 'gray' | 'red',
  +description: string,
  +isTransparent: boolean,
|}

class DigitalAssetsEmpty extends PureComponent<Props> {
    static defaultProps = {
      color: 'gray',
      isTransparent: false,
    }
    render() {
      const {
        image,
        color,
        description,
        isTransparent,
      } = this.props

      return (
        <div className='digital-assets-empty'>
          <JThumbnail
            image={image}
            iconSize='large'
            color={color}
            description={description}
            isTransparent={isTransparent}
          />
        </div>
      )
    }
}

export default DigitalAssetsEmpty
