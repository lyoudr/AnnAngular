const LinkedList = require('./linkedlist');

/* Dictionary */
function Dictionary (){
    var items = {};
    this.has = function(key){
        return key in items;
    }
    this.set = function(key, value){
        items[key] = value
    }
    this.keys = function(){
        if(this.size){
            return Object.keys(items);
        }
        return false;
    }
    this.remove = function(key){
        if(this.has(key)){
            delete items[key];
            return true;
        }
        return false;
    }
    this.get = function(key){
        return this.has(key) ? items[key] : undefined;
    }
    this.values = function(){
        var values = [];
        for(var k in items){
            if(this.has(k)){
                values.push(items[k]);
            }
        }
        return values;
    }
    this.size = function(){
        return Object.keys(items).length;
    }
    this.clear = function(){
        items = {};
    }
}

/* HashMap */
// HashMap is one type of Dictionary data structure
function HashTable(){
    var table = [];
    var loseloseHashCode = function (key){
        var hash = 0;
        for(var i = 0; i < key.length; i++){
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    }
    var ValuePair = function(key, value){
        this.key = key;
        this.value = value;
        this.toString = function(){
            return '[' + this.key + ' - ' + this.value + ']';
        };
    }
    this.put = function(key, value){
        var position = loseloseHashCode(key);
        console.log(position + '-' + key);
        if(table[position] == undefined){
            table[position] = new LinkedList();
        }
        table[position].append(new ValuePair(key, value));
    }
    this.get  = function(key) {
        var position = loseloseHashCode(key);
        if(table[position] !== undefined){
            var current = table[position].getHead();
            while(current.next){
                if(current.element.key === key){
                    return current.element.value;
                }
                current = current.next;
            }
            if(current.element.key === key){
                return current.element.value;
            }
        }
        return undefined;
    }
    this.remove = function(key) {
        var position = loseloseHashCode(key);
        if(table[position] !== undefined){
            var current = table[position].getHead();
            while(current.next){
                if(current.element.key === key){
                    table[position].remove(current.element);
                    if(table[position].isEmpty()){
                        table[position] = undefined;
                    }
                    return true;
                }
                current = current.next;
            }
            if(current.element.key === key){
                table[position].remove(current.element);
                if(table[position].isEmpty()){
                    table[position] = undefined;
                }
                return true;
            }
        }
        return false;
    }
    this.print = function(){
        for(var i = 0; i < table.length; i++){
            if(table[i] !== undefined){
                console.log(i + '=>' + table[i]);
            }
        }
    }
}

module.exports = HashTable;