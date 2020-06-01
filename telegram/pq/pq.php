<?php
if (strncasecmp(PHP_OS, 'WIN', 3) == 0) {
    $pa=getcwd();
    echo exec($pa.'/a.exe'." ". $_GET["num"]);
} else {
    $pa=getcwd();
    echo exec($pa.'/a.out'." ". $_GET["num"]);
}
?>
