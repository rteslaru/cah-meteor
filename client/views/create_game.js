Template.createGame.getTest = function() {
    resultArray = [];
    HTTP.get('http://localhost:3000/wcards.txt', function(error, result) {
        if (!error) {
            console.log(result);
            resultArray = result.content.split('<>');
        }
    });
};