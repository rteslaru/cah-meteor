# cah-meteor
A Meteor implementation of the Cards against Humanity game, meant to serve as a learning tool for the basics of the Meteor framework. See it in action at [cahgame.meteor.com](http://cahgame.meteor.com).

This is meant to be used as a learning tool. You can `git checkout start` to get the basic scaffolding in place -- use that as the starting point. The final product with all challenges completed is on master, so use that for inspiration whenever needed. Also, if you would like to understand the challenge descriptions better, you can always go to [cahgame.meteor.com](http://cahgame.meteor.com) and see exactly what is the expected result.

### Challenges

1. Declare route for the game screen, taking `_id` as a parameter
2. Add password authentication (bonus: change default to use USERNAME instead of EMAIL)
2. Write methods to create / join / leave game
2. Write a basic publication function to replace the `autopublish` package
3. Configure your router to subscribe to collections published in the previous step
4. Import the `wcards.txt` and `bcards.txt` files (located in the `private` folder) into a `Cards` collection
5. Using the `new` route already defined, write the template and functions to allow the user to create a new game
6. List existing games on the home page
9. Define the route and template for the game screen
9. In the game screen, write a `Get Cards` button; each press should give the player one random card, which should be displayed to him only
10. Display a random black card at the top of the game screen, for all players to see
8. Implement the czar functionality (more on how this works later)


### Packages

The final version, with all challenges completed, uses the following set of packages:

* iron-router
* semantic-ui
* http
* accounts-ui
* accounts-password