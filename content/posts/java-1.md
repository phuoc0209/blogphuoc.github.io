+++
title = "Java: Kiến thức cơ bản và môi trường phát triển"
date = "2025-10-17T09:00:00+07:00"
draft = false
categories = ["Java"]
tags = ["java","cơ bản","intro"]
+++

## Giới thiệu về Java

Java là một ngôn ngữ lập trình hướng đối tượng, được phát triển bởi Sun Microsystems (nay thuộc Oracle). Java có đặc điểm "Write Once, Run Anywhere" - viết một lần, chạy mọi nơi.

## Môi trường phát triển

### 1. JDK (Java Development Kit)
- **JDK**: Bộ công cụ phát triển Java, bao gồm compiler (javac) và JRE
- **JRE**: Java Runtime Environment, môi trường chạy ứng dụng Java
- **JVM**: Java Virtual Machine, máy ảo thực thi bytecode

### 2. IDE phổ biến
- **IntelliJ IDEA**: IDE mạnh mẽ nhất cho Java
- **Eclipse**: IDE miễn phí và phổ biến
- **Visual Studio Code**: Editor nhẹ với extension Java

## Cấu trúc chương trình Java cơ bản

### Ví dụ 1: Hello World

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

**Giải thích:**
- `public class HelloWorld`: Định nghĩa lớp công khai tên HelloWorld
- `public static void main(String[] args)`: Phương thức main - điểm bắt đầu chương trình
- `System.out.println()`: In ra màn hình

### Ví dụ 2: Chương trình tính toán đơn giản

```java
public class Calculator {
    public static void main(String[] args) {
        int a = 10;
        int b = 5;
        
        System.out.println("Tổng: " + (a + b));
        System.out.println("Hiệu: " + (a - b));
        System.out.println("Tích: " + (a * b));
        System.out.println("Thương: " + (a / b));
    }
}
```

### Ví dụ 3: Sử dụng Scanner để nhập liệu

```java
import java.util.Scanner;

public class UserInput {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Nhập tên của bạn: ");
        String name = scanner.nextLine();
        
        System.out.print("Nhập tuổi của bạn: ");
        int age = scanner.nextInt();
        
        System.out.println("Xin chào " + name + ", bạn " + age + " tuổi!");
        
        scanner.close();
    }
}
```

## Biên dịch và chạy chương trình

### Từ dòng lệnh:
```bash
# Biên dịch
javac HelloWorld.java

# Chạy chương trình
java HelloWorld
```

### Kết quả:
```
Hello, World!
```

## Các kiểu dữ liệu cơ bản

```java
public class DataTypes {
    public static void main(String[] args) {
        // Số nguyên
        byte b = 127;           // 8-bit
        short s = 32767;        // 16-bit
        int i = 2147483647;     // 32-bit
        long l = 9223372036854775807L; // 64-bit
        
        // Số thực
        float f = 3.14f;        // 32-bit
        double d = 3.14159265359; // 64-bit
        
        // Ký tự và boolean
        char c = 'A';
        boolean bool = true;
        
        // Chuỗi
        String str = "Hello Java";
        
        System.out.println("int: " + i);
        System.out.println("double: " + d);
        System.out.println("char: " + c);
        System.out.println("String: " + str);
    }
}
```

## Kết luận

Java là ngôn ngữ mạnh mẽ với cú pháp rõ ràng và dễ học. Việc hiểu cấu trúc cơ bản và cách thiết lập môi trường phát triển là bước đầu quan trọng để học lập trình Java.
