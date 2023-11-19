import { Message } from '../../types/Message';

interface Props {
  messages: Message[];
};

export const MessageList: React.FC<Props> = ({ messages }) => {
  return (
    <article className='message'>
      <ul
        className='message__list'
      >
        {messages.map(({ id, text }) => (
          <li
            className='message__item'
            key={id}
          >
            {text}
          </li>
        ))}
      </ul>
    </article>
  );
};
