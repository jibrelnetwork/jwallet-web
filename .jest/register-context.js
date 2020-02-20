jest.mock('public/assets/logo/logo-white.svg', () => './logo-white.svg')
jest.mock('public/assets/logo/logo-blue.svg', () => './logo-blue.svg')

jest.mock('../src/utils/sprite/spriteUI', () => ({
  keys: () => [],
}))

jest.mock('../src/utils/sprite/spriteAssets', () => ({
  keys: () => [],
}))

jest.mock('../src/utils/sprite/coloredIconsUI', () => ({
  keys: () => [],
}))

jest.mock('../src/public/assets/pic_transactions_112.svg', () => 'pic_transactions_112.svg')

jest.mock('i18n/lingui', () => ({
  i18n: {
    _: (
      key,
      params,
      data,
    ) => {
      if (!data) {
        return key
      }

      const source = data.defaults

      if (!params) {
        return source
      }

      return Object.keys(params).reduce((
        result,
        param,
      ) => {
        if (result.indexOf(param) === -1) {
          return result
        }

        return result.replace(`{${param}}`, params[param])
      }, source)
    }
  }
}))
