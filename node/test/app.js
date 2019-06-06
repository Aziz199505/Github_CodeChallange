
var express = require("express");
const craigslist = require('node-craigslist');
const axios = require('axios');
var app = express();

const list = [];
var allData = []
let deep = 0
let deepFollowers = (username,myList) => {
    let user = "";
    let myValue = null;
    if(deep === 3) return ;
    else {

        list.push(axios.get(`https://api.github.com/users/${username}/followers`)
            .then(res => {

                deep += 1

                //console.log(res.data)

                res.data.forEach(e => {
                   // console.log(e.login)
                   // allData.push(e.login);
                })

                myList.push(res.data.login)
                allData = [...myList]
                return deepFollowers(res.data.login,myList)



                // return res.data
            })
            .catch(err => {
               // console.log(err)
            }))


    }


}


app.get("/followers", (req, res, next) => {

    //let tokenStr = 'f1b96f1ee58fc00a7c0f7aaf7b063b31ac5d53c3';

   deepFollowers('chrisyoung0101',[])

    Promise.all(list).then(values => {
        //console.log(values);
        console.log("=====================")
        console.log("Data: " + allData)
        res.json({test : 'hello world'})
    });


})





app.get("/starred", (req, res, next) => {

    let tokenStr = 'f1b96f1ee58fc00a7c0f7aaf7b063b31ac5d53c3';
    //https://api.github.com/users/chrisyoung0101/starred
    axios.put('https://api.github.com/user/starred/Aziz199505/SSH-IP-Blocker', {
        headers : {
            'Authorization' : `token ${tokenStr}`
        }
    })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })



});



app.get("/url", (req, res, next) => {
    const list = [];


    var
        craigslist = require('node-craigslist'),
        client = new craigslist.Client({
            city : 'seattle'
        }),
        options = {
            baseHost : '', // defaults to craigslist.org
            category : '', // defaults to sss (all)
            city : '',
            maxPrice : '200',
            minPrice : '100',
            postedToday : true
        };

    client
        .search(options, 'xbox one')
        .then((listings) => listings.forEach(   (l) => {
                list.push(
             client.details(l).then((r) => {
               // console.log(r)
                return r;
             }))

        } )).then(() => {
        Promise.all(list).then(values => {
            //console.log(values);
            res.json(values);
        });
        })

        .catch((err) => {
            console.error(err);
        });





});




app.listen(3000, () => {
    console.log("Server running on port 3000");
});