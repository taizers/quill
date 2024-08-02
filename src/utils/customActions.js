const getEditorAndRange = (quill) =>  {
    const editor = quill?.current ? quill?.current?.getEditor() : quill;
    const range = editor?.getSelection();
  
    return {editor, range};
};
  
const redEqualFormatting = (quill) => {
    const {editor, range} = getEditorAndRange(quill);
  
    editor.removeFormat(range);
    editor.formatText(range, 'color', 'red');
    editor.formatText(range, 'size', '14px');
};
  
const boldEqualFormatting = (quill) => {
    const {editor, range} = getEditorAndRange(quill);
  
    editor.removeFormat(range);
    editor.formatText(range, 'bold', 'true');
    editor.formatText(range, 'size', '10px');
};
  
const greenEqualFormatting = (quill) => {
    const {editor, range} = getEditorAndRange(quill);
  
    editor.removeFormat(range);
    editor.formatText(range, 'color', 'green');
    editor.formatText(range, 'italic', 'true');
    editor.formatText(range, 'size', '12px');
    editor.formatText(range, 'font', 'roboto');
};
  
const defaultEqualFormatting = (quill) => {
    const {editor, range} = getEditorAndRange(quill);
  
    editor.removeFormat(range);
};
  
const equals ={
    'red': redEqualFormatting,
    'bold': boldEqualFormatting,
    'green': greenEqualFormatting,
    // 'default': defaultEqualFormatting,
    'false': defaultEqualFormatting,
};

export function changeSpecificFonts(value) {
    return equals[value.toString()](this.quill);
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

export const cleanPastFormatting = (quill) => {
    const {editor} = getEditorAndRange(quill);

    editor?.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        delta.ops = delta.ops.map(op => ({insert: op.insert}))
        return delta
    })
};
