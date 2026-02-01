import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CgAdd } from "react-icons/cg";
import { CiUser } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import api from "../api/axiosInstance";

import "./style/LeftPanel.css";

import Chat from "./chat";

function LeftPanel({ onSelectChatId, chatId }) {
  const [username, setUsername] = useState("");
  const [chats, setChats] = useState([]);
  const [userPopup, setUserPopup] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get("/allChats")
      .then((response) => {
        console.log(response.data);
        setChats(response.data.chats);
        setUsername(response.data.name);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [chatId]);

  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function deleteChat(id) {
    console.log("Hello", id);
    api.post("/deletechat", { chatId: chatId }).then((response) => {
      console.log(response);
      setChats((prevChats) => prevChats.filter((chat) => chat._id !== id));
      onSelectChatId("");
    });
  }

  return (
    <div id="leftPanel">
      <div id="top">
        <div className="name">CortexAI</div>
        <div className="toggle">
          <CiMenuBurger />
        </div>
      </div>
      <div id="chats-section">
        <div id="search">
          <CiSearch size={35} id="icon" />
          <input type="text" id="search-title" placeholder="search chats" />
        </div>

        <div id="list">
          {chats.map((item) => {
            return (
              <>
                <Chat
                  id={item._id}
                  data={item.title}
                  updateSelectChatId={onSelectChatId}
                  chatId={chatId}
                  deleteChat={deleteChat}
                />
              </>
            );
          })}
        </div>
      </div>
      <div id="new-chat">
        <CgAdd color="white" size={30} />
        <button
          onClick={() => {
            onSelectChatId(null);
          }}
        >
          New chat
        </button>
      </div>

      {userPopup ? (
        <>
          <div className="userPopUp">
            <div
              className="logout"
              onClick={() => {
                logOut();
              }}
            >
              <p>Logout</p>
            </div>
            <div className="changePassword">
              <p>changePassword</p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div
        id="userinfo"
        onClick={() => {
          setUserPopup(!userPopup);
        }}
      >
        <div id="user-logo">
          <CiUser size={20} />
        </div>
        <div className="username">
          <div id="username">{username}</div>
          <div id="tier">Free</div>
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
