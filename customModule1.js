const arr = [1, 2, 3, 4, 5, 6];
let sum = 0;

const sumOfList = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
}

console.log(sumOfList(arr));

module.exports = sumOfList;