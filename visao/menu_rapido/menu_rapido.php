<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<!-- Sales Card -->
<div class="col-xl-4 col-md-4">
    <div class="card info-card sales-card">

        <div class="filter">
            <a class="icon" href="#" data-bs-toggle="dropdown"><i id="remove-ponteiros-1" class="bi bi-three-dots"></i></a>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <!-- <li class="dropdown-header text-start">
                                    <h6>Filter</h6>
                                </li>

                                <li><a class="dropdown-item" href="#">Today</a></li>
                                <li><a class="dropdown-item" href="#">This Month</a></li>
                                <li><a class="dropdown-item" href="#">This Year</a></li> -->
            </ul>
        </div>

        <div class="card-body">
            <h5 class="card-title"> <span></span></h5>
            <a href="index.php?pagina=consulta_clientes">
                <div class="d-flex align-items-center" id="clique-para-consultar-clientes" style="cursor: pointer;">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-person-lines-fill"></i>
                    </div>
                    <div class="ps-3">
                        <h6>Consultar Clientes</h6>
                        <!-- <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span> -->

                    </div>
                </div>
            </a>
        </div>

    </div>
</div><!-- End Sales Card -->

<!-- Revenue Card -->
<div class="col-xxl-4 col-md-4">
    <div class="card info-card revenue-card">

        <div class="filter">
            <a class="icon" href="#" data-bs-toggle="dropdown"><i id="remove-ponteiros-2" class="bi bi-three-dots"></i></a>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li class="dropdown-header text-start">
                    <h6>Filter</h6>
                </li>

                <li><a class="dropdown-item" href="#">Today</a></li>
                <li><a class="dropdown-item" href="#">This Month</a></li>
                <li><a class="dropdown-item" href="#">This Year</a></li>
            </ul>
        </div>

        <div class="card-body">
            <h5 class="card-title"></span></h5>
            <a href="index.php?pagina=consulta_produtos">
                <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-cart2"></i>
                    </div>
                    <div class="ps-3">
                        <h6>Consultar Produtos</h6>
                        <!-- <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span> -->

                    </div>
                </div>
            </a>
        </div>

    </div>
</div><!-- End Revenue Card -->

<!-- Customers Card -->
<div class="col-xxl-4 col-md-4">

    <div class="card info-card customers-card">

        <div class="filter">
            <a class="icon" href="#" data-bs-toggle="dropdown"><i id="remove-ponteiros-3" class="bi bi-three-dots"></i></a>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li class="dropdown-header text-start">
                    <h6>Filter</h6>
                </li>

                <li><a class="dropdown-item" href="#">Today</a></li>
                <li><a class="dropdown-item" href="#">This Month</a></li>
                <li><a class="dropdown-item" href="#">This Year</a></li>
            </ul>
        </div>

        <div class="card-body">
            <h5 class="card-title"></span></h5>
            <a href="index.php?pagina=consulta_venda">
                <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-handbag"></i>
                    </div>
                    <div class="ps-3">
                        <h6>Consultar Vendas</h6>
                        <!-- <span class="text-danger small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">decrease</span> -->

                    </div>
                </div>
            </a>
        </div>
    </div>

</div><!-- End Customers Card -->

<section class="section">
    <div class="row">
        <div class="col-lg-6">

            <div class="card">
                <!-- <div class="filter">
                    <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li class="dropdown-header text-start">
                            <h6>Filter</h6>
                        </li>

                        <li><a class="dropdown-item" href="#">Today</a></li>
                        <li><a class="dropdown-item" href="#">This Month</a></li>
                        <li><a class="dropdown-item" href="#">This Year</a></li>
                    </ul>
                </div> -->

                <div class="card-body pb-0">
                    <!-- <h5 class="card-title">Website Traffic <span>| Today</span></h5> -->

                    <div id="trafficChart" style="min-height: 400px;" class="echart col-xl-6"></div>

                    <script>
                        $(document).ready(function(e) {
                            debugger;

                            var dados = [];

                            var recebe_total_clientes = "";
                            var recebe_total_vendas = "";
                            var recebe_vendas_vencer = "";
                            var recebe_vendas_vh = "";

                            recebe_total_clientes =  $.ajax({
                                url: "../api/ClienteAPI.php",
                                dataType: "json",
                                type: "get",
                                data: {
                                    processo_cliente: "recebe_consultar_total_clientes",
                                },
                                success: function(retorno_cliente) {
                                    debugger;
                                    dados.push({
                                        value: retorno_cliente,
                                        name: "Clientes"
                                    });
                                },
                                error: function(xhr, status, error) {

                                },
                            });

                            recebe_total_vendas = $.ajax({
                                url: "../api/VendaAPI.php",
                                dataType: "json",
                                type: "get",
                                data: {
                                    processo_venda: "recebe_consultar_total_vendas",
                                },
                                success: function(retorno_venda) {
                                    debugger;

                                    dados.push({
                                        value: retorno_venda,
                                        name: "Vendas"
                                    });
                                },
                                error: function(xhr, status, error) {

                                },
                            });

                            recebe_vendas_vencer = $.ajax({
                                url: "../api/VendaAPI.php",
                                dataType: "json",
                                type: "get",
                                data: {
                                    processo_venda: "recebe_consultar_vendas_vencer",
                                },
                                success: function(retorno_venda_vencer) 
                                {
                                    let recebe_quantidade_vendas_vencer = retorno_venda_vencer.length;
                                    dados.push({
                                        value: recebe_quantidade_vendas_vencer,
                                        name: "A Vencer"
                                    });
                                },
                                error:function(xhr,status,error)
                                {

                                },
                            });

                            recebe_vendas_vh = $.ajax({
                                url: "../api/VendaAPI.php",
                                dataType: "json",
                                type: "get",
                                data: {
                                    processo_venda: "recebe_consultar_vendas_vencer_hoje",
                                },
                                success: function(retorno_venda_vencer_hoje) 
                                {
                                    let recebe_quantidade_vendas_vencer_hoje = retorno_venda_vencer_hoje.length;
                                    dados.push({
                                        value: recebe_quantidade_vendas_vencer_hoje,
                                        name: "Vencidas"
                                    });
                                },
                                error:function(xhr,status,error)
                                {

                                },
                            });

                            $.when(recebe_total_clientes, recebe_total_vendas, recebe_vendas_vencer, recebe_vendas_vh).done(function() {
                                debugger;
                            
                                echarts.init(document.querySelector("#trafficChart")).setOption({
                                        tooltip: {
                                            trigger: 'item'
                                        },
                                        legend: {
                                            top: '5%',
                                            left: 'center'
                                        },
                                        series: [{
                                            name: 'Informações',
                                            type: 'pie',
                                            radius: ['40%', '70%'],
                                            avoidLabelOverlap: false,
                                            label: {
                                                show: false,
                                                position: 'center'
                                            },
                                            emphasis: {
                                                label: {
                                                    show: true,
                                                    fontSize: '18',
                                                    fontWeight: 'bold'
                                                }
                                            },
                                            labelLine: {
                                                show: false
                                            },
                                            data: dados
                                        }]
                                    });
                            });
                        });
                    </script>

                </div>
            </div><!-- End Website Traffic -->
        </div>

        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Vendas</h5>

                    <!-- Bar Chart -->
                    <canvas id="barChart" style="max-height: 400px;"></canvas>
                    <script>
                        let numeros = [10, 25, 30, 85, 74, 96, 12, 7, 1, 20, 11, 2];
                        document.addEventListener("DOMContentLoaded", () => {
                            new Chart(document.querySelector('#barChart'), {
                                type: 'bar',
                                data: {
                                    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                                    datasets: [{
                                        label: 'Vendas',
                                        data: numeros,
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                            'rgba(255, 205, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(201, 203, 207, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgb(255, 99, 132)',
                                            'rgb(255, 159, 64)',
                                            'rgb(255, 205, 86)',
                                            'rgb(75, 192, 192)',
                                            'rgb(54, 162, 235)',
                                            'rgb(153, 102, 255)',
                                            'rgb(201, 203, 207)'
                                        ],
                                        borderWidth: 1
                                    }]
                                },
                                options: {
                                    scales: {
                                        y: {
                                            beginAtZero: true
                                        }
                                    }
                                }
                            });
                        });
                    </script>
                    <!-- End Bar CHart -->

                </div>
            </div>
        </div>
    </div>
</section>