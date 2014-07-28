define(["json2"], function () {
  window._tc_bridge_public = {
    /**
     * @description fake url的name
     * @type {String}
     */
//    urlPrefix: 'tctrip://shouji.17u.cn',

    /**
     * @description 当前平台类型
     * @type {Number} {0: iPhone, 1: Andriod}
     */
    platform: null,

    /**
     * @description 用户是否登录
     * @type {bool} {0: 未登录, 1:已登录}
     */
    isLogin: null,

    /**
     * @description 判断一个字符串是不是空字符串
     * @param {String} str 待判断的字符串
     * @return {boolean}
     */
    NaEptStr: function (str) {
      return !!(typeof str === 'string' && str.length > 0);

    },

    /**
     * @description 判断一个对象是不是空对象
     * @param {Object} obj 待判断的对象
     * @return {boolean}
     */
    NaEptObj: function (obj) {
      return !!(Object.getOwnPropertyNames(obj).length > 0 || obj.length > 0);

    },

    /**
     * @description 对传入的JSON对象做JSON.stringify和encode操作,并返回结果
     * @param  {JSON} jsonObj 传入的JSON对象
     * @return {String} 返回转义过的JSON字符串 
     */
    stringifyAndEncode: function (jsonObj) {
      if (typeof jsonObj === 'string' || this.NaEptObj(jsonObj)) {
        var result;

        result = JSON.stringify(jsonObj);
        result = encodeURIComponent(result);

        return result;
      }
      return '';
    },

    /**
     * @description 对传入的JSON字符串做decode和JSON.parse操作,并返回结果
     * @param  {JSON} jsonStr 传入的JSON字符串
     * @return {Object} 返回处理过的对象
     */
    decodeAndParse: function (jsonStr) {
      if (this.NaEptStr(jsonStr)) {
        var result;

        result = decodeURIComponent(jsonStr);
        result = JSON.parse(result);

        return result;
      }
      return false;
    },

    buildParamString: function (plugin, ntvAction, params, webAction) {
      if (!this.NaEptStr(plugin) || !this.NaEptStr(ntvAction)) {
        return '';
      }

      if (!this.NaEptObj(params)) {
        params = {};
      }

      params.plugin = plugin;
      params.ntvAction = ntvAction;
      params.webAction = webAction;

      return JSON.stringify(params);
    },

    /**
     * @description native回调web
     * @param  {JSON} jsonStr 要传递的JSON字符串,
     *                             格式:
     *                             {
     *                               "tagname": String, // REQUIRED
     *                               "params": Object // OPTIONAL
     *                             }
     *                             tagname是要调用的方法名字, 必填
     *                             params是调用方法时传递的参数, 可选
     */
    ntvCB: function (jsonStr) {
      jsonStr = jsonStr || '';

      if (this.NaEptStr(jsonStr)) {
        var cbObj = this.decodeAndParse(jsonStr),
          cbPlugin = cbObj.pluginname,
          cbAction = cbObj.tagname,
          cbParams = cbObj.param;

        // 回调H5定义的window.action对象里的方法,根据tagname指定方法名
        if (window[cbPlugin] && window[cbPlugin].hasOwnProperty(cbAction)) {
          return window[cbPlugin][cbAction](cbParams);
        }
        throw '回调web api出错!不存在window._tc_web_*或window._tc_web_*中没有需要回调的方法';
      }
    },

    /**
     * @description web回调native
     * @param  {JSON} jsonStr 要传递的JSON字符串,
     *                             格式:
     *                             {
     *                               "tagname": String, // REQUIRED
     *                               "params": Object // OPTIONAL
     *                             }
     *                             tagname是要调用的方法名字, 必填
     *                             params是调用方法时传递的参数, 可选
     */
    webCB: function (jsonStr) {
      jsonStr = jsonStr || '';

      if (this.NaEptStr(jsonStr)) {
        var cbObj = this.decodeAndParse(jsonStr),
          cbPlugin = cbObj.pluginname,
          cbAction = cbObj.tagname,
          cbParams = cbObj.param;

        // 回调H5定义的window.action对象里的方法,根据tagname指定方法名
        if (window[cbPlugin] && window[cbPlugin].hasOwnProperty(cbAction)) {
          return window[cbPlugin][cbAction](cbParams);
        }
        throw '回调native api出错!不存在window._tc_ntv_*或window._tc_ntv_*中没有需要回调的方法';
      }
    },

    /**
     * @description 组装url的参数信息,包括action,params
     * @param {Object} obj url参数的JSON对象
     * @return {String} fakeUrl schema Url
     * @since v6.5
     * @author Tamud
     *
    buildFakeUrl: function (obj) {
      var fakeUrl,
        actionName,
        params,
        paramString = '';

      if(this.NaEptObj(obj)){
        actionName = obj.actionName;
        params = obj.params;
      }
      else{
        throw 'window.tcBridge.buildFakeUrl()参数应该是一个非空对象!';
      }

      if(this.NaEptObj(params)){
        for(var key in params){
          paramString = paramString + '&' + key + '=' + params[key];
        }
      }
      else{
        throw 'window.tcBridge.buildFakeUrl()参数的第二个属性params应该是一个非空对象!';
      }

      fakeUrl = this.urlPrefix + '?' + actionName + paramString;
      fakeUrl = encodeURIComponent(fakeUrl);

      return fakeUrl;
    },
    */

    /**
     * @description H5调用native API
     * @param {String} jsonStr 要传递的JSON字符串,
     *                             格式:
     *                             {
     *                               "tagname": String, // REQUIRED
     *                               "params": Object // OPTIONAL
     *                             }
     *                             tagname是要调用的方法名字, 必填
     *                             params是调用方法时传递的参数, 可选
     * @since v6.5
     * @author Tamud
     */
//    invokeNtvApi: function (jsonStr) {
//      var obj = this.decodeAndParse(jsonStr),
//        actionName = obj.tagname,
//        params = obj.param,
//        responInfo;
//
//      params = this.stringifyAndEncode(params);
//
//      if (window._tc_ntv_user && window._tc_ntv_user.hasOwnProperty(actionName)) {
//        responInfo = window._tc_ntv_user[actionName](params);
//
//        return responInfo;
//      }
//      throw '调用native api出错,不存在window._tc_ntv_user或window._tc_ntv_user中没有需要调用的方法';
//    },

    /**
     * @description native调用 H5 API
     * @param {String} jsonStr 要传递的JSON字符串,
     *                             格式:
     *                             {
     *                               "tagname": String, // REQUIRED
     *                               "params": Object // OPTIONAL
     *                             }
     *                             tagname是要调用的方法名字, 必填
     *                             params是调用方法时传递的参数, 可选
     * @since v6.5
     * @author Tamud
     */
//    invokeWebApi: function (jsonStr) {
//      var obj = this.decodeAndParse(jsonStr),
//        actionName = obj.tagname,
//        params = obj.param,
//        responInfo;
//
//      params = this.stringifyAndEncode(params);
//
//      if (window.action && window.action.hasOwnProperty(actionName)) {
//        responInfo = window.action[actionName](params);
//
//        return responInfo;
//      }
//      throw '调用web api出错,不存在window.action或window.action中没有需要调用的方法';
//    },

    /**
     * @description 把数据缓存到localstorage
     * @param {String} key
     * @param {String} value
     * @since v6.5
     * @author Tamud
     */
    localStorage: function (key, value) {
      window.localStorage[key] = value;
    },

    /**
     * @description 初始化bridge
     */
    init: function () {
      var platform = window.navigator.userAgent;

      if (platform.indexOf('iPhone') > 0) {

        // iPhone
        this.platform = 0;
      }

      if (platform.indexOf('Andriod') > 0) {

        // Andriod
        this.platform = 1;
      }
    }
  };

  window._tc_bridge_public.init();

  window._tc_bridge_user = {
    /**
     * @description 用户登录模块
     * @returns {*}
     */
    user_login: function () {
      return window._tc_ntv_user.user_login();
    },

    user_register: function () {
      return window._tc_ntv_user.user_register();
    }
  };

  window._tc_bridge_bar = {
    /**
     * @description 根据传递的参数设置导航栏
     * @param jsonStr
     */
    set_navbar: function (jsonStr) {
      jsonStr = jsonStr || '';

      if (window._tc_bridge_public.NaEptStr(jsonStr)) {
        jsonStr = window._tc_bridge_public.stringifyAndEncode(jsonStr);

        return window._tc_ntv_bar.set_navbar(jsonStr);
      }
      throw '设置导航栏时的参数信息不能为空';
    },

    /**
     * @description 设置导航栏是否隐藏
     * @param isHidden
     */
    set_navbar_hidden: function (isHidden) {
      return window._tc_ntv_bar.set_navbar_hidden(isHidden);
    },

    /**
     * @description 设置工具栏是否隐藏
     * @param isHidden
     */
    set_toolbar_hidden: function (isHidden) {
      return window._tc_ntv_bar.set_toolbar_hidden(isHidden);
    },

    /**
     * @description app分享h5页面内容
     * @param jsonStr
     * @returns {*}
     */
    shareInfoFromH5: function (jsonStr) {
      jsonStr = jsonStr || '';

      if (window._tc_bridge_public.NaEptStr(jsonStr)) {
        jsonStr = window._tc_bridge_public.stringifyAndEncode(jsonStr);

        return window._tc_ntv_bar.shareInfoFromH5(jsonStr);
      }
      throw '分享信息不能为空!';
    }
  };

  window._tc_bridge_util = {
    /**
     * @description h5调app返回首页
     * @returns {*}
     */
    back_to_home: function () {
      return window._tc_ntv_util.back_to_home();
    },

    /**
     * @description h5调app返回上一页
     * @param cbStr {String} 回调参数,告诉上一页需要做什么
     * @param isDelH5Page {Bool} 是否直接删除h5页面
     * @returns {*}
     */
    back_to_last_page: function (cbStr, isDelH5Page) {
      var paramObj = {},
        jsonStr;

      cbStr = cbStr || '';

      if (window._tc_bridge_public.NaEptStr(cbStr)) {
        paramObj.callbackStr = cbStr;
        paramObj.isDeleteH5Page = isDelH5Page;
        jsonStr = window._tc_bridge_public.stringifyAndEncode(paramObj);

        return window._tc_ntv_util.back_to_last_page(jsonStr);
      }
    },

    /**
     * @description h5调app拨打电话
     * @param phoneNum {String} 需要拨打的电话号码
     * @returns {*}
     */
    call_phone: function (phoneNum) {
      phoneNum = phoneNum || '4007777777';

      if (window._tc_bridge_public.NaEptStr(phoneNum)) {
        phoneNum = window._tc_bridge_public.stringifyAndEncode(phoneNum);

        return window._tc_ntv_util.call_phone(phoneNum);
      }
      throw '没有需要拨打的号码';
    },

    /**
     * @description h5调app检查是否安装app
     * @param openUrl {String} 给iOS传的参数
     * @param pkgName {String} 给Andriod传的参数
     * @returns {*}
     */
    check_app_install_status: function (openUrl, pkgName) {
      openUrl = openUrl || '';
      pkgName = pkgName || '';

      if (window._tc_bridge_public.platform === 0 && window._tc_bridge_public.NaEptStr(openUrl)) {
        openUrl = window._tc_bridge_public.stringifyAndEncode(openUrl);

        return window._tc_ntv_util.check_app_install_status(openUrl);
      }

      if (window._tc_bridge_public.platform === 1 && window._tc_bridge_public.NaEptStr(pkgName)) {
        pkgName = window._tc_bridge_public.stringifyAndEncode(pkgName);

        return window._tc_ntv_util.check_app_install_status(pkgName);
      }
    },

    /**
     * @description h5调app检查网络状态: 是否有网络,网络类型等.
     * @returns {*}
     */
    check_network_status: function () {
      return window._tc_ntv_util.check_network_status();
    },

    /**
     * @description 复制文字到剪贴板
     * @param cpyStr 需要复制到剪贴板的文字
     * @returns {*}
     */
    copy_string_to_clipboard: function (cpyStr) {
      cpyStr = cpyStr || '';

      if (window._tc_bridge_public.NaEptStr(cpyStr)) {
        cpyStr = window._tc_bridge_public.stringifyAndEncode(cpyStr);

        return window._tc_ntv_util.copy_string_to_clipboard(cpyStr);
      }
      throw '没有可复制到剪贴板的内容';
    },

    /**
     * @description h5调app下载数据
     * @param url {String} 需要下载的数据所在url
     * @param suffix {String} 保存的文件后缀
     * @param isIgnoreHttpsCertification {String} 是否忽略非法的HTTPS证书
     * @returns {*}
     */
    download_data: function (url, suffix, isIgnoreHttpsCertification) {
      var jsonStr,
        jsonObj = {};

      url = url || '';
      suffix = suffix || '';
      isIgnoreHttpsCertification = isIgnoreHttpsCertification || '';

      if (window._tc_bridge_public.NaEptStr(url) && window._tc_bridge_public.NaEptStr(suffix)) {
        jsonObj.url = url;
        jsonObj.suffix = suffix;
        jsonObj.isIgnoreHttpsCertification = isIgnoreHttpsCertification;
        jsonStr = window._tc_bridge_public.stringifyAndEncode(jsonObj);

        return window._tc_ntv_util.download_data(jsonStr);
      }
    },

    /**
     * @description h5写日志到app
     * @param log {String} 需要写入的内容
     * @param result {String} 上一句log执行的结果
     * @returns {*|number|string}
     */
    log: function (log, result) {
      var jsonStr,
        jsonObj = {};

      log = log || '';
      result = result || '';

      if (window._tc_bridge_public.NaEptStr(log)) {
        jsonObj.log = log;
        jsonObj.result = result;
        jsonStr = window._tc_bridge_public.stringifyAndEncode(jsonObj);

        return window._tc_ntv_util.log(jsonStr);
      }
    },

    /**
     * @description 从剪贴板读取复制的文字
     * @returns {*}
     */
    read_copied_string_from_clipboard: function () {
      return window._tc_ntv_util.read_copied_string_from_clipboard();
    }
  };

  window._tc_bridge_encrypt = {
    /**
     * @description base64 UTF8编码
     * @param toEncodeStr {String} 需要做base64 encode的字符串
     * @returns {*}
     */
    base64_encode: function (toEncodeStr) {
      toEncodeStr = toEncodeStr || '';

      if (window._tc_bridge_public.NaEptStr(toEncodeStr)) {
        toEncodeStr = window._tc_bridge_public.stringifyAndEncode(toEncodeStr);

        return window._tc_ntv_encrypt.base64_encode(toEncodeStr);
      }
    },

    /**
     * @description MD5 哈希算法
     * @param inStr {String} 需要做MD5 hash的字符串
     * @returns {*}
     */
    md5_hash: function (inStr) {
      inStr = inStr || '';

      if (window._tc_bridge_public.NaEptStr(inStr)) {
        inStr = window._tc_bridge_public.stringifyAndEncode(inStr);

        return window._tc_ntv_encrypt.md5_hash(inStr);
      }
    }
  };

  window._tc_bridge_file = {
    /**
     * @description h5调app检查文件是否存在
     * @param fileName {String} 需要检查的文件名
     * @param relativeFilePath {String} 需要检查的文件的相对路径
     * @returns {*}
     */
    check_file_exist: function (fileName, relativeFilePath) {
      var jsonStr,
        jsonObj = {};

      fileName = fileName || '';
      relativeFilePath = relativeFilePath || '';

      if (window._tc_bridge_public.NaEptStr(fileName) || window._tc_bridge_public.NaEptStr(relativeFilePath)) {
        jsonObj.filename = fileName;
        jsonObj.relativeFilePath = relativeFilePath;
        jsonStr = window._tc_bridge_public.stringifyAndEncode(jsonObj);

        return window._tc_ntv_file.check_file_exist(jsonStr);
      }
    },

    /**
     * @description h5调app删除文件
     * @param fileName {String} 需要删除的文件名
     * @param relativeFilePath {String} 需要删除的文件的相对路径
     * @returns {*}
     */
    delete_file: function (fileName, relativeFilePath){
      var jsonStr,
        jsonObj = {};

      fileName = fileName || '';
      relativeFilePath = relativeFilePath || '';

      if (window._tc_bridge_public.NaEptStr(fileName) || window._tc_bridge_public.NaEptStr(relativeFilePath)) {
        jsonObj.filename = fileName;
        jsonObj.relativeFilePath = relativeFilePath;
        jsonStr = window._tc_bridge_public.stringifyAndEncode(jsonObj);

        return window._tc_ntv_file.delete_file(jsonStr);
      }
    },

    /**
     * @description h5调app获取当前sandbox的名称
     * @returns {*}
     */
    get_current_sandbox_name: function () {
      return window._tc_ntv_file.get_current_sandbox_name();
    },

    /**
     * @description h5调app创建文件夹
     * @param dirName {String} 需要创建的文件夹路径
     * @param relativeDirPath {String} 需要创建的文件夹相对路径
     * @returns {*}
     */
    make_dir: function (dirName, relativeDirPath) {
      var jsonStr,
        jsonObj = {};

      dirName = dirName || '';
      relativeDirPath = relativeDirPath || '';

      if (window._tc_bridge_public.NaEptStr(dirName) || window._tc_bridge_public.NaEptStr(relativeDirPath)) {
        jsonObj.filename = dirName;
        jsonObj.relativeFilePath = relativeDirPath;
        jsonStr = window._tc_bridge_public.stringifyAndEncode(jsonObj);

        return window._tc_ntv_file.make_dir(jsonStr);
      }
    },

    /**
     * @description h5调app读取文件大小
     * @param fileName {String} 需要读取的文件名
     * @param relativeFilePath {String} 需要读取的文件的相对路径
     * @returns {*}
     */
    get_file_size: function (fileName, relativeFilePath) {
      var jsonStr,
        jsonObj = {};

      fileName = fileName || '';
      relativeFilePath = relativeFilePath || '';

      if (window._tc_bridge_public.NaEptStr(fileName) || window._tc_bridge_public.NaEptStr(relativeFilePath)) {
        jsonObj.filename = fileName;
        jsonObj.relativeFilePath = relativeFilePath;
        jsonStr = window._tc_bridge_public.stringifyAndEncode(jsonObj);

        return window._tc_ntv_file.get_file_size(jsonStr);
      }
    },

    /**
     * @description h5调app从文件读取内容
     * @param fileName {String} 需要读取的文件名
     * @param relativeFilePath {String} 需要读取的文件的相对路径
     * @returns {*}
     */
    read_text_from_file: function (fileName, relativeFilePath) {
      var jsonStr,
        jsonObj = {};

      fileName = fileName || '';
      relativeFilePath = relativeFilePath || '';

      if (window._tc_bridge_public.NaEptStr(fileName) || window._tc_bridge_public.NaEptStr(relativeFilePath)) {
        jsonObj.filename = fileName;
        jsonObj.relativeFilePath = relativeFilePath;
        jsonStr = window._tc_bridge_public.stringifyAndEncode(jsonObj);

        return window._tc_ntv_file.read_text_from_file(jsonStr);
      }
    },

    /**
     * @description h5调app向文件写入内容
     * @param text {String} 需要写入的内容
     * @param fileName {String} 写入的目标文件名
     * @param relativeFilePath {String} 需要写入的文件的相对路径
     * @param isAppend {Boolean} 是否将当前文件append到已有文件
     * @returns {*}
     */
    write_text_to_file: function (text, fileName, relativeFilePath, isAppend) {
      var jsonStr,
        jsonObj = {};

      text = text || '';
      fileName = fileName || '';
      relativeFilePath = relativeFilePath || '';

      if (window._tc_bridge_public.NaEptStr(text) && (window._tc_bridge_public.NaEptStr(fileName) || window._tc_bridge_public.NaEptStr(relativeFilePath))) {
        jsonObj.text = text;
        jsonObj.fileName = fileName;
        jsonObj.relativeFilePath = relativeFilePath;
        jsonObj.isAppend = isAppend;
        jsonStr = window._tc_bridge_public.stringifyAndEncode(jsonObj);

        return window._tc_ntv_file.write_text_to_file(jsonStr);
      }
    }
  };
});
