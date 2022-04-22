async function getID() {

    const params = new URLSearchParams(window.location.search)
    key = params.get('key')
    const cpf = prompt("Insira o CPF ou CNPJ ");
    res = await fetch(`https://bling.servidorjulia.workers.dev/Api/v2/contato/${cpf}/json?apikey=${key}`);
    json1 = await res.json();

    const id = json1.retorno.contatos[0].contato.id;

    console.log(id);

    resp = await fetch(`https://bling.servidorjulia.workers.dev/Api/v2/pedidos/json?filters=idContato[${id}]&apikey=${key}`);
    json = await resp.json();

    pedidos = json.retorno.pedidos;

    var d1 = document.getElementById('tabela_tail');

    for (p of pedidos) {
        itens = p.pedido.itens;
        for(i of itens){

            const num = p.pedido.numero;
            const item = i.item.descricao;
            const qtd = i.item.quantidade;
            const preco = i.item.valorunidade;
            const cep = p.pedido.cliente.cep;
            const data = p.pedido.data;
            const sit = p.pedido.situacao;
        
            const nomeloja = lojas.find(l => l.id == "203234101").nomeLoja;

            template_tailwind = `<tr>
            <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">${num}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">${item}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">${parseInt(qtd).toFixed(2)}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${parseFloat(preco).toFixed(2)}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${nomeloja}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${cep}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${data}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${sit}</td>
            </tr>`

            d1.insertAdjacentHTML('beforeend', template_tailwind);
        }

        
    }
}
getID();