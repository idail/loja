<?php 
require("Conexao.php");
require("VendaInterface.php");

class Venda implements VendaInterface{
    private $codigo_venda;
    private $nome_produto_venda;
    private $nome_cliente_venda;
    private $quantidade_produtos_venda;
    private $desconto_venda;
    private $desconto_final_venda;
    private $valor_final_venda;
    private $pago_venda;
    private $pagamento_agendado_venda;
    private $data_pagamento_venda;
    private $codigo_cliente_vendas;
    private $filtro_venda;
    private $valor_filtro_venda;

    public function setCodigo_Venda($codigo_venda)
    {
        $this->codigo_venda = $codigo_venda;
    }

    public function getCodigo_Venda()
    {
        return $this->codigo_venda;
    }

    public function setNome_Produto_Venda($nome_produto_venda)
    {
        $this->nome_produto_venda = $nome_produto_venda;
    }

    public function getNome_Produto_Venda()
    {
        return $this->nome_produto_venda;
    }

    public function setNome_Cliente_Venda($nome_cliente_venda)
    {
        $this->nome_cliente_venda = $nome_cliente_venda;
    }

    public function getNome_Cliente_Venda()
    {
        return $this->nome_cliente_venda;
    }

    public function setQuantidade_Produtos_Venda($quantidade_produtos_venda)
    {
        $this->quantidade_produtos_venda = $quantidade_produtos_venda;
    }

    public function getQuantidade_Produtos_Venda()
    {
        return $this->quantidade_produtos_venda;
    }

    public function setDesconto_Final_Venda($desconto_final_venda)
    {
        $this->desconto_final_venda = $desconto_final_venda;
    }

    public function setDesconto_Venda($desconto_venda)
    {
        $this->desconto_venda = $desconto_venda;
    }

    public function getDesconto_Venda()
    {
        return $this->desconto_venda;
    }

    public function getDesconto_Final_Venda()
    {
        return $this->desconto_final_venda;
    }

    public function setValor_Final_Venda($valor_final_venda)
    {
        $this->valor_final_venda = $valor_final_venda;
    }

    public function getValor_Final_Venda()
    {
        return $this->valor_final_venda;
    }

    public function setPago_Venda($pago_venda)
    {
        $this->pago_venda = $pago_venda;
    }

    public function getPago_Venda()
    {
        return $this->pago_venda;
    }

    public function setPagamento_Agendado_Venda($pagamento_agendado_venda)
    {
        $this->pagamento_agendado_venda = $pagamento_agendado_venda;
    }

    public function getPagamento_Agendado_Venda()
    {
        return $this->pagamento_agendado_venda;
    }

    public function setData_Pagamento_Venda($data_pagamento_venda)
    {
        $this->data_pagamento_venda = $data_pagamento_venda;
    }

    public function getData_Pagamento_Venda()
    {
        return $this->data_pagamento_venda;
    }

    public function setCodigo_Cliente_Vendas($codigo_cliente_vendas)
    {
        $this->codigo_cliente_vendas = $codigo_cliente_vendas;
    }

    public function getCodigo_Cliente_Vendas()
    {
        return $this->codigo_cliente_vendas;
    }

    public function setFiltro_Venda($filtro_venda)
    {
        $this->filtro_venda = $filtro_venda;
    }

    public function getFiltro_Venda()
    {
        return $this->filtro_venda;
    }

    public function setValor_Filtro_Venda($valor_filtro_venda)
    {
        $this->valor_filtro_venda = $valor_filtro_venda;
    }

    public function getValor_Filtro_Venda()
    {
        return $this->valor_filtro_venda;
    }

    public function CadastrarVenda()
    {
        try{
            for ($venda=0; $venda < count($this->getNome_Produto_Venda()); $venda++) { 
                $instrucaoCadastrarVenda = "insert into vendas(nome_produto_venda,nome_cliente_venda,quantidade_produtos_venda,desconto_venda,desconto_final_venda,valor_final_venda,pago_venda,
                pagamento_agendado_venda,data_pagamento_venda,codigo_cliente_vendas)values(:recebe_nome_produto_venda,:recebe_nome_cliente_venda,:recebe_quantidade_produtos_venda,:recebe_desconto_venda,
                :recebe_desconto_final_venda,:recebe_valor_final_venda,:recebe_pago_venda,:recebe_pagamento_agendado_venda,:recebe_data_pagamento_venda,:recebe_codigo_cliente_vendas)";
                $comandoCadastrarVenda = Conexao::Obtem()->prepare($instrucaoCadastrarVenda);
                $comandoCadastrarVenda->bindValue(":recebe_nome_produto_venda",$this->getNome_Produto_Venda()[$venda]);
                $comandoCadastrarVenda->bindValue(":recebe_nome_cliente_venda",$this->getNome_Cliente_Venda()[$venda]);
                $comandoCadastrarVenda->bindValue(":recebe_quantidade_produtos_venda",$this->getQuantidade_Produtos_Venda()[$venda]);
    
                $comandoCadastrarVenda->bindValue(":recebe_desconto_venda",$this->getDesconto_Venda()[$venda]);
                
                if(!empty($this->getDesconto_Final_Venda()))
                    $comandoCadastrarVenda->bindValue(":recebe_desconto_final_venda",$this->getDesconto_Final_Venda()[$venda]);
                else
                    $comandoCadastrarVenda->bindValue(":recebe_desconto_final_venda",null);
    
                $comandoCadastrarVenda->bindValue(":recebe_valor_final_venda",$this->getValor_Final_Venda()[$venda]);
    
                $comandoCadastrarVenda->bindValue(":recebe_pago_venda",$this->getPago_Venda()[$venda]);
                
                $comandoCadastrarVenda->bindValue(":recebe_pagamento_agendado_venda",$this->getPagamento_Agendado_Venda()[$venda]);
    
                if(!empty($this->getData_Pagamento_Venda()))
                    $comandoCadastrarVenda->bindValue(":recebe_data_pagamento_venda",$this->getData_Pagamento_Venda()[$venda]);
                else
                    $comandoCadastrarVenda->bindValue(":recebe_data_pagamento_venda",null);

                $comandoCadastrarVenda->bindValue(":recebe_codigo_cliente_vendas",$this->getCodigo_Cliente_Vendas()[$venda]);
    
                $comandoCadastrarVenda->execute();
    
                $recebeUltimoCodigoRegistradoVenda = Conexao::Obtem()->lastInsertId();
            }

            return $recebeUltimoCodigoRegistradoVenda;
        }catch (PDOException $exception) {
            $recebe_erro =  $exception->getMessage();
            return $recebe_erro;
        } catch (Exception $excecao) {
            $recebe_erro =  $excecao->getMessage();
            return $recebe_erro;
        }
    }

    public function BuscarVendas()
    {
        $registros_venda = array();
        try{
            if($this->getFiltro_Venda() === "lista_cliente_venda" && !empty($this->getValor_Filtro_Venda()))
            {
                $recebeNomeClienteV = $this->getValor_Filtro_Venda();
                $instrucaoBuscarVenda = "select * from vendas as v where v.nome_cliente_venda like :recebe_nome_cliente_venda";
                $comandoBuscarVenda = Conexao::Obtem()->prepare($instrucaoBuscarVenda);
                $comandoBuscarVenda->bindValue(":recebe_nome_cliente_venda","%$recebeNomeClienteV%");
                $comandoBuscarVenda->execute();
                $registros_venda = $comandoBuscarVenda->fetchAll(PDO::FETCH_ASSOC);
            }else if($this->getFiltro_Venda() === "todos_venda" && !empty($this->getValor_Filtro_Venda()))
            {
                $instrucaoBuscarVenda = "select distinct nome_cliente_venda,codigo_cliente_vendas from vendas";
                $comandoBuscarVenda = Conexao::Obtem()->prepare($instrucaoBuscarVenda);
                $comandoBuscarVenda->execute();
                $registros_venda = $comandoBuscarVenda->fetchAll(PDO::FETCH_ASSOC);
            }
            return $registros_venda;
        }catch (PDOException $exception) {
            array_push($registros_venda,$exception->getMessage());
            return $registros_venda;
        } catch (Exception $excecao) {
            array_push($registros_venda,$excecao->getMessage());
            return $registros_venda;
        }
    }

    public function BuscarVendasEspecificas()
    {
        $registros_vendas = array();
        try{
            $instrucaoBuscarVEspecificas = "select * from vendas as v where v.codigo_cliente_vendas = :recebe_codigo_cliente_vendas";
            $comandoBuscarVEspecificas = Conexao::Obtem()->prepare($instrucaoBuscarVEspecificas);
            $comandoBuscarVEspecificas->bindValue(":recebe_codigo_cliente_vendas",$this->getCodigo_Cliente_Vendas());
            $comandoBuscarVEspecificas->execute();
            $registros_vendas = $comandoBuscarVEspecificas->fetchAll(PDO::FETCH_ASSOC);

            return $registros_vendas;
        } catch (PDOException $exception) {
            array_push($registros_vendas,$exception->getMessage());
            return $registros_vendas;
        } catch (Exception $excecao) {
            array_push($registros_vendas,$excecao->getMessage());
            return $registros_vendas;
        }
    }
}
?>