+++
title = "Java: Lập trình hướng đối tượng - Lớp và đối tượng"
date = "2025-10-17T09:10:00+07:00"
draft = false
categories = ["Java"]
tags = ["oop","class","object","java"]
+++

## Giới thiệu về OOP trong Java

Lập trình hướng đối tượng (OOP) là một mô hình lập trình dựa trên khái niệm "đối tượng", chứa dữ liệu (thuộc tính) và mã (phương thức). Java là ngôn ngữ hoàn toàn hướng đối tượng.

## Các khái niệm cơ bản

### 1. Lớp (Class)
Lớp là khuôn mẫu để tạo ra các đối tượng. Nó định nghĩa các thuộc tính và phương thức mà đối tượng sẽ có.

### 2. Đối tượng (Object)
Đối tượng là một thể hiện cụ thể của lớp, có các thuộc tính và phương thức riêng.

## Ví dụ 1: Lớp Person cơ bản

```java
public class Person {
    // Thuộc tính (Attributes/Fields)
    private String name;
    private int age;
    private String email;
    
    // Constructor - Phương thức khởi tạo
    public Person(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
    
    // Phương thức getter
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    public String getEmail() {
        return email;
    }
    
    // Phương thức setter
    public void setName(String name) {
        this.name = name;
    }
    
    public void setAge(int age) {
        if (age >= 0) {
            this.age = age;
        }
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    // Phương thức hành động
    public void introduce() {
        System.out.println("Xin chào, tôi là " + name + ", " + age + " tuổi.");
    }
    
    public void celebrateBirthday() {
        age++;
        System.out.println("Chúc mừng sinh nhật! Bây giờ tôi " + age + " tuổi.");
    }
}
```

### Sử dụng lớp Person:

```java
public class PersonDemo {
    public static void main(String[] args) {
        // Tạo đối tượng Person
        Person person1 = new Person("Nguyễn Văn A", 25, "nguyenvana@email.com");
        Person person2 = new Person("Trần Thị B", 30, "tranthib@email.com");
        
        // Sử dụng phương thức
        person1.introduce();
        person2.introduce();
        
        // Thay đổi thuộc tính
        person1.setAge(26);
        person1.celebrateBirthday();
        
        // Truy cập thuộc tính
        System.out.println("Email của " + person1.getName() + ": " + person1.getEmail());
    }
}
```

## Ví dụ 2: Lớp BankAccount

```java
public class BankAccount {
    private String accountNumber;
    private String accountHolder;
    private double balance;
    private static int totalAccounts = 0; // Biến static
    
    // Constructor
    public BankAccount(String accountHolder, double initialBalance) {
        this.accountNumber = "ACC" + (++totalAccounts);
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }
    
    // Phương thức nạp tiền
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Nạp thành công " + amount + " VND. Số dư: " + balance);
        } else {
            System.out.println("Số tiền nạp phải lớn hơn 0");
        }
    }
    
    // Phương thức rút tiền
    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Rút thành công " + amount + " VND. Số dư còn lại: " + balance);
            return true;
        } else {
            System.out.println("Không thể rút tiền. Số dư không đủ hoặc số tiền không hợp lệ");
            return false;
        }
    }
    
    // Phương thức kiểm tra số dư
    public void checkBalance() {
        System.out.println("Số dư tài khoản " + accountNumber + ": " + balance + " VND");
    }
    
    // Phương thức chuyển tiền
    public void transfer(BankAccount targetAccount, double amount) {
        if (withdraw(amount)) {
            targetAccount.deposit(amount);
            System.out.println("Chuyển tiền thành công đến " + targetAccount.accountHolder);
        }
    }
    
    // Getter methods
    public String getAccountNumber() { return accountNumber; }
    public String getAccountHolder() { return accountHolder; }
    public double getBalance() { return balance; }
    public static int getTotalAccounts() { return totalAccounts; }
}
```

### Demo BankAccount:

```java
public class BankDemo {
    public static void main(String[] args) {
        // Tạo tài khoản
        BankAccount account1 = new BankAccount("Nguyễn Văn A", 1000000);
        BankAccount account2 = new BankAccount("Trần Thị B", 500000);
        
        // Thao tác với tài khoản
        account1.checkBalance();
        account1.deposit(500000);
        account1.withdraw(200000);
        
        // Chuyển tiền
        account1.transfer(account2, 300000);
        
        // Kiểm tra số dư sau chuyển
        account1.checkBalance();
        account2.checkBalance();
        
        System.out.println("Tổng số tài khoản: " + BankAccount.getTotalAccounts());
    }
}
```

## Ví dụ 3: Lớp Car với nhiều thuộc tính

```java
public class Car {
    private String brand;
    private String model;
    private int year;
    private double price;
    private boolean isRunning;
    private int speed;
    
    // Constructor
    public Car(String brand, String model, int year, double price) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        this.isRunning = false;
        this.speed = 0;
    }
    
    // Phương thức khởi động xe
    public void start() {
        if (!isRunning) {
            isRunning = true;
            System.out.println(brand + " " + model + " đã được khởi động");
        } else {
            System.out.println("Xe đã đang chạy rồi");
        }
    }
    
    // Phương thức tắt xe
    public void stop() {
        if (isRunning) {
            isRunning = false;
            speed = 0;
            System.out.println(brand + " " + model + " đã được tắt");
        } else {
            System.out.println("Xe đã tắt rồi");
        }
    }
    
    // Phương thức tăng tốc
    public void accelerate(int increment) {
        if (isRunning) {
            speed += increment;
            System.out.println("Tăng tốc! Tốc độ hiện tại: " + speed + " km/h");
        } else {
            System.out.println("Cần khởi động xe trước khi tăng tốc");
        }
    }
    
    // Phương thức giảm tốc
    public void brake(int decrement) {
        if (isRunning && speed > 0) {
            speed = Math.max(0, speed - decrement);
            System.out.println("Giảm tốc! Tốc độ hiện tại: " + speed + " km/h");
        }
    }
    
    // Phương thức hiển thị thông tin
    public void displayInfo() {
        System.out.println("=== Thông tin xe ===");
        System.out.println("Hãng: " + brand);
        System.out.println("Model: " + model);
        System.out.println("Năm: " + year);
        System.out.println("Giá: " + price + " VND");
        System.out.println("Trạng thái: " + (isRunning ? "Đang chạy" : "Đã tắt"));
        System.out.println("Tốc độ: " + speed + " km/h");
    }
    
    // Getter methods
    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public int getYear() { return year; }
    public double getPrice() { return price; }
    public boolean isRunning() { return isRunning; }
    public int getSpeed() { return speed; }
}
```

### Demo Car:

```java
public class CarDemo {
    public static void main(String[] args) {
        Car myCar = new Car("Toyota", "Camry", 2023, 1200000000);
        
        myCar.displayInfo();
        myCar.start();
        myCar.accelerate(50);
        myCar.accelerate(30);
        myCar.brake(20);
        myCar.displayInfo();
        myCar.stop();
    }
}
```

## Encapsulation (Đóng gói)

Encapsulation là nguyên lý che giấu dữ liệu bên trong lớp và chỉ cho phép truy cập thông qua các phương thức công khai.

### Lợi ích:
- **Bảo mật dữ liệu**: Ngăn chặn truy cập trực tiếp không mong muốn
- **Kiểm soát dữ liệu**: Có thể validate dữ liệu trước khi gán
- **Dễ bảo trì**: Thay đổi implementation mà không ảnh hưởng code bên ngoài

## Kết luận

Lập trình hướng đối tượng trong Java giúp code trở nên có tổ chức, dễ hiểu và dễ bảo trì. Việc nắm vững các khái niệm cơ bản như lớp, đối tượng, thuộc tính và phương thức là nền tảng quan trọng để phát triển các ứng dụng Java phức tạp hơn.
