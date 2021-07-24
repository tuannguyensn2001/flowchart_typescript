import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n/config';
import {QueryClient, QueryClientProvider} from "react-query";
import './style.css';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            {/*<ChakraProvider>*/}
            {/*    <App/>*/}
            {/*</ChakraProvider>*/}
            <App/>

        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
