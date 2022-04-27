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
  console.log('updatedTransaction', updatedTransaction)
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