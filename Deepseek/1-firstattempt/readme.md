# Compilation Instructions
To compile this TypeScript code, you'll need to have TypeScript installed. Here's how to set it up:

1. Install TypeScript (if you haven't already):
```bash
npm install -g typescript
```

2. Create a tsconfig.json file:
 ```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["*.ts"],
  "exclude": ["node_modules"]
}
```

3. Compile the TypeScript:
```bash
tsc
```

This will create a game.js file in the dist directory that the HTML file references.

# How to Play
1. Click the "Start Game" button or press SPACE to begin
2. Press SPACE or click/tap to make the bird jump
3. Avoid hitting the pipes and try to get the highest score
4. When you crash, click "Play Again" or press SPACE to restart

# Game Features
- Fully browser-based implementation
- Responsive controls (keyboard and mouse/touch)
- Score tracking
- Start and game over screens
- Random pipe generation
- Collision detection
- Smooth animation using requestAnimationFrame

The game follows the classic Flappy Bird mechanics with simple graphics and physics. You can easily customize the appearance by modifying the drawing functions or adjusting the game constants at the top of the TypeScript file.