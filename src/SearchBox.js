import React, { useEffect, useState } from 'react'

const SearchBox = (props) => {
  const [inputText, setInputText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedText(inputText);
    }, 600);
    return () => clearTimeout(timeoutId);
  }, [inputText]);

  useEffect(() => {
    props.setUserNameFn(debouncedText);
  }, [debouncedText]);

  return (
    <input
      type="text"
      value={inputText}
      onChange={(e) => {
        setInputText(e.target.value);
      }}
    />
  );
};
export default SearchBox;
