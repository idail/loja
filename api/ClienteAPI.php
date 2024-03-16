<?php
//é importado a classe protocoloscontroladora.php
//require("../controladora/UsuarioControladora.php");
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: *");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods: *");

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
            echo json_encode($recebeStatusCliente);
        }else{
            echo json_encode("Favor verificar o preenchimento dos campos");
        }
    }
}
?>