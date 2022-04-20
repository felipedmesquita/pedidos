
async function getID() {
    const params = new URLSearchParams(window.location.search)
    key = params.get('key')
    const cpf = prompt("Insira o CPF ou CNPJ ");
    res = await fetch("https://bling.servidorjulia.workers.dev/Api/v2/contato/" + cpf + "/json?apikey="+key);
    json = await res.json();

    const id = json.retorno.contatos[0].contato.id;

    console.log(id);

    resp = await fetch(`https://bling.servidorjulia.workers.dev/Api/v2/pedidos/json?filters=idContato[${id}]&apikey=${key}`);
    json2 = await resp.json();

    pedidos = json2.retorno.pedidos;

    var d1 = document.getElementById('tabela_tail');

    for (p of pedidos) {
        itens = p.pedido.itens;
        for(i of itens){
            const num = p.pedido.numero;
            const item = i.item.descricao;
            const qtd = i.item.quantidade;
            const preco = i.item.valorunidade;
            const data = p.pedido.data;
            const sit = p.pedido.situacao;
            
            template_tailwind = `<tr>
            <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">${num}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">${item}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">${parseInt(qtd).toFixed(2)}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${parseFloat(preco).toFixed(2)}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${data}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${sit}</td>
            </tr>`


            d1.insertAdjacentHTML('beforeend', template_tailwind);
        }

        
    }
}

getID();

/*async function get(){
    const cpf = prompt("Insira o CPF ou CNPJ ");
    res = await fetch("https://bling.com.br/Api/v2/contato/"+ cpf + "/json?apikey=338ef3faa1da74d984ec8d87b864a732d01e70a69d9aedae90c1465427402991b76b2673");
    json = await res.json();
    
    console.log(json.retorno.contatos[0].contato.id);
}
getID();*/