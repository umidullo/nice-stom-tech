import ReactDOM from 'react-dom/client';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from '~/app/App';
import { store } from '~/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SkeletonTheme>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </SkeletonTheme>
);
