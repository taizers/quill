import { fonts, fontSizes } from "../constants";
import {PlainClipboard} from './clipboard';
import { Quill } from 'react-quill';
const Inline = Quill.import('blots/inline');

// class Changesize extends Inline {

//   static create(value) {
//       let node = super.create(value);
    
//       node.setAttribute('face', value.fontFamily);
//       node.setAttribute('size', value.size);
//       // give it some margin
//       // node.setAttribute('style', "height:0px; margin-top:10px; margin-bottom:10px;");
//       return node;
//   }

//   static formats(node) {
//     return {
//         size: node.getAttribute('size'),
//         fontFamily: node.getAttribute('face')
//     };
//   }
// }

// Changesize.blotName = 'changesize'; //now you can use .ql-hr classname in your toolbar
// Changesize.tagName = 'span'; 

export const register = (Quill) => {
  // Add sizes to whitelist and register them
  const fontSizeStyle = Quill.import('attributors/style/size');
  fontSizeStyle.whitelist = [...fontSizes , false];
  Quill.register(fontSizeStyle, true);
  
  // Add fonts to whitelist and register them
  const Font = Quill.import("formats/font");
  Font.whitelist = fonts;
  Quill.register(Font, true);

  // Register clear past text event
  Quill.register('modules/clipboard', PlainClipboard, true);

  // Quill.register('formats/changesize', Changesize, true);
};
