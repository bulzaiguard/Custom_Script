var mediaInfo;
var CurrentUser, CurrentUsername;
var notifyLogger = true;
var debug = false;
var showhiddenchat = false;
var autojoin = false;
var mentionlist = new Array();
var autojoinAmount = undefined;
var petchecktog = true, pets = true;
var petmessage = "/me purrs";
var specialDaphnePet = "/me purrs :thinking_face: treat her girly :thinking_face:";
var ableToPetList = ["S0M3DUDE", "Daphne-chan", "bulzai_guard", "bulzai_test", "AnimeDev"];

var deletemessage = false;
var date = new Date();
var bot = false;
var autoreloadbugfix = false;

//$("head").append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>');

//$('#chat-messages').append('<div class="cm message' + message.un + 'data-cid="8067032-1475604572587"><div class="badge-box clickable"><i class="bdg bdg-seab07"></i>	</div>	<div class="msg' +message.cid+ '">		<div class="from dj">			<i class="icon icon-chat-dj"></i>			<span class="un clickable">' +message.un+ '</span>			<span class="timestamp" style="display: inline;">' +message.timestamp+ '</span>		</div>		<div class="text">' +message.message+'</div></div></div>');
/*message.classes +*/
function showInChat(message) {
	$('#chat-messages').append('<div class="cm message' + message.un + '" data-cid="' + message.cid + '" style="opacity: 0.5;"><div class="badge-box clickable"><i class="bdg bdg-seab07"></i>	</div>	<div class="msg' + message.cid + '"><div class="from dj"><i class="icon icon-chat-dj"></i><span class="un clickable">' + message.un + '</span><span class="timestamp" style="display: inline;">[Notificationlog] ' + message.timestamp + '</span></div><div class="text">' + message.message + '</div><div class="rcs-delete" style="display: none;">Hide</div></div></div>');
};

function showCommands() {
	$('#chat-messages').append('<div class="cm rsshit sml message rs-log-booth-alert" id="rcs-' + date.getMilliseconds() + '" ><div class="badge-box"><i class="icon icon-chat-admin"></i></div><div class="msg"><div class="from"><span class="timestamp" style="display: inline;">8:23pm</span></div><div class="text">You can find my commands at: <a href="https://github.com/bulzaiguard/Custom_Script" target="_blank">https://github.com/bulzaiguard/Custom_Script</a></div></div><div class="rcs-delete" style="display: none;">Hide</div></div>');
}


function log(message) {
	console.log(message);
}

function debuglogger(message) {
	if (debug) {
		console.log(message);
	}
}

function getMediaInfo() {
	mediaInfo = API.getMedia()
}

function chatLog(msg) {
	API.chatLog(msg);
}

function autojoinfunction() {
	//console.log("autojoin function entered")
	var pos = API.getWaitListPosition();
	var check = API.djJoin();
	debuglogger("waitlistposition: "+pos);
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
					if (autojoinAmount == 0) {
						autojoin = false;
						API.chatLog("autojoin now inactive: joined selected amount of times");
					};
				};
			};
		};
	};
};


var afkcounter = false;
var afktimeout;
function chatTrigger(message) {
	//debuglogger(message);		
	debuglogger("message UID: "+ message.uid);
	var words = message.message.split(" ");

	//removing annoying color Nue Houjou
	if (message.uid === 3927729) {
		console.log("Nue found");
		$(".id-3927729 span.un").attr('style', 'color:#7854a9 !important');
	}

	if (deletemessage) {
		/*if(CurrentUser == undefined){
			CurrentUser = API.getUser();
		}*/		
		if (message.message.charAt(0) === "!" && message.uid === 8067032 && !(CurrentUsername === "bulzai_guard") ) {
			API.moderateDeleteChat(message.cid);
		}		
		else if(CurrentUser.role > 1 && message.message.charAt(0) === "$" && (message.uid === 17002889 || message.uid === 21102762) && CurrentUsername === "bulzai_guard"){
			API.moderateDeleteChat(message.cid);
		}
	}
	
	//WIP
	/*if(message.uid === 8067032 && CurrentUsername === "bulzai_guard" && !(message.message === "!busy")){
		if(afkcounter){
			clearTimeout(afktimeout);
			console.log("timer cleared");
		}
		afkcounter = true;
		//setTimeout(function(){console.log("15mins past")},900000)
		afktimeout = setTimeout(sendbusy,1800000);	
		afkcounter = true;
		console.log('setTimeout started');
	}else if(message.uid === 8067032 && CurrentUsername === "bulzai_guard" && message.message === "!afk"){
		clearTimeout(afktimeout);
	}*/

	if (showhiddenchat) {
		if (message.message.charAt(0) === "!") {
			showInChat(message);
		}
	}

	//toaster UID: 12386384	
	if (message.type === "mention") { debuglogger("mentionmessage: " + message); }
	if (pets && message.uid == 12386384 && message.type === "emote" && message.un != undefined) {
		debuglogger("checking pets");
		if (petchecktog) {
			for (var i = 0; i < ableToPetList.length; i++) {
				debuglogger(message)
				debuglogger("user checked: " + ableToPetList[i]);
				var petCheck = "@" + ableToPetList[i] + " pets @" + CurrentUsername + "  :petme:";
				debuglogger(message.message);
				debuglogger(petCheck);
				//if (message.message === petCheck) {
				if (message.message.indexOf(petCheck) >= 0) {
					debuglogger("message found");
					/*if (ableToPetList[i] === "Daphne-chan" && CurrentUsername === "bulzai_guard") {
						API.sendChat(specialDaphnePet);
					}
					else {*/
						API.sendChat(petmessage);
					//}
				}
			}
		}		
		else {
			if (message.message.includes(" pets @" + CurrentUsername + "  :petme:")) {
				API.sendChat(petmessage);
			}
		}
		debuglogger("---------")
	}
	/*
	debuglogger(words);
	debuglogger(message.type);	
	debuglogger(words[1]);
	debuglogger(words[1] === "log");
	debuglogger(message.type === "mention");
	debuglogger(bot);
	*/
	if(bot && message.type === "mention" && (message.uid === 8067032 /*|| message.uid === 5383341*/)){		
		var say=words[3];
		for (var i = 4; i < words.length; i++) {
			say += " " + words[i];
		}
		if(words[2] === "say"){
			if(say.charAt(0) === "/"){
				chatcommand(say);
			}
			else{			
				API.sendChat(say);
			}
		}
		else if(words[2] === "log"){
			API.sendLog(say);
		}
		else if(words[2] === "PP?" && message.uid != 5383341){
			CurrentUser = API.getUser();
			var PP = CurrentUser.pp;
			API.sendChat("$ I have:" + PP + " Plug points")
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
}

function sendbusy(){
	API.sendChat("!busy");
}

function waitlistupdate(details) {
	//debuglogger(details);	
	if (autojoin && details.length <= 49) {
		//console.log("autojoinfuntion started");
		autojoinfunction();
	}
}

function advance(details) {
	if (autojoin) {
		autojoinfunction();
	}
	if(autoreloadbugfix){
		setTimeout(function(){
			$('#playback-controls .button.refresh').click();
		}, 1000);
	}
}

function chatcommand(value) {
	debuglogger(value + ' typed as chat command');
	var words = value.split(" ");
	var value1 = words[0].substring(1);
	
	debuglogger("chatcommand array:")
	debuglogger(words);
	debuglogger("actual command: " + value1);

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

	else if (value1 === "pettog") {
		pets = !pets;
		if (pets) {
			chatLog("petting is now enabled")
		}
		else {
			chatLog("petting is now disabled")
		}
	}

	else if (value1 === "petchecktog") {
		petchecktog = !petchecktog;
		if (petchecktog) {
			chatLog("pet user checking is now enabled");
		}
		else {
			chatLog("pet user checking is now disabled");
		}
	}

	else if (value1 === "petmessage") {
		if (words[1] != null || words[1] != undefined) {
			petmessage = words[1];
			for (var i = 2; i < words.length; i++) {
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
		debuglogger("mentionlist:")
		debuglogger(mentionlist);
		for (var i = 0; i < mentionlist.length; i++) {
			debuglogger(mentionlist[i]);
			showInChat(mentionlist[i]);
		};
		debuglogger("---------")
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
				else if (nameA > nameB) {
					return 1;
				}
				// names must be equal
				return 0;
			});
			console.log(playlistarray);
		}
	}

	else if (value1 === "rl") {
		//location.reload(true);
		API.off(API.CHAT, chatTrigger);
		API.off(API.WAIT_LIST_UPDATE, waitlistupdate);
		API.off(API.ADVANCE, advance);
		API.off(API.CHAT_COMMAND, chatcommand);
		clearTimeout(afktimeout);
		$.getScript('https://dl.dropbox.com/s/7ov18hrkpg0w40h/Mainscript.js?dl=0');
	}

	//WIP
	else if (value1 === "baka") {
		if (CurrentUser.role > 0) {
			API.sendChat("baka is babe");
			setTimeout(function () { API.sendChat("baka is love"); }, 500);
			setTimeout(function () { API.sendChat("baka loves me"); }, 1000);
		}
		else {
			chatLog("you cannot use this command because of slowchat");
		}
	}

	else if (value1 === "bass") {
		API.sendChat(":kong: :kong: :basssss: :kong: :kong:");
	}

	else if (value1 === "rcshelpgif") {
		API.sendChat("https://dl.dropboxusercontent.com/s/c46dgpkhpsgx8my/rcs%20help.gif");
	}

	else if (value1 === "autojoinhelpgif") {
		API.sendChat("https://dl.dropboxusercontent.com/s/q3z0leixwq4lkfs/rcs%20autojoin%20help.gif");
	}

	else if (value1 === "autowoothelpgif") {
		API.sendChat("https://dl.dropboxusercontent.com/s/a7643lbl49opmw2/rcs%20autowoot%20help.gif");
	}

	else if (value1 === "roomcreatehelpgif") {
		API.sendChat("https://dl.dropboxusercontent.com/s/7h02227zhhmjr7c/Room%20create.gif");
	}
	
	else if (value1 === "roomleavehelpgif"){
		API.sendChat("https://dl.dropboxusercontent.com/s/oy728ndz3ccdg5k/leavecommunty%20help.gif");
	}

	else if (value1 === "pantsu") {
		if (CurrentUser.role > 0) {
			API.sendChat(":forsenpuke:");
			setTimeout(function () { API.sendChat(":pantsu:"); }, 500);
		}
		else {
			chatLog("you cannot use this command because of slowchat");
		}
	}

	else if (value1 === "deadchat") {
		API.sendChat("https://dl.dropboxusercontent.com/s/bb70ru6qhix218o/a83871ffc7b2c2a4ce4c1b743113cbf01a48578271f3bc6b2380195d2bc94ed9.jpg");
	}

	/*else if (value1 === "commands") {
		var uri = "https://github.com/bulzaiguard/Custom_Script"
		window.open(uri);
	}*/

	else if (value1 === "showcommands") {
		showCommands();
	}
	
	else if (value1 === "nekolove"){
		API.sendChat(":4neko: :nekohype: :nekospin: :nekopraise:");
	}
	
	else if (value1 === "viva"){
		API.sendChat("https://dl.dropboxusercontent.com/s/s8mxq6s7oowzy1f/viva.gif");
	}
	
	else if (value1 === "kurumispin"){
		API.sendChat("https://dl.dropboxusercontent.com/s/empbwfimzm387f0/kurumispin.gif");
	}
	
	else if(value1 === "gasm"){
		API.sendChat(":ramkiss::cowgasm::swtgasm::alicegasm::fowgasm::cirgasm::schygasm::nyagasm::remkiss:");
	}
	else if(value1 === "fix"){
		autoreloadbugfix = !autoreloadbugfix;
		if(autoreloadbugfix){
			chatLog("fix is now enabled");
		}else{
			chatLog("fix is now disabled");
		}		
	}
	
	

}

API.on(API.CHAT, chatTrigger);

//autojoin
API.on(API.WAIT_LIST_UPDATE, waitlistupdate);

//not using this anymore
API.on(API.ADVANCE, advance);

API.on(API.CHAT_COMMAND, chatcommand)

function getplaylistinfo() {
	playlistarray = new Array();
	$.ajax({
		url: 'https://plug.dj/_/playlists',
		dataType: 'json',
		success: function (json) {
			//console.log(json.data);			
			for (var i = 0; i < json.data.length; i++) {
				setTimeout(getsongs(json.data[i]),i * 1000);
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
	CurrentUser = API.getUser();	
	CurrentUsername = CurrentUser.username;
	if (CurrentUser.id === 8067032) {
		autojoin = true;
		debug = true;
		pets = true;
		petchecktog=false;
		deletemessage = true;		
	}
	else if (CurrentUser.id === 5383341) {
		deletemessage = false;
		petchecktog=false;
		bot = true;
	}
	else if(CurrentUser.id === 17002889){
		bot = true;
		debug = false;
		
	}
	debuglogger(CurrentUser);
	console.log("@" + CurrentUsername);
};

getUser();

if (debug) {
	API.chatLog("API testprogram loadedV1");
	chatLog("debug on");
} else {
	API.chatLog("API program loaded");
	API.chatLog("Thank you for using my script " + CurrentUsername);
}
if(pets){
		chatLog("petting enabled")
		if (petchecktog) {
			chatLog("pet user checking is now enabled");
		}
		else {
			chatLog("pet user checking is now disabled");
		}
	}