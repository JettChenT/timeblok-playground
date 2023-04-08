import { useEffect, useState } from 'react'
// @ts-ignore
import * as tb from "timeblok-js"
import Editor from './Editor'
import Calendar from './Calendar'

const initText = `9am Wake up`

function App() {
  const [leftText, setLeftText] = useState(initText)
  const [shouldAutoCompile, setShouldAutoCompile] = useState(true)
  const [debug, setDebug] = useState(false)
  const [viewOnly, setViewOnly] = useState(false)

  const compile = (t: string) => {
    console.log(t, new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
    if (debug) {
      return tb.compile_verbose(t, new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
    }
    return tb.compile_with_basedate(t, new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
  }

  const [rightText, setRightText] = useState(compile(initText) ?? "")

  const handleUpdate = () => {
    let timeout = setTimeout(() => {
      alert("Compile timed out. Please try again.")
    }, 3000)
    let s = compile(leftText)
    console.log(s)
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
    let file = new Blob([rightText ?? ''], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "export.ics";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <div className="container mx-auto text-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Timeblok Playground</h1>
      {viewOnly ? (
        <div className="flex h-3/4 mb-10 justify-center">
          <div className='w-3/5 ml-2'>
            Calendar <br />
            <Calendar icsData={rightText} />
          </div>
        </div>
      ) : (
        <div className="flex h-3/4 mb-9">
          <div className='w-1/2'>
            TimeBlok Code <br />
            <Editor value={leftText} setValue={setLeftText} />
          </div>
          <div className='w-1/2 ml-2'>
            Calendar <br />
            <Calendar icsData={rightText} />
          </div>
        </div>
      )}


      {!shouldAutoCompile && <button className="btn btn-sm" onClick={handleUpdate}>Compile</button>}
      <button className="btn btn-sm ml-2" onClick={export_ics}>Export to ICS</button>
      <div className="flex items-center mt-4">
        <div className="mr-4">
          <label htmlFor="auto-compile" className="mr-2">Auto-compile</label>
          <input type="checkbox" id="auto-compile" checked={shouldAutoCompile} onChange={() => setShouldAutoCompile(!shouldAutoCompile)} />
        </div>
        <div>
          <label htmlFor="debug" className="mr-2">Debug</label>
          <input type="checkbox" id="debug" checked={debug} onChange={() => setDebug(!debug)} />
        </div>
        <div className="ml-4">
          <label htmlFor="view-only" className="mr-2">View-only</label>
          <input type="checkbox" id="view-only" checked={viewOnly} onChange={() => setViewOnly(!viewOnly)} />
        </div>
      </div>
    </div>
  )
}

export default App
