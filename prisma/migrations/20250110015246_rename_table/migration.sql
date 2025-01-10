/*
  Warnings:

  - You are about to drop the `ControleTecido` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ControleTecido";

-- CreateTable
CREATE TABLE "controle_tecido" (
    "id" SERIAL NOT NULL,
    "codigo" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "pesoTecido" DOUBLE PRECISION NOT NULL,
    "tecido" TEXT NOT NULL,
    "metragem" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,
    "pesoRisco" DOUBLE PRECISION NOT NULL,
    "tamanhos" JSONB NOT NULL,
    "camadas" INTEGER NOT NULL,
    "qtdCorte" INTEGER NOT NULL,
    "concluido" BOOLEAN NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "controle_tecido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "controle_tecido_codigo_key" ON "controle_tecido"("codigo");
