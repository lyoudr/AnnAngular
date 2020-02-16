import { RestaurantService } from './restaurant.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';

let restaurant_Comments;
let restaurant_Rank;
let restaurant_Info;

describe('*Service* => RestaurantService', () => {
    let restaurantService : RestaurantService;
    let httpClient: HttpClient;
    let httpTestingController : HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                HttpClientModule
            ],
            providers: [
                RestaurantService
            ]
        });
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        restaurantService = TestBed.inject(RestaurantService);
        // comment towards each restaurant
        restaurant_Comments = {
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
        restaurant_Rank = [
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
        // each restaurant 經緯度、image、title、content、star info
        restaurant_Info = {
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
    });

    it('#Getrestaurantlists', async() => {
        let testData = [
            { name : "義大餐廳", price : "400 ~ 700 TWD", comment: "好吃鹹鹹的", img : "assets/image/restaurant/restaurant-1.jpg", id : "05", starrank: restaurant_Rank[4].rank },
            { name : "樂樂餐廳", price : "500 ~ 600 TWD", comment: "有很多生菜, 不好吃", img : "assets/image/restaurant/restaurant-2.jpg", id : "06", starrank: restaurant_Rank[5].rank },
            { name : "您好餐廳", price : "600 ~ 900 TWD", comment : "我喜歡它的米飯", img : "assets/image/restaurant/restaurant-3.jpg", id : "07", starrank: restaurant_Rank[6].rank },
            { name : "安安餐廳", price : "500 ~ 800 TWD", comment : "義大利麵好吃", img : "assets/image/restaurant/restaurant-4.jpg", id : "08", starrank: restaurant_Rank[7].rank }
        ];
        restaurantService.Getrestaurant(1, 'righteous').subscribe(data =>
            expect(data).toEqual(testData)
        );
        const req = httpTestingController.expectOne('http://127.0.0.1:4500/restaurantlists/?page=1&classification=righteous');
        expect(req.request.method).toEqual('GET');
        req.flush(testData);
        httpTestingController.verify();
    });

    it('#GetPost', async() => {
        let returnedData = restaurant_Info[`restaurant_01`];
        restaurantService.GetPost(1).subscribe(data => {
            expect(data).toEqual(returnedData);
        });
        const req = httpTestingController.expectOne('http://127.0.0.1:4500/restaurantpost?restaurantId=1');
        expect(req.request.method).toEqual('GET');
        req.flush(returnedData);
        httpTestingController.verify();
    });
});