$("#criacao-conta").click(function (e) {
  e.preventDefault();
  debugger;

  let nomeCompletoUsuario = $("#nome-completo").val();
  let emailUsuario = $("#email-usuario").val();
  let nomeDeUsuario = $("#nome-de-usuario").val();
  let senhaUsuario = $("#senha-usuario").val();
  let repetirSenhaUsuario = $("#repetir-senha-usuario").val();

  let formularioCadastroUsuario = $("#formulario-cadastro-usuario")[0];
  let dadosFormularioCadastro = new FormData(formularioCadastroUsuario);  

  dadosFormularioCadastro.append("processo_usuario", "recebe_cadastro_usuario");  

  $.ajax({
    // url: "http://localhost/software-medicos/api/UsuarioAPI.php",
    url: "../../api/UsuarioAPI.php",
    type: "POST",
    dataType: "json",
    processData: false,
    contentType: false,
    data: dadosFormularioCadastro,
    success: function (retorno) {
      debugger;
      console.log(retorno);
    },


  });
});
