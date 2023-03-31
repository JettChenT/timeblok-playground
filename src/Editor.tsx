import { timeblokLang } from "./tb-grammar-comp";
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
const tb = `/do`;

interface editorProps {
    value: string,
    setValue: Function
}

const Editor: React.FC<editorProps> = ({value, setValue}) => {
  return <CodeMirror className="text-left" value={value} onChange={(e) => {setValue(e)}} height="200px" extensions={[timeblokLang()]} />;
}

export default Editor;