import { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import avatarIcon from "../public/7.png";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
  getSender,
} from "../config/ChatLogics";

export default function ChatBody({ messages }) {
  const [loggedUser, setLoggedUser] = useState();
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
  console.log(chats);
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
  }, [fetchAgain]);
  return (
    <div className="overflow-y-auto max-h-full">
      <ScrollableFeed>
        {messages?.map((m, i) => (
          <div className=" flex justify-start">
            {/* <div className=" ml-6 flex  items-center">
            <Image
              src={chat.users[0].pic}
              className=" bg-gray-700 p-4 rounded-full"
              alt=""
              layout="fixed"
              width={35}
              height={35}
            />
            <div className="mx-4 my-10 py-1 px-4">
              <img src="" width="200" alt="" />
            </div>
          </div> */}

            <div className=" h-16 ml-6 flex  items-center">
              {(isSameSender(messages, m, i, userInfo._id) ||
                isLastMessage(messages, i, userInfo._id)) && (
                <Image
                  src={m.sender.pic}
                  className=" bg-gray-700 p-4 rounded-full"
                  alt=""
                  layout="fixed"
                  width={35}
                  height={35}
                />
              )}
              <p className="mx-4 my-10 py-1 px-4 rounded-lg  bg-gray-700 text-xl text-gray-300">
                {m.content}
              </p>
            </div>
          </div>
        ))}
      </ScrollableFeed>
    </div>
  );
}
