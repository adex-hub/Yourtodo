import { useWindowSize } from "@uidotdev/usehooks";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function ConfettiDisplay() {
  const { width, height } = useWindowSize();
  const [TimeoutDone, setTimeoutDone] = useState(false);

  useEffect(function () {
    const timer = setTimeout(() => {
      setTimeoutDone(true);
    }, 3000);

    return () => clearTimeout(timer);
  });

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={200}
      recycle={!TimeoutDone}
      gravity={0.3}
      wind={0.05}
    />
  );
}
