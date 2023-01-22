import React from "react";
import { Link, NavLink } from "react-router-dom";
import Footer from "../component/Footer";

function LandingPage() {
  return (
    <div className="bg-cover " style={{ backgroundImage: "url('/asset/arlington-research-kN_kViDchA0-unsplash.jpg')" }}>
      <div className="grid px-4 py-8  max-w-screen-xl mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 bg-secondary-color/75 ">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Get a bird's eye view of your projects and take control of the workflow </h1>
          {/* <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Say Goodbye to Chaos and Hello to Order </h1> */}
          <p className="max-w-2xl mb-6 font-light text-fourth-color bg-secondary-color/50 rounded-lg lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">"From tracking progress to managing resources, kelar.in has you covered.</p>
          <NavLink
            to={"/register"}
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-color  hover:bg-third-color hover:text-white focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
            Get started
            {/* <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg> */}
          </NavLink>
          {/* <a
            href="#"
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Speak to Sales
          </a> */}
        </div>
        <div className="place-items-center lg:mt-0 lg:col-span-5 lg:flex hidden">
          <img src="../asset/background-repeat-removebg-preview (1).png" alt="mockup" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
