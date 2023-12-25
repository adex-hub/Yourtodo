import { useState, useEffect } from "react";
import { useLocalStorageState } from "../useLocalStorageState";

export default function Title({ items }) {
  const [name, setName] = useLocalStorageState("ADE", "yourName");
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

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

    // Remove the event listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={isHeaderFixed && items.length > 6 ? "fixed-header" : ""}>
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
