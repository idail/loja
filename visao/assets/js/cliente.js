$(document).ready(function (e) {
  debugger;
  $("#recebe-mensagem-cadastro-alterar-realizado-cliente").hide();
  $("#recebe-mensagem-cadastro-alterar-sendo-realizada-cliente").hide();
  $("#recebe-mensagem-campo-vazio-cadastro-alterar-cliente").hide();
  $("#recebe-mensagem-campo-falha-cadastro-alterar-cliente").hide();
  $("#recebe-mensagem-campo-falha-buscar-cliente").hide();
  let url_atual_cliente = window.location.href;

  if (
    url_atual_cliente ===
    "http://localhost/loja/visao/index.php?pagina=consulta_clientes"
  )
    listarClientes("todos", "todos");
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
              "<td><i class='bi bi-person-lines-fill fs-4' title='Editar Cliente'></i></td>" +
              "<td><i class='bi bi-trash-fill fs-4' title='Excluir Cliente'></i></td>" +
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

$("#buscar-cliente").click(function(e){
  e.preventDefault();
  let recebeFiltroCliente = $("#filtro-cliente").val();
  let recebeValorFiltroCliente = $("#valor-filtro-cliente").val();

  if(recebeFiltroCliente === "nome_cliente" || recebeFiltroCliente === "status_cliente" || recebeFiltroCliente === "todos")
  {
    if(recebeFiltroCliente === "nome_cliente")
    {
      
    }
  }
});