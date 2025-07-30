// Game constants
const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const PIPE_WIDTH = 60;
const PIPE_GAP = 150;
const PIPE_SPEED = 2;
const PIPE_SPAWN_RATE = 1500; // milliseconds

// Game state
type GameState = 'start' | 'playing' | 'game-over';

// Game elements
interface Bird {
    x: number;
    y: number;
    width: number;
    height: number;
    velocity: number;
}

interface Pipe {
    x: number;
    topHeight: number;
    bottomY: number;
    passed: boolean;
}

class FlappyBirdGame {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private gameState: GameState = 'start';
    private bird: Bird;
    private pipes: Pipe[] = [];
    private score: number = 0;
    private lastPipeTime: number = 0;
    private animationFrameId: number | null = null;
    
    // UI elements
    private startScreen: HTMLElement;
    private gameOverScreen: HTMLElement;
    private scoreDisplay: HTMLElement;
    private finalScoreDisplay: HTMLElement;
    private startButton: HTMLButtonElement;
    private restartButton: HTMLButtonElement;
    
    constructor() {
        this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        
        // Initialize UI elements
        this.startScreen = document.getElementById('start-screen')!;
        this.gameOverScreen = document.getElementById('game-over-screen')!;
        this.scoreDisplay = document.getElementById('score-display')!;
        this.finalScoreDisplay = document.getElementById('final-score')!;
        this.startButton = document.getElementById('start-button') as HTMLButtonElement;
        this.restartButton = document.getElementById('restart-button') as HTMLButtonElement;
        
        // Initialize bird
        this.bird = {
            x: 100,
            y: this.canvas.height / 2,
            width: 40,
            height: 30,
            velocity: 0
        };
        
        // Set up event listeners
        this.startButton.addEventListener('click', () => this.startGame());
        this.restartButton.addEventListener('click', () => this.resetGame());
        
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                if (this.gameState === 'playing') {
                    this.jump();
                } else if (this.gameState === 'start') {
                    this.startGame();
                } else if (this.gameState === 'game-over') {
                    this.resetGame();
                }
            }
        });
        
        this.canvas.addEventListener('click', () => {
            if (this.gameState === 'playing') {
                this.jump();
            } else if (this.gameState === 'start') {
                this.startGame();
            } else if (this.gameState === 'game-over') {
                this.resetGame();
            }
        });
        
        // Start the game loop
        this.gameLoop();
    }
    
    private startGame(): void {
        this.gameState = 'playing';
        this.startScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'none';
        this.score = 0;
        this.scoreDisplay.textContent = '0';
        this.pipes = [];
        this.bird.y = this.canvas.height / 2;
        this.bird.velocity = 0;
        this.lastPipeTime = 0;
    }
    
    private resetGame(): void {
        this.startGame();
    }
    
    private jump(): void {
        this.bird.velocity = JUMP_FORCE;
    }
    
    private gameLoop(timestamp: number = 0): void {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background
        this.ctx.fillStyle = '#70c5ce';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.gameState === 'playing') {
            this.updateGame(timestamp);
        }
        
        // Draw bird
        this.drawBird();
        
        // Draw pipes
        this.drawPipes();
        
        // Continue the game loop
        this.animationFrameId = requestAnimationFrame((ts) => this.gameLoop(ts));
    }
    
    private updateGame(timestamp: number): void {
        // Update bird physics
        this.bird.velocity += GRAVITY;
        this.bird.y += this.bird.velocity;
        
        // Check for collisions with ground or ceiling
        if (this.bird.y + this.bird.height > this.canvas.height || this.bird.y < 0) {
            this.gameOver();
            return;
        }
        
        // Spawn new pipes
        if (timestamp - this.lastPipeTime > PIPE_SPAWN_RATE) {
            this.spawnPipe();
            this.lastPipeTime = timestamp;
        }
        
        // Update pipes
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            this.pipes[i].x -= PIPE_SPEED;
            
            // Check for collisions with pipes
            if (this.checkCollision(this.bird, this.pipes[i])) {
                this.gameOver();
                return;
            }
            
            // Check if bird passed the pipe
            if (!this.pipes[i].passed && this.bird.x > this.pipes[i].x + PIPE_WIDTH) {
                this.pipes[i].passed = true;
                this.score++;
                this.scoreDisplay.textContent = this.score.toString();
            }
            
            // Remove pipes that are off screen
            if (this.pipes[i].x + PIPE_WIDTH < 0) {
                this.pipes.splice(i, 1);
            }
        }
    }
    
    private spawnPipe(): void {
        const minHeight = 50;
        const maxHeight = this.canvas.height - PIPE_GAP - minHeight;
        const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
        
        this.pipes.push({
            x: this.canvas.width,
            topHeight: topHeight,
            bottomY: topHeight + PIPE_GAP,
            passed: false
        });
    }
    
    private drawBird(): void {
        this.ctx.fillStyle = '#f8d030';
        this.ctx.fillRect(this.bird.x, this.bird.y, this.bird.width, this.bird.height);
        
        // Draw eye
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.bird.x + 25, this.bird.y + 5, 10, 10);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(this.bird.x + 30, this.bird.y + 7, 5, 5);
        
        // Draw beak
        this.ctx.fillStyle = '#f08030';
        this.ctx.beginPath();
        this.ctx.moveTo(this.bird.x + this.bird.width, this.bird.y + 10);
        this.ctx.lineTo(this.bird.x + this.bird.width + 15, this.bird.y + 15);
        this.ctx.lineTo(this.bird.x + this.bird.width, this.bird.y + 20);
        this.ctx.fill();
    }
    
    private drawPipes(): void {
        this.ctx.fillStyle = '#5cb85c';
        
        for (const pipe of this.pipes) {
            // Top pipe
            this.ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
            
            // Bottom pipe
            this.ctx.fillRect(pipe.x, pipe.bottomY, PIPE_WIDTH, this.canvas.height - pipe.bottomY);
            
            // Pipe edges
            this.ctx.fillStyle = '#4cae4c';
            this.ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, PIPE_WIDTH + 10, 20);
            this.ctx.fillRect(pipe.x - 5, pipe.bottomY, PIPE_WIDTH + 10, 20);
            
            this.ctx.fillStyle = '#5cb85c';
        }
    }
    
    private checkCollision(bird: Bird, pipe: Pipe): boolean {
        // Check if bird is within pipe's x-range
        if (bird.x + bird.width > pipe.x && bird.x < pipe.x + PIPE_WIDTH) {
            // Check if bird is not in the gap
            if (bird.y < pipe.topHeight || bird.y + bird.height > pipe.bottomY) {
                return true;
            }
        }
        return false;
    }
    
    private gameOver(): void {
        this.gameState = 'game-over';
        this.finalScoreDisplay.textContent = `Score: ${this.score}`;
        this.gameOverScreen.style.display = 'flex';
    }
}

// Start the game when the page loads
window.onload = () => {
    new FlappyBirdGame();
};