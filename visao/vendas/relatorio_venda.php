<?php
require(__DIR__ . "../../../vendor/autoload.php");
$dados = "<h1>Olá , <span>Idail Neto</span></h1><br>";
$dados .= __DIR__;

use  Dompdf\Dompdf;

$dompdf = new Dompdf(['enable_remote' => true]);

$dompdf->loadHtml($dados);

$dompdf->setPaper('A4', 'portrait');

$dompdf->render();

$dompdf->stream();
?>