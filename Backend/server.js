const exp = require('express');
const app = exp();
var bodyParser = require('body-parser');
app.use(exp.urlencoded());
app.use(exp.json())
app.set("view engine", "ejs");
const mc = require('mongodb');
const portno = 3000;
//const uri = dbUrl = "mongodb+srv://majorproject:majorproject@cluster0.f5ics.mongodb.net/Global?retryWrites=true&w=majority";
const uri = dbUrl = "mongodb+srv://gade_utham:gade_utham@cluster0.tilud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
try
{
    client = mc.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true },(err,cli)=>{
        if(err)
        {
            console.log('error connecting the database');
        }
        else{
            dbo = cli.db("challan_ssuu");
            reqCollection= dbo.collection("images");
            console.log('connected to the database');
        } 
});
}
catch(e)
{
    console.log(e)
}
app.get('/', (req, res) => {
    res.render('main');
});
app.post('/',(req,res)=>{

        console.log("data is ",req.body);
        //convert vehicle number from string to number
        //let vnum=(+req.params.number);
        let vnum = req.body.number;
        //find is not required because we need only one document.
        reqCollection.findOne({vehicle_id:vnum},(err,challanObj)=>{
        
        if(err) console.log("err in reading one doc");
        else if(challanObj==null)
        {   
             var obj = { message : "vehicle not found" }
        
              res.render('other',{obj : obj})
        }
        else {
              //res.send({message:challanObj}); 
              console.log(challanObj.image)
              res.render('index', { obj : challanObj});
        }
          })
        })

app.listen(3000,()=>{ console.log(`server running on port no. ${portno}..`)} );




