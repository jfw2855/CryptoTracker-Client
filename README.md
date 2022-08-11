# Crypto Tracker | MERN

an app to allow users to track their crypto investments
[Server Source Code](https://github.com/jfw2855/CryptoTracker-Server)


## Demo

[Deployed on Heroku](https://cryptotrackrr.herokuapp.com/)

## Tech Stack

#### Frontend

- React (Hooks, State, Functional Components)
- PlotlyJS
- React-icons
- Axios
- React Bootstrap
- [CoinGecko External API](https://www.coingecko.com/en/api/documentation)
- [Crypto News Live Extneral API](https://rapidapi.com/ddeshon/api/crypto-news-live3/)

#### Backend

- NodeJS
- Express
- JWT
- Bcrypt
- MongoDB
- Mongoose


## Features

- Authentication (login/register w/ username & password)
- CRUD portfolio, to track crypto investments
- Users can favorite cryptocurrencies from home page rendering top 100 coins
- Displays trending coins and crypto related news on Homepage
- Plotted price history data on crypto show page
- Error management with descriptive messages
- Toast notifications for actions: login, adding coins to crypto, etc.
- Loading spinners for fetching processes

## App Screenshots

<img src="/media/CryptoTracker-LandingPage.png" alt="Landing_page" width="70%"/>

<img src="/media/CryptoTracker-HomePage.png" alt="Homepage" width="70%"/>

<img src="/media/CryptoTracker-FavoritesPage.png" alt="Favorites_Page" width="70%"/>

<img src="/media/CryptoTracker-CryptoShowPage.png" alt="CryptoShowPage" width="70%"/>

<img src="/media/CryptoTracker-Portfolio.png" alt="Portfolio" width="70%"/>

<img src="/media/CryptoTracker-TransactionModal.png" alt="Modal" width="70%"/>

<img src="/media/CryptoTracker-Transactions.png" alt="Transactions" width="70%"/>


## Planning & Design 
<details>
<summary>Overview</summary>

## USER STORIES - MVP:

- Users should be able to get information about the top 100 cryptocurrencies, and favorite these coins and save them
- Users should be able to create a portfolio. In the portfolio they will be able to log their transactions, and gather information about their portfolio

  ## PORTFOLIO INFORMATION:

  - Chart of their total holdings
  - Total portfolio gain or loss

  ## INDIVIDUAL COIN INFORMATION:

  - Quantity and price purchased at
  - Total gain or loss since purchasing

## STRETCH GOALS:

- For each coin show page, users should be able to like or dislike a coin based on current market sentiment
- Users should also be able to comment on a coin's show page and express their opinion on the coin with other users

## ERD
![ERD](/media/cryptoERD.png)

## Landing
![landing](/media/crypto-landing.jpg)

## Homepage - top 100 coins
![homepage](/media/crypto-top.jpg)

## Portfolio
![portfolio](/media/crypto-portfolio.jpg)

## Modal
![modal](/media/crypto-mod.jpg)

## Modal Cont.
![modal2](/media/crypto-mod2.jpg)

## Favorites
![favorites](/media/crypto-fav.jpg)

## Coin Showpage - w/ Stretch Goals
![showpage](/media/crypto-show.jpg)

</details>
