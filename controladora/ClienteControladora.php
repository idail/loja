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

    public function ConsultarClienteEspecifico($recebeCodigoCliente)
    {
        $this->cliente->setCodigo_Cliente($recebeCodigoCliente);

        $registroClienteEspecifico = $this->cliente->ConsultarClienteEspecifico();

        return $registroClienteEspecifico;
    }

    public function AlteraClienteEspecifico($recebeNomeCienteAltera,$recebeTelefoneClienteAltera,$recebeEnderecoClienteAltera,$recebeStatusClienteAltera,$recebeCodigoClienteAltera)
    {
        $this->cliente->setNome_Cliente($recebeNomeCienteAltera);
        $this->cliente->setTelefone_Cliente($recebeTelefoneClienteAltera);
        $this->cliente->setEndereco_Cliente($recebeEnderecoClienteAltera);
        $this->cliente->setStatus_Cliente($recebeStatusClienteAltera);
        $this->cliente->setCodigo_Cliente($recebeCodigoClienteAltera);

        $resultadoAlteraCliente = $this->cliente->alterarClienteEspecifico();
        return $resultadoAlteraCliente;
    }
}
?>