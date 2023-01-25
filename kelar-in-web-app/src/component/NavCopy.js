import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

function NavCopy({ isLoggedIn, setIsLoggedIn }) {
  const navigationMenu = useSelector((s) => s.menu);
  const [objectURL, setObjectURL] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  function logout() {
    localStorage.clear();
    setIsLoggedIn(false);
    dispatch({ type: "MENU_NOT_LOGIN" });
    navigate("/landingpage");
  }

  useEffect(() => {
    if (!localStorage.getItem("Authorization")) {
      dispatch({ type: "MENU_NOT_LOGIN" });
    } else {
      dispatch({ type: "MENU_LOGIN" });
      //fetch profile picture
      fetch("http://192.168.100.82:8081/api/profile/get-picture", {
        headers: {
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
      })
        .then((response) => response.blob())
        .then((myBlob) => {
          setObjectURL(URL.createObjectURL(myBlob));
        });
    }
  }, [localStorage.getItem("Authorization")]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure as="nav" className="bg-secondary-color drop-shadow-lg ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-9xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-20 items-center justify-between ">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <NavLink to="/landingpage">
                  <div className="flex flex-shrink-0 items-center">
                    <h1 className="text-3xl font-bold ml sm:text-4xl">kelar</h1>

                    <h1 className="text-3xl font-bold mr text-fourth-color sm:text-4xl">.in</h1>
                  </div>
                </NavLink>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigationMenu.map((item) => (
                      // <Link
                      //   // key={item.name}
                      //   to={item.href}
                      //   className={classNames(item.current ? "bg-fourth-color text-secondary-color" : "text-black font-bold hover:bg-third-color hover:text-white", "px-3 py-2 rounded-md text-xl font-bold")}
                      //   aria-current={item.current ? "page" : undefined}>
                      //   {item.name}
                      // </Link>
                      <NavLink
                        key={item.id}
                        to={item.href}
                        className={({ isActive }) => (isActive ? "bg-fourth-color text-secondary-color px-3 py-2 rounded-md text-xl font-bold" : "text-black hover:bg-third-color hover:text-white px-3 py-2 rounded-md text-xl font-bold")}>
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className={classNames(isLoggedIn ? "" : "hidden ", "absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0")}>
                <button type="button" className="rounded-full bg-third-color p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-8 w-8" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      {/* <span className="sr-only">Open user menu</span> */}
                      
                      {objectURL ?
                        <img
                        className="h-11 w-11 rounded-full"
                        // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        src={objectURL}
                        alt=""
                      />
                      :<svg
                      className="h-10 w-10 rounded-full bg-third-color text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="7" r="4" /> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    }
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a href="#" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a href="#" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                            Settings
                          </a>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <a onClick={logout} className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigationMenu.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "block px-3 py-2 rounded-md text-base font-medium")}
                  aria-current={item.current ? "page" : undefined}>
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default NavCopy;
