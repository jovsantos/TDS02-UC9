const urlParams = new URLSearchParams(window.location.search); // Captura os parâmetros da URL
const id = urlParams.get('id'); // Extrai o ID da forma de pagamento a ser excluída

async function buscarDetalhes() {
    try {
        const response = await fetch(`${API_BASE_URL}/FormaPagamento/${id}`);
        if (!response.ok) throw new Error('Erro ao carregar forma de pagamento');
        const forma = await response.json();

        document.getElementById('dados-forma').innerHTML = `
            <h3>${forma.descricao}</h3>
            <p><strong>ID:</strong> ${forma.id}</p>
        `;
    } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        document.getElementById('dados-forma').innerHTML = `<p style="color: red;">Erro ao carregar detalhes da forma de pagamento.</p>`;
    }
}
  

document.getElementById('btn-excluir').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/FormaPagamento/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Erro ao excluir forma de pagamento');

        window.location.href = 'list.html'; // Redireciona para a lista após exclusão

    } catch (error) {
        console.error("Erro ao excluir forma de pagamento:", error);
        document.getElementById('mensagem').innerHTML = `<p style="color: red;">Erro ao excluir forma de pagamento.</p>`;
    }
});
  
buscarDetalhes();