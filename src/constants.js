export const defaultString = 'default';
export const defaultMaxPage = 6;
export const defaultCurrentPage = 0;
export const defaultLimit = 5;

export const fontsValues = [
    {
      label: 'Arial',
      value: 'arial',
    },
    {
      label: 'Comic Sans',
      value: 'comic-sans',
    },
    {
      label: 'Courier New',
      value: 'courier-new',
    },
    {
      label: 'Georgia',
      value: 'georgia',
    },
    {
      label: 'Helvetica',
      value: 'helvetica',
    },
    {
      label: 'Roboto',
      value: 'roboto',
    },
    {
      label: 'Sans Serif',
      value: 'sans-serif',
    }
];

export const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'color'
];

export const fonts = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "roboto",
    "sans-serif"
];

export const fontSizes = ['10px', '12px', '14px', '16px', '18px', '20px'];

export const defaultFontSize = {
  label: defaultString,
  value: '14px',
};
export const defaultFont = {
  label: defaultString,
  value: defaultString,
};

export const responsiveOptions = [
  {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
  },
  {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
  },
  {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
  },
  {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
  }
];
