
class Entity {
    constructor()
    {
        this.position = {x : 0, y : 0};
        this.action = null;
        this.think = null;
        this.sprite = null;
        this.scale = {x : 1, y : 1};
        this.tag = '';

        entity_manager.entity_list.push(this);
        entity_manager.entity_count ++;
        console.log("New entity instantiated");
    }

    entity_think()
    {
        if(this.think != null) this.think(this);
    }

    entity_update()
    {
        if(this.update != null) this.update();
    }
}

class Entity_Manager {
    constructor()
    {
        this.entity_list = new Array();
        this.entity_count = 0;
    }

    update()
    {
        for( let i = 0; i < this.entity_count; i++){
            this.entity_list[i].entity_update();
        }
    }

    think()
    {
        for( let i = 0; i < this.entity_count; i++){
            this.entity_list[i].entity_think();
        }
    }

    clear()
    {

    }

    draw()
    {
        for( let i = 0; i < this.entity_count; i++){
            let ent = this.entity_list[i];

            engine.ctx.drawImage( 
                ent.sprite, 
                0, 
                0, 
                ent.sprite.width, 
                ent.sprite.height, 
                ent.position.x, 
                ent.position.y, 
                ent.sprite.width * ent.scale.x, 
                ent.sprite.height * ent.scale.y
            )
        }
        
    }

}

var entity_manager = new Entity_Manager;
