import { Quill } from 'react-quill';
import { defaultString } from "../constants";

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
        value: 'red',
        label: 'Красный, 14px',
        function: redSpecificFontFormatting,
    },
    {
        value: 'bold',
        label: 'Жирный, 10px',
        function: boldSpecificFontFormatting,
    },
    {
        value: 'green',
        label: 'Зелёный, наклонный, 12px, Roboto',
        function: greenSpecificFontFormatting,
    },
    {
        value: 'false',
        label: defaultString,
        function: defaultSpecificFontFormatting,
    },
];

export function changeSpecificFonts(value) {
    specificFonts.find(item => item.value === value.toString()).function(this.quill);
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
  
// change size of selected text
export function changeTextSize() {
    const {editor, range} = getEditorAndRange(this.quill);
  
    if (!range || !range) {
      return;
    }
  
    editor.formatText(range, 'size', '20px');
};

export function toggleFormatting (isToggleOpen, storedFormat, insertsRef) {
    if (isToggleOpen) {
        const ops = this.quill?.editor?.delta?.ops;

        const newOps = ops?.map(op => ({insert: op.insert}));

        storedFormat.setStoredFormatting(ops);
            
        this.quill?.setContents(newOps); 
    } else {
        const previosFormattingText = storedFormat?.storedFormatting?.length ? [...storedFormat.storedFormatting] : [];
        const changedInserts = [...insertsRef.current];
        insertsRef.current = null;
        storedFormat.setStoredFormatting(null);

        if (!changedInserts.length) {
            this.quill?.setContents(previosFormattingText);
            return;
        };

        let deltaResult = new Delta(previosFormattingText);

        changedInserts.forEach(item => {
            const deltaItem = new Delta(item);
            deltaResult = new Delta(deltaResult.compose(deltaItem));
        }); 

        this.quill?.setContents(deltaResult);
    }
};
