<?php

   function get_all_user_data($userid)
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

   $request = $_POST;

   //Switch statement handles all user requests from here

   switch ($request["type"]){

      case "all":
         $response = get_all_user_data($request["userid"]);
         break;
   }

   echo json_encode($response);
   exit(0);

?>