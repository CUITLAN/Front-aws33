import { useState } from "react";
import { TextField, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import { Avatar } from "@mui/material";

export default function Search() {
    const [contactName, setContactName] = useState("");
    const [contacts, setContacts] = useState([]); 

    const handleSearch = () => {
        fetch(`http://localhost:3001/contactos/search/${contactName}`)
            .then((response) => response.json())
            .then((data) => {
                
                setContacts(data.contactos); 
            })
            .catch((error) => {
                console.error("Error fetching contacts:", error);
            });
    };

    return (
        <div>
            <Box
                component="section"
                sx={{
                    p: 3,
                    border: '1px dashed grey',
                    maxWidth: '400px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                <h2>Buscar Contacto</h2>
                <TextField
                    id="standard-search"
                    label="Ingrese Nombre de contacto"
                    type="search"
                    variant="standard"
                    sx={{ marginBottom: 3 }}
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)} 
                />
                <Button variant="outlined" onClick={handleSearch}>
                    Buscar
                </Button>
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
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{ color: 'text.primary', display: 'inline' }}
                                            >
                                                {contact.Phone_Number}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        ))
                    ) : (
                        <Typography>...</Typography>
                    )}
                </List>
            </Box>
        </div>
    );
}
