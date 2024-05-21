<?php
require("../modelo/Venda.php");

class VendaControladora{
    private $venda;

    public function __construct()
    {
        $this->venda = new Venda();
    }

    public function CadastrarVenda($recebeNomePV,$recebeNCV,$recebeQuantidadePV,$recebeDescontoV,$recebeDescontoFV,$recebeValorFV,
    $recebePagoV,$recebePagamentoAV,$recebeDataPV)
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

        $resultadoCadastrarVenda = $this->venda->CadastrarVenda();

        return $resultadoCadastrarVenda;
    }
}
?>