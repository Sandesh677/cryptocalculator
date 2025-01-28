from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Function to calculate profit
def calculate_profit(buy_price, sell_price, investment, fees):
    total_cost = (buy_price * investment) + fees
    total_return = sell_price * investment
    profit = total_return - total_cost
    return profit

# Route for the home page
@app.route('/')
def home():
    return render_template('index.html')

# Route to fetch live cryptocurrency prices using CoinGecko API
@app.route('/get_prices', methods=['GET'])
def get_prices():
    api_url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    response = requests.get(api_url)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to fetch prices."}), 500

# Route for the profit calculator
@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        buy_price = float(request.form['buy_price'])
        sell_price = float(request.form['sell_price'])
        investment = float(request.form['investment'])
        fees = float(request.form.get('fees', 0))

        profit = calculate_profit(buy_price, sell_price, investment, fees)
        return jsonify({"profit": round(profit, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
