// WelcomePage.jsx
import React, { useState, useEffect } from 'react';
import './WelcomePage.css';
import Switcher12 from '../../components/switcher/Swither';
import Footer from '../../layout/footer/Footer';
import GreedBackGround from '../../components/greedBackground/GreedBackground';


const WelcomePage = () => {
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
                <h1 className="text-6xl sm:text-[120px] md:text-[120px] font-bold text-transparent bg-clip-text gradient-text animated-gradient leading-normal">
                  ProjectMaster
                </h1>
                <div className="text-2xl  dark:text-trueWhite text-customGray pb-12 " style={{ maxWidth: '600px' }}>
                  Веб-приложение для управления студенческими проектами.
                </div>
              </div>
              <div className="flex flex-col gap-10 pt-6 w-full md:w-1/2  ">
                <a href="/projects/" className="no-underline text-center text-3xl px-6 py-3 bg-[#fc9af7] dark:bg-[#d66bd1] hover:bg-[#d66bd1] dark:hover:bg-[#fc9af7] text-customGray dark:text-trueWhite hover:text-trueWhite dark:hover:text-customGray font-semibold rounded-md transition duration-300">
                  Каталог
                </a>
                <a href="/api" className="no-underline text-center text-3xl px-6 py-3 bg-[#89abfc] dark:bg-[#4b6cb7] hover:bg-[#4b6cb7] dark:hover:bg-[#89abfc] text-customGray dark:text-trueWhite hover:text-trueWhite dark:hover:text-customGray font-semibold rounded-md transition duration-300">
                Зарегистрироваться
                </a>
                
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
