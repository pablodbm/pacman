import {couldStartTrivia} from 'typescript';
import {Board} from './Board';
import {Directions, Element} from './Element';
import { Ghost, GhostColor } from './Ghost';
import {Pacman} from './Pacman';
import {mapWalls as mapWallsRoot} from "./constants";
//208X200    
//239x200   
//207
const customMapWalls = Array.from(mapWallsRoot)
window.onload = async () => {
    let pacmanMoved = false
    const board = new Board();
    await board.createBoard();
    const player = new Pacman(8, 8, board.ctx);
    await player.addBg();
    player.addToBoard();
    requestAnimationFrame(() => player.animatePacMan());
    player.go();

    const ghosts = [new Ghost(210,205,board.ctx,GhostColor.PINK),new Ghost(210,215,board.ctx,GhostColor.PINK),new Ghost(210,225,board.ctx,GhostColor.PINK)];
    for(const ghost of ghosts){
        await ghost.addBg()
        ghost.direction = Directions.UP
        ghost.addToBoard()
        
    }
    const activateGhosts =  () =>{ 
        for(let i=199;i<=207;i++){
            for(let j=207;j<=238;j++){
                customMapWalls[i][j] = " "
            }
        }
        setTimeout( async ()=>{
            for(const ghost of ghosts){
                ghost.go()
            }
    
            await board.addBackGround("board_open.png")
        },1500)
    }

    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp': {
                if (!player.hasColision(player.x, player.y - 1,Directions.UP)) {
                    player.prevDirection = player.direction
                    player.direction = Directions.UP;
                    if(!pacmanMoved){
                        pacmanMoved = true
                        activateGhosts()
                    }
                    
                }
                break;
            }
            case 'ArrowRight': {
                if (!player.hasColision(player.x + 1, player.y,Directions.RIGHT)) {
                    player.prevDirection = player.direction
                    player.direction = Directions.RIGHT;
                    if(!pacmanMoved){
                        pacmanMoved = true
                        activateGhosts()
                    }
                }
                break;
            }
            case 'ArrowDown': {
                if (!player.hasColision(player.x, player.y + 1,Directions.DOWN)) {
                    player.prevDirection = player.direction
                    player.direction = Directions.DOWN;
                    if(!pacmanMoved){
                        pacmanMoved = true
                        activateGhosts()
                    }
                }
                break;
            }
            case 'ArrowLeft': {
                if (!player.hasColision(player.x - 1, player.y,Directions.LEFT)) {
                    player.prevDirection = player.direction
                    player.direction = Directions.LEFT;
                    if(!pacmanMoved){
                        pacmanMoved = true
                        activateGhosts()
                    }
                }
                break;
            }
        }
    });
}
export const mapWalls = customMapWalls;
