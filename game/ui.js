class UIText {
    
}

class UIButton {
    constructor()
    {
        this.on_press = null;
    }
}

class UIImage {
    constructor()
    {
        this.image = null;
        this.position = new Vector2d;
    }
}

class UIMenu {
    constructor()
    {
        this.enabled = false;
        this.tag = null;

        this.buttons = [];
        this.labels = [];
        this.dropdowns = [];
        this.button = new UIButton;
        
        this.background = null;
    }
}