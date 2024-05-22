<div class="col-lg-3 mb-4">
    <a href="index.php?pagina=cadastro_produtos" class="btn btn-primary">Cadastrar Venda</a>
</div>
<div class="card">
    <div class="card-body table-responsive">
        <h5 class="card-title">Vendas</h5>
        <div class="row mb-4 col-lg-12">
            <label class="col-sm-1 col-form-label">Filtro</label>
            <div class="col-sm-2">
                <select class="form-select" aria-label="Default select example" id="filtro-venda">
                    <option selected value="selecione">Selecione</option>
                    <option value="lista_produto_venda">Produto</option>
                    <option value="lista_cliente_venda">Cliente</option>
                    <option value="desconto_venda">Desconto</option>
                    <option value="pago_venda">Pago</option>
                    <option value="data_venda">Data</option>
                    <option value="todos_venda">Todos</option>
                </select>
            </div>

            <!-- <label class="col-sm-1 col-form-label"></label> -->
            <div class="col-sm-2" id="selecao-cliente">
                <select class="form-select" aria-label="Default select example" id="valor-filtro-cliente-venda">
                </select>
            </div>

            <div class="col-sm-4">
                <input type="text" class="form-control" name="valor-filtro-venda" placeholder="Informe o nome do produto" id="valor-filtro-venda">
            </div>
            <div class="col-sm-3">
                <button type="button" class="btn btn-primary" id="buscar-venda">Pesquisar</button>
            </div>
            <div class="col-12">
                <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show mt-3" id="recebe-mensagem-campo-vazio-buscar-venda" role="alert">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>
        <!-- Default Table -->
        <table class="table">
            <thead>
                <tr>
                    <th scope="col" class="col-2">Produto</th>
                    <th scope="col" class="col-3">Cliente</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Desconto/Valor</th>
                    <th scope="col">Valor Final</th>
                    <th scope="col">Pago Venda</th>
                    <th scope="col">Pagamento Agendado/Data Agendamento</th>
                    <th scope="col" colspan="3">Opções</th>
                </tr>
            </thead>
            <tbody id="registros-vendas">
            </tbody>
        </table>
        <!-- End Default Table Example -->
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