// @flow strict

export const SET_ADDRESS_NAME = '@@walletsAddresses/SET_ADDRESS_NAME'

export function setAddressName(address: Address, name: string) {
  return {
    type: SET_ADDRESS_NAME,
    payload: {
      name,
      address,
    },
  }
}

export type WalletsAddressesAction = ExtractReturn<typeof setAddressName>

const initialState: WalletsAddressesState = {
  persist: {
    addressNames: {},
  },
}

function walletsAddresses(
  state: WalletsAddressesState = initialState,
  action: WalletsAddressesAction,
): WalletsAddressesState {
  switch (action.type) {
    case SET_ADDRESS_NAME:
      return {
        ...state,
        persist: {
          ...state.persist,
          addressNames: {
            ...state.persist.addressNames,
            [action.payload.address]: action.payload.name,
          },
        },
      }

    default:
      return state
  }
}

export default walletsAddresses
