"use client";

import { useEffect, useState } from "react";

export default function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLeaving(true), 2500);
    const closeTimer = setTimeout(onClose, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div
      className="toast"
      style={{
        animation: leaving
          ? "toast-out 0.25s ease-in forwards"
          : undefined,
      }}
    >
      {message}
    </div>
  );
}
