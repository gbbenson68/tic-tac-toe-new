RELEASE NOTES
-------------

##### 2019-05-29
- Changed message so that, upon loading of game, user knows whose turn it is, and if game is over.
- HTML and CSS stuff
  - Reorganized HTML so that "change password" and "sign-out" are at end of form.
  - Added new "Game Over" and "Game Not Over" elements to make color meanings more obvious.
  - Changed name of "Get A Game" button to "Enter A Game ID From Below"

##### 2019-05-27

- Fixed problem where winning on final move would report a draw.
- Reorganized form resets and moved them to individual UI success/fail functions so as to remove problem when any message was called.
- Removed setTimeout() from generic displaySuccessFail() function to individual success/fail functions so that messaging is more robust.
- Fixed problem where retrieval of open games incorrectly reports total number of games played.
- When game is won, message now displays who won (X or O).

##### 2019-05-20

- Initial release
