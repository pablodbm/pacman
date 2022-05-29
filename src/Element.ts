import {Board} from './Board';
import {mapWalls} from '.';
import {Pacman} from './Pacman';

export enum Directions {
    'UP' = 'up',
    'RIGHT' = 'right',
    'DOWN' = 'down',
    'LEFT' = 'left',
}

export class Element {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    ctx: CanvasRenderingContext2D;
    direction: Directions | undefined;
    prevDirection:Directions|undefined
    constructor(
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D,
        image: HTMLImageElement,
        height: number,
        width: number,

    ) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.image = image;
        this.height = height;
        this.width = width;
        this.direction = undefined;
        this.prevDirection = undefined;

    }
    addBg = () => {
        if (this.image.complete) {
            console.log('zaladowano');
            return;
        }

        return new Promise((resolve) => {
            this.image.onload = () => resolve('loaded');
        });
    };

    rotateImage = () => {};
    addToBoard = () => {
        // console.log(this.image)
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
    removeFromBoard = () => {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    };

    triggerMove = (newX:number,newY:number) =>{
        this.removeFromBoard();
            this.x = newX
            this.y = newY
            
            this.addToBoard();
    }
    move = (offsetX: number, offsetY: number, direction: Directions,slippageX:number=0,slippageY:number=0) => {     
        // console.log(this.prevDirection)
        if (!this.hasColision(this.x + offsetX, this.y+offsetY, direction)) {
            this.triggerMove(this.x+offsetX-slippageX,this.y+offsetY-slippageY)
            return true;
        }
        return false;
    };
    
    hasColision = (newX: number, newY: number, direction: Directions): boolean => {

        
        switch (direction) {
            case Directions.RIGHT: {
                for(let i=this.y;i<this.y+this.width;i++){
                    if(mapWalls[i]&&mapWalls[i][this.width+newX-1]&&mapWalls[i][this.width+newX-1]=="X"){
                        return true
                    }
                }
                return false
            }
            case Directions.UP:{
                for(let i=this.x;i<this.x+this.width;i++){
                    if(mapWalls[newY]&&mapWalls[newY][i]&&mapWalls[newY][i]=="X"){
                        return true
                    }
                }
                return false
            }
            case Directions.LEFT: {
                for(let i=this.y;i<this.y+this.width;i++){
                    if(mapWalls[i]&&mapWalls[i][newX]&&mapWalls[i][newX]=="X"){
                        return true
                    }
                }
                return false
            }
            case Directions.DOWN:{
            
                for(let i=this.x;i<this.x+this.width;i++){
                    if(mapWalls[newY+this.height-1]&&mapWalls[newY+this.height-1][i]&&mapWalls[newY+this.height-1][i]=="X"){
                        return true
                    }
                }
                return false
            }
        }
    };
}
