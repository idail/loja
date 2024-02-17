<?php
//e verificado se a sesson nao existe e caso nao exista sessao a mesma sera inicializada
if (!isset($_SESSION)) {
    session_start();
}
//é importado a classe protocoloscontroladora.php
require("../controladora/UsuarioControladora.php");
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: ");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods:");

//com a variavel super global $_SERVER e verificado qual metodo de requisição e utilizado para acessar a API protocolosapi
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $recebeProcessoUsuario = $_POST["processo_usuario"];
if($recebeProcessoUsuario === "recebe_cadastro_usuario"){

    $nomeUsuario = $_POST["nome-completo"];
    $emailUsuario = $_POST["email-usuario"];
    $nomeDeUsuario = $_POST["nome-de-usuario"];
    $senhaUsuario = $_POST["senha-usuario"];
    $repetirSenhaUsuario = $_POST["repetir-senha-usuario"];
    $perfilUsuario = $_POST["perfil-usuario"];


    $usuarioControladora = new UsuarioControladora();
    $recebeCadastroUsuario = $usuarioControladora->CadastroUsuario($nomeDeUsuario, $emailUsuario, $nomeDeUsuario, $senhaUsuario, $repetirSenhaUsuario, $perfilUsuario);
    echo json_encode($recebeCadastroUsuario);
    
}

}
