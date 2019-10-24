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
});

/* 4.1 Get Restaurant */
app.get('/restaurantlists', (req, res) =>{
    let page = req.query.page;
    let classification = req.query.classification;
    console.log('classification', classification);
    if(classification == "sweet") {
        if ( page == 1) {
            res.json([
                { name : "咚咚餐廳", price : "100 ~ 200 TWD", comment: "好吃甜甜的", img : "assets/image/restaurant/restaurant-1.jpg", id : "01" },
                { name : "哈摟餐廳", price : "300 ~ 600 TWD", comment: "好棒", img : "assets/image/restaurant/restaurant-2.jpg", id : "02" },
                { name : "每每餐廳", price : "600 ~ 944 TWD", comment : "吃起來不錯", img : "assets/image/restaurant/restaurant-3.jpg", id : "03"},
                { name : "美麗餐廳", price : "500 ~ 1200 TWD", comment : "一定要來吃", img : "assets/image/restaurant/restaurant-4.jpg", id : "04" }
            ])
            console.log('sweet');
        }
    } else if (classification == "righteous") {
        if ( page == 1) {
            res.json([
                { name : "義大餐廳", price : "400 ~ 700 TWD", comment: "好吃鹹鹹的", img : "assets/image/restaurant/restaurant-1.jpg", id : "05" },
                { name : "樂樂餐廳", price : "500 ~ 600 TWD", comment: "有很多生菜, 不好吃", img : "assets/image/restaurant/restaurant-2.jpg", id : "06" },
                { name : "您好餐廳", price : "600 ~ 900 TWD", comment : "我喜歡它的米飯", img : "assets/image/restaurant/restaurant-3.jpg", id : "07" },
                { name : "安安餐廳", price : "500 ~ 800 TWD", comment : "義大利麵好吃", img : "assets/image/restaurant/restaurant-4.jpg", id : "08" }
            ])
            console.log('righteous');
        }
    } else if (classification == "chinese") {
        if ( page == 1) {
            res.json([
                { name : "武道餐廳", price : "304 ~ 850 TWD", comment: "很有中國味", img : "assets/image/restaurant/restaurant-1.jpg", id : "09" },
                { name : "湯包餐廳", price : "100 ~ 220 TWD", comment: "湯包好吃", img : "assets/image/restaurant/restaurant-2.jpg", id : "10" },
                { name : "享用餐廳", price : "230 ~ 340 TWD", comment : "吃起來不錯", img : "assets/image/restaurant/restaurant-3.jpg", id : "11" },
                { name : "素菜餐廳", price : "800 ~ 1000 TWD", comment : "菜菜好吃喔", img : "assets/image/restaurant/restaurant-4.jpg", id : "12" }
            ])
            console.log('chinese');
        }
    }
});

// 得到每間餐廳的經緯度和菜色介紹
app.get('/restaurantpost',(req, res)=>{
    let restaurantId = req.query.restaurantId;
    console.log('retaurantId is =>', typeof restaurantId);
    switch(restaurantId){
        case '01' :
            res.json([
                {   img: 'assets/image/restaurant/cuisine/tater_tots.jpg', 
                    title: 'Tater tots', 
                    content: [
                            "We love French fries, but for an American food variation on the potato theme, one beloved at Sonic drive-ins and school cafeterias everywhere, consider the Tater Tot.",
                            "Notice it often has the registered trademark -- these commercial hash brown cylinders are indeed proprietary to the Ore-Ida company. If you'd been one of the Grigg brothers who founded Ore-Ida, you'd have wanted to come up with something to do with leftover slivers of cut-up potatoes, too. They added some flour and seasoning and shaped the mash into tiny tots and put them on the market in 1956. A little more than 50 years later, America is eating about 32 million kilos of these taters annually."
                    ],
                    LatLng: [35.2271, -80.8431]
                },
                {
                  img: 'assets/image/restaurant/cuisine/banana_split.jpg', title: 'Banana Split', content: 
                  [
                    "Like the banana makes it good for you. Still, kudos to whoever invented the variation of the sundae known as the banana split. There's the 1904 Latrobe, Pennsylvania, story, in which future optometrist David Strickler was experimenting with sundaes at a pharmacy soda fountain, split a banana lengthwise, and put it in a long boat dish.",
                    "And the 1907 Wilmington, Ohio, story, wherein restaurant owner Ernest Hazard came up with it to draw students from a nearby college. Fame spread after a Walgreens in Chicago made the split its signature dessert in the 1920s. Whatever the history, you'll find plenty food for thought at the annual Banana Split Festival, which takes place on the second weekend in June in Wilmington."
                  ],
                  LatLng: [45.69, 112.37]
                },
                {
                  img: 'assets/image/restaurant/cuisine/smores.jpg', title: "S'mores", content: 
                  [
                    "Proust's madeleines? We'll go you one better on remembrance of things past: s'mores.",
                    "Gooey, melty, warm and sweet -- nothing evokes family vacations and carefree camping under the stars quite like this classic American food.",
                    "Whether they were first to roast marshmallows and squish them between graham crackers with a bar of chocolate no one seems to know, but the Girl Scouts were the first to get the recipe down in the 1927 'Tramping and Trailing with the Girl Scouts,' transforming many a standard-issue campfire into a quintessential experience.",
                    "Celebrate sweetly on August 10: It's National S'mores Day. Get those marshmallow sticks sharpened."
                  ],
                  LatLng: [65.3, 110.45]
                }
              ]);
            res.end();
            break;
        case '02' :
            res.json([
                {   img: 'assets/image/restaurant/cuisine/cioppino.jpg', 
                    title: 'Cioppino', 
                    content: [
                            "San Francisco's answer to French bouillabaisse, cioppino (cho-pea-no) is fish stew with an Italian flair.",
                            "It's an American food that's been around since the late 1800s, when Portuguese and Italian fishermen who settled the North Beach section of the city brought their on-board catch-of-the-day stew back to land and area restaurants picked up on it.",
                            "Cooked in a tomato base with wine and spices and chopped fish (whatever was plentiful, but almost always crab), cioppino probably takes its name from the classic fish stew of Italy's Liguria region, where many Gold Rush era fishermen came from.",
                            "Get a memorable bowl at Sotto Mare in North Beach, Scoma's on Fisherman's Wharf, and Anchor Oyster Bar in the Castro District. Don't feel bad about going with the 'lazy man's' cioppino -- it only means you're not going to spend half the meal cracking shellfish."
                    ],
                    LatLng: [48.678, -30.8431]
                },
                {
                  img: 'assets/image/restaurant/cuisine/marylandcrabcakes.jpg', title: 'Maryland crabcakes', content: 
                  [
                    "The Chesapeake Bay yields more than just the regatta-loving suntanned class in their sock-free topsiders.",
                    "It's the home habitat of the blue crab, which both Maryland and Virginia claim as their own.",
                    "Boardwalk style (mixed with fillers and served on a bun) or restaurant/gourmet style; fried, broiled, or baked, crab cakes can be made with any kind of crab, but the blue crabs of Chesapeake Bay are preferred for both tradition and taste.",
                    "When Baltimore magazine rounded up the best places to get the city's signature food, editors declared simplicity the key, while lamenting the fact that most crabmeat doesn't even come from home turf these days. Kind of makes you crabby, doesn't it?"
                  ],
                  LatLng: [63.78, 155.37]
                },
                {
                  img: 'assets/image/restaurant/cuisine/potatochips.jpg', title: "Potato Chips", content: 
                  [
                    "We have a high-maintenance resort guest to thank for America's hands-down favorite snack.",
                    "Saratoga Springs, New York, 1853: Native American chef George Crum is in the kitchen at the elegant Moon Lake Lodge. A persnickety customer sends back his French fries (then highfalutin fare eaten with a fork) for being too thick. Crum makes a second, thinner, order.",
                    "Still too thick for the picky diner. Annoyed, Crum makes the next batch with a little attitude, slicing the potatoes so thin, the crispy things can't possibly be picked up with a fork. Surprise: the wafer-thin fried potatoes are a hit.",
                    "Traveling salesman Herman Lay sold them out of the trunk of his car before founding Lay's Potato Chips, the first nationally marketed brand. Lay's would ultimately merge in 1961 with Frito to create the snack behemoth Frito-Lay."
                  ],
                  LatLng: [65.3, 110.45]
                }
              ]);
            res.end();
            break;
    }
});

app.post('/searchfood', (req, res) => {
    console.log('search text is =>', req.body);
    let searchword = req.body;
    let foundres = [];
    let restaurantlists = [
        { name : "咚咚餐廳", price : "100 ~ 200 TWD", comment: "好吃甜甜的", img : "assets/image/restaurant/restaurant-1.jpg", id : "01" },
        { name : "哈摟餐廳", price : "300 ~ 600 TWD", comment: "好棒", img : "assets/image/restaurant/restaurant-2.jpg", id : "02" },
        { name : "每每餐廳", price : "600 ~ 944 TWD", comment : "吃起來不錯", img : "assets/image/restaurant/restaurant-3.jpg", id : "03"},
        { name : "美麗餐廳", price : "500 ~ 1200 TWD", comment : "一定要來吃", img : "assets/image/restaurant/restaurant-4.jpg", id : "04" },
        { name : "義大餐廳", price : "400 ~ 700 TWD", comment: "好吃鹹鹹的", img : "assets/image/restaurant/restaurant-1.jpg", id : "05" },
        { name : "樂樂餐廳", price : "500 ~ 600 TWD", comment: "有很多生菜, 不好吃", img : "assets/image/restaurant/restaurant-2.jpg", id : "06" },
        { name : "您好餐廳", price : "600 ~ 900 TWD", comment : "我喜歡它的米飯", img : "assets/image/restaurant/restaurant-3.jpg", id : "07" },
        { name : "安安餐廳", price : "500 ~ 800 TWD", comment : "義大利麵好吃", img : "assets/image/restaurant/restaurant-4.jpg", id : "08" },
        { name : "武道餐廳", price : "304 ~ 850 TWD", comment: "很有中國味", img : "assets/image/restaurant/restaurant-1.jpg", id : "09" },
        { name : "湯包餐廳", price : "100 ~ 220 TWD", comment: "湯包好吃", img : "assets/image/restaurant/restaurant-2.jpg", id : "10" },
        { name : "享用餐廳", price : "230 ~ 340 TWD", comment : "吃起來不錯", img : "assets/image/restaurant/restaurant-3.jpg", id : "11" },
        { name : "素菜餐廳", price : "800 ~ 1000 TWD", comment : "菜菜好吃喔", img : "assets/image/restaurant/restaurant-4.jpg", id : "12" }
    ]
    restaurantlists.forEach(res => {
        if(res.name === searchword){
            foundres.push(res);
        }
    });
    res.json(foundres);
    res.end();
});

app.get('/getcomment',(req, res) => {
    let restaurantId = req.query.restaurantId;
    switch(restaurantId){
        case '01':
            res.json({
                response: 'ok',
                comments:[
                    {title: 'Hello', content: 'I think this restaurant is great.', restaurantId: '01'},
                    {title: 'Good', content: 'I think this restaurant is execellent.', restaurantId: '01'},
                    {title: 'Great', content: 'I think this restaurant is not bad.', restaurantId: '01'},
                ]
            });
            res.end();
            break;
    }
});

app.post('/restaurantcomment', (req, res) => {
    console.log('comment is =>', req.body);
    let comments = [
        {title: 'Hello', content: 'I think this restaurant is great.', restaurantId: '01'},
        {title: 'Good', content: 'I think this restaurant is execellent.', restaurantId: '01'},
        {title: 'Great', content: 'I think this restaurant is not bad.', restaurantId: '01'},
    ]
    comments.push(req.body);
    // save req.body to DataBase
    res.json({response: 'ok', comments});
    res.end();
});
app.listen(4500, () => console.log('Server listen on port 4500!'));
