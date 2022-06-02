import {couldStartTrivia} from 'typescript';
import {Board} from './Board';
import {Directions, Element} from './Element';
import {Ghost, GhostColor} from './Ghost';
import {Pacman} from './Pacman';
import {mapWalls as mapWallsRoot} from './constants';

const ghostLavenda = new Image()
ghostLavenda.src = "./assets/ghostLavenda.png"

const ghostBlue = new Image()
ghostBlue.src = "./assets/ghostBlue.png"

const customMapWalls = Array.from(mapWallsRoot);
window.onload = async () => {
    let pacmanMoved = false;
    const board = new Board();
    await board.createBoard();
    await board.createPoints();
    const player = new Pacman(8, 8, board.ctx, board.pointsCtx);
    await player.addBg();
    player.addToBoard();
    requestAnimationFrame(() => player.animatePacMan());
    player.go();
    let audio_flag = true;
    let audio = new Audio('./assets/pacman_beginning.wav');
    const ghosts = [
        new Ghost(208, 205, board.ctx, GhostColor.PINK),
        new Ghost(208, 215, board.ctx, GhostColor.PINK),
        new Ghost(208, 225, board.ctx, GhostColor.PINK),
    ];
    for (const ghost of ghosts) {
        await ghost.addBg();
        ghost.direction = Directions.UP;
        ghost.addToBoard();
    }
    setInterval(() => {
        if (audio_flag) {
            audio.play();
            console.log('muzyczka');
        }
    }, 2500);
    const activateGhosts = () => {
        for (let i = 199; i <= 207; i++) {
            for (let j = 207; j <= 238; j++) {
                customMapWalls[i][j] = ' ';
            }
        }
        setTimeout(async () => {
            for (const ghost of ghosts) {
                ghost.go();
            }

            await board.addBackGround('board_open.png');
        }, 1500);
    };

    const checkGhostColision = () => {
        for (const ghost of ghosts) {
            if (
                Math.abs(player.y - ghost.y) < player.height &&
                Math.abs(player.x - ghost.x) < player.width&&!ghost.vulnerable
            ) {
                player.removeFromBoard()
                // gameOver();
                player.lifes = player.lifes - 1
                player.x = 8
                player.y = 8
                player.addToBoard()
                let result = document.getElementById('lifesBoard') as HTMLElement;
                result.innerText = player.lifes.toString();
                
                if(player.lifes==0){
                    gameOver()
                }
            }
        }
    };

    const listenToKeys = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowUp': {
                audio_flag = false;
                audio.pause();
                if (!player.hasColision(player.x, player.y - 1, Directions.UP)) {
                    player.prevDirection = player.direction;
                    player.direction = Directions.UP;
                    if (!pacmanMoved) {
                        pacmanMoved = true;
                        activateGhosts();
                    }
                }
                break;
            }
            case 'ArrowRight': {
                audio_flag = false;
                audio.pause();
                if (!player.hasColision(player.x + 1, player.y, Directions.RIGHT)) {
                    player.prevDirection = player.direction;
                    player.direction = Directions.RIGHT;
                    if (!pacmanMoved) {
                        pacmanMoved = true;
                        activateGhosts();
                    }
                }
                break;
            }
            case 'ArrowDown': {
                audio_flag = false;
                audio.pause();
                if (!player.hasColision(player.x, player.y + 1, Directions.DOWN)) {
                    player.prevDirection = player.direction;
                    player.direction = Directions.DOWN;
                    if (!pacmanMoved) {
                        pacmanMoved = true;
                        activateGhosts();
                    }
                }
                break;
            }
            case 'ArrowLeft': {
                audio_flag = false;
                audio.pause();
                if (!player.hasColision(player.x - 1, player.y, Directions.LEFT)) {
                    player.prevDirection = player.direction;
                    player.direction = Directions.LEFT;
                    if (!pacmanMoved) {
                        pacmanMoved = true;
                        activateGhosts();
                    }
                }
                break;
            }
        }
    };

    const bigCoinCollected = () =>{
        for(const ghost of ghosts){
            ghost.vulnerable = true
            ghost.speed = 100
            ghost.removeFromBoard()
            ghost.image = ghostBlue
            ghost.addToBoard()
            if(ghost.goInterval) clearInterval(ghost.goInterval)
            ghost.goInterval = setInterval(ghost.handleGo,ghost.speed)
            setTimeout(()=>{
                ghost.removeFromBoard()
                ghost.speed = 30
                ghost.addBg()
                ghost.addToBoard()
                if(ghost.goInterval) clearInterval(ghost.goInterval)
                ghost.goInterval = setInterval(ghost.handleGo,ghost.speed)
            },3000)
            
            
        }
    }

    const endGame = () => {
        alert('Wygrałeś');
        window.removeEventListener('elementMoved', checkGhostColision);
        window.removeEventListener('gameWin', endGame);
        window.removeEventListener('keydown', listenToKeys);
        const interval_id = window.setInterval(function () {}, Number.MAX_SAFE_INTEGER);
        for (let i = 1; i < interval_id; i++) {
            window.clearInterval(i);
        }
    };
    const gameOver = () => {
        alert('przegrales');
        window.removeEventListener('elementMoved', checkGhostColision);
        window.removeEventListener('gameWin', endGame);
        window.removeEventListener('keydown', listenToKeys);
        const interval_id = window.setInterval(function () {}, Number.MAX_SAFE_INTEGER);
        for (let i = 1; i < interval_id; i++) {
            window.clearInterval(i);
        }
    };
    
    window.addEventListener("bigCoinCollected",bigCoinCollected)
    window.addEventListener('elementMoved', checkGhostColision);
    window.addEventListener('gameWin', endGame);
    window.addEventListener('keydown', listenToKeys);
};
export const mapWalls = customMapWalls;
