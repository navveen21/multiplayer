/**
 * Cyber Neon Tic-Tac-Toe Game Engine (adapted from test2.1.html)
 * - 3-Player mode removed (strictly 2-Player or Player vs Neural AI)
 * - Multi-level grid: 3x3 (target 3), 4x4 (target 4), 5x5 (target 4)
 * - Cyan X and Pink O glowing tokens from test2.1
 * - 45-second turn timer with auto-switch on timeout
 * - Isolated file: edit this file directly to update Tic-Tac-Toe!
 */

const TicTacToeGame = (function() {
  let size = 3;
  let target = 3;
  let board = [];
  let turn = "X"; // 'X' or 'O'
  let totalMoves = 0;
  let gameOver = false;
  let gameStartedOnBoard = false;
  let isAiMode = false;

  let timerStarted = false;
  let timeRemaining = 45;
  let timerInterval = null;

  function init() {
    document.getElementById("arenaGameTitle").textContent = "Cyber Neon Tic-Tac-Toe";
    document.getElementById("badgeP1Role").textContent = "Neon Cyan X";
    document.getElementById("badgeP2Role").textContent = isAiMode ? "Neural AI (O)" : "Neon Pink O";
    document.getElementById("gridSizeSelector").style.display = "flex";
    document.getElementById("neonGridContainer").style.display = "grid";
    document.getElementById("boardSvg").style.display = "none";
    document.getElementById("p2ActionSection").style.display = "none";

    reset();
  }

  function setLevel(newSize) {
    size = newSize;
    target = (newSize === 5) ? 4 : newSize;

    document.querySelectorAll(".size-btn").forEach(btn => {
      btn.classList.toggle("active", btn.textContent.includes(`${newSize}`));
    });

    reset();
  }

  function setAiMode(aiEnabled) {
    isAiMode = aiEnabled;
    document.getElementById("badgeP2Role").textContent = isAiMode ? "Neural AI (O)" : "Neon Pink O";
  }

  function reset() {
    clearInterval(timerInterval);
    timerStarted = false;
    timeRemaining = 45;
    gameStartedOnBoard = false;
    turn = "X";
    totalMoves = 0;
    gameOver = false;
    board = Array(size * size).fill(null);

    document.getElementById("boardStartOverlay").style.display = "flex";
    document.getElementById("overlayTitle").textContent = `${size}×${size} Cyber Grid Ready`;
    document.getElementById("statBox3Label").textContent = "Win Target";
    document.getElementById("statBox3Val").textContent = `${target} in row`;
    document.getElementById("moveCountLabel").textContent = "Total Moves";

    buildGridUI();
    updateUI();
  }

  function buildGridUI() {
    const container = document.getElementById("neonGridContainer");
    container.innerHTML = "";
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
      const cell = document.createElement("div");
      cell.className = "board-cell";
      cell.onclick = () => onCellClicked(i);
      container.appendChild(cell);
    }
  }

  function startOnBoard() {
    gameStartedOnBoard = true;
    document.getElementById("boardStartOverlay").style.display = "none";
    playTone(523, 'triangle', 0.2);
    updateUI();
  }

  function onCellClicked(index) {
    if (!gameStartedOnBoard || gameOver) return;
    if (board[index] !== null) {
      playTone(140, 'square');
      return;
    }

    if (isAiMode && turn === "O") return; // Block human click on AI turn

    applyMove(index);
  }

  function applyMove(index) {
    board[index] = turn;
    totalMoves++;

    const cell = document.getElementById("neonGridContainer").children[index];
    const token = document.createElement("div");

    if (turn === "X") {
      token.className = "token-x";
      playTone(520, 'sawtooth', 0.12);
    } else {
      token.className = "token-o";
      playTone(620, 'sine', 0.12);
    }
    cell.appendChild(token);

    startTurnTimer();

    const winResult = evaluateWin(index);
    if (winResult) {
      if (winResult.isDraw) {
        triggerDrawModal(winResult.reason);
      } else {
        winResult.winLine.forEach(idx => {
          document.getElementById("neonGridContainer").children[idx].classList.add("winning-cell");
        });
        const winner = winResult.winner === "X" ? player1Name : (isAiMode ? "Neural AI" : player2Name);
        triggerWinCelebration(winner, winResult.reason);
      }
      return;
    }

    turn = (turn === "X") ? "O" : "X";
    updateUI();

    if (isAiMode && turn === "O" && !gameOver) {
      setTimeout(runAiStep, 400 + Math.random() * 250);
    }
  }

  function evaluateWin(lastIdx) {
    const row = Math.floor(lastIdx / size);
    const col = lastIdx % size;
    const player = board[lastIdx];

    const directions = [
      { dr: 0, dc: 1 },  // Horizontal
      { dr: 1, dc: 0 },  // Vertical
      { dr: 1, dc: 1 },  // Diagonal       { dr: 1, dc: -1 }  // Diagonal /
    ];

    for (const { dr, dc } of directions) {
      const line = [lastIdx];

      let r = row + dr, c = col + dc;
      while (r >= 0 && r < size && c >= 0 && c < size && board[r * size + c] === player) {
        line.push(r * size + c);
        r += dr; c += dc;
      }

      r = row - dr; c = col - dc;
      while (r >= 0 && r < size && c >= 0 && c < size && board[r * size + c] === player) {
        line.push(r * size + c);
        r -= dr; c -= dc;
      }

      if (line.length >= target) {
        const winnerName = player === "X" ? player1Name : (isAiMode ? "Neural AI" : player2Name);
        return {
          isDraw: false,
          winner: player,
          winLine: line,
          reason: `${winnerName} achieved ${target} marks in a row!`
        };
      }
    }

    if (board.every(cell => cell !== null)) {
      return { isDraw: true, reason: `Grid completely filled with no alignment. Match ended in a DRAW!` };
    }

    return null;
  }

  function runAiStep() {
    if (gameOver || turn !== "O") return;

    const empty = [];
    board.forEach((val, idx) => {
      if (val === null) empty.push(idx);
    });
    if (empty.length === 0) return;

    // 1. Can AI win now?
    for (const idx of empty) {
      board[idx] = "O";
      if (evaluateWin(idx)) {
        board[idx] = null;
        applyMove(idx);
        return;
      }
      board[idx] = null;
    }

    // 2. Can player X win next turn? Block!
    for (const idx of empty) {
      board[idx] = "X";
      if (evaluateWin(idx)) {
        board[idx] = null;
        applyMove(idx);
        return;
      }
      board[idx] = null;
    }

    // 3. Take center if open
    const center = Math.floor((size * size) / 2);
    if (board[center] === null) {
      applyMove(center);
      return;
    }

    // 4. Random strategic pick
    const chosen = empty[Math.floor(Math.random() * empty.length)];
    applyMove(chosen);
  }

  function startTurnTimer() {
    clearInterval(timerInterval);
    if (gameOver) return;

    timerStarted = true;
    timeRemaining = 45;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      if (gameOver) { clearInterval(timerInterval); return; }
      timeRemaining--;
      updateTimerDisplay();

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        turn = (turn === "X") ? "O" : "X";
        updateUI();
        startTurnTimer();
        if (isAiMode && turn === "O" && !gameOver) {
          setTimeout(runAiStep, 400);
        }
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const clock = document.getElementById("timerClockDisplay");
    const bar = document.getElementById("timerProgressBar");
    if (!clock || !bar) return;

    if (!timerStarted) {
      clock.textContent = "Waiting";
      bar.style.width = "100%";
      return;
    }
    clock.textContent = timeRemaining + "s";
    bar.style.width = ((timeRemaining / 45) * 100) + "%";

    if (timeRemaining <= 10) {
      clock.style.color = "#ff007f";
      bar.style.backgroundColor = "#ff007f";
      playTone(180, 'sine', 0.05);
    } else {
      clock.style.color = "#00f3ff";
      bar.style.backgroundColor = "#00f3ff";
    }
  }

  function updateUI() {
    document.getElementById("statBox1Label").textContent = "P1 Marks (X)";
    document.getElementById("statBox2Label").textContent = isAiMode ? "AI Marks (O)" : "P2 Marks (O)";
    document.getElementById("statBox1Val").textContent = board.filter(c => c === "X").length;
    document.getElementById("statBox2Val").textContent = board.filter(c => c === "O").length;
    document.getElementById("moveCountVal").textContent = totalMoves;

    const turnBadge = document.getElementById("turnBadge");
    const turnText = document.getElementById("turnText");
    const prompt = document.getElementById("statusPrompt");

    if (turn === "X") {
      turnBadge.className = "turn-pill turn-p1";
      turnText.textContent = `Turn: ${player1Name} (X)`;
    } else {
      turnBadge.className = "turn-pill turn-p2";
      turnText.textContent = `Turn: ${isAiMode ? 'Neural AI' : player2Name} (O)`;
    }

    if (!gameStartedOnBoard) {
      prompt.textContent = "Click 'Start Game on Board' to unlock";
    } else {
      prompt.textContent = `${turn === 'X' ? player1Name : (isAiMode ? 'Neural AI' : player2Name)}'s turn`;
    }
  }

  function pauseTimer() { clearInterval(timerInterval); }

  return {
    init,
    reset,
    setLevel,
    setAiMode,
    startOnBoard,
    pauseTimer
  };
})();
