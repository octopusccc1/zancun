// 1：公共标签  1.1：私有标签或公共与私有混合
export const distinguishTagType = (tagList) => {
  let text = 1;
  for(let each of tagList){
    if(each.customized){
      text = 1.1;
      break;
    }
  }
  return text;
};
