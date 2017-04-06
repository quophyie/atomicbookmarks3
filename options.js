
function handle_checkbox(checkboxName, localStorageRecord, defaultValue)
{
    var checked = getStorageValueBool(localStorageRecord, defaultValue);
    $(checkboxName).checked = checked;

    Event.observe(checkboxName, "click", function (itm)
    {
        localStorage[localStorageRecord] = ($(checkboxName).checked == true)
    });
}

function setIntProperty(input, maxLimit)
{
    var value = input.value;
    var re = /^\d+$/;
    if (!re.test(value) || (maxLimit != undefined && value > maxLimit))
    {
        value = maxLimit;
        input.value = maxLimit;
    }
    input.removeAttribute('class');
    localStorage[input.id] = value;
}

function restoreComboboxState(comboBoxId, localStorageId)
{
    var nodeId = localStorage[localStorageId];
    populateCombobox(comboBoxId, nodeId);
}

function saveComboboxState(comboBox, localStorageId)
{
    localStorage[localStorageId] = comboBox.value;
}

(function ()
{
    // Left mouse button link opening options
    switch (getStorageValue("open_in", "1"))
    {
        default:
        case "1":
            $('open_tab').checked = true;
            break;
        case "2":
            $('open_win').checked = true;
            break;
        case "3":
            $('open_cur').checked = true;
            break;
    };
    Event.observe('open_win', "change", function (itm) { localStorage['open_in'] = "2"; });
    Event.observe('open_tab', "change", function (itm) { localStorage['open_in'] = "1"; });
    Event.observe('open_cur', "change", function (itm) { localStorage['open_in'] = "3"; });
    handle_checkbox('open_in_background', 'bg_tabs', 'true');

    // Middle mouse button link opening options
    switch (getStorageValue("open_in_middle", "1"))
    {
        default:
        case "1":
            $('open_tab_middle').checked = true;
            break;
        case "2":
            $('open_win_middle').checked = true;
            break;
        case "3":
            $('open_cur_middle').checked = true;
            break;
    };
    Event.observe('open_win_middle', "change", function (itm) { localStorage['open_in_middle'] = "2"; });
    Event.observe('open_tab_middle', "change", function (itm) { localStorage['open_in_middle'] = "1"; });
    Event.observe('open_cur_middle', "change", function (itm) { localStorage['open_in_middle'] = "3"; });
    handle_checkbox('open_in_background_middle', 'bg_tabs_middle', 'true');

    handle_checkbox('keep_bookmarks_opened', 'keep_opened', 'true');
    $('recent_num').value = parseInt(getStorageValue('recent_num', "100", true));

    // ext info
    handle_checkbox('show_ext', 'ext', 'true');
    handle_checkbox('show_ext_tooltip', 'ext_tooltips', 'true');

    handle_checkbox('open_manager_in_window', 'edit_window', 'true');

    restoreComboboxState('startup_folder', 'startup_folder');
    restoreComboboxState('save_bookmarks_to', 'bookmarks_folder');
    restoreComboboxState('save_sessions_to', 'sessions_folder');

    Event.observe('open_win_middle', "change", function (itm) {
        localStorage['open_in_middle'] = "2";
    });
})();