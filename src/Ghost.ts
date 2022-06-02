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
    moveEvent:Event;
    vulnerable:boolean
    speed:number;

    constructor(x: number, y: number, ctx: CanvasRenderingContext2D,color:GhostColor) {
        super(x, y, ctx, ghostImage, 30, 30);
        this.color = color;
        this.speed = 30
        this.vulnerable = true
        this.moveEvent = new Event("elementMoved")
    }
    addBg = () => {
        
        this.image = new Image();
        this.image.src = ghostAssets[this.color]
        if (this.image.complete) {
            console.log('zaladowano');
            return;
        }

        return new Promise((resolve) => {
            this.image.onload = () => resolve('loaded');
        });
    };
    handleGo = ()=>{
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
                this.direction == Directions.UP
                    ? this.move(0, -1,Directions.UP)
                    : this.direction == Directions.LEFT
                    ? this.move(-1, 0,Directions.LEFT)
                    : this.direction == Directions.RIGHT
                    ? this.move(1, 0,Directions.RIGHT)
                    : this.direction == Directions.DOWN
                    ? this.move(0, 1,Directions.DOWN)
                    : false;
            }
            this.prevDirection = this.direction
            
            while(!canMove){
                
               this.direction = possibleDirections[Math.floor(Math.random()*4)];
               if((this.prevDirection == Directions.UP && this.direction!=Directions.DOWN) || (this.prevDirection==Directions.DOWN && this.direction!=Directions.UP) || (this.prevDirection == Directions.LEFT && this.direction != Directions.RIGHT) || (this.prevDirection == Directions.RIGHT && this.direction != Directions.LEFT)  ){
               
               canMove =
               this.direction == Directions.UP
                    ? this.move(0, -1,Directions.UP)
                    : this.direction == Directions.LEFT
                    ? this.move(-1, 0,Directions.LEFT)
                    : this.direction == Directions.RIGHT
                    ? this.move(1, 0,Directions.RIGHT)
                    : this.direction == Directions.DOWN
                    ? this.move(0, 1,Directions.DOWN)
                    : false;
               }
            }
            
            if(canMove){
                dispatchEvent(this.moveEvent)
            }

            
    }
    go = () => {
        const thisRef = this;
        this.goInterval = setInterval(this.handleGo, this.speed);
    };
}
