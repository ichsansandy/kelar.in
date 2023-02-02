import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, writeBatch, WriteBatch } from "firebase/firestore";
import { db } from "../firebase-config";

function NavCopy({ isLoggedIn, setIsLoggedIn }) {
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const navigationMenu = useSelector((s) => s.menu);
  const countIsRead = useSelector((s) => s.countIsRead);
  const [objectURL, setObjectURL] = useState(null);
  const [isPicture, setIsPicture] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listNotification, setListNotification] = useState([]);
  const [notifCollRef, setNotifCollRef] = useState(null);

  function logout() {
    localStorage.clear();
    setIsLoggedIn(false);
    dispatch({ type: "MENU_NOT_LOGIN" });
    navigate("/landingpage");
  }

  function getPicture() {
    fetch("http://localhost:8081/api/profile/get-picture", {
      headers: {
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          setIsPicture(false);
          return setObjectURL(null);
        }
      })
      .then((myBlob) => {
        if (myBlob !== null) {
          setIsPicture(true);
          setObjectURL(URL.createObjectURL(myBlob));
        }
      })
      .catch((err) => {
        // toast.error(err.message);
      });
  }

  const clearNotif = async () => {
    if (isLoggedIn === true && loggedInUser !== null) {
      const batch = writeBatch(db);
      const notifCollRef = collection(db, "PushNotification", loggedInUser.name, "NotificationList");
      const querySnapshot = await getDocs(notifCollRef);

      querySnapshot.forEach((doc) => {
        batch.update(doc.ref, { isRead: true });
        console.log("change ");
      });
      await batch.commit();
    }
  };

  const changeNotifToIsReadTrue = async (input) => {
    if (isLoggedIn === true && loggedInUser !== null) {
      const notifCollDoc = doc(db, "PushNotification", loggedInUser.name, "NotificationList", input);
      await updateDoc(notifCollDoc, {
        isRead: true,
      });
    }
  };

  useEffect(() => {
    let temporary = listNotification.filter((notif) => {
      if (notif.isRead === false) return notif;
    });
    console.log(temporary.length);
    dispatch({ type: "SET_COUNT_IS_READ", payload: temporary.length });
  }, [listNotification]);

  useEffect(() => {
    //set reference for collection notif
    if (isLoggedIn === true && loggedInUser !== null) {
      setTimeout(() => {
        const notifCollRef = collection(db, "PushNotification", loggedInUser.name, "NotificationList");
        const unsubscribe = onSnapshot(query(notifCollRef, orderBy("createDate", "desc")), (snapshot) => {
          const data = [];
          snapshot.docs.map((doc) => {
            // console.log(doc.data());
            data.push({ id: doc.id, ...doc.data() });
          });
          setListNotification(data);
        });
        return () => unsubscribe();
      }, 1000);
    }
  }, [isLoggedIn, loggedInUser]);

  useEffect(() => {
    if (!localStorage.getItem("Authorization")) {
      dispatch({ type: "MENU_NOT_LOGIN" });
    } else {
      dispatch({ type: "MENU_LOGIN" });
      //fetch profile picture
      getPicture();
    }
  }, [localStorage.getItem("Authorization")]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure as="nav" className="bg-secondary-color drop-shadow-lg z-[10000000000]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-9xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-[7.5vh] min-h-[60px] items-center justify-between ">
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
              <div className={classNames(isLoggedIn ? "" : "hidden ", "absolute z-[10000000000] inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0")}>
                {/* Notification dropdown */}
                <Menu as="div" className="relative ml-3 z-[10000000000]">
                  <div className="flex">
                    <Badge count={countIsRead}>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <div className="rounded-full bg-third-color p-0.5 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-7 w-7" aria-hidden="true" />
                        </div>
                      </Menu.Button>
                    </Badge>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items  className="absolute z-[10000000000] right-0 mt-2 w-96 h-48 overflow-y-auto origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 flex">
                        <Menu.Item>
                          {({ active }) => (
                            <button onClick={() => clearNotif()} className={`${active ? "bg-third-color text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                              {active ? <DeleteActiveIcon className="mr-2 h-5 w-5 text-white" aria-hidden="true" /> : <DeleteInactiveIcon className="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />}
                              Mark as Read All Notification
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                      {listNotification.map((notif) => (
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink onClick={() => changeNotifToIsReadTrue(notif.id)} to={`/${notif.type}/${notif.typeId}`} className={classNames(active ? "bg-gray-100 " : "", "flex jus px-4 py-2 text-sm text-gray-700 ")}>
                              <Badge status={notif.isRead ? "default" : "success"} className="w-1/12 text-third-color text-center" />
                              <div className="w-11/12 ml-2 text-left ">{notif.message}</div>
                            </NavLink>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>

                      {!isPicture ? (
                        <svg className="h-8 w-8 rounded-full bg-third-color text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          {" "}
                          <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="7" r="4" /> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                      ) : (
                        <img className="h-9 w-9 rounded-full " src={objectURL} alt="" />
                      )}
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a href="#" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                            Your Profile
                          </a>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <div onClick={logout} className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                            Sign out
                          </div>
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
                  as="NavLink"
                  to={item.href}
                  className={classNames(
                    item.current ? "bg-fourth-color text-secondary-color px-3 py-2 rounded-md text-xl font-bold" : "text-black hover:bg-primary-color hover:text-white px-3 py-2 rounded-md text-xl font-bold",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}>
                  <NavLink
                    key={item.id}
                    to={item.href}
                    className={({ isActive }) => (isActive ? "bg-fourth-color text-secondary-color px-3 py-2 rounded-md text-xl font-bold" : "text-black hover:bg-third-color hover:text-white px-3 py-2 rounded-md text-xl font-bold")}>
                    {item.name}
                  </NavLink>
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

function DeleteInactiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="10" height="10" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="10" height="10" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}
