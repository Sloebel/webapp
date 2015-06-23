(function($) {
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
        var $target = $(".tabs a[href='"+ hash + "']");
        $target.addClass("active");

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
})(jQuery);