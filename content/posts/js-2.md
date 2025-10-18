+++
title = "JavaScript: Hàm, closure và scope"
date = "2025-10-17T10:10:00+07:00"
draft = false
categories = ["JavaScript"]
tags = ["function","closure","scope","javascript"]
+++

## Giới thiệu về Hàm trong JavaScript

Hàm (Function) là một trong những khái niệm quan trọng nhất trong JavaScript. Hàm cho phép bạn đóng gói code thành các khối có thể tái sử dụng và thực thi khi cần thiết.

## Các cách khai báo hàm

### 1. Function Declaration (Khai báo hàm)

```javascript
// Function declaration
function greet(name) {
    return `Xin chào, ${name}!`;
}

// Sử dụng
console.log(greet("Nguyễn Văn A")); // Xin chào, Nguyễn Văn A!
```

### 2. Function Expression (Biểu thức hàm)

```javascript
// Function expression
const greet = function(name) {
    return `Xin chào, ${name}!`;
};

// Sử dụng
console.log(greet("Trần Thị B")); // Xin chào, Trần Thị B!
```

### 3. Arrow Function (Hàm mũi tên)

```javascript
// Arrow function
const greet = (name) => {
    return `Xin chào, ${name}!`;
};

// Arrow function ngắn gọn (khi chỉ có 1 câu lệnh return)
const greet = name => `Xin chào, ${name}!`;

// Sử dụng
console.log(greet("Lê Văn C")); // Xin chào, Lê Văn C!
```

## Ví dụ 1: Các loại hàm cơ bản

```javascript
// 1. Hàm không tham số
function sayHello() {
    console.log("Xin chào thế giới!");
}

// 2. Hàm có tham số
function add(a, b) {
    return a + b;
}

// 3. Hàm có tham số mặc định
function greet(name = "Khách") {
    return `Xin chào, ${name}!`;
}

// 4. Hàm với rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// 5. Hàm trả về một hàm
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

// Sử dụng các hàm
sayHello(); // Xin chào thế giới!
console.log(add(5, 3)); // 8
console.log(greet()); // Xin chào, Khách!
console.log(greet("Alice")); // Xin chào, Alice!
console.log(sum(1, 2, 3, 4, 5)); // 15

const double = createMultiplier(2);
console.log(double(5)); // 10
```

## Scope (Phạm vi) trong JavaScript

### 1. Global Scope (Phạm vi toàn cục)

```javascript
// Biến toàn cục
var globalVar = "Tôi là biến toàn cục";
let globalLet = "Tôi cũng là biến toàn cục";
const globalConst = "Tôi cũng là biến toàn cục";

function checkGlobalScope() {
    console.log(globalVar); // Có thể truy cập
    console.log(globalLet); // Có thể truy cập
    console.log(globalConst); // Có thể truy cập
}

checkGlobalScope();
```

### 2. Local Scope (Phạm vi cục bộ)

```javascript
function demonstrateLocalScope() {
    // Biến cục bộ
    var localVar = "Tôi là biến cục bộ";
    let localLet = "Tôi cũng là biến cục bộ";
    const localConst = "Tôi cũng là biến cục bộ";
    
    console.log(localVar); // Có thể truy cập
    console.log(localLet); // Có thể truy cập
    console.log(localConst); // Có thể truy cập
    
    // Nested function
    function innerFunction() {
        console.log(localVar); // Có thể truy cập từ hàm con
        console.log(localLet); // Có thể truy cập từ hàm con
        console.log(localConst); // Có thể truy cập từ hàm con
    }
    
    innerFunction();
}

demonstrateLocalScope();

// console.log(localVar); // Lỗi: localVar is not defined
// console.log(localLet); // Lỗi: localLet is not defined
// console.log(localConst); // Lỗi: localConst is not defined
```

### 3. Block Scope (Phạm vi khối)

```javascript
function demonstrateBlockScope() {
    if (true) {
        var varVariable = "Tôi là var";
        let letVariable = "Tôi là let";
        const constVariable = "Tôi là const";
        
        console.log(varVariable); // Có thể truy cập
        console.log(letVariable); // Có thể truy cập
        console.log(constVariable); // Có thể truy cập
    }
    
    console.log(varVariable); // Có thể truy cập (var không có block scope)
    // console.log(letVariable); // Lỗi: letVariable is not defined
    // console.log(constVariable); // Lỗi: constVariable is not defined
}

demonstrateBlockScope();
```

## Hoisting trong JavaScript

### 1. Function Hoisting

```javascript
// Có thể gọi hàm trước khi khai báo (function declaration)
console.log(hoistedFunction()); // "Tôi được hoisted!"

function hoistedFunction() {
    return "Tôi được hoisted!";
}

// Không thể gọi trước khi khai báo (function expression)
// console.log(notHoistedFunction()); // Lỗi: Cannot access before initialization

const notHoistedFunction = function() {
    return "Tôi không được hoisted!";
};
```

### 2. Variable Hoisting

```javascript
console.log(hoistedVar); // undefined (không lỗi)
console.log(hoistedLet); // Lỗi: Cannot access before initialization
console.log(hoistedConst); // Lỗi: Cannot access before initialization

var hoistedVar = "Tôi được hoisted nhưng giá trị là undefined";
let hoistedLet = "Tôi không được hoisted";
const hoistedConst = "Tôi không được hoisted";
```

## Closure (Đóng gói) trong JavaScript

Closure là khả năng của một hàm bên trong truy cập các biến của hàm bên ngoài, ngay cả sau khi hàm bên ngoài đã thực thi xong.

### Ví dụ 1: Closure cơ bản

```javascript
function outerFunction(x) {
    // Biến của hàm ngoài
    const outerVariable = x;
    
    // Hàm bên trong (closure)
    function innerFunction(y) {
        console.log(outerVariable + y); // Truy cập biến của hàm ngoài
    }
    
    return innerFunction;
}

const closure = outerFunction(10);
closure(5); // 15
closure(3); // 13
```

### Ví dụ 2: Counter với Closure

```javascript
function createCounter() {
    let count = 0;
    
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2
console.log(counter1.getCount()); // 2

console.log(counter2.increment()); // 1 (riêng biệt với counter1)
console.log(counter2.getCount()); // 1
```

### Ví dụ 3: Module Pattern với Closure

```javascript
const Calculator = (function() {
    // Biến private
    let result = 0;
    
    // Hàm private
    function validateNumber(num) {
        return typeof num === 'number' && !isNaN(num);
    }
    
    // Trả về object public
    return {
        add: function(num) {
            if (validateNumber(num)) {
                result += num;
            }
            return this;
        },
        subtract: function(num) {
            if (validateNumber(num)) {
                result -= num;
            }
            return this;
        },
        multiply: function(num) {
            if (validateNumber(num)) {
                result *= num;
            }
            return this;
        },
        divide: function(num) {
            if (validateNumber(num) && num !== 0) {
                result /= num;
            }
            return this;
        },
        getResult: function() {
            return result;
        },
        reset: function() {
            result = 0;
            return this;
        }
    };
})();

// Sử dụng Calculator
console.log(Calculator.add(10).multiply(2).subtract(5).getResult()); // 15
Calculator.reset();
console.log(Calculator.getResult()); // 0
```

## Ví dụ thực tế: Tạo hệ thống quản lý sự kiện

```javascript
const EventManager = (function() {
    // Biến private để lưu trữ các event listeners
    const events = {};
    
    return {
        // Đăng ký event listener
        on: function(eventName, callback) {
            if (!events[eventName]) {
                events[eventName] = [];
            }
            events[eventName].push(callback);
        },
        
        // Hủy đăng ký event listener
        off: function(eventName, callback) {
            if (events[eventName]) {
                events[eventName] = events[eventName].filter(cb => cb !== callback);
            }
        },
        
        // Kích hoạt event
        emit: function(eventName, data) {
            if (events[eventName]) {
                events[eventName].forEach(callback => {
                    callback(data);
                });
            }
        },
        
        // Lấy danh sách events
        getEvents: function() {
            return Object.keys(events);
        }
    };
})();

// Sử dụng EventManager
function logUserAction(data) {
    console.log(`User action: ${data.action} at ${data.timestamp}`);
}

function updateUI(data) {
    console.log(`UI updated: ${data.message}`);
}

// Đăng ký event listeners
EventManager.on('userClick', logUserAction);
EventManager.on('userClick', updateUI);
EventManager.on('dataLoad', updateUI);

// Kích hoạt events
EventManager.emit('userClick', {
    action: 'button clicked',
    timestamp: new Date().toISOString()
});

EventManager.emit('dataLoad', {
    message: 'Data loaded successfully'
});

console.log('Available events:', EventManager.getEvents());
```

## Ví dụ thực tế: Tạo Cache với Closure

```javascript
function createCache() {
    const cache = new Map();
    let hitCount = 0;
    let missCount = 0;
    
    return {
        get: function(key) {
            if (cache.has(key)) {
                hitCount++;
                console.log(`Cache hit for key: ${key}`);
                return cache.get(key);
            } else {
                missCount++;
                console.log(`Cache miss for key: ${key}`);
                return null;
            }
        },
        
        set: function(key, value) {
            cache.set(key, value);
            console.log(`Cached key: ${key}`);
        },
        
        has: function(key) {
            return cache.has(key);
        },
        
        delete: function(key) {
            return cache.delete(key);
        },
        
        clear: function() {
            cache.clear();
            hitCount = 0;
            missCount = 0;
            console.log('Cache cleared');
        },
        
        getStats: function() {
            const total = hitCount + missCount;
            const hitRate = total > 0 ? (hitCount / total * 100).toFixed(2) : 0;
            
            return {
                hits: hitCount,
                misses: missCount,
                total: total,
                hitRate: `${hitRate}%`,
                size: cache.size
            };
        }
    };
}

// Sử dụng Cache
const cache = createCache();

// Giả lập việc tính toán tốn kém
function expensiveCalculation(n) {
    console.log(`Computing for ${n}...`);
    // Giả lập delay
    return n * n * n;
}

function getCachedResult(n) {
    const key = `calc_${n}`;
    let result = cache.get(key);
    
    if (result === null) {
        result = expensiveCalculation(n);
        cache.set(key, result);
    }
    
    return result;
}

// Test cache
console.log(getCachedResult(5)); // Computing... 125
console.log(getCachedResult(5)); // Cache hit... 125
console.log(getCachedResult(3)); // Computing... 27
console.log(getCachedResult(3)); // Cache hit... 27
console.log(getCachedResult(5)); // Cache hit... 125

console.log('Cache stats:', cache.getStats());
```

## Ví dụ thực tế: Tạo Debounce và Throttle

```javascript
// Debounce: Chỉ thực thi sau khi dừng gọi trong một khoảng thời gian
function createDebounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Throttle: Thực thi tối đa một lần trong một khoảng thời gian
function createThrottle(func, delay) {
    let lastCall = 0;
    
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

// Ví dụ sử dụng Debounce cho search
function search(query) {
    console.log(`Searching for: ${query}`);
    // Giả lập API call
}

const debouncedSearch = createDebounce(search, 300);

// Test debounce
debouncedSearch('a');
debouncedSearch('ab');
debouncedSearch('abc'); // Chỉ cái này được thực thi sau 300ms

// Ví dụ sử dụng Throttle cho scroll
function handleScroll() {
    console.log('Scroll event handled');
}

const throttledScroll = createThrottle(handleScroll, 100);

// Test throttle
throttledScroll(); // Thực thi ngay
throttledScroll(); // Bị bỏ qua
throttledScroll(); // Bị bỏ qua
setTimeout(() => throttledScroll(), 150); // Thực thi sau 150ms
```

## Best Practices cho Hàm và Closure

### 1. Sử dụng const cho function expression
```javascript
// Tốt
const myFunction = function() { /* ... */ };

// Tránh
var myFunction = function() { /* ... */ };
```

### 2. Sử dụng arrow function cho callback ngắn
```javascript
// Tốt
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

// Tránh khi cần this binding
const obj = {
    name: 'Test',
    // Không dùng arrow function ở đây vì mất this
    getName: function() {
        return this.name;
    }
};
```

### 3. Sử dụng closure để tạo private variables
```javascript
// Tốt - sử dụng closure
const Counter = (function() {
    let count = 0; // Private variable
    
    return {
        increment: () => ++count,
        getCount: () => count
    };
})();

// Tránh - biến public
const BadCounter = {
    count: 0, // Public variable - có thể bị thay đổi từ bên ngoài
    increment: function() { return ++this.count; }
};
```

### 4. Tránh memory leak với closure
```javascript
// Tốt - cleanup event listeners
function createComponent() {
    const element = document.createElement('div');
    const handler = () => console.log('clicked');
    
    element.addEventListener('click', handler);
    
    return {
        element,
        destroy: () => {
            element.removeEventListener('click', handler);
            element.remove();
        }
    };
}
```

## Kết luận

Hàm, scope và closure là những khái niệm cốt lõi trong JavaScript. Hiểu rõ các khái niệm này sẽ giúp bạn:

- Viết code JavaScript hiệu quả và có tổ chức
- Tạo ra các module và pattern mạnh mẽ
- Tránh các lỗi phổ biến về scope và hoisting
- Sử dụng closure để tạo private variables và methods

Hãy thực hành nhiều với các ví dụ trên để nắm vững kiến thức!
