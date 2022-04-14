import React from "react";

const Notification = ({ message }) => {
console.log(typeof(message))
  if (message === null) return null;
  if (message.includes("error") || message.includes("failed")) return <div className="error">{message}</div>;
  else return <div className="success">{message}</div>;
};

export default Notification;
