<?php
$pa=getcwd();
if(strncasecmp(PHP_OS, 'WIN', 3) == 0) {
    echo exec($pa.'/a.exe'." ". $_GET["num"]);
}
else {
    echo exec($pa.'/a.out'." ". $_GET["num"]);
}
?>
