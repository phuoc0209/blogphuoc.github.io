+++
title = "JavaScript: Promise và Async/Await"
date = "2025-10-17T10:20:00+07:00"
draft = false
categories = ["JavaScript"]
tags = ["promise","async","await","javascript"]
+++

## Giới thiệu về Promise và Async/Await

JavaScript là ngôn ngữ đơn luồng (single-threaded), nhưng với Promise và Async/Await, chúng ta có thể xử lý các tác vụ bất đồng bộ một cách hiệu quả mà không bị chặn luồng chính.

## Promise cơ bản

Promise là một object đại diện cho kết quả của một tác vụ bất đồng bộ. Nó có thể ở một trong ba trạng thái:
- **Pending**: Đang chờ xử lý
- **Fulfilled**: Đã hoàn thành thành công
- **Rejected**: Đã thất bại

### Cú pháp tạo Promise

```javascript
const myPromise = new Promise((resolve, reject) => {
    // Tác vụ bất đồng bộ
    const success = true; // Giả lập kết quả
    
    if (success) {
        resolve("Tác vụ hoàn thành thành công!");
    } else {
        reject("Tác vụ thất bại!");
    }
});
```

### Sử dụng Promise

```javascript
myPromise
    .then(result => {
        console.log("Thành công:", result);
    })
    .catch(error => {
        console.log("Lỗi:", error);
    })
    .finally(() => {
        console.log("Promise đã hoàn thành");
    });
```

## Ví dụ 1: Promise cơ bản

```javascript
// Hàm giả lập API call
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        // Giả lập delay
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: `User ${userId}`,
                    email: `user${userId}@example.com`
                });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

// Sử dụng Promise
fetchUserData(1)
    .then(user => {
        console.log("User data:", user);
        return user.name; // Trả về giá trị cho .then() tiếp theo
    })
    .then(name => {
        console.log("User name:", name);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });

// Test với ID không hợp lệ
fetchUserData(-1)
    .then(user => {
        console.log("User data:", user);
    })
    .catch(error => {
        console.error("Error:", error.message); // Invalid user ID
    });
```

## Ví dụ 2: Promise Chain

```javascript
// Hàm giả lập các API calls
function fetchUser(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: `User ${userId}` });
        }, 500);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1", userId: userId },
                { id: 2, title: "Post 2", userId: userId }
            ]);
        }, 300);
    });
}

function fetchUserComments(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Comment 1", userId: userId },
                { id: 2, text: "Comment 2", userId: userId }
            ]);
        }, 200);
    });
}

// Promise chain
fetchUser(1)
    .then(user => {
        console.log("User:", user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return fetchUserComments(1);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.error("Error in chain:", error);
    });
```

## Promise.all() - Chạy song song

```javascript
// Chạy nhiều Promise song song
Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
])
.then(users => {
    console.log("All users:", users);
})
.catch(error => {
    console.error("Error fetching users:", error);
});

// Ví dụ với thời gian khác nhau
function delayedPromise(value, delay) {
    return new Promise(resolve => {
        setTimeout(() => resolve(value), delay);
    });
}

console.time("Promise.all");
Promise.all([
    delayedPromise("A", 1000),
    delayedPromise("B", 500),
    delayedPromise("C", 1500)
])
.then(results => {
    console.timeEnd("Promise.all"); // ~1500ms (thời gian của Promise chậm nhất)
    console.log("Results:", results); // ["A", "B", "C"]
});
```

## Promise.race() - Lấy kết quả nhanh nhất

```javascript
// Lấy kết quả của Promise hoàn thành đầu tiên
function timeoutPromise(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Timeout")), ms);
    });
}

function fetchWithTimeout(url, timeout = 5000) {
    return Promise.race([
        fetch(url),
        timeoutPromise(timeout)
    ]);
}

// Ví dụ sử dụng
fetchWithTimeout("https://api.example.com/data", 3000)
    .then(response => response.json())
    .then(data => console.log("Data:", data))
    .catch(error => console.error("Error:", error.message));
```

## Async/Await - Cú pháp hiện đại

Async/Await là cú pháp sugar cho Promise, giúp code dễ đọc và viết hơn.

### Cú pháp cơ bản

```javascript
// Hàm async luôn trả về Promise
async function fetchData() {
    try {
        const result = await someAsyncOperation();
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
```

### Ví dụ 3: Async/Await cơ bản

```javascript
// Hàm giả lập API
function apiCall(endpoint, delay = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) { // 90% thành công
                resolve({ endpoint, data: `Data from ${endpoint}` });
            } else {
                reject(new Error(`Failed to fetch ${endpoint}`));
            }
        }, delay);
    });
}

// Sử dụng async/await
async function fetchUserData() {
    try {
        console.log("Fetching user...");
        const user = await apiCall("/user", 800);
        console.log("User:", user);
        
        console.log("Fetching posts...");
        const posts = await apiCall("/posts", 600);
        console.log("Posts:", posts);
        
        console.log("Fetching comments...");
        const comments = await apiCall("/comments", 400);
        console.log("Comments:", comments);
        
        return { user, posts, comments };
    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
    }
}

// Gọi hàm async
fetchUserData()
    .then(data => {
        console.log("All data fetched:", data);
    })
    .catch(error => {
        console.error("Failed to fetch data:", error.message);
    });
```

### Ví dụ 4: Async/Await với Promise.all

```javascript
async function fetchAllData() {
    try {
        console.log("Fetching all data in parallel...");
        
        const [user, posts, comments] = await Promise.all([
            apiCall("/user", 800),
            apiCall("/posts", 600),
            apiCall("/comments", 400)
        ]);
        
        console.log("All data fetched:", { user, posts, comments });
        return { user, posts, comments };
    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
    }
}

fetchAllData();
```

## Ví dụ thực tế: Tạo API Client

```javascript
class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };
        
        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`API request failed: ${endpoint}`, error);
            throw error;
        }
    }
    
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Sử dụng API Client
const api = new ApiClient('https://jsonplaceholder.typicode.com');

async function demonstrateApiClient() {
    try {
        // Lấy danh sách users
        const users = await api.get('/users');
        console.log('Users:', users.slice(0, 3));
        
        // Lấy user cụ thể
        const user = await api.get('/users/1');
        console.log('User 1:', user);
        
        // Tạo post mới
        const newPost = await api.post('/posts', {
            title: 'New Post',
            body: 'This is a new post',
            userId: 1
        });
        console.log('Created post:', newPost);
        
        // Cập nhật post
        const updatedPost = await api.put(`/posts/${newPost.id}`, {
            ...newPost,
            title: 'Updated Post Title'
        });
        console.log('Updated post:', updatedPost);
        
    } catch (error) {
        console.error('API Error:', error.message);
    }
}

// demonstrateApiClient();
```

## Ví dụ thực tế: Retry Logic với Exponential Backoff

```javascript
async function fetchWithRetry(url, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt} for ${url}`);
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.log(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
            }
            
            // Exponential backoff: delay tăng gấp đôi mỗi lần retry
            const delay = baseDelay * Math.pow(2, attempt - 1);
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Sử dụng retry logic
async function testRetryLogic() {
    try {
        const data = await fetchWithRetry('https://httpstat.us/500', 3, 1000);
        console.log('Success:', data);
    } catch (error) {
        console.error('Final error:', error.message);
    }
}

// testRetryLogic();
```

## Ví dụ thực tế: Batch Processing với Concurrency Control

```javascript
async function processBatch(items, processor, concurrency = 3) {
    const results = [];
    const errors = [];
    
    // Chia items thành các batch nhỏ
    for (let i = 0; i < items.length; i += concurrency) {
        const batch = items.slice(i, i + concurrency);
        
        console.log(`Processing batch ${Math.floor(i / concurrency) + 1}...`);
        
        const batchPromises = batch.map(async (item, index) => {
            try {
                const result = await processor(item);
                return { success: true, data: result, index: i + index };
            } catch (error) {
                return { success: false, error: error.message, index: i + index };
            }
        });
        
        const batchResults = await Promise.all(batchPromises);
        
        batchResults.forEach(result => {
            if (result.success) {
                results.push(result.data);
            } else {
                errors.push({ item: items[result.index], error: result.error });
            }
        });
    }
    
    return { results, errors };
}

// Ví dụ sử dụng batch processing
async function demonstrateBatchProcessing() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3',
        'https://jsonplaceholder.typicode.com/posts/4',
        'https://jsonplaceholder.typicode.com/posts/5'
    ];
    
    async function fetchPost(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    }
    
    try {
        const { results, errors } = await processBatch(urls, fetchPost, 2);
        
        console.log(`Processed ${results.length} items successfully`);
        console.log(`Failed ${errors.length} items`);
        
        if (errors.length > 0) {
            console.log('Errors:', errors);
        }
        
    } catch (error) {
        console.error('Batch processing failed:', error);
    }
}

// demonstrateBatchProcessing();
```

## Ví dụ thực tế: Caching với Promise

```javascript
class PromiseCache {
    constructor(ttl = 60000) { // 60 seconds default TTL
        this.cache = new Map();
        this.ttl = ttl;
    }
    
    async get(key, fetcher) {
        const cached = this.cache.get(key);
        
        if (cached && Date.now() - cached.timestamp < this.ttl) {
            console.log(`Cache hit for key: ${key}`);
            return cached.data;
        }
        
        console.log(`Cache miss for key: ${key}`);
        
        try {
            const data = await fetcher();
            this.cache.set(key, {
                data,
                timestamp: Date.now()
            });
            return data;
        } catch (error) {
            console.error(`Error fetching data for key ${key}:`, error);
            throw error;
        }
    }
    
    clear() {
        this.cache.clear();
    }
    
    size() {
        return this.cache.size;
    }
}

// Sử dụng PromiseCache
const cache = new PromiseCache(30000); // 30 seconds TTL

async function fetchUserWithCache(userId) {
    return cache.get(`user_${userId}`, async () => {
        console.log(`Fetching user ${userId} from API...`);
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return response.json();
    });
}

// Test caching
async function testCaching() {
    try {
        console.log('First call:');
        const user1 = await fetchUserWithCache(1);
        console.log('User 1:', user1.name);
        
        console.log('\nSecond call (should be cached):');
        const user1Cached = await fetchUserWithCache(1);
        console.log('User 1 cached:', user1Cached.name);
        
        console.log('\nDifferent user:');
        const user2 = await fetchUserWithCache(2);
        console.log('User 2:', user2.name);
        
        console.log(`\nCache size: ${cache.size()}`);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// testCaching();
```

## Best Practices cho Promise và Async/Await

### 1. Luôn xử lý lỗi
```javascript
// Tốt
async function fetchData() {
    try {
        const data = await apiCall();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw nếu cần
    }
}

// Hoặc
fetchData()
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

### 2. Sử dụng Promise.all() cho các tác vụ độc lập
```javascript
// Tốt - chạy song song
const [user, posts, comments] = await Promise.all([
    fetchUser(id),
    fetchPosts(id),
    fetchComments(id)
]);

// Tránh - chạy tuần tự
const user = await fetchUser(id);
const posts = await fetchPosts(id);
const comments = await fetchComments(id);
```

### 3. Sử dụng Promise.race() cho timeout
```javascript
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}
```

### 4. Tránh Promise Hell
```javascript
// Tránh - Promise Hell
fetchUser(id)
    .then(user => {
        return fetchPosts(user.id)
            .then(posts => {
                return fetchComments(user.id)
                    .then(comments => {
                        return { user, posts, comments };
                    });
            });
    });

// Tốt - Async/Await
async function fetchUserData(id) {
    const user = await fetchUser(id);
    const [posts, comments] = await Promise.all([
        fetchPosts(user.id),
        fetchComments(user.id)
    ]);
    return { user, posts, comments };
}
```

## Kết luận

Promise và Async/Await là những công cụ mạnh mẽ để xử lý bất đồng bộ trong JavaScript. Chúng giúp:

- Viết code bất đồng bộ dễ đọc và bảo trì
- Xử lý lỗi một cách hiệu quả
- Thực hiện nhiều tác vụ song song
- Tạo ra các pattern phức tạp như retry, caching, batch processing

Hãy thực hành nhiều với các ví dụ trên để thành thạo Promise và Async/Await!
