import {Board} from './Board';
import {Directions, Element} from './Element';
import {points} from './Board';

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

let audio = new Audio('./assets/pacman_chomp.wav');
export class Pacman extends Element {
    width = 26;
    height = 26;
    pacmanOpen = true;
    isAnimating = true;
    points = 0;
    gameOver: Event;
    gameWin: Event;
    moveEvent: Event;
    lifes: number;
    bigCoinCollected: Event;
    pointsCtx: CanvasRenderingContext2D;
    goInterval: NodeJS.Timer | undefined;
    constructor(
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D,
        pointsCtx: CanvasRenderingContext2D,
    ) {
        super(x, y, ctx, pacManOpenRightImg, 28, 28);
        this.pointsCtx = pointsCtx;
        this.moveEvent = new Event('elementMoved');
        this.gameOver = new Event('gameOver');
        this.gameWin = new Event('gameWin');
        this.bigCoinCollected = new Event('bigCoinCollected');
        this.lifes = 3;
        this.pointsCtx.fillStyle = 'rgba(0,0,0,1)';
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
            if (this.direction == Directions.LEFT) {
                this.image = pacManOpenLeftImg;
            } else if (this.direction == Directions.DOWN) {
                this.image = pacManOpenBottomImg;
            } else if (this.direction == Directions.RIGHT) {
                this.image = pacManOpenRightImg;
            } else {
                this.image = pacManOpenTopImg;
            }
            this.removeFromBoard();
            this.addToBoard();
            return;
        }
        this.removeFromBoard();
        this.addToBoard();
        switch (this.direction) {
            case Directions.RIGHT: {
                if (this.pacmanOpen) {
                    this.image = pacManCloseRightImg;
                } else {
                    this.image = pacManOpenRightImg;
                }
                break;
            }
            case Directions.LEFT: {
                if (this.pacmanOpen) {
                    this.image = pacManCloseLeftImg;
                } else {
                    this.image = pacManOpenLeftImg;
                }
                break;
            }
            case Directions.DOWN: {
                if (this.pacmanOpen) {
                    this.image = pacManCloseBottomImg;
                } else {
                    this.image = pacManOpenBottomImg;
                }
                break;
            }
            case Directions.UP: {
                if (this.pacmanOpen) {
                    this.image = pacManCloseTopImg;
                } else {
                    this.image = pacManOpenTopImg;
                }
                break;
            }
        }

        this.pacmanOpen = !this.pacmanOpen;

        await sleep(200);
        requestAnimationFrame(() => this.animatePacMan());
    };

    addToBoard = () => {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };

    countPoints = () => {
        let result = document.getElementById('pointsBoard') as HTMLElement;
        result.innerText = this.points.toString();
    };
    go = () => {
        const thisRef = this;
        this.goInterval = setInterval(() => {
            console.log(this.goInterval);
            let canMove = false;
            if (this.x == 8 && this.y >= 216 && this.y <= 222) {
                this.removeFromBoard();
                this.x = 416;
                this.y = 216;
                this.direction = Directions.LEFT;
                this.addToBoard();
            }
            if (this.x == 421 && this.y >= 216 && this.y <= 222) {
                this.removeFromBoard();
                this.x = 10;
                this.y = 216;
                this.direction = Directions.RIGHT;
                this.addToBoard();
            }

            if (!canMove) {
                canMove =
                    thisRef.direction == Directions.UP
                        ? thisRef.move(0, -1, Directions.UP)
                        : thisRef.direction == Directions.LEFT
                        ? thisRef.move(-1, 0, Directions.LEFT)
                        : thisRef.direction == Directions.RIGHT
                        ? thisRef.move(1, 0, Directions.RIGHT)
                        : thisRef.direction == Directions.DOWN
                        ? thisRef.move(0, 1, Directions.DOWN)
                        : false;
            }
            const x = thisRef.x;
            0;
            const y = thisRef.y;
            if (points.length == 0) {
                dispatchEvent(thisRef.gameWin);
            }
            for (let i = 0; i < points.length; i++) {
                for (let j = y; j < y + 28; j++) {
                    for (let k = x; k < x + 28; k++) {
                        if (points[i].coords[1] == j && points[i].coords[0] == k) {
                            thisRef.pointsCtx.beginPath();

                            thisRef.pointsCtx.arc(
                                points[i].coords[0],
                                points[i].coords[1],
                                points[i].type=="point"?5:8,
                                0,
                                Math.PI * 2,
                            );
                            thisRef.pointsCtx.fill();
                            thisRef.pointsCtx.stroke();
                            if(points[i].type=="point"){
                                thisRef.points += 10;
                            }else{
                                thisRef.points += 100;
                                dispatchEvent(thisRef.bigCoinCollected)
                            }

                            this.countPoints();
                            audio.play()
                            points.splice(i, 1);
                            return
                        }
                    }
                }
            }
            if (canMove) {
                dispatchEvent(thisRef.moveEvent);
                if (!thisRef.isAnimating) {
                    thisRef.isAnimating = true;
                    thisRef.animatePacMan();
                }
            } else {
                thisRef.isAnimating = false;
            }
        }, 15);
    };
}
