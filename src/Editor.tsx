// @ts-ignore
import { timeblokLang } from "./tb-grammar-comp";
import React, { useRef, useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';

interface editorProps {
  value: string,
  setValue: Function
}

const Editor: React.FC<editorProps> = ({ value, setValue }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  // this is a hack ¯\_(ツ)_/¯
  useEffect(() => {
    function handleResize() {
      if (editorRef.current) {
        setHeight(editorRef.current.parentElement?.clientHeight);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [editorRef]);

  return (
    <div ref={editorRef} style={{ height: "100%" }}>
      {height && (
        <CodeMirror
          className="text-left"
          value={value}
          onChange={(e) => { setValue(e) }}
          extensions={[timeblokLang()]}
          height={`${height}px`}
        />
      )}
    </div>
  );
}

export default Editor;

