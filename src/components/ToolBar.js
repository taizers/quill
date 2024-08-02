import {StarFillIcon, LogIcon } from '@primer/octicons-react';

const CustomButton = () => <span style={{display: 'inline-block', height: '100%'}}><StarFillIcon  size={13}/></span>;
const CustomChangeSizeButton = () => <span style={{display: 'inline-block', height: '100%'}}><LogIcon   size={13}/></span>;

export const CustomToolbar = ({fonts, values}) => (
  <div id='toolbar'>
    <select className='ql-size' defaultValue={'14px'}>
      <option value='10px'>10px</option>
      <option value='12px'>12px</option>
      <option value='14px'>14px</option>
      <option value='16px'>16px</option>
      <option value='20px'>20px</option>
      <option value='14px'>default</option>
    </select>
    <button className='ql-bold' />
    <button className='ql-italic' />
    <select className='ql-color'>
      <option value='red' />
      <option value='green' />
      <option value='blue' />
      <option value='orange' />
      <option value='violet' />
      <option value='#d0d1d2' />
      <option selected />
    </select>
    <button className='ql-insertStar'>
      <CustomButton />
    </button>
    <button className='ql-changeSize'>
      <CustomChangeSizeButton />
    </button>
    <button className='ql-clean' />
    <button className='ql-image' />
    <select className='ql-specificFonts ql-size ' style={{width: '260px'}} defaultValue={'default'}>
      <option value='red'>Красный, 14px</option>
      <option value='bold'>Жирный, 10px</option>
      <option value='green'>Зелёный, наклонный, 12px, Roboto</option>
      <option value='default' selected>default</option>
    </select>
    <select className='ql-font' defaultValue={'default'}>
      {fonts?.map((item, index)=> {
        const {value} = values.find(valueItem => valueItem.value === item);

        return <option key={index} value={item}>{value}</option>
      })}
      <option value='default'>default</option>
    </select>
  </div>
);