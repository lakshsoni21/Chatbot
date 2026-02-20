import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CgAdd } from "react-icons/cg";
import { CiUser } from "react-icons/ci";
import { ImExit } from "react-icons/im";
import { RiLockPasswordLine } from "react-icons/ri";
import api from "../api/axiosInstance";
import Popup from "./Popup";

import Chat from "./chat";

function LeftPanel({ onSelectChatId, chatId, showSidebar, setShowSidebar }) {
  const [username, setUsername] = useState("");
  const [chats, setChats] = useState([]);
  const [userPopup, setUserPopup] = useState(false);
  const [popup, setPopup] = useState(null);

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

  function openPopup({ chatId, rect }) {
    setPopup({
      chatId,
      x: rect.right + 8,
      y: rect.top,
    });
  }

  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => {
          setShowSidebar(!showSidebar);
        }}
      >
        <CiMenuBurger />
      </button>
      <div className={`left-panel ${showSidebar ? "show" : ""}`}>
        <div id="top">
          <div className="name">CortexAI</div>
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
                    openPopup={openPopup}
                    setPopup={setPopup}
                  />
                </>
              );
            })}
            {popup && (
              <Popup
                chatId={popup.chatId}
                y={popup.y}
                setChats={setChats}
                onSelectChatId={onSelectChatId}
                setPopup={setPopup}
              />
            )}
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
                <ImExit />
              </div>
              <div className="changePassword">
                <p
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                >
                  Change Password
                </p>
                <RiLockPasswordLine />
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
    </>
  );
}

export default LeftPanel;
