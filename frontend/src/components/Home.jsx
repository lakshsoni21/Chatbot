import { useState } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

function Home() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  
  return (
    <>
      <div id="main">
        <LeftPanel chatId={selectedChatId} onSelectChatId={setSelectedChatId}/>
        <RightPanel chatId={selectedChatId} onSelectChatId={setSelectedChatId}/>
      </div>
    </>
  );
}

export default Home
