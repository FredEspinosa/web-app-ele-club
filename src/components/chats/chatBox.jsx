// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        text: newMessage,
        sender: auth.currentUser.uid,
        timestamp: new Date(),
      };
      await addDoc(collection(db, 'messages'), messageData);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender === auth.currentUser.uid ? 'my-message' : 'other-message'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default ChatBox;
