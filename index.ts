import express from 'express'
import cors from 'cors'

import nacionalidadesRoutes from './routes/nacionalidades'
import cartasRoutes from './routes/cartas'
import fotosRoutes from './routes/fotos'
import clientesRoutes from './routes/clientes'
import propostasRoutes from './routes/propostas'
import adminsRoutes from './routes/admins'
import dashboardRoutes from './routes/dashboard'

const app = express()
const port = 3004

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/nacionalidades", nacionalidadesRoutes)
app.use("/cartas", cartasRoutes)
app.use("/fotos", fotosRoutes)
app.use("/clientes", clientesRoutes)
app.use("/propostas", propostasRoutes)
app.use("/admins", adminsRoutes)
app.use("/dashboard", dashboardRoutes)

app.get('/', (req, res) => {
  res.send('API: Sistema de controle de Cartas')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})