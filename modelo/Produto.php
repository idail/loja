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
        try{
            if(!empty($this->getNome_Produto()) && !empty($this->getEstoque_Produto()) && !empty($this->getValor_Produto()))
            {
                $instrucaoCadastroProduto = "insert into produtos(nome_produto,estoque_produto,valor_produto)values(:recebe_nome_produto,:recebe_estoque_produto,:recebe_valor_produto)";
                $comandoCadastroProduto = Conexao::Obtem()->prepare($instrucaoCadastroProduto);
                $comandoCadastroProduto->bindValue(":recebe_nome_produto",$this->getNome_Produto());
                $comandoCadastroProduto->bindValue(":recebe_estoque_produto",$this->getEstoque_Produto());
                $comandoCadastroProduto->bindValue(":recebe_valor_produto",$this->getValor_Produto());

                $resultadoCadastroProduto = $comandoCadastroProduto->execute();

                $ultimoCodigoGeradoCadastroProduto = Conexao::Obtem()->lastInsertId();

                return $ultimoCodigoGeradoCadastroProduto;
            }
        }catch (PDOException $exception) {
            array_push($registro_cliente, $exception->getMessage());
            return $registro_cliente;
        } catch (Exception $excecao) {
            array_push($registro_cliente, $excecao->getMessage());
            return $registro_cliente;
        }
    }

    public function consultarProdutos(): array
    {
        $registros_produtos = array();

        return $registros_produtos;
    }
}
?>