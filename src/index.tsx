import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './App';
import { auth } from './core/services/auth';
import reportWebVitals from './reportWebVitals';

auth.Init().then((): void => {
    ReactDOM.render(<App />, document.getElementById('stash-app'));

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();
});
