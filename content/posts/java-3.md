+++
title = "Java: Kế thừa và đa hình"
date = "2025-10-17T09:20:00+07:00"
draft = false
categories = ["Java"]
tags = ["inheritance","polymorphism","java"]
+++

## Giới thiệu về Kế thừa và Đa hình

Kế thừa (Inheritance) và Đa hình (Polymorphism) là hai trong bốn nguyên lý cơ bản của lập trình hướng đối tượng, giúp tạo ra code có thể tái sử dụng và linh hoạt hơn.

## Kế thừa (Inheritance)

Kế thừa cho phép một lớp con (subclass) kế thừa các thuộc tính và phương thức từ lớp cha (superclass).

### Cú pháp:
```java
class SubClass extends SuperClass {
    // code của lớp con
}
```

## Ví dụ 1: Hệ thống động vật

```java
// Lớp cha - Animal
public class Animal {
    protected String name;
    protected int age;
    protected String species;
    
    public Animal(String name, int age, String species) {
        this.name = name;
        this.age = age;
        this.species = species;
    }
    
    public void eat() {
        System.out.println(name + " đang ăn");
    }
    
    public void sleep() {
        System.out.println(name + " đang ngủ");
    }
    
    public void makeSound() {
        System.out.println(name + " phát ra âm thanh");
    }
    
    public void displayInfo() {
        System.out.println("Tên: " + name + ", Tuổi: " + age + ", Loài: " + species);
    }
}

// Lớp con - Dog
public class Dog extends Animal {
    private String breed;
    
    public Dog(String name, int age, String breed) {
        super(name, age, "Chó"); // Gọi constructor của lớp cha
        this.breed = breed;
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " sủa: Gâu gâu!");
    }
    
    public void wagTail() {
        System.out.println(name + " đang vẫy đuôi");
    }
    
    public void fetch() {
        System.out.println(name + " đang chạy lấy bóng");
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Giống: " + breed);
    }
}

// Lớp con - Cat
public class Cat extends Animal {
    private boolean isIndoor;
    
    public Cat(String name, int age, boolean isIndoor) {
        super(name, age, "Mèo");
        this.isIndoor = isIndoor;
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " kêu: Meo meo!");
    }
    
    public void purr() {
        System.out.println(name + " đang kêu rừ rừ");
    }
    
    public void climb() {
        System.out.println(name + " đang leo trèo");
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Sống trong nhà: " + (isIndoor ? "Có" : "Không"));
    }
}
```

### Demo kế thừa:

```java
public class AnimalDemo {
    public static void main(String[] args) {
        Dog dog = new Dog("Buddy", 3, "Golden Retriever");
        Cat cat = new Cat("Whiskers", 2, true);
        
        // Sử dụng phương thức từ lớp cha
        dog.eat();
        cat.sleep();
        
        // Sử dụng phương thức đã override
        dog.makeSound();
        cat.makeSound();
        
        // Sử dụng phương thức riêng của lớp con
        dog.wagTail();
        cat.purr();
        
        // Hiển thị thông tin
        dog.displayInfo();
        cat.displayInfo();
    }
}
```

## Abstract Class (Lớp trừu tượng)

Abstract class không thể khởi tạo trực tiếp, chỉ có thể được kế thừa.

```java
// Abstract class - Shape
public abstract class Shape {
    protected String color;
    protected boolean filled;
    
    public Shape(String color, boolean filled) {
        this.color = color;
        this.filled = filled;
    }
    
    // Abstract method - phải được implement bởi lớp con
    public abstract double getArea();
    public abstract double getPerimeter();
    
    // Concrete method - có thể sử dụng trực tiếp
    public String getColor() {
        return color;
    }
    
    public boolean isFilled() {
        return filled;
    }
    
    @Override
    public String toString() {
        return "Shape[color=" + color + ", filled=" + filled + "]";
    }
}

// Lớp con - Circle
public class Circle extends Shape {
    private double radius;
    
    public Circle(String color, boolean filled, double radius) {
        super(color, filled);
        this.radius = radius;
    }
    
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public double getPerimeter() {
        return 2 * Math.PI * radius;
    }
    
    public double getRadius() {
        return radius;
    }
}

// Lớp con - Rectangle
public class Rectangle extends Shape {
    private double width;
    private double height;
    
    public Rectangle(String color, boolean filled, double width, double height) {
        super(color, filled);
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double getArea() {
        return width * height;
    }
    
    @Override
    public double getPerimeter() {
        return 2 * (width + height);
    }
    
    public double getWidth() { return width; }
    public double getHeight() { return height; }
}
```

## Interface (Giao diện)

Interface định nghĩa các phương thức mà lớp implement phải có.

```java
// Interface - Flyable
public interface Flyable {
    void fly();
    void land();
    double getMaxAltitude();
}

// Interface - Swimmable
public interface Swimmable {
    void swim();
    void dive();
    int getMaxDepth();
}

// Lớp Bird implement Flyable
public class Bird extends Animal implements Flyable {
    private double maxAltitude;
    
    public Bird(String name, int age, double maxAltitude) {
        super(name, age, "Chim");
        this.maxAltitude = maxAltitude;
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " hót: Chip chip!");
    }
    
    @Override
    public void fly() {
        System.out.println(name + " đang bay trên trời");
    }
    
    @Override
    public void land() {
        System.out.println(name + " đã hạ cánh");
    }
    
    @Override
    public double getMaxAltitude() {
        return maxAltitude;
    }
}

// Lớp Duck implement cả Flyable và Swimmable
public class Duck extends Animal implements Flyable, Swimmable {
    private double maxAltitude;
    private int maxDepth;
    
    public Duck(String name, int age, double maxAltitude, int maxDepth) {
        super(name, age, "Vịt");
        this.maxAltitude = maxAltitude;
        this.maxDepth = maxDepth;
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " kêu: Quạc quạc!");
    }
    
    @Override
    public void fly() {
        System.out.println(name + " đang bay thấp");
    }
    
    @Override
    public void land() {
        System.out.println(name + " đã hạ cánh xuống nước");
    }
    
    @Override
    public double getMaxAltitude() {
        return maxAltitude;
    }
    
    @Override
    public void swim() {
        System.out.println(name + " đang bơi");
    }
    
    @Override
    public void dive() {
        System.out.println(name + " đang lặn");
    }
    
    @Override
    public int getMaxDepth() {
        return maxDepth;
    }
}
```

## Đa hình (Polymorphism)

Đa hình cho phép một đối tượng có thể có nhiều hình thái khác nhau.

### Ví dụ đa hình:

```java
public class PolymorphismDemo {
    public static void main(String[] args) {
        // Mảng chứa các đối tượng khác nhau
        Animal[] animals = {
            new Dog("Buddy", 3, "Golden Retriever"),
            new Cat("Whiskers", 2, true),
            new Bird("Tweety", 1, 100.0),
            new Duck("Donald", 4, 50.0, 5)
        };
        
        // Đa hình - cùng một phương thức nhưng hành vi khác nhau
        System.out.println("=== Các con vật phát âm thanh ===");
        for (Animal animal : animals) {
            animal.makeSound(); // Mỗi con vật có âm thanh riêng
        }
        
        // Đa hình với interface
        System.out.println("\n=== Các con vật có thể bay ===");
        for (Animal animal : animals) {
            if (animal instanceof Flyable) {
                Flyable flyable = (Flyable) animal;
                flyable.fly();
                System.out.println("Độ cao tối đa: " + flyable.getMaxAltitude() + "m");
            }
        }
        
        // Đa hình với interface
        System.out.println("\n=== Các con vật có thể bơi ===");
        for (Animal animal : animals) {
            if (animal instanceof Swimmable) {
                Swimmable swimmable = (Swimmable) animal;
                swimmable.swim();
                System.out.println("Độ sâu tối đa: " + swimmable.getMaxDepth() + "m");
            }
        }
    }
}
```

## Ví dụ thực tế: Hệ thống nhân viên

```java
// Abstract class Employee
public abstract class Employee {
    protected String name;
    protected int id;
    protected double baseSalary;
    
    public Employee(String name, int id, double baseSalary) {
        this.name = name;
        this.id = id;
        this.baseSalary = baseSalary;
    }
    
    // Abstract method
    public abstract double calculateSalary();
    
    public void displayInfo() {
        System.out.println("Tên: " + name + ", ID: " + id);
        System.out.println("Lương cơ bản: " + baseSalary);
        System.out.println("Lương thực tế: " + calculateSalary());
    }
}

// Lớp con - Manager
public class Manager extends Employee {
    private double bonus;
    
    public Manager(String name, int id, double baseSalary, double bonus) {
        super(name, id, baseSalary);
        this.bonus = bonus;
    }
    
    @Override
    public double calculateSalary() {
        return baseSalary + bonus;
    }
    
    public void conductMeeting() {
        System.out.println(name + " đang tổ chức cuộc họp");
    }
}

// Lớp con - Developer
public class Developer extends Employee {
    private int overtimeHours;
    private double overtimeRate;
    
    public Developer(String name, int id, double baseSalary, int overtimeHours, double overtimeRate) {
        super(name, id, baseSalary);
        this.overtimeHours = overtimeHours;
        this.overtimeRate = overtimeRate;
    }
    
    @Override
    public double calculateSalary() {
        return baseSalary + (overtimeHours * overtimeRate);
    }
    
    public void code() {
        System.out.println(name + " đang viết code");
    }
}

// Demo hệ thống nhân viên
public class EmployeeDemo {
    public static void main(String[] args) {
        Employee[] employees = {
            new Manager("Nguyễn Văn A", 1, 15000000, 3000000),
            new Developer("Trần Thị B", 2, 12000000, 20, 100000),
            new Developer("Lê Văn C", 3, 10000000, 15, 80000)
        };
        
        System.out.println("=== Thông tin nhân viên ===");
        for (Employee emp : employees) {
            emp.displayInfo();
            System.out.println("---");
        }
        
        // Tính tổng lương
        double totalSalary = 0;
        for (Employee emp : employees) {
            totalSalary += emp.calculateSalary();
        }
        System.out.println("Tổng lương công ty: " + totalSalary + " VND");
    }
}
```

## Lợi ích của Kế thừa và Đa hình

### Kế thừa:
- **Tái sử dụng code**: Tránh lặp lại code
- **Tổ chức code**: Tạo cấu trúc phân cấp rõ ràng
- **Dễ bảo trì**: Thay đổi ở lớp cha ảnh hưởng tất cả lớp con

### Đa hình:
- **Linh hoạt**: Cùng một interface, nhiều implementation
- **Mở rộng dễ dàng**: Thêm lớp mới mà không ảnh hưởng code cũ
- **Code sạch**: Giảm if-else phức tạp

## Kết luận

Kế thừa và đa hình là những công cụ mạnh mẽ trong lập trình hướng đối tượng Java. Chúng giúp tạo ra code có cấu trúc tốt, dễ mở rộng và bảo trì. Việc hiểu và áp dụng đúng các nguyên lý này sẽ giúp bạn trở thành lập trình viên Java chuyên nghiệp.
