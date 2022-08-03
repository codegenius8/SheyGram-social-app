import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducers } from './reducers/usersReducer';
import { alertsReducers } from './reducers/alertsReducers';
import {postReducers} from "./reducers/postReducers"
import thunk from 'redux-thunk'
const rootReducers = combineReducers({
    userReducers : userReducers,
    alertsReducers: alertsReducers,
    postReducers :  postReducers
    

})

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});
const store = createStore(
    rootReducers,
  composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default store