import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  function handleC() {
    setCount(count+1);
  }
  useEffect(() => {
    document.title = `you clicked ${count} times`;
  });
  return (
    <div className="App">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count+1)}>
        click me
      </button>
    </div>
  );
}


export default App;
