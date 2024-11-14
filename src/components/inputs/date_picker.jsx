/* eslint-disable no-unused-vars */
import React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const InputDinamico = ({ config, value, onChange }) => {
  const { type, name, label, options, placeholder, iconStart, iconNameStart, iconEnd, iconNameEnd, help, msjHelp } = config;

  const handleDateChange = (newDate) => {
    onChange({ target: { name, value: newDate } });
  };

  return (
    <div className="input-dinamico">
        <div>
            <div className='club_input'>
                {label && <label className='club_input_label' htmlFor={name}>{label}</label>}
                    <div className='club_input_contenedor'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker
                            label={label}
                            value={value ? dayjs(value) : null} // Asegura que sea una instancia de dayjs
                            onChange={handleDateChange}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      {iconEnd && <div>{iconNameEnd}</div>}
                    </div>
            </div>
        </div>      
    </div>
  );
};

export default InputDinamico;
