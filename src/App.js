import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import NotFound from './pages/notFound/NotFound';
import WelcomePage from './pages/welcomePage/WelcomePage';

function App() {
  return (

      <Router>
        <div className="App bg-lightHeader dark:bg-darkGray min-w-[350px] min-h-screen max-h-200px">
          <Routes>
            <Route index element={<WelcomePage />} />
            <Route path="/" element={<Layout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </Router>
  );
}
export default App;
