/*
  Warnings:

  - You are about to drop the `controle_tecido` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "controle_tecido";

-- CreateTable
CREATE TABLE "controleTecido" (
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

    CONSTRAINT "controleTecido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "controleTecido_codigo_key" ON "controleTecido"("codigo");
