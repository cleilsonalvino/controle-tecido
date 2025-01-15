document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    let statusConcluido = 'nao';
    const checkboxSim = document.querySelector('input[name="concluido"][value="sim"]');
    const checkboxNao = document.querySelector('input[name="concluido"][value="nao"]');

    if (checkboxSim && checkboxSim.checked) {
        statusConcluido = 'sim';
    } else if (checkboxNao && checkboxNao.checked) {
        statusConcluido = 'nao';
    }

    const formData = {
        codigo: parseInt(document.querySelector('#codigo').value),
        descricao: document.querySelector('#descricao').value,
        pesoTecido: parseFloat(document.querySelector('#pesoTecido').value),
        tecido: document.querySelector('#tecido').value,
        metragem: parseFloat(document.querySelector('#metragem').value),
        tipo: document.querySelector('#tipo').value,
        pesoRisco: parseFloat(document.querySelector('#pesoRisco').value),
        tamanhos: {
            pp: parseInt(document.querySelector('#t_pp').value),
            p: parseInt(document.querySelector('#t_p').value),
            m: parseInt(document.querySelector('#t_m').value),
            g: parseInt(document.querySelector('#t_g').value),
            gg: parseInt(document.querySelector('#t_gg').value),
            xgg: parseInt(document.querySelector('#t_xgg').value),
        },
        camadas: parseInt(document.querySelector('#camadas').value),
        qtdCorte: parseInt(document.querySelector('#qtdCorte').value),
        concluido: statusConcluido
    };

    try {
        const response = await fetch('/salvar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Dados enviados com sucesso!");
        } else {
            console.error("Erro ao enviar os dados");
            alert("Ocorreu um erro ao enviar os dados.");
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
    }
});




document.getElementById('btnTrazer').addEventListener('click', async () => {
    const codigo = document.getElementById('codigo').value;
    if (codigo === "") {
        alert("Por favor, insira um código antes de buscar.");
        return;
    }

    try {
        const response = await fetch(`/codigo/${codigo}`);  // Ajuste a rota para a API do seu backend
        if (!response.ok) {
            alert("Erro ao buscar os dados.");
            return;
        }
        
        const data = await response.json();

        if (data) {
            document.getElementById('descricao').value = data.descricao || '';
            document.getElementById('pesoTecido').value = data.pesoTecido || '';
            document.getElementById('tecido').value = data.tecido || '';
            document.getElementById('metragem').value = data.metragem || '';
            document.getElementById('tipo').value = data.tipo || '';
            document.getElementById('pesoRisco').value = data.pesoRisco || '';

            document.getElementById('t_pp').value = data.tamanhos.PP || '';
            document.getElementById('t_p').value = data.tamanhos.P || '';
            document.getElementById('t_m').value = data.tamanhos.M || '';
            document.getElementById('t_g').value = data.tamanhos.G || '';
            document.getElementById('t_gg').value = data.tamanhos.GG || '';
            document.getElementById('t_xgg').value = data.tamanhos.XGG || '';

            document.getElementById('camadas').value = data.camadas || '';
            document.getElementById('qtdCorte').value = data.qtdCorte || '';

            // Manipulação dos checkbox
            const checkboxSim = document.querySelector('input[name="concluido"][value="sim"]');
            const checkboxNao = document.querySelector('input[name="concluido"][value="nao"]');
            
            if (data.concluido === 'sim') {
                checkboxSim.checked = true;
                createStatusSpan('Concluído: Sim');
            } else if (data.concluido === 'nao') {
                checkboxNao.checked = true;
                createStatusSpan('Concluído: Não');
            } else {
                checkboxSim.checked = false;
                checkboxNao.checked = false;
                document.getElementById('statusSpan').textContent = '';
            }
        } else {
            alert("Código não encontrado no banco de dados.");
        }
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        alert("Ocorreu um erro ao buscar os dados.");
    }
});

function createStatusSpan(status) {
    let statusSpan = document.getElementById('statusSpan');
    if (!statusSpan) {
        statusSpan = document.createElement('span');
        statusSpan.id = 'statusSpan';
        document.body.appendChild(statusSpan);  // Adiciona o span ao body
    }
    statusSpan.textContent = status;
}

