<div class="col-lg-3 mb-4">
    <a href="index.php?pagina=cadastro_venda" class="btn btn-primary">Cadastrar Venda</a>
</div>
<div class="card">
    <div class="card-body table-responsive">
        <h5 class="card-title">Vendas</h5>
        <div class="row mb-4 col-lg-12">
            <label class="col-sm-2 col-form-label">Selecione o cliente</label>
            <div class="col-sm-4">
                <select class="form-select" aria-label="Default select example" id="lista-cliente-venda">

                </select>
            </div>


            <label class="col-sm-1 col-form-label" id="titulo-filtro">Filtro</label>
            <div class="col-sm-2" id="lista-filtro-venda">
                <select class="form-select" aria-label="Default select example" id="filtro-venda">
                    <option selected value="selecione">Selecione</option>
                    <option value="cliente">Nome</option>
                    <option value="todos_venda">Todos</option>
                </select>
            </div>

            <!-- <div class="col-sm-2">
                <input type="text" class="form-control" name="valor-filtro-venda" placeholder="Informe o filtro que deseja pesquisar" id="valor-filtro-venda">
            </div> -->

            <div class="col-sm-2">
                <button type="button" class="btn btn-primary" id="buscar-venda">Pesquisar</button>
            </div>
            <div class="col-12">
                <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show mt-3" id="recebe-mensagem-campo-vazio-buscar-venda" role="alert">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>

            <!-- Default Table -->


            <table class="table" id="listagem-vendas">
                <thead>
                    <tr>
                        <th scope="col" class="col-4 text-center">Cliente</th>
                        <th scope="col" class="col-4 text-center">Informações Vendas</th>
                        <!-- <th scope="col">Quantidade</th>
                        <th scope="col">Desconto/Valor</th>
                        <th scope="col">Valor Final</th>
                        <th scope="col">Pago Venda</th>
                        <th scope="col">Pagamento Agendado/Data Agendamento</th> -->
                        <th scope="col" colspan="3">Opções</th>
                    </tr>
                </thead>
                <tbody id="registros-vendas">
                </tbody>
            </table>
        </div>
        <!-- End Default Table Example -->
    </div>

    <div class="col-12">
        <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-falha-buscar-cliente" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>

    <div class="col-12">
        <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-vazio-busca-venda" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>

    <div class="col-12">
        <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-falha-buscar-venda" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>

    <div class="col-12">
        <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="recebe-mensagem-exclusao-realizada-venda" role="alert">
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>

    <div class="col-12">
        <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" id="recebe-mensagem-campo-falha-exclusao-venda" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
    <span style="color: black;" id="exibi-quantidade-vendas"></span>
</div>