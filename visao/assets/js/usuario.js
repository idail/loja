$(document).ready(function (e) {
  debugger;
  $("#recebe-mensagem-campo-vazio-cadastro-usuario").hide();
  $("#recebe-mensagem-cadastro-realizado-usuario").hide();
  $("#recebe-mensagem-campo-falha-cadastro-usuario").hide();
  $("#recebe-mensagem-campo-vazio-autentica-usuario").hide();
  $("#recebe-mensagem-campo-falha-autentica-usuario").hide();
  $("#recebe-mensagem-autenticacao-realizado-usuario").hide();

  document.getElementById("exibi-foto-perfil").src =
    "../usuario/imagem_perfil/usuario_sem_foto.jpg";

  // let imagem_perfil = new Image();

  // let recebe_imagem = document.querySelector("#exibi-foto-perfil");

  // imagem_perfil.src = "../usuario/imagem_perfil/usuario_sem_foto.jpg";

  // recebe_imagem.innerHTML +=
  //   "<img src='" + imagem_perfil.src + "' style='height:85px;'/>";
});

$("#criacao-conta").click(function (e) {
  e.preventDefault();
  debugger;

  let nomeCompletoUsuario = $("#nome-completo").val();
  let emailUsuario = $("#email-usuario").val();
  let nomeDeUsuario = $("#nome-de-usuario").val();
  let senhaUsuario = $("#senha-usuario").val();
  let repetirSenhaUsuario = $("#repetir-senha-usuario").val();
  let recebePerfilUsuario = $('input[name="perfil-usuario"]:checked').val();

  if (
    nomeCompletoUsuario != "" &&
    emailUsuario != "" &&
    nomeDeUsuario != "" &&
    senhaUsuario != "" &&
    repetirSenhaUsuario != "" &&
    recebePerfilUsuario != undefined
  ) {
    let formularioCadastroUsuario = $("#formulario-cadastro-usuario")[0];
    let dadosFormularioCadastro = new FormData(formularioCadastroUsuario);

    dadosFormularioCadastro.append(
      "processo_usuario",
      "recebe_cadastro_usuario"
    );

    $.ajax({
      // url: "http://localhost/software-medicos/api/UsuarioAPI.php",
      url: "../../api/UsuarioAPI.php",
      type: "POST",
      dataType: "json",
      enctype: "multipart/form-data",
      processData: false,
      contentType: false,
      data: dadosFormularioCadastro,
      success: function (retorno) {
        debugger;

        console.log(retorno);
        if (retorno > 0) {
          $("#recebe-mensagem-cadastro-realizado-usuario").html(
            "Usuário cadastrado com sucesso, bem-vindo"
          );
          $("#recebe-mensagem-cadastro-realizado-usuario").show();
          $("#recebe-mensagem-cadastro-realizado-usuario").fadeOut(4000);

          setTimeout(() => {
            var url_inicio = "../../visao/index.php";
            $(window.document.location).attr("href", url_inicio);
          }, 2000);
        } else {
          $("#recebe-mensagem-campo-falha-cadastro-usuario").html("Falha ao cadastrar usuário");
          $("#recebe-mensagem-campo-falha-cadastro-usuario").show();
          $("#recebe-mensagem-campo-falha-cadastro-usuario").fadeOut(4000);
        }
      },
      error: function (xhr, status, error) {
        $("#recebe-mensagem-campo-falha-cadastro-usuario").html("Falha ao cadastrar usuário:" + error);
        $("#recebe-mensagem-campo-falha-cadastro-usuario").show();
        $("#recebe-mensagem-campo-falha-cadastro-usuario").fadeOut(4000);
      },
    });
  } else if (nomeCompletoUsuario === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").html(
      "Favor preencher o nome completo"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").show();
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").fadeOut(4000);
  } else if (emailUsuario === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").html(
      "Favor preencher o e-mail"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").show();
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").fadeOut(4000);
  } else if (nomeDeUsuario === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").html(
      "Favor preencher o nome do usuário"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").show();
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").fadeOut(4000);
  } else if (senhaUsuario === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").html(
      "Favor preencher a senha do usuário"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").show();
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").fadeOut(4000);
  } else if (repetirSenhaUsuario === "") {
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").html(
      "Favor preencher o repetir senha do usuário"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").show();
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").fadeOut(4000);
  } else if (recebePerfilUsuario === undefined) {
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").html(
      "Favor selecionar o perfil do usuário"
    );
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").show();
    $("#recebe-mensagem-campo-vazio-cadastro-usuario").fadeOut(4000);
  }
});

$("#autenticacao-usuario").click(function (e) {
  e.preventDefault();

  let recebeLoginUsuario = $("#login-usuario-autenticacao").val();
  let recebeSenhaUsuario = $("#senha-usuario-autenticacao").val();

  let recebeFormularioLogin = $("#formulario-autentica-usuario")[0];

  let dadosFormularioLogin = new FormData(recebeFormularioLogin);

  dadosFormularioLogin.append("processo_usuario", "recebe_autenticacao_usuario");

  if (recebeLoginUsuario != "" && recebeSenhaUsuario != "") {
    $.ajax({
      // url: "http://localhost/software-medicos/api/UsuarioAPI.php",
      url: "../../api/UsuarioAPI.php",
      type: "POST",
      dataType: "json",
      processData: false,
      contentType: false,
      data: dadosFormularioLogin,
      success: function (retorno) {
        debugger;
        console.log(retorno);
      },
      error: function (xhr, status, error) {
        console.log(error);
      }
    });
  } else if (recebeLoginUsuario === "") {
    $("#recebe-mensagem-campo-vazio-autentica-usuario").html(
      "Favor preencher o login do usuário"
    );
    $("#recebe-mensagem-campo-vazio-autentica-usuario").show();
    $("#recebe-mensagem-campo-vazio-autentica-usuario").fadeOut(4000);
  } else if (recebeSenhaUsuario === "") {
    $("#recebe-mensagem-campo-vazio-autentica-usuario").html(
      "Favor preencher a senha do usuário"
    );
    $("#recebe-mensagem-campo-vazio-autentica-usuario").show();
    $("#recebe-mensagem-campo-vazio-autentica-usuario").fadeOut(4000);
  }
});

$("#cadastro-usuario").on("hidden.bs.modal", function (e) {
  debugger;

  document.getElementById("exibi-foto-perfil").src =
    "../usuario/imagem_perfil/usuario_sem_foto.jpg";
  $("#foto-perfil").val(null);
});

$("#foto-perfil").change(function (e) {
  e.preventDefault();

  debugger;

  var arquivo = $("#foto-perfil")[0].files;

  if (
    arquivo[0].type === "image/png" ||
    arquivo[0].type === "image/jpeg" ||
    arquivo[0].type === "image/jpg"
  ) {
    var recebe = new FileReader();

    recebe.onload = function (e) {
      document.getElementById("exibi-foto-perfil").src = e.target.result;
    };
    recebe.readAsDataURL(arquivo[0]);
  }
});
