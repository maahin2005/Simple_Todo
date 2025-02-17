import React, { useEffect, useState } from "react";

const Toast = ({ message, type = "info", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  }[type];

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md text-white ${bgColor} shadow-lg animate-fade-in`}
    >
      {message}
    </div>
  );
};

export default Toast;
