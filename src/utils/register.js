const fonts = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "roboto"
];

const fontSizes = ['10px', '12px', '14px', '16px', '18px', '20px'];
  
export const register = (Quill) => {
  // Add sizes to whitelist and register them
  const fontSizeStyle = Quill.import('attributors/style/size');
  fontSizeStyle.whitelist = [...fontSizes , false];
  Quill.register(fontSizeStyle, true);
  
  // Add fonts to whitelist and register them
  const Font = Quill.import("formats/font");
  Font.whitelist = fonts;
  Quill.register(Font, true);
};