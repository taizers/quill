import { StarFillIcon, LogIcon, EyeIcon, EyeClosedIcon } from '@primer/octicons-react';
import { defaultFont, defaultFontSize, defaultString, fontSizes } from '../constants';
import { specificFonts } from '../utils/customActions';

const CustomButton = () => <span style={{display: 'inline-block', height: '100%'}}>
    <StarFillIcon size={13}/>
  </span>;

const CustomChangeSizeButton = () => <span style={{display: 'inline-block', height: '100%'}}>
    <LogIcon size={13}/>
  </span>;

const ToggleFormattingButton = ({isToggleOpen}) => <span style={{display: 'inline-block', height: '100%'}}>
    { isToggleOpen ? <EyeIcon   size={13}/> : <EyeClosedIcon   size={13}/> }
  </span>;

export const CustomToolbar = ({fonts, values, isToggleOpen}) => (
  <div id='toolbar'>
    <select className='ql-size' defaultValue={defaultFontSize.value}>
      {fontSizes.map((item, index) => <option key={index} value={item}>{item}</option>)}
      <option value={defaultFontSize.value}>{defaultFontSize.label}</option>
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
    </select>
    <button className='ql-insertStar'>
      <CustomButton />
    </button>
    <button className='ql-changeSize'>
      <CustomChangeSizeButton />
    </button>
    <button className='ql-clean' />
    <button className='ql-image' />
    <select className='ql-specificFonts ql-size' style={{width: '260px'}} defaultValue={specificFonts.find(item => item.label === defaultString).value}>
      {specificFonts.map((item, index) => <option key={index} value={item.value}>{item.label}</option>)}
    </select>
    <select className='ql-font' defaultValue={defaultFont.value}>
      {fonts?.map((item, index)=> {
        const {label} = values.find(valueItem => valueItem.value === item);

        return <option key={index} value={item}>{label}</option>
      })}
      <option value={defaultFont.value}>{defaultFont.label}</option>
    </select>
    <button className='ql-showHideFormatting'>
      <ToggleFormattingButton isToggleOpen={isToggleOpen} />
    </button>
  </div>
);
