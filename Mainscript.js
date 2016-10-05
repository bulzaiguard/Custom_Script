var mediaInfo;
var user;
var notifyLogger = true;
var debug = true;
var showhiddenchat = false;
var autojoin = false;
var mentionlist = new Array();
var staffchecker = false;
var stafflist;
var autojoinAmount = undefined;



//$("head").append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>');

//$('#chat-messages').append('<div class="cm message' + message.un + 'data-cid="8067032-1475604572587"><div class="badge-box clickable"><i class="bdg bdg-seab07"></i>	</div>	<div class="msg' +message.cid+ '">		<div class="from dj">			<i class="icon icon-chat-dj"></i>			<span class="un clickable">' +message.un+ '</span>			<span class="timestamp" style="display: inline;">' +message.timestamp+ '</span>		</div>		<div class="text">' +message.message+'</div></div></div>');

function showInChat(message){
	$('#chat-messages').append('<div class="cm message' + message.un + 'data-cid="8067032-1475604572587" style="opacity: 0.5;"><div class="badge-box clickable"><i class="bdg bdg-seab07"></i>	</div>	<div class="msg' +message.cid+ '">		<div class="from dj">			<i class="icon icon-chat-dj"></i>			<span class="un clickable">' +message.un+ '</span>			<span class="timestamp" style="display: inline;">[Deleted] ' +message.timestamp+ '</span>		</div>		<div class="text">' +message.message+'</div></div></div>');
};

function log(message){
	console.log(message);
}

function debuglogger(message){
	if(debug == true){
		console.log(message);
	}
}

function getMediaInfo(){
		mediaInfo = API.getMedia()
}

function chatLog(msg){
	API.chatLog(msg);
}

function autojoinfunction(){
	console.log("autojoin function entered")
	var pos = API.getWaitListPosition();
	var check = API.djJoin();
	debuglogger(pos);
	if(check == 0){			
		if(pos == -1){
			var pos = API.getWaitListPosition();
			if(pos != -1){
				API.chatLog("succesfully joined");
				if(autojoinAmount != undefined){autojoin = autojoin-1;}
			}
		};
	};
};

API.on(API.CHAT, function(message){
	//debuglogger(message);
	if(showhiddenchat){
		if(message.message.charAt(0) === "!"){		
			API.chatLog(message.un + ": " + message.message);
		}
	}
	
	//probably never going to happen
	if(staffchecker){
		for(var i =0; i< stafflist.length;i++){			
			if(message.un === stafflist[i].name){
				
			}
		}		
	}
	
	if(notifyLogger){		
		if(message.type === "mention" && message.un != undefined){
			debuglogger(message);
			debuglogger("added a mention");
			debuglogger(message.un + ": " + message.message);
			debuglogger("---------------");
			mentionlist.push(message) 
		}
	}	
});

//autojoin
API.on(API.WAIT_LIST_UPDATE, function(details){
	debuglogger(details);
	if(autojoinAmount == 0 && autojoinAmount != undefined){
		autojoin = false;
		API.chatLog("autojoin now inactive: joined selected amount of times");
	}
	if(autojoin && details.length <= 49){
		console.log("autojoinfuntion started");
		autojoinfunction();
	}	
});

//not using this anymore
API.on(API.ADVANCE,function(details){
	if(autojoin){
		autojoinfunction();
	}
});

API.on(API.CHAT_COMMAND, function(value){
    debuglogger(value + ' typed as chat command');	
	var words = value.split(" ");
	var value1 = words[0].substring(1);
	
	debuglogger(words);
	debuglogger(value1);
	
	if(value1 === "autojoin" || value1 === "aj"){		
		if(words[1] == undefined){autojoin = !autojoin;}
		if(autojoin){
			autojoinAmount = words[1];
			if (autojoinAmount == 0){
				API.chatLog("cannot autjoin 0 times")
				API.chatLog("autojoin disabled")
				autojoin = false;
			}
			else{
				if(autojoinAmount !=undefined){API.chatLog("autojoin now active for: " + words[1] +"-plays");}
				else{API.chatLog("autojoin now active");}
				autojoinfunction();	
			}
					
		}
		else{API.chatLog("autojoin now inactive");}		
	} 
	
	else if(value1 === "getmedia" || value1 === "getVidInfo" || value1 === "gi"){
		getMediaInfo();
		window.open("http://polsy.org.uk/stuff/ytrestrict.cgi?ytid=" + mediaInfo.cid);						
	} 
	
	else if(value1 === "download" || value1 === "dl"){
		getMediaInfo();
		var uri = "https://youtube.com/watch?v=" + mediaInfo.cid;
		window.open('https://www.youtubeinmp3.com/fetch/?video=' + uri);
	} 
	
	else if(value1 === "hiddenchat"){
		hiddenchat = !hiddenchat;
		if(hiddenchat){API.chatLog("hiddenchat enabled");}
		else{API.chatLog("hiddenchat disabled");}
	}
	
	else if(value1 === "urban"){
		if(words[1] != null || words[1] != undefined){
			var uri = " http://www.urbandictionary.com/define.php?term=" + words[1];
			window.open(uri);
		}
	}
	
	else if(value1 === "debugtog"){
		debug = !debug;
		chatLog("debug is now " + debug);
	}
	
	else if(value1 === "Nreset"){
		mentionlist = new Array();
	}
	
	else if(value1 === "Nlogger"){
		notifyLogger = !notifyLogger;		
		chatLog("notifyLogger is now " + notifyLogger);
		
	}
	
	else if(value1 === "Nlist"){
		//mentionlist.foreach(arrayChatLogger);
		debuglogger(mentionlist);
		for(var i = 0;i<mentionlist.length;i++){
			debuglogger(mentionlist[i]);
			showInChat(mentionlist[i]);
		};
	}
	
	/*else if(value1 ==="getStaff"){
			stafflist = API.getStaff();
			console.log(stafflist);
		}*/
	
});

function arrayChatLogger(item,index){
	chatLog(item);
}

function getUser(){
	var temp = API.getUser();
	user = temp.username;
	console.log("@"+user);
};

if(debug){
	API.chatLog("API testprogram loadedV5");
	chatLog("debug on");
}else{
	API.chatLog("API program loaded");
}

getUser();

