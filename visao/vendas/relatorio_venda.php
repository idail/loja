<?php
require(__DIR__ . "../../../vendor/autoload.php");
require("../../modelo/Conexao.php");
use  Dompdf\Dompdf;
use  Dompdf\Options;
try{
    $instrucaoBuscarVenda = "select * from vendas";
    $comandoBuscarVenda = Conexao::Obtem()->prepare($instrucaoBuscarVenda);
    $comandoBuscarVenda->execute();

    $dados = "<!DOCTYPE html>";
    $dados .= "<html lang='pt-br'>";
    $dados .= "<head>";
    $dados .= "<meta charset='UTF-8'>";
    //$dados .= "<link rel='stylesheet' href='http://localhost/celke/css/custom.css'";
    $dados .= "<title>Painel Loja</title>";
    $dados .= "</head>";
    $dados .= "<body>";
    $dados .= "<h1>Listagem de Vendas</h1>";

    // Ler os registros retornado do BD
    while($registro_venda = $comandoBuscarVenda->fetchAll(PDO::FETCH_ASSOC)){
        //var_dump($row_usuario);
        extract($registro_venda);
        $dados .= "ID: $codigo_venda <br>";
        $dados .= "Nome: $nome_cliente_venda <br>";
        $dados .= "Produto: $nome_produto_venda <br>";
        $dados .= "Quantidade:$quantidade_produtos_venda <br>";
        $dados .= "Desconto:$desconto_venda<br>";
        $dados .= "Desconto Total:$desconto_final_venda<br>";
        $dados .= "Valor Total:$valor_final_venda<br>";
        $dados .= "Pago:$pago_venda<br>";
        $dados .= "Pagamento agendado:$pagamento_agendado_venda<br>";
        $dados .= "Data:$data_pagamento_venda<br>";
        $dados .= "Codigo Cliente:$codigo_cliente_vendas<br>";
        $dados .= "<hr>";
    }

    $options = new Options();

    $dompdf = new Dompdf(['enable_remote' => true]);

    $options->set('defaultFont', 'Relatório Vendas');

    $dompdf->loadHtml($dados);

    $dompdf->setPaper('A4', 'portrait');

    $dompdf->render();

    $dompdf->stream();
}catch(PDOException $excecao)
{
    echo $excecao->getMessage();
}catch(Exception $exception)
{
    echo $exception->getMessage();
}
?>