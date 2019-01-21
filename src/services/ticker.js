// @flow

import config from 'config'

const { tickerAPIOptions } = config

const TICKER_API: string = __DEFAULT_TICKER_API__

type TickerAPIParams = {|
  +id: FiatId[],
  +convert: FiatCurrency[],
  +source: 'coinmarketcap',
|}

function callApi(params: TickerAPIParams): Promise<any> {
  const requestInfo: RequestInfo = `${TICKER_API}/v2/quotes`

  return fetch(requestInfo, {
    ...tickerAPIOptions,
    body: JSON.stringify(params),
  }).then((response: Response): Promise<any> => response.json())
}

// function handleCoursesResponse(response: any): Array<any> {
//   if (type.isVoid(response) || !type.isObject(response)) {
//     return []
//   }

//   const {
//     result,
//     message,
//   }: Object = response

//   const isResultValid: boolean = type.isArray(result)
//   const isRequestFailed: boolean = (message !== 'OK')
//   const isResultFound: boolean = (message !== 'No transactions found')

//   if (!(isResultFound && isResultValid)) {
//     return []
//   } else if (isRequestFailed) {
//     throw new Error('Can not get transactions')
//   }

//   return result
// }

// function checkETHTransaction(data: Object): boolean {
//   return (
//     type.isString(data.to) &&
//     type.isString(data.gas) &&
//     type.isString(data.from) &&
//     type.isString(data.hash) &&
//     type.isString(data.value) &&
//     type.isString(data.gasUsed) &&
//     type.isString(data.isError) &&
//     type.isString(data.blockHash) &&
//     type.isString(data.timeStamp) &&
//     type.isString(data.blockNumber) &&
//     type.isString(data.contractAddress)
//   )
// }

// function filterETHTransactions(list: Array<any>): Array<Object> {
//   return list.filter((item: any): boolean => {
//     if (type.isVoid(item) || !type.isObject(item)) {
//       return false
//     }

//     const {
//       value,
//       isError,
//       contractAddress,
//     }: Object = item

//     const isEmptyAmount: boolean = isZero(value)
//     const isFailed: boolean = (parseInt(isError, 16) === 1)
//     const isContractCreation: boolean = !!contractAddress.length

//     return !(isEmptyAmount && !isContractCreation && !isFailed)
//   })
// }

// function prepareETHTransactions(data: Array<Object>): Transactions {
//   return data.reduce((result: Transactions, item: Object): Transactions => {
//     if (!checkETHTransaction(item)) {
//       return result
//     }

//     const {
//       to,
//       from,
//       hash,
//       value,
//       gasUsed,
//       isError,
//       gasPrice,
//       blockHash,
//       timeStamp,
//       blockNumber,
//       contractAddress,
//     }: TransactionFromBlockExplorer = item

//     const newTransaction: Transaction = {
//       data: {
//         gasPrice,
//       },
//       blockData: {
//         timestamp: parseInt(timeStamp, 10) || 0,
//       },
//       receiptData: {
//         gasUsed: parseInt(gasUsed, 10) || 0,
//         status: (parseInt(isError, 16) === 1) ? 0 : 1,
//       },
//       hash,
//       blockHash,
//       amount: value,
//       from: getAddressWithChecksum(from),
//       to: to.length ? getAddressWithChecksum(to) : null,
//       contractAddress: contractAddress.length ? getAddressWithChecksum(contractAddress) : null,
//       eventType: 0,
//       blockNumber: parseInt(blockNumber, 10) || 0,
//       isRemoved: false,
//     }

//     return {
//       ...result,
//       [hash]: newTransaction,
//     }
//   }, {})
// }

function requestCourses(fiatCurrency: FiatCurrency, fiatIds: FiatId[]): Promise<FiatCoursesAPI> {
  return callApi({
    id: fiatIds,
    convert: [fiatCurrency],
    source: 'coinmarketcap',
  })
  // .then(handleCoursesResponse)
  // .then(prepareCourses)
}

export default {
  requestCourses,
}
