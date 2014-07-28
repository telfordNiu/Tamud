/**
 * Created by ghd08888 on 2014/7/23.
 */

define(["underscore"], function (_) {
  /**
   * @description 返回一个带有两个参数的函数
   * @param {Array} 需要渲染的数据的数组
   * @param {String} 模板script标签的id
   * @return {Object} 返回一个只包含'str'属性(渲染后的模板字符串)的对象
   */
  return function (data, tempId) {
    var template = document.getElementById(tempId),
      compiler = _.template(template.innerHTML),
      tempStr = compiler({data: data});

    return {
      str: tempStr
    };
  };
});
