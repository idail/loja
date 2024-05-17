$(document).ready(function () {
  let url_venda = window.location.href;

  if (
    url_venda === "http://localhost/loja/visao/index.php?pagina=cadastro_venda"
  ) {
    $("#exibe-informacao-qtd-produtos-estoque").hide();
    debugger;

    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/ProdutoAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_produto: "recebe_consultar_produtos",
        filtro_produto: "todos",
        valor_filtro_produto: "todos",
      },
      //   beforeSend: function () {
      //     debugger;
      //     $("#registros-produtos").html("");
      //     $("#registros-produtos").append(
      //       "<td colspan='5' class='text-center'>Carregando dados</td>"
      //     );
      //     $("#registros-produtos").html("");
      //   },
      success: function (retorno_produtos) {
        debugger;
        if (retorno_produtos.length > 0) {
          $("#lista-produto").html("");
          $("#lista-produto").append(
            "<option value='selecione'>Selecione</option>"
          );
          $.each(retorno_categorias, function (i, element) {
            $("#lista-produto").append(
              "<option value=" +
                element.nome_produto.toLowerCase() +
                ">" +
                element.nome_produto +
                "</option>"
            );
          });
        } else {
          $("#lista-produto").html("");
          $("#lista-produto").append(
            "<option value='selecione'>Selecione</option>"
          );
        }
      },
      error: function (xhr, status, error) {},
    });

    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/ClienteAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_cliente: "recebe_consultar_clientes",
        filtro_cliente: "todos",
        valor_filtro_cliente: "todos",
      },
    //   beforeSend: function () {
    //     debugger;
    //     $("#registros-clientes").html("");
    //     $("#registros-clientes").append(
    //       "<td colspan='5' class='text-center'>Carregando dados</td>"
    //     );
    //     $("#registros-clientes").html("");
    //   },
      success: function (retorno_clientes) {
        debugger;
        if (retorno_clientes.length > 0) {
          $("#lista-cliente").html("");
          $("#lista-cliente").append(
            "<option value='selecione'>Selecione</option>"
          );
          $.each(retorno_categorias, function (i, element) {
            $("#lista-cliente").append(
              "<option value=" +
                element.nome_produto.toLowerCase() +
                ">" +
                element.nome_produto +
                "</option>"
            );
          });
        } else {
          $("#lista-cliente").html("");
          $("#lista-cliente").append(
            "<option value='selecione'>Selecione</option>"
          );
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-falha-buscar-clientes-filtro").html(
          "Falha ao buscar clientes:" + error
        );
        $("#recebe-mensagem-falha-buscar-clientes-filtro").show();
        $("#recebe-mensagem-falha-buscar-clientes-filtro").fadeOut(4000);
      },
    });
  }
});
