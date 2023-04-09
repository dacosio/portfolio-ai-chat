import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

const StandardMessageForm = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setMessage(e.target.value);

  const handleDrop = (acceptedFiles) => {
    setAttachment(acceptedFiles[0]);
    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setLoading(false);
      setPreview(reader.result);
    };
  };

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
    console.log(props);
    props.onSubmit(form);
    setMessage("");
    setAttachment("");
  };

  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          {loading ? (
            <div className="message-form-spinner" />
          ) : (
            <>
              <img
                className="message-form-preview-image"
                src={preview}
                onLoad={() => URL.revokeObjectURL(preview)}
                alt="preview"
              />
              <XMarkIcon
                className="message-form-icon-x"
                onClick={() => {
                  setPreview("");
                  setAttachment("");
                }}
              />
            </>
          )}
        </div>
      )}
      <div className="message-form">
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Send a message..."
          />
        </div>
        <div className="message-form-icons">
          <Dropzone
            acceptedFiles=".jpg, .jpeg, .png"
            multiple={false}
            noClick={true}
            onDrop={handleDrop}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
                {attachment && (
                  <div className="message-form-selected-file">
                    {attachment.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              setPreview("");
              setAttachment("");
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StandardMessageForm;
