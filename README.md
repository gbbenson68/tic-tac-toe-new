Tic Tac Toe Game
==================
Introduction
------------
This single-paged web application (SPA) was developed as the first project in my course at General Assembly. It was a difficult project, to be sure, especially considering the timeframe alloted. However, overall, it was a great experience. You don't better yourself by sitting on the sidelines and playing it safe.

Technologies Used
-----------------
The web application was written in and using the following technologies:
* HTML
* JavaScript
* jQuery
* CSS
* SASS/Bootstrap
* Node.js
* git/GitHub
* Atom

_This application was developed on Ubuntu 18.04.2 LTS. No Microsoft developers were harmed during the making of this application._

Development and Planning
------------------------
When it comes to anything that I do, I'm more of a "pantster" than I am a "plotter," that is, I tend to develop as I go rather than methodically plan in detail. The same was true for this project: I had a general knowledge of what to do and how to do it, but once I rolled up my sleeves and started working, the development took on a life of its own.

I knew immediately that I wanted to have tha ability to hide and show different sections, so, when I wrote the HTML, I wrote it with sections and divs with particular IDs which I could easily reference with the undelying JavaScript that would come later.

After generating the HTML, I starting writing the linkages to the AJAX API (created by General Assembly) and all of the other JavaScript code to operate the game and manipulate the DOM. As CSS is a weakness of mine, I decided the the fewer the frills, the better. I plan to add more animation and visual effects once I become more knowledgeable and proficient in CSS.

### logMessage()
One of the things that I wanted to implement was a logging mechanism that worked in a local/development environment only, so that the logging would be visible to the user, but visible for me, as I am like seeing as much information as possible to help me resolve any problems. In my experience, the more *useful* logging an application can generate, the better. There is only one ```console.log()``` contained in the code, and it's wrapped in an ```if``` statement.

Wireframes
----------
These wireframes are quite basic: part of that was intentional (as I knew that my thinking would develop throghout the development stage), and part of that was due to my lack of experience. This is my first web application of its scale, using JavaScript and CSS.

Login Perspective:
https://i.imgur.com/OgSgebG.jpg

Sign Up Perspective:
https://i.imgur.com/i96aUn8.jpg

Play Perspective:
https://i.imgur.com/V9gEpT6.jpg


User Stories
------------

Here's a collection of user stories.

1. As a player, I want to sign up so that I can play Tic Tac Toe.
2. As a player, I want to sign out from playing Tic Tac Toe.
3. As a player who has already signed up, I want to sign in so that I can play Tic Tac Toe.
4. As a player who has already signed up, I want to change my password.
5. As a player, I want to start a new game.
6. As a player, I want to choose from a list of open games to continue playing.
7. As a player, I want to abandon a game that I no longer wish to play.
8. As a player, I want to play against another player.
9. As a player, I want to continue a game against another player.


Some of these items were not achievable in the first iteration of the application, and I am planning to implement them later on.

Basic Directory Structure
-------------------------

In addition to the main ```index.html``` file, here's a list of the main directories being used by the application and what they contain:

```
assets/scripts
```

This directory contains all of the JavaScript scripts used in the application.

* ```api.js``` - contains the AJAX calls

* ```app.js``` - contains the linkages (event listeners) between the HTML and the game logic

* ```config.js``` - contains configuration variables

* ```events.js``` - contains the event handler logic

* ```game.js``` - the main game functionality

* ```store.js``` - the store for state variables and objects

* ```ui.js``` - contains the user interface functions, used to manipulate the DOM

* ```util.js``` - contains utility functions

```
assets/styles
```
This directory contains the CSS/Bootstrap style selectors.

* ```colors.scss``` - the list of colors used by the application

* ```index.scss``` - the main list of SCSS files used, in the order they are to be utilized

* ```theme.scss``` - contains the themes for the application, not including font details

* ```typography.scss``` - contains the font styles

```
curl-scripts
```
This directory contains the BASH scripts used in testing connectivity and functionality with the API outside of the AJAX calls.

* ```change-password.sh``` - used to test the change password interface (PATCH)

* ```create.sh``` - used to test the create game interface (POST)

* ```index-query.sh``` - used to test the game retrieval interface (GET) with a query

* ```index.sh``` - used to test the game retrieval interface (GET) of all games for a user

* ```show.sh``` - used to retrieve (GET) a single game for the user

* ```sign-in.sh``` - used to test the sign-in (POST) interface

* ```sign-out.s``` - used to test the sign-out (DELETE) interface

* ```sign-up.sh``` - used to test the sign-up (POST) interface

* ```update.sh``` - used to test the game update (PATCH) interface

```
lib
```
This directory contains helper JavaScript scripts which are utilized by the main set of scripts.
* ```add-nested-value.js``` - contains helper functions which are used by ```get-form-fields.js```.

* ```get-form-fields.js``` - contains functions for parsing HTML form fields, and is used by all other JavaScript scripts.

```
public/images
```
This directory contains the same wireframe images linked above.

Known Bugs and To-dos
---------------------
### Known Bugs
* Due to the asynchronicity of AJAX requests, it is sometimes possible, if a user reacts quickly, to put a game into an indeterminate state if a click is made before the AJAX request responds with success or fail. I have put in some steps to mitigate this, but it hasn't been thoroughly tested.
* 

Please feel free to contact me at ```guy dot b dot benson at gmail dot com``` for issues.

### To-dos
* At some point, I would like to make this a fully-interactive two-player game which can be played asynchronously. I estimate that it will take another 10-12 hours of dedicated work to achieve that.
* The code could be cleaned up a little bit. I would like to paramaterize the HTML so that there are no hard-coded values in the underlying JavaScript.
* The CSS used in the rendering can be greatly improved. Unfortunately, as this is a weakness of mine, I would need to gain some knonwledge and experience before providing a *shit hot* experience. Ideally, I would be using more of Bootstrap for this.

About Me
--------
I am an aerospace engineer by education and a software engineer by experience. I’ve always been intrigued by using software to solve practical problems, whether it be something as simple as providing an HTML interface for viewing invoices or something as complex as modeling the fluid flow through a rocket thruster. I recently decided to upgrade my skill set with an immersive software engineering program at General Assembly, and I am now taking my ambitions to the next level. I am eager and excited to take on those sometimes seemingly unsurmountable challenges regarding major problems that affect all of our society, and am especially interested in those problems affecting the underprivileged.
