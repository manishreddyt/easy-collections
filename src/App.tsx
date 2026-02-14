import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from '@razorpay/blade/components';
import TopNavComponent from './navigation/TopNavComponent';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <TopNavComponent />
    </BrowserRouter>
  );
};

export default App;
