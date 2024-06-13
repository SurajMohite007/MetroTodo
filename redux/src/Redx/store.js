import { legacy_createStore as createStore, legacy_createStore} from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer';

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
