

// this file contains a range of small convenience functions to keep other code cleaner

export let rightDir = { x:  1, y:  0 }
export let leftDir  = { x: -1, y:  0 }
export let upDir    = { x:  0, y:  1 }
export let downDir  = { x:  0, y: -1 }
export let centerCoord  = { x:  0.5, y: 0.5 }
export let center = 0.5

export interface Coord {
    x:number
    y:number
}

export function sign(x:number):number {
    if (x == 0)
        return 0
    if (x < 0)
        return -1

    return 1
}

export function randBetween(min:number, max:number):number {
    return min + Math.floor(Math.random()*(max-min))
}




export function isObject(value:number):boolean {
    return typeof value === 'object' && !Array.isArray(value) && value !== null
}

export function isNumber(value:number):boolean {
    return typeof(value) == "number"
}


export function getFraction(x:number):number {
    return x-parseInt(x+"") 
}

export function hashCoord(coord:Coord):string {
    return "x"+coord.x+"y"+coord.y
}

export function addCoord(c1:Coord, c2:Coord):Coord {
    return { x: c1.x + c2.x, y: c1.y + c2.y }
}
export function subtractCoord(c1:Coord, c2:Coord):Coord {
    return { x: c1.x - c2.x, y: c1.y - c2.y }
}

export function magnitude(vector:Coord):number {
    let dx2 = vector.x * vector.x
    let dy2 = vector.y * vector.y
    return Math.sqrt(dx2+dy2)
}

export function forAll(enumerator:any, func:any, logInvalidEnumerator = true) {
    if(isObject(enumerator))
        for(var index in enumerator)
            func(enumerator[index])
    else if(Array.isArray(enumerator))
        for (var i = 0; i < enumerator.length; i++)
            func(enumerator[i])
    else {
        if(logInvalidEnumerator)
            console.error("forAll: not a supported enumerator:", enumerator)
        return -1
    }

}

export function removeItem<Item>(array:Item[], item:Item) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == item) {
            array.splice(i, 1)
            break
        }
    }
}

export function binarySearch(array:number[], value:number) {
    //USE: Assumes a sorted array in ascending order 
    let low = 0
    let high = array.length

    while (low < high) {
        let mid = Math.floor((low + high) / 2)
        if (array[mid] < value) 
            low = mid + 1
        else 
            high = mid
    }
    return low
}


// assumes a none empty list
export function minimumBy<T>(list:T[], compareFunc:(item:T) => number):T {
    return maximumBy(list, (item:T) => -compareFunc(item))
}

// assumes a none empty list
export function maximumBy<T>(list:T[], compareFunc:(item:T) => number):T {
    let maxI = 0
    let maxValue = Number.MIN_VALUE
    for (var i = 0; i < list.length; i++) {
        let value = compareFunc(list[i])
        if (maxValue < value) {
            maxI = i
            maxValue = value
        }  
    }

    return list[maxI]
}


export function getSecondsElapsed(thenInMS:number) {
    return (performance.now() - thenInMS) / 1000
}

let somePrimes:any = { 
    2:0,
    3:1,
    5:2,
    7:3,
    11:4,
    13:5,
    17:6,
    19:7,
    23:8
}
export function factor(n:number):any {
    let output:number[] = []
    
    if (isNaN(n) || !isFinite(n) || n%1!=0 || n==0) 
        console.error("factor: n", n)
    if (n<0) 
        return '-' + factor(-n);
    var minFactor = leastFactor(n);
    
    if (n==minFactor) 
        return '' + n;

    return minFactor + '*' + factor(n/minFactor);
}
   
// find the least factor in n by trial division
export function leastFactor(n:number):number {
    if (isNaN(n) || !isFinite(n)) return NaN;  
    if (n==0) return 0;  
    if (n%1 || n*n<2) return 1;
    if (n%2==0) return 2;  
    if (n%3==0) return 3;  
    if (n%5==0) return 5;  

    var m = Math.sqrt(n);

    for (var i=7;i<=m;i += 30) {
        if (n%i==0)      return i;
        if (n%(i + 4)==0)  return i + 4;
        if (n%(i + 6)==0)  return i + 6;
        if (n%(i + 10)==0) return i + 10;
        if (n%(i + 12)==0) return i + 12;
        if (n%(i + 16)==0) return i + 16;
        if (n%(i + 22)==0) return i + 22;
        if (n%(i + 24)==0) return i + 24;
    }
    
    return n;
}