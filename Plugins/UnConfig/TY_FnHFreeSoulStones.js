//==========================================================
	// VERSION 1.0.1 -- by Toby Yasha
//==========================================================

(function() {
	
// Get the soul stone database index based on the game
function soulStoneId() {
	const gameTitle = $dataSystem.gameTitle;
	if (gameTitle.match(/TERMINA/gi)) {
		return 116;
	} else {
		return 115;
	}
}

// Get the soul stones
const TY_Scene_Map_OnMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	TY_Scene_Map_OnMapLoaded.call(this);
	const id = soulStoneId();
	$gameParty.gainItem($dataItems[id], 99);
};

})();