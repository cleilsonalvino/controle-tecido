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
        //const novoPesoTecido = pesoTecido - pesoRisco;

        const resultado = await prisma.controleTecido.create({
            data: {
                codigo,
                descricao,
                pesoTecido,
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

// Buscar dados no banco pelo código
const buscarDados = async (req, res) => {
    try {
        const { codigo } = req.params;  // Captura o código da URL

        console.log('Código recebido:', codigo);  // Adiciona um console.log para verificar o valor da URL

        if (!codigo) {
            return res.status(400).send('Código não fornecido');
        }

        const codigoInt = parseInt(codigo);

        if (isNaN(codigoInt)) {
            return res.status(400).send('Código inválido');
        }

        const tecido = await prisma.controleTecido.findUnique({
            where: {
                codigo: codigoInt
            }
        });

        if (tecido) {
            return res.json(tecido);  // Retorna o tecido encontrado diretamente
        } else {
            return res.status(404).send('Tecido não encontrado');  // Retorna 404 se o tecido não for encontrado
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao buscar os dados');
    }
};



module.exports = { salvarDados, buscarDados };
