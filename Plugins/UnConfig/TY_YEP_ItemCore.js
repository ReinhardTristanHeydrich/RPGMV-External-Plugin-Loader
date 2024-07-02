Window_ItemList.prototype.initialize = function(x, y, width, height) {
    if (SceneManager._scene instanceof Scene_Item) {
      width = Graphics.boxWidth;
    }
    Yanfly.Item.Window_ItemList_initialize.call(this, x, y, width, height);
};

Window_ItemList.prototype.maxCols = function() {
    return 2;
};