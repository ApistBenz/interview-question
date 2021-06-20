import http from "k6/http";
import { group, check, sleep } from "k6";
import crypto from "k6/crypto";

export let options = {
  stages: [
    { duration: "2m", target: 100 }, // below normal load
    { duration: "1m", target: 100 },
    { duration: "10s", target: 1400 }, // spike to 1400 users
  ],
  discardResponseBodies: true,
};

const SLEEP_DURATION = 0.2;
const HOST_URI = "http://localhost:3002";
const BET_CALLBACK_ENDPOINT = "/bet";
const SETTLE_CALLBACK_ENDPOINT = "/settle";

export default function () {
  const betID = "BET-" + new Date().getTime();
  const betAmount = parseFloat((Math.random() * 100).toFixed(2));
  const prizeAmount = parseFloat((Math.random() * 100).toFixed(2));

  const playerSubfix = crypto
    .md5(Math.floor(Math.random() * 100000).toString(), "hex")
    .substr(0, 7);
  const playerUsername = "py-" + playerSubfix;

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  group("Generate Bet and Settle request", (_) => {
    const betPayload = {
      betId: betID,
      betAmount: betAmount,
      playerUsername: playerUsername,
    };

    const betResponse = http.post(
      `${HOST_URI}${BET_CALLBACK_ENDPOINT} `,
      betPayload,
      params
    );

    check(betResponse, {
      "bet is status 200": (r) => r.status === 200,
    });

    sleep(SLEEP_DURATION);

    const settlePayload = {
      betId: betID,
      prizeAmount: prizeAmount,
      playerUsername: playerUsername,
    };

    const settleResponse = http.post(
      `${HOST_URI}${SETTLE_CALLBACK_ENDPOINT}`,
      settlePayload,
      params
    );

    check(settleResponse, {
      "settle is status 200": (r) => r.status === 200,
    });

    sleep(1);
  });
}
