
if (Meteor .isClient){
console.log('client is working');

//set default value of 'hashtagID' from template to ''.
Session.setDefault("hashtagId","");

//HASHTAG SEARCH FORM TEMPLATE 
Template.hashtag.events({
	"submit form": function (event) {
		event.preventDefault();
		//get value from input field 'name' in hashtag template
		var hashtagIdVar = event.target.hashtagId.value;
		//assign value to 'hashtagId'
		Session.set('hashtagId',hashtagIdVar);

		console.log(hashtagIdVar);

		Meteor.call('searchInstagram', hashtagIdVar, function(error, results) {
			console.log("instagram loaded");

		});

		return false; //prevent the form reload
	}
})
//INSTAFEED TEMPLATE 
	Template.instafeed.helpers({
		'headline': function () {
			//display value of hashtagId
			return Session.get('hashtagId');
		}, 

		'loadPictures': function () {
			//select data made available from subscription
			return Photographs.find({},{fields: {
				"data.caption.text":1, "data.images.low_resolution.url":1} });	
		}	
	}); //end of helpers

//SUBSCRIPTIONS --subscribe to instafeed publication from server
	Meteor.subscribe('instafeed', function() {
		//count number of photographs in Publication 'instafeed'
		console.log("photograph count:" + Photographs.find().count());
	});	

} //end of isClient
