$(document).ready(function (e) {
  $("#remove-ponteiros-1").removeClass("bi bi-three-dots");
  $("#remove-ponteiros-2").removeClass("bi bi-three-dots");
  $("#remove-ponteiros-3").removeClass("bi bi-three-dots");

  let url_inicio = window.location.href;

  if (url_inicio === "http://localhost/loja/visao/index.php") {
    $.ajax({
      url: "../api/VendaAPI.php",
      dataType: "json",
      type: "get",
      data: {
        processo_venda: "recebe_consultar_vendas_vencer",
      },
      success: function (retorno_venda_vencer) {
        debugger;
        let recebe_quantidade_vendas_vencer = retorno_venda_vencer.length;

        if(recebe_quantidade_vendas_vencer != 0)
        {
          $("#exibi-quantidade-vendas-vencer").html("");
          $("#exibi-quantidade-vendas-vencer").html(
            recebe_quantidade_vendas_vencer
          );
          $("#total-vendas-vencer").html("");
          $("#total-vendas-vencer").html(recebe_quantidade_vendas_vencer);
        }else{
          $("#exibi-quantidade-vendas-vencer").html("");
          $("#exibi-quantidade-vendas-vencer").html(
            0
          );
          $("#total-vendas-vencer").html("");
          $("#total-vendas-vencer").html(0);
        }
      },
      error: function (xhr, status, error) {},
    });
  }
});

$("#visualizarVendasAVencer").click(function (e) {
  e.preventDefault();

  $.ajax({
    url: "../api/VendaAPI.php",
    dataType: "json",
    type: "get",
    data: {
      processo_venda: "recebe_consultar_vendas_vencer",
    },
    success: function (retorno_venda_vencer) {
      debugger;
      if (retorno_venda_vencer.length > 0) {
        let recebe_tabela_vendas = document.querySelector(
          "#registros-vendas-cliente-a-vencer"
        );

        $("#registros-vendas-cliente-a-vencer").html("");

        for (let vendas = 0; vendas < retorno_venda_vencer.length; vendas++) {
          let recebeDescontoVenda = retorno_venda_vencer[vendas].desconto_venda;
          let recebeValorDescontoVenda =
            retorno_venda_vencer[vendas].desconto_final_venda.toString();

          let recebeDescontoVF = "";
          if (recebeDescontoVenda === 1) recebeDescontoVF = "Sim";
          else recebeDescontoVF = "Não";

          let recebeValorDescontoF = "";
          if (recebeValorDescontoVenda > 0) {
            recebeValorDescontoF =
              "R$" + recebeValorDescontoVenda.replace(".", ",");
          } else {
            recebeValorDescontoF =
              "R$" + recebeValorDescontoVenda.replace(".", ",");
          }

          let recebeValorFinal =
            retorno_venda_vencer[vendas].valor_final_venda.toString();

          let recebeValorFVBR = "R$" + recebeValorFinal.replace(".", ",");

          let recebePagoVenda = retorno_venda_vencer[vendas].pago_venda;

          let recebeDataPagamentoAgendadoBR = "";
          if (retorno_venda_vencer[vendas].pagamento_agendado_venda === 1) {
            recebeDataPagamentoAgendadoBR = retorno_venda_vencer[
              vendas
            ].data_pagamento_venda
              .split("-")
              .reverse()
              .join("/");
          } else {
            recebeDataPagamentoAgendadoBR = "Não informado";
          }

          let recebePagoFV = "";
          if (recebePagoVenda === 1) recebePagoFV = "Sim";
          else recebePagoFV = "Não";

          recebe_tabela_vendas +=
            "<tr>" +
            "<td class='text-center'>" +
            retorno_venda_vencer[vendas].nome_cliente_venda +
            "</td>" +
            "<td class='text-center'>" +
            retorno_venda_vencer[vendas].nome_produto_venda +
            "</td>" +
            "<td class='text-center'>" +
            retorno_venda_vencer[vendas].quantidade_produtos_venda +
            "</td>" +
            "<td class='text-center'>" +
            recebeDescontoVF +
            " - " +
            recebeValorDescontoF +
            "</td>" +
            "<td class='text-center'>" +
            recebeValorFVBR +
            "</td>" +
            "<td class='text-center'>" +
            recebePagoFV +
            "</td>" +
            "<td class='text-center'>" +
            recebeDataPagamentoAgendadoBR +
            "</td>" +
            "<td><a href='#'><i class='bi bi-cash-coin fs-4' title='Venda Paga' id='informarPagamento' data-param-codigo='" + retorno_venda_vencer[vendas].codigo_venda + "'></i></a></td>" +
            "<td><a href='#'><i class='bi bi-envelope fs-4' title='E-mail de cobrança'></i></a></td>" +
            "</tr>";
        }

        $("#registros-vendas-cliente-a-vencer").append(recebe_tabela_vendas);
      } else {
        $("#registros-vendas-cliente-a-vencer").append("<td colspan='7' class='text-center'>Nenhum registro localizado</td>");
      }
    },
    error: function (xhr, status, error) {},
  });
});

$(document).on("click","#informarPagamento",function(e){
  let recebeCodigoVenda = $(this).data("param-codigo");

  $.ajax({
    url: "../api/VendaAPI.php",
    type: "post",
    dataType: "json",
    data: {
      processo_venda: "recebe_atualizar_pagamento",
      valor_codigo_venda:recebeCodigoVenda,
      metodo:"PUT",
    },
    success: function (retorno) 
    {
      debugger;
      
      console.log(retorno);
    },
    error:function(xhr,status,error)
    {

    },
  });
});