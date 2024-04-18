<?php
require("Conexao.php");
require("ImagemInterface.php");

class Imagem implements ImagemInterface{
    private $codigo_imagem;
    private $imagem;
    private $codigo_produto_imagem;

    public function setCodigo_Imagem($codigo_imagem)
    {
        $this->codigo_imagem = $codigo_imagem;
    }

    public function getCodigo_Imagem()
    {
        return $this->codigo_imagem;
    }

    public function setImagem($imagem)
    {
        $this->imagem = $imagem;
    }

    public function getImagem()
    {
        return $this->imagem;
    }

    public function setCodigo_Produto_Imagem($codigo_produto_imagem)
    {
        $this->codigo_produto_imagem = $codigo_produto_imagem;
    }

    public function getCodigo_Produto_Imagem()
    {
        return $this->codigo_produto_imagem;
    }

    public function cadastrarImagem(): int
    {
        try{
            if(!empty($this->getImagem()) && !empty($this->getCodigo_Produto_Imagem()))
            {
                for ($indice=0; $indice < count($this->getImagem()); $indice++)
                { 
                    $instrucaoCadastroImagem = "insert into imagens_produtos(imagem,codigo_produto_imagem)values(:recebe_imagem,
                    :recebe_codigo_produto_imagem)";
                    $comandoCadastroImagem = Conexao::Obtem()->prepare($instrucaoCadastroImagem);
                    $comandoCadastroImagem->bindValue(":recebe_imagem",$this->getImagem()[$indice]);
                    $comandoCadastroImagem->bindValue(":recebe_codigo_produto_imagem",$this->getCodigo_Produto_Imagem()[$indice]);

                    $resultadoCadastroImagem = $comandoCadastroImagem->execute();

                    $ultimoCodigoCadastradoImagem = Conexao::Obtem()->lastInsertId();
                }

                return $ultimoCodigoCadastradoImagem;
            }
        }catch(PDOException $exception)
        {
            return $exception->getMessage();
        //caso ocorre algum erro na execução do try de exceção será retornado a mensagem de erro
        }catch(Exception $excecao)
        {
            return $excecao->getMessage();
        }
    }

    public function AlterarImagemEspecifica():string
    {
        try{
            if(!empty($this->getImagem()) && !empty($this->getCodigo_Produto_Imagem()))
            {
                for ($alterar=0; $alterar < count($this->getImagem()); $alterar++) { 
                    $instrucaoAlterarImagemEspecifica = "update imagens_produtos set imagem = :recebe_imagem_produto_alterar where codigo_imagem = :recebe_codigo_imagem";
                    $comandoAlterarImagemEspecifica = Conexao::Obtem()->prepare($instrucaoAlterarImagemEspecifica);
                    $comandoAlterarImagemEspecifica->bindValue(":recebe_imagem_produto_alterar",$this->getImagem()[$alterar]);
                    $comandoAlterarImagemEspecifica->bindValue(":recebe_codigo_imagem",$this->getCodigo_Imagem()[$alterar]);
                    
                    $resultadoAlterarImagemEspecifica = $comandoAlterarImagemEspecifica->execute();
                }

                if($resultadoAlterarImagemEspecifica)
                    return "Produto alterado com sucesso";
                else
                    return "Produto não foi alterado";
            }
        }catch (PDOException $exception) {
            $recebe_erro =  $exception->getMessage();
            return $recebe_erro;
        } catch (Exception $excecao) {
            $recebe_erro =  $excecao->getMessage();
            return $recebe_erro;
        }
    }
}
?>