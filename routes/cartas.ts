import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import { verificaToken } from "../middewares/verificaToken"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const cartas = await prisma.carta.findMany({
      include: {
        nacionalidade: true
      }
    })
    res.status(200).json(cartas)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", verificaToken, async (req, res) => {
  const { overall, nome, velocidade, fisico, defesa, chute, passe, drible, anoNascimento, preco, comercio, foto, descricao, raridade, nacionalidadeId } = req.body

  if (!overall || !nome || !velocidade || !fisico || !defesa || !chute || !passe || !drible || !anoNascimento || !preco || !comercio || !raridade || !foto || !descricao || !nacionalidadeId) {
    res.status(400).json({ "erro": "Informe todos os dados" })
    return
  }

  try {
    const carta = await prisma.carta.create({
      data: {
        overall,
        nome,
        velocidade,
        fisico,
        defesa,
        chute,
        passe,
        drible,
        anoNascimento,
        preco,
        comercio,
        foto,
        descricao,
        raridade,
        nacionalidadeId
      }
    });
    res.status(201).json(carta)
  } catch (error) {
    res.status(400).json(error)
  }
})


router.delete("/:id", verificaToken, async (req, res) => {
  const { id } = req.params

  try {
    const carta = await prisma.carta.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(carta)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/destacar/:id", verificaToken, async (req, res) => {
  const { id } = req.params

  try {
    const cartaDestacar = await prisma.carta.findUnique({
      where: { id: Number(id) },
      select: { destaque: true },
    });

    const carta = await prisma.carta.update({
      where: { id: Number(id) },
      data: { destaque: !cartaDestacar?.destaque }
    })
    res.status(200).json(carta)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", verificaToken, async (req, res) => {
  const { id } = req.params;
  const {
    overall, nome, velocidade, fisico, defesa, chute, passe, drible,
    anoNascimento, preco, comercio, foto, descricao, raridade, nacionalidadeId
  } = req.body;


  if (!overall || !nome || !velocidade || !fisico || !defesa || !chute || !passe || !drible ||
    !anoNascimento || !preco || !comercio || !foto || !descricao || !raridade || !nacionalidadeId) {
    return res.status(400).json({ "erro": "Informe todos os dados necessários" });
  }

  try {
    const carta = await prisma.carta.update({
      where: { id: Number(id) },
      data: {
        overall,
        nome,
        velocidade,
        fisico,
        defesa,
        chute,
        passe,
        drible,
        anoNascimento,
        preco,
        comercio,
        foto,
        descricao,
        raridade,
        nacionalidadeId
      }
    });
    res.status(200).json(carta);
  } catch (error) {
    res.status(400).json(error)
  }
});


router.get("/pesquisa/:termo", async (req, res) => {
  const { termo } = req.params

  const termoNumero = Number(termo)

  if (isNaN(termoNumero)) {
    try {
      const cartas = await prisma.carta.findMany({
        include: {
          nacionalidade: true
        },
        where: {
          OR: [
            { nome: { contains: termo } },
            { nacionalidade: { nome: termo } }
          ]
        }
      })
      res.status(200).json(cartas)
    } catch (error) {
      res.status(400).json(error)
    }
  } else {
    try {
      const cartas = await prisma.carta.findMany({
        include: {
          nacionalidade: true
        },
        where: {
          OR: [
            { overall: { gte: termoNumero } },
            { anoNascimento: termoNumero }
          ]
        }
      })
      res.status(200).json(cartas)
    } catch (error) {
      res.status(400).json(error)
    }
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const carta = await prisma.carta.findUnique({
      where: { id: Number(id) },
      include: {
        nacionalidade: true
      }
    })

    if (!carta) {
      return res.status(404).json({ message: "Carta não encontrada" })
    }

    res.status(200).json(carta)
  } catch (error) {
    res.status(400).json(error)
  }
})


export default router