<style>
    #imagens-produtos {
        opacity: 0;
        margin: -10px;
    }
</style>
<div class="col-lg-12">

    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Cadastro de Produto</h5>

            <!-- General Form Elements -->
            <form id="formulario-cadastro-produto">

                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label class="col-sm-2 col-form-label">Produto</label>
                        <select class="form-select" aria-label="Default select example" name="lista_produto" id="lista-produto">
                            <!-- <option selected value="selecione">Selecione</option> -->
                            <!-- <option value="short">Short</option>
                            <option value="camisa">Camisa</option>
                            <option value="camiseta">Camiseta</option>
                            <option value="blusa">Blusa</option>
                            <option value="vestido">Vestido</option>
                            <option value="calca">Calça</option>
                            <option value="calca">Casaco</option>
                            <option value="bolsa">Bolsa</option>
                            <option value="joia">Joia</option>
                            <option value="colar">Colar</option>
                            <option value="anel">Anel</option> -->
                        </select>
                    </div>

                    <div id="exibe-informacao-qtd-produtos-estoque">
                        <span id="informacao-qtd-produtos-estoque">Quantidade de produtos em estoque:</span>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label class="col-sm-2 col-form-label">Cliente</label>
                        <select class="form-select" aria-label="Default select example" name="lista_cliente" id="lista-cliente">
                            <!-- <option selected value="selecione">Selecione</option> -->
                            <!-- <option value="short">Short</option>
                            <option value="camisa">Camisa</option>
                            <option value="camiseta">Camiseta</option>
                            <option value="blusa">Blusa</option>
                            <option value="vestido">Vestido</option>
                            <option value="calca">Calça</option>
                            <option value="calca">Casaco</option>
                            <option value="bolsa">Bolsa</option>
                            <option value="joia">Joia</option>
                            <option value="colar">Colar</option>
                            <option value="anel">Anel</option> -->
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label class="col-sm-2 col-form-label">Desconto Venda</label>
                        <select class="form-select" aria-label="Default select example" name="lista_desconto_venda" id="lista-desconto-venda">
                            <option selected value="selecione">Selecione</option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                        </select>
                    </div>
                </div>
<!-- 
                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputText" class="col-sm-2 col-lg-12 mb-3 col-form-label">Imagens</label>
                        <i class="bi bi-paperclip"><input type="file" name="imagens-produtos[]" id="imagens-produtos" title="Selecione as imagens" multiple></i>
                    </div>
                </div>

                <div class="col-lg-12" style="display: block ruby;">

                    <div id="exibi-imagens-produtos"></div>

                </div> -->

                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputText" class="col-sm-2 col-form-label">Desconto</label>
                        <input type="text" class="form-control" name="nome-produto" placeholder="Informe o nome do produto" id="nome-produto">
                    </div>
                </div>


                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputText" class="col-sm-2 col-form-label">Quantidade Produtos</label>
                        <input type="text" class="form-control" name="quantidade_produto_venda" placeholder="Informe a quantidade de produtos na venda" id="quantidade-produto-venda">
                    </div>
                </div>


                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Valor final venda</label>
                        <input type="text" class="form-control" name="valor-final-venda"  placeholder="Informe o valor final da venda" id="valor-final-venda">
                    </div>
                </div>


                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label class="col-sm-2 col-form-label">Agendar Pagamento</label>
                        <select class="form-select" aria-label="Default select example" name="lista_agendar_pagamento" id="lista-agendar-pagamento">
                            <option selected value="selecione">Selecione</option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3" id="data-pagamento-agendado">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputText" class="col-sm-2 col-form-label">Data Pagamento Agendado</label>
                        <input type="date" class="form-control" id="data-agendamento-pagamento" name="data_agendamento_pagamento">
                    </div>
                </div>





                <div class="row mb-3">
                    <!-- <label class="col-sm-2 col-form-label">Submit Button</label> -->
                    <div class="col-sm-10">
                        <button type="button" class="btn btn-primary" id="cadastro-vendo">Cadastrar</button>
                        <button type="button" class="btn btn-secondary" id="limpar-campos-cadastro-venda">Limpar</button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-cadastro-alterar-realizado-produto" role="alert">
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-cadastro-alterar-sendo-realizada-produto" role="alert">
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-vazio-cadastro-alterar-produto" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-falha-cadastro-alterar-produto" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>

            </form><!-- End General Form Elements -->

        </div>
    </div>

</div>