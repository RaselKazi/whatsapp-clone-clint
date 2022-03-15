import Cookies from "js-cookie";
import { createContext, useReducer, useState } from "react";

export const Store = createContext();
const initialState = {
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
};
function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER_INFO": {
      const newItem = action.payload;
      return { ...state, userInfo: newItem };
    }
    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const value = {
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
    chats,
    setChats,
    state,
    dispatch,
  };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
