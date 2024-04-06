$(document).ready(function (e) {
  $("#recebe-mensagem-cadastro-realizado-categoria").hide();
  $("#recebe-mensagem-campo-vazio-cadastro-categoria").hide();
  $("#recebe-mensagem-campo-falha-cadastro-categoria").hide();

  debugger;
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
        $("#categoria-produto").html("");
        $("#categoria-produto").append(
            "<option value='selecione'>Selecione</option>"
          );
        $.each(retorno_categorias, function (i, element) {
          $("#categoria-produto").append(
            "<option value=" +
              element.codigo_categoria +
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

  $("img.checkable").imgCheckbox();
});

var dados_imagens_galeria = Array();

//var quantidade_imagens_galeria;

var imagens_galeria = Array();

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
  
          imagens_galeria.push(valores_imagens);
        }
      }
  
      $.each(arquivo_selecionado, function (i, file) {
        //debugger;
        //imagens_galeria.push(i);
        dados_imagens_galeria.push(file);
  
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
            imagens_galeria.length +
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

$("#cadastro-categoria").click(function (e) {
  e.preventDefault();

  let recebeNomeCategoria = $("#nome-categoria").val();

  let formulario_cadastro_categoria = $("#formulario-cadastro-categoria")[0];

  let dados_formulario_cadastro_categoria = new FormData(
    formulario_cadastro_categoria
  );

  dados_formulario_cadastro_categoria.append(
    "processo_categoria",
    "recebe_cadastro_categoria"
  );

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
        if (retorno > 0) {
          $("#recebe-mensagem-cadastro-realizado-categoria").html(
            "Categoria cadastrada com sucesso"
          );
          $("#recebe-mensagem-cadastro-realizado-categoria").show();
          $("#recebe-mensagem-cadastro-realizado-categoria").fadeOut(4000);

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
                $("#categoria-produto").html("");
                $("#categoria-produto").append(
                    "<option value='selecione'>Selecione</option>"
                  );
                $.each(retorno_categorias, function (i, element) {
                  $("#categoria-produto").append(
                    "<option value=" +
                      element.codigo_categoria +
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
        } else {
          $("#recebe-mensagem-campo-falha-cadastro-categoria").html(
            "Falha ao cadastrar categoria:" + retorno
          );
          $("#recebe-mensagem-campo-falha-cadastro-categoria").show();
          $("#recebe-mensagem-campo-falha-cadastro-categoria").fadeOut(4000);
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-campo-falha-cadastro-categoria").html(
          "Falha ao cadastrar categoria:" + error
        );
        $("#recebe-mensagem-campo-falha-cadastro-categoria").show();
        $("#recebe-mensagem-campo-falha-cadastro-categoria").fadeOut(4000);
      },
    });
  } else {
    $("#recebe-mensagem-campo-vazio-cadastro-categoria").html(
      "Favor preencher a categoria"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-categoria").show();
    $("#recebe-mensagem-campo-vazio-cadastro-categoria").fadeOut(4000);
  }
});
