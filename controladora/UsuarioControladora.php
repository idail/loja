<?php 
    require ("../modelo/Usuario.php");
    
    class UsuarioControladora{
        private $usuario;

        public function __construct()
        {
            $this->usuario = new Usuario();

        }

        public function CadastroUsuario( $recebeNomeUsuario, $recebeEmailUsuario , $recebeLoginUsuario, $recebeSenhaUsuario, $recebePerfilUsuario, $recebeImagemUsuario){

            $this->usuario->setNome_Usuario($recebeNomeUsuario);
            $this->usuario->setEmail_Usuario($recebeEmailUsuario);
            $this->usuario->setLogin_Usuario($recebeLoginUsuario);
            $this->usuario->setSenha_Usuario($recebeSenhaUsuario);
            $this->usuario->setPerfil_Usuario($recebePerfilUsuario);
            
            if(!empty($recebeImagemUsuario))
                $this->usuario->setImagem_Usuario($recebeImagemUsuario);

            $resultadoUsuario = $this->usuario->cadastroUsuario();
            return $resultadoUsuario;
        }
        
        public function AutenticacaoUsuario($recebeLoginUsuario,$recebeSenhaUsuario)
        {
            $this->usuario->setLogin_Usuario($recebeLoginUsuario);
            $this->usuario->setSenha_Usuario($recebeSenhaUsuario);

            $resultadoAutenticacaoUsuario = $this->usuario->autenticacaoUsuario();

            return $resultadoAutenticacaoUsuario;
        }
    }

?>