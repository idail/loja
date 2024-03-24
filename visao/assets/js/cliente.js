$(document).ready(function (e) {
  debugger;
  $("#recebe-mensagem-cadastro-alterar-realizado-cliente").hide();
  $("#recebe-mensagem-cadastro-alterar-sendo-realizada-cliente").hide();
  $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").hide();
  $("#recebe-mensagem-campo-falha-cadastro-alterar-cliente").hide();
  $("#recebe-mensagem-campo-falha-buscar-cliente").hide();

  $("#recebe-mensagem-alterar-realizado-cliente").hide();
  $("#recebe-mensagem-alteraracao-sendo-realizada-cliente").hide();
  $("#recebe-mensagem-campo-vazio-alterar-cliente").hide();
  $("#recebe-mensagem-campo-falha-alterar-cliente").hide();

  $("#recebe-mensagem-campo-vazio-buscar-cliente").hide();

  $("#recebe-mensagem-excluir-realizado-cliente").hide();
  $("#recebe-mensagem-exclusao-sendo-realizada-cliente").hide();
  $("#recebe-mensagem-campo-vazio-excluir-cliente").hide();
  $("#recebe-mensagem-campo-falha-excluir-cliente").hide();

  $("#recebe-mensagem-exclusao-realizado-cliente").hide();
  $("#recebe-mensagem-campo-falha-exclusao-cliente").hide();

  $("#selecao-status").hide();
  let url_atual_cliente = window.location.href;

  if (
    url_atual_cliente ===
    "http://localhost/loja/visao/index.php?pagina=consulta_clientes"
  )
    listarClientes("todos", "todos");

  // jQuery("#telefone-cliente")
  //   .mask("(99) 99999-9999?9")
  //   .focusout(function (event) {
  //     var target, phone, element;
  //     target = event.currentTarget ? event.currentTarget : event.srcElement;
  //     phone = target.value.replace(/\D/g, "");
  //     element = $(target);
  //     element.unmask();
  //     if (phone.length > 10) {
  //       element.mask("(99) 99999-9999");
  //     } else {
  //       element.mask("(99) 99999-9999?");
  //     }
  //   });

  $(function ($) {
    $("#telefone-cliente").mask("(99)99999-9999?9");
    $("#telefone-cliente-edicao").mask("(99)99999-9999?9");
  });
});

function listarClientes(filtroCliente, valorFiltroCliente) {
  debugger;
  $.ajax({
    //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
    url: "../api/ClienteAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_cliente: "recebe_consultar_clientes",
      filtro_cliente: filtroCliente,
      valor_filtro_cliente: valorFiltroCliente,
    },
    success: function (retorno_clientes) {
      debugger;
      if (retorno_clientes.length > 0) {
        if (
          retorno_clientes[0] ===
          "SQLSTATE[42S02]: Base table or view not found: 1146 Table 'painel_administrativo.clientes' doesn't exist"
        ) {
          $("#recebe-mensagem-campo-falha-buscar-cliente").html(
            retorno_clientes[0]
          );
          $("#recebe-mensagem-campo-falha-buscar-cliente").show();
          $("#recebe-mensagem-campo-falha-buscar-cliente").fadeOut(4000);

          $("#exibi-quantidade-clientes").html("Quantidade de clientes:" + 0);
          $("#registros-clientes").append(
            "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
          );
        } else {
          let recebe_tabela_clientes = document.querySelector(
            "#registros-clientes"
          );
          let recebe_quantidade_clientes = retorno_clientes.length;

          $("#exibi-quantidade-clientes").html(
            "Quantidade de clientes:" + recebe_quantidade_clientes
          );

          let recebe_status_cliente = "";

          $("#registros-clientes").html("");
          for (
            let clientes = 0;
            clientes < retorno_clientes.length;
            clientes++
          ) {
            if (retorno_clientes[clientes].status_cliente === 1)
              recebe_status_cliente = "Ativo";
            else recebe_status_cliente = "Inativo";

            recebe_tabela_clientes.innerHTML +=
              "<tr>" +
              "<td>" +
              retorno_clientes[clientes].nome_cliente +
              "</td>" +
              "<td>" +
              retorno_clientes[clientes].telefone_cliente +
              "</td>" +
              "<td>" +
              retorno_clientes[clientes].endereco_cliente +
              "</td>" +
              "<td>" +
              recebe_status_cliente +
              "</td>" +
              "<td><a href='#'><i class='bi bi-person-lines-fill fs-4' title='Editar Cliente' data-bs-toggle='modal' data-bs-target='#edicao-cliente' data-backdrop='static' onclick='carrega_dados_cliente(" +
              retorno_clientes[clientes].codigo_cliente +
              ",event)'></i></a></td>" +
              "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Cliente' onclick=excluiClienteEspecifico(" +
              retorno_clientes[clientes].codigo_cliente +
              ",event)></i></a></td>" +
              "</tr>";
          }
          $("#registros-clientes").append(recebe_tabela_clientes);
        }
      } else {
        $("#exibi-quantidade-clientes").html("Quantidade de clientes:" + 0);
        $("#registros-clientes").append(
          "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
        );
      }
    },
    error: function (xhr, error, status) {},
  });
}

$("#filtro-cliente").change(function (e) {
  e.preventDefault();

  let recebeValorFiltroEscolhido = $(this).val();

  if (recebeValorFiltroEscolhido === "status_cliente") {
    $("#selecao-status").show();
    $("#valor-filtro-cliente").attr("disabled", true);
  } else if (recebeValorFiltroEscolhido === "todos") {
    $("#selecao-status").hide();
    $("#valor-filtro-cliente").attr("disabled", true);
  } else {
    $("#selecao-status").hide();
    $("#valor-filtro-cliente").attr("disabled", false);
  }
});

function excluiClienteEspecifico(recebeCodigoClienteEspecifico, e) {
  e.preventDefault();
  debugger;

  if (recebeCodigoClienteEspecifico != "") {
    let recebeConfirmacaoExcluiClienteEspecifico = window.confirm(
      "Tem certeza que deseja excluir o cliente?"
    );

    if (recebeConfirmacaoExcluiClienteEspecifico) {
      $.ajax({
        url: "../api/ClienteAPI.php",
        type: "DELETE",
        dataType: "json",
        cache: false,
        data: JSON.stringify({
          processo_cliente: "recebe_exclui_cliente",
          valor_codigo_cliente_exclui: recebeCodigoClienteEspecifico,
        }),
        success: function (retorno) {
          debugger;
          if (retorno != "") {
            if (retorno === "Cliente excluido com sucesso") {
              $("#recebe-mensagem-exclusao-realizado-cliente").html(retorno);
              $("#recebe-mensagem-exclusao-realizado-cliente").show();
              $("#recebe-mensagem-exclusao-realizado-cliente").fadeOut(4000);

              listarClientes("todos", "todos");
            } else {
              $("#recebe-mensagem-campo-falha-exclusao-cliente").html(
                "Falha ao excluir cliente:" + retorno
              );
              $("#recebe-mensagem-campo-falha-exclusao-cliente").show();
              $("#recebe-mensagem-campo-falha-exclusao-cliente").fadeOut(4000);
            }
          }
        },
        error: function (xhr, status, error) {
          $("#recebe-mensagem-campo-falha-exclusao-cliente").html(
            "Falha ao excluir cliente:" + error
          );
          $("#recebe-mensagem-campo-falha-exclusao-cliente").show();
          $("#recebe-mensagem-campo-falha-exclusao-cliente").fadeOut(4000);
        },
      });
    }
  }
}

function carrega_dados_cliente(recebe_codigo_cliente, e) {
  e.preventDefault();
  debugger;

  if (recebe_codigo_cliente != "") {
    $.ajax({
      //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
      url: "../api/ClienteAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_cliente: "recebe_consultar_cliente_especifico",
        valor_codigo_cliente: recebe_codigo_cliente,
      },
      success: function (retorno_clientes) {
        debugger;
        if (retorno_clientes != "") {
          $("#nome-cliente-edicao").val(retorno_clientes.nome_cliente);
          $("#telefone-cliente-edicao").val(retorno_clientes.telefone_cliente);
          $("#endereco-cliente-edicao").val(retorno_clientes.endereco_cliente);
          $("#status-cliente-edicao").val(retorno_clientes.status_cliente);
          $("#codigo-cliente-edicao").val(retorno_clientes.codigo_cliente);
        } else {
          $("#recebe-mensagem-campo-falha-alterar-cliente").html(
            "Falha ao buscar cliente:" + retorno_clientes
          );
          $("#recebe-mensagem-campo-falha-alterar-cliente").show();
          $("#recebe-mensagem-campo-falha-alterar-cliente").fadeOut(4000);
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-campo-falha-alterar-cliente").html(
          "Falha ao buscar cliente:" + error
        );
        $("#recebe-mensagem-campo-falha-alterar-cliente").show();
        $("#recebe-mensagem-campo-falha-alterar-cliente").fadeOut(4000);
      },
    });
  }
}

$("#cadastro-cliente").click(function (e) {
  e.preventDefault();
  debugger;
  let recebeNomeCliente = $("#nome-cliente").val();
  let recebeTelefoneCliente = $("#telefone-cliente").val();
  let recebeEnderecoCliente = $("#endereco-cliente").val();
  let recebeStatusCliente = $("#status-cliente").val();

  let formulario_cadastro_cliente = $("#formulario-cadastro-cliente")[0];
  let dados_formulario_cadastro_cliente = new FormData(
    formulario_cadastro_cliente
  );
  dados_formulario_cadastro_cliente.append(
    "processo_cliente",
    "recebe_cadastro_cliente"
  );

  if (
    recebeNomeCliente != "" &&
    recebeTelefoneCliente != "" &&
    recebeEnderecoCliente != "" &&
    recebeStatusCliente != "Selecione"
  ) {
    $.ajax({
      url: "../api/ClienteAPI.php",
      type: "post",
      dataType: "json",
      processData: false,
      contentType: false,
      data: dados_formulario_cadastro_cliente,
      success: function (retorno) {
        debugger;

        if (retorno != "") {
          if (retorno === 1) {
            $("#recebe-mensagem-cadastro-alterar-realizado-cliente").html(
              "Cliente cadastrado com sucesso"
            );
            $("#recebe-mensagem-cadastro-alterar-realizado-cliente").show();
            $("#recebe-mensagem-cadastro-alterar-realizado-cliente").fadeOut(
              4000
            );
          }
        } else {
          $("#recebe-mensagem-campo-falha-cadastro-alterar-cliente").html(
            "Falha ao cadastrar cliente:" + retorno
          );
          $("#recebe-mensagem-campo-falha-cadastro-alterar-cliente").show();
          $("#recebe-mensagem-campo-falha-cadastro-alterar-cliente").fadeOut(
            4000
          );
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-campo-falha-cadastro-alterar-cliente").html(
          "Falha ao cadastrar cliente:" + error
        );
        $("#recebe-mensagem-campo-falha-cadastro-alterar-cliente").show();
        $("#recebe-mensagem-campo-falha-cadastro-alterar-cliente").fadeOut(
          4000
        );
      },
    });
  } else if (recebeNomeCliente === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").html(
      "Favor preencher o campo nome do cliente"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").show();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").fadeOut(4000);
  } else if (recebeTelefoneCliente === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").html(
      "Favor preencher o campo telefone do cliente"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").show();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").fadeOut(4000);
  } else if (recebeEnderecoCliente === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").html(
      "Favor preencher o campo endereço do cliente"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").show();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").fadeOut(4000);
  } else if (recebeStatusCliente === "Selecione") {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").html(
      "Favor selecionar o status do cliente"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").show();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").fadeOut(4000);
  }
});

$("#buscar-cliente").click(function (e) {
  e.preventDefault();
  debugger;
  let recebeFiltroCliente = $("#filtro-cliente").val();

  if (
    recebeFiltroCliente === "nome_cliente" ||
    recebeFiltroCliente === "status_cliente" ||
    recebeFiltroCliente === "todos"
  ) {
    if (recebeFiltroCliente === "nome_cliente") {
      let recebeValorFiltroCliente = $("#valor-filtro-cliente").val();
      if (recebeValorFiltroCliente != "") {
        $.ajax({
          //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
          url: "../api/ClienteAPI.php",
          dataType: "json",
          type: "get",
          data: {
            processo_cliente: "recebe_consultar_clientes",
            filtro_cliente: recebeFiltroCliente,
            valor_filtro_cliente: recebeValorFiltroCliente,
          },
          beforeSend: function () {
            debugger;
            $("#registros-clientes").html("");
            $("#registros-clientes").append(
              "<td colspan='5' class='text-center'>Carregando dados</td>"
            );
            $("#registros-clientes").html("");
          },
          success: function (retorno_clientes) {
            debugger;
            if (retorno_clientes.length > 0) {
              let recebe_tabela_clientes = document.querySelector(
                "#registros-clientes"
              );
              let recebe_quantidade_clientes = retorno_clientes.length;

              $("#exibi-quantidade-clientes").html(
                "Quantidade de clientes:" + recebe_quantidade_clientes
              );

              let recebe_status_cliente = "";
              for (
                let clientes = 0;
                clientes < retorno_clientes.length;
                clientes++
              ) {
                if (retorno_clientes[clientes].status_cliente === 1)
                  recebe_status_cliente = "Ativo";
                else recebe_status_cliente = "Inativo";

                recebe_tabela_clientes.innerHTML +=
                  "<tr>" +
                  "<td>" +
                  retorno_clientes[clientes].nome_cliente +
                  "</td>" +
                  "<td>" +
                  retorno_clientes[clientes].telefone_cliente +
                  "</td>" +
                  "<td>" +
                  retorno_clientes[clientes].endereco_cliente +
                  "</td>" +
                  "<td>" +
                  recebe_status_cliente +
                  "</td>" +
                  "<td><a href='#'><i class='bi bi-person-lines-fill fs-4' title='Editar Cliente' data-bs-toggle='modal' data-bs-target='#edicao-cliente' data-backdrop='static' onclick='carrega_dados_cliente(" +
                  retorno_clientes[clientes].codigo_cliente +
                  ",event)'></i></a></td>" +
                  "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Cliente' onclick=excluiClienteEspecifico(" +
                  retorno_clientes[clientes].codigo_cliente +
                  ",event)></i></a></td>" +
                  "</tr>";
              }
              $("#registros-clientes").append(recebe_tabela_clientes);
            } else {
            }
          },
          error: function (xhr, status, error) {
            console.log(error);
          },
        });
      } else {
        $("#recebe-mensagem-campo-vazio-buscar-cliente").html(
          "Favor preencher o nome que deseja pesquisar"
        );
        $("#recebe-mensagem-campo-vazio-buscar-cliente").show();
        $("#recebe-mensagem-campo-vazio-buscar-cliente").fadeOut(4000);
      }
    } else if (recebeFiltroCliente === "status_cliente") {
      let recebeValorFiltroClienteStatus = $(
        "#valor-filtro-status-cliente"
      ).val();
      if (recebeValorFiltroClienteStatus != "") {
        let recebeValorFiltroStatus = 0;
        $.ajax({
          //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
          url: "../api/ClienteAPI.php",
          dataType: "json",
          type: "get",
          data: {
            processo_cliente: "recebe_consultar_clientes",
            filtro_cliente: recebeFiltroCliente,
            valor_filtro_cliente: recebeValorFiltroClienteStatus,
          },
          beforeSend: function () {
            debugger;
            $("#registros-clientes").html("");
            $("#registros-clientes").append(
              "<td colspan='5' class='text-center'>Carregando dados</td>"
            );
            $("#registros-clientes").html("");
          },
          success: function (retorno_clientes) {
            debugger;
            if (retorno_clientes.length > 0) {
              let recebe_tabela_clientes = document.querySelector(
                "#registros-clientes"
              );
              let recebe_quantidade_clientes = retorno_clientes.length;

              $("#exibi-quantidade-clientes").html(
                "Quantidade de clientes:" + recebe_quantidade_clientes
              );

              let recebe_status_cliente = "";
              for (
                let clientes = 0;
                clientes < retorno_clientes.length;
                clientes++
              ) {
                if (retorno_clientes[clientes].status_cliente === 1)
                  recebe_status_cliente = "Ativo";
                else recebe_status_cliente = "Inativo";

                recebe_tabela_clientes.innerHTML +=
                  "<tr>" +
                  "<td>" +
                  retorno_clientes[clientes].nome_cliente +
                  "</td>" +
                  "<td>" +
                  retorno_clientes[clientes].telefone_cliente +
                  "</td>" +
                  "<td>" +
                  retorno_clientes[clientes].endereco_cliente +
                  "</td>" +
                  "<td>" +
                  recebe_status_cliente +
                  "</td>" +
                  "<td><a href='#'><i class='bi bi-person-lines-fill fs-4' title='Editar Cliente' data-bs-toggle='modal' data-bs-target='#edicao-cliente' data-backdrop='static' onclick='carrega_dados_cliente(" +
                  retorno_clientes[clientes].codigo_cliente +
                  ",event)'></i></a></td>" +
                  "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Cliente' onclick=excluiClienteEspecifico(" +
                  retorno_clientes[clientes].codigo_cliente +
                  ",event)></i></a></td>" +
                  "</tr>";
              }
              $("#registros-clientes").append(recebe_tabela_clientes);
            } else {
            }
          },
          error: function (xhr, status, error) {
            console.log(error);
          },
        });
      } else {
        $("#recebe-mensagem-campo-vazio-buscar-cliente").html(
          "Favor preencher o nome que deseja pesquisar"
        );
        $("#recebe-mensagem-campo-vazio-buscar-cliente").show();
        $("#recebe-mensagem-campo-vazio-buscar-cliente").fadeOut(4000);
      }
    } else if (recebeFiltroCliente === "todos") {
      let recebeValorFiltroCliente = "todos";
      $.ajax({
        //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
        url: "../api/ClienteAPI.php",
        dataType: "json",
        type: "get",
        data: {
          processo_cliente: "recebe_consultar_clientes",
          filtro_cliente: recebeFiltroCliente,
          valor_filtro_cliente: recebeValorFiltroCliente,
        },
        beforeSend: function () {
          debugger;
          $("#registros-clientes").html("");
          $("#registros-clientes").append(
            "<td colspan='5' class='text-center'>Carregando dados</td>"
          );
          $("#registros-clientes").html("");
        },
        success: function (retorno_clientes) {
          debugger;
          if (retorno_clientes.length > 0) {
            let recebe_tabela_clientes = document.querySelector(
              "#registros-clientes"
            );
            let recebe_quantidade_clientes = retorno_clientes.length;

            $("#exibi-quantidade-clientes").html(
              "Quantidade de clientes:" + recebe_quantidade_clientes
            );

            let recebe_status_cliente = "";
            for (
              let clientes = 0;
              clientes < retorno_clientes.length;
              clientes++
            ) {
              if (retorno_clientes[clientes].status_cliente === 1)
                recebe_status_cliente = "Ativo";
              else recebe_status_cliente = "Inativo";

              recebe_tabela_clientes.innerHTML +=
                "<tr>" +
                "<td>" +
                retorno_clientes[clientes].nome_cliente +
                "</td>" +
                "<td>" +
                retorno_clientes[clientes].telefone_cliente +
                "</td>" +
                "<td>" +
                retorno_clientes[clientes].endereco_cliente +
                "</td>" +
                "<td>" +
                recebe_status_cliente +
                "</td>" +
                "<td><a href='#'><i class='bi bi-person-lines-fill fs-4' title='Editar Cliente' data-bs-toggle='modal' data-bs-target='#edicao-cliente' data-backdrop='static' onclick='carrega_dados_cliente(" +
                retorno_clientes[clientes].codigo_cliente +
                ",event)'></i></a></td>" +
                "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Cliente' onclick=excluiClienteEspecifico(" +
                retorno_clientes[clientes].codigo_cliente +
                ",event)></i></a></td>" +
                "</tr>";
            }
            $("#registros-clientes").append(recebe_tabela_clientes);
          } else {
          }
        },
        error: function (xhr, status, error) {
          console.log(error);
        },
      });
    }
  }
});

$("#alterar-cliente").click(function (e) {
  e.preventDefault();
  debugger;

  let recebeNomeClienteAlteracao = $("#nome-cliente-edicao").val();
  let recebeTelefoneClienteAlteracao = $("#telefone-cliente-edicao").val();
  let recebeEnderecoClienteAlteracao = $("#endereco-cliente-edicao").val();
  let recebeStatusClienteAlteracao = $("#status-cliente-edicao").val();

  if (
    recebeNomeClienteAlteracao != "" &&
    recebeTelefoneClienteAlteracao != "" &&
    recebeEnderecoClienteAlteracao != "" &&
    recebeStatusClienteAlteracao != ""
  ) {
    let valores_formulario_cliente_alteracao = $(
      "#formulario-alteracao-cliente"
    )[0];
    let dados_formulario_cliente_alteracao = new FormData(
      valores_formulario_cliente_alteracao
    );
    dados_formulario_cliente_alteracao.append(
      "processo_cliente",
      "recebe_alteracao_cliente"
    );
    dados_formulario_cliente_alteracao.append("metodo", "PUT");
    $.ajax({
      url: "../api/ClienteAPI.php",
      type: "post",
      dataType: "json",
      processData: false,
      contentType: false,
      data: dados_formulario_cliente_alteracao,
      success: function (retorno) {
        debugger;
        if (retorno != "") {
          if (retorno === "Cliente alterado com sucesso") {
            $("#recebe-mensagem-alterar-realizado-cliente").html(
              "Cliente alterado com sucesso"
            );
            $("#recebe-mensagem-alterar-realizado-cliente").show();
            $("#recebe-mensagem-alterar-realizado-cliente").fadeOut(4000);

            listarClientes("todos", "todos");
          } else {
            $("#recebe-mensagem-campo-falha-alterar-cliente").html(
              "Falha ao alterar cliente:" + retorno
            );
            $("#recebe-mensagem-campo-falha-alterar-cliente").show();
            $("#recebe-mensagem-campo-falha-alterar-cliente").fadeOut(4000);
          }
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-campo-falha-alterar-cliente").html(
          "Falha ao alterar cliente:" + error
        );
        $("#recebe-mensagem-campo-falha-alterar-cliente").show();
        $("#recebe-mensagem-campo-falha-alterar-cliente").fadeOut(4000);
      },
    });
  } else if (recebeNomeClienteAlteracao === "") {
    $("#recebe-mensagem-campo-vazio-alterar-cliente").html(
      "Favor preencher o campo nome cliente"
    );
    $("#recebe-mensagem-campo-vazio-alterar-cliente").show();
    $("#recebe-mensagem-campo-vazio-alterar-cliente").fadeOut(4000);
  } else if (recebeTelefoneClienteAlteracao === "") {
    $("#recebe-mensagem-campo-vazio-alterar-cliente").html(
      "Favor preencher o campo telefone cliente"
    );
    $("#recebe-mensagem-campo-vazio-alterar-cliente").show();
    $("#recebe-mensagem-campo-vazio-alterar-cliente").fadeOut(4000);
  } else if (recebeEnderecoClienteAlteracao === "") {
    $("#recebe-mensagem-campo-vazio-alterar-cliente").html(
      "Favor preencher o campo endereço cliente"
    );
    $("#recebe-mensagem-campo-vazio-alterar-cliente").show();
    $("#recebe-mensagem-campo-vazio-alterar-cliente").fadeOut(4000);
  } else if (recebeStatusClienteAlteracao === "") {
    $("#recebe-mensagem-campo-vazio-alterar-cliente").html(
      "Favor selecionar o status do cliente"
    );
    $("#recebe-mensagem-campo-vazio-alterar-cliente").show();
    $("#recebe-mensagem-campo-vazio-alterar-cliente").fadeOut(4000);
  }
});
