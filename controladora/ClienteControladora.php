<?php
require("../modelo/Cliente.php");

class ClienteControladora{
    private $cliente;

    public function __construct()
    {
        $this->cliente = new Cliente();
    }

    public function CadastroCliente($recebeNomeCliente,$recebeTelefoneCliente,$recebeEnderecoCliente,$recebeStatusCliente)
    {
        $this->cliente->setNome_Cliente($recebeNomeCliente);
        $this->cliente->setTelefone_Cliente($recebeTelefoneCliente);
        $this->cliente->setEndereco_Cliente($recebeEnderecoCliente);
        $this->cliente->setStatus_Cliente($recebeStatusCliente);

        $resultadoCadastroCliente = $this->cliente->cadastrarCliente();

        return $resultadoCadastroCliente;
    }

    public function ConsultarClientes($recebeFiltro,$recebeValorFiltro)
    {
        $this->cliente->setFiltro_Cliente($recebeFiltro);
        $this->cliente->setValor_Filtro_Cliente($recebeValorFiltro);

        $registrosClientes = $this->cliente->ConsultarClientes();
        return $registrosClientes;
    }
}
?>