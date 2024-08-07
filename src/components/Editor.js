import React, { useState, useRef, useMemo, useLayoutEffect, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { changeSpecificFonts, changeTextSize, insertStar, toggleFormatting } from '../utils/customActions';
import { register} from '../utils/register';
import { setButtonTitle } from '../utils/toolbarButtonsTitle';
import { bindings } from '../utils/bindButtons';
import { fontsValues, formats } from '../constants';
import { CustomToolbar } from './ToolBar';

export const Editor = ({fonts}) => {
    const [value, setValue] = useState('');
    const [isQuillVisible, setIsQuillVisible] = useState(true);
    const [isQuillVisibleSupport, setIsQuillVisibleSupport] = useState(false);
    const [isToggleOpen, setIsToggleOpen] = useState(true);
    const [storedFormatting, setStoredFormatting] = useState(null);

    const quillRef = useRef();
    const insertsRef = useRef();

    register(Quill);

    useEffect(() => {
      if (!isToggleOpen) {
        insertsRef.current = [];
      }
    }, [isToggleOpen])

    useLayoutEffect(() => {
        setIsQuillVisibleSupport(true);
        setIsQuillVisible(false);
    }, [fonts, isToggleOpen]);

    useLayoutEffect(() => {
        if (isQuillVisibleSupport) {
            setIsQuillVisible(true);
            setIsQuillVisibleSupport(false);
        } else {
            setButtonTitle();
        }
    }, [isQuillVisibleSupport]);

    const modules = useMemo(() => ({
        toolbar: {
          handlers: { 
            insertStar: insertStar,
            changeSize: changeTextSize,
            specificFonts: changeSpecificFonts,
            showHideFormatting:  function () {
              toggleFormatting.call(this, {setIsToggleOpen, isToggleOpen}, {setStoredFormatting, storedFormatting}, insertsRef);
            },
          },
          container: '#toolbar',
        },
        keyboard: {
          bindings: bindings
        },
        clipboard: {
          matchVisual: false,
        },
    }), [isToggleOpen, storedFormatting]);

    const handleChange = ( html, delta, source, editor) => {
      setValue(html);
      const editorTextLength = editor.getLength();
      const deltaDeleteLenght = delta?.ops[delta?.ops?.length-1]?.delete;

      if (storedFormatting !== null && (deltaDeleteLenght !== editorTextLength-1 || deltaDeleteLenght !== editorTextLength))  { 
        insertsRef.current = [...insertsRef.current, delta.ops];
      }
    };

    return (
        <div className='p-3'>
          {isQuillVisible && <>
              <CustomToolbar fonts={fonts} values={fontsValues} isToggleOpen={isToggleOpen} />
              <ReactQuill
                  ref={quillRef}
                  theme='snow'
                  style={{height: '200px'}}
                  modules={modules}
                  formats={formats}
                  value={value} 
                  onChange={handleChange}
              />
          </>}
        </div>
      )
};
