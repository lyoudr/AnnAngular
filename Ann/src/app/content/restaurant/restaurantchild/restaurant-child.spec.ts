import { RestaurantChildComponent } from './restaurant-child.component';

let resComp;
let restaurant_Rank;
let restaurant_Comments;

describe('*Component* => RestaurantChildComponent', () => {
    beforeEach(() => {
        resComp = new RestaurantChildComponent();
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
    });

    it('#CheckSize', () => {
        let result_1 = [{
            name: "咚咚餐廳",
            price: "100 ~ 200 TWD",
            comment: "好吃甜甜的",
            img: "assets/image/restaurant/restaurant-1.jpg",
            id: "01",
            starrank: 3
        }];
        resComp.type = 'sweet';
        resComp.restaurantlists = [
            { name : "咚咚餐廳", price : "100 ~ 200 TWD", comment: "好吃甜甜的", img : "assets/image/restaurant/restaurant-1.jpg", id : "01", starrank: restaurant_Rank[0].rank },
            { name : "哈摟餐廳", price : "300 ~ 600 TWD", comment: "好棒", img : "assets/image/restaurant/restaurant-2.jpg", id : "02", starrank: restaurant_Rank[1].rank },
            { name : "每每餐廳", price : "600 ~ 944 TWD", comment : "吃起來不錯", img : "assets/image/restaurant/restaurant-3.jpg", id : "03", starrank: restaurant_Rank[2].rank},
            { name : "美麗餐廳", price : "500 ~ 1200 TWD", comment : "一定要來吃", img : "assets/image/restaurant/restaurant-4.jpg", id : "04", starrank: restaurant_Rank[3].rank }
        ];
        resComp.CheckSize(true, 'low');
        expect(resComp.restaurantlists).toEqual(result_1);
        // subscribe to resetEvent
        resComp.resetEvent.subscribe(data => {
            expect(data).toBe(resComp.type);
        });
    });
    
    it('#ChangeCurrency', () => {
       expect(resComp.currency).toBe('TWD');
       resComp.ChangeCurrency(true, 'USD');
       expect(resComp.currency).toBe('USD');
    });
});