async function getID() {

    const params = new URLSearchParams(window.location.search)
    key = params.get('key')
    const cpf = prompt("Insira o CPF ou CNPJ ");
    res = await fetch(`https://bling.servidorjulia.workers.dev/Api/v2/contato/${cpf}/json?apikey=${key}`);
    json1 = await res.json();

    const id = json1.retorno.contatos[0].contato.id;
    const nomeCliente = json1.retorno.contatos[0].contato.nome;
    const cpfcnpj = json1.retorno.contatos[0].contato.cnpj;
    const telefoneCliente = json1.retorno.contatos[0].contato.fone;
    const dataCliente = json1.retorno.contatos[0].contato.clienteDesde;
    ///////////////////////////
    const rua = json1.retorno.contatos[0].contato.endereco;
    const num = json1.retorno.contatos[0].contato.numero;
    const bairro = json1.retorno.contatos[0].contato.bairro;
    const complemento = json1.retorno.contatos[0].contato.complemento;
    const uf = json1.retorno.contatos[0].contato.uf;
    const cep = json1.retorno.contatos[0].contato.cep;
    ////////////////////////////
    const endereco = `${rua}, ${num}, ${bairro} - ${uf}`;

    resp = await fetch(`https://bling.servidorjulia.workers.dev/Api/v2/pedidos/json?filters=idContato[${id}]&apikey=${key}`);
    json = await resp.json();

    pedidos = json.retorno.pedidos;

    const tabela = document.getElementById('tabela_tail');
    const titulo = document.getElementById('titulo');

    template_titulo = `<tr>
    <br>
    <h1 class="text-xl font-semibold text-gray-900">PEDIDOS DO CLIENTE ${nomeCliente.toUpperCase()} </h1>
    <p class="mt-2 text-sm text-gray-700">
    CPF/CNPJ: ${cpfcnpj}
    <br>
    Endereço: ${endereco}
    <br>
    CEP: ${cep}
    <br>
    Complemento: ${complemento}
    <br>
    Telefone: ${telefoneCliente}
    <br>
    Cliente desde: ${dataCliente}
    </p>
    </tr>`
    var c = 0;
    for (p of pedidos) {
        itens = p.pedido.itens;
        console.log(c++)
        for (i of itens) {

            const num = p.pedido.numero;
            const item = i.item.descricao;
            const qtd = i.item.quantidade;
            const preco = i.item.valorunidade;
            const loja = p.pedido.loja;
            const data = p.pedido.data;
            const sit = p.pedido.situacao;
            console.log(loja, item)
            const nomeloja = lojas.find(l => l.id == loja)?.nomeLoja || "SEM LOJA";


            template_tailwind = `<tr>
            <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">${num}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">${item}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">${parseInt(qtd).toFixed(2)}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${parseFloat(preco).toFixed(2)}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${nomeloja}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${data}</td>
            <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">${sit}</td>
            </tr>`

            tabela.insertAdjacentHTML('beforeend', template_tailwind);
        }


    }
    titulo.insertAdjacentHTML('beforeend', template_titulo);
    console.log(titulo)
    console.log("sarah")

}

getID();