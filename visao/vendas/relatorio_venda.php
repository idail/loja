<?php
$dados = "<h1>Olá , <span>Idail Neto</span></h1>";

use Dompdf\Dompdf;

$dompdf = new Dompdf(['enable_remote' => true]);

$dompdf->loadHtml($dados);

$dompdf->setPaper('A4', 'portrait');

$dompdf->render();

$dompdf->stream();
?>