import { useEffect, useState } from 'react'
// @ts-ignore
import * as tb from "timeblok-js"
import Editor from './Editor'
import Calendar from './Calendar'
import { InitialViewOptions } from './Calendar'
import Examples from "./examples.json"

const defExample = 1;
const initText = Examples[defExample].content

const compile = (t: string, debug: boolean) => {
  if (debug) {
    console.log(t, new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
    return tb.compile_verbose(t, new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
  }
  return tb.compile_with_basedate(t, new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
}

function App() {
  const hsh = window.location.hash
  const [debug, setDebug] = useState(false)
  const [leftText, setLeftText] = useState(hsh ? atob(hsh.substring(1)) : initText)
  const [rightText, setRightText] = useState(compile(leftText, debug) ?? "")
  const [shouldAutoCompile, setShouldAutoCompile] = useState(true)
  const [viewOnly, setViewOnly] = useState(hsh ? true : false) // initialize viewOnly to true when hsh exists
  const [shareButtonText, setShareButtonText] = useState("Share") // added state for share button text
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(hsh ? 0 : defExample) // added state for selected example index
  const [view, setView] = useState(Examples[selectedExampleIndex].view as InitialViewOptions)

  const handleUpdate = () => {
    let timeout = setTimeout(() => {
      alert("Compile timed out. Please try again.")
    }, 3000)
    let s = compile(leftText, debug)
    if (debug) console.log(s)
    clearTimeout(timeout)
    if (typeof s === 'string') {
      setRightText(s)
    }
    setShareButtonText("Share") // change share button text back to "Share"
  }

  const handleShare = () => {
    const encodedText = btoa(leftText)
    const currentUrl = window.location.href.split('#')[0]
    const shareUrl = `${currentUrl}#${encodedText}`
    navigator.clipboard.writeText(shareUrl)
    setShareButtonText("Copied to clipboard") // change share button text to "Copied to clipboard"
  }

  useEffect(() => {
    if (shouldAutoCompile) {
      handleUpdate()
    }
    setShareButtonText("Share") // change share button text back to "Share" when leftText is updated
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
            <Calendar icsData={rightText} initialView={view}/>
          </div>
        </div>
      ) : (
        <div className='flex h-3/4 mb-9'>
          <div className='w-1/2 h-full'>
            TimeBlok Code <br />
            Example: <select className="mb-2 select select-sm select-bordered" value={selectedExampleIndex} onChange={(e) => {
              let i = parseInt(e.target.value);
              setSelectedExampleIndex(i)
              setLeftText(Examples[i].content)
              setView(Examples[i].view as InitialViewOptions)
            }}>
              {Examples.map((example, index) => (
                <option key={index} value={index}>{example.name}</option>
              ))}
            </select>
            <div className='border-secondary border-solid border-2 h-5/6'>
              <Editor value={leftText} setValue={setLeftText} />
            </div>
          </div>
          <div className='w-1/2 ml-2'>
            Calendar <br />
            <Calendar icsData={rightText} initialView={view}/>
          </div>
        </div>
      )}


          {!shouldAutoCompile && <button className="btn btn-sm" onClick={handleUpdate}>Compile</button>}
          <button className="btn btn-sm ml-2 btn-primary" onClick={export_ics}>Export to ICS</button>
          <button className="btn btn-sm ml-2 btn-primary" onClick={handleShare}>{shareButtonText}</button> {/* use shareButtonText state */}
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
