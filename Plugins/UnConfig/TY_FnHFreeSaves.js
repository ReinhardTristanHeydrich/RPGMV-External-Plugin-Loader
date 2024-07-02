//===========================================================
// - How to use -
// 
// 1. Adds the script inside the js => plugins folder
// 2. Open index.html in notepad
// 3. Insert this before the </body> tag inside index.html
// <script type="text/javascript" src="js/plugins/TY_FnHFreeSaves.js"></script>
// 4. To get the enlightment books in game press the 'Tab' key a couple times
// 
// NOTE: This should work in both F&H 1 or F&H 2
//===========================================================

(function() {

const TY_Scene_Map_OnMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	TY_Scene_Map_OnMapLoaded.call(this);
	$gameParty.gainItem($dataItems[40], 99);
};

})();