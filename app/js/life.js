
//var plan = ["############################",
//            "#      #    #      o      ##",
//            "#                          #",
//            "#          #####           #",
//            "##         #   #    ##     #",
//            "###           ##     #     #",
//            "#           ###      #     #",
//            "#   ####                   #",
//            "#   ##       o             #",
//            "# o  #         o       ### #",
//            "#    #                     #",
//            "############################"];
//
//function Vector(x, y) {
//    this.x = x;
//    this.y = y;
//}
//Vector.prototype.plus = function(other) {
//    return new Vector(this.x + other.x, this.y + other.y);
//};
//
//function Grid(width, height) {
//    this.space = new Array(width * height);
//    this.width = width;
//    this.height = height;
//}
//Grid.prototype.isInside = function(vector) {
//    return vector.x >= 0 && vector.x < this.width &&
//        vector.y >= 0 && vector.y < this.height;
//};
//Grid.prototype.get = function(vector) {
//    return this.space[vector.x + this.width * vector.y];
//};
//Grid.prototype.set = function(vector, value) {
//    this.space[vector.x + this.width * vector.y] = value;
//};
//
//var grid = new Grid(5, 5);
//grid.set(new Vector(1, 1), "X");
//grid.set(new Vector(1, 2), "Y");
//grid.set(new Vector(2, 2), "Z");
//
//console.log(grid.get(new Vector(1, 1)));

//function speak(line) {
//    console.log("А " + this.type + " кролик говорит '" + line + "'");
//}
//var whiteRabbit = {type: "белый", speak: speak};
//var fatRabbit = {type: "толстый", speak: speak};
//whiteRabbit.speak("Ушки мои и усики, я же наверняка опаздываю!");
//fatRabbit.speak("Мне бы сейчас морковочки.");
//speak.apply(fatRabbit, ["Отрыжка!"]);
//speak.call({type: "старый"}, "О, господи.");

// JAVASCRIPT EXERCISES

/*1. Напиши функцию создания генератора sequence(start, step). Она при вызове возвращает другую функцию-генератор, которая при каждом вызове дает число на 1 больше, и так до бесконечности. Начальное число, с которого начинать отсчет, и шаг, задается при создании генератора. Шаг можно не указывать, тогда он будет равен одному. Начальное значение по умолчанию равно 0. Генераторов можно создать сколько угодно.
*/
function sequence(start, step) {
    var start = start || 0, step = step || 1;
    return function() {
        return start +=step;
    };
}
console.log('Замыкания');
var generator1 = sequence(10, 2);
console.log( generator1() );
console.log( generator1() );
var generator2 = sequence(14, 102);
console.log( generator2() );
var generator3 = sequence();
console.log( generator3() );

/*2. Также, нужна функция take(gen, x) которая вызвает функцию gen заданное число (x) раз и возвращает массив с результатами вызовов. Она нам пригодится для отладки
*/
function take(gen, x){
    var arr = [];
    // С помощью lodash
    //_.times(x, function(){
    //    arr.push(gen());
    //});
    for (var i = 0; i < x; i++) {
        arr.push(gen());
    }
    return arr;
}
console.log('Множественный вызов');
var gen2 = sequence(0, 2);
console.log(take(gen2, 5)); // [2, 4, 6, 8, 10]

/* 3.
 Напиши функцию map(fn, array), которая принимает на вход функцию и массив, и обрабатывает каждый элемент массива этой функцией, возвращая новый массив. Обрати внимание: функция не должна изменять переданный ей массив:
 */

function map(fn, array){
    var array1 = [];
    for (var item in array) {
        array1.push(fn(item));
    }
    return array1;
}
function square(x) { return x * x; }
console.log('Выборка');
console.log(map(square,[1,2,3,4]));

/*
 Напиши функцию fmap(a, gen), которая принимает на вход 2 функции, a и gen, где gen — функция-генератор вроде той, что была в первом задании. fmap возвращает новую функцию-генератор, которая при каждом вызове берет следующее значение из gen и пропускает его через функцию a.
 */
console.log('Генератор. Принимает значение и функцию. Пропускает значение через функцию. Может принимать функцию с параметрами');
function fmap(a, gen){
    return function() {
        return a(gen.apply(this,arguments));
    };
}
var gen = sequence(0, 1);
var squareGen = fmap(square, gen);
console.log(squareGen());
console.log(squareGen());
console.log(squareGen());
/*А, еще, сделай тогда, чтобы в качестве gen можно было указать функцию с аргументами, и при вызове*/
function add(a, b) {
    return a + b;
}
/* Мы получаем новую функцию, которая вызвает add, и результат пропускает через функцию square
 Эти аргументы бы передавались функции gen. Аргументов может быть любое количество.
 */
var squareAdd = fmap(square, add);
console.log(squareAdd(2, 3));
console.log(squareAdd(5, 7));

/* 5. Частичное применение
 Напиши функцию partial(fn, a1, a2, ....), которая позволяет зафиксировать один или несколько аргументов функции. Пример:

 function add(a, b) { return a + b; }
 function mult(a, b, c, d) { return a * b * c * d; }

 var add5 = partial(add, 5); // Мы получили функцию с 1 аргументом, которая прибавляет к любому числу 5

 console.log(add5(2)); // 7
 console.log(add5(10)); // 15
 console.log(add5(8)); // 13

 var mult23 = partial(mult, 2, 3); // мы зафиксировали первые 2 аргумента mult() как 2 и 3

 console.log(mult23(4, 5)); // 2*3*4*5 = 120
 console.log(mult23(1, 1)); // 2*3*1*1 = 6
 Есть функция с аргументами:

 f1(a, d, c, d)
 Мы можем с помощью partial сделать из нее функцию с меньшим числом аргументов, заранее задав значения для нескольких из них, например:

 var f2 = partial(f1, 1, 2); // фиксируем a = 1, b = 2
 И вызов:

 f2(x, y)
 будет равносилен вызову:

 f1(1, 2, x, y)

 */
console.log('Частичное применение');
function partial(fn){
    var args=[];
    for (var i=1;i<arguments.length;i++) {
        args[i-1] = arguments[i];
    }
    return function() {
        var x = arguments.length + args.length;
        for (var i=x; i>0;i--) {
            arguments[x] = arguments[arguments.length-1];
        }
        for (var i = args.length; i >= 0;i--){
            arguments[args.length-1] = args[args.length-1];
        }
        console.log(arguments);
    }

}

function mult(a, b, c, d) { return a * b * c * d; }
var x = partial(mult,5);
//console.log(x);
x(1,2,3);