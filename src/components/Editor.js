import React, { useState, useRef, useMemo, useLayoutEffect } from 'react';
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
    const [storedFormatting, setStoredFormatting] = useState();

    const quillRef = useRef();

    register(Quill);

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
              toggleFormatting.call(this, setIsToggleOpen, isToggleOpen, setStoredFormatting, storedFormatting);
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
    }),[isToggleOpen, storedFormatting]);

    return (
        <>
          {isQuillVisible && <>
              <CustomToolbar fonts={fonts} values={fontsValues} isToggleOpen={isToggleOpen} />
              <ReactQuill
                  ref={quillRef}
                  theme='snow'
                  modules={modules}
                  formats={formats}
                  value={value} 
                  onChange={setValue}
              />
          </>}
        </>
      )
};
