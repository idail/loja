<?php
//é importado a classe protocoloscontroladora.php
require("../controladora/ProdutoControladora.php");
require("../controladora/ImagemControladora.php");
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: *");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods: *");
$produtoControladora = new ProdutoControladora();
$imagemControladora = new ImagemControladora();

if($_SERVER["REQUEST_METHOD"] === "POST")
{
    $recebeProcessoProduto = $_POST["processo_produto"];

    if($recebeProcessoProduto === "recebe_cadastro_produto")
    {
        $recebeCategoriaProduto = $_POST["categoria-produto"];

        $recebeImagensProduto = $_FILES["imagens-produtos"];

        $recebeNomeProduto = $_POST["nome-produto"];

        $recebeEstoqueProduto = $_POST["estoque-produto"];

        $recebeValorProduto = $_POST["valor-produto"];

        if(!empty($recebeCategoriaProduto) && !empty($recebeNomeProduto) && !empty($recebeEstoqueProduto) && !empty($recebeValorProduto))
        {
            $resultadoCadastroProduto = $produtoControladora->cadastrarProduto($recebeCategoriaProduto,$recebeNomeProduto,$recebeEstoqueProduto,$recebeValorProduto);

            if(!empty($resultadoCadastroProduto))
            {
                $imagens_produto = array();

                foreach($recebeImagensProduto["name"] as $indice => $valor)
                {
                    array_push($imagens_produto,$valor);
                }

                $imagem_copiada = "sem sucesso";

                for ($contagem = 0; $contagem < count($recebeImagensProduto["name"]); $contagem++)
                { 
                    $caminho_temporario = $recebeImagensProduto["tmp_name"][$contagem];
                    $destino_imagens = "../visao/produtos/imagens_produto/".$recebeImagensProduto["name"][$contagem];

                    if(copy($recebeImagensProduto["tmp_name"][$contagem],$destino_imagens))
                    {
                        $imagem_copiada = "sucesso";
                    }
                }

                if($imagem_copiada === "sucesso")
                {
                    $resultadoCadastroImagem = $imagemControladora->cadastrarImagem($imagens_produto,$resultadoCadastroProduto);
                    echo json_encode($resultadoCadastroImagem);
                }
            }
        }else{
            echo json_encode("Favor preencher os campos");
        }
    }
}