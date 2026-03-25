"use client";

import { useEffect, useRef, useState } from "react";

interface AppCountdownProps {
  initialSeconds: number;
  onFinish?: () => void;
  autoStart?: boolean;
  className?: string;
  displayMode?: "minutes-seconds" | "seconds";
  getAriaLabel?: (secondsLeft: number) => string;
}

export const AppCountdown = ({
  initialSeconds,
  onFinish,
  autoStart = true,
  className,
  displayMode = "minutes-seconds",
  getAriaLabel,
}: AppCountdownProps) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const hasCalledOnFinishRef = useRef(false);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
    setIsRunning(autoStart);
    hasCalledOnFinishRef.current = false;
  }, [initialSeconds, autoStart]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    if (secondsLeft !== 0) return;
    if (hasCalledOnFinishRef.current) return;

    hasCalledOnFinishRef.current = true;
    onFinishRef.current?.();
  }, [secondsLeft, isRunning]);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  const content =
    displayMode === "seconds" ? secondsLeft : `${minutes}:${seconds}`;

  return (
    <button
      type="button"
      className={className}
      aria-live={getAriaLabel ? "polite" : undefined}
      aria-label={getAriaLabel ? getAriaLabel(secondsLeft) : undefined}
    >
      {content}
    </button>
  );
};
