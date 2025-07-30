# Flappy Bird - Browser Game

A fully functional Flappy Bird game built with vanilla TypeScript and HTML5 Canvas. This implementation captures the classic gameplay experience with modern web technologies, featuring smooth animations, responsive controls, and a polished visual design.

## Features

### Gameplay
- **Physics-Based Movement**: Realistic gravity and flap mechanics for the bird
- **Procedural Pipe Generation**: Randomly positioned pipes with consistent gaps
- **Collision Detection**: Precise hit detection between bird, pipes, and ground
- **Progressive Difficulty**: Pipes appear more frequently as the game progresses
- **Score System**: Real-time scoring with persistent best score storage

### Visual Design
- **Detailed Bird Sprite**: Custom-drawn bird with eye, beak, and wing details
- **Textured Pipes**: 3D-styled pipes with caps for depth perception
- **Dynamic Background**: Parallax clouds and textured ground with grass
- **Smooth Animations**: 60fps gameplay using requestAnimationFrame
- **Responsive Layout**: Adapts to different screen sizes

### User Interface
- **Start Screen**: Welcome screen with game instructions
- **Real-Time Score Display**: Current score and best score shown during gameplay
- **Game Over Screen**: Score summary with restart option
- **Mobile-Friendly**: Touch controls for mobile devices

## Controls

### Desktop
- **SPACE**: Flap (make the bird jump)
- **Mouse Click**: Alternative flap control

### Mobile
- **Touch**: Tap anywhere on the screen to flap

## Technical Implementation

### Architecture
- **Object-Oriented Design**: Clean class structure for Bird and Pipe entities
- **Game Loop**: Efficient update-render cycle using requestAnimationFrame
- **State Management**: Clear game state transitions (start, playing, game over)
- **Local Storage**: Persistent best score tracking

### Performance
- **Optimized Rendering**: Minimal canvas operations for smooth 60fps gameplay
- **Efficient Collision**: Simple geometric collision detection
- **Memory Management**: Automatic cleanup of off-screen pipes

## Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Full touch support

## How to Play

1. Click "Start Game" on the welcome screen
2. Press SPACE or tap to make the bird flap
3. Navigate through the pipes without hitting them
4. Each pipe passed earns 1 point
5. The game ends if you hit a pipe or the ground
6. Try to beat your best score!

## Installation

No installation required! Simply open the HTML file in any modern web browser to start playing.

## Development

This implementation uses vanilla TypeScript (compiled to JavaScript) with no external dependencies. The entire game is contained in a single HTML file with embedded CSS and JavaScript for easy deployment and sharing.

---

Enjoy playing this classic game reimagined for the modern web!