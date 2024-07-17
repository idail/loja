$(document).ready(function(e){
    $("#remove-ponteiros-1").removeClass("bi bi-three-dots");
    $("#remove-ponteiros-2").removeClass("bi bi-three-dots");
    $("#remove-ponteiros-3").removeClass("bi bi-three-dots");

    let url_inicio = window.location.href;

    if(url_inicio === "http://localhost/loja/visao/index.php")
    {
        $.ajax({
            url: "../api/VendaAPI.php",
            dataType: "json",
            type: "get",
            data: {
                processo_venda: "recebe_consultar_vendas_vencer",
            },
            success: function(retorno_venda_vencer) 
            {
                let recebe_quantidade_vendas_vencer = retorno_venda_vencer.length;
                $("#exibi-quantidade-vendas-vencer").html(recebe_quantidade_vendas_vencer);
            },
            error:function(xhr,status,error)
            {

            },
        });
    }
});