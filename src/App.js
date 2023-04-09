import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  /*const [count, setCount] = useState(0);
  function handleC() {
    setCount(count+1);
  }
  useEffect(() => {
    document.title = `you clicked ${count} times`;
  });*/
  const [delay, setDelay] = useState(10);
  const handleTimeup = useCallback(() => console.log('time up!!'),[]);
  const remainSecond = useTimer(handleTimeup, delay);

  return (
    <>
      <input 
        value={delay} type='number'
        onChange={e => setDelay(Number(e.target.value) || 0)}>
        </input>
        <div className='tp-count-down-timer'>
          <div className='tp-count-down-timer__time'>
            {new Date(remainSecond*1000).toISOString().substr(11,8)}
          </div>
        </div>
    </>
  );
}
const Practice = () => {
  const [delay, setDelay] = useState(10)

  // useCallback 會回傳該 callback 的 memoized 版本，它僅在依賴改變時才會更新
  const handleTimeup = useCallback(() => console.log('time up!!'), [])

  // 使用 useTimer 倒數
  const remainSecond = useTimer(handleTimeup, delay)

  return (

    <>
      請輸入倒數秒數
      <input
        value={delay} type='number'
        onChange={e => setDelay(Number(e.target.value) || 0)}
      />

      {/* 顯示剩餘秒數 */}
      <div className='tp-count-down-timer'>
        <div className='tp-count-down-timer__time'>
          {new Date(remainSecond * 1000).toISOString().substr(11, 8)}
        </div>
      </div>
    </>

  )
}
function useTimer (callback, delay) {
  const [remainSecond, setRemainSecond] = useState(0)
  const savedCallback = useRef()
  const savedDelay = useRef()

  // 保存到期回呼方法
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // 建立計數器並執行倒數
  useEffect(() => {
    // 刷新延遲秒數
    savedDelay.current = delay
    setRemainSecond(delay)

    // 每秒執行
    const tick = (id) => {
      // 計算剩餘時間
      if (savedDelay.current > 0) {
        savedDelay.current -= 1
      } else {
        savedDelay.current = 0
      }

      // 更新輸出的剩餘秒數
      setRemainSecond(savedDelay.current)

      // 停止條件
      if (savedDelay.current <= 0) {
        savedCallback.current()
        clearInterval(id)
      }
    }

    if (delay !== null) {
      // 產生計數器
      const id = setInterval(() => tick(id), 1000)

      // 清除計數器 (cleanup)
      return () => clearInterval(id)
    }
  }, [delay])

  // 輸出剩餘秒數
  return remainSecond
}


export default App;
