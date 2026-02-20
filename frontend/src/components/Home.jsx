import { useState } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

function Home() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div id="main">
        <LeftPanel
          chatId={selectedChatId}
          onSelectChatId={setSelectedChatId}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <RightPanel
          chatId={selectedChatId}
          onSelectChatId={setSelectedChatId}
          showSidebar={showSidebar}
        />
      </div>
    </>
  );
}

export default Home;
