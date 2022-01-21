<?php
header('Access-Control-Allow-origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: token, Content-Type');
header('Access-Control-Max-Age: 1728000');
header('Content-Length:0');
header('Content-Type: text/plain');



$con = mysqli_connect("127.0.0.1:3306","root","","ionic-test") or die("could not connect DB");

?>