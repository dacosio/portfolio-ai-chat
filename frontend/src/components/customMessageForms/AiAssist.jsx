import React, { useState, useEffect } from "react";
import MessageFormUi from "./MessageFormUi";
import { usePostAiAssistMutation } from "../../state/api";

function useDebounce(val, delay) {
  const [debounceValue, setDebounceValue] = useState(val);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [val, delay]);
  return debounceValue;
}

const AiAssist = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [appendText, setAppendText] = useState("");
  const [triggerAssist, resultAssist] = usePostAiAssistMutation();

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    const date = new Date();
    const dateString = date
      ? date
          .toISOString()
          .replace("T", " ")
          .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`)
      : "";

    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];

    const form = {
      attachments: at,
      created: dateString,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };
    props.onSubmit(form);
    setMessage("");
    setAttachment("");
  };

  const debounceValue = useDebounce(message, 1000);

  useEffect(() => {
    if (debounceValue) {
      const form = { text: message };
      triggerAssist(form);
    }
  }, [debounceValue]); //eslint-disable-line

  const handleKeyDown = (e) => {
    // handle enter and tab
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault();
      setMessage(`${message} ${appendText}`);
    }
    setAppendText("");
  };

  useEffect(() => {
    if (resultAssist.data?.text) {
      setAppendText(resultAssist.data?.text);
    }
  }, [resultAssist]); //eslint-disable-line

  return (
    <MessageFormUi
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      message={message}
      setAttachment={setAttachment}
      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default AiAssist;
