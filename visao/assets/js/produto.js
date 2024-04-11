$(document).ready(function(e){
    $("#recebe-mensagem-cadastro-alterar-realizado-produto").hide();
    $("#recebe-mensagem-cadastro-alterar-sendo-realizada-produto").hide();
    $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").hide();
    $("#recebe-mensagem-campo-falha-cadastro-alterar-produto").hide();

    $("img.checkable").imgCheckbox();
});

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

$("#cadastro-produto").click(function(e){
    e.preventDefault();

    debugger;

    let recebeCategoriaProduto = $("#categoria-produto").val();

    let recebeNomeProduto = $("#nome-produto").val();

    let recebeEstoqueProduto = $("#estoque-produto").val();

    let recebeValorProduto = $("#valor-produto").val();

    if(recebeCategoriaProduto != "selecione" && recebeNomeProduto != "" && recebeEstoqueProduto != "" && recebeValorProduto != "" && imagens_produtos.length > 0)
    {
        let dados_formulario_cadastro_produto = $("#formulario-cadastro-produto")[0];

        let dados_produto = new FormData(dados_formulario_cadastro_produto);

        dados_produto.append("processo_produto","recebe_cadastro_produto");

        $.ajax({
            type: "post",
            enctype: "multipart/form-data",
            dataType: "json",
            //http://localhost/engenharia_testando/final/controladora/ImagemControladora.php
            url: "../api/ProdutoAPI.php",
            cache: false,
            processData: false,
            contentType: false,
            data: dados_produto,
    
            success: function (resultado) 
            {
                debugger;

                console.log(resultado);
            },
            error:function(xhr,status,error)
            {

            },
        });
    }else if(recebeCategoriaProduto === "selecione")
    {
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html("Favor selecionar a categoria do produto");
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
    }else if(recebeNomeProduto === "")
    {
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html("Favor informar o nome do produto");
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
    }else if(recebeEstoqueProduto === "")
    {
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html("Favor informar o estoque do produto");
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
    }else if(recebeValorProduto === "")
    {
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html("Favor informar o valor do produto");
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
    }else if(imagens_produtos.length === 0)
    {
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").html("Favor selecionar as imagens que queira do produto");
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").show();
        $("#recebe-mensagem-campo-vazio-cadastro-alterar-produto").fadeOut(4000);
    }
});