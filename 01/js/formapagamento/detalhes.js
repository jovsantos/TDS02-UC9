const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function buscarDetalhes() {
    try {
        const response = await fetch(`${API_BASE_URL}/FormaPagamento/${id}`);
        if (!response.ok) throw new Error('Erro ao carregar forma de pagamento');
        const forma = await response.json();

        const dataCadastro = new Date(forma.dataCadastro).toLocaleDateString('pt-BR');
        const dataAtualizacao = forma.dataAtualizacao ? new Date(forma.dataAtualizacao).toLocaleDateString('pt-BR') : 'N/A';

        document.getElementById('dados-forma').innerHTML = `
            <p><strong>ID:</strong> ${forma.id}</p>
            <p><strong>Descrição:</strong> ${forma.descricao}</p>
            <p><strong>Data de Cadastro:</strong> ${dataCadastro}</p>
            <p><strong>Data de Atualização:</strong> ${dataAtualizacao}</p>
        `;
    } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        document.getElementById('dados-forma').innerHTML = `<p style="color: red;">Erro ao carregar detalhes da forma de pagamento.</p>`;
    }
}
  
buscarDetalhes();