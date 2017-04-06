/**
 * Created by dman on 03/04/2017.
 */

var FOLDER_OR_PANEL_CONTEXT_MENU_HTML="FOLDER_OR_PANEL_CONTEXT_MENU_HTML";
var BOOKMARK_CONTEXT_MENU_HTML="BOOKMARK_CONTEXT_MENU_HTML";
(function ()
{
	Event.observe('search_box', "keyup", search_key);
	Event.observe('search_box', "click", search_key);
    Event.observe('results', "contextmenu", menu);
	Event.observe('open_chrome_bookmarks', "click", function ()
	{
		if (localStorage['edit_window'] == "true")
			chrome.windows.create({ url: "chrome://bookmarks/", left: 0, top: 100, width: 800, height: 700 });
		else
			chrome.tabs.create({ url: "chrome://bookmarks/", selected: true });
		window.close();
	});
	Event.observe('open_recent_bookmarks', "click", function () { disp_list.populate_recent(); });
	Event.observe('results', "click", function () { hideMenu(); }
	);
	document.body.style.height = '40em';
	if (!getStorageValueBool('ext', true))
	{
		$('bookmarks_ext').style.display = 'none';
		$('results').style.height = '34em';
		$('results').style["border-radius"] = "0 0 5px 5px";
	}

	disp_list = new AB.list($('bookmarks'), $('bookmarks_title'), $('bookmarks_ext'), $('resizer'));
	var startupFolder = parseInt(getStorageValue("startup_folder", "1"));
	if (startupFolder > 1)
		$("lock").src = "img/startup_folder_locked.png";
	disp_list.populate(startupFolder);
})();

/**
 * Load the folder and bookmarks context menu html
 */

(function () {
    $j.get("/templates/menu/folder-context-menu.html", function(data, status){
        getStorageValue(FOLDER_OR_PANEL_CONTEXT_MENU_HTML, "", true);
        getStorageValue(FOLDER_OR_PANEL_CONTEXT_MENU_HTML, data, true);
    });
})();

(function () {
    $j.get("/templates/menu/bookmark-context-menu-view.html", function(data, status){
        localStorage[BOOKMARK_CONTEXT_MENU_HTML] = null;
        getStorageValue(BOOKMARK_CONTEXT_MENU_HTML, "", true);
        getStorageValue(BOOKMARK_CONTEXT_MENU_HTML, data, true);
    });
})();
/**
 * Register pop top menu handles
 */

(function () {
    Event.observe('lock', "click", function () {
        lockStartupFolder()
	});

    Event.observe('btn_save_bookmark', "click", function () {
        saveTab();
    });

    Event.observe('btn_save_session', "click", function () {
        saveSession();
    });

})();