import { useState, useRef, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Image from "next/image";
import avatarIcon from "../public/7.png";
import { io } from "socket.io-client";
import DefaultImage from "../component/DefaultImage";
import ScrollableFeed from "react-scrollable-feed";
import ChatHeader from "../component/ChatHeader";
import ChatFooter from "../component/ChatFooter";
import ChatBody from "../component/ChatBody";
import Sidebar from "../component/Layout/Sidebar";
import SearchModal from "../component/SearchModal";
import MenuModal from "../component/MenuModal";
import {
  BiSearchAlt2,
  BiMessageSquareAdd,
  BiDotsVerticalRounded,
} from "react-icons/bi";
import {
  BsArrowLeftCircle,
  BsCameraVideo,
  BsThreeDots,
  BsTelephone,
  BsMic,
} from "react-icons/bs";
import { FaArrowLeft, FaRegSmile } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { ImAttachment } from "react-icons/im";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
  getSender,
  getSenderFull,
} from "../config/ChatLogics";
import UpdateGroupChatModal from "../component/UpdateGroupChatModal";
const ENDPOINT = "https://whats-app-c.herokuapp.com";
var socket, selectedChatCompare;

export default function Messages() {
  const [chatOpen, setChatOpen] = useState(false);
  const [userList, setUserList] = useState(false);
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [avatar, setAvatar] = useState("");
  const [media, setMedia] = useState(null);
  const [users, setUsers] = useState({});
  const [profileData, setProfileData] = useState("");
  const [groupMessage, setGroupMessage] = useState({});
  const [fetchAgain, setFetchAgain] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState({});

  const [groupName, setGroupName] = useState();
  const [groupInfoModalOpen, setGroupInfoModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const router = useRouter();
  const {
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
    chats,
    setChats,
    state,
    dispatch,
  } = useContext(Store);
  const { userInfo } = state;

  const fetchChatsData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `https://whats-app-c.herokuapp.com/api/chat`,
        config
      );
      setChats(data);
    } catch (error) {
      toast.error("Failed to Load the Search Results");
    }
  };
  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    fetchChatsData();
  }, []);

  const handleSearch = async () => {
    if (!search) {
      toast.warning("Please Enter something in search");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `https://whats-app-c.herokuapp.com/api/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
      setUserList(true);
    } catch (error) {
      toast.error("Failed to Load the Search Results");
      setLoading(false);
    }
  };
  //chat body code
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `https://whats-app-c.herokuapp.com/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Failed to Load the Messages");
    }
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "https://whats-app-c.herokuapp.com/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error("Failed to Send the Message");
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (chats) {
          const newChats = chats.map((chat) => {
            if (chat._id === newMessageReceived.chat._id) {
              if (chat.notify) {
                return { ...chat, notify: chat.notify + 1 };
              } else {
                return { ...chat, notify: 1 };
              }
            }
            return chat;
          });

          setChats(() => newChats);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const stopTypingHandler = () => {
    socket.emit("stop typing", selectedChat._id);
    setTyping(false);
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const handelLogOut = () => {
    dispatch({ type: "USER_LOGOUT" });
    router.push("/login");
    setSideMenuOpen(false);
    Cookies.remove("userInfo");
  };
  const [loggedUser, setLoggedUser] = useState();
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        "https://whats-app-c.herokuapp.com/api/chat",
        config
      );
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(userInfo);
    fetchChats();
    // eslint-disable-next-line
  }, []);
  //chat body code

  // handleGroup;
  const handleAddGroupUser = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.warning("User already added");

      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleGroupUserSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `https://whats-app-c.herokuapp.com/api/user?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed to Load the Search Results");
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmitGroup = async () => {
    if (!groupName || !selectedUsers) {
      toast.warning("Please fill all the fields");

      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `https://whats-app-c.herokuapp.com/api/chat/group`,
        {
          name: groupName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      toast.success("New Group Chat Created!");
      setSearchOpen(false);
    } catch (error) {
      toast.error("Failed to Create the Chat!");
    }
  };
  // handleGroup;
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `https://whats-app-c.herokuapp.com/api/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(() => data);
      setLoadingChat(false);
      setUserList(false);
      setChatOpen(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSelectedChat = (chat) => {
    setSelectedChat(() => chat);

    if (selectedChat && selectedChat.notify) {
      const newChats = chats.map((chat) => {
        if (chat._id === selectedChat._id) {
          return { ...chat, notify: 0 };
        } else {
          return chat;
        }
      });

      setChats(() => newChats);
    }

    setChatOpen(true);
  };

  const handleProfile = (profile) => {
    setProfileData(profile);
    setProfileOpen(true);
  };

  return (
    <>
      <div className=" flex w-screen h-screen bg-gray-900">
        {/* Sidebar */}

        <div className=" sticky h-screen max-h-screen overflow-hidden  w-full md:w-2/5 lg:w-1/3 bg-gray-900 border-r border-gray-500 ">
          {/* SidebarHeader */}
          <div className="bg-gray-800 w-full h-16 flex justify-between items-center border-b border-gray-500 ">
            {/*  nama */}
            {userInfo ? (
              <div className="flex w-3/5 items-center">
                <div
                  className="ml-4 flex cursor-pointer"
                  onClick={() => handleProfile(userInfo)}
                >
                  <Image
                    src={userInfo.pic}
                    className=" rounded-full"
                    alt=""
                    layout="fixed"
                    width={30}
                    height={30}
                  />
                </div>

                <div className="text-white text-lg font-semibold p-4 capitalize truncate ">
                  {userInfo.name}
                </div>
              </div>
            ) : (
              <div className="text-white text-lg font-semibold p-4 capitalize">
                whatsapp
              </div>
            )}

            {/* <!-- button --> */}
            <div className="text-white p-4 ">
              {/* <!-- search button --> */}
              <div className="inline-flex relative">
                <button
                  className="h-10 w-10 rounded-full hover:bg-gray-700  "
                  onClick={() => {
                    setSearchOpen(true);
                  }}
                >
                  <span className=" flex justify-center items-center text-2xl  text-center text-gray-400">
                    <BiMessageSquareAdd />
                  </span>
                </button>
              </div>

              <div className="inline-flex ">
                {/*menu button*/}
                <button
                  className="h-10 w-10 rounded-full hover:bg-gray-700 text-center "
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}
                >
                  <span className=" flex justify-center items-center text-2xl  text-center text-gray-400">
                    <BiDotsVerticalRounded />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div>
            {/*handleGroup modal*/}
            {groupInfoModalOpen && (
              <UpdateGroupChatModal
                fetchMessages={fetchMessages}
                setGroupInfoModalOpen={setGroupInfoModalOpen}
              />
            )}
            {searchOpen && (
              <div className=" z-10 bg-gray-800 w-full  h-screen absolute right-0 top-0 shadow-2xl ">
                <div className=" border-b border-gray-800 px-6 py-2 flex-col justify-between items-center w-full">
                  <div className=" flex gap-3">
                    <button
                      className="text-gray-100 py-4"
                      onClick={() => {
                        setSearchOpen(false);
                      }}
                    >
                      <span className=" flex justify-center items-center text-2xl  text-center text-gray-400">
                        <BsArrowLeftCircle />
                      </span>
                    </button>
                    <div className="my-2">
                      <input
                        type="text"
                        placeholder="GroupName..."
                        autoFocus="1"
                        className="p-2 rounded-lg inline text-gray-400  bg-gray-700 focus:outline-none w-full "
                        onChange={(e) => setGroupName(e.target.value)}
                      />
                    </div>{" "}
                  </div>
                  <div className="py-2 flex justify-start gap-3 flex-wrap overflow-y-scroll  max-h-32">
                    {selectedUsers.map((u) => (
                      <div
                        key={u._id}
                        className="flex justify-start  items-center bg-gray-700 rounded-lg py-1 px-2"
                      >
                        <div className=" flex">
                          <Image
                            src={u.pic}
                            className=" h-10 w-10 rounded-full mr-3"
                            alt=""
                            layout="fixed"
                            width={25}
                            height={25}
                          />
                        </div>
                        <div className=" ml-2 text-base  text-gray-300 capitalize">
                          {u.name}
                        </div>
                        <div
                          className=" ml-1 px-2  text-base  text-gray-400 capitalize hover:bg-red-500 hover:text-gray-100 rounded-full cursor-pointer transition duration-200"
                          onClick={() => handleDelete(u)}
                        >
                          X
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="cursor-pointer z-10 p-3   border-b border-gray-700">
                    <div className=" relative ">
                      <input
                        type="text"
                        placeholder="Search..."
                        autoFocus="1"
                        className="p-2 rounded-lg inline text-gray-400  bg-gray-700 focus:outline-none w-full "
                        onChange={(e) => setSearch(e.target.value)}
                      />

                      <div
                        className=" text-2xl text-gray-400 absolute top-1/4 right-3"
                        onClick={handleGroupUserSearch}
                      >
                        <BiSearchAlt2 />
                      </div>
                    </div>
                  </div>
                  <div className=" h-[27rem] overflow-y-scroll">
                    {loading
                      ? Array(4)
                          .fill(0)
                          .map((_, index) => (
                            <div className=" shadow  p-4 max-w-sm w-full mx-auto">
                              <div className="animate-pulse flex space-x-4">
                                <div className="rounded-full bg-gray-700 h-8 w-8"></div>
                                <div className="flex-1 py-1">
                                  <div className="space-y-3">
                                    <div className="h-2 bg-slate-700 rounded"></div>
                                    <div className="grid grid-cols-3 gap-4">
                                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                      : searchResult?.map((user) => (
                          <div
                            key={user._id}
                            className=" cursor-pointer z-10"
                            onClick={() => handleAddGroupUser(user)}
                          >
                            <div className="p-3 flex justify-between items-center hover:bg-gray-700">
                              <div className="inline-flex items-center">
                                {searchResult.length > 0 && (
                                  <Image
                                    src={user.pic}
                                    className=" h-10 w-10 rounded-full mr-3"
                                    alt=""
                                    layout="fixed"
                                    width={40}
                                    height={40}
                                  />
                                )}

                                <div className="ml-4">
                                  <p className="font-semibold text-white capitalize">
                                    {user.name}
                                  </p>
                                  <p className="text-gray-200 text-sm">
                                    Follow me on Instagram
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>

                <button
                  className=" w-full absolute bottom-2 left-0 bg-green-500 py-2 px-4 rounded-lg text-lg  uppercase text-gray-100 font-bold"
                  onClick={handleSubmitGroup}
                >
                  Creat Group
                </button>
              </div>
            )}

            {/* menu modal*/}
            <div
              className=" z-10 bg-gray-800 shadow-2xl h-auto w-48 absolute right-0 top-16"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              {menuOpen && (
                <ul className=" text-gray-200 capitalize">
                  <li
                    className="py-2 px-4  hover:bg-gray-700 border-b border-gray-900 cursor-pointer"
                    onClick={() => handleProfile(userInfo)}
                  >
                    My Profile
                  </li>
                  <li className="py-2 px-4  hover:bg-gray-700 border-b border-gray-900 cursor-pointer">
                    New broadcast
                  </li>
                  <li
                    className="py-2 px-4  hover:bg-gray-700 border-b border-gray-900 cursor-pointer"
                    onClick={handelLogOut}
                  >
                    log out
                  </li>
                </ul>
              )}
            </div>
          </div>
          {/* SidebarHeader */}

          {/* User list */}

          <div>
            <div className="cursor-pointer z-10 p-3   border-b border-gray-700">
              <div className=" relative ">
                <input
                  type="text"
                  placeholder="Search..."
                  autoFocus="1"
                  className="p-2 rounded-lg inline text-gray-200  bg-gray-700 focus:outline-none w-full "
                  onChange={(event) => setSearch(event.target.value)}
                />
                <div
                  className=" text-2xl text-gray-400 absolute top-1/4 right-3"
                  onClick={handleSearch}
                >
                  <BiSearchAlt2 />
                </div>
              </div>
            </div>
            <div className="h-[27rem] overflow-y-scroll">
              {userList ? (
                searchResult?.map((user) => (
                  <div
                    key={user._id}
                    className=" cursor-pointer z-10"
                    onClick={() => accessChat(user._id)}
                  >
                    <div className="p-3 flex justify-between items-center hover:bg-gray-700">
                      <div className="inline-flex items-center">
                        {searchResult.length > 0 && (
                          <Image
                            src={user.pic}
                            className=" h-10 w-10 rounded-full mr-3"
                            alt=""
                            layout="fixed"
                            width={40}
                            height={40}
                          />
                        )}

                        <div className="ml-4">
                          <p className="font-semibold text-white capitalize">
                            {user.name}
                          </p>
                          <p className="text-gray-200 text-sm">
                            Follow me on Instagram
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 text-xs">17:07</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : loading ? (
                Array(7)
                  .fill(0)
                  .map((_, index) => (
                    <div className=" shadow  p-4 w-full mx-auto">
                      <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-gray-700 h-8 w-8"></div>
                        <div className="flex-1 py-1">
                          <div className="space-y-3">
                            <div className="h-2 bg-slate-700 rounded"></div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div>
                  {chats?.map(
                    (chat) =>
                      chat.isGroupChat && (
                        <div
                          key={chat._id}
                          className=" cursor-pointer z-10"
                          onClick={() => handleSelectedChat(chat)}
                        >
                          <div className="p-3 flex justify-between items-center hover:bg-gray-700 border-b border-gray-600">
                            <div className="flex w-4/6 items-center">
                              <Image
                                src={chat.groupAdmin.pic}
                                className=" h-10 w-10 rounded-full mr-3"
                                alt=""
                                layout="fixed"
                                width={40}
                                height={40}
                              />

                              <div className="ml-4">
                                <div className=" flex mb-2">
                                  <p className=" bg-green-500 px-2  rounded-md  font-semibold text-white capitalize text-center ">
                                    group :
                                  </p>
                                  <p className="ml-3 font-semibold text-white capitalize">
                                    {chat.chatName}
                                  </p>
                                </div>

                                {chat.latestMessage ? (
                                  <div className=" flex">
                                    <p className="text-sky-500 text-lg">
                                      <IoCheckmarkDoneOutline />
                                    </p>
                                    <p className="ml-2 text-gray-200 text-sm truncate">
                                      {chat.latestMessage.content}
                                    </p>
                                  </div>
                                ) : (
                                  <div className=" flex">
                                    <p className="ml-2 text-gray-200 text-sm">
                                      messages not available
                                    </p>
                                  </div>
                                )}
                                {/* 
                              {typing && (
                                <p className="text-green-500 font-semibold text-sm">
                                  typing...
                                </p>
                              )} */}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-gray-500 text-xs">17:07</p>

                              {chat.notify && chat.notify > 0 && (
                                <p className="mx-auto text-center text-white h-5 w-5 rounded-full bg-green-500 text-xs">
                                  <span className="align-middle">
                                    {chat.notify}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                  )}

                  {chats?.map(
                    (chat) =>
                      !chat.isGroupChat && (
                        <div
                          key={chat._id}
                          className=" cursor-pointer z-10"
                          onClick={() => handleSelectedChat(chat)}
                        >
                          <div className="p-3 flex hover:bg-gray-700 border-b border-gray-600">
                            <div className="flex w-5/6 items-center ">
                              <div className=" relative">
                                <Image
                                  src={getSenderFull(userInfo, chat.users).pic}
                                  className=" h-10 w-10 rounded-full mr-3"
                                  alt=""
                                  layout="fixed"
                                  width={40}
                                  height={40}
                                />
                                <div className=" absolute -right-1 bottom-1 h-4 w-4 bg-green-500 border-[3px] border-gray-900 rounded-full"></div>
                              </div>

                              <div className="ml-4">
                                <p className="font-semibold text-white capitalize">
                                  {getSenderFull(userInfo, chat.users).name}
                                </p>
                                {chat.latestMessage ? (
                                  <div className=" flex justify-start  truncate  w-32">
                                    <p className="text-sky-500 text-lg">
                                      <IoCheckmarkDoneOutline />
                                    </p>
                                    <p className="ml-2 text-gray-200 text-sm  truncate w-14">
                                      {chat.latestMessage.content}
                                    </p>
                                  </div>
                                ) : (
                                  <div className=" text-gray-200 text-sm truncate  w-32">
                                    messages not available
                                  </div>
                                )}

                                {/* {isTyping && (
                                <p className="text-green-500 font-semibold text-sm">
                                  typing...
                                </p>
                              )} */}
                              </div>
                            </div>
                            <div className=" mx-auto ">
                              <p className="text-gray-500 text-xs">17:07</p>

                              {chat.notify && chat.notify > 0 && (
                                <p className="mx-auto text-center text-white h-5 w-5 rounded-full bg-green-500 text-xs">
                                  <span className="align-middle">
                                    {chat.notify}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* User list */}
        </div>

        {/* Sidebar */}

        {/* Profile */}

        {profileOpen && (
          <div className=" absolute top-0 right-0 h-screen w-80 bg-gray-800  z-10 border-l border-gray-500">
            <div className=" relative  flex-col justify-center items-center">
              <div
                className=" absolute top-2 left-2 text-xl text-gray-500 font-bold cursor-pointer"
                onClick={() => setProfileOpen(false)}
              >
                X
              </div>
              <div className=" w-full py-6 h-1/6 flex justify-center  items-center border-b border-gray-600">
                {selectedChat && (
                  <Image
                    src={profileData.pic}
                    className=" bg-gray-700 p-4 rounded-full"
                    alt=""
                    layout="fixed"
                    width={200}
                    height={200}
                  />
                )}
              </div>
              <div className="flex-col items-center justify-center">
                <p className="py-4 text-gray-400 text-2xl font-semibold text-center capitalize">
                  {profileData.name}
                </p>
                <p className="py-4 text-gray-400 text-2xl font-semibold text-center">
                  {profileData.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Profile */}

        {selectedChat ? (
          <div
            className={` flex flex-col h-full max-h-screen   w-full md:w-3/5  lg:w-2/3 md:static  ${
              chatOpen ? "md:block absolute" : "hidden "
            }`}
          >
            {/* ChatHeader */}
            <div
              className=" flex justify-between bg-gray-800
          w-full
          h-16 border-b border-gray-500 "
            >
              <div className="h-16 ml-6 flex items-center">
                <button
                  className="mx-4 md:hidden text-gray-100"
                  onClick={() => setChatOpen(false)}
                >
                  <span className=" flex justify-center items-center text-xl  text-center text-gray-400">
                    <FaArrowLeft />
                  </span>
                </button>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() =>
                    handleProfile(getSenderFull(userInfo, selectedChat.users))
                  }
                >
                  {selectedChat && (
                    <Image
                      src={getSenderFull(userInfo, selectedChat.users).pic}
                      className=" bg-gray-700 p-4 rounded-full"
                      alt=""
                      layout="fixed"
                      width={35}
                      height={35}
                    />
                  )}
                </div>
                <p className="mx-4 my-10 py-1 px-4 rounded-lg   text-xl text-gray-100 capitalize">
                  {getSenderFull(userInfo, selectedChat.users).name}
                </p>
              </div>
              <div className="h-16 w-36 gap-2 mr-6 flex items-center justify-between text-2xl  text-center text-gray-400">
                <BsCameraVideo />
                <BsTelephone />
                <BiSearchAlt2 />
                <div className=" relative cursor-pointer">
                  <div onClick={() => setSideMenuOpen(!sideMenuOpen)}>
                    <BsThreeDots />
                  </div>
                  {sideMenuOpen && (
                    <div className=" absolute top-6 -right-4 bg-gray-800 w-52">
                      <ul className=" pt-2 ">
                        <li className=" py-2 px-3 text-lg text-gray-200 text-left capitalize border-b border-gray-600 hover:bg-gray-700 transition duration-200 ">
                          log out
                        </li>

                        {selectedChat.isGroupChat && (
                          <li
                            className=" py-2 px-3 text-lg text-gray-200 text-left capitalize border-b border-gray-600 hover:bg-gray-700 transition duration-200 "
                            onClick={() => setGroupInfoModalOpen(true)}
                          >
                            group info
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* ChatHeader */}

            <div className="bg-gray-900 w-full h-5/6">
              {/* //ChatBody */}

              <div className=" overflow-y-scroll max-h-full ">
                <ScrollableFeed>
                  {messages?.map((m, i) => (
                    <div
                      key={m._id}
                      className={`" flex " ${
                        isSameSender(messages, m, i, userInfo._id)
                          ? " justify-start  "
                          : " justify-end"
                      }`}
                    >
                      <div className=" h-16 ml-6 flex items-center">
                        {(isSameSender(messages, m, i, userInfo._id) ||
                          isLastMessage(messages, i, userInfo._id)) && (
                          <div
                            className=""
                            onClick={() => handleProfile(m.sender)}
                          >
                            <Image
                              src={m.sender.pic}
                              className=" bg-gray-700 p-4 rounded-full"
                              alt=""
                              layout="fixed"
                              width={35}
                              height={35}
                            />
                          </div>
                        )}

                        <p
                          className={`" mx-4 my-10 py-1 px-4 rounded-full  text-xl text-gray-300 " ${
                            isSameSender(messages, m, i, userInfo._id)
                              ? " rounded-bl-none bg-green-500/40 "
                              : " rounded-br-none bg-gray-700"
                          }`}
                        >
                          {m.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </ScrollableFeed>
              </div>

              {/* //ChatBody */}
            </div>
            {/* ChatFooter */}
            <div className=" relative">
              <div className=" absolute -top-10 left-0">
                {isTyping && (
                  <p
                    className=" flex 
                 items-end justify-between text-green-500 font-semibold text-base capitalize w-28 bg-gray-900 py-2 px-4"
                  >
                    typing
                    <div>
                      <div className="dot-flashing -mx-5"></div>
                    </div>
                  </p>
                )}
              </div>
              <form
                className="bg-gray-800
          w-full flex justify-center items-center py-2 px-10"
              >
                <div className=" w-24 flex items-center justify-evenly">
                  <div className="flex justify-center items-center text-xl  text-center text-gray-400 cursor-pointer">
                    <FaRegSmile />
                  </div>

                  <div className=" relative">
                    <input
                      type="file"
                      className="file:hidden absolute text-transparent text-xs w-1"
                      id="hidden-file"
                    />
                    <label
                      className="flex justify-center items-center text-xl  text-center text-gray-400 cursor-pointer"
                      htmlFor="hidden-file"
                    >
                      <ImAttachment />
                    </label>
                  </div>
                </div>
                <div className=" flex justify-between items-center  w-4/6">
                  <input
                    placeholder="Type something..."
                    value={newMessage}
                    onChange={typingHandler}
                    onBlur={stopTypingHandler}
                    className="p-2 px-6 inline text-gray-200 w-full bg-gray-700 rounded-full focus:outline-none"
                  />
                  <button
                    type="submit"
                    onClick={sendMessage}
                    className=" ml-2 flex items-center justify-center  rounded-full h-10 w-14 outline-none"
                  >
                    <div className="flex justify-center items-center text-xl  text-center text-gray-400 cursor-pointer">
                      <FiSend />
                    </div>
                  </button>
                  <div className="flex justify-center items-center text-xl  text-center text-gray-400 cursor-pointer">
                    <BsMic />
                  </div>
                </div>

                <div className="flex"></div>
              </form>
            </div>

            {/* ChatFooter */}
          </div>
        ) : (
          <div className="hidden h-full max-h-screen  w-full md:w-3/5  lg:w-2/3">
            <DefaultImage />
          </div>
        )}
      </div>
      <ToastContainer limit={2} />
    </>
  );
}
