import React from "react";
import ReactDOM from 'react-dom/client';
import IndecisionApp from './components/IndecisionApp';
import '../node_modules/normalize-css/normalize.css'
import './styles/styles.scss';


const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<IndecisionApp/>)
