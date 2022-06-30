const https=require("https");
const express =require("express");
const bodyParser=require("body-parser");
const app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
let overview=[];
let  title=[];
let rating=[];
let id=[];
let path=[];
let color=[];
const API_KEY ='api_key=be603cdd366da1c41c8eb160d46075df';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
   
   
app.get("/",function(req,res)
{
  title=[];
  overview=[];
  rating=[];
  id=[];
  path=[];
  color=[]; 

   
    https.get(API_URL,function(response)
    {
        console.log(response.statusCode);
        response.on("data",function(data)
        {
        const weatherdata=JSON.parse(data);
        for(var i=0;i<weatherdata.results.length;i++){
          title.push(weatherdata.results[i].title);
          overview.push(weatherdata.results[i].overview);
          rating.push(weatherdata.results[i].vote_average);
          id.push(weatherdata.results[i].id);
          path.push(weatherdata.results[i].poster_path);
          color.push(getColor(rating[i]));
          console.log(title[i]);
        }
        

        console.log(title.length);
        res.render("list",{title:title,overview:overview,pid:id,path:path,rating:rating,color:color});
     
    });

    
    
    });
   
    
});
app.post("/",function(req,res)
{
  title=[];
  overview=[];
  rating=[];
  id=[];
  path=[];
  color=[]; 
  const surl = BASE_URL + '/search/movie?'+API_KEY+'&query='+req.body.spost;
  https.get(surl,function(response)
  {
      console.log(response.statusCode);
      response.on("data",function(data)
      {
      const weatherdata=JSON.parse(data);
      for(var i=0;i<weatherdata.results.length;i++){
        title.push(weatherdata.results[i].title);
        overview.push(weatherdata.results[i].overview);
        rating.push(weatherdata.results[i].vote_average);
        id.push(weatherdata.results[i].id);
        path.push(weatherdata.results[i].poster_path);
        color.push(getColor(rating[i]));
        console.log(title[i]);
      }
     

      console.log(title.length);
      res.render("list",{title:title,overview:overview,pid:id,path:path,rating:rating,color:color});
   
  });

  
  
  });

}
);
function getColor(vote) {
  if(vote>= 8){
      return 'green'
  }else if(vote >= 5){
      return "orange"
  }else{
      return 'red'
  }
}


app.listen(3000,function()
{
    console.log("server at 3000");
});