import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetchStoreInventory Saga: will be fired on "FETCH_STORE_INVENTORY" actions
function* fetchStoreInventory(action) {
  try {

    const response = yield axios.get(`api/store/inventory/${action.payload}`);

    console.log('STORE_INVENTORY RESPONSE: ', response.data);

    // places server's response data in reducer
    yield put({ type: 'SET_STORE_INVENTORY', payload: response.data });
  } catch (error) {
    console.log('Stores get request failed', error);
  }
}

// function* putStore(action) {
//   try {
//     yield axios.put(`api/all/stores/${action.payload.id}`, action.payload);
//     yield put({ type: 'FETCH_STORES' });
//   } catch (err) {
//     console.log('PUT store error: ', err)
//   }
// }

// function* putDeliveryOrders(action) {
//   try {
//     yield axios.put('api/all/stores/update/DeliveryRoutes', action.payload);
//     yield put({ type: 'FETCH_STORES' });
//   } catch (err) {
//     console.log('PUT store error: ', err)
//   }
// }

// function* postStore(action) {
//   try {
//     yield axios.post('api/all/stores', action.payload);
//     yield put({ type: 'FETCH_STORES' });
//   } catch (err) {
//     console.log('POST store error: ', err)
//   }
// }


function* storeInventorySaga() {
  yield takeLatest('FETCH_STORE_INVENTORY', fetchStoreInventory);
}

export default storeInventorySaga;