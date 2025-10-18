+++
title = "Java: Xử lý ngoại lệ và logging"
date = "2025-10-17T09:30:00+07:00"
draft = false
categories = ["Java"]
tags = ["exception","logging","java"]
+++

## Giới thiệu về Exception Handling

Xử lý ngoại lệ (Exception Handling) là cơ chế cho phép chương trình Java xử lý các lỗi runtime một cách an toàn và có kiểm soát. Điều này giúp chương trình không bị crash và có thể phục hồi từ lỗi.

## Các loại Exception

### 1. Checked Exceptions (Compile-time)
- Phải được xử lý hoặc khai báo trong method signature
- Ví dụ: `IOException`, `SQLException`, `ClassNotFoundException`

### 2. Unchecked Exceptions (Runtime)
- Không bắt buộc phải xử lý
- Ví dụ: `NullPointerException`, `ArrayIndexOutOfBoundsException`, `ArithmeticException`

## Cú pháp try-catch-finally

```java
try {
    // Code có thể gây ra exception
} catch (ExceptionType e) {
    // Xử lý exception
} finally {
    // Code luôn được thực thi (có thể có hoặc không)
}
```

## Ví dụ 1: Xử lý ArithmeticException

```java
public class BasicExceptionHandling {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Nhập số thứ nhất: ");
            int a = scanner.nextInt();
            
            System.out.print("Nhập số thứ hai: ");
            int b = scanner.nextInt();
            
            // Phép chia có thể gây ra ArithmeticException
            double result = divide(a, b);
            System.out.println("Kết quả: " + result);
            
        } catch (ArithmeticException e) {
            System.out.println("Lỗi: Không thể chia cho 0!");
            System.out.println("Chi tiết lỗi: " + e.getMessage());
        } catch (InputMismatchException e) {
            System.out.println("Lỗi: Vui lòng nhập số nguyên hợp lệ!");
        } catch (Exception e) {
            System.out.println("Lỗi không xác định: " + e.getMessage());
        } finally {
            System.out.println("Chương trình kết thúc.");
            scanner.close();
        }
    }
    
    public static double divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Chia cho 0 không được phép");
        }
        return (double) a / b;
    }
}
```

## Ví dụ 2: Xử lý ArrayIndexOutOfBoundsException

```java
public class ArrayExceptionHandling {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        
        try {
            // Truy cập phần tử ngoài phạm vi
            for (int i = 0; i <= numbers.length; i++) {
                System.out.println("Phần tử " + i + ": " + numbers[i]);
            }
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Lỗi: Truy cập phần tử ngoài phạm vi mảng!");
            System.out.println("Chỉ số tối đa: " + (numbers.length - 1));
        }
        
        // Cách an toàn để duyệt mảng
        System.out.println("\nDuyệt mảng an toàn:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("Phần tử " + i + ": " + numbers[i]);
        }
    }
}
```

## Ví dụ 3: Tạo Custom Exception

```java
// Custom Exception cho tài khoản ngân hàng
public class InsufficientFundsException extends Exception {
    private double amount;
    private double balance;
    
    public InsufficientFundsException(double amount, double balance) {
        super("Số dư không đủ! Cần: " + amount + ", Có: " + balance);
        this.amount = amount;
        this.balance = balance;
    }
    
    public double getAmount() { return amount; }
    public double getBalance() { return balance; }
}

// Lớp BankAccount với exception handling
public class BankAccount {
    private String accountNumber;
    private double balance;
    
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(amount, balance);
        }
        balance -= amount;
        System.out.println("Rút thành công " + amount + " VND. Số dư còn lại: " + balance);
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Nạp thành công " + amount + " VND. Số dư: " + balance);
        } else {
            throw new IllegalArgumentException("Số tiền nạp phải lớn hơn 0");
        }
    }
    
    public double getBalance() { return balance; }
}

// Demo sử dụng custom exception
public class BankDemo {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("ACC001", 1000000);
        
        try {
            account.deposit(500000);
            account.withdraw(200000);
            account.withdraw(2000000); // Sẽ gây ra InsufficientFundsException
            
        } catch (InsufficientFundsException e) {
            System.out.println("Lỗi rút tiền: " + e.getMessage());
            System.out.println("Số tiền cần rút: " + e.getAmount());
            System.out.println("Số dư hiện tại: " + e.getBalance());
            
        } catch (IllegalArgumentException e) {
            System.out.println("Lỗi nạp tiền: " + e.getMessage());
        }
    }
}
```

## Ví dụ 4: Try-with-resources

```java
import java.io.*;
import java.util.Scanner;

public class TryWithResourcesDemo {
    public static void main(String[] args) {
        // Try-with-resources tự động đóng file
        try (FileWriter writer = new FileWriter("output.txt");
             Scanner scanner = new Scanner(System.in)) {
            
            System.out.print("Nhập nội dung để ghi vào file: ");
            String content = scanner.nextLine();
            
            writer.write("Nội dung: " + content + "\n");
            writer.write("Thời gian: " + new java.util.Date() + "\n");
            
            System.out.println("Đã ghi file thành công!");
            
        } catch (IOException e) {
            System.out.println("Lỗi ghi file: " + e.getMessage());
        }
        // FileWriter và Scanner sẽ tự động được đóng ở đây
    }
}
```

## Logging trong Java

### Sử dụng java.util.logging

```java
import java.util.logging.*;

public class LoggingDemo {
    private static final Logger logger = Logger.getLogger(LoggingDemo.class.getName());
    
    public static void main(String[] args) {
        // Cấu hình logging
        setupLogging();
        
        logger.info("Chương trình bắt đầu");
        
        try {
            int result = divide(10, 0);
            logger.info("Kết quả: " + result);
        } catch (ArithmeticException e) {
            logger.severe("Lỗi chia cho 0: " + e.getMessage());
        }
        
        logger.info("Chương trình kết thúc");
    }
    
    public static int divide(int a, int b) {
        logger.fine("Thực hiện phép chia: " + a + " / " + b);
        
        if (b == 0) {
            logger.warning("Cố gắng chia cho 0");
            throw new ArithmeticException("Chia cho 0");
        }
        
        int result = a / b;
        logger.fine("Kết quả phép chia: " + result);
        return result;
    }
    
    private static void setupLogging() {
        try {
            // Tạo file handler
            FileHandler fileHandler = new FileHandler("application.log");
            fileHandler.setFormatter(new SimpleFormatter());
            
            // Thêm handler vào logger
            logger.addHandler(fileHandler);
            logger.setLevel(Level.ALL);
            
            // Tắt console handler để chỉ ghi vào file
            logger.setUseParentHandlers(false);
            
        } catch (IOException e) {
            System.err.println("Không thể tạo file log: " + e.getMessage());
        }
    }
}
```

### Ví dụ Logging với SLF4J (Simple Logging Facade)

```java
// Cần thêm dependency SLF4J vào project
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SLF4JLoggingDemo {
    private static final Logger logger = LoggerFactory.getLogger(SLF4JLoggingDemo.class);
    
    public static void main(String[] args) {
        logger.info("Ứng dụng khởi động");
        
        try {
            processUserInput();
        } catch (Exception e) {
            logger.error("Lỗi xử lý: {}", e.getMessage(), e);
        }
        
        logger.info("Ứng dụng kết thúc");
    }
    
    public static void processUserInput() {
        logger.debug("Bắt đầu xử lý input");
        
        // Giả lập xử lý
        for (int i = 0; i < 5; i++) {
            logger.trace("Xử lý bước {}", i);
            
            if (i == 3) {
                logger.warn("Gặp vấn đề ở bước {}", i);
            }
        }
        
        logger.debug("Hoàn thành xử lý input");
    }
}
```

## Ví dụ 5: Xử lý Multiple Exceptions

```java
import java.io.*;
import java.net.*;

public class MultipleExceptionHandling {
    public static void main(String[] args) {
        try {
            // Có thể gây ra nhiều loại exception
            processFile("input.txt");
            connectToServer("http://example.com");
            
        } catch (FileNotFoundException e) {
            System.out.println("Không tìm thấy file: " + e.getMessage());
            
        } catch (IOException e) {
            System.out.println("Lỗi I/O: " + e.getMessage());
            
        } catch (MalformedURLException e) {
            System.out.println("URL không hợp lệ: " + e.getMessage());
            
        } catch (Exception e) {
            System.out.println("Lỗi không xác định: " + e.getMessage());
        }
    }
    
    public static void processFile(String filename) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Đọc: " + line);
            }
        }
    }
    
    public static void connectToServer(String urlString) throws MalformedURLException, IOException {
        URL url = new URL(urlString);
        // Giả lập kết nối
        System.out.println("Kết nối đến: " + url);
    }
}
```

## Best Practices cho Exception Handling

### 1. Sử dụng try-with-resources
```java
// Tốt
try (FileInputStream fis = new FileInputStream("file.txt")) {
    // xử lý file
} catch (IOException e) {
    // xử lý lỗi
}

// Tránh
FileInputStream fis = null;
try {
    fis = new FileInputStream("file.txt");
    // xử lý file
} finally {
    if (fis != null) {
        try { fis.close(); } catch (IOException e) { }
    }
}
```

### 2. Không bắt Exception chung chung
```java
// Tránh
try {
    // code
} catch (Exception e) {
    // xử lý tất cả exception
}

// Tốt hơn
try {
    // code
} catch (SpecificException e) {
    // xử lý exception cụ thể
}
```

### 3. Logging phù hợp
```java
logger.error("Lỗi xử lý file: {}", filename, exception);
logger.warn("Cảnh báo: {}", warningMessage);
logger.info("Thông tin: {}", infoMessage);
logger.debug("Debug: {}", debugInfo);
```

## Kết luận

Exception handling và logging là những kỹ năng quan trọng trong lập trình Java. Chúng giúp tạo ra ứng dụng ổn định, dễ debug và bảo trì. Việc sử dụng đúng các cơ chế này sẽ giúp bạn trở thành lập trình viên Java chuyên nghiệp.
