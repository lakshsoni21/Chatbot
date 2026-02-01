import { useEffect, useState, useRef } from "react";
import api from "../api/axiosInstance";
import { BsFillSendFill } from "react-icons/bs";
import Thread from "./Thread";
import styles from "./style/RightPanel.module.css";

function RightPanel({ chatId, onSelectChatId }) {
  const [userQuestion, setUserQuestion] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // ✅ Fetch messages when chatId changes
  useEffect(() => {
    if (!chatId) return;

    if (isLoading) return;

    api
      .post("/getAllMessages", { chatId })
      .then((response) => {
        const messagesWithFlag = response.data.messages.map((msg) => ({
          ...msg,
          isNew: false,
          typewriter: false,
        }));
        setAllMessages(messagesWithFlag);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chatId, isLoading]);

  // ✅ Auto-scroll when messages change
  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [allMessages]);

  function createChat() {
    if (!userQuestion.trim()) return;

    const tempMessage = {
      id: Date.now(),
      question: userQuestion,
      answer: null,
      isNew: true,
      typewriter: false,
    };

    setAllMessages([tempMessage]);

    setIsLoading(true);

    api
      .post("/newchat", { question: userQuestion })
      .then((response) => {
        setIsLoading(false);
        onSelectChatId(response.data.chatId);
        setUserQuestion("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleTypewriterDone = (id) => {
    setAllMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, typewriter: false } : msg)),
    );
  };

  function createMessage() {
    if (!userQuestion.trim() || !chatId) return;

    const tempMessage = {
      question: userQuestion,
      answer: null,
      isNew: true,
    };

    setAllMessages((prev) => [
      ...prev.map((msg) => ({ ...msg, isNew: false })),
      tempMessage,
    ]);

    setIsLoading(true);
    setUserQuestion("");

    api
      .post("/createMessage", { question: tempMessage.question, chatId })
      .then((response) => {
        const answer = response.data.data.answer;
        console.log(response);
        setAllMessages((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1
              ? { ...msg, answer, isNew: false, typewriter: true }
              : msg,
          ),
        );

        // ✅ Update last message (stop blinking)

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  return (
    <>
      {chatId || isLoading ? (
        <div className={styles.rightPanelThread}>
          <div className={styles.scrollable} ref={scrollRef}>
            <div className={styles.content}>
              {allMessages.map((msg, index) => (
                <Thread
                  key={index}
                  item={msg}
                  onTypewriterDone={handleTypewriterDone}
                />
              ))}
            </div>
          </div>

          <div className={styles.typeBox}>
            <input
              type="text"
              placeholder="Ask anything"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
            />
            <button onClick={createMessage}>
              <BsFillSendFill color="white" size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.rightPanel}>
          <h1>LLAMA</h1>
          <div className={styles.container}>
            <h1>What's on your mind today?</h1>
            <div className={styles.typeBox}>
              <input
                type="text"
                placeholder="Ask anything"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
              />
              <button onClick={createChat}>
                <BsFillSendFill color="white" size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RightPanel;
