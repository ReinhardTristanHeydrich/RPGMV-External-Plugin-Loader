(function() { 

	//==========================================================
		// VERSION 1.4.1 -- by Toby Yasha
	//==========================================================
	
	// This is meant to be edited by users
	// Accepted value include: true or false
	const allowCoinFlipDeaths = false;
	
	//==========================================================
		// Mod Parameters -- 
	//==========================================================
	
	// A list of $gameSwitches for coin flips related to battle
	const fnh1CoinSwitches = [ 
		16,  // GUARD BREAK NECK -- used by a lot of enemies
		66,  // PRIEST CHANTING
		149, // CAVE MOTHER
		340, // NIGHT LURCH
		648, // SALMON SNAKE
		794, // HARVEST MAN
		// TRAPS | SPECIAL ATTACK
		337,  // NIGHT LURCH
		338,  // NIGHT LURCH
		339,  // NIGHT LURCH
	];
	
	// SWITCH IDs
	const fnh1Switches = [
		1035, // PENDULUM BLADES
		1036, // PENDULUM BLADES
		1037, // PENDULUM BLADES
		1264, // PENDULUM BLADES
		1265, // PENDULUM BLADES
		1266, // PENDULUM BLADES
		3038, // BOULDER CRASH
		3142, // CAVE IN
		3554, // CAVED IN
		// LIMBS [CAHARA] -- To prevent limb loss from Yellow Mage
		36, // LEFT ARM
		37, // RIGHT ARM
		38, // LEFT LEG
		39, // RIGHT LEG
		// LIMBS [D'ARCE]
		248, // LEFT ARM
		249, // RIGHT ARM
		250, // LEFT LEG
		251, // RIGHT LEG
		// LIMBS [ENKI]
		252, // LEFT ARM
		253, // RIGHT ARM
		254, // LEFT LEG
		255, // RIGHT LEG
		// LIMBS [RAGNVALDR]
		256, // LEFT ARM
		257, // RIGHT ARM
		258, // LEFT LEG
		259, // RIGHT LEG
		// LIMBS [LE'GARDE]
		261, // LEFT ARM
		262, // RIGHT ARM
		263, // LEFT LEG
		264, // RIGHT LEG
		// LIMBS [MARRIAGE]
		385, // LEFT ARM
		386, // RIGHT ARM
		387, // LEFT LEG
		388, // RIGHT LEG
		// LIMBS [FUSION]
		390, // LEFT ARM
		391, // RIGHT ARM
		392, // LEFT LEG
		393, // RIGHT LEG
	];
	
	// A list of $gameSwitches for coin flips related to battle
	const fnh2CoinSwitches = [
		16,   // GUARD BREAK NECK -- used by a lot of enemies
		2876, // BEARTRAP SET
	];
	
	// SWITCH IDs
	const fnh2Switches = [
		// TRAPS
		3772, // YELLOW MAGE DANCE
		3775, // YELLOW MAGE HURTING
	];
	
	// VARIABLE IDs [TRAPS]
	const fnh1Variables = [
		//
	];
	
	// VARIABLE IDs [TRAPS]
	const fnh2Variables = [
		2067, // FALL TRAP 1
		2068  // FALL TRAP 2
	];
	
	// EVENT NAMES [TRAPS]
	const fnh1Events = [
		"rusty_nail",
	];
	
	// EVENT NAMES [TRAPS]
	const fnh2Events = [
		"mine",
		"nail_trap",
		"bearTrap1_enemy"
	];
	
	// STATE IDs
	const stateImmunities = [
		1,   // DEAD
		3,   // ARM CUT
		5,   // BLEEDING
		14,  // LEG CUT
		16,  // CONFUSED
		17,  // POISONED
		19,  // FRACTURE
		30,  // SOUL SUCKED
		31,  // HEADLESS
		49,  // BLINDNESS
		55,  // INFECTION ARM
		56,  // INFECTION LEG
		61,  // PARASITES
		90,  // TOXIC
		93,  // BLINDNESS2
		95,  // PARALYZED
		99,  // BRAIN FLOWER
		105, // TENTACLES(STUN)
	];
	
	//==========================================================
		// Mod Configurations -- 
	//==========================================================
	
	function isGameTermina() {
		return $dataSystem.gameTitle.match(/TERMINA/gi);
	}
	
	function isStateImmune(stateId) {
		return stateImmunities.includes(stateId);
	}
	
	function getGameSwitches() {
		return isGameTermina() ? fnh2Switches : fnh1Switches;
	}
	
	function getCoinSwitches() {
		return isGameTermina() ? fnh2CoinSwitches : fnh1CoinSwitches;
	}
	
	function getGameVariables() {
		return isGameTermina() ? fnh2Variables : fnh1Variables;
	}
	
	function getGameEvents() {
		return isGameTermina() ? fnh2Events : fnh1Events;
	}
	
	// Check if an enemy is currently doing a special attack
	function isEnemySpecialAttack() {
		const switches = getCoinSwitches();
		return switches.some(switchId => {
			return $gameSwitches.value(switchId)
		});
	}
	
	// Check if we can die from coin flips and an enemy doing a special attack
	function isDeathEnabled() {
		return allowCoinFlipDeaths && isEnemySpecialAttack();
	}
	
	function refreshGameSwitches() {
		const switches = getGameSwitches();
		for (const switchId of switches) {
			if ($gameSwitches.value(switchId)) {
				$gameSwitches.setValue(switchId, false);
			}
		}
	}
	
	function refreshCoinSwitches() {
		if (!allowCoinFlipDeaths) {
			const switches = getCoinSwitches();
			for (const switchId of switches) {
				if ($gameSwitches.value(switchId)) {
					$gameSwitches.setValue(switchId, false);
				}
			}
		}
	}
	
	function refreshGameVariables() {
		const variables = getGameVariables();
		for (const varId of variables) {
			if ($gameVariables.value(varId)) {
				$gameVariables.setValue(varId, 0);
			}
		}
	}
	
	//==========================================================
		// Game Configurations -- Game_Battler
	//==========================================================
	
	// If the enemy is doing a special attack and if we allow coin flip deaths then die
	const Game_Battler_AddState = Game_Battler.prototype.addState; // DEBUFFS
	Game_Battler.prototype.addState = function(stateId) {
		if (this.isActor() && isStateImmune(stateId)) {
			if (!isDeathEnabled()) return;
			if (stateId != 1 && isDeathEnabled()) return;
		}
		Game_Battler_AddState.call(this, stateId);
	};
	
	// If the enemy is doing a special attack and if we allow coin flip deaths then take damage
	const Game_Battler_GainHp = Game_Battler.prototype.gainHp; // BODY
	Game_Battler.prototype.gainHp = function(value) {
		if (this.isActor() && !isDeathEnabled()) {
			value = value < 0 ? 0 : value;
		}
		Game_Battler_GainHp.call(this, value);
	};

	const Game_Battler_GainMp = Game_Battler.prototype.gainMp; // MIND
	Game_Battler.prototype.gainMp = function(value) {
		if (this.isActor()) { value = value < 0 ? 0 : value };
		Game_Battler_GainMp.call(this, value);
	};
	
	const Game_Battler_UseItem = Game_Battler.prototype.useItem; // NO SKILL COST
	Game_Battler.prototype.useItem = function(item) {
		if (this.isActor()) return;
		Game_Battler_UseItem.call(this, item);
	};
	
	//=============================================================
		// Game Configurations -- Game_Battler (TERMINA EXCLUSIVE)
	//=============================================================
	
	const Game_Battler_OnBattleStart = Game_Battler.prototype.onBattleStart; // FREE REVs
	Game_Battler.prototype.onBattleStart = function(advantageous) {
		this.restoreBP();
		Game_Battler_OnBattleStart.call(this, advantageous);
	};
	
	const Game_Battler_OnTurnEnd = Game_Battler.prototype.onTurnEnd; // FREE REVs
	Game_Battler.prototype.onTurnEnd = function() {
		this.restoreBP();
		Game_Battler_OnTurnEnd.call(this);
	};
	
	Game_Battler.prototype.restoreBP = function() { // FREE REVs
		if (this.isActor() && isGameTermina()) {
			this.gainStoredBP(3);
		}
	};
	
	//==========================================================
		// Game Configurations -- Game_BattlerBase
	//==========================================================
	
	const Game_BattlerBase_CanPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost; // NO SKILL COST
	Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
		if (this.isActor()) return true;
		return Game_BattlerBase_CanPaySkillCost.call(this, skill);
	};
	
	const Game_BattlerBase_MeetsUseBPRequirement = Game_BattlerBase.prototype.meetsUseBPRequirement; // NO REV COST
	Game_BattlerBase.prototype.meetsUseBPRequirement = function(item) {
		if (this.isActor()) return true;
		return Game_BattlerBase_MeetsUseBPRequirement.call(this, item);
	}
	
	//==========================================================
		// Game Configurations -- Game_Actor
	//==========================================================

	Game_Actor.prototype.gainExp = function(/*exp*/) {}; // HUNGER
	
	Game_Actor.prototype.changeExp = function(exp, show) { // HUNGER
		this._exp[this._classId] = 156; // This makes the hunger be 1.
	};
	
	//==========================================================
		// Game Configurations -- Game_Switches
	//==========================================================
	
	const Game_Switches_OnChange = Game_Switches.prototype.onChange; // TRAPS AND COINS
	Game_Switches.prototype.onChange = function() { 
		refreshGameSwitches();
		refreshCoinSwitches();
		Game_Switches_OnChange.call(this);
	}
	
	//==========================================================
		// Game Configurations -- Game_Variables
	//==========================================================
	
	const Game_Variables_OnChange = Game_Variables.prototype.onChange; // TRAPS
	Game_Variables.prototype.onChange = function() { 
		refreshGameVariables();
		Game_Variables_OnChange.call(this);
	}
	
	//==========================================================
		// Game Configurations -- Game_Map
	//==========================================================
	
	const Game_Map_SetupEvents = Game_Map.prototype.setupEvents;
	Game_Map.prototype.setupEvents = function() {
		Game_Map_SetupEvents.call(this);
		this.removeTraps();
	};
	
	Game_Map.prototype.removeTraps = function() { // TRAPS
		const eventNames = getGameEvents();
		const events = $dataMap.events.filter(event => !!event);
		const traps = events.filter(event => eventNames.includes(event.name));
		for (const trap of traps) {
			this._events[trap.id] = null;
		}
	};

})();