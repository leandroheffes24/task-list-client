import { Button, Card, CardContent, CircularProgress, Grid2, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
const apiUrl = process.env.REACT_APP_API_URL;

export default function TaskForm() {
  const [task, setTask] = useState({title: '', description: ''})
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if(editing){
      await fetch(`${apiUrl}/tasks/${params.id}`, {
        method: 'PUT',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(task)
      })
    } else {
      await fetch(`${apiUrl}/tasks`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {"Content-type": "application/json"}
      })
    }

    setLoading(false)
    navigate('/')
  }

  const handleChange = e => setTask({...task, [e.target.name]: e.target.value})

  const loadTask = async (id) => {
    const res = await fetch(`${apiUrl}/tasks/${id}`)
    const data = await res.json()
    setTask({title: data.title, description: data.description})
    setEditing(true)
  }

  useEffect(() => {
    if(params.id){
      loadTask(params.id)
    }
  }, [params.id])

  return (
    <Grid2 container direction={'column'} alignItems={'center'} justifyContent={'center'}>
      <Grid2 item sx={3}>
        <Card sx={{mt: 5}} style={{padding:'1rem'}}>
          <Typography variant='5' textAlign={'center'}>
            {editing ? 'Edit Task' : 'Create Task'}
          </Typography>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant='filled'
                label='Write your title'
                sx={{display: 'block', margin:'.5rem 0'}}
                name='title'
                value={task.title}
                onChange={handleChange}
              />

              <TextField
                variant='filled'
                label='Write your description'
                multiline rows={4}
                sx={{display: 'block', margin:'.5rem 0'}}
                name='description'
                value={task.description}
                onChange={handleChange}
              />
              <Button variant='contained' color='primary' type='submit' disabled={!task.title || !task.description}>
                {loading ? <CircularProgress color='inherit' size={24}/> : 'Save'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  )
}