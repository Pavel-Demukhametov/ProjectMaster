import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import NotFound from './pages/notFound/NotFoundPage';
import WelcomePage from './pages/welcome/WelcomePage';
import SignUpPage from './pages/signUp/SignUpPage';
import LoginPage from './pages/login/LoginPage';

function App() {
  return (

      <Router>
        <div className="App bg-lightHeader dark:bg-darkGray min-w-[350px] min-h-screen max-h-200px">
          <Routes>
            <Route index element={<WelcomePage />} />
            <Route path="/" element={<Layout />}>
              <Route path="SignUp/" element={<SignUpPage />}/>
              <Route path="Login/" element={<LoginPage />}/>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </Router>
  );
}
export default App;
