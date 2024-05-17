<?php
//é importado a classe protocoloscontroladora.php
require("../controladora/VendaControladora.php");
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: *");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods: *");
$vendaControladora = new VendaControladora();

if($_SERVER["REQUEST_METHOD"] === "POST")
{
    $recebeProcessoVenda = $_POST["processo_venda"];

    if($recebeProcessoVenda === "recebe_cadastro_venda")
    {
        $recebeNomePV = $_POST["valor_nomepv"];
        $recebeNomeCV = $_POST["valor_nomecv"];
        $recebeQuantidadePV = $_POST["valor_quantidadepv"];
        $recebeDescontoFV = $_POST["valor_descontofv"];
        $recebeValorFV = $_POST["valor_fv"];
        $recebePagoV = $_POST["valor_pagov"];
        $recebePagamentoAV = $_POST["valor_pagamentoav"];
        $recebeDataPV = $_POST["valor_datapv"];

        $resultadoCadastrarVenda = $vendaControladora->CadastrarVenda($recebeNomePV,$recebeNomeCV,$recebeQuantidadePV,$recebeDescontoFV,
        $recebeValorFV,$recebePagoV,$recebePagamentoAV,$recebeDataPV);

        echo json_encode($resultadoCadastrarVenda);
    }
}
?>