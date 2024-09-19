import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

// const prisma = new PrismaClient()
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})

const router = Router()

router.get("/:cartaId", async (req, res) => {
  const { cartaId } = req.params

  try {
    const fotos = await prisma.foto.findMany({
      where: { cartaId: Number(cartaId) }
    })
    res.status(200).json(fotos)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", upload.single('codigoFoto'), async (req, res) => {
  const { descricao, cartaId } = req.body
  const codigo = req.file?.buffer.toString("base64")

  if (!descricao || !cartaId || !codigo) {
    res.status(400).json({ "erro": "Informe descricao, cartaId e codigoFoto" })
    return
  }

  try {
    const foto = await prisma.foto.create({
      data: {
        descricao, cartaId: Number(cartaId),
        codigoFoto: codigo as string
      }
    })
    res.status(201).json(foto)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const nacionalidade = await prisma.nacionalidade.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(nacionalidade)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome } = req.body

  if (!nome) {
    res.status(400).json({ "erro": "Informe o nome da nacionalidade" })
    return
  }

  try {
    const nacionalidade = await prisma.nacionalidade.update({
      where: { id: Number(id) },
      data: { nome }
    })
    res.status(200).json(nacionalidade)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router