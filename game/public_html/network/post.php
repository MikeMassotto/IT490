<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

echo `whoami`;

if(!isset($_POST)) exit(0);
//$text = $_POST['text'];

$dir = 'game_servers/';

// create new directory with 744 permissions if it does not exist yet
if ( !file_exists($dir) ) {
    mkdir ($dir, 0744);
}

$text = '';

foreach ($_POST as $key => $value)
{
    $text = $text . "&" . $key . "=". $value; 
}

$text = $text.PHP_EOL;
$room = "/" . $_SESSION["lobby_id"] . ".txt";

file_put_contents ($dir.$room, $text, FILE_APPEND);

exit(0)
?>