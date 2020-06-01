<?php
// Max Base
// https://github.com/BaseMax/TelegramCommunication
for($i=11;$i<=46;$i++) {
	exec("find . -type d -name '*_cache' -exec rm -r {} +");
	exec("unzip -o ".$i.".zip");
	exec("rm readme");
	exec("git add .");
	exec("git commit -m \"Part ".$i."\"");
	exec("git push");
}
