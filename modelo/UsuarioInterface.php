<?php 
    interface UsuarioInterface {
        public function cadastroUsuario():int;
        public function autenticacaoUsuario():array;
    };
?>