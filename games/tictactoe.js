<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TNK ARENA - Cyber Neon Tic-Tac-Toe</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-main: #060a12;
      --card-bg: #0c121e;
      --card-inner: #080d16;
      --border-color: #172437;
      --accent-gold: #f59e0b;
      --neon-cyan: #00f0ff;
      --neon-pink: #ff2a85;
      --neon-yellow: #facc15;
    }
    body {
      background-color: var(--bg-main);
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
      user-select: none;
    }
    .font-chakra { font-family: 'Chakra Petch', sans-serif; }
    .neon-board-frame {
      border: 2px solid var(--neon-cyan);
      box-shadow: 0 0 18px rgba(0, 240, 255, 0.45), inset 0 0 18px rgba(0, 240, 255, 0.2);
      border-radius: 20px;
    }
    .cell-box {
      background: #090e18;
      border: 1.5px solid #142236;
      border-radius: 12px;
      transition: all 0.18s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .cell-box:hover {
      background: #111a2c;
      border-color: rgba(0, 240, 255, 0.4);
    }
    .token-x {
      position: relative;
      width: 62%;
      height: 62%;
      animation: popIn 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
    }
    .token-x::before, .token-x::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 14%;
      background: var(--neon-cyan);
      border-radius: 999px;
      box-shadow: 0 0 10px var(--neon-cyan), 0 0 20px rgba(0, 240, 255, 0.8);
    }
    .token-x::before { transform: translateY(-50%) rotate(45deg); }
    .token-x::after { transform: translateY(-50%) rotate(-45deg); }
    .token-o {
      width: 58%;
      height: 58%;
      border-radius: 50%;
      border: 4px solid var(--neon-pink);
      box-shadow: 0 0 10px var(--neon-pink), 0 0 20px rgba(255, 42, 133, 0.8), inset 0 0 6px rgba(255, 42, 133, 0.4);
      animation: popIn 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
    }
    .token-delta {
      width: 58%;
      height: 58%;
      animation: popIn 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
      filter: drop-shadow(0 0 8px #facc15) drop-shadow(0 0 16px rgba(250, 204, 21, 0.8));
    }
    @keyframes popIn {
      0% { transform: scale(0.2); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
    .winning-cell {
      animation: pulseWin 0.7s infinite alternate ease-in-out;
      border-color: #ffd700 !important;
      background: rgba(250, 204, 21, 0.12) !important;
    }
    @keyframes pulseWin {
      0% { box-shadow: inset 0 0 8px #ffd700, 0 0 10px rgba(250, 204, 21, 0.4); }
      100% { box-shadow: inset 0 0 18px #ffd700, 0 0 22px rgba(250, 204, 21, 0.9); }
    }
  </style>
</head>
<body class="flex flex-col min-h-screen">
  <canvas id="sparklesCanvas" class="fixed inset-0 pointer-events-none z-50"></canvas>

  <header class="w-full bg-[#0a0f19] border-b border-[#141e2e] px-4 md:px-8 py-3 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <a href="../index.html" class="w-12 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
        <span class="font-chakra font-black text-xl text-black tracking-wider">TNK</span>
      </a>
      <div class="flex flex-col">
        <span class="font-chakra font-black text-lg md:text-xl text-amber-400 tracking-wider leading-none">TNK ARENA</span>
        <span class="text-[9px] md:text-[10px] tracking-widest text-slate-400 font-semibold uppercase mt-1">Game It Enhance Your Mind</span>
      </div>
    </div>
    <div class="flex items-center gap-2 md:gap-3">
      <div class="bg-[#121927] border border-[#1e2d42] rounded-full px-3.5 py-1.5 flex items-center gap-2">
        <span class="w-4 h-4 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] font-black">🪙</span>
        <span class="font-chakra font-bold text-amber-400 text-xs md:text-sm">100 <span class="text-slate-400 text-[10px] md:text-xs">COINS</span></span>
      </div>
      <a href="../index.html" class="bg-[#151f30] hover:bg-[#1b283d] text-slate-200 border border-[#22334c] rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-xs font-semibold transition-all">
        <span>🏠</span> Game Hub
      </a>
      <button id="btnOpenNameModal" class="bg-[#151f30] hover:bg-[#1b283d] text-slate-200 border border-[#22334c] rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-xs font-semibold transition-all">
        <span>✏️</span> Names
      </button>
    </div>
  </header>

  <section class="w-full max-w-7xl mx-auto px-4 mt-4 flex flex-wrap items-center justify-between gap-3">
    <div class="flex items-center gap-3">
      <a href="../index.html" class="bg-[#121a28] hover:bg-[#182436] text-slate-300 border border-[#1d2b40] rounded-lg px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 transition-all">
        ← Back to Hub
      </a>
      <h1 class="font-chakra font-black text-lg md:text-xl text-white tracking-wide">
        CYBER NEON TIC-TAC-TOE
      </h1>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <div class="flex bg-[#0f1725] p-1 rounded-lg border border-[#1b273b]">
        <button class="grid-btn active px-3 py-1 rounded text-xs font-chakra font-bold text-white bg-blue-600 transition-all shadow-[0_0_8px_rgba(37,99,235,0.5)]" data-size="3" data-win="3">3 × 3</button>
        <button class="grid-btn px-3 py-1 rounded text-xs font-chakra font-bold text-slate-400 hover:text-white transition-all" data-size="6" data-win="4">6 × 6</button>
        <button class="grid-btn px-3 py-1 rounded text-xs font-chakra font-bold text-slate-400 hover:text-white transition-all" data-size="9" data-win="6">9 × 9</button>
      </div>
      <div class="flex bg-[#0f1725] p-1 rounded-lg border border-[#1b273b]">
        <button id="mode2P" class="mode-btn px-3 py-1 rounded text-xs font-semibold text-white bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]">2 Players</button>
        <button id="mode3P" class="mode-btn px-3 py-1 rounded text-xs font-semibold text-slate-400 hover:text-white">3 Players</button>
        <button id="modeAI" class="mode-btn px-3 py-1 rounded text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1">🤖 Vs Computer</button>
      </div>
    </div>
    <button id="btnResetGame" class="bg-amber-500 hover:bg-amber-400 text-black font-chakra font-bold px-4 py-2 rounded-lg text-xs md:text-sm flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all">
      🔄 Reset Game
    </button>
  </section>

  <main class="w-full max-w-7xl mx-auto px-4 mt-4 mb-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5">
    <div class="lg:col-span-8 bg-[#0c121e] border border-[#162338] rounded-2xl p-5 flex flex-col justify-between shadow-xl min-h-[560px]">
      <div class="flex items-center justify-between pb-3 border-b border-[#142034] text-xs">
        <div id="turnBadgePill" class="bg-[#1b1222] border border-rose-500/40 text-rose-400 font-semibold px-3 py-1.5 rounded-full flex items-center gap-2">
          <span>🎮</span> <span id="turnPillLabel">Turn: Player 1 (X)</span>
        </div>
        <div class="flex items-center gap-2 bg-[#090f19] px-3 py-1.5 rounded-full border border-[#162438]">
          <span class="text-xs">⏱️</span>
          <div class="w-20 md:w-28 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div id="timerProgress" class="h-full bg-emerald-400 transition-all duration-1000 ease-linear" style="width: 100%;"></div>
          </div>
          <span id="timerStatusLabel" class="font-chakra font-bold text-emerald-400 text-xs">45s Waiting</span>
        </div>
        <span id="turnDescriptionText" class="text-slate-400 font-medium">Player 1's turn</span>
      </div>

      <div class="flex-1 flex items-center justify-center py-6">
        <div id="boardFrame" class="neon-board-frame p-4 bg-[#070b14] flex items-center justify-center">
          <div id="boardGrid" class="grid gap-2.5 transition-all duration-300"></div>
        </div>
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-[#142034] text-[11px] text-slate-500 font-chakra">
        <span id="gamePromptText">MATCH IN PROGRESS // SELECT AN EMPTY TILE</span>
        <button id="toggleSfx" class="hover:text-cyan-400 transition-colors">SFX: ENABLED 🔊</button>
      </div>
    </div>

    <div class="lg:col-span-4 flex flex-col gap-5">
      <div class="bg-[#0c121e] border border-[#162338] rounded-2xl p-5 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <span class="font-chakra font-extrabold text-xs tracking-wider text-slate-400 uppercase">COMPETITORS</span>
          <button id="btnChangeNamesLink" class="text-amber-400 hover:text-amber-300 font-semibold text-xs transition-colors">Change</button>
        </div>
        <div class="space-y-3">
          <div class="bg-[#080d16] border border-[#142236] rounded-xl p-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white font-chakra font-extrabold text-xs shadow-md shadow-rose-500/30">P1</div>
              <span id="nameLabelP1" class="font-semibold text-sm text-slate-200">Player 1</span>
            </div>
            <span class="text-xs font-chakra font-bold text-cyan-400 tracking-wider">Neon Cyan X</span>
          </div>
          <div class="bg-[#080d16] border border-[#142236] rounded-xl p-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-chakra font-extrabold text-xs shadow-md shadow-blue-500/30">P2</div>
              <span id="nameLabelP2" class="font-semibold text-sm text-slate-200">Player 2</span>
            </div>
            <span class="text-xs font-chakra font-bold text-pink-500 tracking-wider">Neon Pink O</span>
          </div>
          <div id="p3CompCard" class="hidden bg-[#080d16] border border-[#142236] rounded-xl p-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-chakra font-extrabold text-xs shadow-md shadow-amber-500/30">P3</div>
              <span id="nameLabelP3" class="font-semibold text-sm text-slate-200">Player 3</span>
            </div>
            <span class="text-xs font-chakra font-bold text-yellow-400 tracking-wider">Neon Yellow Δ</span>
          </div>
        </div>
      </div>

      <div class="bg-[#0c121e] border border-[#162338] rounded-2xl p-5 shadow-xl flex-1 flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <span class="font-chakra font-extrabold text-xs tracking-wider text-slate-400 uppercase">MATCH SCORECARD</span>
          <span class="font-chakra font-extrabold text-[11px] text-amber-400 tracking-widest bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">ACTIVE</span>
        </div>
        <div class="grid grid-cols-2 gap-3 flex-1">
          <div class="bg-[#080d16] border border-[#142236] rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span id="scoreValP1" class="font-chakra font-black text-3xl text-rose-500 leading-none">0</span>
            <span class="text-[10px] font-chakra font-bold text-slate-400 tracking-wider uppercase mt-2">P1 MARKS (X)</span>
          </div>
          <div class="bg-[#080d16] border border-[#142236] rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span id="scoreValP2" class="font-chakra font-black text-3xl text-cyan-400 leading-none">0</span>
            <span class="text-[10px] font-chakra font-bold text-slate-400 tracking-wider uppercase mt-2">P2 MARKS (O)</span>
          </div>
          <div class="bg-[#080d16] border border-[#142236] rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span id="winTargetValue" class="font-chakra font-black text-xl text-cyan-400 leading-none">3 in row</span>
            <span class="text-[10px] font-chakra font-bold text-slate-400 tracking-wider uppercase mt-2">WIN TARGET</span>
          </div>
          <div class="bg-[#080d16] border border-[#142236] rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span id="totalMovesCount" class="font-chakra font-black text-3xl text-amber-400 leading-none">0</span>
            <span class="text-[10px] font-chakra font-bold text-slate-400 tracking-wider uppercase mt-2">TOTAL MOVES</span>
          </div>
        </div>
      </div>
    </div>
  </main>

  <div id="namesModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
    <div class="bg-[#0c121e] border border-[#1e2f47] rounded-2xl w-full max-w-sm p-6 shadow-2xl">
      <div class="flex items-center justify-between mb-4 border-b border-[#17253a] pb-3">
        <h3 class="font-chakra font-black text-base text-amber-400 tracking-wider">EDIT COMPETITOR NAMES</h3>
        <button id="closeNamesModal" class="text-slate-400 hover:text-white font-bold">✕</button>
      </div>
      <div class="space-y-3 mb-5">
        <div>
          <label class="block text-[11px] font-chakra text-slate-400 uppercase font-semibold mb-1">Player 1 (X)</label>
          <input id="inputNameP1" type="text" value="Player 1" class="w-full bg-[#080d16] border border-[#1c2c44] rounded-lg px-3 py-2 text-sm text-cyan-400 font-semibold focus:outline-none focus:border-cyan-400" />
        </div>
        <div>
          <label class="block text-[11px] font-chakra text-slate-400 uppercase font-semibold mb-1">Player 2 (O)</label>
          <input id="inputNameP2" type="text" value="Player 2" class="w-full bg-[#080d16] border border-[#1c2c44] rounded-lg px-3 py-2 text-sm text-pink-400 font-semibold focus:outline-none focus:border-pink-400" />
        </div>
        <div id="p3NameInputWrapper" class="hidden">
          <label class="block text-[11px] font-chakra text-slate-400 uppercase font-semibold mb-1">Player 3 (Δ)</label>
          <input id="inputNameP3" type="text" value="Player 3" class="w-full bg-[#080d16] border border-[#1c2c44] rounded-lg px-3 py-2 text-sm text-yellow-400 font-semibold focus:outline-none focus:border-yellow-400" />
        </div>
      </div>
      <div class="flex gap-2">
        <button id="btnSaveNames" class="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-chakra font-bold py-2 rounded-lg text-xs transition-all">SAVE NAMES</button>
        <button id="btnCancelNames" class="px-4 py-2 bg-[#121927] hover:bg-[#182338] text-slate-300 font-chakra font-semibold rounded-lg text-xs border border-[#1c2a3f]">CANCEL</button>
      </div>
    </div>
  </div>

  <script>
    class RetroAudio {
      constructor() { this.ctx = null; this.enabled = true; }
      init() {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
      }
      playMove(player) {
        if (!this.enabled) return;
        this.init();
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = player === 'X' ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(player === 'X' ? 540 : 620, t);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(t + 0.13);
      }
      playVictory() {
        if (!this.enabled) return;
        this.init();
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const t = this.ctx.currentTime + idx * 0.08;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.3);
        });
      }
    }

    class SparkleFX {
      constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.sparks = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.render = this.render.bind(this);
        requestAnimationFrame(this.render);
      }
      resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
      burst(x, y, color, count = 22) {
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5 + 2;
          this.sparks.push({
            x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            radius: Math.random() * 3 + 1.5, color, alpha: 1, decay: Math.random() * 0.03 + 0.015
          });
        }
      }
      render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = this.sparks.length - 1; i >= 0; i--) {
          const s = this.sparks[i];
          s.x += s.vx; s.y += s.vy; s.alpha -= s.decay;
          if (s.alpha <= 0) { this.sparks.splice(i, 1); continue; }
          this.ctx.save();
          this.ctx.globalAlpha = s.alpha;
          this.ctx.fillStyle = s.color;
          this.ctx.beginPath();
          this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();
        }
        requestAnimationFrame(this.render);
      }
    }

    class TNKCyberTicTacToe {
      constructor() {
        this.size = 3;
        this.winTarget = 3;
        this.mode = '2P';
        this.players = ['X', 'O'];
        this.names = { X: 'Player 1', O: 'Player 2', DELTA: 'Player 3' };
        this.scores = { X: 0, O: 0, DELTA: 0 };
        this.totalMoves = 0;
        this.currentPlayerIdx = 0;
        this.board = [];
        this.gameOver = false;
        this.secondsRemaining = 45;
        this.timerId = null;

        this.audio = new RetroAudio();
        this.fx = new SparkleFX(document.getElementById('sparklesCanvas'));

        this.boardGrid = document.getElementById('boardGrid');
        this.boardFrame = document.getElementById('boardFrame');
        this.turnPillLabel = document.getElementById('turnPillLabel');
        this.turnDescriptionText = document.getElementById('turnDescriptionText');
        this.timerStatusLabel = document.getElementById('timerStatusLabel');
        this.timerProgress = document.getElementById('timerProgress');
        this.winTargetValue = document.getElementById('winTargetValue');
        this.totalMovesCount = document.getElementById('totalMovesCount');
        this.scoreValP1 = document.getElementById('scoreValP1');
        this.scoreValP2 = document.getElementById('scoreValP2');
        this.gamePromptText = document.getElementById('gamePromptText');
        this.nameLabelP1 = document.getElementById('nameLabelP1');
        this.nameLabelP2 = document.getElementById('nameLabelP2');
        this.nameLabelP3 = document.getElementById('nameLabelP3');
        this.p3CompCard = document.getElementById('p3CompCard');

        this.bindEvents();
        this.resetGame();
      }

      bindEvents() {
        document.querySelectorAll('.grid-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            document.querySelectorAll('.grid-btn').forEach(b => {
              b.classList.remove('active', 'bg-blue-600', 'text-white', 'shadow-[0_0_8px_rgba(37,99,235,0.5)]');
              b.classList.add('text-slate-400');
            });
            const b = e.currentTarget;
            b.classList.add('active', 'bg-blue-600', 'text-white', 'shadow-[0_0_8px_rgba(37,99,235,0.5)]');
            b.classList.remove('text-slate-400');
            this.size = parseInt(b.dataset.size, 10);
            this.winTarget = parseInt(b.dataset.win, 10);
            this.winTargetValue.textContent = `${this.winTarget} in row`;
            this.resetGame();
          });
        });

        const modeButtons = [
          { el: document.getElementById('mode2P'), id: '2P' },
          { el: document.getElementById('mode3P'), id: '3P' },
          { el: document.getElementById('modeAI'), id: 'AI' }
        ];

        modeButtons.forEach(m => {
          m.el.addEventListener('click', () => {
            modeButtons.forEach(b => {
              b.el.classList.remove('bg-blue-600', 'text-white', 'shadow-[0_0_8px_rgba(37,99,235,0.5)]');
              b.el.classList.add('text-slate-400');
            });
            m.el.classList.add('bg-blue-600', 'text-white', 'shadow-[0_0_8px_rgba(37,99,235,0.5)]');
            m.el.classList.remove('text-slate-400');
            this.mode = m.id;
            if (this.mode === '3P') {
              this.players = ['X', 'O', 'DELTA'];
              this.p3CompCard.classList.remove('hidden');
              document.getElementById('p3NameInputWrapper').classList.remove('hidden');
            } else {
              this.players = ['X', 'O'];
              this.p3CompCard.classList.add('hidden');
              document.getElementById('p3NameInputWrapper').classList.add('hidden');
            }
            if (this.mode === 'AI') {
              this.names.O = 'Neural AI';
            } else if (this.names.O === 'Neural AI') {
              this.names.O = 'Player 2';
            }
            this.updatePlayerLabels();
            this.resetGame();
          });
        });

        document.getElementById('btnResetGame').addEventListener('click', () => this.resetGame());
        const sfxBtn = document.getElementById('toggleSfx');
        sfxBtn.addEventListener('click', () => {
          this.audio.enabled = !this.audio.enabled;
          sfxBtn.textContent = `SFX: ${this.audio.enabled ? 'ENABLED 🔊' : 'MUTED 🔇'}`;
        });

        const modal = document.getElementById('namesModal');
        const openModal = () => {
          document.getElementById('inputNameP1').value = this.names.X;
          document.getElementById('inputNameP2').value = this.names.O;
          document.getElementById('inputNameP3').value = this.names.DELTA;
          modal.classList.remove('hidden');
        };
        const closeModal = () => modal.classList.add('hidden');

        document.getElementById('btnOpenNameModal').addEventListener('click', openModal);
        document.getElementById('btnChangeNamesLink').addEventListener('click', openModal);
        document.getElementById('closeNamesModal').addEventListener('click', closeModal);
        document.getElementById('btnCancelNames').addEventListener('click', closeModal);

        document.getElementById('btnSaveNames').addEventListener('click', () => {
          this.names.X = document.getElementById('inputNameP1').value.trim() || 'Player 1';
          this.names.O = document.getElementById('inputNameP2').value.trim() || 'Player 2';
          this.names.DELTA = document.getElementById('inputNameP3').value.trim() || 'Player 3';
          this.updatePlayerLabels();
          this.updateTurnDisplay();
          closeModal();
        });
      }

      updatePlayerLabels() {
        this.nameLabelP1.textContent = this.names.X;
        this.nameLabelP2.textContent = this.names.O;
        this.nameLabelP3.textContent = this.names.DELTA;
      }

      resetGame() {
        this.board = Array(this.size * this.size).fill(null);
        this.currentPlayerIdx = 0;
        this.gameOver = false;
        this.totalMoves = 0;
        this.totalMovesCount.textContent = '0';
        this.gamePromptText.textContent = 'MATCH IN PROGRESS // SELECT AN EMPTY TILE';
        this.renderBoard();
        this.updateTurnDisplay();
        this.startTimer();
      }

      renderBoard() {
        this.boardGrid.innerHTML = '';
        this.boardGrid.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
        this.boardGrid.style.gridTemplateRows = `repeat(${this.size}, 1fr)`;
        const dimension = this.size === 3 ? 340 : this.size === 6 ? 380 : 420;
        this.boardFrame.style.width = `${dimension}px`;
        this.boardFrame.style.height = `${dimension}px`;
        this.boardGrid.style.width = '100%';
        this.boardGrid.style.height = '100%';

        for (let i = 0; i < this.size * this.size; i++) {
          const cell = document.createElement('div');
          cell.className = 'cell-box';
          cell.dataset.index = i;
          cell.addEventListener('click', (e) => this.handleCellClick(e, i));
          this.boardGrid.appendChild(cell);
        }
      }

      startTimer() {
        clearInterval(this.timerId);
        this.secondsRemaining = 45;
        this.updateTimerBar();
        this.timerId = setInterval(() => {
          if (this.gameOver) { clearInterval(this.timerId); return; }
          this.secondsRemaining--;
          this.updateTimerBar();
          if (this.secondsRemaining <= 0) {
            this.switchTurn();
            this.startTimer();
          }
        }, 1000);
      }

      updateTimerBar() {
        this.timerStatusLabel.textContent = `${this.secondsRemaining}s Waiting`;
        const pct = Math.max(0, (this.secondsRemaining / 45) * 100);
        this.timerProgress.style.width = `${pct}%`;
        this.timerProgress.className = this.secondsRemaining <= 10
          ? 'h-full bg-rose-500 transition-all duration-1000 ease-linear animate-pulse'
          : 'h-full bg-emerald-400 transition-all duration-1000 ease-linear';
      }

      handleCellClick(e, idx) {
        if (this.board[idx] || this.gameOver) return;
        if (this.mode === 'AI' && this.players[this.currentPlayerIdx] === 'O') return;
        this.executeMove(idx);
      }

      executeMove(idx) {
        const player = this.players[this.currentPlayerIdx];
        this.board[idx] = player;
        this.totalMoves++;
        this.totalMovesCount.textContent = this.totalMoves;
        const cell = this.boardGrid.children[idx];
        const token = document.createElement('div');

        if (player === 'X') {
          token.className = 'token-x';
        } else if (player === 'O') {
          token.className = 'token-o';
        } else {
          token.className = 'token-delta';
          token.innerHTML = `<svg viewBox="0 0 100 100" class="w-full h-full"><polygon points="50,15 90,85 10,85" fill="none" stroke="#facc15" stroke-width="10" stroke-linejoin="round"/></svg>`;
        }
        cell.appendChild(token);

        const rect = cell.getBoundingClientRect();
        const burstColor = player === 'X' ? '#00f0ff' : player === 'O' ? '#ff2a85' : '#facc15';
        this.fx.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, burstColor);
        this.audio.playMove(player);

        const winStreak = this.checkWinStreak(idx);
        if (winStreak) {
          this.finishGame(player, winStreak);
          return;
        }

        if (this.board.every(val => val !== null)) {
          this.finishDraw();
          return;
        }

        this.switchTurn();
        this.startTimer();

        if (this.mode === 'AI' && this.players[this.currentPlayerIdx] === 'O' && !this.gameOver) {
          setTimeout(() => this.runAiTurn(), 420);
        }
      }

      switchTurn() {
        this.currentPlayerIdx = (this.currentPlayerIdx + 1) % this.players.length;
        this.updateTurnDisplay();
      }

      updateTurnDisplay() {
        const p = this.players[this.currentPlayerIdx];
        const pName = this.names[p];
        const pill = document.getElementById('turnBadgePill');
        pill.className = p === 'X'
          ? 'bg-[#1b1222] border border-rose-500/40 text-rose-400 font-semibold px-3 py-1.5 rounded-full flex items-center gap-2'
          : p === 'O'
          ? 'bg-[#0f1d2e] border border-cyan-500/40 text-cyan-400 font-semibold px-3 py-1.5 rounded-full flex items-center gap-2'
          : 'bg-[#221e10] border border-yellow-500/40 text-yellow-400 font-semibold px-3 py-1.5 rounded-full flex items-center gap-2';
        this.turnPillLabel.textContent = `Turn: ${pName} (${p})`;
        this.turnDescriptionText.textContent = `${pName}'s turn`;
      }

      finishGame(winner, winStreak) {
        this.gameOver = true;
        clearInterval(this.timerId);
        this.audio.playVictory();
        winStreak.forEach(i => this.boardGrid.children[i].classList.add('winning-cell'));
        this.fx.burst(window.innerWidth / 2, window.innerHeight / 2, '#00f0ff', 35);
        this.fx.burst(window.innerWidth / 2, window.innerHeight / 2, '#ff2a85', 35);
        this.scores[winner]++;
        this.scoreValP1.textContent = this.scores.X;
        this.scoreValP2.textContent = this.scores.O;
        const wName = this.names[winner];
        this.gamePromptText.textContent = `VICTORY! ${wName} (${winner}) WINS THE ROUND!`;
        this.turnDescriptionText.textContent = `${wName} Wins!`;
      }

      finishDraw() {
        this.gameOver = true;
        clearInterval(this.timerId);
        this.gamePromptText.textContent = 'STALEMATE // ALL TILES OCCUPIED';
        this.turnDescriptionText.textContent = 'Draw Game';
      }

      checkWinStreak(lastIdx) {
        const row = Math.floor(lastIdx / this.size);
        const col = lastIdx % this.size;
        const player = this.board[lastIdx];
        const directions = [
          { dr: 0, dc: 1 }, { dr: 1, dc: 0 }, { dr: 1, dc: 1 }, { dr: 1, dc: -1 }
        ];

        for (const { dr, dc } of directions) {
          const streak = [lastIdx];
          let r = row + dr, c = col + dc;
          while (r >= 0 && r < this.size && c >= 0 && c < this.size && this.board[r * this.size + c] === player) {
            streak.push(r * this.size + c);
            r += dr; c += dc;
          }
          r = row - dr; c = col - dc;
          while (r >= 0 && r < this.size && c >= 0 && c < this.size && this.board[r * this.size + c] === player) {
            streak.push(r * this.size + c);
            r -= dr; c -= dc;
          }
          if (streak.length >= this.winTarget) return streak;
        }
        return null;
      }

      runAiTurn() {
        if (this.gameOver) return;
        const empty = [];
        this.board.forEach((v, idx) => { if (v === null) empty.push(idx); });
        if (empty.length === 0) return;

        for (const idx of empty) {
          this.board[idx] = 'O';
          if (this.checkWinStreak(idx)) {
            this.board[idx] = null;
            this.executeMove(idx);
            return;
          }
          this.board[idx] = null;
        }

        for (const idx of empty) {
          this.board[idx] = 'X';
          if (this.checkWinStreak(idx)) {
            this.board[idx] = null;
            this.executeMove(idx);
            return;
          }
          this.board[idx] = null;
        }

        const center = Math.floor((this.size * this.size) / 2);
        if (this.board[center] === null) {
          this.executeMove(center);
          return;
        }

        const choice = empty[Math.floor(Math.random() * empty.length)];
        this.executeMove(choice);
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      new TNKCyberTicTacToe();
    });
  </script>
</body>
</html>