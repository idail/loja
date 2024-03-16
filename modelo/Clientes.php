<?php
require("Conexao.php");
require("ClientesInterface.php");
class Clientes implements ClientesInterface{
    private $codigo_cliente;
    private $nome_cliente;
    private $telefone_cliente;
    private $endereco_cliente;
    private $status_cliente;

    public function setCodigo_Cliente($codigo_cliente)
    {
        $this->codigo_cliente = $codigo_cliente;
    }

    public function getCodigo_Cliente()
    {
        return $this->codigo_cliente;
    }

    public function setNome_Cliente($nome_cliente)
    {
        $this->nome_cliente = $nome_cliente;
    }

    public function getNome_Cliente()
    {
        return $this->nome_cliente;
    }

    public function setTelefone_Cliente($telefone_cliente)
    {
        $this->telefone_cliente = $telefone_cliente;
    }

    public function getTelefone_Cliente()
    {
        return $this->telefone_cliente;
    }

    public function setEndereco_Cliente($endereco_cliente)
    {
        $this->endereco_cliente = $endereco_cliente;
    }

    public function getEndereco_Cliente()
    {
        return $this->endereco_cliente;
    }

    public function setStatus_Cliente($status_cliente)
    {
        $this->status_cliente = $status_cliente;
    }

    public function getStatus_Cliente()
    {
        return $this->status_cliente;
    }

    public function cadastrarCliente(): int
    {
        return 1;
    }
}
?>