import React, { useState } from 'react';
import { BaseStyles } from '@primer/react';
import 'react-quill/dist/quill.snow.css';
import './App.css';

import { CheckBoxGroup } from './components/CheckBoxGroup';
import { fontsValues } from './constants';
import { Editor } from './components/Editor';

// const modules = {
//   toolbar: [
//     [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
//     [{size: []}],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [{'list': 'ordered'}, {'list': 'bullet'}, 
//      {'indent': '-1'}, {'indent': '+1'}],
//     ['link', 'image', 'video'],
//     ['clean']
//   ],
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   }
// };



// const handlePaste = (e) => {
//   console.log(e);
//   const data = e.clipboardData?.items[0]
  
//   // if(typeof data === 'undefined') return
//   // if (data.type === 'image/png' || data.type === 'image/jpeg' || data.type === 'image/jpg') {
    
//   //   e.preventDefault();
//   // }
// };



const App = () => {
  const [fonts, setFonts] = useState([]);

  // add eventListener for past action
  // React.useEffect(() => {
  //   const quill = quillRef.current.getEditor();
  //   quill.root.addEventListener('paste', handlePaste);

  //   return () => {
  //     quill.root.removeEventListener('paste', handlePaste);
  //   };
  // }, []);

  return (
    <>
      <BaseStyles>
        <div className='.app'>
          <CheckBoxGroup values={fontsValues} setItems={setFonts}/>
          <Editor fonts={fonts} />
        </div>
      </BaseStyles>
    </>

  );
}

export default App;
