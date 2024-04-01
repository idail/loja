$(document).ready(function (e) {
    $("#recebe-mensagem-cadastro-realizado-categoria").hide();
    $("#recebe-mensagem-campo-vazio-cadastro-categoria").hide();
    $("#recebe-mensagem-campo-falha-cadastro-categoria").hide();
});

$("#cadastro-categoria").click(function (e) {
    e.preventDefault();

    let recebeNomeCategoria = $("#nome-categoria").val();

    let formulario_cadastro_categoria = $("#formulario-cadastro-categoria")[0];

    let dados_formulario_cadastro_categoria = new FormData(formulario_cadastro_categoria);

    dados_formulario_cadastro_categoria.append("processo_categoria","recebe_cadastro_categoria");

    if (recebeNomeCategoria != "") {
        $.ajax({
            url: "../api/CategoriaAPI.php",
            type: "post",
            dataType: "json",
            processData: false,
            contentType: false,
            data: dados_formulario_cadastro_categoria,
            success: function (retorno) {
                debugger;
                if(retorno > 0)
                {
                    $("#recebe-mensagem-cadastro-realizado-categoria").html("Categoria cadastrada com sucesso");
                    $("#recebe-mensagem-cadastro-realizado-categoria").show();
                    $("#recebe-mensagem-cadastro-realizado-categoria").fadeOut(4000);
                }else{
                    $("#recebe-mensagem-campo-falha-cadastro-categoria").html("Falha ao cadastrar categoria:" + error);
                    $("#recebe-mensagem-campo-falha-cadastro-categoria").show();
                    $("#recebe-mensagem-campo-falha-cadastro-categoria").fadeOut(4000);
                }
            },
            error: function (xhr, status, error) {
                $("#recebe-mensagem-campo-falha-cadastro-categoria").html("Falha ao cadastrar categoria:" + error);
                $("#recebe-mensagem-campo-falha-cadastro-categoria").show();
                $("#recebe-mensagem-campo-falha-cadastro-categoria").fadeOut(4000);
            },
        });
    } else {
        $("#recebe-mensagem-campo-vazio-cadastro-categoria").html("Favor preencher a categoria");
        $("#recebe-mensagem-campo-vazio-cadastro-categoria").show();
        $("#recebe-mensagem-campo-vazio-cadastro-categoria").fadeOut(4000);
    }
});