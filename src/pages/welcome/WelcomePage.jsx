// WelcomePage.jsx
import React, { useState, useEffect } from 'react';
import './WelcomePage.css';
import Switcher12 from '../../components/switcher/Swither';
import Footer from '../../layout/footer/Footer';
import GreedBackGround from '../../components/greedBackground/GreedBackground';
import ButtonLink from '../../components/routeButton/RouteButton';



const WelcomePage = () => {
  const isAuthenticated = localStorage.getItem('accessToken');
  const role = localStorage.getItem('userRole');
  return (
    
    <div className="">
      
      <div className="absolute inset-0 overflow-hidden">
        <GreedBackGround className="w-full h-full min-h-screen hidden lg:block" />
      </div>


      <div className="flex justify-center min-h-screen">
        <div className="w-full max-w-[1300px] relative z-10">
          <header className="fixed top-0 right-0 z-10 w-full mt-4 ml-3">
            <div className="flex justify-between max-w-[1300px]  mx-auto">
              <div></div>
              <div className="mr-[50px]">
                <Switcher12 />
              </div>
            </div>
          </header>

          
          <main className="mt-[10%] w-full h-[100vh] ">
            <div className="pb-[340px] md:pb-[240px] sm:pb-[270px] flex flex-col items-center justify-center text-center sm:items-start sm:justify-start sm:text-left md:items-center md:justify-center md:text-center lg:items-start lg:justify-start lg:text-left">
              <div className="flex flex-col justify-center md:justify-center lg:justify-start">
                <h1 className="text-5xl sm:text-[105px] md:text-[105px] font-bold text-transparent bg-clip-text gradient-text animated-gradient leading-normal">
                  ProjectMaster
                </h1>
                <div className="text-2xl  dark:text-trueWhite text-customGray pb-12 " style={{ maxWidth: '600px' }}>
                  Веб-приложение для управления студенческими проектами.
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-6 w-full md:w-1/2  ">
                <a href="/projects/" className="no-underline text-center text-3xl px-6 py-3 bg-[#fc9af7] dark:bg-[#d66bd1] hover:bg-[#d66bd1] dark:hover:bg-[#fc9af7] text-customGray dark:text-trueWhite hover:text-trueWhite dark:hover:text-customGray font-semibold rounded-md transition duration-300">
                  Каталог
                </a>


                {isAuthenticated && role === 'STUDENT' && (
                   <div className="flex justify-between items-center gap-2">
                    <a href="/SignUp" className="flex-grow no-underline text-center text-xl sm:text-[20px] md:text-[20px] px-6 py-3 bg-[#89abfc] dark:bg-[#4b6cb7] hover:bg-[#4b6cb7] dark:hover:bg-[#89abfc] text-customGray dark:text-trueWhite hover:text-trueWhite dark:hover:text-customGray font-semibold rounded-md transition duration-300">
                      Вступить в проект
                    </a>
                    <a href="/Login" className=" flex-grow no-underline text-center  text-xl sm:text-[20px] md:text-[20px] px-6 py-3 bg-[#89abfc] dark:bg-[#4b6cb7] hover:bg-[#4b6cb7] dark:hover:bg-[#89abfc] text-customGray dark:text-trueWhite hover:text-trueWhite dark:hover:text-customGray font-semibold rounded-md transition duration-300">
                      Мои проекты
                    </a>
                 </div>
                  )}

                 {isAuthenticated && role === 'CURATOR' && (
                   <div className="flex justify-between items-center gap-2">
                    <a href="/Students" className="flex-grow no-underline text-center text-xl sm:text-[20px] md:text-[20px] px-6 py-3 bg-[#89abfc] dark:bg-[#4b6cb7] hover:bg-[#4b6cb7] dark:hover:bg-[#89abfc] text-customGray dark:text-trueWhite hover:text-trueWhite dark:hover:text-customGray font-semibold rounded-md transition duration-300">
                      Список студентов
                    </a>
                    <a href="/CreateProject" className="flex-grow no-underline text-center text-xl sm:text-[20px] md:text-[20px] px-6 py-3 bg-[#89abfc] dark:bg-[#4b6cb7] hover:bg-[#4b6cb7] dark:hover:bg-[#89abfc] text-customGray dark:text-trueWhite hover:text-trueWhite dark:hover:text-customGray font-semibold rounded-md transition duration-300">
                      Создать проект
                    </a>
                    <a href="/CreateTeam" className=" flex-grow no-underline text-center  text-xl sm:text-[20px] md:text-[20px] px-6 py-3 bg-[#89abfc] dark:bg-[#4b6cb7] hover:bg-[#4b6cb7] dark:hover:bg-[#89abfc] text-customGray dark:text-trueWhite hover:text-trueWhite dark:hover:text-customGray font-semibold rounded-md transition duration-300">
                      Создать команды
                    </a>
                 </div>
                  )}

                  {!isAuthenticated && (
                    <div className="flex justify-between items-center gap-2">
                      <a href="/SignUp" className="flex-grow no-underline text-center text-xl sm:text-[20px] md:text-[20px] px-6 py-3 bg-[#89abfc] dark:bg-[#4b6cb7] hover:bg-[#4b6cb7] dark:hover:bg-[#89abfc] text-customGray dark:text-trueWhite hover:text-trueWhite dark:hover:text-customGray font-semibold rounded-md transition duration-300">
                        Зарегистрироваться
                      </a>
                      <a href="/Login" className=" flex-grow no-underline text-center  text-xl sm:text-[20px] md:text-[20px] px-6 py-3 bg-[#89abfc] dark:bg-[#4b6cb7] hover:bg-[#4b6cb7] dark:hover:bg-[#89abfc] text-customGray dark:text-trueWhite hover:text-trueWhite dark:hover:text-customGray font-semibold rounded-md transition duration-300">
                        Войти
                      </a>
                  </div>
                  )}

                  
                
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
    
    
  );
  
};

export default WelcomePage;
