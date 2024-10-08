import React, { useState, useRef, useMemo, useLayoutEffect, useEffect } from 'react';
import ReactQuill, {Quill} from 'react-quill';
import { changeSpecificFonts, clearPickersEvent, insertStar, specificFontsLabels, toggleFormatting } from '../utils/customActions';
import { register} from '../utils/register';
import { setButtonTitle } from '../utils/toolbarButtonsTitle';
import { bindings } from '../utils/bindButtons';
import { fontSizes, formats, quillPlaceholderValue, toggleFormattingButtonName } from '../constants';
import { setChangeSizeIcon, setToggleFormattingEye } from '../utils/setIcons';

export const Editor = ({fonts, isToggleOpen, setIsToggleOpen}) => {
    const [value, setValue] = useState('');
    const [isQuillVisible, setIsQuillVisible] = useState(true);
    const [isQuillVisibleSupport, setIsQuillVisibleSupport] = useState(false);
    const [storedFormatting, setStoredFormatting] = useState(null);

    const quillRef = useRef();
    const insertsRef = useRef();
    
    setChangeSizeIcon('size');
    register(Quill);

    useEffect(() => {
      if (!isToggleOpen) {
        insertsRef.current = [];

        setTimeout(() => {
          clearPickersEvent(quillRef);
        }, 100);
      };
      setToggleFormattingEye(isToggleOpen, toggleFormattingButtonName)
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
            toggleFormatting:  function () {
              toggleFormatting.call(this, isToggleOpen, {setStoredFormatting, storedFormatting}, insertsRef);
              
              setIsToggleOpen(!isToggleOpen);
            },
            changeFonts: changeSpecificFonts
          },
          container: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'size': [...fontSizes, false] }],
            [{ 'font': [...fonts, false] }],
            [{'size': '20px'}],
            [{ 'changeFonts': [...specificFontsLabels, false] }],
            [toggleFormattingButtonName],
          ],
        },
        keyboard: {
          bindings: bindings
        },
        clipboard: {
          matchVisual: false,
        },
    }), [isToggleOpen, fonts.length]);

      const handleChange = (html, delta, source, editor) => {
      setValue(html);

      if (!storedFormatting || isToggleOpen) {
        return;
      }

      const insertContent =  editor.getContents()?.ops[0].insert;
      const deltasContent =  delta.ops[0]?.insert;
      const currentInserts = insertsRef.current && [...insertsRef.current];

      if (
        currentInserts?.length === 0 && 
        deltasContent && 
        deltasContent?.length !== 0 && 
        deltasContent === insertContent &&
        delta.ops[1]?.delete
      ) {
        return;
      }

      insertsRef.current = [...currentInserts, delta.ops];
    };

    return (
        <div className='p-3'>
          {isQuillVisible && <>
              <ReactQuill
                  ref={quillRef}
                  placeholder={quillPlaceholderValue}
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
