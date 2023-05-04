import { useEffect, useRef, useState } from 'react'
import {create} from 'zustand'
import { InitialViewOptions } from './Calendar'
import Examples from "./examples.json"
import Editor from './Editor'
import Calendar from './Calendar'
// @ts-ignore
import * as tb from "timeblok-js"
import { useTimeBlokStore } from './state'
import FullCalendar from '@fullcalendar/react'

function App() {
  const {
    leftText,
    rightText,
    shouldAutoCompile,
    viewOnly,
    debug,
    shareButtonText,
    selectedExampleIndex,
    view,
    setLeftText,
    setRightText,
    setShouldAutoCompile,
    setViewOnly,
    setDebug,
    setShareButtonText,
    setSelectedExampleIndex,
    setView,
  } = useTimeBlokStore()


  const calendarRef = useRef<FullCalendar | null>(null);
  const compile = (t: string, debug: boolean) => {
    if (debug) {
      console.log(t, new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
      return tb.compile_verbose(t, new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
    }
    return tb.compile_with_basedate(t, new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
  }

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
    setShareButtonText("Share")
  }

const handleShare = () => {
    const encodedText = btoa(leftText)
    const currentUrl = window.location.origin // change currentUrl to the current base url(without subroutes or query parameters)
    const currentView = calendarRef.current?.getApi().view.type
    const timezoneOffset = new Date().getTimezoneOffset()
    const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60)).toString().padStart(2, '0')
    const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60).toString().padStart(2, '0')
    const timezoneOffsetString = `${timezoneOffset >= 0 ? '-' : '+'}${timezoneOffsetHours}:${timezoneOffsetMinutes}`
    const shareUrl = `${currentUrl}?view=${currentView}&timezone=${encodeURIComponent(timezoneOffsetString)}#${encodedText}`
    navigator.clipboard.writeText(shareUrl)
    setShareButtonText("Copied to clipboard")
  }

  
  const export_ics = () => {
    let element = document.createElement('a');
    let file = new Blob([rightText ?? ''], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "export.ics";
    document.body.appendChild(element);
    element.click();
  }

  useEffect(() => {
    // Initialize states
    const hsh = window.location.hash;
    if(hsh){
      let lt = atob(hsh.substring(1));
      const timezoneParam = new URLSearchParams(window.location.search).get("timezone");
      if (timezoneParam) {
        lt = `/tz ${timezoneParam} // Local timezone of sender\n${lt}`
      }
      setLeftText(lt);
      handleUpdate()
    }
    const queryParam = new URLSearchParams(window.location.search).get("view");
    if (queryParam) {
      try{
        const vtype = queryParam as InitialViewOptions
        setView(vtype);
      }catch(err){
        console.log(err)
      }
    }
  }, [])

  useEffect(() => {
    if (shouldAutoCompile) {
      handleUpdate()
    }
    setShareButtonText("Share")
  }, [leftText, shouldAutoCompile])

  return (
    <div className="container mx-auto text-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Timeblok Playground</h1>
      {viewOnly ? (
        <div className="flex h-3/4 mb-10 justify-center">
          <div className='w-3/5 ml-2'>
            Calendar <br />
            <Calendar calendarRef={calendarRef}/>
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
            <Calendar calendarRef={calendarRef}/>
          </div>
        </div>
      )}


          {!shouldAutoCompile && <button className="btn btn-sm ml-2 btn-primary" onClick={handleUpdate}>Compile</button>}
          <button className="btn btn-sm ml-2 btn-primary" onClick={export_ics}>Export to ICS</button>
          <button className="btn btn-sm ml-2 btn-primary" onClick={handleShare}>{shareButtonText}</button> {/* use shareButtonText state */}
          {viewOnly && <button className="btn btn-sm ml-2 btn-primary" onClick={() => setViewOnly(false)}>Edit</button>}
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
          <a className='link link-primary' href='https://github.com/JettChenT/timeblok-playground'>Github</a>
          <a className='link link-primary ml-3' href='https://github.com/JettChenT/timeblok'>Timeblok</a>
        </div>
      )
      
      }

export default App
