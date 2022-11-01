<?php

   $request = $_POST;

   //Switch statement handles all game requests from here

   switch ($request["type"]){

      case "all":
         $response = get_profile_info($request["userid"]);
         break;

      case "friends_list":
         $response = get_friends_list($request["userid"]);
         break;
   }

   echo json_encode($response);
   exit(0);

?>