<?php

   function get_dir(){

	//https://www.positioniseverything.net/php-header-location/

	// getting hostname
	$hostname = $_SERVER[“HTTP_HOST”];
	// getting the current directory preceded by a forward “/” slash
	$current_directory = rtrim(dirname($_SERVER[‘PHP_SELF’]));
	return $current_directory;
   }

   function get_profile_info($userid)
   {

      $client = new rabbitMQClient("../testRabbitMQ.ini","testserver");
      $request = array();
      $request['type'] = "get_user_data";
      $request['user_id'] = $userid;
      echo json_encode($request);

      $response = $client ->send_request($request);

      if($response)
      {
         echo $response;
         return $response;
      }

      return "No response.";

   }

   function get_friends_list($userid)
   {

      $client = new rabbitMQClient("../testRabbitMQ.ini","testserver");
      $request = array();
      $request['type'] = "get_friends_list";
      $request['user_id'] = $userid;
      echo json_encode($request);

      $response = $client ->send_request($request);

      if($response)
      {
         echo $response;
         return $response;
      }

      return "No response.";

   }

   function true_false_to_1_0($bool)
   {
      if($bool)
      {
         return 1;
      }
      else
      {
         return 0;
      }
   }

   function update_settings($profile_privacy, $friend_privacy, $achievement_privacy)
   {
      $client = new rabbitMQClient("../testRabbitMQ.ini","testserver");
      
      //Update profile privacy
      $request = array();
      $request['type'] = "user_update_profile_privacy";
      $request['user_id'] = $_SESSION['userid'];
      $request['public'] = true_false_to_1_0($profile_privacy);
      $response = $client ->send_request($request);
      echo json_encode($response);

      //Update friend privacy
      $request = array();
      $request['type'] = "user_update_friends_public";
      $request['user_id'] = $_SESSION['userid'];
      $request['public'] = true_false_to_1_0($friend_privacy);
      $response = $client ->send_request($request);
      echo json_encode($response);

      //Update achievements privacy
      $request = array();
      $request['type'] = "user_update_achievements_public";
      $request['user_id'] = $_SESSION['userid'];
      $request['public'] = true_false_to_1_0($achievement_privacy);
      $response = $client ->send_request($request);
      echo json_encode($response);

   }

   $request = $_POST;

   //Switch statement handles all user requests from here

   switch ($request["type"]){

      case "all":
         $response = get_profile_info($request["userid"]);
         break;

      case "friends_list":
         $response = get_friends_list($request["userid"]);
         break;

      case "settings":
         $response = update_settings($request["profile_privacy"], $request["friend_privacy"], $request["achievement_privacy"]);
         break;
   }

   echo json_encode($response);
   exit(0);

?>