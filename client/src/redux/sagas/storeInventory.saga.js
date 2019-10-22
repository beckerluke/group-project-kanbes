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

function* postOutgoingStore(action) {
  try {
    yield axios.post('api/store/inventory/outgoing_store', action.payload);
    // yield put({ type: 'FETCH_STORE_INVENTORY', payload: action.payload.id });
        yield put({ type: 'FETCH_STORE_INVENTORY', payload: action.payload.store_id });
  } catch (err) {
    console.log('POST outgoing_store error: ', err)
  }
}

function* putOutgoingStore(action) {
  try {
    yield axios.put(`api/store/inventory/outgoing_store/${action.payload.id}`, action.payload);
    // yield put({ type: 'FETCH_STORE_INVENTORY', payload: action.payload.id });
        yield put({ type: 'FETCH_STORE_INVENTORY', payload: action.payload.store_id });
  } catch (err) {
    console.log('PUT outgoing_store error: ', err)
  }
}


function* storeInventorySaga() {
  yield takeLatest('FETCH_STORE_INVENTORY', fetchStoreInventory);
  yield takeLatest('ADD_OUTGOING_STORE', postOutgoingStore);
  yield takeLatest('UPDATE_OUTGOING_STORE', putOutgoingStore);
}

export default storeInventorySaga;