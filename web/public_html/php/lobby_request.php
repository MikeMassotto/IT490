<?php

    function get_dir(){

        //https://www.positioniseverything.net/php-header-location/

        // getting hostname
        $hostname = $_SERVER[“HTTP_HOST”];
        // getting the current directory preceded by a forward “/” slash
        $current_directory = rtrim(dirname($_SERVER[‘PHP_SELF’]));
        return $current_directory;
    }

    function create_room(){
        $client = new rabbitMQClient("../testRabbitMQ.ini","testserver");
        $request = array();
        $request['type'] = 'lobby_add';
        $_SESSION['lobby_host'] = true;
        $_SESSION['lobby_id'] = rand(0000,9999);
        return $client->send_request($request);
    }

    function join_room($lobbyid){
        $client = new rabbitMQClient("../testRabbitMQ.ini","testserver");
        $request = array();
        $_SESSION['lobby_host'] = false;
        header("Location: http://"+get_dir()+"/lobby_game.html");
        return $client->send_request($request);
    }

    function list_rooms(){
        $client = new rabbitMQClient("../testRabbitMQ.ini","testserver");
        $request = array();
        $request['type'] = "get_lobbies";
        return $client->send_request($request);
    }

   $request = $_POST;

   //Switch statement handles all user requests from here

   switch ($request["type"]){

        case "create":
            $response = create_room();
            break;

        case "join":
            $response = join_room($request["lobbyid"]);
            break;

        case "list":
            $response = list_rooms();
   }

   echo json_encode($response);
   exit(0);

?>