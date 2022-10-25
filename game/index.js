var engine = new Engine();
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
    entity_manager.think()
    entity_manager.update()
}

engine.render = function()
{
    
    engine.ctx.clearRect(0, 0, canvas.width, canvas.height);
    engine.ctx.fillStyle = '#1bafdb';
    engine.ctx.fillRect(0, 0, engine.cnv.width, engine.cnv.height);
    
    entity_manager.draw();
}

