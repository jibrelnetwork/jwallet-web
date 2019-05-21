// @flow strict

import {
  put,
  call,
  select,
  takeEvery,
} from 'redux-saga/effects'

import web3 from 'services/web3'
import { selectCurrentNetwork } from 'store/selectors/networks'

import * as walletsCreate from 'store/modules/walletsCreate'

function* blockNumbersRequest(): Saga<void> {
  const network: ExtractReturn<typeof selectCurrentNetwork> = yield select(selectCurrentNetwork)

  if (!network) {
    return
  }

  try {
    /**
     * @TODO
     * add requests for each of network we support
     */
    const latestBlockMainnet: ?BlockData = yield call(web3.getBlock, network, 'latest')
    const latestBlockNumberMainnet: number = latestBlockMainnet ? latestBlockMainnet.number : 0

    yield put(walletsCreate.blockNumbersSuccess({
      kovan: 0,
      rinkeby: 0,
      ropsten: 0,
      mainnet: latestBlockNumberMainnet,
    }))
  } catch (err) {
    yield put(walletsCreate.blockNumbersError(err))
  }
}

export function* walletsCreateRootSaga(): Saga<void> {
  yield takeEvery(walletsCreate.BLOCK_NUMBERS_REQUEST, blockNumbersRequest)
}
