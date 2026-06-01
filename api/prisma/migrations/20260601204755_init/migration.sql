-- CreateEnum
CREATE TYPE "StatusAgendamento" AS ENUM ('agendado', 'em_andamento', 'finalizado', 'cancelado');

-- CreateTable
CREATE TABLE "cliente" (
    "cpf" VARCHAR(11) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(15) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "administrador" (
    "cpf" VARCHAR(11) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(15) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "administrador_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "pet" (
    "id" SERIAL NOT NULL,
    "cliente_cpf" VARCHAR(11) NOT NULL,
    "nomePet" VARCHAR(50) NOT NULL,
    "especie" VARCHAR(30) NOT NULL,
    "raca" VARCHAR(50) NOT NULL,
    "idade" INTEGER NOT NULL,
    "observacoes" TEXT,

    CONSTRAINT "pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servico" (
    "id" SERIAL NOT NULL,
    "admin_cpf" VARCHAR(11) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT,
    "preco" DECIMAL(10,2) NOT NULL,
    "duracao" INTEGER NOT NULL,

    CONSTRAINT "servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agendamento" (
    "id" SERIAL NOT NULL,
    "cliente_cpf" VARCHAR(11) NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "admin_cpf" VARCHAR(11),
    "data_hora" TIMESTAMP(3) NOT NULL,
    "status" "StatusAgendamento" NOT NULL DEFAULT 'agendado',
    "observacao" TEXT,

    CONSTRAINT "agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agendamento_servico" (
    "agendamento_id" INTEGER NOT NULL,
    "servico_id" INTEGER NOT NULL,

    CONSTRAINT "agendamento_servico_pkey" PRIMARY KEY ("agendamento_id","servico_id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "agendamento_id" INTEGER NOT NULL,
    "cliente_cpf" VARCHAR(11) NOT NULL,
    "admin_cpf" VARCHAR(11),
    "nota" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resposta" TEXT,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_email_key" ON "cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "administrador_email_key" ON "administrador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "feedback_agendamento_id_key" ON "feedback"("agendamento_id");

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_cliente_cpf_fkey" FOREIGN KEY ("cliente_cpf") REFERENCES "cliente"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servico" ADD CONSTRAINT "servico_admin_cpf_fkey" FOREIGN KEY ("admin_cpf") REFERENCES "administrador"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_cliente_cpf_fkey" FOREIGN KEY ("cliente_cpf") REFERENCES "cliente"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_admin_cpf_fkey" FOREIGN KEY ("admin_cpf") REFERENCES "administrador"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamento_servico" ADD CONSTRAINT "agendamento_servico_agendamento_id_fkey" FOREIGN KEY ("agendamento_id") REFERENCES "agendamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamento_servico" ADD CONSTRAINT "agendamento_servico_servico_id_fkey" FOREIGN KEY ("servico_id") REFERENCES "servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_agendamento_id_fkey" FOREIGN KEY ("agendamento_id") REFERENCES "agendamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_cliente_cpf_fkey" FOREIGN KEY ("cliente_cpf") REFERENCES "cliente"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_admin_cpf_fkey" FOREIGN KEY ("admin_cpf") REFERENCES "administrador"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;
