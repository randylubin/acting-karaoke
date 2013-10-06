//AngularFire
url = 'https://actor-karaoke.firebaseio.com/';

// Angular
actorKaraoke = angular.module('actorKaraoke', ['firebase', 'ui.keypress']).
	value('fbURL', url).
	/*factory('JamInfo', function(angularFireCollection, fbURL) {
		return angularFireCollection(fbURL);
	}).*/
	/*config(function($httpProvider){
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}).*/
	config(function($routeProvider) {
		$routeProvider.
			when('/', {controller:'SceneCtrl', templateUrl:'views/scene.html'}).
			otherwise({redirectTo:'/'});
	});

actorKaraoke.controller('SceneCtrl', ['$scope', 'angularFire',
	function SyncCtrl($scope, angularFire){

		$scope.pulpFiction = {};
		$scope.whosOnFirst = {};

		$scope.playerData = {
			charID: null,
			message: {
				left: '',
				center: 'Please Pick a Character'
			}
		};

		$scope.sceneInfo = {
			players: [
				{charID: 0, name: 'Jules', line: 'They don\'t call it a Quarter Pounder with Cheese?'},
				{charID: 1, name: 'Vincent', line:''}
			],
			availableCharacters: [
				{charID: 0, name: 'Jules'},
				{charID: 1, name: 'Vincent'}
			]
		};

		$scope.sceneSync = {
			currentLine: 0,
			currentScene: 0,
			availableCharacters: $scope.sceneInfo.availableCharacters
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
			$scope.sceneSync.currentLine = 0;
			$scope.sceneSync.currentScene = sceneID;
			console.log('New scene:', $scope.sceneLibrary[sceneID].name);
		};

		$scope.pickCharacter = function(character){
			console.log("Selected", character.name);

			$scope.playerData.charID = character.charID;
			$scope.playerData.charName = character.name;

		};

		$scope.clearCharacter = function(){
			$scope.playerData.charID = null;
			$scope.playerData.charName = null;
		};

		$scope.nextLine = function(){
			console.log('next line');

			//increment line number
			$scope.sceneSync.currentLine += 1;

		};

		$scope.hitKey = function($event){
			console.log('hit key');
			$scope.nextLine();
		};

		$scope.restartScene = function(){
			$scope.sceneSync.currentLine = 0;
		};



		var url = 'https://actor-karaoke.firebaseio.com/';
		var promise = angularFire(url, $scope, 'sceneSync', {});

		// upon angularFire response:
		promise.then(function(){
			console.log('from fb', $scope.sceneInfo);

			//add defaults
			//if (!$scope.sceneInfo.currentLine){
				console.log('updated defaults');
				$scope.sceneSync.currentLine = 0;
				$scope.sceneSync.currentScene = 0;
				$scope.sceneSync.availableCharacters = $scope.sceneInfo.availableCharacters;
			//}
		});


		// Scripts

		$scope.pulpFiction.availableCharacters = [
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
			{charID: 1, line: 'All right. But you know, strange as it may seem, they give ball players nowaday'},
			{charID: 1, line: 'very peculiar names'},
			{charID: 0, line: 'Funny names'},
			{charID: 1, line: 'Nicknames, pet names. Now, on the St. Louis team we have Who\'s on first,'},
			{charID: 1, line: 'What\'s on second, I Don\'t Know is on third--'},
			{charID: 0, line: 'That\'s what I want to find out; I want you to tell me the names of the fellow'},
			{charID: 0, line: 'on the St. Louis team.'},
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

		$scope.whosOnFirst.availableCharacters = [
			{charID: 0, name: 'Lou'},
			{charID: 1, name: 'Bud'}
		];

		$scope.sceneLibrary = [
			{sceneID: 0, name: 'Le Big Mac', availableCharacters: $scope.pulpFiction.availableCharacters, script: $scope.pulpFiction.script},
			{sceneID: 1, name: 'Who\'s on First', availableCharacters: $scope.whosOnFirst.availableCharacters, script: $scope.whosOnFirst.script}
		];

		// grab the room from the URL
		var room = location.search && location.search.split('?')[1];

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
			if (room) webrtc.joinRoom(room);
		});

		// Since we use this twice we put it here
		function setRoom(name) {
			angular.element('#createRoom').hide();
			angular.element('#title').text(name);
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
				
					var newUrl = location.pathname + '?' + name;
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