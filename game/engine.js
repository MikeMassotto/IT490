class Engine {
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
        canvas.width = 1920;
        canvas.height = 1080;
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
        console.log("start");
        this.canvas_init();
        this.init();

        this.loop = setInterval(
            () => {
            this.update();
            this.render();
            },
            1000/this.fps
        );

    }


}