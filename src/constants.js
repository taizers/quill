export const defaultString = 'default';
export const defaultMaxPage = 6;
export const defaultCurrentPage = 0;
export const defaultLimit = 5;
export const defaultDelay = 500;
export const chooseFontTitle = 'Choose Styles';
export const quillPlaceholderValue = 'Type some text...';
export const toggleFormattingButtonName = 'toggleFormatting';

export const fontsValues = [
    {
      label: 'Arial',
      value: 'arial',
    },
    {
      label: 'Comic Sans',
      value: 'comicsans',
    },
    {
      label: 'Courier New',
      value: 'couriernew',
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
      value: 'sansserif',
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
    "comicsans",
    "couriernew",
    "georgia",
    "helvetica",
    "roboto",
    "sansserif"
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

export const severity = {
  'INSTOCK': 'success',
  'LOWSTOCK': 'warning',
  'OUTOFSTOCK': 'danger',
};


// const arr1 = [1,2,3,4,5,6,7,8,9,10];
// const arr2 = [11,12,13,14,15,16,17,18,19,20];
// const arr3 = [21,22,23,24,25,26,27,28,29,30];
// const arr4 = [31,32,33,34,35,36,37,38,39,40];

// const limit = 10;

// let arr = [...arr1, ...arr2];

// let currentPage = 0;
// let carouselPosition = 18;
// let prevCarouselPosition = 17;

// const minPage = 0;
// const maxPage = 3;

// const fn = (prevCarouselPage, carouselPage) => {
//   if (carouselPage > prevCarouselPage && currentPage < maxPage) {
//     if (carouselPage <= arr.length && carouselPage >= arr.length-2) {
//       const dArr = arr.slice(limit, arr.length);
//       arr = [...dArr, ...arr3];

      
//       carouselPosition = carouselPage - limit;
//       prevCarouselPosition = carouselPage-1 - limit;
//       currentPage++;
//     }
//     prevCarouselPosition = carouselPage;
//     carouselPosition = carouselPage+1;
//   }

//   if (carouselPage < prevCarouselPage && currentPage > minPage) {
//     if (carouselPage >= 0 && carouselPage <= 2) {
//       const dArr = arr.slice(0, -limit);
//       arr = [...arr4,...dArr];

//       carouselPosition = carouselPage + limit;
//       prevCarouselPosition = carouselPage-1 + limit;
//       currentPage--;
//     }
//     prevCarouselPosition = carouselPage;
//     carouselPosition = carouselPage-1;
//   }

  
  
// };

// console.log('arr', arr);
// console.log(`1currentPage: ${currentPage}, prevCarouselPosition: ${prevCarouselPosition}, carouselPosition: ${carouselPosition}`)
// fn(prevCarouselPosition,carouselPosition);
// console.log('arr', arr);
// console.log(`2currentPage: ${currentPage}, prevCarouselPosition: ${prevCarouselPosition}, carouselPosition: ${carouselPosition}`)
// fn(prevCarouselPosition,carouselPosition);
// console.log('arr', arr);
// console.log(`3currentPage: ${currentPage}, prevCarouselPosition: ${prevCarouselPosition}, carouselPosition: ${carouselPosition}`)

