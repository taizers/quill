import React, { useState, useRef, useMemo, useEffect } from 'react';
import ReactQuill, {Quill} from 'react-quill';
import {changeSpecificFonts, changeTextSize, insertStar, cleanPastFormatting} from '../utils/customActions';
import {register} from '../utils/register';
import {setButtonTitle} from '../utils/toolbarButtonsTitle';
import {bindings} from '../utils/bindButtons';
import { fontsValues, formats } from '../constants';
import { CustomToolbar } from './ToolBar';

export const Editor = ({fonts}) => {
    const [value, setValue] = useState('');
    const quillRef = useRef();

    register(Quill);

    useEffect(() => {
        setButtonTitle();
    
        // cleanPastFormatting(quillRef);
      }, []);

    const modules = useMemo(() => ({
        toolbar: {
          handlers: { 
            insertStar: insertStar,
            changeSize: changeTextSize,
            specificFonts: changeSpecificFonts,
          },
          container: '#toolbar',
        },
        keyboard: {
          bindings: bindings
        },
        clipboard: {
          matchVisual: false,
        },
    }),[]);

    console.log(fonts);

    return (
        <>
            <CustomToolbar fonts={fonts} values={fontsValues} />
            <ReactQuill
                ref={quillRef}
                theme='snow'
                modules={modules}
                formats={formats}
                value={value} 
                onChange={setValue}
            />
        </>
      )
};
