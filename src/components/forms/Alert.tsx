import React from "react";

interface AlertProps {
  message: string;
  type: "success" | "danger";
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  // Use dynamic class names based on alert type
  const alertClass = type === "success" ? "alert-success" : "alert-danger";

  return <div className={`alert ${alertClass}`}>{message}</div>;
};

export default Alert;
