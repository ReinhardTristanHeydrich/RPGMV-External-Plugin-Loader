(function() { 

	//==========================================================
		// VERSION 1.0.0 -- by Toby Yasha
	//==========================================================

		// This mod lets you open the hexen from the menu

		// NOTE: This mod uses GALV_LayerGraphics.js and data
		// from EV001 from map 31 in order to work.

	//==========================================================
		// Mod Configurations -- 
	//==========================================================
		
		let hexenMenuReady = false;
		let hexenMenuMode = false;
		let hexenMenuTimer = 0;

		const hexenCursorImage = "$cursor1";
		const hexenCommandName = "Hexen";
		const hexenCommandIcon = 5;
		const hexenTimerValue = 30;
		const hexenEventId = 1;

		const hexenMapData = {
			mapId: 31,
			x: 8,
			y: 8,
			direction: 0,
			fadeType: 0
		}

		const originMapData = {
			mapId: 0,
			x: 0,
			y: 0,
			direction: 0,
			fadeType: 0
		}

		const hexenLayers = {
			fearAndHunger: {
				variableId: 261,
				layers: [
					{ layerId: 18, graphic: "circle_1", x: 70, y: 406, opacity: 0 },
					{ layerId: 19, graphic: "circle_2", x: 72, y: 406, opacity: 0 },
					{ layerId: 20, graphic: "circle_3", x: 72, y: 406, opacity: 0 },
				]
			},
			alllMer: {
				variableId: 262,
				layers: [
					{ layerId: 21, graphic: "circle_1", x: 168, y: 218, opacity: 0 },
					{ layerId: 22, graphic: "circle_2", x: 168, y: 220, opacity: 0 },
				]
			},
			rher: {
				variableId: 263,
				layers: [
					{ layerId: 23, graphic: "circle_1", x: 407, y: 118, opacity: 0 },
					{ layerId: 24, graphic: "circle_2", x: 407, y: 121, opacity: 0 },
					{ layerId: 25, graphic: "circle_3", x: 407, y: 121, opacity: 0 },
				]
			},
			sylvian: {
				variableId: 264,
				layers: [
					{ layerId: 9,  graphic: "circle_1", x: 600, y: 167, opacity: 0 },
					{ layerId: 10, graphic: "circle_2", x: 600, y: 168, opacity: 0 },
				]
			},
			vinushka: {
				variableId: 265,
				layers: [
					{ layerId: 11, graphic: "circle_1", x: 746, y: 313, opacity: 0 },
					{ layerId: 12, graphic: "circle_2", x: 744, y: 313, opacity: 0 },
					{ layerId: 13, graphic: "circle_3", x: 739, y: 311, opacity: 0 },
				]
			},
			grogoroth: {
				variableId: 266,
				layers: [
					{ layerId: 14, graphic: "circle_1", x: 746, y: 502, opacity: 0 },
					{ layerId: 15, graphic: "circle_2", x: 744, y: 505, opacity: 0 },
					{ layerId: 17, graphic: "circle_3", x: 739, y: 501, opacity: 0 },
				]
			}
		}

	//==========================================================
		// Mod Configurations -- 
	//==========================================================

		// Remember the map and player position before entering hexen
		function saveOriginMap() {
			originMapData.mapId = $gameMap.mapId();
			originMapData.x = $gamePlayer.x;
			originMapData.y = $gamePlayer.y;
			originMapData.direction = $gamePlayer.direction();
		}

		// Flag to differentiate between the normal hexen in-game
		function setHexenMenuMode(value) {
			hexenMenuMode = value;
		}

		function isHexenMenuMode() {
			return !!hexenMenuMode;
		}

		// Flag to check if the hexen is ready to run
		function setHexenMenuReady(value) {
			hexenMenuReady = value;
		}

		function isHexenMenuReady() {
			return !!hexenMenuReady;
		}

		// Flag to control the start/end process of the hexen
		function resetHexenTimer() {
			hexenMenuTimer = hexenTimerValue;
		}

		function isHexenMap() {
			return $gameMap.mapId() === hexenMapData.mapId;
		}

		// Used to check if hexen can be started
		function isHexenMenuValid() {
			return isHexenMap() && isHexenMenuMode();
		}

		function updateHexenMenu() {
			updateHexenStart();
			updateHexenEnd();
		}
		
		// Wait for the timer to finish before starting the hexen
		// NOTE: If we don't do this we risk crashing the game
		// because we are still inside the scene_menu
		function updateHexenStart() {
			if (!isHexenMenuReady()) {
				hexenMenuTimer--;
				if (hexenMenuTimer === 0) {
			    	startHexen();
			    	setHexenMenuReady(true);
			    }
			}
		}

		function startHexen() {
			onHexenStart();
			clearFogOverlay();
			setupHexenPictures();
			setupHexenCursor();
			setupHexenLayers();
		}

		function onHexenStart() {
			$gameSystem.disableMenu();
			$gameSwitches.setValue(2420, true); // Hexen GFX
		}

		function clearFogOverlay() {
			SceneManager._scene._spriteset.removeVisibilityRange();
		}

		function setupHexenPictures() {
			$gameTemp.reserveCommonEvent(290); // Soulstone HUD
			createHexenBanner();
		}

		function createHexenBanner() {
			const pictureArgs = {
				pictureId: 1,
				name: "the_hexen_banner",
				origin: 0,
				x: 0,
				y: 0,
				scaleX: 100,
				scaleY: 100,
				opacity: 255,
				blendMode: 0,
			} 
			$gameScreen.showPicture(...Object.values(pictureArgs));
		}

		function setupHexenCursor() {
			const leader = $gameParty.leader();
			leader.setCharacterImage(hexenCursorImage, 0);
			$gamePlayer.setTransparent(false);
			$gamePlayer.setMoveSpeed(5);
			$gamePlayer.hideFollowers();
			$gamePlayer.refresh();
		}

		function setupHexenLayers() {
			const godNames = Object.keys(hexenLayers);
			for (const godName of godNames) {
				createHexenLayers(godName);
			}
			refreshLayers();
		}

		function createHexenLayers(godName) {
			const data = hexenLayers[godName];
			for (const layer of data.layers) {
				const value = data.layers.indexOf(layer) + 1;
				layer.opacity = getLayerOpacity(data.variableId, value);
				const staticLayer = createStaticLayer(...Object.values(layer));
				Galv.pCmd.LAYER_S(...Object.values(staticLayer));
			}
		}

		function isHexenExitCalled() {
			return Input.isTriggered('escape') || Input.isPressed('escape');
		}

		// Check if the player is trying to exit the hexen
		function updateHexenEnd() {
			if (isHexenExitCalled() && isHexenMenuMode()) {
				endHexen();
				setHexenMenuMode(false);
				setHexenMenuReady(false);
			}
		}

		function endHexen() {
			onHexenEnd();
			clearHexenCursor();
			clearHexenLayers();
			clearHexenPictures();
			returnToOriginMap();
		}

		function onHexenEnd() {
			$gameSystem.enableMenu();
			$gameSwitches.setValue(2420, false); // Hexen GFX
		}

		function clearHexenCursor() {
			$gamePlayer.showFollowers();
			$gamePlayer.refresh();
		}

		function clearHexenLayers() {
			const mapId = hexenMapData.mapId;
			const layerIds = [1, 3, 4, 5, 6, 7, 8, 16];
			for (const layerId of layerIds) {
				$gameMap.layerSettings[mapId][layerId] = {};
			}
			refreshLayers();
		}

		// pictureId 1: hexen banner
		// pictureIds 14-17: soulstone hud
		function clearHexenPictures() {
			const pictureIds = [1, 2, 14, 15, 16, 17];
			for (const pictureId of pictureIds) {
				$gameScreen.erasePicture(pictureId);
			}
		}

		function returnToOriginMap() {
			$gamePlayer.reserveTransfer(...Object.values(originMapData));
		}

		function getLayerOpacity(variableId, value) {
			return $gameVariables.value(variableId) >= value ? 255 : 0;
		}

		function refreshLayers() {
			SceneManager._scene._spriteset.createLayerGraphics();
		}

		function createStaticLayer(layerId, graphic, x, y, opacity) {
			const layerData = {
				mapId: 31,
				layerId: layerId,
				graphic: graphic,
				x: x,
				y: y,
				opacity: opacity,
				z: 0,
				blend: 0,
				xAnchor: 0.5,
				yAnchor: 0.5,
				character: 0,
				rotate: 0
			}
			return {...layerData};
		}

	//==========================================================
		// Game Configurations -- Compatibility
	//==========================================================

		// If the input is a number just return it 
		// instead of converting it from a string
		const Galv_LG_num = Galv.LG.num;
		Galv.LG.num = function(txt) {
			if (typeof txt === "string") {
				return Galv_LG_num.call(this, txt);
			} else {
				return txt;
			}
		};

	//==========================================================
		// Game Configurations -- Window_MenuCommand
	//==========================================================

		// Draws the "Hexen" command icon in the menu
		const Window_MenuCommand_drawItem = Window_MenuCommand.prototype.drawItem;
		Window_MenuCommand.prototype.drawItem = function(index) {
			const commandName = this.commandName(index);
			const align = this.itemTextAlign();
			let rect = this.itemRectForText(index);

			if (commandName === hexenCommandName) {
				this.drawIcon(hexenCommandIcon, rect.x - 4, rect.y + 2);
				this.drawText(commandName, rect.x + 30, rect.y, rect.width - 30, align);
			} else {
				Window_MenuCommand_drawItem.call(this, index);
			}

		};

		// Adds the "Hexen" command to the menu
		const Window_MenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
		Window_MenuCommand.prototype.makeCommandList = function() {
			Window_MenuCommand_makeCommandList.call(this);

			const enabled = this.areMainCommandsEnabled();
			this.addCommand(hexenCommandName, "hexen", enabled);
		};

	//==========================================================
		// Game Configurations -- Scene_Menu
	//==========================================================

		// Adds a method to the "Hexen" command
		const Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
		Scene_Menu.prototype.createCommandWindow = function() {
			Scene_Menu_createCommandWindow.call(this);
		    this._commandWindow.setHandler('hexen', this.commandHexen.bind(this));
		};

		// Method called upon interacting with the "Hexen" command
		Scene_Menu.prototype.commandHexen = function() {
			SceneManager.pop();
			saveOriginMap();
			resetHexenTimer();
			setHexenMenuMode(true);
			$gamePlayer.reserveTransfer(...Object.values(hexenMapData));
		};

	//==========================================================
		// Game Configurations -- Game_Map
	//==========================================================

		// Prevent conflict with on map event that does similar things
		const Game_Map_setupEvents = Game_Map.prototype.setupEvents;
		Game_Map.prototype.setupEvents = function() {
		    Game_Map_setupEvents.call(this);
		    if (isHexenMenuValid()) {
		    	this.eraseEvent(hexenEventId);
		    }
		};

		// Update the hexen's start and end processes
		const Game_Map_update = Game_Map.prototype.update;
		Game_Map.prototype.update = function(sceneActive) {
		    Game_Map_update.call(this, sceneActive);
		    if (isHexenMenuValid()) {
		    	updateHexenMenu();
			}
		};

})();