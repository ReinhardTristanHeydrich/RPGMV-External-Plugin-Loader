(function() {
	
	//==========================================================================
	// Bonus QoL: Shows the name and description
	// of all uncrafted Items / Weapons / Armors.
	// [NOTE]: To disable this feature enter "true", otherwise leave as "false".
	//==========================================================================
	
	Yanfly.Param.ISMaskUnknown = "false";
	
	//==========================================================================
	// Shows crafting recipes for Items / Weapons / Armors
	// based on data of database items instead of party owned items.
	//==========================================================================

	Scene_Synthesis.availableLibrary = function() {
		if ($gameTemp._synthRecipe) {
		  return [[$gameTemp._synthRecipe]];
		}
		let library = [];
		library.push($dataItems);
		library.push($dataWeapons);
		library.push($dataArmors);
		return library;
	};

})();