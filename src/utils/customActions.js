import { Quill } from 'react-quill';
import { toggleFormattingButtonName } from "../constants";

const Delta = Quill.import('delta');

const getEditorAndRange = (quill) =>  {
    const editor = quill?.current ? quill?.current?.getEditor() : quill;
    const range = editor?.getSelection();
  
    return {editor, range};
};
  
const redSpecificFontFormatting = (quill) => {
    const {editor, range} = getEditorAndRange(quill);
  
    editor.removeFormat(range);
    editor.formatText(range, {'color': 'red', 'size': '14px'});
};
  
const boldSpecificFontFormatting = (quill) => {
    const {editor, range} = getEditorAndRange(quill);
  
    editor.removeFormat(range);
    editor.formatText(range, {'bold': 'true', 'size': '10px'});
};
  
const greenSpecificFontFormatting = (quill) => {
    const {editor, range} = getEditorAndRange(quill);
  
    editor.removeFormat(range);
    editor.formatText(range, {'color': 'green', 'italic': 'true', 'size': '12px', 'font': 'roboto'});
};
  
const defaultSpecificFontFormatting = (quill) => {
    const {editor, range} = getEditorAndRange(quill);
  
    editor.removeFormat(range);
};

export const specificFonts = [
    {
        label: 'Red, 14px',
        function: redSpecificFontFormatting,
    },
    {
        label: 'Bold, 10px',
        function: boldSpecificFontFormatting,
    },
    {
        label: 'Green, Italic, 12px, Roboto',
        function: greenSpecificFontFormatting,
    },
    {
        label: 'false',
        function: defaultSpecificFontFormatting,
    },
];

export const specificFontsLabels = specificFonts.map(item => item.label).slice(0,-1);

export function changeSpecificFonts(value) {
    specificFonts.find(item => item.label === value.toString()).function(this.quill);
};

export function insertStar() {
    const {editor, range} = getEditorAndRange(this.quill);
  
    if (!editor || !range) {
      return;
    }
  
    const cursorPosition = range.index;
  
    editor.insertText(cursorPosition, '★');
    editor.setSelection(cursorPosition + 1);
};
  
const trimString = (input) => {
    if (input.includes('\n')) {
        if (input.trim() === '') {
            return true;
        }
        
        return input.replace(/\n+$/, '');
    }
    
    return false;
};

const trimLastInsert = (ops) => {
    const insert = trimString(ops[ops.length-1].insert);

    if (insert === true) {
        return ops.slice(0, -1);
    }
    if (insert === false) {
        return ops;
    }

    ops[ops.length-1].insert = insert;
    return ops;
}

const getUpdatedDelta = (oldOps, changesArr) => {
    let deltaResult = new Delta(oldOps);

    changesArr.forEach(item => {
        const deltaItem = new Delta(item);
        deltaResult = new Delta(deltaResult.compose(deltaItem));
    }); 

    return deltaResult;
};

const setContent = (quill, ops) => {
    const updatedOps = trimLastInsert(ops);

    quill?.setContents(updatedOps); 
};

export const clearPickersEvent = (quillRef) => {
    const toolbar = quillRef.current.getEditor().getModule('toolbar');
    const pickers = toolbar.container.querySelectorAll('span.ql-picker');
    const buttons = toolbar.container.querySelectorAll(`button[class*="ql-"i]:not([class*="ql-${toggleFormattingButtonName}"i])`);

    buttons.forEach(element => {
        element.disabled = true;
    })
  
    pickers.forEach(element => {  
      element.addEventListener('mousedown', evt => evt.stopImmediatePropagation(), true);
      element.addEventListener('keydown', evt => evt.stopImmediatePropagation(), true);
    })
};

export function toggleFormatting (isToggleOpen, storedFormat, insertsRef) {
    if (isToggleOpen) {
        const ops = this.quill?.editor?.delta?.ops;
        
        storedFormat.setStoredFormatting(ops);

        const newOps = ops?.map(op => ({insert: op.insert}));

        setContent(this.quill, newOps)
    } else {
        const previosFormattingText = storedFormat?.storedFormatting?.length ? [...storedFormat.storedFormatting] : [];
        const changedInserts = insertsRef?.current && [...insertsRef.current];
        
        storedFormat.setStoredFormatting(null);

        if (!changedInserts?.length) {
            setContent(this.quill, previosFormattingText)
            return;
        };

        const deltaResult = getUpdatedDelta(previosFormattingText, changedInserts);
        setContent(this.quill, deltaResult.ops)
    }
};
