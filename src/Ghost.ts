import {Board} from './Board';
import {Directions, Element} from './Element';

const ghostImage = new Image();
ghostImage.src = './assets/ghostPink.png';

export enum GhostColor{
    "RED"="red",
    "BLUE"="blue",
    "YELLOW"="yellow",
    "PINK"="pink"
}
const possibleDirections = [Directions.UP,Directions.RIGHT,Directions.DOWN,Directions.LEFT]
const ghostAssets = {
    [GhostColor.RED]:"./assets/ghostPink.png",
    [GhostColor.BLUE]:"./assets/ghostPink.png",
    [GhostColor.YELLOW]:"./assets/ghostPink.png",
    [GhostColor.PINK]:"./assets/ghostPink.png",
}


export class Ghost extends Element {
    color:GhostColor
    goInterval: NodeJS.Timer | undefined;
    prevDirection: Directions | undefined;
    constructor(x: number, y: number, ctx: CanvasRenderingContext2D,color:GhostColor) {
        super(x, y, ctx, ghostImage, 28, 28);
        this.color = color;
    }
    addBg = () => {
        this.image.src = ghostAssets[this.color]
        if (this.image.complete) {
            console.log('zaladowano');
            return;
        }

        return new Promise((resolve) => {
            this.image.onload = () => resolve('loaded');
        });
    };
    go = () => {
        const thisRef = this;
        this.goInterval = setInterval(() => {
            let canMove = false
            if(this.x==8 && this.y>=216 && this.y<=222){
                this.removeFromBoard()
                this.x=416
                this.y = 216
                this.direction = Directions.LEFT
                this.addToBoard()

            }
            if(this.x==421 && this.y>=216 && this.y<=222){
                this.removeFromBoard()
                this.x=10
                this.y = 216
                this.direction = Directions.RIGHT
                this.addToBoard()
            }     

            if(!canMove){
                canMove =
                thisRef.direction == Directions.UP
                    ? thisRef.move(0, -1,Directions.UP)
                    : thisRef.direction == Directions.LEFT
                    ? thisRef.move(-1, 0,Directions.LEFT)
                    : thisRef.direction == Directions.RIGHT
                    ? thisRef.move(1, 0,Directions.RIGHT)
                    : thisRef.direction == Directions.DOWN
                    ? thisRef.move(0, 1,Directions.DOWN)
                    : false;
            }
            thisRef.prevDirection = thisRef.direction
            
            while(!canMove){
                
               thisRef.direction = possibleDirections[Math.floor(Math.random()*4)];
               if((thisRef.prevDirection == Directions.UP && thisRef.direction!=Directions.DOWN) || (thisRef.prevDirection==Directions.DOWN && thisRef.direction!=Directions.UP) || (thisRef.prevDirection == Directions.LEFT && thisRef.direction != Directions.RIGHT) || (thisRef.prevDirection == Directions.RIGHT && thisRef.direction != Directions.LEFT)  ){
               
               canMove =
               thisRef.direction == Directions.UP
                    ? thisRef.move(0, -1,Directions.UP)
                    : thisRef.direction == Directions.LEFT
                    ? thisRef.move(-1, 0,Directions.LEFT)
                    : thisRef.direction == Directions.RIGHT
                    ? thisRef.move(1, 0,Directions.RIGHT)
                    : thisRef.direction == Directions.DOWN
                    ? thisRef.move(0, 1,Directions.DOWN)
                    : false;
               }
            }
            
            
            
        }, 20);
    };
}
