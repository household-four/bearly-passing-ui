# BearlyPassingUi
This project was created to fulfill the requirements of CSI5324 at Baylor University.

Authors: Christen Barringer, Faizan Azam, Joshua Wester, Kevin Fritz, Matthew Tuan

## How to run code

You will first need a version of Node.js compatible with Angular 19. 

After installing Node, you will need to install package dependencies. In a terminal in the root directory of this project, run: 

```bash
npm install
```

Then, to run the code locally, run:

```bash
ng serve
```

The [backend code repo](https://github.com/household-four/BearlyPassing) must also be running. Once the both codebases are running, 
open your browser and navigate to `http://localhost:4200/`. 

During development, if things are rendering strangely after making changes, use ctrl+shift+R to hard refresh the page.

## User Guide
Once the app is running, navigating to `http://localhost:4200/` will bring you to the login page. 

We did not implement traditional authentication, instead focusing our efforts on demonstrating the relationships 
between the entities in our system. As such, you may simply choose a user from the list to 'log in' as that user. 

### All Users

After logging in, you will be taken to your home page. This will display study sets that you are the creator of, and more information depending on your role. 
Each study set has an 'edit' button that will route you to the edit page for that study set. Here, you can edit the questions that are included in this set 
and the games that reference this set. 

### Games

A game can have many game sessions (instances of a game) that are unique to the person assigned to the game. This is so each person's answers and results are 
separate from the game entity itself. The creator of a study set can create more games associated with it. Clicking the 'edit' button takes you to the 
page for that game. 

The game page shows all of the sessions associated with a particular game. You can see who is assigned to each session, whether or not they have completed it, and their performance. 

### Teachers

On the home page, teachers can view a list of their students and a list of study sets they have created.
From the home page study sets can be downloaded locally or edited. On the edit study set page, questions may be modified,
added, or removed. Each study set also has a list of games that can viewed and edited. For more information about games, see the Games section.

### Students

On the home page, students can view a list of their assigned game sessions, a list of their teachers, and a list of their
personal study sets. Students are able to play the assigned games and view their scores. Students are also able to create
their own study sets. New study sets require a name and description to get started, then questions can be manually added,
modified, or deleted.

