import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { Scrollbars } from 'react-custom-scrollbars'

import config from 'config'

import getWindowWidth from 'utils/getWindowWidth'

import CurrencyItem from 'components/CurrencyItem'

const { mobileWidth, currenciesLoadingCount } = config

function getSliderOptions(isMobileSlider, afterChange) {
  const basicSliderOptions = {
    arrows: false,
    dots: false,
    vertical: !isMobileSlider,
    infinite: isMobileSlider,
  }

  const mobileSliderOptions = isMobileSlider ? {
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
        afterChange,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '15px',
      },
    }],
  } : null

  return { ...basicSliderOptions, ...mobileSliderOptions }
}

class CurrenciesBody extends Component {
  constructor(props) {
    super(props)
    this.state = { isMobileSlider: (getWindowWidth() <= mobileWidth) }
  }

  componentWillMount() {
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    const { isMobileSlider } = this.state
    const isMobileWidth = (getWindowWidth() <= mobileWidth)

    /**
     * ignore if was mobile slider and will be mobile slider
     * ignore if was not mobile slider and will not be mobile slider
     */
    if (isMobileSlider && isMobileWidth) {
      return
    } else if (!(isMobileSlider || isMobileWidth)) {
      return
    }

    this.setState({ isMobileSlider: isMobileWidth })
  }

  render() {
    const { isMobileSlider } = this.state
    const currencies = this.getCurrencies(isMobileSlider)
    const sliderOptions = getSliderOptions(isMobileSlider, this.afterChange)

    return (
      <div className='currencies-body'>
        {isMobileSlider
          ? <Slider {...sliderOptions} >{currencies}</Slider>
          : <Scrollbars>{currencies}</Scrollbars>}
      </div>
    )
  }

  getCurrencies = (isMobileSlider) => {
    const { setCurrentAddress, currencies } = this.props
    const { items, balances, currentAddress, isLoading } = currencies

    if (isLoading) {
      return this.getLoadingCurrencies(isMobileSlider)
    }

    return items.map((currencyProps, i) => {
      const { address, symbol, isActive } = currencyProps

      if (!isActive) {
        return null
      }

      const currencyItem = (
        <CurrencyItem
          key={i}
          isCurrent={address === currentAddress}
          setCurrentAddress={setCurrentAddress(address)}
          balanceFixed={(balances[symbol] || 0).toFixed(3)}
          {...currencyProps}
        />
      )

      // div wrapper is needed for slick on tablet/mobile
      return isMobileSlider ? <div key={i}>{currencyItem}</div> : currencyItem
    })
  }

  getLoadingCurrencies = (isMobileSlider) => {
    const currenciesLoading = []

    for (let i = 0; i < currenciesLoadingCount; i += 1) {
      const currencyItem = (
        <div className={`currency-item ${!i ? 'currency-item--active' : ''}`} key={i}>
          <div className='currency-item__symbol loading loading--currency-symbol' />
          <div className='currency-item__name loading loading--currency-name' />
          <div className='currency-item__balance loading loading--currency-balance' />
        </div>
      )

      // div wrapper is needed for slick on tablet/mobile
      currenciesLoading.push(isMobileSlider ? <div key={i}>{currencyItem}</div> : currencyItem)
    }

    return currenciesLoading
  }

  afterChange = (index) => {
    const { items, isLoading } = this.props.currencies

    if (isLoading) {
      return null
    }

    const nextCurrency = items[index]

    if (!nextCurrency) {
      return null
    }

    const { isAuthRequired, isActive } = nextCurrency

    if (!isActive) {
      return this.afterChange(index + 1)
    }

    if (isAuthRequired) {
      return null
    }

    return this.props.setCurrentAddress(nextCurrency.address)()
  }
}

CurrenciesBody.propTypes = {
  setCurrentAddress: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    isLoading: PropTypes.bool.isRequired,
    /* optional */
    balances: PropTypes.object,
    currentAddress: PropTypes.string,
  }).isRequired,
}

export default CurrenciesBody
