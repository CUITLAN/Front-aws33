import React from 'react'
import AddContact from './components/AddContact.Component'
import { Container, Box } from '@mui/material'
import Search from './components/SearchContact.Component'

const App = () => {
  return (
    <Container fixed maxWidth="sm">
      <h2>Bienvenido</h2>

      <Box display="flex" alignItems="center">
        <AddContact />
        <Box flexGrow={1} ml={2}>
          <Search />
        </Box>
      </Box>
    </Container>
  )
}

export default App
