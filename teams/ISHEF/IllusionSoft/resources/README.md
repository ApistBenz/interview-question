IllusionSoft
=============
The purpose of this project challenge is **not focus on perfection or completion** but give precedence on a **quality and the way you learning the new thing**.

## Requirements

### Module 1 | Callback (API)

The `callback API` (Blue box) is a API for handle `GameProvider` to making a request to us when player play a game on `GameProvider`'s game UI follow below diagram.

![image](https://user-images.githubusercontent.com/4927368/122644017-19250980-d13d-11eb-8c90-e3062ed1d627.png)

In each bet that player place a bet you'll receive 2 requests.
1. **Bet Request**
    - `BetId` : Use for reference between bet and settle request. (same bet shoud be same id)
    - `BetAmount` : How many amount that player spend to place bet. (ex. amount: 100)
    - `PlayerUsername` : Username that player use to place bet.

2. **Settle Request**
    - `BetId`: same id with bet request.
    - `PrizeAmount` : the prize amount that player receive.
    - `PlayerUsername` : same username with bet request.

#### API Callback Requirement
You need to development 2 API endpoints
##### 1. POST /bet
When receiving the `bet request`.
1. deduct player's balance (if player has sufficient balance to place bet if not shoud response success immediately)
2. saving `bet transaction`

##### 2. POST /settle
and next you'll receive the `settle request`.
1. update `WinLoseAmount` and `Status` to `done`
2. done all of process by return response success
---
#### Player schema
```json
{
    playerUsername: string, (unique)
    balance: Decimal128
}
```
#### BetTransaction schema
```json
{
    betId: string, (unique)
    playerUsername: string,
    betAmount: Decimal128,
    status: string,
    winLoseAmount: Deciaml128,
    createdDate: ISODatetime,
    gameDate: ISODatetime,
}
```
#### schema explain
| Field name     | Description                                                         | Logical                 | possible values                          |
|----------------|---------------------------------------------------------------------|-------------------------|------------------------------------------|
| betId (unique) | Use betId from bet request                                          |                         |                                          |
| playerUsername | the player's username that place bet                                |                         |                                          |
| amount         | the value of amount that player bet                                 |                         |                                          |
| status         | `running` when bet request and making it `done` when settle request |                         | running, done                            |
| winLoseAmount  | The profit of player                                                | PrizeAmount - BetAmount | < 0 = player waste their money to our system. |
| gameDate       | create bet transaction date                                         |                         |                                          |
| settledDate    | settled date                                                        |                         |                                          |


### Module 2 | Leaderboard (UI)

The leaderboard to show who are the most receiving money from our systems (highest sum of winLoseAmount).

#### requirement
1. Beatiful UI is **not require** (Just HTML without CSS that super enough!!.)
2. Show only top 5 players.
2. Use **`WebSocket`** for updaing the data in leaderboard. (every 5s)
3. Design architecture for making real-time leaderboard. (with highest performance : 3000 concurrent player process) **( 🍻 bonus )**

---
## Stack
This mini-project requires to use 
- [Minikube](https://minikube.sigs.k8s.io/docs/) for deploy your whole stack as containerization application.
- [MongoDB](https://www.mongodb.com/) as database (we will sending you about the mongoDB cluster infomation to your email)

---
## Prepare environment

1. Install Docker and Minikube
1. connecting to mongodb cluster and then create the new database and naming as your name as format `first 5 character of your firstname follow first 3 character of your lastname` example.

```
Your name: Foofy Barbarla
Database name: foofybar
```

2. Copy all of mock player data to your player collection. ( ** **playerUsername shoud be unique** )

---
## Testing
You can use `K6` file in resource directory for generate bet and settle requests.

1. Install [K6](https://k6.io/docs/getting-started/installation/)
2. Runing test `k6 run generate-bet-request.js -u 1 -d 1s`

---
## Timebox
7 Days

---
## Artifacts
Create your own new repository for keep all of your project files including.
1. Source code
2. Kubernetes deployment file
3. High-level architecture design diagram. **( 🍻 bonus )**


