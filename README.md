# TNK Games Multi-Board Arcade Package

## File Structure & Modularity
```
├── index.html           # Main Portal Hub + Universal Header + Google AdSense slots
├── styles.css           # Styling preserving test5.html Coin to Win + test2.1 tokens
├── games/
│   ├── tictactoe.js     # Tic-Tac-Toe ONLY: test2.1 mechanics (3x3, 4x4, 5x5, 3-player mode removed, 2P & Neural AI)
│   └── pulimaka.js      # Coin to Win ONLY: 37-node asymmetric board, 150 moves cap, Player vs Computer mode
└── README.md
```

### 1. Unified Top Banner:
- Both games and the Home Hub share the identical branded header: **TNK Arena // GAME IT ENHANCE YOUR MIND**.

### 2. Google AdSense Ready:
- Dedicated, responsive AdSense slots (`.adsense-slot-wrapper`) are placed across all screens (Top Leaderboard, Sidebar Rectangle 300x250, and Bottom Anchor Banner).

### 3. Coin to Win Styling Strictly Preserved:
- The SVG board nodes, lines, color scheme (`#0a0d14`, `#141a24`, `#273142`, `#ef4444`, `#38bdf8`), and sidebar scorecard from `test5.html` are strictly preserved.

### 4. Tic-Tac-Toe from test2.1:
- Replaced with `test2.1.html` mechanics: Cyan X and Pink O glowing tokens with pop animations.
- 3-player mode removed; supports **3x3**, **4x4**, **5x5** levels with **2 Players** and **Vs Computer** mode.

### 5. Individual Game Editing:
- To update Tic-Tac-Toe rules or levels, edit `games/tictactoe.js`.
- To update Coin to Win rules or board geometry, edit `games/pulimaka.js`.
- `index.html` remains clean and unchanged!
