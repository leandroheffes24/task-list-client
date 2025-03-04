import {useEffect, useState} from 'react'
import {Button, Card, CardContent, CircularProgress, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
const apiUrl = process.env.REACT_APP_API_URL;
console.log('API URL:', process.env.REACT_APP_API_URL);

export default function TaskList() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const loadTasks = async () => {
    setLoading(true)
    const response = await fetch(`${apiUrl}/tasks`)
    const data = await response.json()
    setTasks(data)
    setLoading(false)
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`${apiUrl}/tasks/${id}`, {
        method: 'DELETE'
      })
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <>
      <h1>Task List</h1>
      {loading ? <CircularProgress color='inherit' size={35}/> : ''}
      {
        tasks.map((task) => (
          <Card style={{marginBottom:'.7rem'}} key={task.id}>
            <CardContent style={{display:'flex', justifyContent:'space-between'}}>
              <div>
                <Typography>{task.title}</Typography>
                <Typography>{task.description}</Typography>
              </div>

              <div>
                <Button
                  variant='contained'
                  color='inherit'
                  onClick={() => navigate(`/tasks/${task.id}/edit`)}
                >
                  Edit
                </Button>

                <Button
                  variant='contained'
                  color='warning'
                  onClick={() => handleDelete(task.id)}
                  style={{marginLeft:'.5rem'}}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      }
    </>
  )
}
