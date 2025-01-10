-- CreateTable
CREATE TABLE "ControleTecido" (
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

    CONSTRAINT "ControleTecido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ControleTecido_codigo_key" ON "ControleTecido"("codigo");
