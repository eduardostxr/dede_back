import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import nodemailer from "nodemailer";
import { verificaToken } from "../middewares/verificaToken";


const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const propostas = await prisma.proposta.findMany({
      include: {
        cliente: true,
        carta: true
      }
    })
    res.status(200).json(propostas)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", verificaToken, async (req, res) => {
  const { id } = req.params;

  try {
    const proposta = await prisma.proposta.findUnique({
      where: { id: Number(id) },
    });

    if (!proposta) {
      return res.status(404).json({ erro: "Proposta não encontrada." });
    }

    await prisma.proposta.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ mensagem: "Proposta deletada com sucesso." });
  } catch (error) {
    res.status(400).json(error);
  }
});



router.post("/", async (req, res) => {
  const { clienteId, cartaId, descricao } = req.body

  if (!clienteId || !cartaId || !descricao) {
    res.status(400).json({ erro: "Informe clienteId, cartaId e descricao" })
    return
  }


  try {
    const proposta = await prisma.proposta.create({
      data: { clienteId, cartaId, descricao }
    })
    res.status(201).json(proposta)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { descricao, resposta } = req.body;
  if (descricao === undefined && resposta === undefined) {
    return res.status(400).json({ erro: "Informe pelo menos um campo para atualizar." });
  }

  try {
    const proposta = await prisma.proposta.update({
      where: { id: Number(id) },
      data: {
        ...(descricao !== undefined && { descricao }),
        ...(resposta !== undefined && { resposta })
      },
    });

    res.status(200).json(proposta);
  } catch (error) {
    res.status(400).json(error);
  }
});

async function enviaEmail(nome: string, email: string, descricao: string, resposta: string, res: any) {

  const transporter = nodemailer.createTransport({
    // port: 465,
    port: 587,
    host: "smtp-relay.brevo.com",
    auth: {
      user: "7dda03001@smtp-brevo.com",
      pass: "qsOSGdVazFnHAL69",
    },
    secure: true,
  });

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const mailData = {
    from: {
      name: `${nome}`,
      address: "myEmail@gmail.com",
    },
    replyTo: email,
    to: "recipient@gmail.com",
    subject: `form message`,
    text: email,
    html: `<h3>Estimado Cliente: ${nome}</3>
           <h3>Proposta: ${descricao}</3>
           <h3>Resposta da Game Legends: ${resposta}</3>
           <p>Muito obrigado pelo seu contato</p>
           <p>Game Legends</p>`
};

await new Promise((resolve, reject) => {
  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      console.log(info);
      resolve(info);
    }
  });
});

res.status(200).json({ status: "OK" });
};
// async function enviaEmail(nome: string, email: string, descricao: string, resposta: string) {

//   const transporter = nodemailer.createTransport({
//     host: "smtp-relay.brevo.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "7dda03001@smtp-brevo.com",
//       pass: "qsOSGdVazFnHAL69",
//     },
//   });

//   const info = await transporter.sendMail({
//     from: 'frrmateu@gmail.com',
//     to: email, 
//     subject: "Proposta Game Legends",
//     text: resposta,
//     html: `<h3>Estimado Cliente: ${nome}</3>
//            <h3>Proposta: ${descricao}</3>
//            <h3>Resposta da Game Legends: ${resposta}</3>
//            <p>Muito obrigado pelo seu contato</p>
//            <p>Game Legends</p>`

//   });

//   console.log("Message sent: %s", info.messageId);
// }

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { resposta } = req.body;


  if (!resposta) {
    res.status(400).json({ "erro": "Informe a resposta desta proposta" });
    return
  }

  try {
    const proposta = await prisma.proposta.update({
      where: { id: Number(id) },
      data: { resposta }

    })

    const dados = await prisma.proposta.findUnique({
      where: { id: Number(id) },
      include: {
        cliente: true
      }
    })

    enviaEmail(dados?.cliente.nome as string,
      dados?.cliente.email as string,
      dados?.descricao as string,
      resposta,
      res)

    res.status(200).json(proposta);
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/:clienteId", async (req, res) => {
  const { clienteId } = req.params
  try {
    const propostas = await prisma.proposta.findMany({
      where: { clienteId },
      include: {
        carta: true
      }
    })
    res.status(200).json(propostas)
  } catch (error) {
    res.status(400).json(error)
  }
})


export default router