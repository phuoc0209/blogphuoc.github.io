+++
title = "JavaScript: Xử lý sự kiện và tạo tương tác đơn giản"
date = "2025-10-17T10:30:00+07:00"
draft = false
categories = ["JavaScript"]
tags = ["event","dom","javascript"]
+++

## Giới thiệu về Event Handling

Event Handling là cách JavaScript phản ứng với các hành động của người dùng (click, hover, input, v.v.) hoặc các sự kiện của trình duyệt (load, resize, v.v.). Đây là nền tảng để tạo ra các trang web tương tác và động.

## Các loại sự kiện phổ biến

### 1. Mouse Events
- `click` - Nhấn chuột
- `dblclick` - Nhấn đôi chuột
- `mousedown` - Nhấn xuống chuột
- `mouseup` - Nhả chuột
- `mouseover` - Di chuột vào
- `mouseout` - Di chuột ra
- `mousemove` - Di chuyển chuột

### 2. Keyboard Events
- `keydown` - Nhấn phím xuống
- `keyup` - Nhả phím
- `keypress` - Nhấn phím (deprecated)

### 3. Form Events
- `submit` - Gửi form
- `change` - Thay đổi giá trị
- `input` - Nhập liệu
- `focus` - Tập trung vào
- `blur` - Mất tập trung

### 4. Window Events
- `load` - Tải trang xong
- `resize` - Thay đổi kích thước
- `scroll` - Cuộn trang

## Cách thêm Event Listeners

### 1. addEventListener (Cách hiện đại)

```javascript
// Cú pháp
element.addEventListener(eventType, handler, options);

// Ví dụ
const button = document.getElementById('myButton');
button.addEventListener('click', function(event) {
    console.log('Button clicked!');
    console.log('Event:', event);
});
```

### 2. Inline Event Handlers (Cách cũ)

```html
<!-- Trong HTML -->
<button onclick="handleClick()">Click me</button>

<script>
function handleClick() {
    console.log('Button clicked!');
}
</script>
```

## Ví dụ 1: Event Handling cơ bản

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Event Handling Cơ bản</title>
    <style>
        .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
        }
        .button {
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 5px;
            border-radius: 4px;
            cursor: pointer;
        }
        .button:hover {
            background: #0056b3;
        }
        .box {
            width: 100px;
            height: 100px;
            background: #28a745;
            margin: 20px 0;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        .box.highlight {
            background: #ffc107;
            transform: scale(1.1);
        }
        .log {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            margin-top: 20px;
            font-family: monospace;
            max-height: 200px;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Event Handling Demo</h1>
        
        <button id="clickBtn" class="button">Click me</button>
        <button id="doubleClickBtn" class="button">Double click me</button>
        <button id="rightClickBtn" class="button">Right click me</button>
        
        <div id="colorBox" class="box"></div>
        
        <div id="log" class="log"></div>
    </div>

    <script>
        const clickBtn = document.getElementById('clickBtn');
        const doubleClickBtn = document.getElementById('doubleClickBtn');
        const rightClickBtn = document.getElementById('rightClickBtn');
        const colorBox = document.getElementById('colorBox');
        const log = document.getElementById('log');
        
        // Hàm ghi log
        function addLog(message) {
            const time = new Date().toLocaleTimeString();
            log.innerHTML += `[${time}] ${message}<br>`;
            log.scrollTop = log.scrollHeight;
        }
        
        // Click event
        clickBtn.addEventListener('click', function(event) {
            addLog('Button clicked!');
            colorBox.style.backgroundColor = '#007bff';
        });
        
        // Double click event
        doubleClickBtn.addEventListener('dblclick', function(event) {
            addLog('Button double clicked!');
            colorBox.style.backgroundColor = '#28a745';
        });
        
        // Right click event
        rightClickBtn.addEventListener('contextmenu', function(event) {
            event.preventDefault(); // Ngăn menu context xuất hiện
            addLog('Button right clicked!');
            colorBox.style.backgroundColor = '#dc3545';
        });
        
        // Mouse events trên box
        colorBox.addEventListener('mouseenter', function() {
            addLog('Mouse entered the box');
            this.classList.add('highlight');
        });
        
        colorBox.addEventListener('mouseleave', function() {
            addLog('Mouse left the box');
            this.classList.remove('highlight');
        });
        
        colorBox.addEventListener('mousedown', function(event) {
            addLog(`Mouse down on box (button: ${event.button})`);
        });
        
        colorBox.addEventListener('mouseup', function(event) {
            addLog(`Mouse up on box (button: ${event.button})`);
        });
        
        // Keyboard events
        document.addEventListener('keydown', function(event) {
            addLog(`Key pressed: ${event.key} (code: ${event.code})`);
            
            // Thay đổi màu box theo phím
            switch(event.key) {
                case 'r':
                    colorBox.style.backgroundColor = '#dc3545';
                    break;
                case 'g':
                    colorBox.style.backgroundColor = '#28a745';
                    break;
                case 'b':
                    colorBox.style.backgroundColor = '#007bff';
                    break;
                case 'y':
                    colorBox.style.backgroundColor = '#ffc107';
                    break;
            }
        });
        
        // Window events
        window.addEventListener('resize', function() {
            addLog(`Window resized: ${window.innerWidth}x${window.innerHeight}`);
        });
        
        window.addEventListener('scroll', function() {
            addLog(`Scroll position: ${window.scrollY}px`);
        });
        
        // Load event
        window.addEventListener('load', function() {
            addLog('Page loaded completely');
        });
    </script>
</body>
</html>
```

## Ví dụ 2: Form Validation và Submit

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Form Validation</title>
    <style>
        .form-container {
            max-width: 500px;
            margin: 50px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: #f9f9f9;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .form-group input, .form-group select, .form-group textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
        .error {
            color: #dc3545;
            font-size: 14px;
            margin-top: 5px;
        }
        .success {
            color: #28a745;
            font-size: 14px;
            margin-top: 5px;
        }
        .submit-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        .submit-btn:hover {
            background: #0056b3;
        }
        .submit-btn:disabled {
            background: #6c757d;
            cursor: not-allowed;
        }
        .form-result {
            margin-top: 20px;
            padding: 15px;
            border-radius: 4px;
            display: none;
        }
        .form-result.success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        .form-result.error {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h1>Đăng ký tài khoản</h1>
        <form id="registrationForm">
            <div class="form-group">
                <label for="username">Tên đăng nhập *</label>
                <input type="text" id="username" name="username" required>
                <div class="error" id="usernameError"></div>
            </div>
            
            <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" id="email" name="email" required>
                <div class="error" id="emailError"></div>
            </div>
            
            <div class="form-group">
                <label for="password">Mật khẩu *</label>
                <input type="password" id="password" name="password" required>
                <div class="error" id="passwordError"></div>
            </div>
            
            <div class="form-group">
                <label for="confirmPassword">Xác nhận mật khẩu *</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
                <div class="error" id="confirmPasswordError"></div>
            </div>
            
            <div class="form-group">
                <label for="age">Tuổi</label>
                <input type="number" id="age" name="age" min="1" max="120">
                <div class="error" id="ageError"></div>
            </div>
            
            <div class="form-group">
                <label for="gender">Giới tính</label>
                <select id="gender" name="gender">
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="bio">Giới thiệu bản thân</label>
                <textarea id="bio" name="bio" rows="4" placeholder="Viết vài dòng về bản thân..."></textarea>
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" id="agreeTerms" name="agreeTerms" required>
                    Tôi đồng ý với <a href="#" onclick="alert('Điều khoản sử dụng')">điều khoản sử dụng</a> *
                </label>
                <div class="error" id="agreeTermsError"></div>
            </div>
            
            <button type="submit" class="submit-btn" id="submitBtn">Đăng ký</button>
        </form>
        
        <div id="formResult" class="form-result"></div>
    </div>

    <script>
        const form = document.getElementById('registrationForm');
        const submitBtn = document.getElementById('submitBtn');
        const formResult = document.getElementById('formResult');
        
        // Validation functions
        function validateUsername(username) {
            if (!username) {
                return 'Tên đăng nhập là bắt buộc';
            }
            if (username.length < 3) {
                return 'Tên đăng nhập phải có ít nhất 3 ký tự';
            }
            if (!/^[a-zA-Z0-9_]+$/.test(username)) {
                return 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới';
            }
            return '';
        }
        
        function validateEmail(email) {
            if (!email) {
                return 'Email là bắt buộc';
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return 'Email không hợp lệ';
            }
            return '';
        }
        
        function validatePassword(password) {
            if (!password) {
                return 'Mật khẩu là bắt buộc';
            }
            if (password.length < 6) {
                return 'Mật khẩu phải có ít nhất 6 ký tự';
            }
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
                return 'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 số';
            }
            return '';
        }
        
        function validateConfirmPassword(password, confirmPassword) {
            if (!confirmPassword) {
                return 'Xác nhận mật khẩu là bắt buộc';
            }
            if (password !== confirmPassword) {
                return 'Mật khẩu xác nhận không khớp';
            }
            return '';
        }
        
        function validateAge(age) {
            if (age && (age < 1 || age > 120)) {
                return 'Tuổi phải từ 1 đến 120';
            }
            return '';
        }
        
        function validateAgreeTerms(agreeTerms) {
            if (!agreeTerms) {
                return 'Bạn phải đồng ý với điều khoản sử dụng';
            }
            return '';
        }
        
        // Show error message
        function showError(fieldId, message) {
            const errorElement = document.getElementById(fieldId + 'Error');
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        }
        
        // Clear all errors
        function clearAllErrors() {
            const errorElements = document.querySelectorAll('.error');
            errorElements.forEach(element => {
                element.textContent = '';
                element.style.display = 'none';
            });
        }
        
        // Real-time validation
        document.getElementById('username').addEventListener('input', function() {
            const error = validateUsername(this.value);
            showError('username', error);
        });
        
        document.getElementById('email').addEventListener('input', function() {
            const error = validateEmail(this.value);
            showError('email', error);
        });
        
        document.getElementById('password').addEventListener('input', function() {
            const error = validatePassword(this.value);
            showError('password', error);
        });
        
        document.getElementById('confirmPassword').addEventListener('input', function() {
            const password = document.getElementById('password').value;
            const error = validateConfirmPassword(password, this.value);
            showError('confirmPassword', error);
        });
        
        document.getElementById('age').addEventListener('input', function() {
            const error = validateAge(this.value);
            showError('age', error);
        });
        
        // Form submission
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            clearAllErrors();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Validate all fields
            const errors = {
                username: validateUsername(data.username),
                email: validateEmail(data.email),
                password: validatePassword(data.password),
                confirmPassword: validateConfirmPassword(data.password, data.confirmPassword),
                age: validateAge(data.age),
                agreeTerms: validateAgreeTerms(data.agreeTerms)
            };
            
            // Show errors
            let hasErrors = false;
            Object.keys(errors).forEach(field => {
                if (errors[field]) {
                    showError(field, errors[field]);
                    hasErrors = true;
                }
            });
            
            if (hasErrors) {
                formResult.className = 'form-result error';
                formResult.textContent = 'Vui lòng sửa các lỗi trên';
                formResult.style.display = 'block';
                return;
            }
            
            // Simulate form submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Đang xử lý...';
            
            setTimeout(() => {
                formResult.className = 'form-result success';
                formResult.innerHTML = `
                    <h3>Đăng ký thành công!</h3>
                    <p><strong>Tên đăng nhập:</strong> ${data.username}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Tuổi:</strong> ${data.age || 'Không cung cấp'}</p>
                    <p><strong>Giới tính:</strong> ${data.gender || 'Không cung cấp'}</p>
                    <p><strong>Giới thiệu:</strong> ${data.bio || 'Không có'}</p>
                `;
                formResult.style.display = 'block';
                
                // Reset form
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Đăng ký';
            }, 2000);
        });
    </script>
</body>
</html>
```

## Ví dụ 3: Tạo ứng dụng Todo List tương tác

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Todo List App</title>
    <style>
        .todo-app {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: #f9f9f9;
        }
        .todo-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .todo-input {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        .todo-input input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
        }
        .todo-input button {
            padding: 10px 20px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        .todo-input button:hover {
            background: #0056b3;
        }
        .todo-filters {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            justify-content: center;
        }
        .filter-btn {
            padding: 5px 15px;
            border: 1px solid #ccc;
            background: white;
            cursor: pointer;
            border-radius: 4px;
        }
        .filter-btn.active {
            background: #007bff;
            color: white;
        }
        .todo-list {
            list-style: none;
            padding: 0;
        }
        .todo-item {
            display: flex;
            align-items: center;
            padding: 10px;
            margin-bottom: 10px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        .todo-item.completed {
            opacity: 0.6;
            text-decoration: line-through;
        }
        .todo-item:hover {
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .todo-checkbox {
            margin-right: 10px;
        }
        .todo-text {
            flex: 1;
            font-size: 16px;
        }
        .todo-actions {
            display: flex;
            gap: 5px;
        }
        .todo-actions button {
            padding: 5px 10px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
        }
        .edit-btn {
            background: #ffc107;
            color: black;
        }
        .delete-btn {
            background: #dc3545;
            color: white;
        }
        .todo-stats {
            text-align: center;
            margin-top: 20px;
            padding: 10px;
            background: #e9ecef;
            border-radius: 4px;
        }
        .edit-input {
            flex: 1;
            padding: 5px;
            border: 1px solid #007bff;
            border-radius: 3px;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="todo-app">
        <div class="todo-header">
            <h1>📝 Todo List</h1>
        </div>
        
        <div class="todo-input">
            <input type="text" id="todoInput" placeholder="Thêm công việc mới...">
            <button id="addBtn">Thêm</button>
        </div>
        
        <div class="todo-filters">
            <button class="filter-btn active" data-filter="all">Tất cả</button>
            <button class="filter-btn" data-filter="active">Chưa hoàn thành</button>
            <button class="filter-btn" data-filter="completed">Đã hoàn thành</button>
        </div>
        
        <ul id="todoList" class="todo-list"></ul>
        
        <div class="todo-stats">
            <span id="todoCount">0 công việc</span> | 
            <span id="completedCount">0 đã hoàn thành</span>
        </div>
    </div>

    <script>
        class TodoApp {
            constructor() {
                this.todos = JSON.parse(localStorage.getItem('todos')) || [];
                this.currentFilter = 'all';
                this.editingId = null;
                
                this.initializeElements();
                this.bindEvents();
                this.render();
            }
            
            initializeElements() {
                this.todoInput = document.getElementById('todoInput');
                this.addBtn = document.getElementById('addBtn');
                this.todoList = document.getElementById('todoList');
                this.todoCount = document.getElementById('todoCount');
                this.completedCount = document.getElementById('completedCount');
                this.filterBtns = document.querySelectorAll('.filter-btn');
            }
            
            bindEvents() {
                // Add todo
                this.addBtn.addEventListener('click', () => this.addTodo());
                this.todoInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.addTodo();
                });
                
                // Filter buttons
                this.filterBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
                });
                
                // Todo list events (event delegation)
                this.todoList.addEventListener('click', (e) => {
                    const todoItem = e.target.closest('.todo-item');
                    if (!todoItem) return;
                    
                    const id = parseInt(todoItem.dataset.id);
                    
                    if (e.target.classList.contains('todo-checkbox')) {
                        this.toggleTodo(id);
                    } else if (e.target.classList.contains('edit-btn')) {
                        this.startEdit(id);
                    } else if (e.target.classList.contains('delete-btn')) {
                        this.deleteTodo(id);
                    }
                });
                
                // Save edit on Enter
                this.todoList.addEventListener('keypress', (e) => {
                    if (e.target.classList.contains('edit-input') && e.key === 'Enter') {
                        this.saveEdit();
                    }
                });
                
                // Cancel edit on Escape
                this.todoList.addEventListener('keydown', (e) => {
                    if (e.target.classList.contains('edit-input') && e.key === 'Escape') {
                        this.cancelEdit();
                    }
                });
            }
            
            addTodo() {
                const text = this.todoInput.value.trim();
                if (!text) return;
                
                const todo = {
                    id: Date.now(),
                    text: text,
                    completed: false,
                    createdAt: new Date().toISOString()
                };
                
                this.todos.unshift(todo);
                this.todoInput.value = '';
                this.saveTodos();
                this.render();
            }
            
            toggleTodo(id) {
                const todo = this.todos.find(t => t.id === id);
                if (todo) {
                    todo.completed = !todo.completed;
                    this.saveTodos();
                    this.render();
                }
            }
            
            startEdit(id) {
                this.editingId = id;
                this.render();
            }
            
            saveEdit() {
                const editInput = document.querySelector('.edit-input');
                if (editInput) {
                    const newText = editInput.value.trim();
                    if (newText) {
                        const todo = this.todos.find(t => t.id === this.editingId);
                        if (todo) {
                            todo.text = newText;
                            this.saveTodos();
                        }
                    }
                    this.editingId = null;
                    this.render();
                }
            }
            
            cancelEdit() {
                this.editingId = null;
                this.render();
            }
            
            deleteTodo(id) {
                if (confirm('Bạn có chắc muốn xóa công việc này?')) {
                    this.todos = this.todos.filter(t => t.id !== id);
                    this.saveTodos();
                    this.render();
                }
            }
            
            setFilter(filter) {
                this.currentFilter = filter;
                this.filterBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.filter === filter);
                });
                this.render();
            }
            
            getFilteredTodos() {
                switch (this.currentFilter) {
                    case 'active':
                        return this.todos.filter(t => !t.completed);
                    case 'completed':
                        return this.todos.filter(t => t.completed);
                    default:
                        return this.todos;
                }
            }
            
            render() {
                const filteredTodos = this.getFilteredTodos();
                
                this.todoList.innerHTML = filteredTodos.map(todo => {
                    const isEditing = this.editingId === todo.id;
                    
                    return `
                        <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                            ${isEditing ? 
                                `<input type="text" class="edit-input" value="${todo.text}">` :
                                `<span class="todo-text">${todo.text}</span>`
                            }
                            <div class="todo-actions">
                                <button class="edit-btn">Sửa</button>
                                <button class="delete-btn">Xóa</button>
                            </div>
                        </li>
                    `;
                }).join('');
                
                // Update stats
                const totalTodos = this.todos.length;
                const completedTodos = this.todos.filter(t => t.completed).length;
                
                this.todoCount.textContent = `${totalTodos} công việc`;
                this.completedCount.textContent = `${completedTodos} đã hoàn thành`;
                
                // Focus edit input if editing
                if (this.editingId) {
                    const editInput = document.querySelector('.edit-input');
                    if (editInput) {
                        editInput.focus();
                        editInput.select();
                    }
                }
            }
            
            saveTodos() {
                localStorage.setItem('todos', JSON.stringify(this.todos));
            }
        }
        
        // Initialize app
        new TodoApp();
    </script>
</body>
</html>
```

## Ví dụ 4: Drag and Drop Interface

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Drag and Drop Demo</title>
    <style>
        .drag-container {
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        .drag-area {
            border: 2px dashed #ccc;
            border-radius: 8px;
            padding: 40px;
            text-align: center;
            margin-bottom: 20px;
            transition: all 0.3s ease;
        }
        .drag-area.dragover {
            border-color: #007bff;
            background: #f8f9fa;
        }
        .file-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1px));
            gap: 15px;
            margin-top: 20px;
        }
        .file-item {
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: move;
        }
        .file-item:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .file-item.dragging {
            opacity: 0.5;
            transform: rotate(5deg);
        }
        .file-icon {
            font-size: 48px;
            margin-bottom: 10px;
        }
        .file-name {
            font-weight: bold;
            margin-bottom: 5px;
            word-break: break-all;
        }
        .file-size {
            color: #666;
            font-size: 14px;
        }
        .drop-zones {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1px));
            gap: 15px;
            margin-top: 20px;
        }
        .drop-zone {
            border: 2px dashed #28a745;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            background: #f8f9fa;
            transition: all 0.3s ease;
        }
        .drop-zone.dragover {
            background: #d4edda;
            border-color: #155724;
        }
        .drop-zone h3 {
            margin: 0 0 10px 0;
            color: #28a745;
        }
        .drop-zone .file-count {
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="drag-container">
        <h1>Drag and Drop File Manager</h1>
        
        <div class="drag-area" id="dragArea">
            <div class="file-icon">📁</div>
            <h3>Kéo thả file vào đây</h3>
            <p>Hoặc click để chọn file</p>
            <input type="file" id="fileInput" multiple style="display: none;">
        </div>
        
        <div class="file-list" id="fileList"></div>
        
        <div class="drop-zones">
            <div class="drop-zone" data-category="images">
                <h3>🖼️ Hình ảnh</h3>
                <div class="file-count">0 files</div>
            </div>
            <div class="drop-zone" data-category="documents">
                <h3>📄 Tài liệu</h3>
                <div class="file-count">0 files</div>
            </div>
            <div class="drop-zone" data-category="others">
                <h3>📦 Khác</h3>
                <div class="file-count">0 files</div>
            </div>
        </div>
    </div>

    <script>
        class DragDropManager {
            constructor() {
                this.files = [];
                this.categories = {
                    images: [],
                    documents: [],
                    others: []
                };
                
                this.initializeElements();
                this.bindEvents();
            }
            
            initializeElements() {
                this.dragArea = document.getElementById('dragArea');
                this.fileInput = document.getElementById('fileInput');
                this.fileList = document.getElementById('fileList');
                this.dropZones = document.querySelectorAll('.drop-zone');
            }
            
            bindEvents() {
                // File input
                this.dragArea.addEventListener('click', () => this.fileInput.click());
                this.fileInput.addEventListener('change', (e) => this.handleFiles(e.target.files));
                
                // Drag and drop
                this.dragArea.addEventListener('dragover', (e) => this.handleDragOver(e));
                this.dragArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
                this.dragArea.addEventListener('drop', (e) => this.handleDrop(e));
                
                // Drop zones
                this.dropZones.forEach(zone => {
                    zone.addEventListener('dragover', (e) => this.handleZoneDragOver(e));
                    zone.addEventListener('dragleave', (e) => this.handleZoneDragLeave(e));
                    zone.addEventListener('drop', (e) => this.handleZoneDrop(e));
                });
            }
            
            handleFiles(fileList) {
                Array.from(fileList).forEach(file => this.addFile(file));
            }
            
            addFile(file) {
                const fileObj = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    file: file,
                    category: this.getFileCategory(file)
                };
                
                this.files.push(fileObj);
                this.categories[fileObj.category].push(fileObj);
                this.render();
            }
            
            getFileCategory(file) {
                if (file.type.startsWith('image/')) return 'images';
                if (file.type.includes('document') || file.type.includes('pdf') || 
                    file.type.includes('text') || file.type.includes('word')) return 'documents';
                return 'others';
            }
            
            handleDragOver(e) {
                e.preventDefault();
                this.dragArea.classList.add('dragover');
            }
            
            handleDragLeave(e) {
                e.preventDefault();
                this.dragArea.classList.remove('dragover');
            }
            
            handleDrop(e) {
                e.preventDefault();
                this.dragArea.classList.remove('dragover');
                this.handleFiles(e.dataTransfer.files);
            }
            
            handleZoneDragOver(e) {
                e.preventDefault();
                e.currentTarget.classList.add('dragover');
            }
            
            handleZoneDragLeave(e) {
                e.preventDefault();
                e.currentTarget.classList.remove('dragover');
            }
            
            handleZoneDrop(e) {
                e.preventDefault();
                e.currentTarget.classList.remove('dragover');
                
                const category = e.currentTarget.dataset.category;
                const fileId = e.dataTransfer.getData('text/plain');
                
                if (fileId) {
                    this.moveFileToCategory(fileId, category);
                }
            }
            
            moveFileToCategory(fileId, newCategory) {
                const fileIndex = this.files.findIndex(f => f.id == fileId);
                if (fileIndex === -1) return;
                
                const file = this.files[fileIndex];
                const oldCategory = file.category;
                
                if (oldCategory === newCategory) return;
                
                // Remove from old category
                this.categories[oldCategory] = this.categories[oldCategory].filter(f => f.id != fileId);
                
                // Add to new category
                file.category = newCategory;
                this.categories[newCategory].push(file);
                
                this.render();
            }
            
            formatFileSize(bytes) {
                if (bytes === 0) return '0 Bytes';
                const k = 1024;
                const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
            }
            
            getFileIcon(type) {
                if (type.startsWith('image/')) return '🖼️';
                if (type.includes('pdf')) return '📄';
                if (type.includes('word')) return '📝';
                if (type.includes('excel')) return '📊';
                if (type.includes('powerpoint')) return '📈';
                if (type.includes('text')) return '📃';
                return '📁';
            }
            
            render() {
                // Render file list
                this.fileList.innerHTML = this.files.map(file => `
                    <div class="file-item" draggable="true" data-id="${file.id}">
                        <div class="file-icon">${this.getFileIcon(file.type)}</div>
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">${this.formatFileSize(file.size)}</div>
                    </div>
                `).join('');
                
                // Update category counts
                this.dropZones.forEach(zone => {
                    const category = zone.dataset.category;
                    const count = this.categories[category].length;
                    zone.querySelector('.file-count').textContent = `${count} files`;
                });
                
                // Add drag events to file items
                this.fileList.querySelectorAll('.file-item').forEach(item => {
                    item.addEventListener('dragstart', (e) => {
                        e.dataTransfer.setData('text/plain', e.target.dataset.id);
                        e.target.classList.add('dragging');
                    });
                    
                    item.addEventListener('dragend', (e) => {
                        e.target.classList.remove('dragging');
                    });
                });
            }
        }
        
        // Initialize app
        new DragDropManager();
    </script>
</body>
</html>
```

## Best Practices cho Event Handling

### 1. Sử dụng Event Delegation
```javascript
// Tốt - Event delegation
document.getElementById('todoList').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        // Xử lý xóa
    }
});

// Tránh - Thêm listener cho từng phần tử
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Xử lý xóa
    });
});
```

### 2. Thêm và xóa Event Listeners đúng cách
```javascript
// Tốt - Lưu reference để có thể xóa
const handler = function() { /* ... */ };
element.addEventListener('click', handler);
element.removeEventListener('click', handler);

// Hoặc sử dụng AbortController
const controller = new AbortController();
element.addEventListener('click', handler, { signal: controller.signal });
controller.abort(); // Xóa tất cả listeners
```

### 3. Prevent Default khi cần thiết
```javascript
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn form submit mặc định
    // Xử lý custom
});

link.addEventListener('click', function(e) {
    if (someCondition) {
        e.preventDefault(); // Ngăn chuyển trang
    }
});
```

### 4. Sử dụng Passive Listeners cho performance
```javascript
// Tốt - Passive listener cho scroll
element.addEventListener('scroll', handler, { passive: true });

// Tốt - Capture phase khi cần
element.addEventListener('click', handler, { capture: true });
```

## Kết luận

Event Handling là nền tảng của tương tác web. Với các ví dụ trên, bạn đã học được:

- Các loại sự kiện phổ biến và cách sử dụng
- Form validation và xử lý submit
- Tạo ứng dụng tương tác phức tạp
- Drag and drop interface
- Best practices cho performance và maintainability

Hãy thực hành nhiều để thành thạo Event Handling trong JavaScript!
