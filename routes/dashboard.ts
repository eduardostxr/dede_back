import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/gerais", async (req, res) => {
  try {
    const clientes = await prisma.cliente.count()
    const cartas = await prisma.carta.count()
    const propostas = await prisma.proposta.count()
    res.status(200).json({ clientes, cartas, propostas })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/cartasNacionalidade", async (req, res) => {
  try {
    const cartas = await prisma.carta.groupBy({
      by: ['nacionalidadeId'],
      _count: {
        id: true, 
      }
    })

    // Para cada carta, inclui o nome da Nacionalidade relacionada ao NacionalidadeId
    const cartasNacionalidade = await Promise.all(
      cartas.map(async (carta) => {
        const nacionalidade = await prisma.nacionalidade.findUnique({
          where: { id: carta.nacionalidadeId }
        })
        return {
          nacionalidade: nacionalidade?.nome, 
          num: carta._count.id
        }
      })
    )
    console.log(cartasNacionalidade)
    res.status(200).json(cartasNacionalidade)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
