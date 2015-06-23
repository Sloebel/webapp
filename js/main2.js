(function(){
    "use strict";

    function DynamicTabHandler(tab){

        this._urls = {};// {"ynet": "http://adasd"}
        //this._urls["ynet"]

        this._tabId = tab.id;

        dynamicFormHandler.init(tab);
    }


    //----------------------------------------------------------------------
    //----------------------------------------------------------------------


    var dynamicFormHandler = (function(){

        function init(container){
            var submitButtons = container.querySelector('button[type="submit"]');
            //UTILS.addEvent(submitButtons, "click", _onSubmit.bind(null, container));
            UTILS.addEvent(submitButtons, "click",function(e){ _onSubmit.call(this, container, e);} );
            this._urls = storageHandler.read(this._tabId);

        }

        function _onSubmit(container, e) {
            e.preventDefault();
            //var target = getEventTarget(e);
            var tabId = tabEl.id;
            tabId = '#' + tabId;

            var reportsNames = UTILS.qsa(tabId + ' input[name="siteName"]');
            var reportsUrls = UTILS.qsa(tabId + ' input[name="siteUrl"]');
            var selectUrl = UTILS.qs(tabId + ' .url-holder');
            var expandLink = UTILS.qs(tabId + ' .expand-btn');

            while (selectUrl.hasChildNodes()) {
                selectUrl.removeChild(selectUrl.firstChild);
            }
            tempData = [];
            for (var i = 0; i < reportsNames.length; i++) {

                if ((reportsNames[i].value != "" && reportsUrls[i].value === "") || (reportsNames[i].value === "" && reportsUrls[i].value != "")) {
                    reportsNames[i].value != "" ? reportsUrls[i].focus() : reportsNames[i].focus();
                    reportsUrls[i].placeholder = "Please enter URL..";
                    return;

                }   else if (reportsNames[i].value != "" && reportsUrls[i] != "") {
                    tempData.push({
                        name: reportsNames[i].value,
                        url: reportsUrls[i].value
                    });

                    var option = create("option");
                    option.textContent = reportsNames[i].value;
                    option.value = reportsUrls[i].value;
                    append(selectUrl, option);
                }
            }
            if (tempData.length == 0) {
                UTILS.addClass(selectUrl, 'hidden');
                UTILS.addClass(expandLink, 'hidden');
                formHandler.changeUrl(tabId, '');
                localStorage.removeItem(tabEl.id);
                return;
            }
            localStorage.setItem(tabEl.id, JSON.stringify(tempData)); //todo: use storage handler
            UTILS.removeClass(selectUrl, 'hidden');
            UTILS.removeClass(expandLink, 'hidden');
            formHandler.changeUrl(tabId, tempData[0].url);
            formHandler.toggleForm(tabEl);

        }

        return {
            init: init
        };
    })();



    //----------------------------------------------------------------------
    //----------------------------------------------------------------------

    var storageHandler = (function(){

        function read(key){
            JSON.parse(localStorage.getItem(key))
        }

        function write(key, data){

        }

        return{
            read: read,
            write: write
        };
    })();


    //----------------------------------------------------------------------
    //----------------------------------------------------------------------



    var app = (function(){

        var _dynamicTabHandlers = [];

         function init(tabSelector){
             var tabs = UTILS.qsa(tabSelector);

             for (var i = 0; i<tabs.length;i++){
                _dynamicTabHandlers.push(new DynamicTabHandler(tab));
             }
         }

        return {
            init: init
        };
    })();

    app.init(".dynamicTab");
});




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
