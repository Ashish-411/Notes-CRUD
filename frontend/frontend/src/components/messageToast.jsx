import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Custom toast function
 * Usage: messageToast("Hello world");
 */
export function messageToast(message, type = "info") {
  switch(type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warn(message);
      break;
    default:
      toast.info(message);
      break;
  }
}

/**
 * ToastContainer component
 * Place this once in your App.jsx
 */
export function MessageToastContainer() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" // matches your black/white theme
    />
  );
}
