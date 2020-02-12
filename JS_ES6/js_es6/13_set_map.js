// ——————————————————————————————————————————
// Set & Map
// 세트, 맵 활용
// ——————————————————————————————————————————

// Set
// Set 객체는 값 콜렉션(Collections)으로 삽입된 순서대로 요소들을 반복(iterate) 할 수 있습니다.
// ——————————————————————————————————————————

// Array vs Set

// 배열 (Array)
const features = ['modules', 'arrow function', 'let, const', 'rest parameter', 'modules'];
console.log(features.length, features[0]);// 5 "modules"

// 세트 (Set) : new Set([iterable]);
const features_set = new Set(features);
console.log(features_set);// Set(4) {"modules", "arrow function", "let, const", "rest parameter"}
console.log(features_set.size, features_set[0]);// 4 undefined

// Set 객체의 속성`.size`는 아이템 개수를 반환합니다.

// Array 객체와 달리 Set 객체는 동일한 아이템을 포함하지 않습니다.
// 즉, 저장한 데이터는 유일무이(唯一無二)한 데이터입니다.

// Array 객체에 포함된 'modules' 문자열 원시 값은 동일한 값으로 단 하나의 값만 저장됩니다.
// Set 객체를 사용하면 Array 객체의 아이템 중, 중복되는 것을 제거하는데 용이합니다.

// Array 객체와 달리 Set[index] 방법으로는 아이템에 접근할 수 없습니다.


// Set.prototype

// Set.prototype 객체
console.dir(Set.prototype);
// .constructor
// .size
// .add()
// .has()
// .delete()
// .clear()
// .forEach()
// .entries()
// .keys()
// .values()


// .size & .add() & .has()

// Set 객체 생성
const phones = new Set(); // Set(0) {}

// 아이템 추가
phones.add('iPhoneX'); // Set(1) {"iPhoneX"}
phones.add('Note 8');  // Set(2) {"iPhoneX", "Note 8"}
phones.add('V30');     // Set(3) {"iPhoneX", "Note 8", "V30"}

// 저장된 아이템 개수 출력
console.log(phones.size); // 3

// 아이템 소유 여부 확인
console.log(phones.has('V30')); // true
console.log(phones.has('Windows')); // false

// 'Mi5' 아이템이 phones 세트에 저장되어 있지 않다면?
if (!phones.has('Mi5')) {
    // phones 세트에 'Mi5' 아이템을 저장
    phones.add('Mi5');
    console.log(phones.size); // 4
}


// .delete () & .clear()

// phones 세트
phones; // Set(4) {"iPhoneX", "Note 8", "V30", "Mi5"}

// 아이템 제거
console.log(phones.delete('iPhoneX')); // true
console.log(phones.delete('Blackberry')); // false

// 저장된 아이템 개수 출력
console.log(phones.size); // 3

// 저장된 아이템 모두 제거
phones.clear(); 
console.log(phones); // Set(0) {}


// .forEach()

// phones 세트
phones; // Set(4) {"iPhoneX", "Note 8", "V30", "Mi5"}

// 아이템 순환
phones.forEach((phone) => console.log(phone));
// iPhoneX
// Note 8
// V30
// Mi5

// 전달인자 검토
phones.forEach((...args) => console.log(args));
// (3) ["iPhoneX", "iPhoneX", Set(4)]
    // 0: "iPhoneX"
    // 1: "iPhoneX"
    // 2: Set(4) { "iPhoneX", "Note 8", "V30", "Mi5" } 
    // length: 3
    // __proto__: Array(0)
// (3) ["Note 8", "Note 8", Set(4)]
// (3) ["V30", "V30", Set(4)]
// (3) ["Mi5", "Mi5", Set(4)]


// for~of

// phones 세트
phones; // Set(4) {"iPhoneX", "Note 8", "V30", "Mi5"}

// for문으로 Set 객체를 순환 한다면?
for (let i = 0, l=phones.size; i < l; i++) {
    console.log(phones[i]); // undefined x4
}

// for~in 문으로 Set 객첼ㄹ 순환 한다면?
for (let key in phones) {
    console.log(key, phones[key]); // 아무것도 안뜸.key값이 안나옴
}

// for~of 문으로 Set 객체를 순환 한다면?
for (let phone of phones) {
    console.log(phone);
    // iPhoneX
    // Note 8
    // V30
    // Mi5
}



// mapping & filtering

// phones 세트
phones; // Set(4) {"iPhoneX", "Note 8", "V30", "Mi5"}

// 매핑 (Mapping)
// 세트 -> 배열 변환 후,  .map() 메서드 활용.
// Array.from() 또는 [...세트] 사용
let upgradePhones = new Set( [...phones].map((phone) => `upgrade ${phone}`) );
console.log(upgradePhones); // Set(4) { "upgrade iPhoneX", "upgrade Note 8", "upgrade V30", "upgrade Mi5" }

// 필터링 (Filtering)
// 아이템 글자 개수가 10개 이상인 것만 필터링
let filteredPhones = new Set( [...phones].filter((phone) => phone.length > 6) );
console.log(filteredPhones); // Set(1) {"iPhoneX"}


// 집합: union & intersection & difference & superset & subset

// 합집합(union, ∪) 유틸리티 함수
function unionSet(setA, setB) {
    return new Set([...setA, ...setB]);
}

// 교집합(intersection, ∩) 유틸리티 함수
function intersectSet(setA, setB) {
    return new Set([...setA].filter((item) => setB.has(item)));
}

// 차집합(diffrence, \) 유틸리티 함수
function diffSet(setA, setB) {
    return new Set([...setA].filter((item) => !setB.has(item)));
}

// 상위집합(superset, ⊃) 유틸리티 함수
function isSuperSet(setA, setB) {
    for (let item of setB) {
        if (!setA.has(item)) { return false; }
    }
    return true;
}


// 집합: Set.prototype 확장

// 합집합(union, ∪) 메서드
Set.prototype.union = function(x) {
    return new Set([...this, ...x]);
};

// 교집합(intersection, ∩) 메서드
Set.prototype.intersection = function(x) {
    return new Set([...this].filter((item) => x.has(item)));
};

// 차집합(diffrence, \) 메서드
Set.prototype.diffrence = function(x) {
    return new Set([...this].filter((item) => !x.has(item)))
};

// 상위집합(superset, ⊃) 메서드
Set.prototype.superset = function(x) {
    for (let item of x) {
        if (!this.has(item)) { return false; }
    }
    return true;
};



// Map
// Map 객체는 속성(Key) / 값(Value) 쌍으로 구성된 객체입니다.
// ——————————————————————————————————————————

// Object vs Map

// 객체(Object)
let capitals = {
    korean_ref : '서울',
    china : '북경',
    usa : '워싱턴 D.C'
};
console.log(capitals);// {korean_ref: "서울", china: "북경", usa: "워싱턴 D.C"}

// 맵(Map)
// new Map(iterable)
let capitals_map = new Map();

capitals_map.set('한국','서울')
    .set('중국','북경')
    .set('미국', '워싱턴 D.C');
console.log(capitals_map);// Map(3) {"한국" => "서울", "중국" => "북경", "미국" => "워싱턴 D.C"}


// Object vs Map

// 유사한 점
// 키(key)로 저장하고, 불러오고, 삭제하거나, 저장된 값(value)을 확인할 수 있다는 점에서 객체는 맵과 유사합니다.

// 다른 점
// 문자, 심볼만 키(key)로 사용할 수 있는 객체에 반해, 맵은 어떤 값도 키로 사용할 수 있습니다.
// 그리고 객체는 저장된 데이터(키: 값)의 개수를 알 수 없지만, 맵은.size 속성을 통해 알 수 있습니다.

// 언제 사용하면 좋을까?
// 데이터 콜렉션(Collection)을 다룰 때 주로 사용하면 좋습니다.
// 키 값을 문자, 심볼이 아닌 것을 사용해야 하거나 데이터가 순환(Iterate) 되어야 할 경우 유용합니다.
// 그 외의 경우는 객체를 사용하는 것이 좋습니다.


// Map.prototype

console.dir(Map.prototype);
// .constructor
// .size
// .set()
// .get()
// .has()
// .delete()
// .clear()
// .foreach()
// .entries()
// .keys()
// .values()



// .size & .set() & .get() & .has()

// Map객체 생성
let capitals = new Map(); // Map(0) {}

// 아이템(키, 값) 추가
capitals.set('한국', '서울');// Map(1) {"한국"=>"서울"}
capitals.set('중국', '북경');// Map(2) {"한국"=>"서울", "중국"=>"북경"}
capitals.set('미국', '워싱턴 D.C');// Map(3) {"한국"=>"서울", "중국"=>"북경", "미국"=>"워싱턴 D.C"}

// 저장된 아이템 개수 출력
console.log(capitals.size);// 3

// 저장된 아이템 출력
console.log(capitals.get('한국')); // 서울
console.log(capitals.get('일본')); // undefined

// 저장된 키 값에 '일본'이 없다면
if (!capitals.has('일본')) {
    // '일본' => '동경' 아이템 추가
    capitals.set('일본', '동경');
    console.log(capitals.size);// 4
}


// .delete & .clear()

capitals;// Map(4) {"한국" => "서울", "중국" => "북경", "미국" => "워싱턴 D.C", "일본" => "동경"}

// 아이템 제거
capitals.delete('일본'); // true
capitals.delete('러시아'); // false

// 저장된 아이템 개수 출력
console.log(capitals.size); // 3

// 저장된 아이템 모두 제거
capitals.clear(); // Map(0) {}


// .forEach

// capitals 맵
capitals;// Map(4) { "한국" => "서울", "중국" => "북경", "미국" => "워싱턴 D.C", "일본" => "동경" }

// 아이템 순환
capitals.forEach((city, nat, collection) => console.log(city, nat, collection));
// 서울        한국  Map(4) {"한국" => "서울", ...}
// 북경        중국  Map(4) {"한국" => "서울", ...}
// 워싱턴 D.C  미국  Map(4) {"한국" => "서울", ...}
// 동경        일본  Map(4) {"한국" => "서울", ...}

// 전달인자 검토
capitals.forEach((...args) => console.log(args));
// (3)["서울", "한국", Map(4)]
// (3)["북경", "중국", Map(4)]
// (3)["워싱턴 D.C", "미국", Map(4)]
// (3)["동경", "일본", Map(4)]


// for~of

// capitals 맵
capitals;// Map(4) { "한국" => "서울", "중국" => "북경", "미국" => "워싱턴 D.C", "일본" => "동경" }

// for문으로 Map 객체를 순환 하면?
for (let i = 0, l = capitals.length; i < l; i++) {
    console.log(capitals[i]); // 암것도 안뜸.
}

// for ~ in문으로 Map 객체를 순환 하면?
for (const key in capitals) {
    console.log(key, capitals[key]); // 암것도 안뜸.
}

// for ~ of 문으로 Map 객체를 순환 하면?
for (let [nat, city] of capitals) {
    console.log(nat, city);
}
// 한국 서울
// 중국 북경
// 미국 워싱턴 D.C
// 일본 동경


// .keys() & .values() & .entries()

// capitals 맵
capitals;// Map(4) { "한국" => "서울", "중국" => "북경", "미국" => "워싱턴 D.C", "일본" => "동경" }

// .values()
for (let city of capitals.values()) {
    console.log(city);
}
// 서울
// 북경
// 워싱턴 D.C
// 동경

// .keys()
for (let nat of capitals.keys()) {
    console.log(nat);
}
// 한국
// 중국
// 미국
// 일본

// .entries()
for (let [key, value] of capitals.entries()) {
    console.log(key, value);
}
// 한국 서울
// 중국 북경
// 미국 워싱턴 D.C
// 일본 동경


// [key: value] Array

// capitals 맵
// 배열([]) 내부에 키/값 배열([key, value])을 포함.
let capitals = new Map([
    ['한국','서울'],
    ['중국', '북경'],
    ['미국', '워싱턴 D.C'],
    ['일본', '동경']
]);

// 맵 -> 배열
console.log([...capitals]);
// [
//     ['한국', '서울'],
//     ['중국', '북경'],
//     ['미국', '워싱턴 D.C'],
//     ['일본', '동경']
// ]


// mapping & filtering

// capitals 맵
capitals; // Map(4) {"한국" => "서울", ...}

// 매핑(Mapping)
// 맵 -> 배열 변환 후, .map() 메서드 활용
// Array.from() 또는 [...세트] 사용
// 매개변수 [], 반환 값도 []
capitals = new Map([...capitals].map(([nat, city]) => [nat,`${nat}의 수도 ${city}.`]));
console.log(capitals);
// Map(4) { "한국" => "한국의 수도 서울.", "중국" => "중국의 수도 북경.", "미국" => "미국의 수도 워싱턴 D.C.", "일본" => "일본의 수도 동경." }

// 필터링(Filtering)
// 중국을 제외한 나머지 국가 및 수도 데이터 필터링
capitals = new Map([...capitals].filter(([nat, city]) => nat !== '중국'));
console.log(capitals);
// Map(3) { "한국" => "한국의 수도 서울.", "미국" => "미국의 수도 워싱턴 D.C.", "일본" => "일본의 수도 동경." }



// combineMap & convertArray & Map.prototype 확장

// 맵 병합 유틸리티 함수
function combineMap(mapA, mapB) {
    return new Map([...mapA, ...mapB]);
}

// 맵 -> 배열 유틸리티 함수
function convertMap2Array(map) {
    return [...map];
}

// Map.prototype 확장
Map.prototype.combineMap = function(x) {
    return new Map([...this, ...x]);
};

Map.prototype.convertMap2Array = function() {
    return [...this];
};


// map2json & json2map 유틸리티 함수

// Map -> JSON 유틸리티 함수
function map2json(map) {
    return JSON.stringify([...map]);
}

// JSON -> Map 유틸리티 함수
function json2map(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}


let map = new Map().set(true, 7).set({foo:3}, ['abc']);
console.log(map);// Map(2) {true => 7, {…} => Array(1)}

map = map2json(map);
console.log(map); // [[true,7],[{"foo":3},["abc"]]]

map = json2map(map);
console.log(map);// Map(2) {true => 7, {…} => Array(1)}



// strMap2obj & obj2strMap 유틸리티 함수

// String Map -> Object 유틸리티 함수
function strMap2obj(strMap) {
    let o = Object.create(null);
    for (let [k,v] of strMap) {
        o[k] = v;
    }
    return o;
}

// Object -> String Map 유틸리티 함수
function obj2strMap(o) {
    let m = new Map();
    for (let k of Object.keys(o)) {
        m.set(k, o[k]);
    }
    return m;
}

let strMap = new Map().set(true, 'yes').set(false, 'no');
console.log(strMap);// Map(2) {true => "yes", false => "no"}

let o = strMap2obj(strMap);
console.log(o); // {true: "yes", false: "no"}

strMap = obj2strMap(o);
console.log(strMap);// Map(2) {"true" => "yes", "false" => "no"}


// strMap2json & json2strMap 유틸리티 함수

// strMap -> JSON 유틸리티 함수
function strMap2json(strMap) {
    return JSON.stringify(strMap2obj(strMap));
}

// JSON -> strMap 유틸리티 함수
function json2strMap(jsonStr) {
    return obj2strMap(JSON.parse(jsonStr));
}

let strMap = new Map().set('yes', true).set('no', false);
console.log(strMap);// Map(2) {"yes" => true, "no" => false}

let json = strMap2json(strMap);
console.log(json);// {"yes":true,"no":false}

strMap = json2strMap(json);
console.log(strMap); // Map(2) {"yes" => true, "no" => false}



/**
 * Set, Map
 *
 * Set     https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set
 * Map     https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map
 * ———————————————————————————————————————————————————————————
 *
 * Set은 Array와 유사하나, 중복된 데이터를 허용하지 않아 데이터 관리에 유용
 * Map은 Object와 유사하나, 키로 어떤 값이든 사용 가능하며 데이터를 순환할 경우 유용
 * 즉, Set, Map은 데이터 관리에 매우 유용하니 적극 활용
 */