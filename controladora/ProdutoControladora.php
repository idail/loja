<?php
require("../modelo/Produto.php");
class ProdutoControladora{
    private $produto;

    public function __construct()
    {
        $this->produto = new Produto();
    }

    public function cadastrarProduto($recebe_nome_produto,$recebe_estoque_produto,$recebe_valor_produto)
    {
        $this->produto->setNome_Produto($recebe_nome_produto);
        $this->produto->setEstoque_Produto($recebe_estoque_produto);
        $this->produto->setValor_Produto($recebe_valor_produto);

        $resultadoCadastroProduto = $this->produto->cadastrarProduto();

        return $resultadoCadastroProduto;
    }
}
?>