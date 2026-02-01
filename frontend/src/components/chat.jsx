import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

function Chat({ id, data, updateSelectChatId, chatId, deleteChat }) {
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
          onClick={() => {
            setClicked(!clicked);
            console.log(clicked);
          }}
        />
        {clicked ? (
          <>
            <div className="popup">
              <div id="rename">
                <p>Rename</p>
                <FaPencilAlt />
              </div>
              <div
                id="delete"
                onClick={() => {
                  deleteChat(id);
                }}
              >
                <p>Delete</p>
                <MdDelete size={20} />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Chat;
