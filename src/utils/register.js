import { fonts, fontSizes } from "../constants";
import { PlainClipboard } from './clipboard';

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
};
