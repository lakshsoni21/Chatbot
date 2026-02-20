import api from "../api/axiosInstance";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

function Popup({ chatId, y, setChats, onSelectChatId, setPopup }) {
  function deleteChat(id) {
    console.log("Hello", id);
    api.post("/deletechat", { chatId: chatId }).then((response) => {
      console.log(response);
      setChats((prevChats) => prevChats.filter((chat) => chat._id !== id));
      onSelectChatId("");
      setPopup(null);
    });
  }

  return (
    <div className="popup" style={{ top: y }}>
      <div id="rename">
        <p>rename</p>
        <FaPencilAlt />
      </div>
      <div
        id="delete"
        onClick={() => {
          deleteChat(chatId);
        }}
      >
        <p>delete</p>
        <MdDelete size={20} />
      </div>
    </div>
  );
}

export default Popup;
