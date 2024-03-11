<?php
//é importado a classe protocoloscontroladora.php
require("../controladora/UsuarioControladora.php");
//O valor diz aos navegadores para permitir que o código de solicitação de qualquer origem acesse o recurso
header("Access-Control-Allow-Origin: *");
//Especifica um ou mais métodos permitidos ao acessar um recurso em resposta a uma solicitação de comprovação
header("Access-Control-Allow-Methods: *");


//com a variavel super global $_SERVER e verificado qual metodo de requisição e utilizado para acessar a API protocolosapi
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $recebeProcessoUsuario = $_POST["processo_usuario"];
    if ($recebeProcessoUsuario === "recebe_cadastro_usuario") {

        $nomeUsuario = $_POST["nome-completo"];
        $emailUsuario = $_POST["email-usuario"];
        $nomeDeUsuario = $_POST["nome-de-usuario"];
        $senhaUsuario = $_POST["senha-usuario"];
        $perfilUsuario = $_POST["perfil-usuario"];
        $recebeImagemUsuario = $_FILES["foto-perfil"];
        $recebeNomeImagem = "usuario_sem_foto.jpg";

        $recebeSenhaDescriptografadaCriacao = $senhaUsuario;

        $recebeSenhaUsuarioCriptograda = md5($senhaUsuario);

        if (!empty($recebeImagemUsuario)) {
            $tipo_imagem = $recebeImagemUsuario["type"];

            if ($tipo_imagem === "image/png" || $tipo_imagem === "image/jpeg" || $tipo_imagem === "image/jpg") {
                $destino_imagem = "../visao/acesso/imagem_perfil/" . $recebeImagemUsuario["name"];
                $recebeNomeImagem = $recebeImagemUsuario["name"];
                copy($recebeImagemUsuario["tmp_name"], $destino_imagem);
            }
        }

        if (
            !empty($nomeDeUsuario) && !empty($emailUsuario) && !empty($nomeDeUsuario) && !empty($senhaUsuario) && !empty($perfilUsuario)
        ) {
            $usuarioControladora = new UsuarioControladora();
            $recebeCadastroUsuario = $usuarioControladora->CadastroUsuario($nomeUsuario, $emailUsuario, $nomeDeUsuario,
            $recebeSenhaUsuarioCriptograda,$recebeSenhaDescriptografadaCriacao, $perfilUsuario,$recebeNomeImagem);
            echo json_encode($recebeCadastroUsuario);
        } else {
            echo json_encode("Favor verificar o preenchimento dos campos");
        }
    }elseif($recebeProcessoUsuario === "recebe_autenticacao_usuario"){
        $recebeLoginUsuario = $_POST["login-usuario-autenticacao"];
        $recebeSenhaUsuario = $_POST["senha-usuario-autenticacao"];

        $recebeSenhaDescriptografadaAutenticacao = $recebeSenhaUsuario;

        $recebeSenhaCriptografadaUsuario = md5($recebeSenhaUsuario);

        if(!empty($recebeLoginUsuario) && !empty($recebeSenhaUsuario)){
            $usuarioControladora = new UsuarioControladora();
            $recebeAutenticacaoUsuario = $usuarioControladora->AutenticacaoUsuario($recebeLoginUsuario,$recebeSenhaCriptografadaUsuario,$recebeSenhaDescriptografadaAutenticacao);

            if(!empty($recebeAutenticacaoUsuario))
                echo json_encode($recebeAutenticacaoUsuario);
            else
                echo json_encode("Favor verificar os dados preenchidos");
        }
    }elseif($recebeProcessoUsuario == "deslogar")
    {
            //é declarada a variavel $usuario_controladora que ira ser novo objeto de instancia da classe usuariocontroladora
            $usuario_controladora = new UsuarioControladora();
            //é declarada a variavel $resultado_DeslogarUsuario que ira receber o valor retornado do metodo para deslogar usuario
            $resultado_DeslogarUsuario = $usuario_controladora->DeslogarUsuario();
            //é imprimido o valor codificado em json para a api usuario
            echo json_encode($resultado_DeslogarUsuario);
    //é verificado se o valor da variavel $recebe_autenticacao_usuario é igual a cadastrar+isiarop e caso seja entrara no elseif
    }
}else if($_SERVER["REQUEST_METHOD"] === "PUT")
{
    $informacoes_altera_usuario = json_decode(file_get_contents("php://input", true));

    echo json_encode($informacoes_altera_usuario);
}
?>