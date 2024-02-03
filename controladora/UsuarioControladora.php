<?php 
    require ("../modelo/Usuario.php");
    
    class UsuarioControladora{
        private $usuario;

        public function __construct()
        {
            $this->usuario = new Usuario();

        }

        public function CadastroUsuario( $recebeNomeUsuario, $recebeLoginUsuario, $recebeSenhaUsuario, $recebeEmailUsuario){

            $this->usuario->setNome_Usuario($recebeNomeUsuario);
            $this->usuario->setLogin_Usuario($recebeLoginUsuario);
            $this->usuario->setSenha_Usuario($recebeSenhaUsuario);
            $this->usuario->setEmail_Usuario($recebeEmailUsuario);

            $resultadoUsuario = $this->usuario->cadastroUsuario();
            return $resultadoUsuario;
        }        
    }

?>