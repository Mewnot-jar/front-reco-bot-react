import {useState, useEffect} from 'react'
import { Container, Heading, Button, VStack, Input, Textarea, Box, Text, Badge, Flex, useToast } from "@chakra-ui/react"
import { DeleteIcon } from '@chakra-ui/icons'

function App(){

  const [formData, setFormData] = useState({
    asignatura: '',
    nombre: '',
    fecha: '',
    seccion: '',
    descripcion: '',
  })

  const [tareas, setTareas] = useState([])
  const [cargando, setCargando] = useState(false)
  const toast = useToast({
    maxToasts: 1
  })


  const API_URL = "https://reco-bot-py.onrender.com"

  const obtener_tareas = async () => {
    try{
      const response = await fetch(`${API_URL}/recordatorios`)
      const data = await response.json()
      setTareas(data)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(()=>{
    obtener_tareas()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const guardar_tareas = async ()=> {
    if(!formData.asignatura || !formData.nombre || !formData.fecha || !formData.seccion || !formData.descripcion){
      toast.closeAll()
      toast({title: "Faltan Campos", status: "warning", duration: 2000,})
      return
    }

    setCargando(true)
    try{
      const response = await fetch(`${API_URL}/recordatorios`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      if(response.ok){
        toast({title: "Exito, tarea guardada", status:"success", duration: 2000})
        setFormData({asignatura: '', nombre: '', fecha: '', seccion: '', descripcion: '',})
        obtener_tareas()
      }
    }catch(e){
      toast({title: `Error, tarea no guardada. (${e})`, status: "error", duration: 2000})
    }finally{
      setCargando(false)
    }
  }

  const eliminar_tarea = async (id_tarea) => {
    const response = await fetch(`${API_URL}/recordatorios/${id_tarea}`, {
      method: 'DELETE'
    })
    if(response.ok){
      obtener_tareas()
    }
    else{
      console.log(id_tarea + " no se elimino")
    }
  }
  
  return(
    <Container maxW="container.md" py={10}>
      <VStack spacing={6}>
        <Heading as="h1" size="xl" color="blue.500">
          Recordatorios
        </Heading>

        <Box p={6} borderWidth={1} borderRadius="lg" boxShadow="sm">
          <VStack spacing={4}>
            <Heading size="md" alignSelf="flex-start">Ingresar nueva tarea.</Heading>

            <Input placeholder="Asignatura (Ej: Estructura de datos y algoritmos.)" name="asignatura" value={formData.asignatura} onChange={handleChange} variant="filled"/>
            <Input placeholder="Nombre de la tarea (Ej: Proyecto grupal.)" name="nombre" value={formData.nombre} onChange={handleChange} variant="filled"/>

            <Flex w="100%" justify="space-between" gap={2}>
              <Input type="date" name="fecha" value={formData.fecha} onChange={handleChange} variant="filled"/>
              <Input placeholder="Seccion (Ej: Jueves/Martes)" name="seccion" value={formData.seccion} onChange={handleChange} variant="filled"/>
            </Flex>

            <Textarea placeholder="Descripcion del trabajo..." name="descripcion" value={formData.descripcion} onChange={handleChange}/>

            <Button colorScheme="blue" w="100%" size="md" onClick={guardar_tareas} isLoading={cargando}>
              Guardar Tarea
            </Button>

            <Heading size="md" mt={4}>Tareas ingresadas</Heading>

            {tareas.map((tarea, index) => (
              <Box key={index} w="100%" p={5} borderWidth={1} borderRadius="lg" bg="gray.50" _dark={{bg:"gray.700"}}>
                <Text fontWeight="bold">📌 {tarea.asignatura} - {tarea.nombre}</Text>
                <Flex gap={2} mt={2}>
                  <Badge colorScheme="blue">{tarea.seccion}</Badge>
                  <Badge colorScheme="red">{tarea.fecha}</Badge>
                </Flex>
                <Text mt={3} fontSize="md" color="gray.600" _dark={{color: "gray.300"}}>
                  {tarea.descripcion}
                </Text>
                <Flex justify="flex-end" w="100%" mt={4}>
                  <Button colorScheme='red' onClick={()=>eliminar_tarea(tarea.id)}>
                    <DeleteIcon/>
                  </Button>
                </Flex>
              </Box>
            ))}

          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default App