
# Inspiration
Ever since the start of quarantine back in March, notes and schools have gone increasingly digital. Students have to rely on many different sites, teacher presentations, handouts, pdfs, and videos that are all over the place. This leads to millions of tabs and a lack of efficiency. Super Notes was designed to resolve this issue and bring notes together in one place with additional features and interactive widgets. Although this project was based off of a smaller static site personal project by one of the members of the team (which only had fill ins and flashcards), the code had to be completely rewritten to work with a backend. In addition, extensive research was conducted to choose what features to implement (such as sticky notes, multiple choice question widgets, dark mode, table of contents, and link sharing), and how to implement them to minimize distraction while preserving UI aesthetics and user experience.

# What it does: The Ultimate Study Tool
Super notes is a plain text parser that takes inputs in our s-note syntax language and transforms them into iframes, multiple choice, fill in, header, and flashcard widgets. It also includes a link sharing function that allows users to share those supernotes seamlessly. The link opens to a comprehensive note viewer, which includes features like a table of contents, a dark mode, and draggable sticky notes.

# Made for Learning
- Focus on the Notes: We keep distracting colors away from the note viewing experience, but preserve aesthetics by carefully allocating whitespace, typography, and grayscale tones. We made sure to design the site to be as readable, and as digestable as possible, maintaining a plain, but satisfying minimalist look.
- By making notes interactive, we seek to capitalize on active learning methods (which have been shown to boost retention by as much as 36%) like recall and recognition.
- Interactive widgets give immediate feedback, which have repeatedly been shown study after study to help students learn faster and understand concepts better.
- No gimmicks, no sign ups, no premiums. Good learning tools shouldn't be blocked by paywalls. Write notes as long as you need, all stored in a single link. We plan to keep this project open source, always.
- Made for Speed
- No clunky user interfaces: just a quick, easy to learn set of syntax rules, designed to transform typed text notes into interactive modules quickly, using common separating symbols like colons, backslashes, and double commas.
- Write in s-note format from anywhere, and then paste into our note creator! No more hassling over sixty different note apps to get the interactive experience you want.
# Made for Sharing
- Options to save your current note as plain text, or create a unique link that makes your note accessible anywhere on the web!
- These will open your note up in our note viewer, which contains a comprehensive toolbar (see below) designed to enhance your experience.
# Interactive Widgets
- Multiple Choice Questions: Fully featured with as many choices and as many correct answers as you wish!
- Fill in the blanks: Fully feature fill in the blanks that light up green on the correct answer
- Flashcard Decks: Fully featured text based flashcards that you can flip over and through quickly.
- Interactive Headers: Choose from three preset styles, and with the option to add a pop out when clicked.
- Videos, Docs, Websites, and Slides
- Options to insert embed code (includes videos, google suite documents like docs and slides, google drive files, and much more!)
- Directly insert almost any website into your supernote by providing the link
# Comprehensive Toolbar and Note Viewer
- Sticky Notes: Create draggable, deletable, and minimizable sticky notes anywhere on the page. Great for taking notes or keeping track of problems or - questions you have while going through a note.
- Sticky Pad: Keeps track of all of your sticky notes in a compressed format, and allows you to copy their text with just one click!
- Dark Mode: For less strain during late night study sessions
- Table of Contents: Flip through a linked list with all of your modules, allowing you to quickly move to each one.
- Copy Source: Copy the source text of any supernote.
- Change Viewer Margins: Increase or decrease the width of viewing margins to suit your needs
- Timer: Currently deprecated but will be re-added in the future. Great for keeping track and setting time block goals, or if you follow methods like Flow or Pomodoro.

# How we built it
Based on skillsets, we divided responsibilities for the website. One group handled the branding, research, and front end styling of the website. The other group handled the server, database, and logic behind the web application. We used HTML/CSS/Bootstrap to style our webpages and JS/JQuery for the widget functions. Then we used Node.js and Express for server functions, EJS for templating (to format custom note pages), and then linked it to a Mongodb database.


Built With
- bootstrap
- css
- ejs
- express.js
- html
- javascript
- jquery
- mongodb
- mongoose
- node.js
Try it out
 sunotes.herokuapp.com
 GitHub Repo
http://sunotes.herokuapp.com/ (link no longer works due to changes to heroku's free plan, files can be downloaded and application can stull be run by calling `node app.js` within the folder after downloading)
