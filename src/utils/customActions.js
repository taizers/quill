import { defaultString } from "../constants";

const getEditorAndRange = (quill) =>  {
    const editor = quill?.current ? quill?.current?.getEditor() : quill;
    const range = editor?.getSelection();
  
    return {editor, range};
};
  
const redSpecificFontFormatting = (quill) => {
    const {editor, range} = getEditorAndRange(quill);
  
    editor.removeFormat(range);
    editor.formatText(range, 'color', 'red');
    editor.formatText(range, 'size', '14px');
};
  
const boldSpecificFontFormatting = (quill) => {
    const {editor, range} = getEditorAndRange(quill);
  
    editor.removeFormat(range);
    editor.formatText(range, 'bold', 'true');
    editor.formatText(range, 'size', '10px');
};
  
const greenSpecificFontFormatting = (quill) => {
    const {editor, range} = getEditorAndRange(quill);
  
    editor.removeFormat(range);
    editor.formatText(range, 'color', 'green');
    editor.formatText(range, 'italic', 'true');
    editor.formatText(range, 'size', '12px');
    editor.formatText(range, 'font', 'roboto');
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

export function toggleFormatting (setIsToggleOpen, isToggleOpen, setStoredFormatting, storedFormatting) {
    const ops = this.quill?.editor?.delta?.ops;
    
    if (isToggleOpen) {
        const newOps = ops?.map(op => ({insert: op.insert}));

        setStoredFormatting(ops);
        this.quill?.setContents({ 'ops': newOps }); 
    } else {
        // const newStoredOps = ops.map((item) => {
        //     const storedItem = storedFormatting.find((findItem) => (findItem.insert === item && findItem.attributes));
        //     return storedItem || item;
        // });

        this.quill?.setContents({ 'ops': storedFormatting }); 
        setStoredFormatting(null);
    }

    setIsToggleOpen(!isToggleOpen);
};
