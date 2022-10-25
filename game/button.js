function new_button()
{
    let button = new Entity;
    button.think = button_think;
    button.sprite = new Image();
    button.sprite.src = "test.png"

    button.position.x = 1200;
    button.position.y = 500;
    return button;
}

function button_think( self ){
    self.position.x += Math.floor(Math.random() * 11) - 5;
    self.position.y += Math.floor(Math.random() * 11) - 5;
    
    self.scale.x = .2;//Math.floor(Math.random() * 100) / 100;
    self.scale.y = .2;//Math.floor(Math.random() * 100) / 100;
}