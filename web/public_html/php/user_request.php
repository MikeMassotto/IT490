<?php

   $request = $_POST;

   //Switch statement handles all user requests from here

   switch ($request["type"]){

      case "all":
         break;

      case "profile_name":
         echo "bob";
         break;
   }

   exit(0);

?>