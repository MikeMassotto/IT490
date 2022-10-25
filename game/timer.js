function new_timer()
{
    let timer = new Entity;
    timer.think = timer_think;
    timer.sprite = 0;
    timer.scale.x = 0;
    timer.scale.y = 2;


    return timer;
}

function timer_think( self )
{
    console.log(self.sprite)
    if( self.scale.x == 60)
    {
        self.scale.y--;
        if(  self.scale.y >= 0 ){  
            self.label.text = self.scale.y.toString();
        }
        self.scale.x = 0;
    }
    if( self.scale.y == -2 )
    {
        game_over();
    }
    
    self.scale.x += 1;
}
