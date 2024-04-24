import { Request, Response } from "express";
import * as trackingCoinService from "../services/TrackingCoin.service";
import { fetchMarketPricesByPatch } from "../utils/externals.api";
import { STATUS_COIN } from "../utils/constants";
import { DigitalAssets } from "../utils/types.server";

export async function addCoin(req: Request, res: Response) {
	const data = req.body;
	const trackingCoin = await trackingCoinService.addCoin(data);

	return res.json({
		status: 200,
		data: trackingCoin,
		message: "Tracking Coin Added successfully!",
	});
}

export async function getCoins(req: Request, res: Response) {
	const status = req.query?.status || STATUS_COIN.created;
	let trackingCoins = await trackingCoinService.getCoins(Number(status));
	const digitalAssets = trackingCoins?.reduce<DigitalAssets>(
		(result, trackingCoin) => {
			const market = trackingCoin.market || "BINANCE";
			const digitalAsset = trackingCoin.digitalAsset;
			return {
				...result,
				[`${market}:${digitalAsset}`]: {
					price: 0,
					digitalAsset,
					market,
				},
			};
		},
		{}
	);

	if (Number(status) === STATUS_COIN.created && trackingCoins?.length) {
		const priceSymbols = await fetchMarketPricesByPatch(
			Object.keys(digitalAssets)
		);

		if (priceSymbols) {
			trackingCoins = trackingCoins.map((coin) => {
				const market = coin.market || "BINANCE";
				const digitalAsset = coin.digitalAsset;
				const symbol = `${market}:${digitalAsset}`;
				return {
					...coin,
					currentPrice:
						priceSymbols?.find(
							(item: any) => item?.symbol === symbol
						)?.price || 0,
				};
			});
		}
	}

	return res.json({ status: 200, data: trackingCoins });
}

export async function deleteCoin(req: Request, res: Response) {
	const itemDeleted = await trackingCoinService.deleteCoin(
		String(req.params?.id)
	);

	if (!!itemDeleted)
		return res.json({ status: 200, message: "Delete successfully" });
	return res.json({ status: 400, message: "Delete failed!" });
}

export async function updateCoin(req: Request, res: Response) {
	const id = String(req.params?.id);

	if (!id) return res.json({ status: 400, message: "Id is not valid!" });

	const updateData = req.body;
	console.log({ updateData });
	const updatedData = await trackingCoinService.updateCoin(id, updateData);
	if (!!updatedData)
		return res.json({ status: 200, message: "Update successfully" });
	return res.json({ status: 400, message: "Update failed!" });
}
