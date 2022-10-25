function new_button()
{
    let button = new Entity;
    button.think = button_think;
    button.sprite = new Image();
    button.sprite.src = "button.png"
    button.scale.x = 0.5;
    button.scale.y = 0.5;
    button.label.text = "label";
    button.label.offset.x = ( button.sprite.width * button.scale.x ) / 2;
    button.label.offset.y = ( button.sprite.height * button.scale.y ) / 2;

    return button;
}

function button_think( self )
{

}