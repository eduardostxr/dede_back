-- CreateEnum
CREATE TYPE "Raridade" AS ENUM ('BRONZE', 'PRATA', 'OURO', 'LENDA');

-- CreateTable
CREATE TABLE "clientes" (
    "id" VARCHAR(36) NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nacionalidades" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,

    CONSTRAINT "nacionalidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cartas" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "velocidade" SMALLINT NOT NULL,
    "fisico" SMALLINT NOT NULL,
    "defesa" SMALLINT NOT NULL,
    "chute" SMALLINT NOT NULL,
    "passe" SMALLINT NOT NULL,
    "drible" SMALLINT NOT NULL,
    "overall" SMALLINT NOT NULL,
    "anoNascimento" SMALLINT NOT NULL,
    "destaque" BOOLEAN NOT NULL DEFAULT true,
    "preco" DECIMAL(10,2) NOT NULL,
    "comercio" BOOLEAN NOT NULL DEFAULT true,
    "foto" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "raridade" "Raridade" NOT NULL,
    "nacionalidadeId" INTEGER NOT NULL,
    "clienteId" TEXT,
    "adminId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "cartas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(30) NOT NULL,
    "codigoFoto" TEXT NOT NULL,
    "cartaId" INTEGER NOT NULL,

    CONSTRAINT "fotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propostas" (
    "id" SERIAL NOT NULL,
    "clienteId" VARCHAR(36) NOT NULL,
    "cartaId" INTEGER NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "resposta" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "propostas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- AddForeignKey
ALTER TABLE "cartas" ADD CONSTRAINT "cartas_nacionalidadeId_fkey" FOREIGN KEY ("nacionalidadeId") REFERENCES "nacionalidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartas" ADD CONSTRAINT "cartas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartas" ADD CONSTRAINT "cartas_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotos" ADD CONSTRAINT "fotos_cartaId_fkey" FOREIGN KEY ("cartaId") REFERENCES "cartas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propostas" ADD CONSTRAINT "propostas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propostas" ADD CONSTRAINT "propostas_cartaId_fkey" FOREIGN KEY ("cartaId") REFERENCES "cartas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
