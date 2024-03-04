import { useState, useCallback, useEffect, useRef } from "react";
import "../App.css";

export default function Card() {
  let [length, setLength] = useState(8);
  let [isNumberAllowed, setIsNumberAllowed] = useState(false);
  let [isSpecialAllowed, setIsSpecialAllowed] = useState(false);
  let [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  let generatePassword = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let special = "!@#$%^&*()_+-=[]{}|;':<>?,./";

    if (isNumberAllowed) {
      str += numbers;
    }
    if (isSpecialAllowed) {
      str += special;
    }

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      password += str[randomIndex];
    }
    setPassword(password);
  }, [length, isNumberAllowed, isSpecialAllowed, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumberAllowed, isSpecialAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    setTimeout(() => {
      document.getElementById("btnCopy").classList.remove("bg-blue-400");
    }, 100);
    document.getElementById("btnCopy").classList.add("bg-blue-400");
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    // document.getElementById("btnCopy").classList.remove("bg-blue-900");
  }, [password]);

  return (
    <>
      <div className="fixed w-full h-screen text-white bg-neutral-600">
        <div className="flex w-full max-w-md shadow-lg shadow-black rounded-lg bg-stone-700 p-5 m-auto mt-10 flex-col">
          <div className="text-xl font-bold flex justify-center mb-2">
            Password Generator
          </div>

          <div className="flex shadow rounded-lg overflow-hidden mb-4 w-full">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="password"
              ref={passwordRef}
              className="w-full outline-none py-1 px-3 text-black"
            />
            <button
              onClick={copyPassword}
              id="btnCopy"
              className=" bg-blue-500 p-3 shrink-0"
            >
              Copy
            </button>
          </div>

          <div className="flex flex-wrap text-sm justify-around">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                value={length}
                min={6}
                max={50}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length: {length}</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={isNumberAllowed}
                onChange={() => {
                  setIsNumberAllowed((prev) => !prev);
                }}
              />
              <label> Numbers</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={isSpecialAllowed}
                onChange={() => {
                  setIsSpecialAllowed((prev) => !prev);
                }}
              />
              <label>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
