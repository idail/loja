<?php
require("Conexao.php");
require("ProdutoInterface.php");
class Produto implements ProdutoInterface{
    private $codigo_produto;
    private $nome_produto;
    private $estoque_produto;
    private $valor_produto;

    public function setCodigo_Produto($codigo_produto)
    {
        $this->codigo_produto = $codigo_produto;
    }

    public function getCodigo_Produto()
    {
        return $this->codigo_produto;
    }

    public function setNome_Produto($nome_produto)
    {
        $this->nome_produto = $nome_produto;
    }

    public function getNome_Produto()
    {
        return $this->nome_produto;
    }

    public function setEstoque_Produto($estoque_produto)
    {
        $this->estoque_produto = $estoque_produto;
    }

    public function getEstoque_Produto()
    {
        return $this->estoque_produto;
    }

    public function setValor_Produto($valor_produto)
    {
        $this->valor_produto = $valor_produto;
    }

    public function getValor_Produto()
    {
        return $this->valor_produto;
    }

    public function cadastrarProduto():int
    {
        return 1;
    }

    public function consultarProdutos(): array
    {
        $registros_produtos = array();

        return $registros_produtos;
    }
}
?>