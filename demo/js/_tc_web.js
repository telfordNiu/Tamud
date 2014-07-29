define(["jquery", "temp"], function ($, temp) {
  window._tc_web_user = {
    after_user_login: function (paramObj) {
      var key,
        target = $('#userinfo'),
        tempStr,
        userInfoObj = {},
        userInfoArray = [];

      if (paramObj.memberId) {
        window._tc_bridge_public.isLogin = true;
      }

      if (window._tc_bridge_public.isLogin) {
        $('#reminder').hide();
        $('#userinfo').show();
      }

      if (window._tc_bridge_public.NaEptObj(paramObj)) {

        for (key in paramObj) {
          if (paramObj.hasOwnProperty(key) && (key === 'loginName' || key === 'mobile' || key === 'email' || key === 'score')) {
            userInfoObj.type = key;
            userInfoObj.info = paramObj[key];
            userInfoArray.push(userInfoObj);
          }
        }

        tempStr = temp(userInfoArray, 'userInfoTemp').str;
        target.find('.userDetail').remove();
        target.append(tempStr);
      }
    }
  };

  window._tc_web_bar = {
    set_navbar: function (paramObj) {
      if (window._tc_bridge_public.NaEptObj(paramObj)) {
        window._tc_bridge_public.isNavbarHidden = paramObj.isNavbarHidden;
      }
    },

    tag_click_share: function () {
      var tcshareurl = $('[name=tcshareurl]').val() || '',
        tcshareimg = $('[name=tcshareimg]').val() || '',
        tcsharetxt = $('[name=tcsharetxt]').val() || '',
        jsonObj = {
          tcshareurl: tcshareurl,
          tcshareimg: tcshareimg,
          tcsharetxt: tcsharetxt
        };
//      var jsonObj = {
//          tcshareurl: 'http://www.guhaodi.com',
//          tcshareimg: '/i/a.img',
//          tcsharetxt: 'hello world'
//        },

      if (window._tc_bridge_public.NaEptObj(jsonObj)) {
        window._tc_bridge_bar.shareInfoFromH5(jsonObj);
      }
    }
  };

  window._tc_web_util = {
    web_view_did_appear: function (cbStr) {

    },

    check_app_install_status: function (paramObj) {
      if (paramObj.isInstalledApp) {
        alert('用户已安装app');
      } else {
        alert('用户未安装app');
      }
    },

    check_network_status: function (paramObj) {
      if (paramObj.hasNetwork) {
        alert('用户当前的网络类型:' + paramObj.networkType);
      } else {
        alert('当前没有网络');
      }
    },

    download_data: function (paramObj) {
      if (window._tc_bridge_public.NaEptObj(paramObj)) {
        if (paramObj.error_code) {
          alert(paramObj.error_code);

          return;
        }

        alert('下载完成!文件保存在:' + paramObj.savedPath);

      }
    },

    read_copied_string_from_clipboard: function (paramObj) {
      if (window._tc_bridge_public.NaEptObj(paramObj)) {
        var cpyString = paramObj.cpyString;

        if (window._tc_bridge_public.NaEptStr(cpyString)) {
          alert(cpyString);
        }
      }
    }

  };

  window._tc_web_encrypt = {
    base64_encode: function (paramObj) {
      if (window._tc_bridge_public.NaEptObj(paramObj)) {
        var inString = paramObj.inString || '',
          encodedString = paramObj.encodedString || '';

        if (window._tc_bridge_public.NaEptStr(inString) && window._tc_bridge_public.NaEptStr(encodedString)) {
          alert('base64加密前字符串:' + inString + '<br />' + '加密后字符串:' + encodedString);
        }
      }
    },

    md5_hash: function (paramObj) {
      if (window._tc_bridge_public.NaEptObj(paramObj)) {
        var inString = paramObj.inString || '',
          outString = paramObj.outString || '';

        if (window._tc_bridge_public.NaEptStr(inString) && window._tc_bridge_public.NaEptStr(outString)) {
          alert('MD5 哈希加密前字符串:' + inString + '<br />' + '加密后字符串:' + outString);
        }
      }
    }
  };

  window._tc_web_file = {
    check_file_exist: function (paramObj) {
      if (window._tc_bridge_public.NaEptObj(paramObj)) {
        if (paramObj.isExist) {
          alert('该文件存在!');
        }
      }
    },

    delete_file: function (paramObj) {
      if (window._tc_bridge_public.NaEptObj(paramObj)) {
        if (paramObj.isSuccess) {
          alert('删除成功!');
        }
      }
    },

    get_current_sandbox_name: function (paramObj) {
      if (window._tc_bridge_public.NaEptObj(paramObj)) {
        if (paramObj.sandboxName) {
          alert('sandbox的名字是:' + paramObj.sanboxName);
        }
      }
    },

    make_dir: function (paramObj) {
      if (window._tc_bridge_public.NaEptObj(paramObj)) {
        if (paramObj.isSuccess) {
          alert('创建文件夹成功!');
        }
      }
    },

    write_text_to_file: function (paramObj) {
      if (window._tc_bridge_public.NaEptObj(paramObj)) {
        if (paramObj.isSuccess) {
          alert('向文件写入内容成功');
        }
      }
    },

    read_text_from_file: function (paramObj) {
      if (window._tc_bridge_public.NaEptObj(paramObj)) {
        if (paramObj.text) {
          alert('文件内容:' + paramObj.text);
        }
      }
    },

    get_file_size: function (paramObj) {
      if (window._tc_bridge_public.NaEptObj(paramObj)) {
        if (paramObj.fileSize) {
          alert('文件大小为:' + paramObj.fileSize);
        }
      }
    }
  };
});