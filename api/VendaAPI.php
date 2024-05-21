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
        $recebeNomeProdutoV = $_POST["valor_nomeprodutov"];
        $recebeNomeClienteV = $_POST["valor_nomeclientev"];
        $recebeQuantidadeProdutoV = $_POST["valor_quantidadeprodutov"];
        $recebeValorSelecionadoDescontoV = $_POST["valor_selecionado_descontov"];
        $recebeDescontoValorV = $_POST["valor_descontoprodutov"];
        $recebeValorV = $_POST["valor_finalv"];
        $recebeValorSelecionadoPagoV = $_POST["valor_selecionado_pagov"];
        $recebePagamentoAgendadoV = $_POST["valor_pagamentoagendadov"];
        $recebeDataAgendamentoProdutoV = $_POST["valor_datapagamentov"];


        $resultadoCadastrarVenda = $vendaControladora->CadastrarVenda($recebeNomeProdutoV,$recebeNomeClienteV,$recebeQuantidadeProdutoV,
        $recebeValorSelecionadoDescontoV,$recebeDescontoValorV,$recebeValorV,$recebeValorSelecionadoPagoV,$recebePagamentoAgendadoV,$recebeDataAgendamentoProdutoV);

        echo json_encode($resultadoCadastrarVenda);
    }
}
?>