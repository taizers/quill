import { defaultString } from "../constants";

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
    editor.formatText(range, {'color': 'green'}, {'italic': 'true'}, {'size': '12px'}, {'font': 'roboto'});
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

export function toggleFormatting (setIsToggleOpen, isToggleOpen, setStoredFormatting, storedFormatting, inserts) {
    // console.log('start toggle formatting function', isToggleOpen);
    if (isToggleOpen) {
        const ops = this.quill?.editor?.delta?.ops;

        const newOps = ops?.map(op => ({insert: op.insert}));

        setStoredFormatting(ops);
        this.quill?.setContents({ 'ops': [...newOps] }, 'api'); 
    } else {
        const previosFormattingText = [...storedFormatting];
        const changedInserts = [...inserts];
        setStoredFormatting(null);

        console.log('changedInserts', changedInserts);

        this.quill?.setContents({ 'ops': [...previosFormattingText] }, 'api');
        
        changedInserts?.forEach((item, index) => {
            if (index !== changedInserts.length-1) {
                this.quill?.updateContents(item);
            }
        })
    }

    setIsToggleOpen(!isToggleOpen);
};
