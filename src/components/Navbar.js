import {AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position='static' color='transparent'>
        <Container>
          <Toolbar>
            <Typography variant='h5' sx={{flexGrow: 1}}>
              <Link to={'/'} style={{textDecoration:'none', color:'#1976D2'}}>
                Home
              </Link>
            </Typography>

            <Button variant='contained' color='primary' onClick={() => navigate('/tasks/new')}>
              New Task
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
