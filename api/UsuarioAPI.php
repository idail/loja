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
    if ($recebeProcessoUsuario === "recebe_cadastro_usuario") {

        $nomeUsuario = $_POST["nome-completo"];
        $emailUsuario = $_POST["email-usuario"];
        $nomeDeUsuario = $_POST["nome-de-usuario"];
        $senhaUsuario = $_POST["senha-usuario"];
        //$repetirSenhaUsuario = $_POST["repetir-senha-usuario"];
        $perfilUsuario = $_POST["perfil-usuario"];
        $recebeImagemUsuario = $_FILES["foto-perfil"];
        $recebeNomeImagem = "usuario_sem_foto.jpg";

        if (!empty($recebeImagemUsuario)) {
            $tipo_imagem = $recebeImagemUsuario["type"];

            if ($tipo_imagem === "image/png" || $tipo_imagem === "image/jpeg" || $tipo_imagem === "image/jpg") {
                $destino_imagem = "../visao/usuario/imagem_perfil/" . $recebeImagemUsuario["name"];
                $recebeNomeImagem = $recebeImagemUsuario["name"];
                copy($recebeImagemUsuario["tmp_name"], $destino_imagem);
            }
        }

        if (
            !empty($nomeDeUsuario) && !empty($emailUsuario) && !empty($nomeDeUsuario) && !empty($senhaUsuario) && !empty($perfilUsuario)
        ) {
            $usuarioControladora = new UsuarioControladora();
            $recebeCadastroUsuario = $usuarioControladora->CadastroUsuario($nomeUsuario, $emailUsuario, $nomeDeUsuario,
            $senhaUsuario, $perfilUsuario,$recebeNomeImagem);
            echo json_encode($recebeCadastroUsuario);
        } else {
            echo json_encode("Favor verificar o preenchimento dos campos");
        }
    }
}
