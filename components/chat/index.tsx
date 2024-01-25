import { useContext, useEffect, useState } from 'react';

import { UserMessage } from '@/common/types';
import { MYSELF } from '@/common/constants';
import { append, formatTimeHHMM } from '@/common/utils';

import {useSocket} from '@/contexts/RTCcontext';
import Message from "@/components/message"
import useCurrentUser from "@/hooks/useCurrentUser";
import { User } from '@prisma/client';
const Chat = () => {
  const { data }: { data?: { currentUser?: User } } = useCurrentUser();
  const username = data?.currentUser?.name;
  const {socket} = useSocket();

  const [text, setText] = useState('');
  const [messages, setMessages] = useState<UserMessage[]>([]);

  useEffect(() => {
    if(!socket)
      return;
    socket.on('chat:get', (message: UserMessage) =>
      setMessages(append(message))
    );

    return () => {
      socket.off('chat:get');
    };
  }, []);

  function sendMessage(e: React.KeyboardEvent<HTMLInputElement>) {


    const messageText = (e.target as HTMLInputElement).value;
    const lastMessage = messages.at(-1);

    if (e.key === 'Enter' && messageText) {
      const timeHHMM = formatTimeHHMM(Date.now());
      const message = {
        user: username,
        text: messageText,
        time: timeHHMM,
        shouldAggregate:
          lastMessage?.user === MYSELF && lastMessage?.time === timeHHMM,
      };
      
      socket.emit('chat:post', message);
      setMessages(append({ ...message, user: MYSELF }));
      setText('');
    }
  }

  return (
    <div className=' w-full shadow-xl'>
      <div className="h-[calc(100vh-10rem)] w-[400px] overflow-y-auto">
        {messages.map((message, index) => (
          <Message
            key={`${message.time}-${index}`}
            message={message}
            isLast={index === messages.length - 1}
          />
        ))}
      </div>
      <div className="flex w-full items-center justify-center  pt-6">
        <input
          autoComplete="off"
          type="text"
          name="name"
          id="name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={sendMessage}
          className="block rounded-2xl w-full border border-gray-300 bg-transparent p-4 text-sm text-black outline-none"
          placeholder="Send a message to everyone"
        />
      </div>
    </div>
  );
};

export default Chat;
