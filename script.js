//AngularFire
url = 'https://actor-karaoke.firebaseio.com/';

// Angular
actorKaraoke = angular.module('actorKaraoke', ['firebase', 'ui.keypress']).
	value('fbURL', url).
	config(function($routeProvider) {
		$routeProvider.
			when('/', {controller:'HomePageCtrl', templateUrl:'views/homePage.html'}).
			when('/:room', {controller:'SceneCtrl', templateUrl:'views/scene.html'}).
			otherwise({redirectTo:'/'});
	});

actorKaraoke.controller('SceneCtrl', ['$scope', '$routeParams', 'angularFire',
	function SyncCtrl($scope, $routeParams, angularFire){

		$scope.pulpFiction = {};
		$scope.whosOnFirst = {};
		$scope.aFewGoodMen = {};

		$scope.player2 = {};

		$scope.playerData = {
			charID: -1,
			charName: null,
			message: {
				left: '',
				center: 'Please Pick a Character'
			}
		};

		$scope.sceneInfo = {
			characterList: [
				{charID: 0, name: 'Lou'},
				{charID: 1, name: 'Bud'}
			],
			characterActorMap: [
				{charID: 0, free: true},
				{charID: 1, free: true}
			]
		};

		$scope.sceneSync = {
			currentLine: 0,
			currentScene: 0,
			characterList: $scope.sceneInfo.characterList,
			characterActorMap: $scope.sceneInfo.characterActorMap,
			fin: false
		};

		$scope.script = [
				{charID: 1, line:'But you know what the funniest thing about Europe is?'},
				{charID: 0, line:'What?'},
				{charID: 1, line:'It\'s the little differences. A lotta the same shit we got here, they got there, but there they\'re a little different.'},
				{charID: 0, line:'Examples?'},
				{charID: 1, line:'Well, in Amsterdam, you can buy beer in a movie theatre. And I don\'t mean in a paper cup either.'},
				{charID: 1, line:'They give you a glass of beer, like in a bar. In Paris, you can buy beer at MacDonald\'s.'},
				{charID: 1, line:'Also, you know what they call a Quarter Pounder with Cheese in Paris?'},
				{charID: 0, line:'They don\'t call it a Quarter Pounder with Cheese?'},
				{charID: 1, line:'No, they got the metric system there, they wouldn\'t know what the fuck a Quarter Pounder is.'},
				{charID: 0, line:'What\'d they call it?'},
				{charID: 1, line:'Royale with Cheese.'},
				{charID: 0, line:'Royale with Cheese. What\'d they call a Big Mac?'},
				{charID: 1, line:'Big Mac\'s a Big Mac, but they call it Le Big Mac.'}
		];

		$scope.pickScene = function(sceneID){
			$scope.clearCharacter();
			$scope.sceneSync.fin = false;
			$scope.sceneSync.currentLine = 0;
			$scope.sceneSync.currentScene = sceneID;
			$scope.sceneSync.characterActorMap = [
				{charID: 0, free: true},
				{charID: 1, free: true}
			];
			console.log('New scene:', $scope.sceneLibrary[sceneID].name);
		};

		$scope.pickCharacter = function(character){
			console.log("Selected", character.name);

			if (character) {
				//erase old character info
				$scope.clearCharacter();

				//add new info
				$scope.playerData.charID = character.charID;
				$scope.playerData.charName = character.name;
				$scope.sceneSync.characterActorMap[character.charID].free = false;
			} else {
				$scope.clearCharacter();
			}

		};

		$scope.clearCharacter = function(){
			console.log('clearing character');
			if($scope.playerData.charID >= 0){
				console.log($scope.playerData.charID);
				$scope.sceneSync.characterActorMap[$scope.playerData.charID].free = true;
				$scope.playerData.charID = -1;
				$scope.playerData.charName = '';
			}
		};

		$scope.nextLine = function(){
			console.log('next line');

			//increment line number
			if (($scope.sceneSync.currentLine + 1) < $scope.sceneLibrary[$scope.sceneSync.currentScene].script.length) {
				$scope.sceneSync.currentLine += 1;
			} else {
				$scope.sceneSync.fin = true;
			}

		};

		$scope.hitKey = function($event){
			console.log('hit key');
			if ($event.keyCode == 37){
				if ($scope.sceneSync.currentLine !== 0) $scope.sceneSync.currentLine -= 1;
			} else if ($event.keyCode == 38) {
				$scope.restartScene();
			} else {
				$scope.nextLine();
			}
		};

		$scope.restartScene = function(){
			$scope.sceneSync.currentLine = 0;
			$scope.sceneSync.fin = false;
		};



		var url = 'https://actor-karaoke.firebaseio.com/' + $routeParams.room;
		var promise = angularFire(url, $scope, 'sceneSync', {});

		// upon angularFire response:
		promise.then(function(){
			console.log('from fb', $scope.sceneInfo);

			//add defaults
			//if (!$scope.sceneInfo.currentLine){
				console.log('updated defaults');
				$scope.sceneSync.currentLine = 0;
				$scope.sceneSync.currentScene = 0;
				$scope.sceneSync.characterList = $scope.sceneInfo.characterList;
				$scope.sceneSync.characterActorMap = [
					{charID: 0, free: true},
					{charID: 1, free: true}
				];
			//}
		});


		// Scripts

		$scope.aFewGoodMen.characterList = [
			{charID: 0, name: 'Kaffee'},
			{charID: 1, name: 'Col. Jessep'}
		];

		$scope.aFewGoodMen.script = [
			{charID: 0, line: 'Colonel, I have just one more question before I call Airman O\'Malley and Airman Perez:'},
			{charID: 0, line: 'If you gave an order that Santiago wasn\'t to be touched, and your orders are always followed, then why would he be in danger, why would it be necessary to transfer him off the base?'},
			{charID: 1, line: 'Private Santiago was a sub-standard marine. He was being transferred off the base because -'},
			{charID: 0, line: 'But that\'s not what you said. You said he was being transferred because he was in grave danger.'},
			{charID: 1, line: 'Yes. That\'s correct, but -'},
			{charID: 0, line: 'You said, \"He was in danger\". I said, \"Grave danger\". You said -'},
			{charID: 1, line: 'Yes, I recall what --'},
			{charID: 0, line: 'I can have the Court Reporter read back your -'},
			{charID: 1, line: 'I know what I said. I don\'t need it read back to me like I\'m a damn -'},
			{charID: 0, line: 'Then why the two orders? Colonel? Why did you -'},
			{charID: 1, line: 'Sometimes men take matters into their own hands.'},
			{charID: 0, line: 'No sir. You made it clear just a moment ago that your men never take matters into their own hands.'},
			{charID: 0, line: 'Your men follow orders or people die. So Santiago shouldn\'t have been in any danger at all, should he have, Colonel?'},
			{charID: 1, line: 'You little bastard.'},
			{charID: 0, line: 'If Kendrick told his men that Santiago wasn\'t to be touched, then why did he have to be transferred?'},
			{charID: 0, line: 'Colonel?'},
			{charID: 0, line: 'Kendrick ordered the code red, didn\'t he? Because that\'s what you told Kendrick to do.'},
			{charID: 0, line: 'And when it went bad, you cut these guys loose.'},
			{charID: 0, line: 'You had Markinson sign a phony transfer order -'},
			{charID: 0, line: 'You doctored the log books.'},
			{charID: 0, line: 'I\'ll ask for the forth time. You ordered -'},
			{charID: 1, line: 'You want answers?'},
			{charID: 0, line: 'I think I\'m entitled to them.'},
			{charID: 1, line: 'You want answers?!'},
			{charID: 0, line: 'I want the truth.'},
			{charID: 1, line: 'You can\'t handle the truth!'},
			{charID: 1, line: 'Son, we live in a world that has walls. And those walls have to be guarded by men with guns. Who\'s gonna do it? You? You, Lt. Weinberg?'},
			{charID: 1, line: 'I have a greater responsibility than you can possibly fathom. You weep for Santiago and you curse the marines. You have that luxury.'},
			{charID: 1, line: 'You have the luxury of not knowing what I know: That Santiago\'s death, while tragic, probably saved lives. And my existence, while grotesque and incomprehensible to you, saves lives.'},
			{charID: 1, line: 'You don\'t want the truth. Because deep down, in places you don\'t talk about at parties, you want me on that wall. You need me there.'},
			{charID: 1, line: 'We use words like honor, code, loyalty... we use these words as the backbone to a life spent defending something. You use \'em as a punchline.'},
			{charID: 1, line: 'I have neither the time nor the inclination to explain myself to a man who rises and sleeps under the blanket of the very freedom I provide, then questions the manner in which I provide it.'},
			{charID: 1, line: 'I\'d prefer you just said thank you and went on your way. Otherwise, I suggest you pick up a weapon and stand a post.'},
			{charID: 1, line: 'Either way, I don\'t give a damn what you think you\'re entitled to.'},
			{charID: 0, line: 'Did you order the code red?'},
			{charID: 1, line: 'I did the job you sent me to do.'},
			{charID: 0, line: 'Did you order the code red?'},
			{charID: 1, line: 'You\'re goddamn right I did.'}
		];

		$scope.pulpFiction.characterList = [
			{charID: 0, name: 'Jules'},
			{charID: 1, name: 'Vincent'}
		];

		$scope.pulpFiction.script = [
				{charID: 1, line:'But you know what the funniest thing about Europe is?'},
				{charID: 0, line:'What?'},
				{charID: 1, line:'It\'s the little differences. A lotta the same shit we got here, they got there, but there they\'re a little different.'},
				{charID: 0, line:'Examples?'},
				{charID: 1, line:'Well, in Amsterdam, you can buy beer in a movie theatre. And I don\'t mean in a paper cup either.'},
				{charID: 1, line:'They give you a glass of beer, like in a bar. In Paris, you can buy beer at MacDonald\'s.'},
				{charID: 1, line:'Also, you know what they call a Quarter Pounder with Cheese in Paris?'},
				{charID: 0, line:'They don\'t call it a Quarter Pounder with Cheese?'},
				{charID: 1, line:'No, they got the metric system there, they wouldn\'t know what the fuck a Quarter Pounder is.'},
				{charID: 0, line:'What\'d they call it?'},
				{charID: 1, line:'Royale with Cheese.'},
				{charID: 0, line:'Royale with Cheese. What\'d they call a Big Mac?'},
				{charID: 1, line:'Big Mac\'s a Big Mac, but they call it Le Big Mac.'}
		];

		$scope.whosOnFirst.script = [
			{charID: 0, line: 'I love baseball. When we get to St. Louis, will you tell me the guys\' names on the team so when I go to see them in that St. Louis ballpark I\'ll be able to know those fellows?'},
			{charID: 1, line: 'All right. But you know, strange as it may seem, they give ball players nowaday very peculiar names'},
			{charID: 0, line: 'Funny names'},
			{charID: 1, line: 'Nicknames, pet names. Now, on the St. Louis team we have:'},
			{charID: 1, line: 'Who\'s on first, What\'s on second, I Don\'t Know is on third--'},
			{charID: 0, line: 'That\'s what I want to find out; I want you to tell me the names of the fellow on the St. Louis team.'},
			{charID: 1, line: 'I\'m telling you: Who\'s on first, What\'s on second, I Don\'t Know is on third.'},
			{charID: 0, line: 'You know the fellows\' names?'},
			{charID: 1, line: 'Yes.'},
			{charID: 0, line: 'Well, then, who\'s playin\' first?'},
			{charID: 1, line: 'Yes.'},
			{charID: 0, line: 'I mean the fellow\'s name on first base.'},
			{charID: 1, line: 'Who.'},
			{charID: 0, line: 'The fellow playin\' first base for St. Louis.'},
			{charID: 1, line: 'Who.'},
			{charID: 0, line: 'The guy on first base.'},
			{charID: 1, line: 'Who is on first.'},
			{charID: 0, line: 'Well what are you askin\' me for?'},
			{charID: 1, line: 'I\'m not asking you---I\'m telling you: Who is on first.'},
			{charID: 0, line: 'I\'m asking you---who\'s on first?'},
			{charID: 1, line: 'That\'s the man\'s name!'},
			{charID: 0, line: 'That\'s who\'s name?'},
			{charID: 1, line: 'Yes.'},
			{charID: 0, line: 'Well go ahead and tell me.'},
			{charID: 1, line: 'Who.'},
			{charID: 0, line: 'The guy on first.'},
			{charID: 1, line: 'Who.'},
			{charID: 0, line: 'The first baseman!'},
			{charID: 1, line: 'Who is on first'},
			{charID: 0, line: 'Have you got a first baseman on first?'},
			{charID: 1, line: 'Certainly'},
			{charID: 0, line: 'Then who\'s playing first?'},
			{charID: 1, line: 'Absolutely'},
			{charID: 0, line: 'When you pay off the first baseman every month, who gets the money?'},
			{charID: 1, line: 'Every dollar of it! And why not, the man\'s entitled to it.'},
			{charID: 0, line: 'Who is?'},
			{charID: 1, line: 'Yes.'},
			{charID: 0, line: 'So who gets it?'},
			{charID: 1, line: 'Why shouldn\'t he? Sometimes his wife comes down and collects it.'},
			{charID: 0, line: 'Who\'s wife?'},
			{charID: 1, line: 'Yes. After all, the man earns it.'},
			{charID: 0, line: 'Who does?'},
			{charID: 1, line: 'Absolutely.'},
			{charID: 0, line: 'All I\'m trying to find out is what\'s the guys name on first base'},
			{charID: 1, line: 'Oh, no, no, What is on second base.'}
		];

		$scope.whosOnFirst.characterList = [
			{charID: 0, name: 'Lou'},
			{charID: 1, name: 'Bud'}
		];

		$scope.sceneLibrary = [
			{sceneID: 0, name: 'Who\'s on First', characterList: $scope.whosOnFirst.characterList, script: $scope.whosOnFirst.script},
			{sceneID: 1, name: 'Pulp Fiction', characterList: $scope.pulpFiction.characterList, script: $scope.pulpFiction.script},
			{sceneID: 2, name: 'A Few Good Men', characterList: $scope.aFewGoodMen.characterList, script: $scope.aFewGoodMen.script}
		];


		// WEBRTC SECTION

		var videoKey = '8675309';

		// grab the room from the URL
		var room = $routeParams.room;

		// create our webrtc connection
		var webrtc = new SimpleWebRTC({
			// the id/element dom element that will hold "our" video
			localVideoEl: 'localVideo',
			// the id/element dom element that will hold remote videos
			remoteVideosEl: 'remotes',
			// immediately ask for camera access
			autoRequestMedia: true,
			debug: true,
			detectSpeakingEvents: true,
			autoAdjustMic: false
		});

		// when it's ready, join if we got a room from the URL
		webrtc.on('readyToCall', function () {
			// you can name it anything
			if (room) webrtc.joinRoom(room + videoKey);
		});

		// Since we use this twice we put it here
		function setRoom(name) {
			angular.element('#createRoom').hide();
			angular.element('#title').hide();
			angular.element('#subTitle').text('Link to join: ' + location.href);
			angular.element('body').addClass('active');
		}

		if (room) {
			setRoom(room);
		} else {
			angular.element('form').submit(function () {
				var val = angular.element('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
				webrtc.createRoom(val, function (err, name) {
					console.log(' create room cb', arguments);
				
					var newUrl = location.pathname + '?' + name + '#/';
					if (!err) {
						history.replaceState({foo: 'bar'}, null, newUrl);
						setRoom(name);
					} else {
						console.log(err);
					}
				});
				return false;
			});
		}
	}
]);

actorKaraoke.controller('HomePageCtrl', ['$scope', 'angularFire',
	function SyncCtrl($scope, angularFire){
		angular.element('form').submit(function () {
			var val = angular.element('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
			var newUrl = location.pathname + '#/' + val;
			window.location = newUrl;
		});
	}
]);