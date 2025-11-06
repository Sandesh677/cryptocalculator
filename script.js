function calculatePL() {
  const tradeAmount = parseFloat(document.getElementById("tradeAmount").value);
  const leverage = parseFloat(document.getElementById("leverage").value);
  const entryPrice = parseFloat(document.getElementById("entryPrice").value);
  const targetPrice = parseFloat(document.getElementById("targetPrice").value);
  const stopLoss = parseFloat(document.getElementById("stopLoss").value);
  const fee = parseFloat(document.getElementById("fee").value) || 0;
  const tradeType = document.getElementById("tradeType").value;

  if (!tradeAmount || !leverage || !entryPrice || !targetPrice || !stopLoss) {
    alert("Please fill in all required fields!");
    return;
  }

  const positionSize = (tradeAmount * leverage) / entryPrice;

  let profit, loss;
  if (tradeType === "long") {
    profit = (targetPrice - entryPrice) * positionSize;
    loss = (entryPrice - stopLoss) * positionSize;
  } else {
    profit = (entryPrice - targetPrice) * positionSize;
    loss = (stopLoss - entryPrice) * positionSize;
  }

  // Fees
  const totalFee = (tradeAmount * (fee / 100)) * 2; // entry + exit
  const netProfit = profit - totalFee;
  const riskReward = (profit / loss).toFixed(2);

  // Display results
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("positionSize").innerText = `Position Size: ${positionSize.toFixed(2)} units`;
  document.getElementById("profit").innerText = `Potential Profit: $${profit.toFixed(2)}`;
  document.getElementById("loss").innerText = `Potential Loss: $${loss.toFixed(2)}`;
  document.getElementById("riskReward").innerText = `Risk/Reward Ratio: ${riskReward}`;
  document.getElementById("netProfit").innerText = `Net Profit (after fees): $${netProfit.toFixed(2)}`;
}

async function fetchLatestPrice() {
  const response = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
  const data = await response.json();
  document.getElementById("latestPrice").innerText = `BTC/USDT Latest Price: $${parseFloat(data.price).toFixed(2)}`;
}
