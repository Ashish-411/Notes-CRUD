import React from "react";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export function confirmToast(message) {
  return new Promise((resolve) => {
    const id = toast(
      ({ closeToast }) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span>{message}</span>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              style={{
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#4caf50",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                resolve(true);   // Yes clicked
                closeToast();
              }}
            >
              Yes
            </button>
            <button
              style={{
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#f44336",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                resolve(false);  // No clicked
                closeToast();
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        closeOnClick: false,
        closeButton: false,
        autoClose: false, // stay until user clicks
        position: "top-center",
      }
    );
  });
}