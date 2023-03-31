import { useState } from 'react'
import * as tb from "timeblok-js"
import Editor from './Editor'
import Calendar from './Calendar'

function App() {
  const [leftText, setLeftText] = useState('2023-4-1\n9am do stuff')
  const [rightText, setRightText] = useState(tb.compile(leftText, BigInt(Date.now())) as string)
  
  const handleClick = () => {
    let timeout = setTimeout(() => {
      alert("Compile timed out. Please try again.")
    }, 3000)
    let s = tb.compile(leftText, BigInt(Date.now()))
    clearTimeout(timeout)
    if (typeof s === 'string') {
      setRightText(s)
    }
  }

  const export_ics = () => {
    let element = document.createElement('a');
    let file = new Blob([rightText??''], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "export.ics";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <div className="container mx-auto text-center h-screen ">
      <div className="flex h-3/4 mb-9">
        <div className='w-1/2'>
          TimeBlok Code <br/>
          <Editor value={leftText} setValue={setLeftText}/>
        </div>
        <div className='w-1/2 ml-2'>
          ICS export <br/>
          <Calendar icsData={rightText}/>
        </div>
      </div>
      <button className="btn btn-sm" onClick={handleClick}>Compile</button>
      <button className="btn btn-sm ml-2" onClick={export_ics}>Export to ICS</button>
    </div>
 )

}

export default App
