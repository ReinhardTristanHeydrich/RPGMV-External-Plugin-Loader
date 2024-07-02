(function() { 

	//==========================================================
		// VERSION 1.1.0 -- by Toby Yasha
	//==========================================================
	
		// This mod has been commissioned by s0mthinG.

		// Pause in-game effects like hunger, sanity and bleeding
		// while a dialogue window is displaying text.

		// NOTE: This does not apply to the temporary dialogue window
		// which can appear when crow mauler spawned in the
		// map for example. (Gab Window)
	
	//==========================================================
		// Mod Notes -- 
	//==========================================================

		// keep an eye on common event number 89-91 (crow mauler)

		// MISC COMMON EVENTS IN FnH1
		// 82 - Demon Baby Growing
		// 148 - Le Garde Timer
		// 231 - Buckman Timer
		// 288 - Torch Timer
		// 304 - Miasma

		// HUNGER COMMON EVENTS IN FnH1
		// 124 - Girl
		// 125 - Knight
		// 126 - Mercenary
		// 127 - Dark Priest
		// 128 - Outlander
		// 129 - Le Garde
		// 130 - Moonless
		// 131 - Kid Demon
		// 132 - Marriage
		// 133 - Fusion
		// 134 - Baby Demon
		// 135 - Ghoul 1
		// 136 - Ghoul 2
		// 137 - Ghoul 3

		// SANITY COMMON EVENTS IN FnH1
		// 291 - Mahabre
		// 292 - Dark

		// MapId 1 - level1_A
		// MapId 3 - level1_3_A
		// MapId 4 - level1_2_A
		// MapId 5 - level2_A
		// MapId 6 - level3_A
		// MapId 7 - toilet
		// MapId 8 - level4_A
		// MapId 9 - level1_4_A
		// MapId 11 - level5_A
		// MapId 14 - tree_of_the_depths
		// MapId 16 - level6_1A
		// MapId 17 - god_of_the_depths
		// MapId 18 - thicket_1_A
		// MapId 19 - thicket_2_A
		// MapId 20 - level6_2A
		// MapId 21 - thicket_3_A
		// MapId 22 - huts_village
		// MapId 23 - Staircase
		// MapId 24 - level7_A
		// MapId 26 - Mahabre1_1_A
		// MapId 27 - Mahabre1_2_A
		// MapId 29 - level1_B
		// MapId 30 - level6_2_Crash
		// MapId 31 - Level1_3_B
		// MapId 32 - toilet (yes, there are 2 of these maps)
		// MapId 37 - level3_B
		// MapId 38 - level4_B
		// MapId 39 - level5_B
		// MapId 44 - thicket_1_B
		// MapId 45 - thicket_2_B
		// MapId 46 - thicket_3_B
		// MapId 51 - level1_C
		// MapId 53 - Level1_3_C
		// MapId 54 - toilet (was there a need for 3 identical maps?)
		// MapId 59 - level3_C
		// MapId 60 - thicket_4_A (not sure if used in-game)
		// MapId 62 - Smash_pit
		// MapId 63 - Rondon_inside2
		// MapId 65 - Level8_2_A
		// MapId 66 - thicket_1_C
		// MapId 67 - thicket_2_C
		// MapId 68 - thicket_3_C
		// MapId 71 - Staircase
		// MapId 74 - Fortress
		// MapId 75 - Level3_Basement_A
		// MapId 76 - Level1_Basement_A
		// MapId 77 - Level2_Basement_A
		// MapId 78 - Temple of Torment
		// MapId 79 - Temple of Torment_merc
		// MapId 80 - Back_alleys
		// MapId 81 - Temple of Torment_out
		// MapId 82 - Temple of Torment_knight
		// MapId 83 - Temple of Torment_dark
		// MapId 84 - Temple of Torment_captain
		// MapId 85 - Temple of Torment_empty
		// MapId 87 - Mahabre_inside1
		// MapId 93 - Level8_A
		// MapId 96 - golden_temple
		// MapId 100 - Center_square
		// MapId 101 - Passageway
		// MapId 102 - Ma'habre_Tower
		// MapId 103 - Temple_district
		// MapId 104 - Grand_library
		// MapId 105 - Grand_library_inner
		// MapId 106 - pit_of_enlightenment
		// MapId 107 - Mahabre_inside2
		// MapId 108 - Ancient_Passageway
		// MapId 109 - Ancient_Center_square
		// MapId 110 - Ancient_Back_alleys
		// MapId 111 - Ancient_1_2_A
		// MapId 112 - Ancient_Tower
		// MapId 113 - Ancient_Temple_district
		// MapId 114 - Ancient_inside2
		// MapId 115 - Ancient_inside1
		// MapId 116 - Ancient_Grand_library
		// MapId 117 - Ancient_Grand_library_inner
		// MapId 118 - Ancient_pit_of_enlightenment
		// MapId 119 - Tower of Endless
		// MapId 120 - Tower of Endless
		// MapId 121 - Golden_temple
		// MapId 122 - Ancient_Temple of Torment
		// MapId 123 - Temple of Torment_level2
		// MapId 124 - Flipside_Basement_A
		// MapId 125 - Golden_temple_inside
		// MapId 126 - Ancient_Golden_temple
		// MapId 127 - Golden_temple_inside
		// MapId 128 - level1_2_B
		// MapId 133 - Dream_Rondon
		// MapId 134 - Rondon_inside
		// MapId 135 - Dream_Oldegård
		// MapId 136 - Oldegård_house
		// MapId 139 - Ancient_cave_entrance
		// MapId 141 - deeper_thicket
		// MapId 142 - Level 9
		// MapId 143 - Ancient_cave
		// MapId 145 - Level9_trap
		// MapId 146 - Golden_temple_inside2
		// MapId 148 - Ancient_tomb
		// MapId 149 - Ancient_tomb_gods
		// MapId 150 - Mahabre_tomb
		// MapId 151 - Mahabre_tomb_gods
		// MapId 153 - Mahabre_Ancient_cave
		// MapId 154 - Ancient1_1_A
		// MapId 155 - Ancient_passage
		// MapId 160 - The_Void
		// MapId 163 - Level3_Basement_Corridor
		// MapId 164 - Mahabre1_2_Book
		// MapId 165 - Caverns (school days)
		// MapId 166 - Tombs (school days)
		// MapId 167 - Blood pit (school days)
		// MapId 168 - Overworld (school days)
		// MapId 171 - Dungeons (school days)
		// MapId 172 - Prisons (school days)
		// MapId 174 - Mines (school days)
		// MapId 175 - Ancient_inside
		// MapId 177 - Inside3 (school days)
		// MapId 181 - Prom (school days)
		// MapId 182 - Level2_Basement_B
		// MapId 183 - level1_D
		// MapId 184 - level5_C
		// MapId 185 - The_Void2

	//==========================================================
		// Mod Parameters -- 
	//==========================================================

		// The following settings are meant to be edited by users:

		const eventFrameDelay = 90;

		/*
			EXPLANATION:

			eventFrameDelay -
				After dialogue has ended delay map events / common events
				for this many frames.

				NOTE: This can be useful if trying to avoid threats like
				the Yellow Mage's special attack on the map.

				NOTE: Every 60 frames are equal to 1 second.

				DEFAULT: 90
		*/

	//==========================================================
		// Mod Configurations -- 
	//==========================================================

		function getMiscMapEvents() { // ONLY FNH1 FOR NOW
			const mapEvents = [
				{ mapId: 1, eventId: 27  }, // Blood
				{ mapId: 1, eventId: 29  }, // Bleeding
				{ mapId: 1, eventId: 131 }, // Sanity Loss
				{ mapId: 1, eventId: 133 }, // Sanity Gain

				{ mapId: 3, eventId: 9   }, // Blood
				{ mapId: 3, eventId: 13  }, // Bleeding
				{ mapId: 3, eventId: 138 }, // Sanity Loss
				{ mapId: 3, eventId: 148 }, // Sanity Gain

				{ mapId: 4, eventId: 26  }, // Blood
				{ mapId: 4, eventId: 23  }, // Bleeding
				{ mapId: 4, eventId: 28  }, // Sanity Gain

				{ mapId: 5, eventId: 24  }, // Blood
				{ mapId: 5, eventId: 20  }, // Bleeding
				{ mapId: 5, eventId: 26  }, // Sanity Loss

				{ mapId: 6, eventId: 28  }, // Blood
				{ mapId: 6, eventId: 25  }, // Bleeding
				{ mapId: 6, eventId: 54  }, // Sanity Loss
				{ mapId: 6, eventId: 58  }, // Sanity Gain
				{ mapId: 6, eventId: 156 }, // Arrow Check

				{ mapId: 7, eventId: 10  }, // Blood
				{ mapId: 7, eventId: 7   }, // Bleeding
				{ mapId: 7, eventId: 6   }, // Sanity Loss

				{ mapId: 8, eventId: 22  }, // Blood
				{ mapId: 8, eventId: 19  }, // Bleeding
				{ mapId: 8, eventId: 98  }, // Sanity Loss

				{ mapId: 9, eventId: 24  }, // Blood
				{ mapId: 9, eventId: 21  }, // Bleeding
				{ mapId: 9, eventId: 99  }, // Sanity Gain

				{ mapId: 11, eventId: 36  }, // Blood
				{ mapId: 11, eventId: 33  }, // Bleeding
				{ mapId: 11, eventId: 60  }, // Sanity Loss
				{ mapId: 11, eventId: 61  }, // Sanity Gain
				{ mapId: 11, eventId: 176 }, // Yellow Mage Dance

				{ mapId: 14, eventId: 24  }, // Blood
				{ mapId: 14, eventId: 21  }, // Bleeding
				{ mapId: 14, eventId: 26  }, // Sanity Gain

				{ mapId: 16, eventId: 51  }, // Blood
				{ mapId: 16, eventId: 53  }, // Bleeding
				{ mapId: 16, eventId: 66  }, // Sanity Loss
				{ mapId: 16, eventId: 67  }, // Sanity Gain
				{ mapId: 16, eventId: 172 }, // Yellow Mage Dance

				{ mapId: 17, eventId: 26  }, // Blood
				{ mapId: 17, eventId: 23  }, // Bleeding
				{ mapId: 17, eventId: 14  }, // Sanity Loss

				{ mapId: 18, eventId: 26  }, // Blood
				{ mapId: 18, eventId: 23  }, // Bleeding
				{ mapId: 18, eventId: 65  }, // Sanity Loss

				{ mapId: 19, eventId: 26  }, // Blood
				{ mapId: 19, eventId: 23  }, // Bleeding
				{ mapId: 19, eventId: 153 }, // Sanity Loss

				{ mapId: 20, eventId: 51  }, // Blood
				{ mapId: 20, eventId: 53  }, // Bleeding
				{ mapId: 20, eventId: 66  }, // Sanity Loss
				{ mapId: 20, eventId: 67  }, // Sanity Gain

				{ mapId: 21, eventId: 26  }, // Blood
				{ mapId: 21, eventId: 23  }, // Bleeding
				{ mapId: 21, eventId: 104 }, // Sanity Loss

				{ mapId: 22, eventId: 24  }, // Blood
				{ mapId: 22, eventId: 21  }, // Bleeding
				{ mapId: 22, eventId: 26  }, // Sanity Loss

				{ mapId: 23, eventId: 24  }, // Blood
				{ mapId: 23, eventId: 21  }, // Bleeding
				{ mapId: 23, eventId: 26  }, // Sanity Loss

				{ mapId: 24, eventId: 26  }, // Blood
				{ mapId: 24, eventId: 23  }, // Bleeding
				{ mapId: 24, eventId: 17  }, // Sanity Loss
				{ mapId: 24, eventId: 98  }, // Sanity Gain

				{ mapId: 26, eventId: 26  }, // Blood
				{ mapId: 26, eventId: 23  }, // Bleeding
				{ mapId: 26, eventId: 28  }, // Sanity Loss
				{ mapId: 26, eventId: 11  }, // Mahabre Timer
				{ mapId: 26, eventId: 12  }, // Mahabre Timer

				{ mapId: 27, eventId: 26  }, // Blood
				{ mapId: 27, eventId: 23  }, // Bleeding
				{ mapId: 27, eventId: 28  }, // Sanity Loss

				{ mapId: 29, eventId: 27  }, // Blood
				{ mapId: 29, eventId: 29  }, // Bleeding
				{ mapId: 29, eventId: 131 }, // Sanity Loss
				{ mapId: 29, eventId: 133 }, // Sanity Gain

				{ mapId: 30, eventId: 51  }, // Blood
				{ mapId: 30, eventId: 53  }, // Bleeding
				{ mapId: 30, eventId: 66  }, // Sanity Loss
				{ mapId: 30, eventId: 67  }, // Sanity Gain

				{ mapId: 31, eventId: 9   }, // Blood
				{ mapId: 31, eventId: 13  }, // Bleeding
				{ mapId: 31, eventId: 138 }, // Sanity Loss
				{ mapId: 31, eventId: 148 }, // Sanity Gain

				{ mapId: 32, eventId: 10  }, // Blood
				{ mapId: 32, eventId: 7   }, // Bleeding
				{ mapId: 32, eventId: 6   }, // Sanity Loss

				{ mapId: 37, eventId: 28  }, // Blood
				{ mapId: 37, eventId: 25  }, // Bleeding
				{ mapId: 37, eventId: 54  }, // Sanity Loss
				{ mapId: 37, eventId: 58  }, // Sanity Gain
				{ mapId: 37, eventId: 156 }, // Arrow Check

				{ mapId: 38, eventId: 22  }, // Blood
				{ mapId: 38, eventId: 19  }, // Bleeding
				{ mapId: 38, eventId: 98  }, // Sanity Loss

				{ mapId: 39, eventId: 36  }, // Blood
				{ mapId: 39, eventId: 33  }, // Bleeding
				{ mapId: 39, eventId: 60  }, // Sanity Loss
				{ mapId: 39, eventId: 61  }, // Sanity Gain
				{ mapId: 39, eventId: 176 }, // Yellow Mage Dance

				{ mapId: 44, eventId: 26  }, // Blood
				{ mapId: 44, eventId: 23  }, // Bleeding
				{ mapId: 44, eventId: 28  }, // Sanity Loss

				{ mapId: 45, eventId: 26  }, // Blood
				{ mapId: 45, eventId: 23  }, // Bleeding
				{ mapId: 45, eventId: 163 }, // Sanity Loss

				{ mapId: 46, eventId: 26  }, // Blood
				{ mapId: 46, eventId: 23  }, // Bleeding
				{ mapId: 46, eventId: 109 }, // Sanity Loss

				{ mapId: 51, eventId: 27  }, // Blood
				{ mapId: 51, eventId: 29  }, // Bleeding
				{ mapId: 51, eventId: 131 }, // Sanity Loss
				{ mapId: 51, eventId: 133 }, // Sanity Gain

				{ mapId: 53, eventId: 9   }, // Blood
				{ mapId: 53, eventId: 13  }, // Bleeding
				{ mapId: 53, eventId: 138 }, // Sanity Loss
				{ mapId: 53, eventId: 148 }, // Sanity Gain

				{ mapId: 54, eventId: 10  }, // Blood
				{ mapId: 54, eventId: 7   }, // Bleeding
				{ mapId: 54, eventId: 6   }, // Sanity Loss

				{ mapId: 59, eventId: 28  }, // Blood
				{ mapId: 59, eventId: 25  }, // Bleeding
				{ mapId: 59, eventId: 54  }, // Sanity Loss
				{ mapId: 59, eventId: 58  }, // Sanity Gain
				{ mapId: 59, eventId: 156 }, // Arrow Check

				{ mapId: 60, eventId: 26  }, // Blood
				{ mapId: 60, eventId: 23  }, // Bleeding
				{ mapId: 60, eventId: 153 }, // Sanity Loss

				{ mapId: 62, eventId: 28  }, // Blood
				{ mapId: 62, eventId: 25  }, // Bleeding
				{ mapId: 62, eventId: 54  }, // Sanity Loss
				{ mapId: 62, eventId: 58  }, // Sanity Gain

				{ mapId: 63, eventId: 9   }, // Blood
				{ mapId: 63, eventId: 13  }, // Bleeding
				{ mapId: 63, eventId: 148 }, // Sanity Loss

				{ mapId: 65, eventId: 9   }, // Blood
				{ mapId: 65, eventId: 13  }, // Bleeding
				{ mapId: 65, eventId: 148 }, // Sanity Loss
				{ mapId: 65, eventId: 88  }, // Gas Trap Control
				{ mapId: 65, eventId: 105 }, // Gas Trap Poison
				{ mapId: 65, eventId: 245 }, // Gas Trap Control
				{ mapId: 65, eventId: 246 }, // Gas Trap Poison
				{ mapId: 65, eventId: 300 }, // Yellow Mage Dance

				{ mapId: 66, eventId: 26  }, // Blood
				{ mapId: 66, eventId: 23  }, // Bleeding
				{ mapId: 66, eventId: 28  }, // Sanity Loss

				{ mapId: 67, eventId: 26  }, // Blood
				{ mapId: 67, eventId: 23  }, // Bleeding
				{ mapId: 67, eventId: 28  }, // Sanity Loss

				{ mapId: 68, eventId: 26  }, // Blood
				{ mapId: 68, eventId: 23  }, // Bleeding
				{ mapId: 68, eventId: 17  }, // Sanity Loss

				{ mapId: 71, eventId: 24  }, // Blood
				{ mapId: 71, eventId: 21  }, // Bleeding
				{ mapId: 71, eventId: 26  }, // Sanity Loss

				{ mapId: 74, eventId: 26  }, // Blood
				{ mapId: 74, eventId: 23  }, // Bleeding
				{ mapId: 74, eventId: 111 }, // Hound Timer 1
				{ mapId: 74, eventId: 112 }, // Hound Timer 2

				{ mapId: 75, eventId: 26  }, // Blood
				{ mapId: 75, eventId: 23  }, // Bleeding
				{ mapId: 75, eventId: 151 }, // Sanity Gain

				{ mapId: 76, eventId: 26  }, // Blood
				{ mapId: 76, eventId: 23  }, // Bleeding
				{ mapId: 76, eventId: 12  }, // Sanity Loss

				{ mapId: 77, eventId: 26  }, // Blood
				{ mapId: 77, eventId: 23  }, // Bleeding
				{ mapId: 77, eventId: 147 }, // Sanity Loss

				{ mapId: 78, eventId: 26  }, // Blood
				{ mapId: 78, eventId: 23  }, // Bleeding
				{ mapId: 78, eventId: 147 }, // Sanity Loss

				{ mapId: 79, eventId: 26  }, // Blood
				{ mapId: 79, eventId: 23  }, // Bleeding
				{ mapId: 79, eventId: 147 }, // Sanity Loss

				{ mapId: 80, eventId: 26  }, // Blood
				{ mapId: 80, eventId: 23  }, // Bleeding
				{ mapId: 80, eventId: 28  }, // Sanity Loss
				{ mapId: 80, eventId: 418 }, // Sanity Gain

				{ mapId: 81, eventId: 26  }, // Blood
				{ mapId: 81, eventId: 23  }, // Bleeding
				{ mapId: 81, eventId: 147 }, // Sanity Loss

				{ mapId: 82, eventId: 26  }, // Blood
				{ mapId: 82, eventId: 23  }, // Bleeding
				{ mapId: 82, eventId: 147 }, // Sanity Loss

				{ mapId: 83, eventId: 26  }, // Blood
				{ mapId: 83, eventId: 23  }, // Bleeding
				{ mapId: 83, eventId: 147 }, // Sanity Loss

				{ mapId: 84, eventId: 26  }, // Blood
				{ mapId: 84, eventId: 23  }, // Bleeding
				{ mapId: 84, eventId: 147 }, // Sanity Loss

				{ mapId: 85, eventId: 26  }, // Blood
				{ mapId: 85, eventId: 23  }, // Bleeding
				{ mapId: 85, eventId: 147 }, // Sanity Loss

				{ mapId: 87, eventId: 26  }, // Blood
				{ mapId: 87, eventId: 23  }, // Bleeding
				{ mapId: 87, eventId: 147 }, // Sanity Loss

				{ mapId: 93, eventId: 9   }, // Blood
				{ mapId: 93, eventId: 13  }, // Bleeding
				{ mapId: 93, eventId: 148 }, // Sanity Loss

				{ mapId: 96, eventId: 26  }, // Blood
				{ mapId: 96, eventId: 23  }, // Bleeding
				{ mapId: 96, eventId: 28  }, // Sanity Gain

				{ mapId: 100, eventId: 9   }, // Blood
				{ mapId: 100, eventId: 13  }, // Bleeding
				{ mapId: 100, eventId: 148 }, // Sanity Loss

				{ mapId: 101, eventId: 9   }, // Blood
				{ mapId: 101, eventId: 13  }, // Bleeding
				{ mapId: 101, eventId: 51  }, // Sanity Loss
				{ mapId: 101, eventId: 138 }, // Sanity Loss (yeah..there are 2 sanity lose events)

				{ mapId: 102, eventId: 9   }, // Blood
				{ mapId: 102, eventId: 13  }, // Bleeding
				{ mapId: 102, eventId: 126 }, // Sanity Loss

				{ mapId: 103, eventId: 9   }, // Blood
				{ mapId: 103, eventId: 13  }, // Bleeding
				{ mapId: 103, eventId: 138 }, // Sanity Loss

				{ mapId: 104, eventId: 9   }, // Blood
				{ mapId: 104, eventId: 13  }, // Bleeding
				{ mapId: 104, eventId: 148 }, // Sanity Loss

				{ mapId: 105, eventId: 9   }, // Blood
				{ mapId: 105, eventId: 13  }, // Bleeding
				{ mapId: 105, eventId: 148 }, // Sanity Loss

				{ mapId: 106, eventId: 9   }, // Blood
				{ mapId: 106, eventId: 13  }, // Bleeding
				{ mapId: 106, eventId: 148 }, // Sanity Loss

				{ mapId: 107, eventId: 26  }, // Blood
				{ mapId: 107, eventId: 23  }, // Bleeding
				{ mapId: 107, eventId: 147 }, // Sanity Loss

				{ mapId: 108, eventId: 9   }, // Blood
				{ mapId: 108, eventId: 13  }, // Bleeding
				{ mapId: 108, eventId: 138 }, // Sanity Loss

				{ mapId: 109, eventId: 9   }, // Blood
				{ mapId: 109, eventId: 13  }, // Bleeding
				{ mapId: 109, eventId: 138 }, // Sanity Loss
				{ mapId: 109, eventId: 148 }, // Sanity Gain

				{ mapId: 110, eventId: 26  }, // Blood
				{ mapId: 110, eventId: 23  }, // Bleeding
				{ mapId: 110, eventId: 28  }, // Sanity Gain

				{ mapId: 111, eventId: 26  }, // Blood
				{ mapId: 111, eventId: 23  }, // Bleeding
				{ mapId: 111, eventId: 28  }, // Sanity Gain

				{ mapId: 112, eventId: 9   }, // Blood
				{ mapId: 112, eventId: 13  }, // Bleeding
				{ mapId: 112, eventId: 112 }, // Sanity Loss

				{ mapId: 113, eventId: 9   }, // Blood
				{ mapId: 113, eventId: 13  }, // Bleeding
				{ mapId: 113, eventId: 138 }, // Sanity Loss

				{ mapId: 114, eventId: 26  }, // Blood
				{ mapId: 114, eventId: 23  }, // Bleeding
				{ mapId: 114, eventId: 147 }, // Sanity Loss

				{ mapId: 115, eventId: 26  }, // Blood
				{ mapId: 115, eventId: 23  }, // Bleeding
				{ mapId: 115, eventId: 147 }, // Sanity Loss

				{ mapId: 116, eventId: 9   }, // Blood
				{ mapId: 116, eventId: 13  }, // Bleeding
				{ mapId: 116, eventId: 138 }, // Sanity Loss

				{ mapId: 117, eventId: 9   }, // Blood
				{ mapId: 117, eventId: 13  }, // Bleeding
				{ mapId: 117, eventId: 117 }, // Sanity Loss

				{ mapId: 118, eventId: 9   }, // Blood
				{ mapId: 118, eventId: 13  }, // Bleeding
				{ mapId: 118, eventId: 148 }, // Sanity Loss

				{ mapId: 119, eventId: 26  }, // Blood
				{ mapId: 119, eventId: 23  }, // Bleeding
				{ mapId: 119, eventId: 147 }, // Sanity Loss

				{ mapId: 120, eventId: 26  }, // Blood
				{ mapId: 120, eventId: 23  }, // Bleeding
				{ mapId: 120, eventId: 147 }, // Sanity Loss

				{ mapId: 121, eventId: 9   }, // Blood
				{ mapId: 121, eventId: 13  }, // Bleeding
				{ mapId: 121, eventId: 148 }, // Sanity Loss

				{ mapId: 122, eventId: 26  }, // Blood
				{ mapId: 122, eventId: 23  }, // Bleeding
				{ mapId: 122, eventId: 147 }, // Sanity Loss

				{ mapId: 123, eventId: 26  }, // Blood
				{ mapId: 123, eventId: 23  }, // Bleeding
				{ mapId: 123, eventId: 147 }, // Sanity Loss

				{ mapId: 124, eventId: 26  }, // Blood
				{ mapId: 124, eventId: 23  }, // Bleeding
				{ mapId: 124, eventId: 147 }, // Sanity Loss

				{ mapId: 125, eventId: 9   }, // Blood
				{ mapId: 125, eventId: 13  }, // Bleeding
				{ mapId: 125, eventId: 148 }, // Sanity Loss

				{ mapId: 126, eventId: 9   }, // Blood
				{ mapId: 126, eventId: 13  }, // Bleeding
				{ mapId: 126, eventId: 138 }, // Sanity Loss

				{ mapId: 127, eventId: 9   }, // Blood
				{ mapId: 127, eventId: 13  }, // Bleeding
				{ mapId: 127, eventId: 138 }, // Sanity Loss

				{ mapId: 128, eventId: 26  }, // Blood
				{ mapId: 128, eventId: 23  }, // Bleeding
				{ mapId: 128, eventId: 28  }, // Sanity Gain

				{ mapId: 133, eventId: 9   }, // Blood
				{ mapId: 133, eventId: 13  }, // Bleeding
				{ mapId: 133, eventId: 148 }, // Sanity Loss

				{ mapId: 134, eventId: 9   }, // Blood
				{ mapId: 134, eventId: 13  }, // Bleeding
				{ mapId: 134, eventId: 148 }, // Sanity Loss

				{ mapId: 135, eventId: 9   }, // Blood
				{ mapId: 135, eventId: 13  }, // Bleeding
				{ mapId: 135, eventId: 148 }, // Sanity Gain

				{ mapId: 136, eventId: 9   }, // Blood
				{ mapId: 136, eventId: 13  }, // Bleeding
				{ mapId: 136, eventId: 148 }, // Sanity Loss

				{ mapId: 139, eventId: 26  }, // Blood
				{ mapId: 139, eventId: 23  }, // Bleeding
				{ mapId: 139, eventId: 147 }, // Sanity Loss

				{ mapId: 141, eventId: 26  }, // Blood
				{ mapId: 141, eventId: 23  }, // Bleeding
				{ mapId: 141, eventId: 104 }, // Sanity Loss

				{ mapId: 142, eventId: 9   }, // Blood
				{ mapId: 142, eventId: 13  }, // Bleeding
				{ mapId: 142, eventId: 148 }, // Sanity Loss

				{ mapId: 143, eventId: 26  }, // Blood
				{ mapId: 143, eventId: 23  }, // Bleeding
				{ mapId: 143, eventId: 147 }, // Sanity Loss / Gain

				{ mapId: 145, eventId: 9   }, // Blood
				{ mapId: 145, eventId: 13  }, // Bleeding
				{ mapId: 145, eventId: 148 }, // Sanity Loss

				{ mapId: 146, eventId: 9   }, // Blood
				{ mapId: 146, eventId: 13  }, // Bleeding
				{ mapId: 146, eventId: 148 }, // Sanity Loss

				{ mapId: 148, eventId: 26  }, // Blood
				{ mapId: 148, eventId: 23  }, // Bleeding
				{ mapId: 148, eventId: 147 }, // Sanity Loss

				{ mapId: 149, eventId: 26  }, // Blood
				{ mapId: 149, eventId: 23  }, // Bleeding
				{ mapId: 149, eventId: 147 }, // Sanity Loss

				{ mapId: 150, eventId: 26  }, // Blood
				{ mapId: 150, eventId: 23  }, // Bleeding
				{ mapId: 150, eventId: 147 }, // Sanity Loss

				{ mapId: 151, eventId: 26  }, // Blood
				{ mapId: 151, eventId: 23  }, // Bleeding
				{ mapId: 151, eventId: 147 }, // Sanity Loss

				{ mapId: 153, eventId: 26  }, // Blood
				{ mapId: 153, eventId: 23  }, // Bleeding
				{ mapId: 153, eventId: 147 }, // Sanity Loss

				{ mapId: 154, eventId: 26  }, // Blood
				{ mapId: 154, eventId: 23  }, // Bleeding
				{ mapId: 154, eventId: 28  }, // Sanity Loss

				{ mapId: 155, eventId: 26  }, // Blood
				{ mapId: 155, eventId: 23  }, // Bleeding
				{ mapId: 155, eventId: 147 }, // Sanity Loss

				{ mapId: 160, eventId: 9   }, // Blood
				{ mapId: 160, eventId: 13  }, // Bleeding
				{ mapId: 160, eventId: 138 }, // Sanity Loss

				{ mapId: 163, eventId: 26  }, // Blood
				{ mapId: 163, eventId: 23  }, // Bleeding
				{ mapId: 163, eventId: 151 }, // Sanity Loss

				{ mapId: 164, eventId: 26  }, // Blood
				{ mapId: 164, eventId: 23  }, // Bleeding
				{ mapId: 164, eventId: 28  }, // Sanity Gain

				{ mapId: 165, eventId: 22  }, // Blood
				{ mapId: 165, eventId: 19  }, // Bleeding
				{ mapId: 165, eventId: 187 }, // Sanity Loss

				{ mapId: 166, eventId: 26  }, // Blood
				{ mapId: 166, eventId: 23  }, // Bleeding
				{ mapId: 166, eventId: 147 }, // Sanity Loss

				{ mapId: 167, eventId: 24  }, // Blood
				{ mapId: 167, eventId: 20  }, // Bleeding
				{ mapId: 167, eventId: 26  }, // Sanity Loss

				{ mapId: 168, eventId: 9   }, // Blood
				{ mapId: 168, eventId: 13  }, // Bleeding
				{ mapId: 168, eventId: 138 }, // Sanity Loss
				{ mapId: 168, eventId: 148 }, // Sanity Gain

				{ mapId: 171, eventId: 27  }, // Blood
				{ mapId: 171, eventId: 29  }, // Bleeding
				{ mapId: 171, eventId: 131 }, // Sanity Loss
				{ mapId: 171, eventId: 133 }, // Sanity Gain

				{ mapId: 172, eventId: 28 }, // Blood
				{ mapId: 172, eventId: 25 }, // Bleeding
				{ mapId: 172, eventId: 54 }, // Sanity Loss
				{ mapId: 172, eventId: 58 }, // Sanity Gain

				{ mapId: 174, eventId: 51 }, // Blood
				{ mapId: 174, eventId: 53 }, // Bleeding
				{ mapId: 174, eventId: 66 }, // Sanity Loss
				{ mapId: 174, eventId: 67 }, // Sanity Gain

				{ mapId: 175, eventId: 26  }, // Blood
				{ mapId: 175, eventId: 23  }, // Bleeding
				{ mapId: 175, eventId: 147 }, // Sanity Loss

				{ mapId: 177, eventId: 27  }, // Blood
				{ mapId: 177, eventId: 29  }, // Bleeding

				{ mapId: 181, eventId: 9   }, // Blood
				{ mapId: 181, eventId: 13  }, // Bleeding
				{ mapId: 181, eventId: 138 }, // Sanity Loss
				{ mapId: 181, eventId: 148 }, // Sanity Gain

				{ mapId: 182, eventId: 26  }, // Blood
				{ mapId: 182, eventId: 23  }, // Bleeding
				{ mapId: 182, eventId: 147 }, // Sanity Loss

				{ mapId: 183, eventId: 27  }, // Blood
				{ mapId: 183, eventId: 29  }, // Bleeding
				{ mapId: 183, eventId: 131 }, // Sanity Loss
				{ mapId: 183, eventId: 133 }, // Sanity Gain

				{ mapId: 184, eventId: 36  }, // Blood
				{ mapId: 184, eventId: 33  }, // Bleeding
				{ mapId: 184, eventId: 60  }, // Sanity Loss
				{ mapId: 184, eventId: 61  }, // Sanity Gain
				{ mapId: 184, eventId: 176 }, // Yellow Mage Dance

				{ mapId: 185, eventId: 9   }, // Blood
				{ mapId: 185, eventId: 13  }, // Bleeding
				{ mapId: 185, eventId: 138 }, // Sanity Loss

			]

			return mapEvents;
		}

		function findMapEvent(eventId) {
			const currentMapId = $gameMap.mapId();
			const mapEventList = getMiscMapEvents();

			return mapEventList.find(event => event.mapId === currentMapId && event.eventId === eventId);
		}

		function isMapEventPaused(eventId) {
			const mapEvent = findMapEvent(eventId);
			return $gameMessage.isBusy() && !!mapEvent;
		}

		function getMiscCommonEvents() { // ONLY FNH1 FOR NOW
			const commonEventIds = [
				82, 148, 231, 288, 304
			];

			return commonEventIds;
		}

		function getHungerCommonEvents() { // ONLY FNH1 FOR NOW
			const commonEventIds = [
				124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137
			];

			return commonEventIds;
		}

		function makeCommonEventList() {
			const list1 = getMiscCommonEvents();
			const list2 = getHungerCommonEvents();
			return [...list1, ...list2];
		}

		function isCommonEventPaused(commonEventId) {
			const commonEventList = makeCommonEventList();
			return $gameMessage.isBusy() && commonEventList.includes(commonEventId);
		}

	//==========================================================
		// Game Configurations -- Game_Event
	//==========================================================

		Game_Event.prototype._interpreterPaused = false;

		// Flag used to determine if interpreter is running or not
		Game_Event.prototype.pauseIntrepreter = function(isPaused) {
			this._intrepreterPaused = isPaused;
		};

		// Check if the interpreter meets the conditions to be refreshed
		Game_Event.prototype.canRefreshIntrepreter = function() {
			return (
				this._interpreter &&
				this._interpreter._waitCount === 0 &&
				this._intrepreterPaused
			)
		};

		// If the interpreter was paused add a delay before resuming operations
		Game_Event.prototype.refreshIntrepreter = function() {
			if (this.canRefreshIntrepreter()) {
				this._interpreter.wait(eventFrameDelay);
				this.pauseIntrepreter(false);
			}
		};

		const Game_Event_updateParallel = Game_Event.prototype.updateParallel;
		Game_Event.prototype.updateParallel = function() {
			if (isMapEventPaused(this._eventId)) {
				this.pauseIntrepreter(true);
			} else {
				this.refreshIntrepreter();
				Game_Event_updateParallel.call(this);
			}
		};

	//==========================================================
		// Game Configurations -- Game_CommonEvent
	//==========================================================

		Game_CommonEvent.prototype._interpreterPaused = false;

		// Flag used to determine if interpreter is running or not
		Game_CommonEvent.prototype.pauseIntrepreter = function(isPaused) {
			this._intrepreterPaused = isPaused;
		};

		// Check if the interpreter meets the conditions to be refreshed
		Game_CommonEvent.prototype.canRefreshIntrepreter = function() {
			return (
				this._interpreter &&
				this._interpreter._waitCount === 0 &&
				this._intrepreterPaused
			)
		};

		// If the interpreter was paused add a delay before resuming operations
		Game_CommonEvent.prototype.refreshIntrepreter = function() {
			if (this.canRefreshIntrepreter()) {
				this._interpreter.wait(eventFrameDelay);
				this.pauseIntrepreter(false);
			}
		};

		const Game_CommonEvent_update = Game_CommonEvent.prototype.update;
		Game_CommonEvent.prototype.update = function() {
			if (isCommonEventPaused(this._commonEventId)) {
				this.pauseIntrepreter(true);
			} else {
				this.refreshIntrepreter();
				Game_CommonEvent_update.call(this);
			}
		};

})();