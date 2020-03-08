let getFirstNum = arr => {
  if (typeof arr == 'number') {
    return arr;
  } else {
    return getFirstNum(arr[0]);
  }
};

module.exports = {
  getFirstNum,
};
