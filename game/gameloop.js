class GameLoop {
    constructor() 
    {
        this.fps = 60;
        this.ctx = null;
        this.cnv = null;
        this.loop = null;
    }

    canvas_init() 
    {
        this.cnv = document.getElementById('canvas');
        this.ctx = this.cnv.getContext('2d')
        document.body.style.padding = 0;
        document.body.style.margin = 0;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    init() 
    {

    }

    update() 
    {

    }

    render()
    {

    }

    start()
    {
        console.log("init");
        this.canvas_init();
        this.init();

        this.loop = setInterval(
            () => {
            update();
            render();
            },
            1000/this.fps
        );

    }

    draw_sprite( sprite, width, height, x, y, scale_w, scale_h ) {
        ctx.drawImage( sprite, 0, 0, width, height, x, y, width * scale_w, height * scale_h )

        
        let ball = {
            x_pos : 0,
            y_pos : 0,
            size : 0,
            color : "#ffffff",
        }
    }
}