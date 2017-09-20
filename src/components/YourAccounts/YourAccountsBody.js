import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

import getWindowWidth from 'utils/getWindowWidth'

import AccountItem from 'components/AccountItem'

const windowWidth = getWindowWidth()
const isMobileSlider = (windowWidth <= 1024)

function getSliderOptions() {
  const basicSliderOptions = {
    arrows: false,
    dots: false,
    vertical: !isMobileSlider,
    infinite: isMobileSlider,
  }

  const mobileSliderOptions = isMobileSlider ? {
    focusOnSelect: false,
    draggable: isMobileSlider,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    }, {
      breakpoint: 601,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '15px',
      },
    }],
  } : null

  return { ...basicSliderOptions, ...mobileSliderOptions }
}

function YourAccountsBody({ setCurrentAccount, accounts }) {
  const { items, currentActiveIndex } = accounts

  return (
    <div className='your-accounts-body'>
      <Slider {...getSliderOptions()} >
        {items.map((accountProps, i) => {
          if (!accountProps.isActive) {
            return null
          }

          const accountItem = (
            <AccountItem
              key={i}
              isCurrent={i === currentActiveIndex}
              setCurrentAccount={setCurrentAccount(i)}
              {...accountProps}
            />
          )

          // div wrapper is needed for slick
          return isMobileSlider ? <div key={i}>{accountItem}</div> : accountItem
        })}
      </Slider>
    </div>
  )
}

YourAccountsBody.propTypes = {
  setCurrentAccount: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      balanceFixed: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
}

export default YourAccountsBody
