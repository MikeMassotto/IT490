let engine = new Engine();
let button = new_button();
let button2 = new_button();


window.onload = function()
{
    engine.start();
    for( let i = 0; i < 5; i++ )
    {
        ent = new_button();
        ent.tag = i.toString();
    }
}

engine.init = function()
{
    console.log("init");
}

engine.update = function()
{
    //button.think();
    entity_manager.think()
}

engine.render = function()
{
    
}