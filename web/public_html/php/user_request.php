<?php

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

   function update_settings($privacy)
   {
      $client = new rabbitMQClient("../testRabbitMQ.ini","testserver");
      
      //Update profile privacy
      $request = array();
      $request['type'] = "user_update_profile_privacy";
      $request['user_id'] = $_SESSION['userid'];
      $request['public'] = true_false_to_1_0($privacy[0]);
      $response = $client ->send_request($request);
      echo json_encode($response);

      //Update friend privacy
      $request = array();
      $request['type'] = "user_update_friends_public";
      $request['user_id'] = $_SESSION['userid'];
      $request['public'] = true_false_to_1_0($privacy[1]);
      $response = $client ->send_request($request);
      echo json_encode($response);

      //Update achievements privacy
      $request = array();
      $request['type'] = "user_update_achievements_public";
      $request['user_id'] = $_SESSION['userid'];
      $request['public'] = true_false_to_1_0($privacy[2]);
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
         $response = update_settings($request["privacy"]);
         break;
   }

   echo json_encode($response);
   exit(0);

?>