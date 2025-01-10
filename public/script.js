document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();

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
      concluido: document.querySelector('#sim').checked,
  };

  try {
      const response = await fetch('/salvar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
          alert(result.message);
          // Caso o fetch seja bem-sucedido, você pode utilizar result para preencher o formulário novamente
          if (result.dados) {
              document.querySelector('#descricao').value = result.dados.descricao;
              document.querySelector('#pesoTecido').value = result.dados.pesoTecido;
              document.querySelector('#tecido').value = result.dados.tecido;
              document.querySelector('#metragem').value = result.dados.metragem;
              document.querySelector('#tipo').value = result.dados.tipo;
              document.querySelector('#pesoRisco').value = result.dados.pesoRisco;
              document.querySelector('#t_pp').value = result.dados.tamanhos.pp;
              document.querySelector('#t_p').value = result.dados.tamanhos.p;
              document.querySelector('#t_m').value = result.dados.tamanhos.m;
              document.querySelector('#t_g').value = result.dados.tamanhos.g;
              document.querySelector('#t_gg').value = result.dados.tamanhos.gg;
              document.querySelector('#t_xgg').value = result.dados.tamanhos.xgg;
              document.querySelector('#camadas').value = result.dados.camadas;
              document.querySelector('#qtdCorte').value = result.dados.qtdCorte;
              document.querySelector('#sim').checked = result.dados.concluido === true; // Para radio buttons
          }
      } else {
          console.error(result.message);
          alert(result.message); // Exibir um alert informando que não foi possível trazer os dados
      }
  } catch (error) {
      console.error('Erro ao enviar os dados:', error);
  }
});


document.getElementById('btnTrazer').addEventListener('click', async () => {
  const codigo = parseInt(document.querySelector('#codigo').value);
  if (codigo) {
      try {
          const response = await fetch(`/codigo?codigo=${codigo}`);
  
          if (response.ok) {
              const dados = await response.json();
              // Populando os campos com os dados encontrados
              document.getElementById('descricao').value = dados.descricao;
              document.getElementById('pesoTecido').value = dados.pesoTecido;
              document.getElementById('tecido').value = dados.tecido;
              document.getElementById('metragem').value = dados.metragem;
              document.getElementById('tipo').value = dados.tipo;
              document.getElementById('pesoRisco').value = dados.pesoRisco;
              document.getElementById('t_pp').value = dados.t_pp;
              document.getElementById('t_p').value = dados.t_p;
              document.getElementById('t_m').value = dados.t_m;
              document.getElementById('t_g').value = dados.t_g;
              document.getElementById('t_gg').value = dados.t_gg;
              document.getElementById('t_xgg').value = dados.t_xgg;
              document.getElementById('camadas').value = dados.camadas;
              document.getElementById('qtdCorte').value = dados.qtdCorte;
              document.querySelector(`input[name="concluido"][value="${dados.concluido}"]`).checked = true;
          } else {
              alert('Dados não encontrados.');
          }
      } catch (error) {
          console.error(error);
          alert('Erro ao buscar os dados.');
      }
  } else {
      alert('Por favor, insira o código.');
  }
});