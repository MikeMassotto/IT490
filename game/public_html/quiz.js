var engine = new Engine();
var correct = false;
var game_list;
var solution_index;
var solution_name = '';

var round_max = 10;
var round_count = 9;



window.onload = function()
{
    engine.start();
    add_session_var_from_server("name");
}

engine.init = function()
{
    console.log("init");
    
    //get_session_var("name");

    var request_t = new XMLHttpRequest();
	request_t.open("POST","network/request.php",true);
	request_t.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

    request_t.onreadystatechange= function ()
	{
		if ((this.readyState == 4)&&(this.status == 200))
		{
			data = this.responseText;
            result = JSON.parse(JSON.parse(data));
            game_1 = Math.floor(Math.random() * 100);
            console.log(result[game_1.toString()]);
            game_list = result;

            entity_manager.clear();
            start_quiz();

            //console.log("test");
            //console.log(result);
		}		
	}
    console.log('send');
	request_t.send("type=get_all_steam_games");
    console.log('sent');

    text = new Entity;
    text.label.text =  "Connecting...";
    text.position.x = 1280/2;
    text.position.y = 720/2;
    text.label.font = "72px serif"

}

engine.update = function()
{
    entity_manager.think();
    entity_manager.update();

    // Update mouse last!
    engine.mouse.update();

    if(engine.mouse.event){
        send_update();
    }
}

engine.render = function()
{
    
    engine.ctx.clearRect(0, 0, canvas.width, canvas.height);
    engine.ctx.fillStyle = '#1C1731';
    engine.ctx.fillRect(0, 0, engine.cnv.width, engine.cnv.height);

    entity_manager.draw();
}

function game_over()
{
    round_count++;
    
    
    
    entity_manager.clear();

    if( round_count >= 10 ){
        text = new Entity;
        text.label.text =  "Game Over";
        text.position.x = 1280/2;
        text.position.y = 720/2;
        text.label.font = "72px serif"
        
        var request = new XMLHttpRequest();
        request.open("POST","network/request.php",true);
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    
        request.send("type=update_user_stats&user_id=2&win=1&points=10");

        return;
    }

    timer = new_timer();
    timer.position.x = 1200;
    timer.position.y = 50;
    timer.nums.x = 5;
    timer.label.text = 5;
    timer.label.font = "64px serif"

    text = new Entity;
    text.label.text =  "You were wrong.";
    if( correct ){
        text.label.text =  "Correct!";
    }
        text.position.x = 1280/2;
    text.position.y = 720/2;
    text.label.font = "72px serif"

    setTimeout(function() {
        entity_manager.clear();
    }, 5000)
    
    setTimeout(function() {
        start_quiz();
    }, 5000)

}


function start_quiz()
{
    correct = false;
    solution_index = Math.floor(Math.random() * 4);
    let random_nums = [Math.floor(Math.random() * 100)];

    while(true)
    {
        if(random_nums.length == 4) break;
        num = Math.floor(Math.random() * 100);
        if( !random_nums.includes(num) ){
            random_nums.push(num);
        }

    }

    var request = new XMLHttpRequest();
    request.open("POST","network/post.php",true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    console.log("post");
    request.onreadystatechange = function(){
        if ((this.readyState == 4)&&(this.status == 200))
		{
			console.log(this.responseText);
		}	
    }
	request.send("status=starting&game1=" + random_nums[0].toString() + 
    "&game2=" + random_nums[1].toString() + 
    "&game3=" + random_nums[2].toString() +
    "&game4=" + random_nums[3].toString() + 
    "&solution=" + solution_index.toString());
    
    user_name = new Entity;
    user_name.label.text = sessionStorage.getItem("name");
    user_name.position.x = 50;
    user_name.position.y = 50;

    btn_1 = new_button();
    btn_1.position.x = 50;
    btn_1.position.y = 150;
    btn_1.label.text = game_list[random_nums[0].toString()]["1"];
    btn_1.tag = 0;

    btn_2 = new_button();
    btn_2.position.x = 50;
    btn_2.position.y = btn_1.position.y + 100;
    btn_2.label.text = game_list[random_nums[1].toString()]["1"];
    btn_2.tag = 1;

    btn_3 = new_button();
    btn_3.position.x = 50;
    btn_3.position.y = btn_2.position.y + 100;
    btn_3.label.text = game_list[random_nums[2].toString()]["1"];
    btn_3.tag = 2;

    btn_4 = new_button();
    btn_4.position.x = 50;
    btn_4.position.y = btn_3.position.y + 100;
    btn_4.label.text = game_list[random_nums[3].toString()]["1"];
    btn_4.tag = 3;

    timer = new_timer();
    timer.position.x = 1200;
    timer.position.y = 50;
    timer.label.text = 15;
    timer.nums.x = 15;
    timer.label.font = "64px serif"

    tags = new Entity;
    tags.label.text = game_list[random_nums[solution_index].toString()]["3"].replace("/,/g", ", ");
    tags.position.x = 800;
    tags.position.y = 300;

    l1 = new Entity;
    l1.label.text = game_list[random_nums[solution_index].toString()]["2"].replace("/" + game_list[random_nums[solution_index].toString()]["1"] + "/g", "___");
    l1.position.x = 800;
    l1.position.y = 400;

    solution_name = game_list[random_nums[solution_index].toString()]["1"];

    console.log(solution_name);

    console.log("network update");
    

}

function send_update()
{
   

}

function add_session_var_from_server( session_var )
{
    var request = new XMLHttpRequest();
    request.open("POST","network/request.php",true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

    request.onreadystatechange= function ()
	{
		if ((this.readyState == 4)&&(this.status == 200))
		{
            sessionStorage.setItem(session_var, json.parse(this.responseText));
			return;
		}		
	}
	request.send("type=get_session_var&var=" + session_var);
}