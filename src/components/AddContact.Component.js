import { FormControl, InputLabel, Input, TextField, Box, Button } from '@mui/material';
import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function AddContact() {
 
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  async function handleSend() {
    console.log(contactName, phoneNumber); 

    try {
      const response = await fetch('http://localhost:3001/contactos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Contact_Name: contactName,
          Phone_Number: phoneNumber,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.code === 200) {
        console.log('Todo jala');
      }
    } catch (err) {
      console.log('Llamen a dios', err);
    }
  }

  return (
    <div>
      <Box
        component="section"
        sx={{
          p: 2,
          border: '1px dashed grey',
          maxWidth: '400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <FormControl variant="standard" sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="input-with-icon-adornment">Ingrese el nombre del contacto</InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={contactName} 
            onChange={(e) => setContactName(e.target.value)} 
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>

        <TextField
          variant="standard"
          id="Phone_Number"
          label="Numero telefonico"
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          sx={{ marginBottom: 3 }}
        />

        <Button id="BotonEnviar" variant="outlined" onClick={handleSend}>
          Agregar
        </Button>
      </Box>
    </div>
  );
}
