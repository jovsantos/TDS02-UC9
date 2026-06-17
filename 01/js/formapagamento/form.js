const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const form = document.getElementById('form-formapagamento');

// 1. Captura o token e o perfil guardados no navegador
const token = localStorage.getItem('token') || sessionStorage.getItem('token');
const perfilUsuario = localStorage.getItem('perfil') || sessionStorage.getItem('perfil');

// Executa assim que a página carrega
window.onload = function() {
    
    if (perfilUsuario !== 'Gerente') {
        alert('Acesso negado. Tela restrita para gerentes.');
        window.location.href = 'list.html';
        return;
    }
    
    carregarFormaPagamento();
};

async function carregarFormaPagamento() {
    // Se existir ID na URL, muda o título e busca os dados atuais (Modo Edição)
    if (id) {
        document.getElementById('titulo-pagina').innerText = "Editar Forma de Pagamento";
        try {
            const response = await fetch(`${API_BASE_URL}/FormaPagamento/${id}`);
            if (!response.ok) throw new Error('Erro ao carregar forma de pagamento');
            
            const forma = await response.json();
            document.getElementById('descricao').value = forma.descricao;

        } catch (error) {
            console.error("Erro ao carregar forma de pagamento:", error);
            alert('Erro ao carregar os dados da forma de pagamento');
        }
    } else {
        // Se NÃO existir ID na URL
        document.getElementById('titulo-pagina').innerText = "Cadastrar Forma de Pagamento";
    }
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const descricao = document.getElementById('descricao').value.trim();

    if (!descricao) {
        alert('Por favor, preencha a descrição');
        return;
    }

    
    const formaData = { descricao };
    if (id) {
        formaData.id = parseInt(id);
    }

    // Define dinamicamente o método e a URL com base na existência do ID
    let urlEnvio = id ? `${API_BASE_URL}/FormaPagamento/${id}` : `${API_BASE_URL}/FormaPagamento`;
    let metodoHTTP = id ? 'PUT' : 'POST';

    try {
        const response = await fetch(urlEnvio, {
            method: metodoHTTP,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formaData)
        }); 

        if (response.status === 401 || response.status === 403) {
            throw new Error('Não autorizado. Seu token expirou ou você não é um Gerente.');
        }

        if (!response.ok) throw new Error(`Erro ao ${id ? 'atualizar' : 'cadastrar'} forma de pagamento`);

        alert(`Forma de pagamento ${id ? 'atualizada' : 'cadastrada'} com sucesso!`);
        window.location.href = 'list.html'; // Altere para o nome exato da sua página de listagem
        
    } catch (error) {
        console.error(`Erro ao salvar:`, error);
        alert(error.message);
    } 
});

carregarFormaPagamento();