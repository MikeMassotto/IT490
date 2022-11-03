
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once('../path.inc');
require_once('../get_host_info.inc');
require_once('../rabbitMQLib.inc');

function get_all_games(){
    $client = new rabbitMQClient("../testRabbitMQ.ini","testserver");
    $request = array();
    $request['type'] = 'get_all_steam_games';
    return $client->send_request($request);
}

function join_room($lobbyid){
    $client = new rabbitMQClient("../testRabbitMQ.ini","testserver");
    $request = array();
    $_SESSION['lobby_host'] = false;
    header("Location: lobby_game.html");
    return $client->send_request($request);
}

$request = $_POST;

//Switch statement handles all user requests from here

switch ($request["type"]){

case "get_all_steam_games":
    $response = get_all_games();
    break;

case "join":
    $response = join_room($request["lobbyid"]);
    break;

}

echo json_encode($response);
exit(0);

?>