/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let target = [];
  let n = transactions.length;
  for(let key of transactions){
    let flag = true;
    if(target.length >= 1){
      for(let temp of target){
        if(temp.category == key.category){
          flag = false;
          temp.totalSpent = Number(temp.totalSpent) + Number(key.price);
        }
      }
    }
    if(flag){
      let ob = {};
        ob.category = key.category;
        ob.totalSpent = key.price;
        target.push(ob);
    }
  }
  return target;
}

module.exports = calculateTotalSpentByCategory;
