<?php
require("../modelo/Venda.php");

class VendaControladora{
    private $venda;

    public function __construct()
    {
        $this->venda = new Venda();
    }

    public function CadastrarVenda($recebeNomePV,$recebeNCV,$recebeQuantidadePV,$recebeDescontoV,$recebeDescontoFV,$recebeValorFV,
    $recebePagoV,$recebePagamentoAV,$recebeDataPV,$recebeCodigoClienteV)
    {
        $this->venda->setNome_Produto_Venda($recebeNomePV);
        $this->venda->setNome_Cliente_Venda($recebeNCV);
        $this->venda->setQuantidade_Produtos_Venda($recebeQuantidadePV);
        $this->venda->setDesconto_Venda($recebeDescontoV);
        $this->venda->setDesconto_Final_Venda($recebeDescontoFV);
        $this->venda->setValor_Final_Venda($recebeValorFV);
        $this->venda->setPago_Venda($recebePagoV);
        $this->venda->setPagamento_Agendado_Venda($recebePagamentoAV);
        $this->venda->setData_Pagamento_Venda($recebeDataPV);
        $this->venda->setCodigo_Cliente_Vendas($recebeCodigoClienteV);

        $resultadoCadastrarVenda = $this->venda->CadastrarVenda();

        return $resultadoCadastrarVenda;
    }

    public function BuscarVendas($recebeFiltroV,$recebeValorFiltroV)
    {
        $this->venda->setFiltro_Venda($recebeFiltroV);
        $this->venda->setValor_Filtro_Venda($recebeValorFiltroV);

        $resultadoBuscarVendas = $this->venda->BuscarVendas();

        return $resultadoBuscarVendas;
    }

    public function BuscarVendasClienteEspecifico($recebeCodigoClienteVEspecifico)
    {
        $this->venda->setCodigo_Cliente_Vendas($recebeCodigoClienteVEspecifico);

        $resultadoBuscarVEspecificasCliente = $this->venda->BuscarVendasEspecificas();

        return $resultadoBuscarVEspecificasCliente;
    }
}
?>