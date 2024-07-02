//=============================================================================
/*:
 * @plugindesc v1.1 Displays Basic Stats and Element Resistances
 * in the Equipment Scene.
 * @author Toby Yasha & Yanfly
 *
 * @param General Configurations
 *
 * @param Basic Stats
 * @parent General Configurations
 * @desc 0 - BODY 1 - MIND 2 - ATTACK 3 - DEFENSE 4 - M.ATTACK, 5 - M.DEFENSE, 6 - AGILITY, 7 - LUCK
 * @default 0, 1, 2, 4, 6
 *
 * @param Value Width
 * @parent General Configurations
 * @type number
 * @desc How long can a number value be before its shrinked. Used for stats.
 * @default 4
 * @min 1
 *
 * @param Value Spacing
 * @parent General Configurations
 * @type number
 * @desc The spacing added between a stat and its value.
 * @default 65
 * @min 1
 *
 * @param Page Text Width
 * @parent General Configurations
 * @type number
 * @desc How long can a string value be before its shrinked.
 * @default 120
 * @min 1
 *
 * @param Add Text Arrows
 * @parent General Configurations
 * @type boolean
 * @desc If set to true this will add arrows to the 'Prev Page Text' and 'Next Page Text'.
 * @default true
 *
 * @param Prev Page Text
 * @parent General Configurations
 * @desc The text used to indicate the previous page.
 * @default Prev Page
 *
 * @param Next Page Text
 * @parent General Configurations
 * @desc The text used to indicate the next page.
 * @default Next Page 
 *
 * @help
 *
 * This plugin is used to display Basic Stats and Element Resistances.
 * Inside the Equip Scene you can toggle between them by pressing the:
 * 
 * A KEY
 * D KEY
 * LEFT ARROW KEY
 * RIGHT ARROW KEY
 *
 * Must be placed below YEP_ItemCore
 * Must be placed below YEP_EquipCore
 * This plugin can replace TY_RemoveLuck_YEP_EquipCore
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.1:
 * - Mod should now work even without editing the plugins.js file.
 * 
*/

//==========================================================
	// Plugin Parameters
//==========================================================

var TY = TY || {};
TY.Param = TY.Param || {};
TY.Parameters = PluginManager.parameters("TY_DetailedEquip");

if (Object.keys(TY.Parameters).length > 0) { // Mod loaded as a modder
	// General Options
	TY.Param.ValueWidth = Number(TY.Parameters["Value Width"]);
	TY.Param.ValueSpacing = Number(TY.Parameters["Value Spacing"]);
	TY.Param.PageArrows = JSON.parse(TY.Parameters["Add Text Arrows"]);
	TY.Param.PageTextWidth = Number(TY.Parameters["Page Text Width"]);
	TY.Param.PrevPage = TY.Parameters["Prev Page Text"];
	TY.Param.NextPage = TY.Parameters["Next Page Text"];
} else { // Mod loaded as a non-modder
	TY.Param.ValueWidth = 4;
	TY.Param.ValueSpacing = 65;
	TY.Param.PageArrows = true;
	TY.Param.PageTextWidth = 120
	TY.Param.PrevPage = "Prev Page";
	TY.Param.NextPage = "Next Page";
}

//==========================================================
	// Window_StatCompare -- 
//==========================================================

TY.Window_StatCompare_Initialize = Window_StatCompare.prototype.initialize;
Window_StatCompare.prototype.initialize = function(wx, wy, ww, wh) {
	this._currentPage = 1;
	TY.Window_StatCompare_Initialize.call(this, wx, wy, ww, wh);
};

// Check if the window should draw basic stats
Window_StatCompare.prototype.canDrawParams = function() {
	return this._actor && this._currentPage == 1;
};

// Check if the window should draw element resistances
Window_StatCompare.prototype.canDrawElements = function() {
	return this._actor && this._currentPage == 2;
};

// The allowed basic stats to draw
// BODY, MIND, ATTACK, M.ATTACK, AGILITY
Window_StatCompare.prototype.paramIdArray = function() {
	return [0, 1, 2, 4, 6];
};

// The allowed element resistances to draw
// BLUNT, SLASH, PIERCE, FIRE, OTHERWORDLY
Window_StatCompare.prototype.elementIdArray = function() {
	return [1, 2, 3, 4, 6];
};

// Configurations relating the width of names and values
Window_StatCompare.prototype.createWidths = function() {
	this._paramNameWidth = 0;
	this._bonusValueWidth = TY.Param.ValueSpacing;
	var valueWidth = ('').padZero(TY.Param.ValueWidth);
	this._paramValueWidth = this.textWidth(valueWidth);
	this._arrowWidth = this.textWidth('\u2192' + ' ');
	if (this.canDrawParams()) {
		this.getParamWidth();
	} else if (this.canDrawElements()) {
		this.getElementWidth();
	}
}

// Get the largest basic stat name width
Window_StatCompare.prototype.getParamWidth = function() {
	var params = this.paramIdArray();
	for (var i = 0; i < params.length; i++) {
		var param = TextManager.param(params[i]);
		var nameWidth = this.textWidth(param);
		this._paramNameWidth = Math.max(nameWidth, this._paramNameWidth);
    }
}

// Get the largest element resistance name width
Window_StatCompare.prototype.getElementWidth = function() {
	var elements = this.elementIdArray();
	for (var i = 0; i < elements.length; i++) {
		var element = $dataSystem.elements[elements[i]];
		var nameWidth = this.textWidth(element);
		this._paramNameWidth = Math.max(nameWidth, this._paramNameWidth);
    }
}

// Refresh the contents of the window
Window_StatCompare.prototype.refresh = function() {
	this.contents.clear();
	if (this.canDrawParams()) {
		this.drawPageLayout();
		this.drawParamList();
	} else if (this.canDrawElements()) {
		this.drawPageLayout();
		this.drawElementList();
	}
};

// Makes a list of basic stats to display
Window_StatCompare.prototype.drawParamList = function() {
	var params = this.paramIdArray();
	for (var i = 0; i < params.length; i++) {
		var paramId = params[i];
		var posY = this.lineHeight() * i;
		this.drawParam(0, posY, paramId);
	}
};

// Makes a list of element resistances to display
Window_StatCompare.prototype.drawElementList = function() {
	var elements = this.elementIdArray();
	for (var i = 0; i < elements.length; i++) {
		var elementId = elements[i];
		var posY = this.lineHeight() * i;
		this.drawElement(0, posY, elementId);
	}
};

// Draw the names and values of basic stats
// [Note] Alias for the original "drawItem" method
Window_StatCompare.prototype.drawParam = Window_StatCompare.prototype.drawItem;

// Draw the names and values of element resistances
Window_StatCompare.prototype.drawElement = function(x, y, elementId) {
    this.drawDarkRect(x, y, this.contents.width, this.lineHeight());
	this.drawElementName(y, elementId);
	this.drawOldElementValue(y, elementId);
	this.drawRightArrow(y);
	if (!this._tempActor) return;
	this.drawNewElementValue(y, elementId);
	this.drawElementDifference(y, elementId);
};

// Draw the name of an element from the database
Window_StatCompare.prototype.drawElementName = function(y, elementId) {
    var x = this.textPadding();
    this.changeTextColor(this.systemColor());
    this.drawText($dataSystem.elements[elementId], x, y, this._paramNameWidth);
};

// Format the value of an element resistance for better understanding
Window_StatCompare.prototype.formatElementValue = function(elementId, tempActor) {
	var target = tempActor ? this._tempActor : this._actor;
	var value = target.elementRate(elementId);
	return Math.round(((1 - value) * 100).toPrecision(3));
};

// Compares the current value and the new value of an element resistance
Window_StatCompare.prototype.getElementDifference = function(elementId) {
    var newValue = this.formatElementValue(elementId, true);
    var oldValue = this.formatElementValue(elementId, false);
	var diffValue = newValue - oldValue;
	this.applyDifferenceColor(diffValue);
    return [newValue, diffValue];
};

// Reflect a negative or positive difference with its appropriate color
Window_StatCompare.prototype.applyDifferenceColor = function(value) {
	this.changeTextColor(this.paramchangeTextColor(value));
};

// Draw the current value of an element resistance
Window_StatCompare.prototype.drawOldElementValue = function(y, elementId) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
    this.resetTextColor();
    var value = this.formatElementValue(elementId, false) + '%';
    this.drawText(value, x, y, this._paramValueWidth, 'right');
};

// Draw the new value of an element resistance
Window_StatCompare.prototype.drawNewElementValue = function(y, elementId) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var value = this.getElementDifference(elementId)[0] + '%';
    this.drawText(value, x, y, this._paramValueWidth, 'right');
};

// Draws the total gain/loss from changing a piece of equipment
Window_StatCompare.prototype.drawElementDifference = function(y, elementId) {
    var x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    var value = this.getElementDifference(elementId)[1];
    if (value === 0) return;
    var text = Yanfly.Util.toGroup(value);
    if (value > 0) {
      text = ' (+' + text + ')';
    } else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
};

// If allowed, will add arrows to the page text
Window_StatCompare.prototype.formatPageText = function(text, facing) {
	if (TY.Param.PageArrows) {
		return facing == 'left' ? '\u2190 '+ text : text + ' \u2192';
	} else {
		return text;
	}
};

// Display labels indicating the page layout
Window_StatCompare.prototype.drawPageLayout = function() {
	this.resetTextColor();
	var x = this.contents.width / 2;
	var y = this.lineHeight() * 6.3;
	var layoutWidth = TY.Param.PageTextWidth;
	var prevPageText = this.formatPageText(TY.Param.PrevPage, 'left');
	var nextPageText = this.formatPageText(TY.Param.NextPage, 'right');
    this.drawDarkRect(0, y, this.contents.width / 2, this.lineHeight());
    this.drawDarkRect(x, y, this.contents.width / 2, this.lineHeight());
	this.drawText(prevPageText, 32, y, layoutWidth, 'center');
	this.drawText(nextPageText, this.contents.width / 1.65, y, layoutWidth, 'center');
};

// Set the current displaying page
Window_StatCompare.prototype.setPage = function(value) {
    this._currentPage = value;
};

//==========================================================
	// Scene_Equip -- 
//==========================================================

// Check if the 'Window_StatCompare' is allowed to change its page
Scene_Equip.prototype.canChangeComparePage = function() {
	return this._lowerRightVisibility && this._compareWindow;
};

// Update the current displaying page information
Scene_Equip.prototype.updateLowerRightWindowTriggers = function() {
	if (!this.canChangeComparePage()) return;
	if (Input.isRepeated('left')) {
		this._compareWindow.setPage(1);
		this._compareWindow.createWidths();
		this._compareWindow.refresh();
	} else if (Input.isRepeated('right')) {
		this._compareWindow.setPage(2);
		this._compareWindow.createWidths();
		this._compareWindow.refresh();
	}
};