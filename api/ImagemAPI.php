<?php
require("../controladora/ImagemControladora.php");
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: *");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods: *");
$imagemControladora = new ImagemControladora();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $recebeProcessoImagem = $_POST["processo_imagem"];

    if ($recebeProcessoImagem === "recebe_cadastro_imagem") {
        $recebeImagensProduto = $_FILES["imagens-produtos"];

        $imagens_produto = array();
        $codigos_produto_imagem = array();

        foreach ($recebeImagensProduto["name"] as $indice => $valor) {
            array_push($imagens_produto, $valor);
        }

        $imagem_copiada = "sem sucesso";

        for ($contagem = 0; $contagem < count($recebeImagensProduto["name"]); $contagem++) {
            $caminho_temporario = $recebeImagensProduto["tmp_name"][$contagem];
            $destino_imagens = "../visao/produtos/imagens_produto/" . $recebeImagensProduto["name"][$contagem];

            if (copy($recebeImagensProduto["tmp_name"][$contagem], $destino_imagens)) {
                $imagem_copiada = "sucesso";
            }
        }

        if ($imagem_copiada === "sucesso") {

            for ($codigo_produto_imagem = 0; $codigo_produto_imagem < count($recebeImagensProduto["name"]); $codigo_produto_imagem++) { 
                array_push($codigos_produto_imagem,$_POST["recebe_codigo_produto"]);
            }
            $resultadoCadastroImagem = $imagemControladora->cadastrarImagem($imagens_produto, $codigos_produto_imagem);
            echo json_encode($resultadoCadastroImagem);
        }
    }
}
?>