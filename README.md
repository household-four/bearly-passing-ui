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

A game can have many game sessions (instances of a game) that are unique to the person assigned to the game. This is so each person's answers and results are 
separate from the game entity itself. The creator of a study set can create more games associated with it. Clicking the 'edit' button takes you to the 
page for that game. 

The game page shows all of the sessions associated with a particular game. You can see who is assigned to each session, whether or not they have completed it, and their performance. 

### Teachers

On the home page, teachers can view a list of their students.  

### Students

On the home page, students can view a list of their assigned game sessions and a list of their teachers. 

## TODO
✅complete 🟨 incomplete & not required ❌incomplete & required


✅ Select who I am as a user  
🟨 Create new user (login page)  
🟨 View and edit my user info  
✅ View my study sets  
✅ View a specific study set  
✅ Create a new study set  
✅ Create a new question for a study set  
✅ Create a new game (as a teacher)  
✅ students should also be able to create study sets / games?  -- (NOTE: Enabled for study sets but not games)

✅ Upload sets from canvas  
✅ Upload sets from local file (like JSON)  
✅ Download sets to local file (like JSON)  
🟨 Edit my study set's details like name and description  
✅ Edit the question contents of my study set  
✅ View my students list (teacher only)  
✅ View my list of teachers (student only)  
🟨 Add and remove my students from my students list (teacher only)   
✅ Add and remove students from a game (teacher only)  
✅ View my assigned games (student only)  
✅ View my students grades on a game (teacher only)   
✅ View my game performances (student only)  
✅ Play a game (student only)  
✅ More than one game mode (MATCHING)  
✅ More than one game mode (FLASHCARD)  
🟨 Only set creators should be able to add and remove questions  
🟨 Only game creators should be able to see session scores  
🟨 Only assigned players should be able to answer questions  
✅ Game view (teacher)  
✅ Game Session view (student)

❌ Complete the user guide  
❌ ensure everyone can demo 3 use cases  


