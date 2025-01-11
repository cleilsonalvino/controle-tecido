const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Salvar dados no banco
const salvarDados = async (req, res) => {
    try {
        const {
            codigo, descricao, pesoTecido, tecido, metragem, tipo, pesoRisco,
            tamanhos, camadas, qtdCorte, concluido
        } = req.body;

        // Atualizar o peso do tecido
        const novoPesoTecido = pesoTecido - pesoRisco;

        const resultado = await prisma.controle_tecido.create({
            data: {
                codigo,
                descricao,
                pesoTecido: novoPesoTecido,
                tecido,
                metragem,
                tipo,
                pesoRisco,
                tamanhos,
                camadas,
                qtdCorte,
                concluido
            }
        });

        res.status(201).json({ message: 'Dados salvos com sucesso!', resultado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao salvar os dados.' });
    }
};


module.exports = { salvarDados, buscarDados };
