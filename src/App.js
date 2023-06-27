import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './Styles/main.scss';
import HomePage from './Pages/HomePage';
import InfoPage from './Pages/InfoPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<HomePage />}></Route>
          <Route path="/info" element={<InfoPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
