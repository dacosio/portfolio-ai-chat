import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

const MessageFormUi = ({
  message,
  setAttachment,
  handleChange,
  handleSubmit,
  appendText,
  handleKeyDown,
}) => {
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
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
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
          />
          {appendText && (
            <input
              className="message-form-assist"
              type="text"
              disabled
              value={`${message} ${appendText}`}
            />
          )}
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

export default MessageFormUi;
