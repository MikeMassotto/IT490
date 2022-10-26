function new_timer()
{
    let timer = new Entity;
    timer.think = timer_think;
    self.nums.y = 0;
    timer.nums.x = 2;


    return timer;
}

function timer_think( self )
{
    console.log(self.sprite)
    if( self.nums.y == 60)
    {
        self.nums.x--;
        if(  self.nums.x >= 0 ){  
            self.label.text = self.nums.x.toString();
        }
        self.nums.y = 0;
    }
    if( self.nums.x == -2 )
    {
        game_over();
    }
    
    self.nums.y += 1;
}
