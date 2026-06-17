async function listarFormasPagamento() {
    try {
        const response = await fetch(`${API_BASE_URL}/FormasPagamento`);
        if (!response.ok) throw new Error('Erro ao listar formas de pagamento');
        const formasPagamento = await response.json();
        
        const tbody = document.getElementById('tabela-formas-pagamento');
        tbody.innerHTML = '';

        //Recupera o perfil do usuário logado
        //localStorage é para manter o perfil mesmo após fechar o navegador, sessionStorage é para manter apenas durante a sessão atual
        //sessionStorage é mais seguro para informações sensíveis, mas para este caso de perfil de usuário, localStorage pode ser suficiente dependendo do contexto da aplicação
        const perfilUsuario = localStorage.getItem('perfil') || sessionStorage.getItem('perfil');

        
        const thAcoes = document.getElementById('th-acoes'); 
        if (thAcoes) {
            if (perfilUsuario === 'Gerente') {
                thAcoes.style.display = ''; // se for gerente, mostra a coluna de ações
            } else {
                thAcoes.style.display = 'none'; // se não for gerente, oculta a coluna de ações
            }
        }

        formasPagamento.forEach(forma => {
            const tr = document.createElement('tr');
        
            let colunasHTML = `
                <td>${forma.id}</td>
                <td>${forma.descricao}</td>
            `;

            
            if (perfilUsuario === 'Gerente') {
                colunasHTML += ` 
                    <td class="actions">
                        <a href="form.html?id=${forma.id}">Editar</a>
                        <a href="excluir.html?id=${forma.id}" style="color: var(--danger-color);">Excluir</a>
                        <a href="detalhes.html?id=${forma.id}">Detalhes</a>
                    </td>
                `;
            } else if (thAcoes) {
                thAcoes.style.display = 'none'; // Oculta a coluna de ações para usuários que não são gerentes
            } else {
                
                colunasHTML += `<td class="actions" style="display: none;"></td>`; // Adiciona uma célula vazia para manter a estrutura da tabela, mas oculta para usuários sem permissão
            }

            tr.innerHTML = colunasHTML;
            tbody.appendChild(tr); // Adiciona a linha à tabela
        });
    } catch (error) {
        console.error('Erro ao listar formas de pagamento:', error);
        document.getElementById('tabela-formas-pagamento').innerHTML = '<tr><td colspan="3" style="color: red;">Erro ao carregar formas de pagamento.</td></tr>';
    }
}

listarFormasPagamento();