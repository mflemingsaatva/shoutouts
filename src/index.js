import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { MyProvider } from './context';


ReactDOM.render(
	<MyProvider>
		<App />
	</MyProvider>,
	document.getElementById('root')
);

