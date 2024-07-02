//==========================================================
	// Mod Configurations
//==========================================================

// TY.Mods.SilverCoinsValue -> The new maximum value for the silver coins
// TY.Mods.GiveInfiniteCoins -> Cheat which gives you the maximum amount of silver coins

TY.Mods = TY.Mods || {};
TY.Mods.SilverCoinsValue = 9999;
TY.Mods.GiveInfiniteCoins = false;

(function() {
	
	// Get the silver coin currency based on the game
	function silverCoinId() {
		var gameTitle = $dataSystem.gameTitle;
		if (gameTitle.contains("TERMINA")) {
			return 204;
		} else {
			return 59;
		}
	}
	
	// Change the maximum amount of silver coins you can carry
	Game_Party.prototype.maxItems = function(item) {
		if (item && item.id == silverCoinId()) {
			return TY.Mods.SilverCoinsValue;
		} else {
			return 99;
		}
	};
	
	// Makes sure the silver coins value text is adjusted to the width of the max value
	Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
		var valueWidth = item && item.id == silverCoinId() ? TY.Mods.SilverCoinsValue.toString() : '00';
		if (this.needsNumber()) {
			this.drawText(':', x, y, width - this.textWidth(valueWidth), 'right');
			this.drawText($gameParty.numItems(item), x, y, width, 'right');
		}
	};
	
	// If allowed, gains silver coins every time a map is loaded
	if (TY.Mods.GiveInfiniteCoins) {
		const TY_Scene_Map_OnMapLoaded = Scene_Map.prototype.onMapLoaded;
		Scene_Map.prototype.onMapLoaded = function() {
			TY_Scene_Map_OnMapLoaded.call(this);
			var id = silverCoinId();
			$gameParty.gainItem($dataItems[id], TY.Mods.SilverCoinsValue);
		};
	}
	
})();