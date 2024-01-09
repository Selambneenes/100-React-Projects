import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval : NodeJS.Timeout | undefined;
    if (running) {
      interval = setInterval(() => [
        setTime((prevTime) => prevTime + 10)
      ], 10)
    } else if (!running) {
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [running])
  return (
    <div className='flex flex-col items-center justify-center py-8'>
      <h1 className='text-lg font-semibold pb-2'>01-Stopwatch</h1>
      <div className='text-xl font-semibold py-4'>
        <span>{("0" + Math.floor((time / 60000) % 60 )as string).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60) as string).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100) as string).slice(-2)}</span>
      </div>
      <div className='w-1/3 max-w-sm flex flex-row justify-evenly'>
        {running ? (
          <button 
           className='border rounded-lg py-1 px-3.5'
           onClick={() => setRunning(false)}>Stop</button>
        ) : (
          <button
          className='border rounded-lg py-1 px-3' 
          onClick={() => setRunning(true)}>Start</button>
        )}
        <button 
        className='border rounded-lg py-1 px-2.5' 
        onClick={() => setTime(0)}>Reset</button>
      </div>
    </div>
  )
}

export default App
