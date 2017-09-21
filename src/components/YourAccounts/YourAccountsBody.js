import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

import config from 'config'

import getWindowWidth from 'utils/getWindowWidth'

import AccountItem from 'components/AccountItem'

const { mobileWidth, accountsLoadingCount } = config

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

class YourAccountsBody extends Component {
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
    const isMobileSlider = this.state.isMobileSlider
    const accounts = this.getAccounts(isMobileSlider)
    const sliderOptions = getSliderOptions(isMobileSlider, this.afterChange)

    return (
      <div className='your-accounts-body'>
        {isMobileSlider ? <Slider {...sliderOptions} >{accounts}</Slider> : accounts}
      </div>
    )
  }

  getAccounts = (isMobileSlider) => {
    const { setCurrentAccount, accounts } = this.props
    const { items, currentActiveIndex, isLoading } = accounts

    if (isLoading) {
      return this.getLoadingAccounts(isMobileSlider)
    }

    return items.map((accountProps, i) => {
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

      // div wrapper is needed for slick on tablet/mobile
      return isMobileSlider ? <div key={i}>{accountItem}</div> : accountItem
    })
  }

  getLoadingAccounts = (isMobileSlider) => {
    const accountsLoading = []

    for (let i = 0; i < accountsLoadingCount; i += 1) {
      const accountItem = (
        <div className={`account-item ${!i ? 'account-item--active' : ''}`} key={i}>
          <div className='account-item__symbol loading loading--account-symbol' />
          <div className='account-item__name loading loading--account-name' />
          <div className='account-item__balance loading loading--account-balance' />
        </div>
      )

      // div wrapper is needed for slick on tablet/mobile
      accountsLoading.push(isMobileSlider ? <div key={i}>{accountItem}</div> : accountItem)
    }

    return accountsLoading
  }

  afterChange = (index) => {
    const { items, isLoading } = this.props.accounts

    if (isLoading) {
      return null
    }

    const nextAccount = items[index]

    if (!nextAccount) {
      return null
    }

    const { isAuthRequired, isActive } = nextAccount

    if (!isActive) {
      return this.afterChange(index + 1)
    }

    if (isAuthRequired) {
      return null
    }

    return this.props.setCurrentAccount(index)()
  }
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
