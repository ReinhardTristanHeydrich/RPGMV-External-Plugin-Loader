(function() {
	
	//==========================================================
		// VERSION 1.1.0 -- by Toby Yasha
	//==========================================================
		
	// The following settings are meant to be edited by users:
		
	const allowInfiniteStamina = true;  // true | false -- DEFAULT: true
	const allowDrawStaminaBar  = false; // true | false -- DEFAULT: false

	/*
		EXPLANATION:

		allowInfiniteStamina - 
			This setting allows you to run without
			having to worry about your stamina running out.

		allowDrawStaminaBar - 
			This is a Quality of Life setting.

			If you have infinite stamina there's no point to
			show the stamina bar graphic in the upper left corner.

			But the choice is left here regardless.
	*/

	// NOTE: Since Version 1.1.0 you can automatically dash by
	// pressing the "Shift" once, no need to hold the "Shift" key anymore!
	// NOTE: To stop dashing press the "Shift" key again.
	
	//==========================================================
		// Mod Configurations -- 
	//==========================================================

	// If ON then you don't need to hold "Shift" to dash.
	// NOTE: This property shouldn't be edited by users!
	let autoDashToggle = false;

	/*
	SWITCH DEFINITION:
		202 -  Suicide in Process
		203 -  Climbing
		410 -  Cannot Use Bow
		434 -  Pig Death Scene
		2243 - Run Meter Cooldown
		2245 - Double Tap
		2252 - Rifle Equipped
		2253 - Shotgun Equipped
		2254 - Pistol Equipped
		2420 - Hexen GFX
	*/
	function meetsDashSwitchCondition() {
		const switchIds = [202, 203, 410, 434, 2243, 2245, 2252, 2253, 2254, 2420];
		return switchIds.every(switchId => !$gameSwitches.value(switchId));
	}

	/*
	VARIABLE DEFINITION:
		868 -  Burn
		2802 - One leg restriction
	*/
	function meetsDashVariableCondition() {
		const variableIds = [868, 2802];
		return variableIds.every(variableId => $gameVariables.value(variableId) === 0);
	}

	// Check if the player meets the condition to dash
	// NOTE: Dash conditions are based on Common Event No. 576
	function meetsDashConditions() {
		return (
			$gamePlayer.isMoving() &&
			meetsDashSwitchCondition() &&
			meetsDashVariableCondition()
		);
	}

	// Toggle the auto dashing feature ON/OFF
	function updateDashToggle() {
		if (Input.isTriggered("shift")) {
			autoDashToggle = !autoDashToggle;
			updateDashState();
		}
	}

	// If auto dashing is ON and 
	// player meets dashing condition
	// then ensure player is always dashing
	function updateDashState() {
		if (autoDashToggle && meetsDashConditions()) {
			$gameSwitches.setValue(1956, true);
		}
	}

	// Ensures auto dashing state is not
	// lost after equipping/unequipping guns
	function refreshDashState() {
		const value = autoDashToggle;
		$gameSwitches.setValue(1956, value);
	}

	// if "true" then don't run out of stamina
	function updateStaminaMeter() {
		if (allowInfiniteStamina) {
			$gameVariables.setValue(2714, 0);
		}
	}

	/*
		573 - Stamina Bar Graphic
		574 - Stamina Bar Graphic
		575 - Stamina Bar Graphic
	*/
	// This is a list of common events that
	// we want to remove based on a condition
	function makeCommonEventFilterList() {
		const commonEventIds = [573, 574, 575];

		return commonEventIds;
	}

	// Check if common event needs to be filtered out
	function isCommonEventInFilterList(commonEvent) {
		const commonEventIds = makeCommonEventFilterList();
		if (commonEvent) {
			return commonEventIds.includes(commonEvent.id);
		} else {
			return false;
		}
	}

	// Filter out parallel events that
	// we don't want to modify the game anymore
	function filterCommonEvents() {
		const commonEvents = $gameMap.parallelCommonEvents();
			
		for (const commonEvent of [...commonEvents]) {
			if (isCommonEventInFilterList(commonEvent)) {
				const index = commonEvents.indexOf(commonEvent);
				if (index >= 0) {
					commonEvents.splice(index, 1);
				}
			}
		}
			
		return commonEvents;
	}
	
	//==========================================================
		// Game Configurations -- Game_Map
	//==========================================================

	// Clear dash state to ensure compatibility with guns
	const TY_Game_Map_Setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function(mapId) {
		TY_Game_Map_Setup.call(this, ...arguments);
		refreshDashState();
	}

	// Update dash and stamina features
	const TY_Game_Map_Update = Game_Map.prototype.update;
	Game_Map.prototype.update = function(sceneActive) {
		TY_Game_Map_Update.call(this, ...arguments);
		updateDashToggle();
		updateDashState();
		updateStaminaMeter();
	};

	// Call the newly created "filterStaminaCommonEvents" method
	const TY_Game_Map_SetupEvents = Game_Map.prototype.setupEvents;
	Game_Map.prototype.setupEvents = function() {
		TY_Game_Map_SetupEvents.call(this, ...arguments);
		const commonEvents = filterCommonEvents();

		this._commonEvents = commonEvents.map(commonEvent => {
			return new Game_CommonEvent(commonEvent.id);
		});

	};

})();