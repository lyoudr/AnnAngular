const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const multer = require('multer');
const upload = multer();
const util = require('util');
const cors = require('cors');
const readdir = util.promisify(fs.readdir);
const jwt = require('jsonwebtoken');
const config = require('./config');
const middleware = require('./middleware');

/* Static Files */
app.use(express.static('../Ann/dist/Ann'));
app.use(express.static('./shop'));

/* Allow bodyParser */
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/json
app.use(bodyParser.json());
// for parsing text
app.use(bodyParser.text());

/* Allow CORS */
app.use(cors());

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

/* Server listen port */
app.listen(4500, () => console.log('Server listen on port 4500!'));


/*Login */
// 1. Generate Token 
class HandlerGenerator {
    login(req, res){
        let username = req.body.name;
        let password = req.body.password;
        // For the given user name fetch user from DB
        let mockedUsername = 'Json' || 'Joy' || 'Amy' || 'Tonal' || 'Joanna';
        let mockedPassword = 'json123' || 'joy123' || 'amy123' || 'tonal123' || 'joanna123';
        if(username && password){
            if(username === mockedUsername && password === mockedPassword){
                let token = jwt.sign(
                    {username: username, password: password},
                    config.secret,
                    {expiresIn: '24h'}
                )
                // return the JWT token for the future API calls
                res.json({
                    sucess: true,
                    message: 'OK',
                    token : token
                });
            } else {
                res.send(401).json({
                  success: false,
                  message: 'Authentication failed! Please check the request'
                });
            }
        }
    }
    index (req, res, next) {
        res.json({
          success: true,
          message: 'Index page'
        });
        next();
    }
};
// 2. Instantiate HandlerGenerator
const tokenHandler = new HandlerGenerator();
// 3. Log In verify
app.post('/login', tokenHandler.login);

/* Blog */
    // addPost
    app.post('/blogpost', middleware.checkToken , (req, res) => {
        const date = new Date();
        res.json({title: req.body.title, content: req.body.post, date: date});
        res.end();
    });
    // upLoadFile
    app.post('/postFile', middleware.checkToken ,upload.single('filekey') ,(req, res) => {
        const formData = req.file;
        res.send(formData);
        res.end();
    });
    // get post content 
    app.get('/getpost', middleware.checkToken ,(req, res) => {
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

/* Piano */
    // get sheet music
    app.get('/getsheet', middleware.checkToken ,(req, res) => {
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
    });
    // getmusicsheet 
    app.get('/getmusicsheet', middleware.checkToken ,(req, res) => {
        let musictype = req.query.musictype;
        console.log('musictype is =>'< musictype);
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

/* Discuss */
    // getMessage
    app.get('/getmessage', middleware.checkToken ,(req, res) => {
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
    app.post('/search_discuss_sidenav', middleware.checkToken ,(req, res)=>{
        let foundfriend = [];
        let findword = '';
        findword += req.body; 
        const friendlists = ['Json', 'Joy', 'Joanna', 'Amy', 'Tonal'];
        friendlists.forEach((name) => {
            if(name.substring(0, findword.length) == findword){
                foundfriend.push({'name': name});
            };
        });
        res.json(foundfriend);
        res.end();
    });

/* Restaurant */
    // comment towards each restaurant
    const restaurant_Comments = {
        'restaurant_01': [
            {title: 'Hello', content: 'I think this restaurant is great.', restaurantId: '01', rankstar: 2},
            {title: 'Good', content: 'I think this restaurant is execellent.', restaurantId: '01', rankstar: 4},
            {title: 'Great', content: 'I think this restaurant is not bad.', restaurantId: '01', rankstar: 3},
        ],
        'restaurant_02':[
            {title: 'Good Taste', content: 'I never taste something like this. it is execellent', restaurantId: '02',rankstar: 5},
            {title: 'Great', content: 'I think I will visit here again', restaurantId: '02', rankstar: 4},
            {title: 'Hot', content: 'To me, it is too hot.', restaurantId: '02', rankstar: 4},
        ]
    };
    // count star rank function
    const rankStars = function (restaurantId){
        let sum = 0;
        restaurant_Comments[restaurantId].forEach(item =>{
            sum = sum + item.rankstar;
        });
        let starresult = sum/restaurant_Comments[restaurantId].length;
        return starresult;
    }
    // each restaurant's star
    const restaurant_Rank = [
        {Id: '01', rank: rankStars('restaurant_01')},
        {Id: '02', rank: rankStars('restaurant_02')},
        {Id: '03', rank: ''},
        {Id: '04', rank: ''},
        {Id: '05', rank: ''},
        {Id: '06', rank: ''},
        {Id: '07', rank: ''},
        {Id: '08', rank: ''},
        {Id: '09', rank: ''},
        {Id: '10', rank: ''},
        {Id: '11', rank: ''},
        {Id: '12', rank: ''}
    ];
    // Restaurant lists
    const restaurant_Lists = {
        'sweet':[
            { name : "咚咚餐廳", price : "100 ~ 200 TWD", comment: "好吃甜甜的", img : "assets/image/restaurant/restaurant-1.jpg", id : "01", starrank: restaurant_Rank[0].rank },
            { name : "哈摟餐廳", price : "300 ~ 600 TWD", comment: "好棒", img : "assets/image/restaurant/restaurant-2.jpg", id : "02", starrank: restaurant_Rank[1].rank },
            { name : "每每餐廳", price : "600 ~ 944 TWD", comment : "吃起來不錯", img : "assets/image/restaurant/restaurant-3.jpg", id : "03", starrank: restaurant_Rank[2].rank},
            { name : "美麗餐廳", price : "500 ~ 1200 TWD", comment : "一定要來吃", img : "assets/image/restaurant/restaurant-4.jpg", id : "04", starrank: restaurant_Rank[3].rank }
        ],
        'righteous':[
            { name : "義大餐廳", price : "400 ~ 700 TWD", comment: "好吃鹹鹹的", img : "assets/image/restaurant/restaurant-1.jpg", id : "05", starrank: restaurant_Rank[4].rank },
            { name : "樂樂餐廳", price : "500 ~ 600 TWD", comment: "有很多生菜, 不好吃", img : "assets/image/restaurant/restaurant-2.jpg", id : "06", starrank: restaurant_Rank[5].rank },
            { name : "您好餐廳", price : "600 ~ 900 TWD", comment : "我喜歡它的米飯", img : "assets/image/restaurant/restaurant-3.jpg", id : "07", starrank: restaurant_Rank[6].rank },
            { name : "安安餐廳", price : "500 ~ 800 TWD", comment : "義大利麵好吃", img : "assets/image/restaurant/restaurant-4.jpg", id : "08", starrank: restaurant_Rank[7].rank }
        ],
        'chinese':[
            { name : "武道餐廳", price : "304 ~ 850 TWD", comment: "很有中國味", img : "assets/image/restaurant/restaurant-1.jpg", id : "09", starrank: restaurant_Rank[8].rank },
            { name : "湯包餐廳", price : "100 ~ 220 TWD", comment: "湯包好吃", img : "assets/image/restaurant/restaurant-2.jpg", id : "10", starrank: restaurant_Rank[9].rank },
            { name : "享用餐廳", price : "230 ~ 340 TWD", comment : "吃起來不錯", img : "assets/image/restaurant/restaurant-3.jpg", id : "11", starrank: restaurant_Rank[10].rank },
            { name : "素菜餐廳", price : "800 ~ 1000 TWD", comment : "菜菜好吃喔", img : "assets/image/restaurant/restaurant-4.jpg", id : "12", starrank: restaurant_Rank[11].rank }
        ]

    };
    // each restaurant 經緯度、image、title、content、star info
    const restaurant_Info = {
        'restaurant_01':{
            starrank: restaurant_Rank[0].rank,
            LatLng: [35.2271, -80.8431],
            dishes:[
                {   
                    img: 'assets/image/restaurant/cuisine/tater_tots.jpg', 
                    title: 'Tater tots', 
                    content: [
                        "We love French fries, but for an American food variation on the potato theme, one beloved at Sonic drive-ins and school cafeterias everywhere, consider the Tater Tot.",
                        "Notice it often has the registered trademark -- these commercial hash brown cylinders are indeed proprietary to the Ore-Ida company. If you'd been one of the Grigg brothers who founded Ore-Ida, you'd have wanted to come up with something to do with leftover slivers of cut-up potatoes, too. They added some flour and seasoning and shaped the mash into tiny tots and put them on the market in 1956. A little more than 50 years later, America is eating about 32 million kilos of these taters annually."
                    ],
                },
                {
                    img: 'assets/image/restaurant/cuisine/banana_split.jpg', 
                    title: 'Banana Split', 
                    content: [
                        "Like the banana makes it good for you. Still, kudos to whoever invented the variation of the sundae known as the banana split. There's the 1904 Latrobe, Pennsylvania, story, in which future optometrist David Strickler was experimenting with sundaes at a pharmacy soda fountain, split a banana lengthwise, and put it in a long boat dish.",
                        "And the 1907 Wilmington, Ohio, story, wherein restaurant owner Ernest Hazard came up with it to draw students from a nearby college. Fame spread after a Walgreens in Chicago made the split its signature dessert in the 1920s. Whatever the history, you'll find plenty food for thought at the annual Banana Split Festival, which takes place on the second weekend in June in Wilmington."
                    ]
                },
                {
                    img: 'assets/image/restaurant/cuisine/smores.jpg', 
                    title: "S'mores", 
                    content: [
                        "Proust's madeleines? We'll go you one better on remembrance of things past: s'mores.",
                        "Gooey, melty, warm and sweet -- nothing evokes family vacations and carefree camping under the stars quite like this classic American food.",
                        "Whether they were first to roast marshmallows and squish them between graham crackers with a bar of chocolate no one seems to know, but the Girl Scouts were the first to get the recipe down in the 1927 'Tramping and Trailing with the Girl Scouts,' transforming many a standard-issue campfire into a quintessential experience.",
                        "Celebrate sweetly on August 10: It's National S'mores Day. Get those marshmallow sticks sharpened."
                    ]
                }
            ]
        },
        'restaurant_02':{
            starrank: restaurant_Rank[1].rank,
            LatLng:[48.678, -30.8431],
            dishes:[
                {   img: 'assets/image/restaurant/cuisine/cioppino.jpg', 
                    title: 'Cioppino', 
                    content: [
                            "San Francisco's answer to French bouillabaisse, cioppino (cho-pea-no) is fish stew with an Italian flair.",
                            "It's an American food that's been around since the late 1800s, when Portuguese and Italian fishermen who settled the North Beach section of the city brought their on-board catch-of-the-day stew back to land and area restaurants picked up on it.",
                            "Cooked in a tomato base with wine and spices and chopped fish (whatever was plentiful, but almost always crab), cioppino probably takes its name from the classic fish stew of Italy's Liguria region, where many Gold Rush era fishermen came from.",
                            "Get a memorable bowl at Sotto Mare in North Beach, Scoma's on Fisherman's Wharf, and Anchor Oyster Bar in the Castro District. Don't feel bad about going with the 'lazy man's' cioppino -- it only means you're not going to spend half the meal cracking shellfish."
                    ]
                },
                {
                    img: 'assets/image/restaurant/cuisine/marylandcrabcakes.jpg', 
                    title: 'Maryland crabcakes', 
                    content: 
                    [
                        "The Chesapeake Bay yields more than just the regatta-loving suntanned class in their sock-free topsiders.",
                        "It's the home habitat of the blue crab, which both Maryland and Virginia claim as their own.",
                        "Boardwalk style (mixed with fillers and served on a bun) or restaurant/gourmet style; fried, broiled, or baked, crab cakes can be made with any kind of crab, but the blue crabs of Chesapeake Bay are preferred for both tradition and taste.",
                        "When Baltimore magazine rounded up the best places to get the city's signature food, editors declared simplicity the key, while lamenting the fact that most crabmeat doesn't even come from home turf these days. Kind of makes you crabby, doesn't it?"
                    ]
                },
                {
                    img: 'assets/image/restaurant/cuisine/potatochips.jpg', 
                    title: "Potato Chips", 
                    content: 
                    [
                        "We have a high-maintenance resort guest to thank for America's hands-down favorite snack.",
                        "Saratoga Springs, New York, 1853: Native American chef George Crum is in the kitchen at the elegant Moon Lake Lodge. A persnickety customer sends back his French fries (then highfalutin fare eaten with a fork) for being too thick. Crum makes a second, thinner, order.",
                        "Still too thick for the picky diner. Annoyed, Crum makes the next batch with a little attitude, slicing the potatoes so thin, the crispy things can't possibly be picked up with a fork. Surprise: the wafer-thin fried potatoes are a hit.",
                        "Traveling salesman Herman Lay sold them out of the trunk of his car before founding Lay's Potato Chips, the first nationally marketed brand. Lay's would ultimately merge in 1961 with Frito to create the snack behemoth Frito-Lay."
                    ]
                }
            ]
        }
    }
    
    // Get restaurant lists
    app.get('/restaurantlists', middleware.checkToken ,(req, res) =>{
        let page = req.query.page;
        let classification = req.query.classification;
        if (page == 1) {
            res.json(restaurant_Lists[`${classification}`]);
            res.end();
        }
    });
    // Get gudiance to each restaurants
    app.get('/restaurantpost', middleware.checkToken ,(req, res)=>{
        let restaurantId = req.query.restaurantId;
        res.json(restaurant_Info[`restaurant_${restaurantId}`]);
        res.end();
    });
    // Get comments towards each restaurant
    app.get('/getcomment', middleware.checkToken ,(req, res) => {
        let restaurantId = req.query.restaurantId;
        res.json({
            response: 'ok',
            comments:restaurant_Comments[`restaurant_${restaurantId}`]
        });
        res.end();  
    });
    // search restaurant
    app.post('/searchfood', middleware.checkToken ,(req, res) => {
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
    // Post comment about each restaurant to Server
    app.post('/restaurantcomment', middleware.checkToken ,(req, res) => {
        let eachcomment = req.body;
        restaurant_Comments[`restaurant_${eachcomment.restaurantId}`].push(eachcomment);
        let comments = restaurant_Comments[`restaurant_${eachcomment.restaurantId}`];
        res.json({response: 'ok', comments});
        res.end();
    });

/* Calendar */
    const Memorandum = {
        'Json': {},
        'Joy': {},
        'Amy': {},
        'Tonal': {},
        'Joanna': {}
    };
    // Get memorandum of each user in each month
    app.get('/getcalendar', middleware.checkToken ,(req, res) => {
        let month = req.query.month;
        let user = req.query.user;
        let founddata = Memorandum[user][month];
        res.json(founddata);
        res.end();
    });
    // Post personal memorandum to server
    app.post('/postcalendar', middleware.checkToken ,(req, res) => {
        let calendar = req.body;
        console.log('calendar is =>', calendar);
        let user = calendar.user;
        Memorandum[user] = calendar.data;
        res.json({calendar: 'ok'});
        res.end();
    });
    // Get detail of each memorandum
    app.post('/getmemorandumdetail', middleware.checkToken, (req, res) => {
        const user = req.body.user;
        const month = req.body.month;
        const date = req.body.date;
        const Id = req.body.Id;
        let foundDetail;
        Memorandum[user][month].forEach(item => { 
            if(item.date === date){
                item.data[0].forEach(item2 => {
                    if(item2.Id === Id){
                        foundDetail = item2;
                        return;
                    }
                    return;
                });
            };
            return;
        });
        res.json({detail : foundDetail});
        res.end();
    });

/* Commodities */
    app.get('/popularItems', middleware.checkToken ,(req, res) => {
        res.json([
            {name: 'Gray Shoe', price: 20.00, picture: ''},
            {name: 'Blue Shoe High Heels', price: 28.00, picture: ''},
            {name: 'Danim Jacket', price: 28.00, picture: ''},
            {name: 'Leather Green Bag', price: 25.00, picture: ''},
            {name: 'Smooth Cloth', price: 15.00, picture: ''},
            {name: 'Yellow Jacket', price: 58.00, picture: ''},
            {name: 'Bag', price: 17.00, picture: ''},
            {name: 'Coat', price: 16.00, picture: ''},
            {name: 'Beautiful Dress', price: 23.00, picture: ''},
            {name: 'Cool Jeans', price: 10.00, picture: ''},
            {name: 'Styled Jeans', price: 12.00, picture: ''},
            {name: 'Shoes', price: 20.00, picture: ''},
            {name: 'Skirt', price: 18.00, picture: ''},
            {name: 'Down Jacket', price: 16.50, picture: ''},
            {name: 'Hat', price: 17.50, picture: ''},
            {name: 'Outfit pretty', price: 23.50, picture: ''},
            {name: 'Beggie Outfit', price: 22.50, picture: ''},
            {name: 'Pants', price: 21.50, picture: ''},
            {name: 'Scarf', price: 20.50, picture: ''},
            {name: 'Sunglasses', price: 30.50, picture: ''},
        ]);
    });

    app.get('/popularItemsPhoto', middleware.checkToken ,async(req, res) => {
        const shopitems = [
            'grey_shoe.jpg', 
            'blue_shoe_high_heels.jpg', 
            'danim_jacket.jpg', 
            'leather_green_bag.jpg', 
            'smooth_clothes.jpg', 
            'yellow_jacket.jpg',
            'bag.jpg', 
            'coat.jpg', 
            'dress.jpg', 
            'jeans.jpg', 
            'jeans_2.jpg', 
            'shoes.jpg',
            'skirt.jpg', 
            'down_jacket.jpg', 
            'hat.jpg', 
            'outfit_1.jpg', 
            'outfit_2.jpg', 
            'pants.jpg',
            'scarf.jpg', 
            'sunglasses.jpg', 
        ];
        const shoparr = [];
        let count = 0;
        shopitems.forEach((item ,index) => {
            fs.readFile(`./shop/${item}`,'base64',(err, image) => {
                count++;
                let imgUrl = `data:image/jpeg;base64, ${image}`;
                shoparr.push(imgUrl);
                if(count == shopitems.length){
                    res.json(shoparr);
                    res.end();
                }
            });
        });
    });

    app.post('/getcommditydetail', middleware.checkToken ,(req, res) => {
        console.log('getcommditydetail body is =>', req.body);
        res.json({"status": "ok", "code": "200"});
        res.end();
    });

