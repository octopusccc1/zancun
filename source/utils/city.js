const splitCity = (letters, cities) => {
  const letterArr = letters.split('');
  const arr = [];
  for(let letter of letterArr){
    let itemList = {};
    itemList['letter'] = letter;
    itemList['children'] = cities.filter(i => i.letter === letter);
    arr.push(itemList);
  }
  return arr;
};

export const groupCity = (letters, cities) => {
  let letterGroupArr = [];
  let cityListObj = {};
  for(let i=0,len=letters.length;i<len;i+=4){
    letterGroupArr.push(letters.slice(i,i+4));
  }
  const cityArr = splitCity(letters, cities);
  for(let letterGroup of letterGroupArr){
    cityListObj[letterGroup] = [];
    for(let city of cityArr){
      if(letterGroup.indexOf(city.letter) >= 0){
        cityListObj[letterGroup].push(city);
      }
    }
  }
  return [letterGroupArr, cityListObj];
};

// 根据城市码解析城市名
export const getCityFromCode = (code) => {
  return '北京';
};
