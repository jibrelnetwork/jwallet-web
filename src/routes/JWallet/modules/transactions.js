export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS'

export function getTransactions() {
  return {
    type: GET_TRANSACTIONS,
  }
}

const ACTION_HANDLERS = {
  [GET_TRANSACTIONS]: state => ({
    ...state,
    items: [],
    searchQuery: '',
    isLoading: true,
  }),
  [SET_TRANSACTIONS]: (state, action) => ({
    ...state,
    items: action.items,
    isLoading: false,
  }),
}

const initialState = {
  items: [],
  sortField: 'symbol',
  sortDirection: 'ASC',
  searchQuery: '',
  isLoading: true,
}

export default function transactions(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
