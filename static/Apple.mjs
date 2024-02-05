export default class Apple{
    constructor(x,y,speed){
        this.x=x;
        this.y=y;
        this.angle=0;

        this.speed=speed;

        this.width=136;
        this.height=162;

        this.apple=document.createElement("img");
        this.apple.src="../images/apple.png";

        //vectors
        let vx=(232-this.x);
        let vy=(750-this.y);

        //distance
        let dist=Math.sqrt((vx * vx) + (vy * vy));

        this.dx = vx / dist * this.speed;
        this.dy = vy / dist * this.speed;
    }

    draw(ctx){
        //random size
        let randomSize=Math.random* (2.5-1)+1

        ctx.save();
        ctx.setTransform(1,0,0,1,0,0);
        ctx.translate(this.x+this.width/2,this.y+this.height/2);
        ctx.rotate(this.angle*Math.PI/180);
        ctx.drawImage(this.apple,-this.width/2,-this.height/2,this.width,this.height);
        ctx.restore();
    }
}