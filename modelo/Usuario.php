<?php 

require ("UsuarioInterface.php");
require ("Conexao.php");

class Usuario implements UsuarioInterface{

    private $codigo_usuario;
    private $nome_usuario;
    private $login_usuario;
    private $senha_usuario;
    private $email_usuario;
    private $perfil_usuario;

    public function setCodigo_Usuario($codigo_usuario){
        $this->codigo_usuario = $codigo_usuario;
    }

    public function getCodigo_Usuario(){
        return $this->codigo_usuario;
    }

    public function setNome_Usuario($nome_usuario){
        $this->nome_usuario = $nome_usuario;
    }

    public function getNome_Usuario(){
        return $this->nome_usuario;
    }

    public function setLogin_Usuario($login_usuario){
        $this->login_usuario = $login_usuario;
    }

    public function getLogin_Usuario(){
        return $this->login_usuario;
    }

    public function setSenha_Usuario($senha_usuario){
        $this->senha_usuario = $senha_usuario;
    }

    public function getSenha_Usuario(){
        return $this->senha_usuario;
    }

    public function setEmail_Usuario($email_usuario){
        $this->email_usuario = $email_usuario;
    }

    public function getEmail_Usuario(){
        return $this->email_usuario;
    }

    public function setPerfil_Usuario($perfil_usuario){
        $this->perfil_usuario = $perfil_usuario;
    }

    public function getPerfil_Usuario(){
        return $this->perfil_usuario;
    }

    public function cadastroUsuario():int {
        try{

            $instrucaoCadastroUsuario = "insert into usuarios(nome_usuario, login_usuario, senha_usuario, email_usuario, perfil_usuario) values(:recebeNomeUsuario, :recebeLoginUsuario, :recebeSenhaUsuario, :recebeEmailUsuario, :recebePerfilUsuario)";
            $conexaoExecutada = Conexao::Obtem()->prepare($instrucaoCadastroUsuario);
            $conexaoExecutada->bindValue(":recebeNomeUsuario", $this->getNome_Usuario());
            $conexaoExecutada->bindValue(":recebeLoginUsuario", $this->getLogin_Usuario());
            $conexaoExecutada->bindValue(":recebeSenhaUsuario", $this->getSenha_Usuario());
            $conexaoExecutada->bindValue(":recebeEmailUsuario", $this->getEmail_Usuario());
            $conexaoExecutada->bindValue(":recebePerfilUsuario", $this->getPerfil_Usuario());
            
            $resultadoCadastroUsuario = $conexaoExecutada->execute();
            $ultimoCodigoCadastrado = Conexao::Obtem()->lastInsertId();

            if(!empty ($ultimoCodigoCadastrado))
                return $ultimoCodigoCadastrado;
            else 
                return 0;

        }catch (PDOException $exception){
            return $exception->getMessage();
        }catch (Exception $excecao){
            return $excecao->getMessage();
        }
    }
};
?>