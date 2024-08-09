import React from 'react';
import { CheckboxGroup, Checkbox, FormControl, Box } from '@primer/react'
import { chooseFontTitle } from '../constants';

const CheckBoxGroup = ({values, setItems, isToggleOpen}) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', p: 2, }}>
            <CheckboxGroup onChange={setItems} disabled={!isToggleOpen}>
                <CheckboxGroup.Label>{chooseFontTitle}</CheckboxGroup.Label>
                {
                    values?.map((item, index) => (
                        <FormControl key={index}>
                            <Checkbox value={item.value} sx={{'&:checked': {backgroundColor: 'lightblue'}}} />
                            <FormControl.Label>{item.label}</FormControl.Label>
                        </FormControl>
                    ))
                }
            </CheckboxGroup>
        </Box>
      )
};

export default CheckBoxGroup;
