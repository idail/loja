<?php 
    require ("../modelo/Usuario.php");
    
    class UsuarioControladora{
        private $usuario;

        public function __construct()
        {
            $this->usuario = new Usuario();

        }

        public function CadastroUsuario( $recebeNomeUsuario, $recebeLoginUsuario, $recebeSenhaUsuario, $recebeEmailUsuario, $recebePerfilUsuario){

            $this->usuario->setNome_Usuario($recebeNomeUsuario);
            $this->usuario->setEmail_Usuario($recebeEmailUsuario);
            $this->usuario->setLogin_Usuario($recebeLoginUsuario);
            $this->usuario->setSenha_Usuario($recebeSenhaUsuario);
            $this->usuario->setPerfil_Usuario($recebePerfilUsuario);

            $resultadoUsuario = $this->usuario->cadastroUsuario();
            return $resultadoUsuario;
        }        
    }

?>