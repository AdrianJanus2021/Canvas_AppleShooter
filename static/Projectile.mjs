export default class Projectile{
    constructor(canvas,x,y,vx,vy){
        this.canvas=canvas;
        this.x=x;
        this.y=y;
        this.vx=vx;
        this.vy=vy;

        this.bullet=document.createElement("img");
        this.bullet.src="../images/projectile.png";
    }

    drawPr(ctx){
        ctx.drawImage(this.bullet,this.x-this.bullet.width/2,this.y-this.bullet.width/2);
    }
    update(ctx){
        this.drawPr(ctx);
        this.x+=this.vx;
        this.y+=this.vy;

    }
}