import React from 'react';
import { CheckboxGroup, Checkbox, FormControl, Box } from '@primer/react'

const CheckBoxGroup = ({values, setItems}) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', p: 2, }}>
            <CheckboxGroup onChange={setItems}>
                <CheckboxGroup.Label>Choose Styles</CheckboxGroup.Label>
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
