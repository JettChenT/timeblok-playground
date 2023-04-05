import { useEffect, useState } from 'react'
import * as tb from "timeblok-js"
import Editor from './Editor'
import Calendar from './Calendar'

function App() {
  const [leftText, setLeftText] = useState('8am Wake up')
  const [shouldAutoCompile, setShouldAutoCompile] = useState(false)

  const compile = () => {
    return tb.compile_with_basedate(leftText, new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
  }

  const [rightText, setRightText] = useState(compile()??"")
  
  const handleUpdate = () => {
    let timeout = setTimeout(() => {
      alert("Compile timed out. Please try again.")
    }, 3000)
    let s = compile()
    clearTimeout(timeout)
    if (typeof s === 'string') {
      setRightText(s)
    }
  }

  useEffect(() => {
    if (shouldAutoCompile) {
      handleUpdate()
    }
  }, [leftText, shouldAutoCompile])

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
      <h1 className="text-2xl font-bold mb-4">Timeblok Playground</h1>
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
      {!shouldAutoCompile && <button className="btn btn-sm" onClick={handleUpdate}>Compile</button>}
      <button className="btn btn-sm ml-2" onClick={export_ics}>Export to ICS</button>
      <div className="flex items-center mt-4">
        <label htmlFor="auto-compile" className="mr-2">Auto-compile</label>
        <input type="checkbox" id="auto-compile" checked={shouldAutoCompile} onChange={() => setShouldAutoCompile(!shouldAutoCompile)} />
      </div>
    </div>
 )
}

export default App
