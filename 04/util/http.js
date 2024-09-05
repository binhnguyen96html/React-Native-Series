import axios from 'axios';

const BACKEND_URL =
  'https://react-native-expense-tra-39d24-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
  // console.log('response.data: ', response.data)
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + '/expenses.json');

  console.log(response.data)

  const expenses = [];

  for(const key in response.data){
    const expenseObj ={
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };

    expenses.push(expenseObj)
  }

  return expenses;
}


export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);

}


export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}