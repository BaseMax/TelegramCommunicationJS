<?php
$pa=getcwd();
echo exec($pa.'/a.out'." ". $_GET["num"]);
?>