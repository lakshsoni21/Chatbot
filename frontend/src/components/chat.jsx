import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function Chat({ id, data, updateSelectChatId, chatId, openPopup, setPopup }) {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <div
        className={`chats ${id == chatId ? "selectedChat" : ""}`}
        onClick={() => {
          updateSelectChatId(id);
        }}
      >
        <p>{data}</p>
        <BsThreeDotsVertical
          id="chatdots"
          onClick={(e) => {
            setClicked(!clicked);
            if (clicked) {
              openPopup({
                chatId: chatId,
                rect: e.currentTarget.getBoundingClientRect(),
              });
            } else {
              setPopup(null);
            }
          }}
        />
      </div>
    </>
  );
}

export default Chat;
