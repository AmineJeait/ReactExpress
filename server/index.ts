import express from "express";
import cors from "cors";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_KEY="6Z7EjLucnZAiWstej9v76lUantwGn7Fsw7FSnbJEVuv0hf7PNFo3iAsbzYq3V2";


function generateAccessToken(user) {
    return jwt.sign(user,JWT_KEY, {expiresIn: "24h"}) ;
}


function authentificateToken(req,res,next){
    let token = req.body.Token;
    if(token == null){
        res.send("Invalid token");
        res.status(404); 
    }
    try{
        let user:User = jwt.verify(token, JWT_KEY);
        req.user = user;
        next();
    }
    catch (err) {
        console.log(err);
        res.send("Invalid token")
        res.status(404);
      }
}


const pgPromise = require("pg-promise")();

const db = pgPromise('postgres://postgres:thor@localhost:5432/reactExpress');



let jsonResponse = {
    status:"ok",
    data:[],
    token:"",
    role:"",
    username:""
};



function resetResponse(jsonResponse){
    jsonResponse.data = [],
    jsonResponse.token = ""
}



const corsOptions = {
    options:["http://localhost:5173/"],
}


const app = express();



interface User{
    name:string,
    id:number,
};

let userName:string;
let password:string;
// let status:string = "";
let id:number;





app.use(cors(corsOptions));
app.use(express.json());



app.post("/api/register", (req,res) =>{
    let name = req.body.name;
    bcrypt.hash(req.body.password,10)
    .then((hashedPassword)=>{
        console.log(hashedPassword);
        db.any("INSERT INTO utilisateurs(name,password,role,status) values($1,$2,'user','active')",[name,hashedPassword,])
        .then(()=>{
        res.status(200).send('ok');
        })
    })
    console.log(req.body);
    

});



app.post("/api/login",  (req,res)=>{
    let name = req.body.name;
    let password = req.body.password;
    db.one('SELECT * FROM utilisateurs where name = $1',name)
    .then((Data)=>{
        console.log(Data);
        bcrypt.compare(password, Data.password)
        .then((state)=>{
            if(state){
                let user:User = {
                    name:Data.name,
                    id:Data.id,
                };
                jsonResponse.token = generateAccessToken(user);
                res.send(jsonResponse);
            }
            else{
                res.send("Incorrect information");
            }
        })


    })
    .catch((error)=>{
        console.log(error);
        res.send('Incorrect information');
    })


});




app.post("/api/home", authentificateToken ,(req,res) =>{
    resetResponse(jsonResponse);
    const decodedToken:User = req.user;
    console.log(decodedToken);
    db.one('SELECT role from utilisateurs where id = $1',decodedToken.id)
    .then((role)=>{
        console.log(role);
        if(role.role == "admin"){   
            db.any('SELECT * from utilisateurs ')
            .then((users)=>{
                for( let i = 0;i<users.length ;i++){
                        jsonResponse.data.push(users[i].id+':'+users[i].name+':'+users[i].status+':'+users[i].role);
                        console.log(users[i])
                }
                jsonResponse.role = "admin";
                res.send(jsonResponse);
                res.status(200);
                console.log(jsonResponse)

            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else{   //if not an admin
            db.any('SELECT text,id,status,created_at,updated_at from notes where id_user = $1',decodedToken.id)
            .then((Data)=>{
                for( let i = 0;i<Data.length ;i++){
                    if(Data[i].status == "active"){
                        jsonResponse.data.push(Data[i].id+':'+Data[i].text+':'+Data[i].created_at+':'+Data[i].updated_at);
                    }
                    console.log(Data[i])
                }
                res.send(jsonResponse);
                res.status(200);
                console.log(jsonResponse)
    })
    .catch((error)=>{
        console.log(error);
    })    
        }
    })
    .catch((err)=>{
        console.log(err)
    })
});

app.post("/api/add", authentificateToken ,(req,res) =>{
    resetResponse(jsonResponse);
    const decodedToken:User = req.user;
    db.none('INSERT INTO notes(text,id_user) values($1,$2)',[req.body.text,decodedToken.id])
    .then(()=>{
        res.send(jsonResponse);
        console.log("text is stored");
    })
    .catch((error)=>{
        console.log(error);
    })

})


app.post("/api/del",authentificateToken,(req,res)=>{
    resetResponse(jsonResponse);
    const decodedToken:User = req.user;
    console.log(req.body.id);
    db.none("UPDATE notes SET status = 'archive' WHERE id=$1",req.body.ID)
    .then(()=>{
        res.send(jsonResponse);
    })
    .catch((error)=>{
        console.log(error);
    })
})


app.post("/api/mod",authentificateToken ,(req,res)=>{
    resetResponse(jsonResponse);
    const decodedToken:User = req.user;
    console.log(req.body.id);
    db.none("UPDATE notes SET text = $2 WHERE id=$1",[req.body.ID,req.body.Data])
    .then(()=>{
        res.send(jsonResponse);
    })
    .catch((error)=>{
        console.log(error);
    })
})


app.post("/api/archive",authentificateToken , (req,res)=>{
    resetResponse(jsonResponse);
    const decodedToken:User = req.user;
    console.log(req.body.id);
    db.any("SELECT text,id,status,created_at,updated_at from notes where id_user = $1",decodedToken.id)
    .then((Data)=>{
        for( let i = 0;i<Data.length ;i++){
            if(Data[i].status == "archive"){
                jsonResponse.data.push(Data[i].id+':'+Data[i].text+':'+Data[i].created_at+':'+Data[i].updated_at);
            }
            console.log(Data[i])
        }
        res.send(jsonResponse);
        res.status(200);
        console.log(jsonResponse)
    })
    .catch((error)=>{
        console.log(error);
    })
})



app.post("/api/active",authentificateToken ,(req,res)=>{
    resetResponse(jsonResponse);
    const decodedToken:User = req.user;
    console.log(req.body.id);
    db.none("UPDATE notes SET status = 'active' WHERE id=$1",req.body.ID)
    .then(()=>{
        res.send(jsonResponse);
    })
    .catch((error)=>{
        console.log(error);
    })
})


app.post("/api/delete",authentificateToken,(req,res)=>{
    resetResponse(jsonResponse);
    const decodedToken:User = req.user;
    console.log(req.body.id);
    db.none("DELETE from notes WHERE id=$1",req.body.ID)
    .then(()=>{
        res.send(jsonResponse);
    })
    .catch((error)=>{
        console.log(error);
    })
})



app.post("/api/admin/del",authentificateToken ,(req,res)=>{
    resetResponse(jsonResponse);
    const decodedToken:User = req.user;
    console.log(req.body.id);
    db.none("DELETE from utilisateurs WHERE id=$1",req.body.ID)
    .then(()=>{
        res.send(jsonResponse);
    })
    .catch((error)=>{
        console.log(error);
    })
})


app.post("/api/admin/deactivate",authentificateToken ,(req,res)=>{
    resetResponse(jsonResponse);
    const decodedToken:User = req.user;
    console.log(req.body.id);
    db.none("UPDATE utilisateurs SET status = 'bloque' WHERE id=$1",req.body.ID)
    .then(()=>{
        res.send(jsonResponse);
    })
    .catch((error)=>{
        console.log(error);
    })
})



app.post("/api/admin/activate",authentificateToken ,(req,res)=>{
    resetResponse(jsonResponse);
    const decodedToken:User = req.user;
    console.log(req.body.id);
    db.none("UPDATE utilisateurs SET status = 'active' WHERE id=$1",req.body.ID)
    .then(()=>{
        res.send(jsonResponse);
    })
    .catch((error)=>{
        console.log(error);
    })
})




app.listen(8080, () =>
  console.log("Server is listening on port 8080..."),
);