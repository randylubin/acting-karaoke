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
				$scope.sceneSync.availableCharacters = $scope.sceneInfo.availableCharacters;
			//}
		});
	}
]);




