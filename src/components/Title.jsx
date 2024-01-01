import { useState, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export default function Title() {
  const [name, setName] = useLocalStorageState("ADE", "yourName");
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const adjViewportHeight = window.innerHeight + 100;
  const bodyHeight = document.body.clientHeight;

  function handleNameChange(e) {
    setName(e.target.innerHTML);
  }

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled down a certain amount (e.g., 100 pixels)
      const scrollPosition = window.scrollY;
      const shouldFixHeader = scrollPosition > 100;

      // Update the state to reflect whether the header should be fixed
      setIsHeaderFixed(shouldFixHeader);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener using a cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={
        isHeaderFixed && bodyHeight > adjViewportHeight ? "fixed-header" : ""
      }
    >
      <h1>
        <span
          contentEditable
          dangerouslySetInnerHTML={{ __html: name }}
          onBlur={handleNameChange}
          spellCheck="false"
        />
        &apos;S TODO
      </h1>
    </header>
  );
}
