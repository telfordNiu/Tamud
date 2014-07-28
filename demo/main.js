require.config({
  baseUrl: "js/",
  paths: {
    "jquery": "jquery-2.1.1",
    "underscore": "underscore-min"
  }
});

require(["jquery", "json2", "bridge", "_tc_web"], function ($) {
  var navbarJSON = {
      center: [{tagname: "title", value: "同程无线"}],
      right: [{tagname: "tag_click_share", value: "分享"}]
    },
    phoneNum = '13812628849',
    cpyTxt = '复制成功',
    cbStr = '{"info":"返回上一个页面成功"}',
    openUrl = 'http://www.baidu.com',
    pkgName = '';
//  var cbPlugin = '_tc_web_user',
//    cbAction = 'after_user_login';
//  var param = {memberId:1,username:"水来风去",email:"tamud82@gmail.com",loginName:"tamud",mobile:"15298351675",score:"100"};
//  window[cbPlugin][cbAction](param);

//  var cbPlugin = '_tc_web_bar',
//    cbAction = 'tag_click_share';
//
//  window[cbPlugin][cbAction]();

  if (window._tc_ntv_bar) {
    window._tc_bridge_bar.set_navbar(navbarJSON);
  }

  $(document).on('click', '#hidenav', function () {
    window._tc_bridge_bar.set_navbar_hidden(true);
  }).on('click', '#hidetool', function () {
    window._tc_bridge_bar.set_toolbar_hidden(true);
  }).on('click', '#hasapp', function () {
    window._tc_bridge_util.check_app_install_status(openUrl, pkgName);
  }).on('click', '#hasnetwork', function () {
    window._tc_bridge_util.check_network_status();
  }).on('click', '#backtoindex', function () {
    window._tc_bridge_util.back_to_home();
  }).on('click', '#backtolast', function () {
    window._tc_bridge_util.back_to_last_page(cbStr, false);
  }).on('click', '#call', function () {
    window._tc_bridge_util.call_phone(phoneNum);
  }).on('click', '#cpytoclipboard', function () {
    window._tc_bridge_util.copy_string_to_clipboard(cpyTxt);
  }).on('click', '#loginBtn', function () {
    window._tc_bridge_user.user_login();
  }).on('click', '#download', function () {
    window._tc_bridge_util.download_data('http://www.guhaodi.com/img/bazinga.jpg', 'jpg');
  }).on('click', '#checkfileexist', function () {
    window._tc_bridge_file.check_file_exist('demo.txt', null);
  }).on('click', '#deletefile', function () {
    window._tc_bridge_file.delete_file('demo.txt', null);
  }).on('click', '#getcurrentsandbox', function () {
    window._tc_bridge_file.get_current_sandbox_name();
  }).on('click', '#mkdir', function () {
    window._tc_bridge_file.make_dir('demoDir', null);
  }).on('click', '#getfilesize', function () {
    window._tc_bridge_file.get_file_size('demo.txt', null);
  }).on('click', '#getfilecont', function () {
    window._tc_bridge_file.read_text_from_file('demo.txt', null);
  }).on('click', '#writetofile', function () {
    window._tc_bridge_file.write_text_to_file('Hello World!', 'demo.txt', null, false);
  }).on('click', '#base64', function () {
    window._tc_bridge_encrypt.base64_encode('http://www.guhaodi.com');
  }).on('click', '#md5', function () {
    window._tc_bridge_encrypt.md5_hash('http://www.guhaodi.com');
  });
});