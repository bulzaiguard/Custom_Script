var mediaInfo;
var CurrentUser, ableToPet;
var notifyLogger = true;
var debug = false;
var showhiddenchat = false;
var autojoin = false;
var mentionlist = new Array();
//var staffchecker = false;
//var stafflist;
var autojoinAmount = undefined;
var abletToPetCheck = true, pets = true;
var petmessage = "/me purrs"
var specialDaphnePet = "/me purrs :thinking_face: treat her girly :thinking_face:"

//animedevs thingy for reloading
/*API.sendChat("! reloading"); setTimeout(function () { location.reload(true); }, 1000); }*/


//$("head").append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>');

//$('#chat-messages').append('<div class="cm message' + message.un + 'data-cid="8067032-1475604572587"><div class="badge-box clickable"><i class="bdg bdg-seab07"></i>	</div>	<div class="msg' +message.cid+ '">		<div class="from dj">			<i class="icon icon-chat-dj"></i>			<span class="un clickable">' +message.un+ '</span>			<span class="timestamp" style="display: inline;">' +message.timestamp+ '</span>		</div>		<div class="text">' +message.message+'</div></div></div>');
/*message.classes +*/
function showInChat(message) {
	$('#chat-messages').append('<div class="cm message' + message.un + '" data-cid="' + message.cid + '" style="opacity: 0.5;"><div class="badge-box clickable"><i class="bdg bdg-seab07"></i>	</div>	<div class="msg' + message.cid + '"><div class="from dj"><i class="icon icon-chat-dj"></i><span class="un clickable">' + message.un + '</span><span class="timestamp" style="display: inline;">[Notificationlog] ' + message.timestamp + '</span></div><div class="text">' + message.message + '</div><div class="rcs-delete" style="display: none;">Hide</div></div></div>');
};

function log(message) {
	console.log(message);
}

function debuglogger(message) {
	if (debug == true) {
		console.log(message);
	}
}

function getMediaInfo() {
	mediaInfo = API.getMedia()
}

function chatLog(msg) {
	API.chatLog(msg);
}

function getNigtcore331StyleSheet() {
	cssdocs = document.styleSheets;
	for (var i = 0; i < cssdocs.length; i++) {
		if (cssdocs[i].ownerNode.baseURI === "https://plug.dj/nightcore-331") {
			console.log(cssdocs[i]);
			return cssdocs[i];
		}

	}
	return undefined;
}

function getCSSRULE(styleSheet, ruleName, deleteFlag) {
	if (styleSheet == undefined) {

	} else {
		var ii = 0;
		var cssRule = false
		do {                                             			// For each rule in stylesheet
			if (styleSheet.cssRules) {                    			// Browser uses cssRules?
				cssRule = styleSheet.cssRules[ii];        			// Yes --Mozilla Style
			} else {                                      			// Browser usses rules?
				cssRule = styleSheet.rules[ii];            			// Yes IE style. 
			}                                             			// End IE check.
			if (cssRule) {                               			// If we found a rule...
				if ((cssRule.selectorText.toLowerCase()).includes(ruleName)) { 	//  match ruleName?
					if (deleteFlag) {             					// Yes.  Are we deleteing?
						if (styleSheet.cssRules) {         			// Yes, deleting...
							styleSheet.deleteRule(ii + 1);        	// Delete rule, Moz Style
						} else {                             		// Still deleting.
							styleSheet.removeRule(ii + 1);        	// Delete rule IE style.
						}                                    		// End IE check.
						return true;                         		// return true, class deleted.
					} else {                                		// found and not deleting.
						return cssRule;                      		// return the style object.
					}                                       		// End delete Check
				}                                          			// End found rule name
			}                                             			// end found cssRule
			ii++;                                         			// Increment sub-counter
		} while (cssRule)                                			// end While loop
	}
}

function autojoinfunction() {
	//console.log("autojoin function entered")
	var pos = API.getWaitListPosition();
	var check = API.djJoin();
	debuglogger(pos);
	if (check == 0) {
		//console.log(pos);
		if (pos == -1) {
			var pos2 = API.getWaitListPosition();
			//console.log(pos2);
			if (pos2 != -1) {
				API.chatLog("succesfully joined");
				if (autojoinAmount != undefined) {
					autojoin = autojoin - 1;
					console.log(autojoinAmount + " autoplays left");
					chatLog(autojoinAmount + " autoplays left");
					if (autojoinAmount == 0 /*&& autojoinAmount != undefined*/) {
						autojoin = false;
						API.chatLog("autojoin now inactive: joined selected amount of times");
					}
				}
			}
		};
	};
};

API.on(API.CHAT, function (message) {
	//debuglogger(message);	
	//removing annoying color Nue Houjou
	//console.log(message.uid);	
	if (message.uid === 3927729) {
		console.log("Nue found");
		//$(".cm.id-3927729 .msg .from .un").css('color', '#7854a9 !important');
		//$(".id-3927729 span.un").attr('color','#7854a9' ,'important');
		$(".id-3927729 span.un").attr('style', 'color:#7854a9 !important');
	}

	if (showhiddenchat) {
		if (message.message.charAt(0) === "!") {
			//API.chatLog(message.un + ": " + message.message);
			showInChat(message);
		}
	}

	//probably never going to happen
	/*if(staffchecker){
		for(var i =0; i< stafflist.length;i++){			
			if(message.un === stafflist[i].name){
				
			}
		}		
	}*/
	ableToPet = ["S0M3DUDE", "Daphne-chan", "bulzai_guard", "bulzai_test", "AnimeDev"];
	
	if (pets) {
		//debuglogger("checking pets");				
		for (var i = 0; i < ableToPet.length; i++) {
			debuglogger(message)
			debuglogger("user checked: " + ableToPet[i]);
			var petCheck = "@" + ableToPet[i] + " pets @" + CurrentUser + "  :petme:";
			debuglogger(petCheck);
			if (message.message === petCheck) {
				if (ableToPet[i] === "Daphne-chan" && CurrentUser === "bulzai_guard") {
					API.sendChat();
				}
				else {
					API.sendChat(petmessage);
				}
			}
		}
	}

	if (notifyLogger) {
		if (message.type === "mention" && message.un != undefined) {

			debuglogger(message);
			debuglogger("added a mention");
			debuglogger(message.un + ": " + message.message);
			debuglogger("---------------");
			mentionlist.push(message)
		}
	}
});

//autojoin
API.on(API.WAIT_LIST_UPDATE, function (details) {
	//debuglogger(details);	
	if (autojoin && details.length <= 49) {
		//console.log("autojoinfuntion started");
		autojoinfunction();
	}
});

//not using this anymore
API.on(API.ADVANCE, function (details) {
	if (autojoin) {
		autojoinfunction();
	}
});

API.on(API.CHAT_COMMAND, function (value) {
	debuglogger(value + ' typed as chat command');
	var words = value.split(" ");
	var value1 = words[0].substring(1);

	debuglogger(words);
	debuglogger(value1);

	if (value1 === "autojoin" || value1 === "aj") {
		if (words[1] == undefined) { autojoin = !autojoin; }
		else { autojoin = true; }
		if (autojoin) {
			autojoinAmount = words[1];
			if (autojoinAmount == 0) {
				API.chatLog("cannot autojoin 0 times")
				API.chatLog("autojoin disabled")
				autojoin = false;
			}
			else {
				if (autojoinAmount != undefined) { API.chatLog("autojoin now active for: " + words[1] + "-plays"); }
				else { API.chatLog("autojoin now active"); }
				autojoinfunction();
			}

		}
		else { API.chatLog("autojoin now inactive"); }
	}

	else if (value1 === "getmedia" || value1 === "getVidInfo" || value1 === "gi") {
		getMediaInfo();
		window.open("http://polsy.org.uk/stuff/ytrestrict.cgi?ytid=" + mediaInfo.cid);
	}

	else if (value1 === "download" || value1 === "dl") {
		getMediaInfo();
		var uri = "https://youtube.com/watch?v=" + mediaInfo.cid;
		window.open('https://www.youtubeinmp3.com/fetch/?video=' + uri);
	}

	else if (value1 === "hiddenchat") {
		hiddenchat = !hiddenchat;
		if (hiddenchat) { API.chatLog("hiddenchat enabled"); }
		else { API.chatLog("hiddenchat disabled"); }
	}

	else if (value1 === "urban") {
		if (words[1] != null || words[1] != undefined) {
			var uri = " http://www.urbandictionary.com/define.php?term=" + words[1];
			window.open(uri);
		}
	}

	else if (value1 === "debugtog") {
		debug = !debug;
		chatLog("debug is now " + debug);
	}

	else if(value1 === "pettog"){
		pets = !pets;
		if(pets){
			chatLog("petting is now enabled")
		}
		else{
			chatLog("petting is now disabled")
		}		
	}
	else if(value1 === "abletToPetCheck"){
		abletToPetCheck = !abletToPetCheck;
		if(abletToPetCheck){
			chatLog("abletToPetCheck is now enabled")
		}
		else{
			chatLog("abletToPetCheck is now disabled")
		}	
	}
	else if (value1 === "petmessage") {
		if (words[1] != null || words[1] != undefined) {
			petmessage = words[1];
			for(var i = 2; i < words.length;i++){
				petmessage += " " + words[i];
			}
			chatLog('Petmessage is now: ' + petmessage);
		}
	}

	else if (value1 === "Nreset") {
		mentionlist = new Array();
	}

	else if (value1 === "Nlogger") {
		notifyLogger = !notifyLogger;
		chatLog("notifyLogger is now " + notifyLogger);
	}

	else if (value1 === "Nlist") {
		debuglogger(mentionlist);
		for (var i = 0; i < mentionlist.length; i++) {
			debuglogger(mentionlist[i]);
			showInChat(mentionlist[i]);
		};
	}
	else if (value1 === "getplaylists") {
		getplaylistinfo();
	}
	else if (value1 === "logplaylists") {
		if (playlistarray[0] != null || playlistarray[0] != undefined) {
			playlistarray.sort(function (a, b) {
				var nameA = a.name.toLowerCase(); // ignore upper and lowercase
				var nameB = b.name.toLowerCase(); // ignore upper and lowercase
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}

				// names must be equal
				return 0;
			});
			console.log(playlistarray);
		}
	}
	else if (value1 === "rl") {
		location.reload(true);
	}

	//not needed anymore toaster has the !staff command for resdj (nightcore-331)
	/*else if(value1 ==="getStaff"){
			stafflist = API.getStaff();
			console.log(stafflist);
		}*/

});

function getplaylistinfo() {
	$.ajax({
		url: 'https://plug.dj/_/playlists',
		dataType: 'json',
		success: function (json) {
			//console.log(json.data);			
			for (var i = 0; i < json.data.length; i++) {
				getsongs(json.data[i]);
			}

		}
	});
}

var playlistarray = new Array();

function getsongs(data) {
	$.ajax({
		url: 'https://plug.dj/_/playlists/' + data.id + '/media	',
		dataType: 'json',
		success: function (songs) {
			//console.log(songs.data);
			//for(var i = 0; i<songs.data.length;i++)
			var playlist = { name: data.name, songs: songs.data }
			//console.log(playlist);
			playlistarray.push(playlist);
		}
	});
}




function arrayChatLogger(item, index) {
	chatLog(item);
}

function getUser() {
	var temp = API.getUser();
	CurrentUser = temp.username;
	if (CurrentUser === "bulzai_guard") {
		autojoin = true;
		debug = true;
		pets = true;
	}
	console.log("@" + CurrentUser);
};

getUser();
if (debug) {
	API.chatLog("API testprogram loadedV6");
	chatLog("debug on");
} else {
	API.chatLog("API program loaded");
}



//WIP
var sentence = String(".msg .from .un, #user-lists .list.room .user.role-manager.id-3927729 .name {");
getCSSRULE(getNigtcore331StyleSheet, sentence, true)

