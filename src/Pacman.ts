import {Board} from './Board';
import {Directions, Element} from './Element';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const pacManOpenRightImg = new Image();
pacManOpenRightImg.src = './assets/pacmanRight-open.png';

const pacManOpenLeftImg = new Image();
pacManOpenLeftImg.src = './assets/pacmanLeft-open.png';

const pacManOpenBottomImg = new Image();
pacManOpenBottomImg.src = './assets/pacmanBottom-open.png';

const pacManOpenTopImg = new Image();
pacManOpenTopImg.src = './assets/pacmanTop-open.png';



const pacManCloseRightImg = new Image();
pacManCloseRightImg.src = './assets/pacmanRight-close.png';

const pacManCloseBottomImg = new Image();
pacManCloseBottomImg.src = './assets/pacmanBottom-close.png';

const pacManCloseTopImg = new Image();
pacManCloseTopImg.src = './assets/pacmanTop-close.png';

const pacManCloseLeftImg = new Image();
pacManCloseLeftImg.src = './assets/pacmanLeft-close.png';



export class Pacman extends Element {
    width = 26;
    height = 26;
    pacmanOpen = true;
    isAnimating = true;
    goInterval: NodeJS.Timer | undefined;
    constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        super(x, y, ctx, pacManOpenRightImg, 28, 28);
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
    animatePacMan = async () => {
        if (!this.isAnimating) {
            if(this.direction==Directions.LEFT){
                this.image = pacManOpenLeftImg
            }else if(this.direction==Directions.DOWN){
                this.image = pacManOpenBottomImg
            }else if(this.direction==Directions.RIGHT){
                this.image = pacManOpenRightImg
            }else{
                this.image = pacManOpenTopImg
            }
            this.removeFromBoard();
            this.addToBoard();
            return;
        }
        this.removeFromBoard();
        this.addToBoard();

        switch (this.direction){
            case Directions.RIGHT:
                {
                    if (this.pacmanOpen) {
                        this.image = pacManCloseRightImg;
                    } else {
                        this.image = pacManOpenRightImg;
                    }
                    break
                }
            case Directions.LEFT:{
                if (this.pacmanOpen) {
                    this.image = pacManCloseLeftImg;
                } else {
                    this.image = pacManOpenLeftImg;
                }
                break
            }
            case Directions.DOWN:{
                if (this.pacmanOpen) {
                    this.image = pacManCloseBottomImg;
                } else {
                    this.image = pacManOpenBottomImg;
                }
                break
            }
            case Directions.UP:{
                if (this.pacmanOpen) {
                    this.image = pacManCloseTopImg;
                } else {
                    this.image = pacManOpenTopImg;
                }
                break
            }
        }
        
    
        this.pacmanOpen = !this.pacmanOpen;

        await sleep(200);
        requestAnimationFrame(() => this.animatePacMan());
    };

    addToBoard = () => {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
            
            if (canMove) {
                if (!thisRef.isAnimating) {
                    thisRef.isAnimating = true;
                    thisRef.animatePacMan();
                }
            } else {
                thisRef.isAnimating = false;
            }
        }, 25);
    };
}
