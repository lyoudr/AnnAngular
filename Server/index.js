const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const multer = require('multer');
const upload = multer();

/* Static Files */
app.use(express.static('../Ann/dist/Ann'));

/* Allow bodyParser */
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/json
app.use(bodyParser.json());
// for parsing text
app.use(bodyParser.text());


/* Read index.html */
app.get('/', (req, res) => {
    fs.readFile('../Ann/dist/Ann/index.html', (err, data) => {
        if(err){
            return;
        }
        res.write(data);
        res.end();
    })
});
app.post('/login', (req, res) => {
    const UserInfo = req.body;
    if(UserInfo.name == 'Json' && UserInfo.password == 'json123'){
        res.json({'response': 'ok', 'token': 'jsonToken'});
        res.end();
    } else if (UserInfo.name == 'Joy' && UserInfo.password == 'joy123'){
        res.json({'response': 'ok', 'token': 'joyToken'});
        res.end();
    } else if (UserInfo.name == 'Amy' && UserInfo.password == 'amy123'){
        res.json({'response': 'ok', 'token': 'amyToken'});
        res.end();
    } else if (UserInfo.name == 'Tonal' && UserInfo.password == 'tonal123'){
        res.json({'response': 'ok', 'token': 'tonalToken'});
        res.end();
    } else if (UserInfo.name == 'Joanna' && UserInfo.password == 'joanna123'){
        res.json({'response': 'ok', 'token': 'joannaToken'});
        res.end();
    } else {
        res.json({'response': false });
        res.end();
    }  
});
// addPost
app.post('/blogpost',(req, res) => {
    const date = new Date();
    res.json({title: req.body.title, content: req.body.post, date: date});
    res.end();
});

// upLoadFile
app.post('/postFile', upload.single('filekey') ,(req, res) => {
    const formData = req.file;
    console.log('formData is =>', formData);
    res.send(req.file);
    res.end();
});
// get restaurant
app.get('/dishes',(req, res) => {
    let restaurantlists = [
        {
            'order': 1,
            'name': 'toxopi',
            'describe':'delicious'
        },
        {
            'order': 2,
            'name': 'yasmin',
            'describe':'great'
        },
        {
            'order': 3,
            'name': 'gurata',
            'describe':'good'
        }
    ];
    res.json(restaurantlists);
    res.end();
});

// post value to search key
app.post('/search', (req, res) => {
    // 要使用 app.use(bodyParser.text()) 來解析 string;
    console.log('req.body is =>', req.body);
    // Enter req.body to DataBase to search related words;
    res.send('javascript: alert("Hi")');
    res.end();
});

// get post content 
app.get('/getpost', (req, res) => {
    let postId = req.query.postId;
    switch(postId){
        case 'yogurt':
            res.json({
                'title': 'Yogurt Swirl Smoothie Bowl',
                'ingredients': ['1 frozen banana','100ml apple or orange juice','1 tsp acai powder (optional)','2 tbsp yoghurt (can be dairy-free)'],
                'steps': [
                    'Place the frozen banana, berries, fruit juice and acai powder into your Ninja Kitchen blender and whizz up for about 1 minute until quite thick and smooth.',
                    'Pour into a bowl and swirl in the yoghurt.',
                    'Add toppings and enjoy!'
                ]
            });
            res.end();
            break;
        case 'baked':
            res.json({
                'title': 'Baked Vegan Cheesecake',
                'ingredients': ['1 cup raw cashews*','1 cup coconut cream*',"8 ounces vegan cream cheese* (Trader Joe's brand, or Toffuti)",'1 Tbsp arrowroot or cornstarch'],
                'steps': [
                    'Preheat the oven to 350ºF. Lightly grease an 8-inch springform pan with coconut oil and place on a baking sheet.',
                    'In a food processor or high-powered blender, combine the pecans, almond flour, coconut sugar, cinnamon, and sea salt. Pulse slightly to break up the pecans. Stream in the melted coconut oil and then pulse again until the mixture is well moistened and sticks together when pressed between your fingertips. Scrape down the sides of the container or use the tamper as necessary.',
                    'Press the crust evenly along the bottom and up the sides of the prepared pan. Bake for 15 minutes or until firm to the touch. Let cool while you make the filling.'
                ]
            });
            res.end();
            break;
        case 'immune':
            res.json({
                'title': 'Immune System Juicel',
                'ingredients': ''
            });
            res.end();
            break;
        case 'nature':
            res.json({
                'title': 'Nature Inspired Smoothie',
                'ingredients': ''
            });
            res.end();
            break;
        case 'program':
            res.json({
                'title': 'Programming Learning',
                'ingredients': ''
            });
            res.end();
            break;
        case 'butter':
            res.json({
                'title': 'Butter Chicken',
                'ingredients': ''
            });
            res.end();
            break;
        case 'rogan':
            res.json({
                'title': 'Rogan Josh',
                'ingredients': ''
            });
            res.end();
            break;
        case 'samosas':
            res.json({
                'title': 'Samosas',
                'ingredients': ''
            });
            res.end();
            break;
        case 'tandoori':
            res.json({
                'title': 'Tandoori Chicken',
                'ingredients': ''
            });
            res.end();
            break;
        case 'malai':
            res.json({
                'title': 'Malai Kofta',
                'ingredients': ''
            });
            res.end();
            break;
    }
});

// get sheet music
app.get('/getsheet', (req, res) => {
    let sheettype = req.query.sheettype;
    switch(sheettype){
        case 'classic':
            var data = fs.readFileSync('./pianosheets/You_are_my_everything.pdf');
            res.contentType('application/pdf');
            res.send(data);
            res.end();
        case 'morden':
            res.json({'type': 'morden'});
            res.end();
        case 'jazz':
            res.json({'type': 'jazz'});
            res.end();
        case 'movie':
            res.json({'type': 'cartoon'});
            res.end();
    }
})
// get discuss
app.get('/discuss',(req, res) => {
    res.send({response: 'discuss returned!'});
    res.end();
});


// getMessage
app.get('/getmessage', (req, res) => {
    let personId = req.query.getmessage;
    switch(personId){
        case 'Json':
            res.json([
                {name: 'Json', message: 'Hello'},
                {name: 'me', message: 'Hi~'},
                {name: 'Json', message: 'Where do you live ?'},
                {name: 'me', message: 'I live in Taipei now.'}
            ]);
            res.end();
            break;
        case 'Joy':
            res.json([
                {name: 'Joy', message: "I'm sad."},
                {name: 'me', message: 'Why?'},
                {name: 'Joy', message: 'Cause the wether is blue.'},
                {name: 'me', message: 'Hope I can make you happy :)'}
            ]);
            res.end();
            break;
        case 'Amy':
            res.json([
                {name: 'Amy', message: "Hey, sister, do you wanna go shopping this weekend ?"},
                {name: 'me', message: 'Sounds good. which shopping district do you want to go ?'},
                {name: 'Amy', message: 'Um... maybe Ximending?'},
                {name: 'me', message: "That's a good idea."}
            ]);
            res.end();
            break;
        case 'Tonal':
            res.json([
                {name: 'Tonal', message: "How's your life in London ? "},
                {name: 'me', message: 'Not bad, but I still try to adapt to the new environment. try to know some friends , you know...'},
                {name: 'Tonal', message: 'It is lonely to live there alone ? sounds like you need more friend.'},
                {name: 'me', message: "Sometimes, but I think I'll get better and better. thanks for your concern."}
            ]);
            res.end();
            break;
    }
    res.end();
});


// search discuss page side_bar
app.post('/search_discuss_sidenav', (req, res)=>{
    console.log('search text is =>', req.body);
    let foundfriend = [];
    let findword = '';
    findword += req.body; 
    console.log('findword is =>', findword);
    const friendlists = ['Json', 'Joy', 'Joanna', 'Amy', 'Tonal'];
    friendlists.forEach((name) => {
        if(name.substring(0, findword.length) == findword){
            foundfriend.push({'name': name});
        };
    });
    console.log('foundfrined is =>', foundfriend);
    res.json(foundfriend);
    res.end();
});

// getmusicsheet 
app.get('/getmusicsheet', (req, res) => {
    let musictype = req.query.musictype;
    switch(musictype){
        case 'Classic':
            res.json(['A', 'B', 'C']);
            res.end();
        case 'Morden' :
            res.json(['B', 'D']);
            res.end();
        case 'Jazz':
            res.json(['C', 'D']);
            res.end();
        case 'Movie':
            res.json(['D']);
            res.end();
        case 'Cartoon':
            res.json(['E']);
            res.end();
    }
})

app.listen(4500, () => console.log('Server listen on port 4500!'));
