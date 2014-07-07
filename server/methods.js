Meteor.startup(function() {
    if (Cards.find().count() === 0) {
        Meteor.call('loadCards');
    }
});


Meteor.methods({
    loadCards: function() {
        var whiteCards = Assets.getText("wcards.txt").split('<>');
        var blackCards = Assets.getText("bcards.txt").split('<>');
        whiteCards[0] = whiteCards[0].split('=')[1];
        blackCards[0] = blackCards[0].split('=')[1];

        whiteCards.forEach(function(doc) {
            Cards.insert({
                type: 'white',
                description: doc
            });
        });

        blackCards.forEach(function(doc) {
            Cards.insert({
                type: 'black',
                description: doc
            });
        });
    }
})