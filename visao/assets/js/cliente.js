$(document).ready(function (e) {
  debugger;
  $("#recebe-mensagem-cadastro-alterar-realizado-cliente").hide();
  $("#recebe-mensagem-cadastro-alterar-sendo-realizada-cliente").hide();
  $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").hide();
  $("#recebe-mensagem-campo-falha-cadastro-alterar-cliente").hide();
  $("#recebe-mensagem-campo-falha-buscar-cliente").hide();
  $("#recebe-mensagem-falha-buscar-clientes-filtro").hide();

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


  recebe_titulo_cliente_pesquisado_continuar_exibicao_excluindo_clientes =
    "";

  recebe_filtro_selecionado_cliente_pesquisado_continuar_exibicao_excluindo_clientes =
    "";

  recebe_status_cliente_pesquisado_continuar_exibicao_excluindo_clientes =
    "";

  recebe_filtro_selecionado_status_pesquisado_continuar_exibicao_excluindo_clientes =
    "";

  debugger;
  dados_clientes = "";
  tamanhoPagina = 10;
  pagina = 0;
  max_links = 2;
  recebe_filtro_selecionado_clientes = "";
  recebe_valor_filtro_informado_clientes = "";

  $("#proximo-clientes").click(function () {
    if (pagina < dados_medicos.length / tamanhoPagina - 1) {
      pagina++;
      paginar_proximo_clientes();
      ajustarBotoes();
    }
  });

  $("#anterior-clientes").click(function () {
    if (pagina > 0) {
      pagina--;
      paginar_anterior_clientes();
      ajustarBotoes();
    }
  });

  function ajustarBotoes() {
    debugger;
    $("#proximo-clientes").prop(
      "disabled",
      dados_clientes.length <= tamanhoPagina ||
        pagina >= Math.ceil(dados_clientes.length / tamanhoPagina) - 1
    );
    $("#anterior-clientes").prop(
      "disabled",
      dados_clientes.length <= tamanhoPagina || pagina == 0
    );
  }

  if (
    url_atual_cliente ===
    "https://www.idailneto.com.br/loja/visao/index.php?pagina=consulta_clientes"
  ) {
    listarClientes("todos", "todos");
    $("#valor-filtro-cliente").attr("disabled", true);
    $("#buscar-cliente").attr("disabled", true);

    recebe_filtro_selecionado_clientes = "todos";
  }

  // Maskara para funcionamento do telefone
  $(function ($) {
    $("#telefone-cliente").mask("(99)99999-9999?");
    $("#telefone-cliente-edicao").mask("(99)99999-9999?");
  });

  function paginar_anterior_clientes() {
    debugger;

    if (recebe_filtro_selecionado_clientes === "todos") {
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
            dados_clientes = retorno_clientes;
            for (
              var clientes = pagina * tamanhoPagina;
              clientes < retorno_clientes.length &&
              clientes < (pagina + 1) * tamanhoPagina;
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
                retorno_clientes[clientes].email_cliente +
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

            $("#numeracao").text(
              "Página " +
                (pagina + 1) +
                " de " +
                Math.ceil(retorno_clientes.length / tamanhoPagina)
            );
          } else {
            $("#exibi-quantidade-clientes").html("Quantidade de clientes:" + 0);
            $("#registros-clientes").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );

            if (pagina == 0) {
              $("#numeracao").text("Página " + (pagina + 1) + " de 1");
            } else {
              $("#numeracao").text(
                "Página " +
                  (pagina + 1) +
                  " de " +
                  Math.ceil(retorno_clientes.length / tamanhoPagina)
              );
            }
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
    } else if (recebe_filtro_selecionado_clientes === "nome_cliente") {
      debugger;
      $.ajax({
        // url: "http://localhost/software-medicos/api/ProtocolosAPI.php",
        url: "../../api/MedicosAPI.php",
        dataType: "json",
        type: "get",
        // async: false,
        // contentType: "application/json",
        data: {
          processo_protocolos_medicos: "exibir_protocolos_medicos",
          recebe_filtro_protocolo_medicos:
            recebe_filtro_selecionado_protocolos_medicos,
          recebe_busca_protocolo_medicos:
            recebe_valor_filtro_informado_protocolos_medicos,
        },
        success: function (retorno_medicos) {
          //e.preventDefault();
          debugger;
          //e declarada a variavel recebe_tabela que com o seletor do jquery recebe o elemento com id registros_protocolos
          let recebe_tabela_medicos = document.querySelector(
            "#registros-protocolos-medicos"
          );
          //e verificado se o valor de retorno e diferente de vazio e sendo entrara no if
          if (retorno_medicos != "") {
            //e declarada a variavel recebe_quantidade_registros que ira receber a quantidade de registros de protocolos
            //que foi retornado na busca do banco de dados
            let recebe_quantidade_registros = retorno_medicos.length;
            //com o seletor do jquery e atribuido via html a mensagem abaixo + o valor da variavel recebe_quantidade_registros
            $("#exibi-quantidade-protocolos-medicos").html(
              "Quantidade de protocolos médicos:" + recebe_quantidade_registros
            );
            //com o seletor do jquery e efetuada a limpeza do elemento com id registros_protocolos
            $("#registros-protocolos-medicos").html("");
            //e percorrido com laco de repeticao os registros na variavel retorno
            dados_medicos = retorno_medicos;
            for (
              var indice = pagina * tamanhoPagina;
              indice < retorno_medicos.length &&
              indice < (pagina + 1) * tamanhoPagina;
              indice++
            ) {
              visualizacao_video = "";
              if (retorno_medicos[indice].video_protocolo != null) {
                visualizacao_video =
                  "<td><a href='" +
                  retorno_medicos[indice].video_protocolo +
                  "' id='visualiza-video-protocolo'><i class='fas fa-video fa-lg' title='" +
                  retorno_medicos[indice].video_protocolo +
                  "'></i></a></td>";
              } else {
                visualizacao_video =
                  "<td><a id=''><i class='fas fa-video-slash fa-lg' title='Sem Vídeo'></i></a></td>";
              }

              visualiza_arquivo_pdf = "";
              if (retorno_medicos[indice].protocolo != null) {
                visualiza_arquivo_pdf =
                  "<td><a href='https://sti.med.br/visao/protocolos/visualiza_pdf/web/viewer.html?file=" +
                  retorno_medicos[indice].protocolo +
                  "' class='col-1' target='_blank'><i class='far fa-file-pdf fa-lg' title='" +
                  retorno_medicos[indice].protocolo +
                  "'></i></a></td>";
              } else {
                visualiza_arquivo_pdf =
                  "<td><a id=''><i class='fas fa-eye-slash fa-lg ml-1' title='Sem Arquivo'></i></a></td>";
              }
              //e atributio a variavel que recebe a tabela incrementando os registros do banco de dados montando o codigo html informado abaixo
              recebe_tabela_medicos.innerHTML +=
                "<tr>" +
                "<td>" +
                retorno_medicos[indice].titulo_protocolo +
                "</td>" +
                visualiza_arquivo_pdf +
                visualizacao_video +
                "<td class=" +
                recebe_class_ocultar_campos_usuario_nao_administrador_geral +
                recebe_class_desabilitar_alteracoes_sistema +
                "><a href='https://www.sti.med.br/visao/index.php?pagina=cadastro_protocolo&departamento=medicos&codigo_protocolo=" +
                retorno_medicos[indice].codigo_protocolo +
                "'>" +
                "<i class='fas fa-edit fa-lg' title='Alterar Protocolo'></i></a>" +
                "</td>" +
                "<td class=" +
                recebe_class_ocultar_campos_usuario_nao_administrador_geral +
                recebe_class_desabilitar_alteracoes_sistema +
                "><a href='#' onclick=desabilitar_registro_protocolo_medicos(" +
                retorno_medicos[indice].codigo_protocolo +
                "," +
                retorno_medicos[indice].codigo_usuario_protocolo +
                ",event);>" +
                "<i class='fas fa-trash-alt fa-lg' title='Desabilitar Protocolo'></i></a>" +
                "</td>" +
                "</td>" +
                "<td class=" +
                recebe_class_ocultar_campos_usuario_nao_administrador_geral +
                recebe_class_desabilitar_alteracoes_sistema +
                ">" +
                "<a href='#' onclick=excluir_protocolo_medicos(" +
                retorno_medicos[indice].codigo_protocolo +
                ",event);>" +
                "<i class='fas fa-trash-alt fa-lg' title='Excluir Protocolo'></i></a>" +
                "</td>" +
                "<input type='hidden' value='" +
                retorno_medicos[indice].video_protocolo +
                "' id='link-video-protocolo'/>" +
                "<tr>";
            }

            //com o seletor do jquery e adicionado os valores da variavel recebe_tabela no corpo da tabela de registros de protocolos
            $("#registros-protocolos-medicos").append(recebe_tabela_medicos);

            $("#numeracao").text(
              "Página " +
                (pagina + 1) +
                " de " +
                Math.ceil(retorno_medicos.length / tamanhoPagina)
            );
            //senao entrara no else
          } else {
            $("#exibi-quantidade-protocolos-medicos").html(
              "Quantidade de protocolos médicos:" + 0
            );
            //com o seletor do jquery e efetuada a limpeza da tabela com id registros-protocolos
            $("#registros-protocolos-medicos").html("");
            //com o seletor do jquery e atribuido no final do corpo da tabela via append a estrutura html abaixo
            $("#registros-protocolos-medicos").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );
          }

          $("#informacoes-protocolos-medicos").attr(
            "class",
            "card card-primary"
          );
        },
        //caso ocorra erro na requisicao ajax ira exibir a mensagem de erro abaixo
        error: function (xhr, status, error) {
          $(document).Toasts("create", {
            class: "bg-warning",
            title: "Mensagem do Sistema",
            // subtitle: "Subtitle",
            body: "Falha ao buscar protocolos médicos:" + error,
          });
        },
      });
    } else if (recebe_filtro_selecionado_clientes === "status_cliente") {
      $.ajax({
        // url: "http://localhost/software-medicos/api/ProtocolosAPI.php",
        url: "../../api/MedicosAPI.php",
        dataType: "json",
        type: "get",
        data: {
          processo_protocolos_medicos: "exibir_protocolos_medicos",
          recebe_filtro_protocolo_medicos:
            recebe_filtro_selecionado_protocolos_medicos,
          recebe_busca_protocolo_medicos: "todos_desabilitados_medicos",
        },
        success: function (retorno_medicos) {
          debugger;
          let recebe_tabela_medicos = document.querySelector(
            "#registros-protocolos-medicos"
          );
          //e verificado se o valor de retorno e diferente de vazio e sendo entrara no if
          if (retorno_medicos != "") {
            //e declarada a variavel recebe_quantidade_registros que ira receber a quantidade de registros de protocolos
            //que foi retornado na busca do banco de dados
            let recebe_quantidade_registros = retorno_medicos.length;
            //com o seletor do jquery e atribuido via html a mensagem abaixo + o valor da variavel recebe_quantidade_registros
            $("#exibi-quantidade-protocolos-medicos").html(
              "Quantidade de protocolos médicos:" + recebe_quantidade_registros
            );
            //com o seletor do jquery e efetuada a limpeza do elemento com id registros_protocolos
            $("#registros-protocolos-medicos").html("");
            //e percorrido com laco de repeticao os registros na variavel retorno
            dados_medicos = retorno_medicos;
            for (
              var indice = pagina * tamanhoPagina;
              indice < retorno_medicos.length &&
              indice < (pagina + 1) * tamanhoPagina;
              indice++
            ) {
              visualizacao_video = "";
              if (retorno_medicos[indice].video_protocolo != null) {
                visualizacao_video =
                  "<td><a href='" +
                  retorno_medicos[indice].video_protocolo +
                  "' id='visualiza-video-protocolo'><i class='fas fa-video fa-lg' title='" +
                  retorno_medicos[indice].video_protocolo +
                  "'></i></a></td>";
              } else {
                visualizacao_video =
                  "<td><a id=''><i class='fas fa-video-slash fa-lg' title='Sem Vídeo'></i></a></td>";
              }

              visualiza_arquivo_pdf = "";
              if (retorno_medicos[indice].protocolo != null) {
                visualiza_arquivo_pdf =
                  "<td><a href='https://sti.med.br/visao/protocolos/visualiza_pdf/web/viewer.html?file=" +
                  retorno_medicos[indice].protocolo +
                  "' class='col-1' target='_blank'><i class='far fa-file-pdf fa-lg' title='" +
                  retorno_medicos[indice].protocolo +
                  "'></i></a></td>";
              } else {
                visualiza_arquivo_pdf =
                  "<td><a id=''><i class='fas fa-eye-slash fa-lg ml-1' title='Sem Arquivo'></i></a></td>";
              }
              //e atributio a variavel que recebe a tabela incrementando os registros do banco de dados montando o codigo html informado abaixo
              recebe_tabela_medicos.innerHTML +=
                "<tr>" +
                "<td>" +
                retorno_medicos[indice].titulo_protocolo +
                "</td>" +
                visualiza_arquivo_pdf +
                visualizacao_video +
                "<td class='espacamento " +
                recebe_class_ocultar_campos_usuario_nao_administrador_geral +
                recebe_class_desabilitar_alteracoes_sistema +
                "'><a href='#' onclick=reabilitar_registro_protocolo(" +
                retorno_medicos[indice].codigo_protocolo +
                "," +
                retorno_medicos[indice].codigo_usuario_protocolo +
                ",event);>" +
                "<i class='fas fa-trash-restore fa-lg' title='Reabilitar Protocolo'></i></a>" +
                "</td>" +
                "<input type='hidden' value='" +
                retorno_medicos[indice].video_protocolo +
                "' id='link-video-protocolo'/>" +
                "</tr>";
            }
            $("#registros-protocolos-medicos").append(recebe_tabela_medicos);
            $("#numeracao").text(
              "Página " +
                (pagina + 1) +
                " de " +
                Math.ceil(retorno_medicos.length / tamanhoPagina)
            );

            $("#informacoes-protocolos-medicos").attr(
              "class",
              "card card-primary"
            );
          } else {
            $("#exibi-quantidade-protocolos-medicos").html(
              "Quantidade de protocolos médicos:" + 0
            );
            //com o seletor do jquery e efetuada a limpeza da tabela com id registros-protocolos
            $("#registros-protocolos-medicos").html("");
            //com o seletor do jquery e atribuido no final do corpo da tabela via append a estrutura html abaixo
            $("#registros-protocolos-medicos").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );
          }
        },
        error: function (xhr, status, error) {
          $(document).Toasts("create", {
            class: "bg-warning",
            title: "Mensagem do Sistema",
            // subtitle: "Subtitle",
            body: "Falha ao buscar protocolos médicos:" + error,
          });
        },
      });
    }
  }
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
          dados_clientes = retorno_clientes;
          for (
            var clientes = pagina * tamanhoPagina;
            clientes < retorno_clientes.length &&
            clientes < (pagina + 1) * tamanhoPagina;
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
              retorno_clientes[clientes].email_cliente +
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

          $("#numeracao").text(
            "Página " +
              (pagina + 1) +
              " de " +
              Math.ceil(retorno_clientes.length / tamanhoPagina)
          );
        }
      } else {
        $("#exibi-quantidade-clientes").html("Quantidade de clientes:" + 0);
        $("#registros-clientes").append(
          "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
        );

        if (pagina == 0) {
          $("#numeracao").text("Página " + (pagina + 1) + " de 1");
        } else {
          $("#numeracao").text(
            "Página " +
              (pagina + 1) +
              " de " +
              Math.ceil(retorno_clientes.length / tamanhoPagina)
          );
        }
      }
    },
    error: function (xhr, error, status) {
      $("#recebe-mensagem-falha-buscar-clientes-filtro").html(
        "Falha ao buscar clientes:" + error
      );
      $("#recebe-mensagem-falha-buscar-clientes-filtro").show();
      $("#recebe-mensagem-falha-buscar-clientes-filtro").fadeOut(4000);
    },
  });
}

$("#filtro-cliente").change(function (e) {
  e.preventDefault();

  let recebeValorFiltroEscolhido = $(this).val();

  if (recebeValorFiltroEscolhido === "status_cliente") {
    $("#selecao-status").show();
    $("#valor-filtro-cliente").attr("disabled", true);
    $("#buscar-cliente").attr("disabled", false);
  } else if (recebeValorFiltroEscolhido === "todos") {
    $("#selecao-status").hide();
    $("#valor-filtro-cliente").attr("disabled", true);
    $("#buscar-cliente").attr("disabled", false);
  } else if (recebeValorFiltroEscolhido === "selecione") {
    $("#selecao-status").hide();
    $("#valor-filtro-cliente").attr("disabled", true);
    $("#buscar-cliente").attr("disabled", true);
  } else {
    $("#selecao-status").hide();
    $("#valor-filtro-cliente").attr("disabled", false);
    $("#buscar-cliente").attr("disabled", false);
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
          $("#email-cliente-edicao").val(retorno_clientes.email_cliente);
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
  let recebeEmailCliente = $("#email-cliente").val();
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
    recebeEmailCliente != "" &&
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
  } else if (recebeEmailCliente === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").html(
      "Favor preencher o campo e-mail do cliente"
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
                  retorno_clientes[clientes].email_cliente +
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
              $("#exibi-quantidade-clientes").html(
                "Quantidade de clientes:" + 0
              );
              $("#registros-clientes").append(
                "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
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
                  retorno_clientes[clientes].email_cliente +
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
              $("#exibi-quantidade-clientes").html(
                "Quantidade de clientes:" + 0
              );
              $("#registros-clientes").append(
                "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
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

            dados_clientes = retorno_clientes;
            for (
              var clientes = pagina * tamanhoPagina;
              clientes < retorno_clientes.length &&
              clientes < (pagina + 1) * tamanhoPagina;
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
                retorno_clientes[clientes].email_cliente +
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

            $("#numeracao").text(
              "Página " +
                (pagina + 1) +
                " de " +
                Math.ceil(retorno_clientes.length / tamanhoPagina)
            );
          } else {
            $("#exibi-quantidade-clientes").html("Quantidade de clientes:" + 0);
            $("#registros-clientes").append(
              "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
            );

            if (pagina == 0) {
              $("#numeracao").text("Página " + (pagina + 1) + " de 1");
            } else {
              $("#numeracao").text(
                "Página " +
                  (pagina + 1) +
                  " de " +
                  Math.ceil(retorno_clientes.length / tamanhoPagina)
              );
            }
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
  }
});

$("#alterar-cliente").click(function (e) {
  e.preventDefault();
  debugger;

  let recebeNomeClienteAlteracao = $("#nome-cliente-edicao").val();
  let recebeTelefoneClienteAlteracao = $("#telefone-cliente-edicao").val();
  let recebeEmailClienteAlteracao = $("#email-cliente-edicao").val();
  let recebeEnderecoClienteAlteracao = $("#endereco-cliente-edicao").val();
  let recebeStatusClienteAlteracao = $("#status-cliente-edicao").val();

  if (
    recebeNomeClienteAlteracao != "" &&
    recebeTelefoneClienteAlteracao != "" &&
    recebeEmailClienteAlteracao != "" &&
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
  } else if (recebeEmailClienteAlteracao === "") {
    $("#recebe-mensagem-campo-vazio-alterar-cliente").html(
      "Favor preencher o campo e-mail cliente"
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

$("#limpar-campos-cadastro-cliente").click(function (e) {
  e.preventDefault();

  $("#nome-cliente").val("");
  $("#telefone-cliente").val("");
  $("#endereco-cliente").val("");
  let elemento_select_status = document.querySelector("#status-cliente");
  elemento_select_status.selectedIndex = 0;
});
