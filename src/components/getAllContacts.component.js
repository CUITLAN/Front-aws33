import { Box } from "@mui/material";
import * as React from 'react';
import { useState, useEffect } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { List } from "@mui/material";
import Typography from '@mui/material/Typography';

export default function GetAllContact() {
    const [contacts, setContacts] = useState([]); 
    
    const handleSearch = () => {
        fetch(`http://localhost:3001/contactos/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Asegúrate de que 'data.contactos' existe y es un array
                setContacts(data.contactos || []); // Si no existe, asigna un array vacío
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching contacts:', error);
            });
    };

    useEffect(() => {
        handleSearch(); 
    }, []); 

    return (
        <div>
            <h3>Agenda</h3>
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
                <List>
                    {contacts.length > 0 ? (
                        contacts.map((contact) => (
                            <ListItem alignItems="flex-start" key={contact.contact_id}>
                                <ListItemAvatar>
                                    <Avatar alt={contact.Contact_Name} src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={contact.Contact_Name}
                                    secondary={
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{ color: 'text.primary', display: 'inline' }}
                                        >
                                            {contact.Phone_Number}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body2">No se encontraron</Typography>
                    )}
                </List>
            </Box>
        </div>
    );
}
