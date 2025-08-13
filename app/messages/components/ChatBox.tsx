import React from "react";
import ChatBubble from "@/app/components/chat/ChatBubble";

type Chat = {
  name: string;
  recentMessage: string;
  icon?: React.Component;
};

const chats: Chat[] = [
  {
    name: "Arianne Proal",
    recentMessage: "Eme ka beh",
  },
];

const ChatBox = () => {
  return (
    <div className="flex flex-col justify-center items-start w-full h-[860px]">
      {/*header*/}
      <div className="">
        <h1>Arianne Proal</h1>
        <h3>Customer</h3>
      </div>
      {/*body*/}
      <div className="border border-black flex flex-col h-full w-full overflow-y-auto bg-neutral-50">
        <div className="flex flex-col justify-end items-end flex-grow px-2 py-1">
          <ChatBubble message="Hi" senderRole="user" />
        </div>
      </div>
      {/*form*/}
      <div className="border border-black w-full">
        <input className="p-2 pl-4 w-full border-none focus:outline-none" />
      </div>
    </div>
  );
};

export default ChatBox;
