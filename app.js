const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb+srv://person:person1234@cluster0.ls5nm.mongodb.net/Supernotes",{ useUnifiedTopology: true, useNewUrlParser: true })
mongoose.set('useFindAndModify', false);

const noteSchema = {
  note: String
}
const Note = mongoose.model("Note", noteSchema)


app.get("/", function(req, res) {
  res.render("index")
});

app.get("/new", function(req,res){
  res.render("new")
})
app.get("/tutorial", function(req,res){
  res.render("tutorial")
})
app.post("/create",function(req, res){
  let noteReq = req.body.masterNote
  const note = new Note({
    note: noteReq
  })
  let link = ""
  let noteId = ""
  note.save(function(err,item){
    noteId = item.id;
    res.render("success", {noteId:noteId})
  });
})

app.get("/note/:noteId", function(req, res){
  const noteId = req.params.noteId
  Note.findOne({_id:noteId}, function(err,result){
    if(!err){
      res.render("note",{note:result.note})
    }
  })
})

let port = process.env.PORT;
if(port==null||port==""){
  port=3000;
}
app.listen(port, function() {
  console.log("Server started successfully");
});
