import Apple from "./Apple.mjs";

export default class appleController {
    constructor(canvas,lives,speed) {
        this.canvas=canvas;
        this.lives=lives;
        this.speed =speed;
    }
    appleMap=[];
    update(ctx){
        for(let i=0;i<this.appleMap.length;i++){
            let apple=this.appleMap[i]
            apple.draw(ctx);

            if(apple.y<=750){
                apple.x+=apple.dx;
                apple.y+=apple.dy;
                apple.angle+=1;
            }
            else{
                this.appleMap.splice(i,1);
                this.lives--;
            }
        }

    }
    getLives(){
        return this.lives;
    }
    setSpeed(s){
        this.speed+=s;
    }
    createApples(){
        let index=Math.floor(Math.random()*3);
        let randomX;
        let randomY;

        switch(index){
            case 0://left
                randomX=0-136;
                randomY=Math.random()*600;
                break
            case 1://right
                randomX=this.canvas.width+136;
                randomY=Math.random()*500;
                break
            case 2://top
                randomX=Math.random()*500;
                randomY=0-162;
                break
        }

        // console.log(this.speed)
        this.appleMap.push(new Apple(randomX,randomY,this.speed))
    }
}