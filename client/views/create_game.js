Template.createGame.rendered = function() {
        $('.ui.form').form({
        nickName: {
            identifier: 'nick-name',
            rules: [{
                type: 'empty',
                prompt: 'Please fill in a nick name'
            }]
        },
        description: {
            identifier: 'description',
            rules: [{
                type: 'empty',
                prompt: 'Please write a short description'
            }]
        }
    });

};


Template.createGame.events({
    'submit .ui.form': function(e) {
        nickName = $('input:text').val();
        description = $('textarea').val();
        // Games.insert({});
    }
})