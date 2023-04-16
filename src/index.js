import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { ListSection } from './sections/list-section/list-section';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ListSection/>
  </React.StrictMode>
);


