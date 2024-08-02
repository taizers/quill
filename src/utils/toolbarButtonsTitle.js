export const setButtonTitle = () => {
    const toolbarElements = document.querySelectorAll(
      '.ql-toolbar button[class*="ql-"], .ql-toolbar span.ql-picker.ql-color-picker, .ql-toolbar span.ql-picker',
    );
  
    toolbarElements.forEach((element) => {
      if (element.tagName.toLowerCase() === 'button') {
        // Handles buttons
        const { className } = element;
        let title = className.split('ql-')[1].split(' ')[0]; // Split by 'ql-' and take the first part
        title = title.charAt(0).toUpperCase() + title.slice(1);
        const value = element.getAttribute('value');
        element.setAttribute('title', `${title}${value ? `: ${value}` : ''}`);
      } else if (
        element.tagName.toLowerCase() === 'span' &&
        element.className.includes('ql-picker')
      ) {
        // Handles spans (color pickers and pickers)
        // get the first class in the list of classes of the span
        let title = element.className.split(' ')[0];
        // remove its ql- prefix
        title = title.split('ql-')[1];
        title = title.charAt(0).toUpperCase() + title.slice(1);
        element.setAttribute('title', `${title} picker`);
      }
    });
};
