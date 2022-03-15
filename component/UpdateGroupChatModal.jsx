import React, { useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsArrowLeftCircle } from "react-icons/bs";
export default function UpdateGroupChatModal({
  setGroupInfoModalOpen,
  fetchMessages,
}) {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, state } = useContext(Store);
  const { userInfo } = state;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
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
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed to Load the Search Results");
      setLoading(false);
    }
  };

  const handleRename = async (e) => {
    e.preventDefault();
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `https://whats-app-c.herokuapp.com/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data);
      // setSelectedChat("");
      setSelectedChat(data);

      setRenameLoading(false);
    } catch (error) {
      console.log(error);
      //   toast.error(error.response.data.message);
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast.error("User Already in group!");
      return;
    }

    if (selectedChat.groupAdmin._id !== userInfo._id) {
      toast.error("Only admins can add someone!");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `https://whats-app-c.herokuapp.com/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);

      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (
      selectedChat.groupAdmin._id !== userInfo._id &&
      user1._id !== userInfo._id
    ) {
      toast.error("Only admins can remove someone!");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `https://whats-app-c.herokuapp.com/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === userInfo._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
    setGroupChatName("");
  };
  return (
    <div className=" z-10 bg-gray-800 w-full  h-screen absolute right-0 top-0 shadow-2xl">
      <div className=" border-b border-gray-800 px-6 py-2 flex-coll justify-between items-center w-full">
        <button
          className="text-gray-100 py-4"
          onClick={() => {
            setGroupInfoModalOpen(false);
          }}
        >
          <span className=" flex justify-center items-center text-2xl  text-center text-gray-400">
            <BsArrowLeftCircle />
          </span>
        </button>

        <div className="my-2 flex">
          <input
            type="text"
            value={groupChatName}
            placeholder="GroupName..."
            autoFocus="1"
            className="p-2 rounded-lg inline text-gray-400  bg-gray-700 focus:outline-none w-full "
            onChange={(e) => setGroupChatName(e.target.value)}
          />
          <div
            className=" px-4 py-2 rounded-md ml-2 bg-green-500  cursor-pointer text-gray-100 "
            onClick={handleRename}
          >
            Update
          </div>
        </div>
        <div className="py-2 flex justify-start gap-3 flex-wrap">
          {console.log(selectedChat)}
          {selectedChat.users.map((u) => (
            <div
              key={u._id}
              className="flex justify-start  items-center bg-gray-700 rounded-lg py-1 px-2"
            >
              <div className=" flex mx-2">
                <Image
                  src={u.pic}
                  className=" h-10 w-10 rounded-full mr-3"
                  alt=""
                  layout="fixed"
                  width={25}
                  height={25}
                />
              </div>
              <div className="ml-2 text-base  text-gray-300 capitalize">
                {u.name}
              </div>
              <div
                className=" ml-1 px-2  text-base  text-gray-400 capitalize hover:bg-red-500 hover:text-gray-100 rounded-full cursor-pointer transition duration-200"
                onClick={() => handleRemove(u)}
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
              onClick={handleSearch}
            >
              <BiSearchAlt2 />
            </div>
          </div>
        </div>
        {loading
          ? Array(4)
              .fill(0)
              .map((_, index) => (
                <div class=" shadow  p-4 max-w-sm w-full mx-auto">
                  <div class="animate-pulse flex space-x-4">
                    <div class="rounded-full bg-gray-700 h-8 w-8"></div>
                    <div class="flex-1 py-1">
                      <div class="space-y-3">
                        <div class="h-2 bg-slate-700 rounded"></div>
                        <div class="grid grid-cols-3 gap-4">
                          <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                          <div class="h-2 bg-slate-700 rounded col-span-1"></div>
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
                onClick={() => handleAddUser(user)}
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

      <button
        className=" w-full absolute bottom-2 left-0 bg-red-500 py-2 px-4 rounded-lg text-lg  uppercase text-gray-100 font-bold"
        onClick={() => handleRemove(userInfo)}
      >
        Leave Group
      </button>
      <ToastContainer limit={2} />
    </div>
  );
}
