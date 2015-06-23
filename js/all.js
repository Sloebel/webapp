(function() {
    "use strict";

    //window.addEventListener("DOMContentLoaded", checkNotifications, false);
    //--supports IE8--



    document.onreadystatechange = function () {

      if (document.readyState === "interactive") {
        checkNotifications();
          var hash = window.location.hash;
          checkCurrentTab(hash);

          window.location.hash = "";
          dontScroll(hash);
      }
        if (document.readyState === "complete") {
            document.body.scrollTop = 0;
        }
    };

    function checkCurrentTab(hash) {
      if (hash) {
        var target = document.querySelector(".tabs a[href='"+ hash + "']");
        UTILS.addClass(target, "active");

      }
    }
    function checkNotifications() {
      var p = document.querySelector(".notifications p");

      UTILS.ajax("data/config.json", {
        done: function(json) {
          p.textContent = json.notification;
        }
      });
    }


    var menuItems = document.querySelectorAll(".menu-caption");

    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].addEventListener("focus", function(e) {
        get_nextsibling(getEventTarget(e)).classList.add("focused");
      }, true);
      menuItems[i].addEventListener("blur", function(e) {
        get_nextsibling(getEventTarget(e)).classList.remove("focused");
      }, true);
    }


    var subMenuItem = document.querySelectorAll(".action-list a");

    for (var j = 0; j < subMenuItem.length; j++) {
      subMenuItem[j].addEventListener("focus", function(e) {
        getEventTarget(e).parentNode.parentNode.classList.add("focused");
        get_previoussibling(getEventTarget(e).parentNode.parentNode).classList.add("focused");
      }, false);


      subMenuItem[j].addEventListener("blur", function(e) {
        getEventTarget(e).parentNode.parentNode.classList.remove("focused");
        get_previoussibling(getEventTarget(e).parentNode.parentNode).classList.remove("focused");
      }, false);
    }

    function getEventTarget(e) {
      e = e || window.event;
      return e.target || e.srcElement;
    }
    function get_nextsibling(n) {
      var x = n.nextSibling;
      while (x.nodeType!==1) {
        x = x.nextSibling;
      }
      return x;
    }
    function get_previoussibling(n) {
      var x = n.previousSibling;
      while (x.nodeType!==1){
      x = x.previousSibling;
      }
    return x;
    }

    /*-- form handling --*/

    //var tempData = [];
    //var formHandler  = {
        //init : function(){
        //
        //    var tabs = UTILS.qsa('.dynamicTab');
        //
        //    for (var i = 0; i < tabs.length; i++) {
        //        //formHandler.initSubmit(tabs[i]);
        //        //formHandler.initChangeUrl(tabs[i]);
        //        //formHandler.initFormBehavior(tabs[i]);
        //        //formHandler.initStorage(tabs[i]);
        //    }
        //
        //},
        //initSubmit: function(tabEl){
        //    var submitButtons = tabEl.querySelector('button[type="submit"]');
        //    //UTILS.addEvent(submitButtons, "click", submit);
        //    //function submit(e) {
        //    //    e.preventDefault();
        //    //    //var target = getEventTarget(e);
        //    //    var tabId = tabEl.id;
        //    //    tabId = '#' + tabId;
        //    //
        //    //    var reportsNames = UTILS.qsa(tabId + ' input[name="siteName"]');
        //    //    var reportsUrls = UTILS.qsa(tabId + ' input[name="siteUrl"]');
        //    //    var selectUrl = UTILS.qs(tabId + ' .url-holder');
        //    //    var expandLink = UTILS.qs(tabId + ' .expand-btn');
        //    //
        //    //    while (selectUrl.hasChildNodes()) {
        //    //        selectUrl.removeChild(selectUrl.firstChild);
        //    //    }
        //    //    tempData = [];
        //    //    for (var i = 0; i < reportsNames.length; i++) {
        //    //
        //    //        if ((reportsNames[i].value != "" && reportsUrls[i].value === "") || (reportsNames[i].value === "" && reportsUrls[i].value != "")) {
        //    //            reportsNames[i].value != "" ? reportsUrls[i].focus() : reportsNames[i].focus();
        //    //            reportsUrls[i].placeholder = "Please enter URL..";
        //    //            return;
        //    //
        //    //        }   else if (reportsNames[i].value != "" && reportsUrls[i] != "") {
        //    //            tempData.push({
        //    //                name: reportsNames[i].value,
        //    //                url: reportsUrls[i].value
        //    //            });
        //    //
        //    //            var option = create("option");
        //    //            option.textContent = reportsNames[i].value;
        //    //            option.value = reportsUrls[i].value;
        //    //            append(selectUrl, option);
        //    //        }
        //    //    }
        //    //    if (tempData.length == 0) {
        //    //        UTILS.addClass(selectUrl, 'hidden');
        //    //        UTILS.addClass(expandLink, 'hidden');
        //    //        formHandler.changeUrl(tabId, '');
        //    //        localStorage.removeItem(tabEl.id);
        //    //        return;
        //    //    }
        //    //    localStorage.setItem(tabEl.id, JSON.stringify(tempData));
        //    //    UTILS.removeClass(selectUrl, 'hidden');
        //    //    UTILS.removeClass(expandLink, 'hidden');
        //    //    formHandler.changeUrl(tabId, tempData[0].url);
        //    //    formHandler.toggleForm(tabEl);
        //    //
        //    //}
        //
        //},
        //initChangeUrl: function(tabEl) {
        //    var urlSelect = tabEl.querySelector(".url-holder");
        //    UTILS.addEvent(urlSelect,'change', function(e) {
        //        var tabId = tabEl.id;
        //        tabId = '#' + tabId;
        //        var target = getEventTarget(e);
        //        formHandler.changeUrl(tabId, target.value);
        //
        //    });
        //
        //},
        //initFormBehavior: function(tabEl) {
        //
        //    var toggleBtn = tabEl.querySelectorAll(".js-toggle-form");
        //
        //    for (var i = 0; i < toggleBtn.length; i++) {
        //        UTILS.addEvent(toggleBtn[i], "click", function(e) {
        //            e.preventDefault();
        //            formHandler.toggleForm(tabEl);
        //        });
        //    }
        //
        //    var settingForm = tabEl.querySelector(".setting-url");
        //    UTILS.addEvent(settingForm, "keyup", function(e) {
        //        e.preventDefault();
        //
        //        if (e.keyCode == 27) {
        //            formHandler.toggleForm(tabEl);
        //            getEventTarget(e).blur();
        //        }
        //
        //    });
        //
        //},
        //initStorage: function(tabEl) {
        //    var key = tabEl.id;
        //    var tabId = '#' + key;
        //
        //    tempData = storageHandler.read(key);
        //
        //    if (tempData) {
        //        var reportsNames = tabEl.querySelectorAll('input[name="siteName"]');
        //        var reportsUrls = tabEl.querySelectorAll('input[name="siteUrl"]');
        //        var selectUrl = UTILS.qs(tabId + ' .url-holder');
        //        var expandLink = UTILS.qs(tabId + ' .expand-btn');
        //
        //        var len = tempData.length;
        //        for (var i = 0; i < len; i++) {
        //            console.log(reportsNames[i]);
        //            reportsNames[i].value = tempData[i].name;
        //            reportsUrls[i].value = tempData[i].url;
        //
        //            var option = create("option");
        //            option.textContent = tempData[i].name;
        //            option.value = tempData[i].url;
        //            append(selectUrl, option);
        //        }
        //        UTILS.removeClass(selectUrl, 'hidden');
        //        UTILS.removeClass(expandLink, 'hidden');
        //        formHandler.changeUrl(tabId, reportsUrls[0].value);
        //        formHandler.toggleForm(tabEl);
        //
        //    }
        //
        //},
        //changeUrl: function(tabId, url) {
        //    var frame = UTILS.qs(tabId + " iframe");
        //    var expandLink = UTILS.qs(tabId + " .expand-btn");
        //
        //    frame.src = url;
        //    expandLink.href =  url;
        //},
    //    toggleForm: function(tabEl) {
    //        var settingWheel = tabEl.querySelector(".setting-btn");
    //        var settingForm = tabEl.querySelector(".setting-url");
    //
    //        if (settingWheel.className.indexOf("setting-btn-rotate") == -1) {
    //            UTILS.addClass(settingWheel, "setting-btn-rotate");
    //        } else {
    //            UTILS.removeClass(settingWheel, "setting-btn-rotate");
    //        }
    //
    //        if (settingForm.className.indexOf("visible-form") == -1) {
    //            UTILS.addClass(settingForm, "visible-form");
    //            settingForm.querySelector("input").focus();
    //        } else {
    //            UTILS.removeClass(settingForm, "visible-form");
    //        }
    //    }
    //}





    function create(tagName) {
      return document.createElement(tagName);
    }
    function append(parent, child) {
      parent.appendChild(child);
    }


    //var event = new Event('change');
    //
    //urlSelects.dispatchEvent(event);


    /* --  navigation Tab  --***/
    var tabSelect = document.querySelector(".tabs ul");
    var tabsBtn = document.querySelectorAll(".tabs ul a");

    UTILS.addEvent(tabSelect, "click", function(e) {
        e.preventDefault();
        var target = getEventTarget(e);
        if (target.hasAttribute("href")) {
            dontScroll(target.getAttribute("href"));
            UTILS.addClass(target, "active");

            for (var i = 0; i < tabsBtn.length; i++) {
                if (tabsBtn[i] !== target && tabsBtn[i].hasAttribute("class")){
                UTILS.removeClass(tabsBtn[i], "active");
                }
            }

        }
    });


    function dontScroll(hash) {
      var yScroll= document.body.scrollTop;
      window.location.hash = hash;
      document.body.scrollTop = yScroll;

    }
    //
    //UTILS.addEvent(window, "hashchange", onHashChange);
    //
    //function onHashChange(e) {
    //
    //  window.location.hash = hash;
    //}

    //var toggleForm = function (tabEl) {
    //    //e.preventDefault();
    //    //var target = getEventTarget(e);
    //    var settingWheel = tabEl.querySelector(".setting-btn");
    //    var settingForm = tabEl.querySelector(".setting-url");
    //
    //    if (settingWheel.className.indexOf("setting-btn-rotate") == -1) {
    //    UTILS.addClass(settingWheel, "setting-btn-rotate");
    //    } else {
    //    UTILS.removeClass(settingWheel, "setting-btn-rotate");
    //    }
    //
    //    if (settingForm.className.indexOf("visible-form") == -1) {
    //    UTILS.addClass(settingForm, "visible-form");
    //    settingForm.querySelector("input").focus();
    //    } else {
    //    UTILS.removeClass(settingForm, "visible-form");
    //    }
    //
    //}

    function DynamicTabHandler(tab){

        this._urls = {};  // {"ynet": "http://adasd"} /
                          // this._urls["ynet"]

        this._tabId = tab.id;

        dynamicFormHandler.init(tab);
    }

    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    var dynamicFormHandler = (function(){

        function init(container){
            var submitButtons = container.querySelector("button[type='submit']");
            var that = this;
            UTILS.addEvent(submitButtons, "click",function(e){
                _onSubmit.call(that, container, e);

            } );

            _formOnload.call(this,container);
            _formBehaviorControl(container);
            _initChangeUrl(container);

        }

        function _formOnload (container) {
            this._urls = storageHandler.read(container.id);

            if (this._urls) {
                //fill the form,the select list and the expand btn  with the relevant content

                var reportsNames = container.querySelectorAll("input[name='siteName']");
                var reportsUrls = container.querySelectorAll("input[name='siteUrl']");
                var selectUrl = container.querySelector(".url-holder");
                var expandLink = container.querySelector(".expand-btn");

                var keys = Object.keys(this._urls);

                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    reportsNames[i].value = key;
                    reportsUrls[i].value = this._urls[key];

                    var option = create("option");
                    option.textContent = key;
                    option.value = this._urls[key];
                    append(selectUrl, option);
                }
                UTILS.removeClass(selectUrl, 'hidden');
                UTILS.removeClass(expandLink, 'hidden');
                var tabId = "#" + container.id;
                _changeIframeSrc(tabId, this._urls[keys[0]]);
                _toggleForm(container);
            } else {
                this._urls = {};
            }
        }
        function _onSubmit(container, e) {

            e.preventDefault();

            var tabId = "#" + container.id;

            var sitesNames = UTILS.qsa(tabId + " input[name='siteName']");
            var sitesUrls = UTILS.qsa(tabId + " input[name='siteUrl']");
            var selectUrl = UTILS.qs(tabId + " .url-holder");
            var expandLink = UTILS.qs(tabId + " .expand-btn");
            var allFormInputs = UTILS.qsa(tabId + " input");




            while (selectUrl.hasChildNodes()) {
                selectUrl.removeChild(selectUrl.firstChild);
            }

            // validation if form is empty :
            if (_isFormEmpty(allFormInputs)) {
                //delete selectUrl list and hide it

                UTILS.addClass(selectUrl, "hidden");
                UTILS.addClass(expandLink, "hidden");
                _changeIframeSrc(tabId, "");
                this._urls = {};
                storageHandler.remove(container.id);
                return;
            } else { //do form validation
            }

            //check if there is local storage
            this._urls = storageHandler.read(container.id);

            if (this._urls) {//if key doesn't match the site name from the form then delete it
                var keys = Object.keys(this._urls);

                for (var i = 0; i < keys.length; i++) {
                    for (var j = 0; j < sitesNames.length; j++) {
                        if (keys[i] !== sitesNames[j]) {
                            delete this._urls[keys[i]];
                        }
                    }
                }
            } else {
                this._urls = {};
            }

            for (var i = 0; i < sitesNames.length; i++) {

                if ((sitesNames[i].value !== "" && sitesNames[i].value === "") || (sitesNames[i].value === "" && sitesUrls[i].value !== "")) {
                    sitesNames[i].value !== "" ? sitesUrls[i].focus() : sitesNames[i].focus();
                    sitesUrls[i].placeholder = "Please enter URL..";
                    return;

                }   else if (sitesNames[i].value !== "" && sitesUrls[i].value !== "") {
                    //write form fields into this._urls
                        this._urls[sitesNames[i].value] =  sitesUrls[i].value;

                        var option = create("option");
                        option.textContent = sitesNames[i].value;
                        option.value = sitesUrls[i].value;
                        append(selectUrl, option);
                }
            }
            //if the iframe src is equal to first url option then don't reload the iframe
            var keys = Object.keys(this._urls);
            if (expandLink.href !== this._urls[keys[0]] + "/") {
                console.log(expandLink.href);
                console.log(this._urls[keys[0]]);
                _changeIframeSrc(tabId, this._urls[keys[0]]);
            }
            //write this._urls to localStorage
            storageHandler.write(container.id, this._urls);

            //show select list and expand btn
            UTILS.removeClass(selectUrl, "hidden");
            UTILS.removeClass(expandLink, "hidden");

            //hide the form
            _toggleForm(container);

        }
        function _formBehaviorControl(container) {

            var toggleBtn = container.querySelectorAll(".js-toggle-form");

            for (var i = 0; i < toggleBtn.length; i++) {
                UTILS.addEvent(toggleBtn[i], "click", function(e) {
                    e.preventDefault();
                    _toggleForm(container);
                });
            }

            var settingForm = container.querySelector(".setting-url");
            UTILS.addEvent(settingForm, "keyup", function(e) {
                e.preventDefault();

                if (e.keyCode === 27) {
                    _toggleForm(container);
                    getEventTarget(e).blur();
                }

            });

        }
        function _isFormEmpty(allFormInputs) {
            for (var i = 0; i < allFormInputs.length; i++) {
                var value = allFormInputs[i].value;

                if (value !== "") {
                    return false;
                }
            }

            return true;
        }
        function _initChangeUrl(container) {
            var urlSelect = container.querySelector(".url-holder");
            UTILS.addEvent(urlSelect,"change", function(e) {
                var tabId = "#" + container.id;

                var target = getEventTarget(e);
                _changeIframeSrc(tabId, target.value);

            });

        }
        function _changeIframeSrc(tabId, url) {
            var frame = UTILS.qs(tabId + " iframe");
            var expandLink = UTILS.qs(tabId + " .expand-btn");

            frame.src = url;
            expandLink.href =  url;
        }
        function _toggleForm(tabEl) {
            var settingWheel = tabEl.querySelector(".setting-btn");
            var settingForm = tabEl.querySelector(".setting-url");

            if (settingWheel.className.indexOf("setting-btn-rotate") === -1) {
                UTILS.addClass(settingWheel, "setting-btn-rotate");
            } else {
                UTILS.removeClass(settingWheel, "setting-btn-rotate");
            }

            if (settingForm.className.indexOf("visible-form") === -1) {
                UTILS.addClass(settingForm, "visible-form");
                settingForm.querySelector("input").focus();
            } else {
                UTILS.removeClass(settingForm, "visible-form");
            }
        }
        return {
            init: init
        };
    })();


    //----------------------------------------------------------------------
    //----------------------------------------------------------------------

    var storageHandler = (function(){

        function read(key){
            return JSON.parse(localStorage.getItem(key));
        }

        function write(key, data){
            return localStorage.setItem(key, JSON.stringify(data));
        }
        function remove(key) {
            return localStorage.removeItem(key);
        }

        return{
            read: read,
            write: write,
            remove: remove
        };
    })();

    //----------------------------------------------------------------------
    //----------------------------------------------------------------------


    var app = (function(){

        var _dynamicTabHandlers = [];

        function init(tabSelector){
            var tabs = UTILS.qsa(tabSelector);

            for (var i = 0; i < tabs.length; i++){
                _dynamicTabHandlers.push(new DynamicTabHandler(tabs[i]));
            }
        }

        return {
            init: init
        };
    })();

    app.init(".dynamicTab");


    //formHandler.init();
    console.log("lets get started");
})();;// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

var UTILS = (function () {

    return {
        /**
         * Check if a given value is a plain Object
         *
         * @param  {*}       o Any value to be checked
         * @return {Boolean}   true if it's an Object
         */
        isObject: function (o) {
            var toString = Object.prototype.toString;
            return (toString.call(o) === toString.call({}));
        },

        /**
         * AJAX helper function (similar to jQuery, but far from it!)
         *
         * @param {string} url     URL for the ajax request
         * @param {Object} options AJAX settings
         */
        ajax: function (url, options) {
            var xhr = new XMLHttpRequest(),
                method = 'GET',
                options = UTILS.isObject(options) ? options : {};

            // Check if "method" was supplied
            if (options.method) {
                method = options.method;
            }

            // Setup the request
            xhr.open(method.toUpperCase(), url);

            xhr.onreadystatechange = function () {
                var status;

                // If request finished
                if (xhr.readyState === 4) {
                    status = xhr.status;

                    // If response is OK or fetched from cache
                    if ((status >= 200 && status < 300) || status === 304) {
                        var res = xhr.responseText,
                            contentType = xhr.getResponseHeader('Content-Type');

                        // If server sent a content type header, handle formats
                        if (contentType) {
                            // Handle JSON format
                            if (contentType === 'text/json' ||
                                contentType === 'application/json') {

                                // JSON throws an exception on invalid JSON
                                try {
                                    res = JSON.parse(res);
                                } catch (err) {
                                    // Trigger "fail" callback if set
                                    if (options.fail) {
                                        options.fail.call(xhr, err);
                                        return;
                                    }
                                }
                            // Handle XML format
                            } else if (contentType === 'text/xml' ||
                                contentType === 'application/xml') {
                                // responseXML returns a document object
                                res = xhr.responseXML;

                                // if XML was invalid, trigger fail callback
                                if (res === null && options.fail) {
                                    options.fail.call(xhr, 'Bad XML file');
                                    return;
                                }
                            }
                        }

                        // Trigger done callback with the proper response
                        if (options.done) {
                            options.done.call(xhr, res);
                        }
                    }

                }
            };

            // Fire the request
            xhr.send(null);
        },
        qs: function (selector) {
            return document.querySelector(selector);
        },

        qsa: function (selector) {
            return document.querySelectorAll(selector);
        },
        addEvent: function(elem, type, handler) {
            if (document.addEventListener) {
                elem.addEventListener(type, handler, false);
            } else {
                elem.attachEvent("on" + type, handler);
            }
        },
        removeEvent: function(elem, type, handler) {
            if (document.removeEventListener) {
                elem.addEventListener(type, handler ,false);
            } else {
                elem.detachEvent("on" + type, handler);
            }
        },
        addClass: function(element, classToAdd){
            var currentClassValue = element.className;

            if (currentClassValue.indexOf(classToAdd) == -1) {
                if ((currentClassValue == null) || (currentClassValue === "")) {
                    element.className = classToAdd;
                } else {
                    element.className += " " + classToAdd;
                }
            }
        },
        removeClass: function(element, classToRemove) {
            var currentClassValue = element.className;

            // removing a class value when there is more than one class value present
            // and the class you want to remove is not the first one
            if (currentClassValue.indexOf(" " + classToRemove) != -1) {
                element.className = element.className.replace(" " + classToRemove, "");
                return;
            }

            // removing the first class value when there is more than one class
            // value present
            if (currentClassValue.indexOf(classToRemove + " ") != -1) {
                element.className = element.className.replace(classToRemove + " ", "");
                return;
            }

            // removing the first class value when there is only one class value
            // present
            if (currentClassValue.indexOf(classToRemove) != -1) {
                element.className = element.className.replace(classToRemove, "");
                return;
            }
        }

    };
}());


//# sourceMappingURL=all.js.map