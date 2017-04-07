# node-note-capstone

Send all data requests to:
   https://sheltered-brook-18249.herokuapp.com/?
   
   #Notes posts [/notes]
   ## Retrieve all notes [GET]
   + Response 200 (application/json)
       + Attributes (array[Notes])
        
   #Note post by ID [/notes/:id]
   ## Retrieve note by ID [GET]
   + Response 200 (application/json)
       + id: 'id' (number, required)
   
   #Notes search [/search]
   ## Search notes with text query [GET]
   + Response 200 (application/json)
         
   #Note post [/notes]
   ## Post new note [POST]
   + Response 201 (application/json)
       + title: 'title' (string, required)
       + content: 'content' (object of strings, required)
       + date: 'date' (MM/DD/YYYY, required)
   
   #Note update [/notes/:id]
   ## Update existing note [PUT]
   + Response 201 (application/json)
       + title: 'title' (string, required)
       + content: 'content' (object of strings, required)
       + date: 'date' (MM/DD/YYYY, required)
   
   #Note delete [/notes/:id]
   ## Delete note by ID [DELETE]
   + Response 204 (application/json)
       + id: 'id' (number, required)
       
       
 ##Summary
     This is a basic note-taking app, that allows a user to create and maintain a list of chronologically sorted notes/posts for future use. When the user first loads the page, they are brought to the homescreen. There are 3 example notes in place in order to show the user how the notes will display. All notes are originally limited to only displaying their subject, not content or date. When the note is clicked, the content and date of the note will also display. If it clicked again, it will close back to the original view. There is a "document-add" icon located at the top of the page, that when clicked, brings input fields into the display, which when filled and submitted, will display in the list of notes along the left-hand side. Required fields to fill out in the [POST] feature are 'subject', 'content', and 'date'. If the user would like to delete a previously posted note, there is an "x" button located on each note on the right-hand side. When the "x" is clicked, the user is prompted "Are you sure you want to delete?". If the user clicks "OK", the note will be permanently deleted from the list. If the user clicks "Cancel", the note delete action will be ignored. This app also features a "query-search" function that allows the user to search the content of any previously posted note. 
     
     
Technologies used in the creation of this app include: HTML, CSS, JavaScript, jQuery, Node.js, CI testing done with TravisCI and Mocha. Note schema model created with Mongoose. Database maintained on MongoDB
   
   
