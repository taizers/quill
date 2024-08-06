import React, { useState } from 'react';
import { BaseStyles } from '@primer/react';

import 'react-quill/dist/quill.snow.css';
import './App.css';

import CheckBoxGroup from './components/CheckBoxGroup';
import { fontsValues } from './constants';
import { Editor } from './components/Editor';
import CarouselComponent from './components/CarouselComponent/CarouselComponent';

const App = () => {
  const [fonts, setFonts] = useState([]);

  return (
    <>
      <BaseStyles>
        <div className='.app'>
          <CheckBoxGroup values={fontsValues} setItems={setFonts}/>
          <Editor fonts={fonts} />
          <CarouselComponent />
        </div>
      </BaseStyles>
    </>
  );
}

export default App;
