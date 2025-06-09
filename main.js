let gameData;
let currentStreak = 0;

async function loadGameData() {
  try {
    const response = await fetch('gameData.json');
    gameData = await response.json();
  } catch (error) {
    console.error("ゲームデータの読み込みに失敗しました", error);
    document.getElementById('result').innerText = 'エラー：ゲーム設定を読み込めません';
  }
}

function tryChance() {
  if (!gameData) {
    document.getElementById('result').innerText = 'ゲームデータ未読み込みです';
    return;
  }

  const isSuccess = Math.random() < gameData.stockProbability;
  const resultText = isSuccess ? gameData.successMessage : gameData.failMessage;

  if (isSuccess) {
    currentStreak++;
  } else {
    currentStreak = 0;
  }

  document.getElementById('result').innerText = resultText;
  document.getElementById('streak').innerText = `現在の連チャン数: ${currentStreak}`;
}

// 👇 これを追加
window.tryChance = tryChance;

window.addEventListener('DOMContentLoaded', () => {
  loadGameData();
});
