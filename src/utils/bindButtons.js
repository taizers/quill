export const bindings = {
    tab: false, 
    left: {
      key: 37,
      altKey: true,
      handler: function(range, context) {
        if (this.quill.getFormat()?.italic) {
          return this.quill.formatText(range, 'italic', false);
        }

        this.quill.formatText(range, 'italic', true);
      }
    },
    custom: {
      key: 'B',
      shiftKey: true,
      handler: function(range, context) {
        if (this.quill.getFormat()?.bold) {
          return this.quill.formatText(range, 'bold', false);
        }
        
        this.quill.formatText(range, 'bold', true);
      }
    },
};
