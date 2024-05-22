$(document).ready(function () {
  let url_venda = window.location.href;

  if (
    url_venda === "http://localhost/loja/visao/index.php?pagina=cadastro_venda"
  ) {
    $("#exibe-informacao-qtd-produtos-estoque").hide();
    $("#exibe-desconto-venda").hide();
    $("#data-pagamento-agendado").hide();
    $("#recebe-mensagem-cadastro-realizado-venda").hide();
    $("#recebe-mensagem-campo-falha-cadastro-venda").hide();
    $("#recebe-mensagem-quantidade-acima-venda").hide();
    $("#recebe-mensagem-campo-vazio-cadastro-venda").hide();
    $("#recebe-mensagem-campo-vazio-buscar-venda").hide();
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
          $.each(retorno_produtos, function (i, element) {
            $("#lista-produto").append(
              "<option value=" +
                element.codigo_produto +
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
          $.each(retorno_clientes, function (i, element) {
            $("#lista-cliente").append(
              "<option value=" +
                element.nome_cliente.toLowerCase() +
                ">" +
                element.nome_cliente +
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
  }else if(url_venda === "http://localhost/loja/visao/index.php?pagina=consulta_venda"){
    $("#recebe-mensagem-campo-vazio-buscar-venda").hide();
    $("#recebe-mensagem-campo-falha-buscar-venda").hide();
    $("#recebe-mensagem-exclusao-realizada-venda").hide();
    $("#recebe-mensagem-campo-falha-exclusao-venda").hide();

    listarVendas("todos_venda","todos_venda");
  }
});

let recebeNomeProdutoGravar = "";
let recebeQTDEstoqueProduto = 0;
let recebeValorProdutoEstoque = 0;
let recebeValorSFP = "";
$("#lista-produto").change(function (e) {
  e.preventDefault();

  debugger;

  let recebeValorSFP = $(this).val();

  $.ajax({
    //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
    url: "../api/ProdutoAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_produto:
        "recebe_consultar_produto_especifico_qtd_produtos_estoque",
      valor_codigo_produto_especifico_qtdpe: recebeValorSFP,
    },
    success: function (retorno_produto) {
      debugger;
      if (retorno_produto.length > 0) {
        for (let index = 0; index < retorno_produto.length; index++) {
          recebeQTDEstoqueProduto = retorno_produto[index].estoque_produto;
          recebeNomeProdutoGravar = retorno_produto[index].nome_produto;

          let recebeValorProdutoBR =
            retorno_produto[index].valor_produto.toString();

          recebeValorProdutoEstoque =
            "R$" + recebeValorProdutoBR.replace(".", ",");
        }

        $("#valor-final-venda").val(recebeValorProdutoEstoque);
        $("#informacao-qtd-produtos-estoque").html(
          "Quantidade em estoque:" + recebeQTDEstoqueProduto
        );
        $("#exibe-informacao-qtd-produtos-estoque").show();
      }
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
});

let recebeValorDescontoV = "";

$("#lista-desconto-venda").change(function (e) {
  e.preventDefault();

  debugger;

  let recebeValorSDV = $(this).val();

  recebeValorDescontoV = recebeValorSDV;

  if (recebeValorSDV === "sim") {
    $("#exibe-desconto-venda").show();
  } else {
    $("#exibe-desconto-venda").hide();
    $("#valor-final-venda").val(recebeValorProdutoEstoque);
  }
});

let recebeValorAgendamentoPagamento = "";

$("#lista-agendar-pagamento").change(function (e) {
  e.preventDefault();

  debugger;

  let recebeValorAPV = $(this).val();

  recebeValorAgendamentoPagamento = recebeValorAPV;

  if (recebeValorAPV === "sim") {
    $("#data-pagamento-agendado").show();
  } else {
    $("#data-pagamento-agendado").hide();
  }
});

$(document).on("focus", "#desconto-produto-venda", function (e) {
  e.preventDefault();

  $(this).maskMoney({
    prefix: "R$",
    thousands: ".",
    decimal: ",",
  });
});

$("#quantidade-produto-venda").change(function (e) {
  e.preventDefault();

  debugger;

  let recebeQTDInformadaV = $(this).val();

  if (recebeQTDInformadaV > recebeQTDEstoqueProduto) {
    $("#recebe-mensagem-quantidade-acima-venda").html(
      "Quantidade de produtos informados para venda maior que quantidade em estoque"
    );
    $("#recebe-mensagem-quantidade-acima-venda").show();
    $("#recebe-mensagem-quantidade-acima-venda").fadeOut(4000);
  }
});

let recebeValorNumericoDescontoVenda = "";

$("#desconto-produto-venda").change(function (e) {
  e.preventDefault();

  debugger;

  let recebeValorDescontoVenda = $(this).val();

  if (recebeValorDescontoVenda != "") {
    let recebeValorFinalV = $("#valor-final-venda").val();

    let recebeVFProdutoCortado = recebeValorFinalV.split("R$");

    let recebeVProdutoNumerico = recebeVFProdutoCortado[1];

    let recebeVProdutoFinalNumerico = recebeVProdutoNumerico.replace(/,/g, ".");

    // Substituir o último ponto por um caractere temporário
    let tempStr = recebeVProdutoFinalNumerico.replace(/\.(?=[^.]*$)/, "TEMP");

    // Remover todos os outros pontos
    tempStr = tempStr.replace(/\./g, "");

    // Substituir o caractere temporário pelo ponto decimal
    let decimalStr = tempStr.replace("TEMP", ".");

    // Converter para número decimal
    let valorFinalVP = parseFloat(decimalStr);

    let recebeVDescontoProdutoCortado = recebeValorDescontoVenda.split("R$");

    let recebeVDescontoProdutoNumerico = recebeVDescontoProdutoCortado[1];

    let recebeVDescontoProdutoFinalNumerico =
      recebeVDescontoProdutoNumerico.replace(/,/g, ".");

    // Substituir o último ponto por um caractere temporário
    let tempDescontoStr = recebeVDescontoProdutoFinalNumerico.replace(
      /\.(?=[^.]*$)/,
      "TEMP"
    );

    // Remover todos os outros pontos
    tempDescontoStr = tempDescontoStr.replace(/\./g, "");

    // Substituir o caractere temporário pelo ponto decimal
    let decimalDescontoStr = tempDescontoStr.replace("TEMP", ".");

    // Converter para número decimal
    let valorDescontoFinalVP = parseFloat(decimalDescontoStr);

    let recebeValorFPDesconto = valorFinalVP - valorDescontoFinalVP;

    let recebeValorProdutoBRDesconto = recebeValorFPDesconto.toString();

    let recebeValorProdutoBRFinal =
      "R$" + recebeValorProdutoBRDesconto.replace(".", ",");

    $("#valor-final-venda").val(recebeValorProdutoBRFinal);

    recebeValorNumericoDescontoVenda = valorDescontoFinalVP;
  }
});

$("#cadastro-venda").click(function (e) {
  e.preventDefault();

  debugger;

  let recebeNomeProdutoSV = $("#lista-produto").val();

  let recebeNomeCV = $("#lista-cliente").val();

  let recebeQTDPV = $("#quantidade-produto-venda").val();

  let recebeDescontoProdutoSV = $("#lista-desconto-venda").val();

  let recebePagoSPV = $("#lista-pago-venda").val();

  let recebeAgendarSPV = $("#lista-agendar-pagamento").val();

  let recebeValorFinalV = $("#valor-final-venda").val();

  let recebeValorVendaFinal = 0;
  if (recebeValorFinalV != "") {
    let recebeValorFinalVCortado = recebeValorFinalV.split("R$");

    let recebeVProdutoNumerico = recebeValorFinalVCortado[1];

    let recebeVProdutoFinalNumerico = recebeVProdutoNumerico.replace(/,/g, ".");

    // Substituir o último ponto por um caractere temporário
    let tempStr = recebeVProdutoFinalNumerico.replace(/\.(?=[^.]*$)/, "TEMP");

    // Remover todos os outros pontos
    tempStr = tempStr.replace(/\./g, "");

    // Substituir o caractere temporário pelo ponto decimal
    let decimalStr = tempStr.replace("TEMP", ".");

    // Converter para número decimal
    recebeValorVendaFinal = parseFloat(decimalStr);
  }

  let recebeValorAgendaPagamentoV = "";
  let recebeAgendamentoPagamentoV = false;
  let recebeDescontoProdutoV = false;
  let recebePagoV = false;

  if (recebeValorDescontoV === "sim") {
    recebeDescontoProdutoV = 1;
  } else {
    recebeDescontoProdutoV = 0;
  }

  if (recebeValorAgendamentoPagamento === "sim") {
    recebeAgendamentoPagamentoV = 1;
    recebeValorAgendaPagamentoV = $("#data-agendamento-pagamento").val();
  } else {
    recebeAgendamentoPagamentoV = 0;
    recebeValorAgendaPagamentoV = "";
  }

  let recebeValorPV = $("#lista-pago-venda").val();

  if (recebeValorPV === "sim") {
    recebePagoV = 1;
  } else {
    recebePagoV = 0;
  }

  if (recebeNomeProdutoSV === "selecione") {
    $("#recebe-mensagem-campo-vazio-cadastro-venda").html(
      "Favor selecionar o produto para venda"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-venda").show();
    $("#recebe-mensagem-campo-vazio-cadastro-venda").fadeOut(4000);
  } else if (recebeNomeCV === "selecione") {
    $("#recebe-mensagem-campo-vazio-cadastro-venda").html(
      "Favor selecionar o cliente para venda"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-venda").show();
    $("#recebe-mensagem-campo-vazio-cadastro-venda").fadeOut(4000);
  } else if (recebeDescontoProdutoSV === "selecione") {
    $("#recebe-mensagem-campo-vazio-cadastro-venda").html(
      "Favor selecionar o desconto para venda"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-venda").show();
    $("#recebe-mensagem-campo-vazio-cadastro-venda").fadeOut(4000);
  } else if (recebeQTDPV === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-venda").html(
      "Favor preencher a quantidade de produtos para venda"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-venda").show();
    $("#recebe-mensagem-campo-vazio-cadastro-venda").fadeOut(4000);
  } else if (recebePagoSPV === "selecione") {
    $("#recebe-mensagem-campo-vazio-cadastro-venda").html(
      "Favor selecionar se a venda foi paga ou não"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-venda").show();
    $("#recebe-mensagem-campo-vazio-cadastro-venda").fadeOut(4000);
  } else if (recebeAgendarSPV === "selecione") {
    $("#recebe-mensagem-campo-vazio-cadastro-venda").html(
      "Favor selecionar se haverá agendamento ou não"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-venda").show();
    $("#recebe-mensagem-campo-vazio-cadastro-venda").fadeOut(4000);
  } else {
    $.ajax({
      url: "../api/VendaAPI.php",
      type: "post",
      dataType: "json",
      data: {
        valor_nomeprodutov: recebeNomeProdutoGravar,
        valor_nomeclientev: recebeNomeCV,
        valor_quantidadeprodutov: recebeQTDPV,
        valor_selecionado_descontov: recebeDescontoProdutoV,
        valor_descontoprodutov: recebeValorNumericoDescontoVenda,
        valor_finalv: recebeValorVendaFinal,
        valor_selecionado_pagov: recebePagoV,
        valor_pagamentoagendadov: recebeAgendamentoPagamentoV,
        valor_datapagamentov: recebeValorAgendaPagamentoV,
        processo_venda: "recebe_cadastro_venda",
      },
      success: function (retorno) {
        debugger;
        if (retorno > 0) {
          $("#recebe-mensagem-cadastro-realizado-venda").html(
            "Venda cadastrada com sucesso"
          );
          $("#recebe-mensagem-cadastro-realizado-venda").show();
          $("#recebe-mensagem-cadastro-realizado-venda").fadeOut(4000);
        } else {
          $("#recebe-mensagem-campo-falha-cadastro-venda").html(
            "Falha ao cadastrar venda:" + retorno
          );
          $("#recebe-mensagem-campo-falha-cadastro-venda").show();
          $("#recebe-mensagem-campo-falha-cadastro-venda").fadeOut(4000);
        }
      },
      error: function (xhr, status, error) {
        debugger;
        $("#recebe-mensagem-campo-falha-cadastro-venda").html(
          "Falha ao cadastrar venda:" + error
        );
        $("#recebe-mensagem-campo-falha-cadastro-venda").show();
        $("#recebe-mensagem-campo-falha-cadastro-venda").fadeOut(4000);
      },
    });
  }
});

let listaImagensProdutos = Array();

function listarVendas(recebeFiltroV,recebeValorFiltroV)
{
  debugger;

  $.ajax({
    //url: "http://localhost/software-medicos/api/NotificacaoAPI.php",
    url: "../api/VendaAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_venda: "recebe_consultar_vendas",
      filtro_venda: recebeFiltroV,
      valor_filtro_venda: recebeValorFiltroV,
    },
    beforeSend: function () {
      debugger;
      $("#registros-vendas").html("");
      $("#registros-vendas").append(
        "<td colspan='5' class='text-center'>Carregando dados</td>"
      );
      $("#registros-vendas").html("");
    },
    success: function (retorno_vendas) {
      debugger;
      if (retorno_vendas.length > 0) {
        let recebe_tabela_vendas = document.querySelector(
          "#registros-vendas"
        );

        let recebe_quantidade_vendas = retorno_vendas.length;

        $("#exibi-quantidade-vendas").html(
          "Quantidade de vendas:" + recebe_quantidade_vendas
        );

        for (let vendas = 0; vendas < retorno_vendas.length; vendas++) {

          listaImagensProdutos.push(retorno_vendas[vendas].nome_produto_venda);

          let recebeValorVendaBR = retorno_vendas[vendas].valor_final_venda.toString();
          
          let recebeValorVendaBRFinal = "R$" + recebeValorVendaBR.replace(".",",");

          let recebeValorDescontoV = retorno_vendas[vendas].desconto_venda;

          let recebePagoV = retorno_vendas[vendas].pago_venda;

          let recebeAgendamentoV = retorno_vendas[vendas].pagamento_agendado_venda;

          

          let recebeValorDescontoVString = "";
          let recebeValorDescontoBRFinal = "";
          
          if(retorno_vendas[vendas].desconto_final_venda != null)
          {
            recebeValorDescontoVString = retorno_vendas[vendas].desconto_final_venda.toString();
            recebeValorDescontoBRFinal =  "R$" + recebeValorDescontoVString.replace(".",",");
          }else{
            recebeValorDescontoBRFinal = "Não informado";
          }

          let recebeValorFinalDescontoV = "";

          if(recebeValorDescontoV === 1)
            recebeValorFinalDescontoV = "Sim";
          else
            recebeValorFinalDescontoV = "Não";

          let recebeValorPagoV = "";

          if(recebePagoV === 1)
            recebeValorPagoV = "Sim";
          else
            recebeValorPagoV = "Não";

          let recebeValorAgendamentoV = "";

          if(recebeAgendamentoV === 1)
            recebeValorAgendamentoV = "Sim";
          else
            recebeValorAgendamentoV = "Não";
          
          let recebeDataAgendamentoV = "";
          let recebeDataAmericana = "";
          let recebeDataBRAgendamentoV = "";
          
          if(retorno_vendas[vendas].data_pagamento_venda != null)
          {
            recebeDataAgendamentoV = retorno_vendas[vendas].data_pagamento_venda;
            recebeDataBRAgendamentoV = recebeDataAgendamentoV.split("-").reverse().join("/");
          }else{
            recebeDataBRAgendamentoV = "Não informado";
          }

          recebe_tabela_vendas.innerHTML +=
            "<tr>" +
            "<td>" +
            retorno_vendas[vendas].nome_produto_venda +
            "</td>" +
            "<td>" +
            retorno_vendas[vendas].nome_cliente_venda +
            "</td>" +
            "<td>" +
            retorno_vendas[vendas].quantidade_produtos_venda +
            "</td>" +
            "<td>" +
            recebeValorFinalDescontoV + " - " + recebeValorDescontoBRFinal+
            "</td>" +
            "<td>" +
            recebeValorVendaBRFinal +
            "</td>" +
            "<td>" +
            recebeValorPagoV +
            "</td>" +
            "<td>" +
            recebeValorAgendamentoV + " - " + recebeDataBRAgendamentoV +
            "</td>" +
            "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-vendas' data-backdrop='static' id='carrega-imagens-venda' onclick='')'></i></a></td>" +
            // "<td><a href='#'><i class='bi bi-card-image fs-4' title='Ver Imagens' data-bs-toggle='modal' data-bs-target='#visualiza-imagens-produtos' data-backdrop='static' onclick='carrega_imagens_venda(" +
            // retorno_vendas[vendas].nome_produto_venda +
            // ",event)'></a></i></td>" +
            "<td><a href='#'><i class='bi bi-trash-fill fs-4' title='Excluir Venda' onclick=excluiProdutoEspecifico(" +
            retorno_vendas[vendas].codigo_venda +
            ",event)></i></a></td>" +
            "</tr>";
        }
        $("#registros-vendas").append(recebe_tabela_vendas);
      } else {
        $("#exibi-quantidade-vendas").html("Quantidade de vendas:" + 0);
        $("#registros-vendas").append(
          "<td colspan='5' class='text-center'>Nenhum registro localizado</td>"
        );
      }
    },
    error: function (xhr, status, error) { },
  });
}

$(document).on("click","#carrega-imagens-venda",function(e){
  e.preventDefault();

  debugger;

  console.log(listaImagensProdutos);
});

function carrega_imagens_venda(recebe_produto,e)
{
  e.preventDefault();

  debugger;

  console.log(recebe_produto);

};

$("#filtro-venda").click(function(e){
  e.preventDefault();

  debugger;

  let recebeFiltroSelecionadoV = $(this).val();

  if(recebeFiltroSelecionadoV === "lista_produto_venda")
  {
    
  }
});