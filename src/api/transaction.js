import apiUrl from '../apiConfig'
import axios from 'axios'

// SHOW -> shows all transactions for a specific coin
export const viewTransactions = (user,coin) => {
    
    const config = {
      method: 'get',
      url: `${apiUrl}/transaction/${coin}`,
      headers: {
          Authorization: `Token token=${user.token}`
      }
    }
    return axios(config)
  }


// UPDATE -> updates a single transaction for a specific coin
export const updateTransaction = (user,updatedTransaction) => {

  const config = {
    method: 'patch',
    url: `${apiUrl}/transaction/tid/${updatedTransaction._id}`,
    headers: {
        Authorization: `Token token=${user.token}`
    },
    data: {transaction:updatedTransaction}
  }
  return axios(config)
}

// DELETE -> removes a single transaction for a specific coin
export const removeTransaction = (user,transId) => {
  const config = {
    method: 'delete',
    url: `${apiUrl}/transaction/tid/${transId._id}`,
    headers: {
        Authorization: `Token token=${user.token}`
    }
  }
  return axios(config)
}

// POST -> creates a transaction
export const createTransaction = (user,created) => {
  console.log('this is api resp for created Transaction',created)
  const config = {
    method: 'post',
    url: `${apiUrl}/transaction`,
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: {transaction: created}
  }
  return axios(config)
}

// SHOW -> displays user's purchased transactions for a coin
export const showCoinPurchases = (user,coinId) => {
    
  const config = {
    method: 'get',
    url: `${apiUrl}/transaction/buy/${coinId}`,
    headers: {
        Authorization: `Token token=${user.token}`
    }
  }
  return axios(config)
}
