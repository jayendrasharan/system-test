import * as React from 'react';
import { Provider } from 'react-redux';
import { Home } from './Home';
import { Sf } from '../services';
import { AppReducer } from './AppReducer';
export interface AppProps {

}

export interface AppState {

}




const rootStore = Sf.store.initStore(AppReducer, {});
export class App extends React.Component<AppProps, AppState>
{

   

    public render() {
        console.log(Sf.store.getState());
        return (
            <Provider store={rootStore}>
                <Home />
            </Provider>
        )


    }
}