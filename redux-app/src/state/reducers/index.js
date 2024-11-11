import { combineReducers } from 'redux';
import amountManagementReducer from './amountManagementReducer';

const reducers = combineReducers({
    amount: amountManagementReducer
});

export default reducers;