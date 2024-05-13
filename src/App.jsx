import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState('');

  const passref = useRef(null)

  const copyfromclipboard=()=>{
    passref.current?.select()
    passref.current?.setSelectionRange(0,9)
    navigator.clipboard.writeText(password)
  }

  //down there use call back is used because we dont want to render the function wheceven we reload the page
  //so use call back hook will store that fuction in cache memory and will eun when ever called 
  
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (number) str += '0123456789';
    if (char) str += '!@#$%^&*()_+=[]{}><?/';

    for (let i = 0; i <length; i++) {
      var randomChar = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomChar);
    }
    setPassword(pass);
  }, [length, number, char]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);


  return (
    <>
      <div className='bg-slate-200 w-full h-screen text-black flex justify-center text-center'>
        <div className='h-40 mt-20 pt-0 pl-3 pb-0 pr-3 bg-purple-100 rounded-md shadow-md'>
          <h1 className='text-2xl mt-3'>Password Generator</h1>
          <div>
            <input
              placeholder='Password'
              value={password}
              className='pl-1 rounded-md mt-3 w-80 h-10'
              ref={passref}
            />
            <button onClick={copyfromclipboard} className='bg-cyan-400 p-2 ml-1 rounded-md hover:cursor-pointer hover:bg-cyan-300'>
              Copy
            </button>
          </div>
          <div className='flex mt-3 gap-3'>
            <input
              type='range'
              min={8}
              max={90}
              value={length}
              onChange={(e) => {
                setLength(Number(e.target.value));
              }}
            />
            <label>length ({length})</label>
            <input
              type='checkbox'
              id='numberInput'
              checked={number}
              onChange={() => setNumber(!number)}
            />
            <label>Numbers</label>
            <input
              type='checkbox'
              checked={char}
              id='charInput'
              onChange={() => setChar(!char)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
