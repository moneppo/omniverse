import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReactMarkdown from 'react-markdown';

// @ts-ignore
import readme from 'omniverse/README.md';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

fetch(readme)
  .then((response) => response.text())
  .then((text) => {
    root.render(
      <React.StrictMode>
        {/* <App />  */}
        <ReactMarkdown className='md'>{text}</ReactMarkdown>

      </React.StrictMode>
    );
  });




