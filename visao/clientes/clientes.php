<div class="col-lg-12">

    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Cadastro de Cliente</h5>

            <!-- General Form Elements -->
            <form id="formulario-cadastro-cliente">
                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputText" class="col-sm-2 col-form-label">Nome</label>
                        <input type="text" class="form-control" name="nome-cliente" placeholder="Informe o nome do cliente" id="nome-cliente">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Telefone</label>
                        <input type="text" class="form-control" name="telefone-cliente" placeholder="Informe o telefone do cliente" id="telefone-cliente">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-10 col-lg-7">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Endereço</label>
                        <input type="text" class="form-control" name="endereco-cliente" placeholder="Informe o endereço do cliente" id="endereco-cliente">
                    </div>
                </div>

                <div class="row mb-3">

                    <div class="col-sm-10 col-lg-7">
                        <label class="col-sm-2 col-form-label">Cliente</label>
                        <select class="form-select" aria-label="Default select example" name="status-cliente" id="status-cliente">
                            <option selected>Selecione</option>
                            <option value="1">Ativo</option>
                            <option value="2">Inativo</option>
                        </select>
                    </div>
                </div>



                <div class="row mb-3">
                    <!-- <label class="col-sm-2 col-form-label">Submit Button</label> -->
                    <div class="col-sm-10">
                        <button type="button" class="btn btn-primary" id="cadastro-cliente">Cadastrar</button>
                        <button type="button" class="btn btn-secondary">Limpar</button>
                    </div>
                </div>

            </form><!-- End General Form Elements -->

        </div>
    </div>

</div>