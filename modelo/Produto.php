<?php
require("Conexao.php");
require("ProdutoInterface.php");
class Produto implements ProdutoInterface
{
    private $codigo_produto;
    private $categoria_produto;
    private $nome_produto;
    private $estoque_produto;
    private $valor_produto;
    private $filtro_produto;
    private $valor_filtro_produto;

    public function setCodigo_Produto($codigo_produto)
    {
        $this->codigo_produto = $codigo_produto;
    }

    public function getCodigo_Produto()
    {
        return $this->codigo_produto;
    }

    public function setCategoria_Produto($categoria_produto)
    {
        $this->categoria_produto = $categoria_produto;
    }

    public function getCategoria_Produto()
    {
        return $this->categoria_produto;
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

    public function setFiltro_Produto($filtro_produto)
    {
        $this->filtro_produto = $filtro_produto;
    }

    public function getFiltro_Produto()
    {
        return $this->filtro_produto;
    }

    public function setValor_Filtro_Produto($valor_filtro_produto)
    {
        $this->valor_filtro_produto = $valor_filtro_produto;
    }

    public function getValor_Filtro_Produto()
    {
        return $this->valor_filtro_produto;
    }

    public function CadastrarProduto(): int
    {
        try {
            if (!empty($this->getNome_Produto()) && !empty($this->getEstoque_Produto()) && !empty($this->getValor_Produto())) {
                $instrucaoCadastroProduto = "insert into produtos(categoria_produto,nome_produto,estoque_produto,valor_produto)values(:recebe_categoria_produto,:recebe_nome_produto,:recebe_estoque_produto,:recebe_valor_produto)";
                $comandoCadastroProduto = Conexao::Obtem()->prepare($instrucaoCadastroProduto);
                $comandoCadastroProduto->bindValue(":recebe_categoria_produto", $this->getCategoria_Produto());
                $comandoCadastroProduto->bindValue(":recebe_nome_produto", $this->getNome_Produto());
                $comandoCadastroProduto->bindValue(":recebe_estoque_produto", $this->getEstoque_Produto());
                $comandoCadastroProduto->bindValue(":recebe_valor_produto", $this->getValor_Produto());

                $resultadoCadastroProduto = $comandoCadastroProduto->execute();

                $ultimoCodigoGeradoCadastroProduto = Conexao::Obtem()->lastInsertId();

                return $ultimoCodigoGeradoCadastroProduto;
            }
        } catch (PDOException $exception) {
            array_push($registro_cliente, $exception->getMessage());
            return $registro_cliente;
        } catch (Exception $excecao) {
            array_push($registro_cliente, $excecao->getMessage());
            return $registro_cliente;
        }
    }

    public function ConsultarProdutos(): array
    {
        $registros_produtos = array();
        try {
            if (!empty($this->getFiltro_Produto()) && !empty($this->getValor_Filtro_Produto())) 
            {
                if($this->getFiltro_Produto() === "categoria_produto")
                {
                    $instrucaoConsultaProdutos = "select p.codigo_produto,p.nome_produto,p.categoria_produto,p.estoque_produto,p.valor_produto
                    from produtos as p where p.categoria_produto = :recebe_categoria_produto";
                    $comandoConsultaProduto = Conexao::Obtem()->prepare($instrucaoConsultaProdutos);
                    $comandoConsultaProduto->bindValue(":recebe_categoria_produto",$this->getValor_Filtro_Produto());
                    $comandoConsultaProduto->execute();
                    $registros_produtos = $comandoConsultaProduto->fetchAll(PDO::FETCH_ASSOC);
                }else if($this->getFiltro_Produto() === "nome_produto")
                {
                    $recebeNomeProduto = $this->getValor_Filtro_Produto();
                    $instrucaoConsultaProdutos = "select p.codigo_produto,p.nome_produto,p.categoria_produto,p.estoque_produto,p.valor_produto
                    from produtos as p where p.nome_produto like :recebe_nome_produto";
                    $comandoConsultaProduto = Conexao::Obtem()->prepare($instrucaoConsultaProdutos);
                    $comandoConsultaProduto->bindValue(":recebe_nome_produto","%$recebeNomeProduto%");
                    $comandoConsultaProduto->execute();
                    $registros_produtos = $comandoConsultaProduto->fetchAll(PDO::FETCH_ASSOC);
                }else{
                    $instrucaoConsultaProdutos = "select p.codigo_produto,p.nome_produto,p.categoria_produto,p.estoque_produto,p.valor_produto
                    from produtos as p";
                    $comandoConsultaProduto = Conexao::Obtem()->prepare($instrucaoConsultaProdutos);
                    $comandoConsultaProduto->execute();
                    $registros_produtos = $comandoConsultaProduto->fetchAll(PDO::FETCH_ASSOC);
                }
            }

            if(!empty($registros_produtos))
                return $registros_produtos;
            else
                return $registros_produtos;
        } catch (PDOException $exception) {
            array_push($registros_produtos, $exception->getMessage());
            return $registros_produtos;
        } catch (Exception $excecao) {
            array_push($registros_produtos, $excecao->getMessage());
            return $registros_produtos;
        }
    }
}
?>