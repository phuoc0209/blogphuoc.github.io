+++
title = "JavaScript: Tổng quan và cách thêm script vào trang web"
date = "2025-10-17T10:00:00+07:00"
draft = false
categories = ["JavaScript"]
tags = ["javascript","dom"]
+++

## Giới thiệu về JavaScript

JavaScript là ngôn ngữ lập trình được sử dụng chủ yếu để tạo tương tác trên trang web. Nó chạy trên trình duyệt và có thể thao tác với DOM (Document Object Model) để thay đổi nội dung, cấu trúc và style của trang web.

## Cách thêm JavaScript vào HTML

### 1. Inline JavaScript (trong thẻ HTML)

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Cơ bản</title>
</head>
<body>
    <h1>Chào mừng đến với JavaScript!</h1>
    <button onclick="alert('Xin chào từ JavaScript!')">Nhấn tôi</button>
    
    <!-- Inline script -->
    <script>
        console.log("JavaScript đang chạy!");
        document.write("<p>Đây là nội dung được tạo bởi JavaScript</p>");
    </script>
</body>
</html>
```

### 2. Internal JavaScript (trong thẻ script)

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Internal JavaScript</title>
</head>
<body>
    <h1 id="title">Tiêu đề động</h1>
    <p id="content">Nội dung sẽ thay đổi</p>
    <button id="changeBtn">Thay đổi nội dung</button>
    
    <script>
        // Chờ DOM load xong
        document.addEventListener('DOMContentLoaded', function() {
            const title = document.getElementById('title');
            const content = document.getElementById('content');
            const changeBtn = document.getElementById('changeBtn');
            
            changeBtn.addEventListener('click', function() {
                title.textContent = 'Tiêu đề đã thay đổi!';
                content.innerHTML = '<strong>Nội dung mới với HTML!</strong>';
                changeBtn.style.backgroundColor = '#4CAF50';
                changeBtn.textContent = 'Đã thay đổi!';
            });
        });
    </script>
</body>
</html>
```

### 3. External JavaScript (file riêng)

**index.html:**
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>External JavaScript</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Ứng dụng JavaScript</h1>
    <div id="app">
        <input type="text" id="nameInput" placeholder="Nhập tên của bạn">
        <button id="greetBtn">Chào mừng</button>
        <div id="output"></div>
    </div>
    
    <!-- Load JavaScript file -->
    <script src="script.js"></script>
</body>
</html>
```

**script.js:**
```javascript
// Chờ DOM load xong
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('nameInput');
    const greetBtn = document.getElementById('greetBtn');
    const output = document.getElementById('output');
    
    greetBtn.addEventListener('click', function() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            output.innerHTML = '<p style="color: red;">Vui lòng nhập tên!</p>';
        } else {
            output.innerHTML = `
                <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin-top: 10px;">
                    <h3>Xin chào, ${name}!</h3>
                    <p>Chào mừng bạn đến với JavaScript!</p>
                    <small>Thời gian: ${new Date().toLocaleString('vi-VN')}</small>
                </div>
            `;
        }
    });
    
    // Xử lý khi nhấn Enter
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            greetBtn.click();
        }
    });
});
```

## Thao tác DOM cơ bản

### 1. Lấy phần tử (getElementById, querySelector)

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>DOM Selectors</title>
    <style>
        .highlight { background-color: yellow; }
        .error { color: red; }
        .success { color: green; }
    </style>
</head>
<body>
    <h1 id="mainTitle">Thao tác DOM</h1>
    <div class="container">
        <p class="intro">Đây là đoạn văn giới thiệu</p>
        <p class="content">Nội dung chính của trang</p>
        <ul class="list">
            <li>Mục 1</li>
            <li>Mục 2</li>
            <li>Mục 3</li>
        </ul>
    </div>
    
    <script>
        // Các cách lấy phần tử
        console.log("=== Các cách lấy phần tử ===");
        
        // getElementById
        const title = document.getElementById('mainTitle');
        console.log('getElementById:', title);
        
        // querySelector (CSS selector)
        const intro = document.querySelector('.intro');
        console.log('querySelector class:', intro);
        
        const firstLi = document.querySelector('li');
        console.log('querySelector tag:', firstLi);
        
        // querySelectorAll (lấy tất cả)
        const allLis = document.querySelectorAll('li');
        console.log('querySelectorAll:', allLis);
        
        // getElementsByClassName
        const paragraphs = document.getElementsByClassName('content');
        console.log('getElementsByClassName:', paragraphs);
        
        // getElementsByTagName
        const allPs = document.getElementsByTagName('p');
        console.log('getElementsByTagName:', allPs);
    </script>
</body>
</html>
```

### 2. Thay đổi nội dung và thuộc tính

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thay đổi DOM</title>
    <style>
        .card {
            border: 1px solid #ccc;
            padding: 20px;
            margin: 10px;
            border-radius: 5px;
            background: #f9f9f9;
        }
        .hidden { display: none; }
        .visible { display: block; }
    </style>
</head>
<body>
    <div class="card">
        <h2 id="cardTitle">Thẻ thông tin</h2>
        <p id="cardContent">Nội dung ban đầu</p>
        <img id="cardImage" src="" alt="Hình ảnh" style="width: 200px; height: 150px; background: #ddd;">
        <button id="updateBtn">Cập nhật</button>
        <button id="toggleBtn">Ẩn/Hiện</button>
    </div>
    
    <script>
        const cardTitle = document.getElementById('cardTitle');
        const cardContent = document.getElementById('cardContent');
        const cardImage = document.getElementById('cardImage');
        const updateBtn = document.getElementById('updateBtn');
        const toggleBtn = document.getElementById('toggleBtn');
        
        // Thay đổi nội dung text
        updateBtn.addEventListener('click', function() {
            cardTitle.textContent = 'Thẻ đã được cập nhật!';
            cardContent.innerHTML = '<strong>Nội dung mới với HTML!</strong><br><em>Thời gian: ' + new Date().toLocaleTimeString() + '</em>';
            
            // Thay đổi thuộc tính
            cardImage.src = 'https://via.placeholder.com/200x150/4CAF50/white?text=Updated';
            cardImage.alt = 'Hình ảnh đã cập nhật';
            
            // Thay đổi style
            cardTitle.style.color = '#4CAF50';
            cardContent.style.fontSize = '16px';
        });
        
        // Ẩn/hiện phần tử
        toggleBtn.addEventListener('click', function() {
            if (cardContent.classList.contains('hidden')) {
                cardContent.classList.remove('hidden');
                cardContent.classList.add('visible');
                toggleBtn.textContent = 'Ẩn';
            } else {
                cardContent.classList.remove('visible');
                cardContent.classList.add('hidden');
                toggleBtn.textContent = 'Hiện';
            }
        });
    </script>
</body>
</html>
```

### 3. Tạo và xóa phần tử

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Tạo và xóa phần tử</title>
    <style>
        .todo-item {
            background: #f0f0f0;
            margin: 5px 0;
            padding: 10px;
            border-radius: 3px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .todo-item.completed {
            text-decoration: line-through;
            opacity: 0.6;
        }
        .delete-btn {
            background: #ff4444;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
        }
        .delete-btn:hover {
            background: #cc0000;
        }
    </style>
</head>
<body>
    <h1>Danh sách công việc</h1>
    <div>
        <input type="text" id="todoInput" placeholder="Nhập công việc mới">
        <button id="addBtn">Thêm</button>
    </div>
    <ul id="todoList"></ul>
    
    <script>
        const todoInput = document.getElementById('todoInput');
        const addBtn = document.getElementById('addBtn');
        const todoList = document.getElementById('todoList');
        
        // Thêm công việc mới
        addBtn.addEventListener('click', addTodo);
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
        
        function addTodo() {
            const text = todoInput.value.trim();
            if (text === '') return;
            
            // Tạo phần tử li
            const li = document.createElement('li');
            li.className = 'todo-item';
            
            // Tạo nội dung
            li.innerHTML = `
                <span>${text}</span>
                <div>
                    <button class="complete-btn">Hoàn thành</button>
                    <button class="delete-btn">Xóa</button>
                </div>
            `;
            
            // Thêm event listeners
            const completeBtn = li.querySelector('.complete-btn');
            const deleteBtn = li.querySelector('.delete-btn');
            
            completeBtn.addEventListener('click', function() {
                li.classList.toggle('completed');
                completeBtn.textContent = li.classList.contains('completed') ? 'Chưa hoàn thành' : 'Hoàn thành';
            });
            
            deleteBtn.addEventListener('click', function() {
                li.remove();
            });
            
            // Thêm vào danh sách
            todoList.appendChild(li);
            
            // Xóa nội dung input
            todoInput.value = '';
        }
    </script>
</body>
</html>
```

## Ví dụ thực tế: Calculator đơn giản

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Máy tính đơn giản</title>
    <style>
        .calculator {
            width: 300px;
            margin: 50px auto;
            padding: 20px;
            border: 2px solid #333;
            border-radius: 10px;
            background: #f5f5f5;
        }
        .display {
            width: 100%;
            height: 50px;
            font-size: 24px;
            text-align: right;
            margin-bottom: 10px;
            padding: 0 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        .btn {
            height: 50px;
            font-size: 18px;
            border: 1px solid #ccc;
            border-radius: 5px;
            cursor: pointer;
            background: white;
        }
        .btn:hover {
            background: #e0e0e0;
        }
        .btn.operator {
            background: #ff9800;
            color: white;
        }
        .btn.operator:hover {
            background: #f57c00;
        }
        .btn.clear {
            background: #f44336;
            color: white;
        }
        .btn.clear:hover {
            background: #d32f2f;
        }
    </style>
</head>
<body>
    <div class="calculator">
        <input type="text" id="display" class="display" readonly>
        <div class="buttons">
            <button class="btn clear" onclick="clearDisplay()">C</button>
            <button class="btn operator" onclick="deleteLast()">⌫</button>
            <button class="btn operator" onclick="appendToDisplay('/')">/</button>
            <button class="btn operator" onclick="appendToDisplay('*')">×</button>
            
            <button class="btn" onclick="appendToDisplay('7')">7</button>
            <button class="btn" onclick="appendToDisplay('8')">8</button>
            <button class="btn" onclick="appendToDisplay('9')">9</button>
            <button class="btn operator" onclick="appendToDisplay('-')">-</button>
            
            <button class="btn" onclick="appendToDisplay('4')">4</button>
            <button class="btn" onclick="appendToDisplay('5')">5</button>
            <button class="btn" onclick="appendToDisplay('6')">6</button>
            <button class="btn operator" onclick="appendToDisplay('+')">+</button>
            
            <button class="btn" onclick="appendToDisplay('1')">1</button>
            <button class="btn" onclick="appendToDisplay('2')">2</button>
            <button class="btn" onclick="appendToDisplay('3')">3</button>
            <button class="btn operator" onclick="calculate()" style="grid-row: span 2;">=</button>
            
            <button class="btn" onclick="appendToDisplay('0')" style="grid-column: span 2;">0</button>
            <button class="btn" onclick="appendToDisplay('.')">.</button>
        </div>
    </div>
    
    <script>
        const display = document.getElementById('display');
        let currentInput = '';
        let operator = '';
        let previousInput = '';
        
        function appendToDisplay(value) {
            if (value === '.' && currentInput.includes('.')) return;
            if (value === '0' && currentInput === '0') return;
            
            currentInput += value;
            display.value = currentInput;
        }
        
        function clearDisplay() {
            currentInput = '';
            operator = '';
            previousInput = '';
            display.value = '';
        }
        
        function deleteLast() {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }
        
        function setOperator(op) {
            if (currentInput === '') return;
            
            if (previousInput !== '') {
                calculate();
            }
            
            operator = op;
            previousInput = currentInput;
            currentInput = '';
        }
        
        function calculate() {
            if (previousInput === '' || currentInput === '') return;
            
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            let result;
            
            switch (operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        display.value = 'Lỗi: Chia cho 0';
                        return;
                    }
                    result = prev / current;
                    break;
                default:
                    return;
            }
            
            display.value = result;
            currentInput = result.toString();
            operator = '';
            previousInput = '';
        }
        
        // Xử lý phím bàn phím
        document.addEventListener('keydown', function(e) {
            if (e.key >= '0' && e.key <= '9' || e.key === '.') {
                appendToDisplay(e.key);
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                setOperator(e.key);
            } else if (e.key === 'Enter' || e.key === '=') {
                calculate();
            } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
                clearDisplay();
            } else if (e.key === 'Backspace') {
                deleteLast();
            }
        });
    </script>
</body>
</html>
```

## Best Practices cho JavaScript DOM

### 1. Chờ DOM load xong
```javascript
// Tốt
document.addEventListener('DOMContentLoaded', function() {
    // Code của bạn ở đây
});

// Hoặc
window.addEventListener('load', function() {
    // Code của bạn ở đây
});
```

### 2. Sử dụng event delegation
```javascript
// Tốt - sử dụng event delegation
document.getElementById('todoList').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.parentElement.remove();
    }
});

// Tránh - thêm listener cho từng phần tử
// document.querySelectorAll('.delete-btn').forEach(btn => {
//     btn.addEventListener('click', function() { ... });
// });
```

### 3. Kiểm tra phần tử tồn tại
```javascript
const element = document.getElementById('myElement');
if (element) {
    element.textContent = 'Hello';
} else {
    console.error('Element not found');
}
```

### 4. Sử dụng data attributes
```html
<button data-action="delete" data-id="123">Xóa</button>

<script>
document.addEventListener('click', function(e) {
    if (e.target.dataset.action === 'delete') {
        const id = e.target.dataset.id;
        // Xử lý xóa với ID
    }
});
</script>
```

## Kết luận

JavaScript DOM là nền tảng quan trọng để tạo tương tác trên web. Việc hiểu cách thao tác với DOM sẽ giúp bạn tạo ra các trang web động và hấp dẫn. Hãy thực hành nhiều với các ví dụ trên để nắm vững kiến thức cơ bản!
