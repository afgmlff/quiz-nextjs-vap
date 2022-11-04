import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './_app'


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
)
