# Capstone-Team-2---PKI-Scheduler

LINK TO JSDOC ON GITHUB PAGES:
https://tcmcmahon.github.io/Capstone-Team2-PKI-Scheduler/

### ABOUT THE APPLICATION:
  This application is a web application using React as the front-end and Node.js as the back-end. The goal is to take a CSV file given by the University of Nebraska at Omaha registrar/faculty that has information about the courses for the given semester. Our application will allow uploading of the file through the frontend, and parsing of the file in the backend. Parsing is to take the file and run the data through a scheduling algorithm to create an efficient assignment of courses to classrooms in the PKI building.

### RELEASE NOTES:
  MILESTONE 1:
    MILESTONE 1:
  In the current version as of now, we have created the front-end and styled it, and created the back-end with basic parsing functionality. The front-end allows for uploading of a CSV file, and the back-end takes the file and outputs the contents of the file to the command line.
  We have multiple branches, each showing the work done by each person. We named each branch as first initial/lastname/point of branch. Frederic's branch (fshope) created the database definitions for the upcoming milestone. This is not merged to main for Milestone 1, but will be merged in Milestone 2.
  Josh's branch (jshadbolt) first created the basic web app and the basic backend. 
  Travis's (tmcmahon) branch branched off of Josh's, and styled the web app and outputted the CSV file contents to the command line.
  Josh's branch (updated) then put the parsing code in a function, and added some changes to the overall parsing structure.
  
  MILESTONE 2:
  For Milestone 2, we made a calendar page and fed it test data to show its potential functionality. We bundled the client and server together so that once the client is built, we execute one command in the server and this starts both the client and the server at the same time. We extracted the classroom CSV data from our parsed version, and stored it in the MySQL database. 
  
  MILESTONE 3:
  For Milestone 3, we integrated a Navigation bar to move back and forth between pages, we created an algorithm for assigning classes that resolves all time conflicts, and fed the calendar page with the output from that algorithm. Each class on the calendar can be clicked on to view its information, and you can choose day or week view, and move between different dates. Minor changes made to the look of each page, and an additional page for display of the raw algorithm output results.
  
  MILESTONE 4:
  For Milestone 4, we added room grouping to the calendar and integrated that with our data. We made style changes to modernize and improve the web pages, and began finalizing the algorithm for assignment.

### APPLICATION ACCESS:
  #### IF NOT USING APP/TOOL SUCH AS FORK/GITHUB DESKTOP:
    1. Go to repository, tcmcmahon/Capstone-Team2-PKI-Scheduler
    2. Click on the button that says "main" to show a dropdown of available branches.
    3. Select the branch you want to view.
    4. When you are in the branch you selected, go to the right side of the page and select "code".
    5. Easiest way is to click "download as .zip".
    6. Go to your File Explorer, and put downloaded .zip in directory of your choice, or leave it in downloads.
    7. Right click on the .zip and select "extract here".
    8. You can now view the code. React Front-end is in the "client" folder, and Node back-end is in the "server" folder.

  #### IF USING APP/TOOL SUCH AS FORK/GITHUB DESKTOP:
    1. Go to repository, tcmcmahon/Capstone-Team2-PKI-Scheduler
    2. Click on the button that says "main" to show a dropdown of available branches.
    3. Select the branch you want to view.
    4. When you are in the branch you selected, go to the right side of the page and select "code".
    5. Find the two squares on top of each other located next to the url and click them to copy the url.
    6. Open app of your choice, and select File/Clone.
    7. If using Fork, the copied url will automatically be filled into the window. If using Github Desktop, select the repository from Github.core list or 
       click the URL tab and enter the copied url, select the location on your computer you want to clone to, and click "clone".
    8. You will now see the cloned repository opened in your app, and the files will be available on your local machine at the location you selected in the previous step.
    9. React Front-end is in the "client" folder, and Node back-end is in the "server" folder.

 ### RUNNING THE APPLICATION:
    1. Go to the command line/terminal and navigate to the where the unzipped app folder is; cd LOCATIONOFYOURFOLDER/Capstone-Team2-PKI-Scheduler.
    2. Once in this directory, cd into the "client" folder, and run npm install. You will only need to do this once. After this is complete, run "npm run build", this will also need to only be done once.
    3. Open a second command line/terminal, and go into the app folder, and then into the "server" folder. Run npm install. You will only need to do this once. After this is done, run Node index.js. You should see "Server is running on port". 
    4. crtl + click the link the server is running on, or simply navigate to it in your browser and you should see the React Web page

### THAT'S IT!
    

