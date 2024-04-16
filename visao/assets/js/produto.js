$(document).ready(function (e) {
  $("#recebe-mensagem-cadastro-alterar-realizado-produto").hide();
  $("#recebe-mensagem-cadastro-alterar-sendo-realizada-produto").hide();
  $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").hide();
  $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").hide();

  $("#recebe-mensagem-falha-buscar-produto-filtro").hide();
  $("#recebe-mensagem-campo-falha-buscar-produto").hide();
  $("#recebe-mensagem-exclusao-realizado-produto").hide();
  $("#recebe-mensagem-campo-falha-exclusao-produto").hide();
  $("#recebe-mensagem-campo-vazio-buscar-produto").hide();

  $("img.checkable").imgCheckbox();

  let recebe_url_atual_produtos = window.location.href;

  if (
    recebe_url_atual_produtos ===
    "http://localhost/loja/visao/index.php?pagina=consulta_produtos"
  ) {
    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/CategoriaAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_categoria: "recebe_consultar_categorias",
      },
      // beforeSend: function () {
      //   debugger;
      //   $("#registros-clientes").html("");
      //   $("#registros-clientes").append(
      //     "<td colspan='5' class='text-center'>Carregando dados</td>"
      //   );
      //   $("#registros-clientes").html("");
      // },
      success: function (retorno_categorias) {
        debugger;
        if (retorno_categorias.length > 0) {
          $("#valor-filtro-categoria-produto").html("");
          $("#valor-filtro-categoria-produto").append(
            "<option value='selecione'>Selecione</option>"
          );
          $.each(retorno_categorias, function (i, element) {
            $("#valor-filtro-categoria-produto").append(
              "<option value=" +
                element.nome_categoria.toLowerCase() +
                ">" +
                element.nome_categoria +
                "</option>"
            );
          });
        } else {
        }
      },
      error: function (xhr, status, error) {},
    });

    listarProdutos("todos", "todos");
    $("#valor-filtro-produto").attr("disabled", true);
    $("#buscar-produto").attr("disabled", true);
  }
});

function listarProdutos(filtroProduto, valorFiltroProduto) {
  $.ajax({
    //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
    url: "../api/ProdutoAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_produto: "recebe_consultar_produtos",
      filtro_produto: filtroProduto,
      valor_filtro_produto: valorFiltroProduto,
    },
    beforeSend: function () {
      debugger;
      $("#registros-produtos").html("");
      $("#registros-produtos").append(
        "<td colspan='5' class='text-center'>Carregando dados</td>"
      );
      $("#registros-produtos").html("");
    },
    success: function (retorno_produtos) {
      debugger;
      if (retorno_produtos.length > 0) {
        let recebe_tabela_produtos = document.querySelector(
          "#registros-produtos"
        );

        let recebe_quantidade_produtos = retorno_produtos.length;

        $("#exibi-quantidade-produtos").html(
          "Quantidade de produtos:" + recebe_quantidade_produtos
        );

        for (let produtos = 0; produtos < retorno_produtos.length; produtos++) {
          recebe_tabela_produtos.innerHTML +=
            "<tr>" +
            "<td>" +
            retorno_produtos[produtos].categoria_produto +
            "</td>" +
            "<td>" +
            retorno_produtos[produtos].nome_produto +
            "</td>" +
            "<td>" +
            retorno_produtos[produtos].estoque_produto +
            "</td>" +
            "<td>" +
            retorno_produtos[produtos].valor_produto +
            "</td>" +
            "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_produto(" +
            retorno_produtos[produtos].codigo_produto +
            ",event)'></a></i></td>" +
            "<td><a href='#'><i class='bi bi-card-list fs-4' title='Alterar Produto' data-bs-toggle='modal' data-bs-target='#alterar-produto' data-backdrop='static'></i></a></td>" +
            "<td>Excluir</td>" +
            "</tr>";
        }
        $("#registros-produtos").append(recebe_tabela_produtos);
      } else {
        $("#exibi-quantidade-produtos").html("Quantidade de produtos:" + 0);
        $("#registros-produtos").append(
          "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
        );
      }
    },
    error: function (xhr, status, error) {},
  });
}

function carrega_imagens_produto(recebe_codigo_produto_imagens, e) {
  e.preventDefault();
  debugger;

  if (recebe_codigo_produto_imagens != "") {
    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/ProdutoAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_produto: "recebe_consultar_imagens_produto",
        valor_codigo_imagens_produto: recebe_codigo_produto_imagens,
      },
      success: function (retorno_imagens_produto) {
        debugger;

        if (retorno_imagens_produto.length > 0) {
          $("#exibi-imagens-produtos-cadastrados").html("");
          for (let index = 0; index < retorno_imagens_produto.length; index++) {
            const arquivo = new File(
              [retorno_imagens_produto[index].imagem],
              retorno_imagens_produto[index].imagem,
              {
                type: "image/jpg",
              }
            );

            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(arquivo);
            //campo_imagem_usuario.files = dataTransfer.files;

            // document.getElementById("exibi-foto-perfil").src =
            //   "acesso/imagem_perfil/" + retorno.imagem_usuario;

            $("#exibi-imagens-produtos-cadastrados").append("<img src='produtos/imagens_produto/" + retorno_imagens_produto[index].imagem + "' style='height:80px;margin-right:10px;margin-right: 10px;margin-top: 17px;margin-bottom: 15px;'/>");
          }
        }
      },
      error: function (xhr, status, error) {},
    });
  }
}

var dados_imagens_produtos = Array();

//var quantidade_imagens_galeria;

var imagens_produtos = Array();

$("#imagens-produtos").change(function (e) {
  e.preventDefault();
  //debugger;
  var arquivo_selecionado = e.target.files;

  if (arquivo_selecionado != "") {
    //quantidade_imagens_galeria = arquivo_selecionado.length;

    if (arquivo_selecionado && arquivo_selecionado[0]) {
      for (let i = 0; i < arquivo_selecionado.length; i++) {
        //debugger;

        var valores_imagens = { imagem: arquivo_selecionado[i].name };

        imagens_produtos.push(valores_imagens);
      }
    }

    $.each(arquivo_selecionado, function (i, file) {
      //debugger;
      //imagens_galeria.push(i);
      dados_imagens_produtos.push(file);

      var reader = new FileReader();
      reader.readAsDataURL(file);

      //console.log("Registro:" + reader);

      reader.onload = function (e) {
        //debugger;

        // for (i = 0; i < numeros.length; i++) {
        //     console.log(numeros[i]);
        // }
        // console.log("Numeros:" + i);
        // console.log(e);
        var template =
          // '<div class="form-group">' +
          '<img src="' +
          e.target.result +
          '" style="height:80px;margin-right:10px;" id="imagem' +
          i +
          '"></img><br>' +
          // '<label for="exampleFormControlTextarea1">Insira a descrição desejada:</label>' +
          // '<textarea class="form-control" id="valor' + i + '" rows="3" name="texto_descricao' + i + '"></textarea>' +
          '<input type="hidden" name="quantidade_itens_selecionados" value="' +
          imagens_produtos.length +
          '" id="quantidade-imagens-galeria-selecionadas"/>';
        //   "</div>";

        // '<form action="/upload">'+
        // '<img src="' + e.target.result + '" style="height:80px;"> ' +
        // +'<textarea rows="3"></textarea>';
        //     '<div class="form-group">'+
        //         +'<label for="exampleFormControlTextarea1">Insira a descrição desejada:</label>'+

        //     +'</div>'
        // '<label>Image Title</label> <input type="text" name="title">'+
        // ' <button class="btn btn-sm btn-info upload">Upload</button>'+
        // ' <a href="#" class="btn btn-sm btn-danger remove">Remove</a>'+
        // '</form>';

        $("#exibi-imagens-produtos").append(template);
      };
    });
  }
});

$("#filtro-produto").change(function (e) {
  debugger;
  let recebeValorFiltroEscolhido = $(this).val();

  if (recebeValorFiltroEscolhido === "selecione") {
    $("#selecao-status").hide();
    $("#valor-filtro-categoria-produto").attr("disabled", true);
    $("#valor-filtro-produto").attr("disabled", true);
    $("#buscar-produto").attr("disabled", true);
  } else if (recebeValorFiltroEscolhido === "categoria_produto") {
    $("#selecao-status").show();
    $("#valor-filtro-categoria-produto").attr("disabled", false);
    $("#valor-filtro-produto").attr("disabled", true);
    $("#buscar-produto").attr("disabled", false);
  } else if (recebeValorFiltroEscolhido === "nome_produto") {
    $("#selecao-status").hide();
    $("#valor-filtro-categoria-produto").attr("disabled", true);
    $("#valor-filtro-produto").attr("disabled", false);
    $("#buscar-produto").attr("disabled", false);
  } else {
    $("#selecao-status").hide();
    $("#valor-filtro-cliente").attr("disabled", true);
    $("#buscar-produto").attr("disabled", false);
    $("#valor-filtro-produto").attr("disabled", true);
  }
});

$("#buscar-produto").click(function (e) {
  e.preventDefault();

  let recebeFiltroProduto = $("#filtro-produto").val();

  if (recebeFiltroProduto === "categoria_produto") {
    let recebeValorFiltroCategoriaProduto = $(
      "#valor-filtro-categoria-produto"
    ).val();

    if (recebeValorFiltroCategoriaProduto != "") {
      $.ajax({
        //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
        url: "../api/ProdutoAPI.php",
        dataType: "json",
        type: "get",
        data: {
          processo_produto: "recebe_consultar_produtos",
          filtro_produto: recebeFiltroProduto,
          valor_filtro_produto: recebeValorFiltroCategoriaProduto,
        },
        beforeSend: function () {
          debugger;
          $("#registros-produtos").html("");
          $("#registros-produtos").append(
            "<td colspan='5' class='text-center'>Carregando dados</td>"
          );
          $("#registros-produtos").html("");
        },
        success: function (retorno_produtos) {
          debugger;
          if (retorno_produtos.length > 0) {
            let recebe_tabela_produtos = document.querySelector(
              "#registros-produtos"
            );

            let recebe_quantidade_produtos = retorno_produtos.length;

            $("#exibi-quantidade-produtos").html(
              "Quantidade de produtos:" + recebe_quantidade_produtos
            );

            for (
              let produtos = 0;
              produtos < retorno_produtos.length;
              produtos++
            ) {
              recebe_tabela_produtos.innerHTML +=
                "<tr>" +
                "<td>" +
                retorno_produtos[produtos].categoria_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].nome_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].estoque_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].valor_produto +
                "</td>" +
                "<td><i class='bi bi-card-image' title='Ver Imagens'></i></td>" +
                "<td>Alterar</td>" +
                "<td>Excluir</td>" +
                "</tr>";
            }
            $("#registros-produtos").append(recebe_tabela_produtos);
          } else {
            $("#exibi-quantidade-produtos").html("Quantidade de produtos:" + 0);
            $("#registros-produtos").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );
          }
        },
        error: function (xhr, status, error) {},
      });
    }
  } else if (recebeFiltroProduto === "nome_produto") {
    let recebeValorFiltroProduto = $("#valor-filtro-produto").val();

    if (recebeValorFiltroProduto != "") {
      $.ajax({
        //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
        url: "../api/ProdutoAPI.php",
        dataType: "json",
        type: "get",
        data: {
          processo_produto: "recebe_consultar_produtos",
          filtro_produto: recebeFiltroProduto,
          valor_filtro_produto: recebeValorFiltroProduto,
        },
        beforeSend: function () {
          debugger;
          $("#registros-produtos").html("");
          $("#registros-produtos").append(
            "<td colspan='5' class='text-center'>Carregando dados</td>"
          );
          $("#registros-produtos").html("");
        },
        success: function (retorno_produtos) {
          debugger;
          if (retorno_produtos.length > 0) {
            let recebe_tabela_produtos = document.querySelector(
              "#registros-produtos"
            );

            let recebe_quantidade_produtos = retorno_produtos.length;

            $("#exibi-quantidade-produtos").html(
              "Quantidade de produtos:" + recebe_quantidade_produtos
            );

            for (
              let produtos = 0;
              produtos < retorno_produtos.length;
              produtos++
            ) {
              recebe_tabela_produtos.innerHTML +=
                "<tr>" +
                "<td>" +
                retorno_produtos[produtos].categoria_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].nome_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].estoque_produto +
                "</td>" +
                "<td>" +
                retorno_produtos[produtos].valor_produto +
                "</td>" +
                "<td>Ver Imagens</td>" +
                "<td>Alterar</td>" +
                "<td>Excluir</td>" +
                "</tr>";
            }
            $("#registros-produtos").append(recebe_tabela_produtos);
          } else {
            $("#exibi-quantidade-produtos").html("Quantidade de produtos:" + 0);
            $("#registros-produtos").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );
          }
        },
        error: function (xhr, status, error) {},
      });
    }
  } else {
    let recebeValorFiltroProduto = "todos";

    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/ProdutoAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_produto: "recebe_consultar_produtos",
        filtro_produto: recebeFiltroProduto,
        valor_filtro_produto: recebeValorFiltroProduto,
      },
      beforeSend: function () {
        debugger;
        $("#registros-produtos").html("");
        $("#registros-produtos").append(
          "<td colspan='5' class='text-center'>Carregando dados</td>"
        );
        $("#registros-produtos").html("");
      },
      success: function (retorno_produtos) {
        debugger;
        if (retorno_produtos.length > 0) {
          let recebe_tabela_produtos = document.querySelector(
            "#registros-produtos"
          );

          let recebe_quantidade_produtos = retorno_produtos.length;

          $("#exibi-quantidade-produtos").html(
            "Quantidade de produtos:" + recebe_quantidade_produtos
          );

          for (
            let produtos = 0;
            produtos < retorno_produtos.length;
            produtos++
          ) {
            recebe_tabela_produtos.innerHTML +=
              "<tr>" +
              "<td>" +
              retorno_produtos[produtos].categoria_produto +
              "</td>" +
              "<td>" +
              retorno_produtos[produtos].nome_produto +
              "</td>" +
              "<td>" +
              retorno_produtos[produtos].estoque_produto +
              "</td>" +
              "<td>" +
              retorno_produtos[produtos].valor_produto +
              "</td>" +
              "<td>Ver Imagens</td>" +
              "<td>Alterar</td>" +
              "<td>Excluir</td>" +
              "</tr>";
          }
          $("#registros-produtos").append(recebe_tabela_produtos);
        } else {
          $("#exibi-quantidade-produtos").html("Quantidade de produtos:" + 0);
          $("#registros-produtos").append(
            "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
          );
        }
      },
      error: function (xhr, status, error) {},
    });
  }
});

$("#cadastro-produto").click(function (e) {
  e.preventDefault();

  debugger;

  let recebeCategoriaProduto = $("#categoria-produto").val();

  let recebeNomeProduto = $("#nome-produto").val();

  let recebeEstoqueProduto = $("#estoque-produto").val();

  let recebeValorProduto = $("#valor-produto").val();

  if (
    recebeCategoriaProduto != "selecione" &&
    recebeNomeProduto != "" &&
    recebeEstoqueProduto != "" &&
    recebeValorProduto != "" &&
    imagens_produtos.length > 0
  ) {
    let dados_formulario_cadastro_produto = $(
      "#formulario-cadastro-produto"
    )[0];

    let dados_produto = new FormData(dados_formulario_cadastro_produto);

    dados_produto.append("processo_produto", "recebe_cadastro_produto");
    dados_produto.append("processo_imagem", "recebe_cadastro_imagem");

    $.ajax({
      type: "post",
      // enctype: "multipart/form-data",
      dataType: "json",
      //http://localhost/engenharia_testando/final/controladora/ImagemControladora.php
      url: "../api/ProdutoAPI.php",
      cache: false,
      processData: false,
      contentType: false,
      data: dados_produto,

      success: function (resultado) {
        debugger;

        dados_produto.append("recebe_codigo_produto", resultado);
        if (resultado > 0) {
          $.ajax({
            type: "post",
            enctype: "multipart/form-data",
            dataType: "json",
            //http://localhost/engenharia_testando/final/controladora/ImagemControladora.php
            url: "../api/ImagemAPI.php",
            cache: false,
            processData: false,
            contentType: false,
            data: dados_produto,
            success: function (retorno) {
              debugger;
              if (retorno > 0) {
                $("#recebe-mensagem-cadastro-alterar-realizado-produto").html(
                  "Produto cadastrado com sucesso"
                );
                $("#recebe-mensagem-cadastro-alterar-realizado-produto").show();
                $(
                  "#recebe-mensagem-cadastro-alterar-realizado-produto"
                ).fadeOut(4000);
              } else {
                $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").html(
                  "Falha ao cadastrar produto"
                );
                $(
                  "#recebe-mensagem-campo-falha-cadastro-alterar-produto"
                ).show();
                $(
                  "#recebe-mensagem-campo-falha-cadastro-alterar-produto"
                ).fadeOut(4000);
              }
            },
            error: function (xhr, status, error) {
              $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").html(
                "Falha ao cadastrar produto:" + error
              );
              $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").show();
              $(
                "#recebe-mensagem-campo-falha-cadastro-alterar-produto"
              ).fadeOut(4000);
            },
          });
        } else {
          $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").html(
            "Falha ao cadastrar produto"
          );
          $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").show();
          $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").fadeOut(
            4000
          );
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").html(
          "Falha ao cadastrar produto:" + error
        );
        $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").show();
        $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").fadeOut(
          4000
        );
      },
    });
  } else if (recebeCategoriaProduto === "selecione") {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html(
      "Favor selecionar a categoria do produto"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
  } else if (recebeNomeProduto === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html(
      "Favor informar o nome do produto"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
  } else if (recebeEstoqueProduto === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html(
      "Favor informar o estoque do produto"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
  } else if (recebeValorProduto === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html(
      "Favor informar o valor do produto"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
  } else if (imagens_produtos.length === 0) {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html(
      "Favor selecionar as imagens que queira do produto"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
  }
});
