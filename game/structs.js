
class Vector2d {
    constructor()
    {
        this.x = 0;
        this.y = 0;
    }
}

class Vector3d {
    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}

class Rect {
    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
    }
}

class Label {
    constructor()
    {
        this.text = null;
        this.font = "24px serif";
        this.offset = new Vector2d();
        this.color = "#ffffff";
    }
}

class Mouse {
    constructor()
    {
        this.position = new Vector2d;
        this.event = null;
    }

    update()
    {
        this.event = null;
    }
}