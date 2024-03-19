<?php
//é importado a classe protocoloscontroladora.php
require("../controladora/ClienteControladora.php");
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: *");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods: *");
$clienteControladora = new ClienteControladora();

if($_SERVER["REQUEST_METHOD"] === "POST")
{
    $recebeProcessoCliente = $_POST["processo_cliente"];

    if($recebeProcessoCliente === "recebe_cadastro_cliente")
    {
        $recebeNomeCliente = $_POST["nome-cliente"];
        $recebeTelefoneCliente = $_POST["telefone-cliente"];
        $recebeEnderecoCliente = $_POST["endereco-cliente"];
        $recebeStatusCliente = $_POST["status-cliente"];

        if(!empty($recebeNomeCliente) && !empty($recebeTelefoneCliente) && !empty($recebeEnderecoCliente) && !empty($recebeStatusCliente))
        {
            $recebeCadastroCliente = $clienteControladora->CadastroCliente($recebeNomeCliente,$recebeTelefoneCliente,$recebeEnderecoCliente,$recebeStatusCliente);

            echo json_encode($recebeCadastroCliente);
        }else{
            echo json_encode("Favor verificar o preenchimento dos campos");
        }
    }
}else if($_SERVER["REQUEST_METHOD"] === "GET")
{
    $recebeProcessoCliente = $_GET["processo_cliente"];

    if($recebeProcessoCliente === "recebe_consultar_clientes")
    {
        $recebeFiltroCliente = $_GET["filtro_cliente"];
        $recebeValorFiltroCliente = $_GET["valor_filtro_cliente"];

        if(!empty($recebeFiltroCliente) && !empty($recebeValorFiltroCliente))
        {
            $recebeConsultaCliente = $clienteControladora->ConsultarClientes($recebeFiltroCliente,$recebeValorFiltroCliente);

            echo json_encode($recebeConsultaCliente);
        }else{
            echo json_encode("Favor verificar o preenchimento dos campos");
        }
    }else if($recebeProcessoCliente === "recebe_consultar_cliente_especifico")
    {
        $recebeCodigoCliente = $_GET["valor_codigo_cliente"];

        if(!empty($recebeCodigoCliente))
        {
            $recebeConsultaClienteEspecifico = $clienteControladora->ConsultarClienteEspecifico($recebeCodigoCliente);

            echo json_encode($recebeConsultaClienteEspecifico);
        }
    }
}
?>