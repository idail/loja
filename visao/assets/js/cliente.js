$("#cadastro-cliente").click(function (e) {
    e.preventDefault();
    debugger;
    let recebeNomeCliente = $("#nome-cliente").val();
    let recebeTelefoneCliente = $("#telefone-cliente").val();
    let recebeEnderecoCliente = $("#endereco-cliente").val();
    let recebeStatusCliente = $("#status-cliente").val();

    let formulario_cadastro_cliente = $("#formulario-cadastro-cliente")[0];
    let dados_formulario_cadastro_cliente = new FormData(formulario_cadastro_cliente);
    dados_formulario_cadastro_cliente.append("processo_cliente", "recebe_cadastro_cliente");

    if (recebeNomeCliente != "" && recebeTelefoneCliente != "" && recebeEnderecoCliente != "" && recebeStatusCliente != "") {
        $.ajax({
            url: "../api/ClienteAPI.php",
            type: "post",
            dataType: "json",
            processData: false,
            contentType: false,
            data: dados_formulario_cadastro_cliente,
            success: function (retorno) {
                debugger;
                console.log(retorno);
            },
            error: function (xhr, status, error) {

            },
        });

    } else if (recebeNomeCliente === "") {

    } else if (recebeTelefoneCliente === "") {

    } else if (recebeEnderecoCliente === "") {

    } else if (recebeStatusCliente === "") {

    }
});