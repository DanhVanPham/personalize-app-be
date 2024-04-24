import axios from "axios";
import * as TradingView from "@mathieuc/tradingview";
import { DigitalAssets } from "./types.server";

const API_BINANCE_URL = "https://www.binance.com/api/v3";

axios.defaults.baseURL = API_BINANCE_URL;

// export const getMarketPrice = async (params: {
//   symbols?: string
//   symbol?: string
// }) => {
//   try {
//     const res = await axios.get('/ticker/price', {
//       params,
//     })
//     return res.data
//   } catch (error) {
//     return console.log(error)
//   }
// }

export const getExchangeInfo = async () => {
	try {
		const res = await axios.get("/exchangeInfo");
		return res.data;
	} catch (error) {
		return console.log(error);
	}
};

export async function getMarketPrice(symbol: string, timeframe = "1") {
	return new Promise((resolve, reject) => {
		const client = new TradingView.Client(); // Creates a websocket client

		const chart = new client.Session.Chart(); // Init a Chart session

		chart.setMarket(symbol, {
			// Set the market
			timeframe,
		});

		chart.onError((...err: any[]) => {
			// Listen for errors (can avoid crash)
			reject(new Error(`Chart error: ${err.join(" ")}`));
		});

		chart.onSymbolLoaded(() => {
			// When the symbol is successfully loaded
			console.log(`Market "${chart.infos.description}" loaded !`);
		});

		chart.onUpdate(() => {
			// When price changes
			if (!chart.periods[0]) return;
			resolve({
				symbol,
				timeframe,
				price: chart.periods[0].close,
				currency: chart.infos.currency_id,
			});
			chart.delete();
			client.end();
		});

		// Set timeout to close chart and client if no update received within 30 seconds
		setTimeout(() => {
			chart.delete();
			client.end();
			reject(new Error("Timeout: No update received within 30 seconds"));
		}, 30000);
	});
}

export const fetchMarketPrices = async (symbols: string[]) => {
	const prices = [];
	for (const symbol of symbols) {
		let price = 0;
		try {
			const response = await getMarketPrice(symbol);
			price = (response as any)?.price;
			console.log(price);
		} catch (error) {
			console.error("Error fetching market prices:", error);
		}
		prices.push({ symbol, price });
	}
	return prices;
};

export const fetchMarketPricesByPatch = async (symbols: string[]) => {
	// Split keys into batches of 4
	const batchSize = 4;
	const batches = [];
	for (let i = 0; i < symbols.length; i += batchSize) {
		batches.push(symbols.slice(i, i + batchSize));
	}

	// Fetch market prices for each batch asynchronously
	const priceSymbols = [];
	for (const batch of batches) {
		try {
			const prices = await fetchMarketPrices(batch);
			priceSymbols.push(...prices);
		} catch (error) {
			console.error("Error fetching market prices:", error);
		}
	}
	return priceSymbols;
};
