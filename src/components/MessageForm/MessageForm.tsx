import { FormEvent, useState } from 'react';

interface Props {
  socket: WebSocket | null,
};

export const MessageForm: React.FC<Props> = ({ socket }) => {
  const [message, setTextMessage] = useState('');

  const sendMessage = async (text: string) => {
    socket?.send(text);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!message) {
      return;
    }

    sendMessage(message)
    resetForm();
  };

  const resetForm = () => {
    setTextMessage('');
  };

  return (
    <form
      className='message-form'
      onSubmit={handleSubmit}
    >
      <div className='message-form__box'>
        <label
          className='message-form__label'
        >
          <input
            className='message-form__input'
            type='text'
            placeholder='Message...'
            value={message}
            onChange={(event) => setTextMessage(event.target.value)}
          />
        </label>

        <button
          className='message-form__button'
          type='submit'
          disabled={socket?.readyState !== WebSocket.OPEN}
        >
          Send
        </button>
      </div>
    </form>
  );
};
