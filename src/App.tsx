import { useEffect, useRef, useState } from 'react';
import { Message } from './types/Message';
import { MessageForm } from './components/MessageForm';
import { MessageList } from './components/MessageList';

export function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useRef<WebSocket | null>(null);

  const addNewMessage = (message: Message[]) => {
    setMessages((current) => [...message, ...current]);
  };

  useEffect(() => {
    socket.current = new WebSocket('wss://chat-back-end-4d30.onrender.com');

    socket.current.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      addNewMessage(message);
    });

    return () => {
      socket.current?.close();
    };
  }, []);

  return (
    <main>
      <MessageList messages={messages} />
      <MessageForm socket={socket?.current} />
    </main>
  );
}

export default App;
