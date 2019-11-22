import { createStore, applyMiddleware} from 'redux'  //引入创建store对象的方法
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
const middleware = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)

export default createStore(reducers, middleware);  