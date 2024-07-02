//==========================================================
	// VERSION 1.0.1 -- by Toby Yasha
//==========================================================

(function() {
	
// Get the lucky coin database index based on the game
function luckyCoinId() {
	const gameTitle = $dataSystem.gameTitle;
	if (gameTitle.match(/TERMINA/gi)) {
		return 59;
	} else {
		return 201;
	}
}

// Get the lucky coins
const TY_Scene_Map_OnMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	TY_Scene_Map_OnMapLoaded.call(this);
	const id = luckyCoinId();
	$gameParty.gainItem($dataItems[id], 99);
};

})();