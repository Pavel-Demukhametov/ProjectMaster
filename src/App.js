import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import NotFound from './pages/notFound/NotFoundPage';
import WelcomePage from './pages/welcome/WelcomePage';
import SignUpPage from './pages/signUp/SignUpPage';
import LoginPage from './pages/login/LoginPage';
import CreateProjectPage from './pages/createProject/CreateProjectPage';
import StudentsCatalogPage from './pages/studentsCatalog/StudentsCatalogPage';
import Catalog from './pages/projectCatalog/ProjectCatalogPage';
import OpenProjectCatalog from './pages/projectCatalog/OpenProjectPage';
import MyProjects from './pages/projectCatalog/MyProjects';

// Функция проверки аутентификации и роли
const requireAuthAndRole = (component, role) => {
  const isAuthenticated = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole'); 
  if (isAuthenticated && userRole === role) {
    return component;
  } else if (isAuthenticated){
    return <Navigate to="/NotFound" />;
  }
  else {
    return <Navigate to="/Login" />; 
  }
};

function App() {
  return (
    <Router>
      <div className="App bg-lightHeader dark:bg-darkGray min-w-[350px] min-h-screen max-h-200px">
        <Routes>
          <Route index element={<WelcomePage />} />
          <Route path="/" element={<Layout />}>
            <Route path="SignUp/" element={<SignUpPage />} />
            <Route path="Login/" element={<LoginPage />} />

            <Route path="CreateProject/" element={requireAuthAndRole(<CreateProjectPage />, 'SUPERVISOR')} />

            <Route path="Students/" element={requireAuthAndRole(<StudentsCatalogPage />, 'SUPERVISOR')} />

            <Route path="Join-project/" element={requireAuthAndRole(<OpenProjectCatalog />, 'STUDENT')} />
            
            <Route path="Projects/" element={<Catalog />} />
            <Route path="MyProjects/" element={<MyProjects />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;