RELEASE NOTES
-------------

##### 2019-05-27

- Fixed problem where winning on final move would report a draw.
- Reorganized form resets and moved them to individual UI success/fail functions so as to remove problem when any message was called.
- Removed setTimeout() from generic displaySuccessFail() function to individual success/fail functions so that messaging is more robust.
- Fixed problem where retrieval of open games incorrectly reports total number of games played.
- When game is won, message now displays who won (X or O).
