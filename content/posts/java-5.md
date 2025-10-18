+++
title = "Java: Làm việc với file và I/O"
date = "2025-10-17T09:40:00+07:00"
draft = false
categories = ["Java"]
tags = ["io","file","java"]
+++

## Giới thiệu về File I/O trong Java

Java cung cấp nhiều cách để làm việc với file và I/O operations. Trong bài này, chúng ta sẽ tìm hiểu các phương pháp phổ biến nhất để đọc và ghi file.

## Các lớp I/O chính

### 1. Traditional I/O (java.io)
- `FileReader`, `FileWriter`
- `BufferedReader`, `BufferedWriter`
- `FileInputStream`, `FileOutputStream`

### 2. NIO.2 (java.nio.file)
- `Files` class với các phương thức static
- `Path` interface
- `Paths` utility class

## Ví dụ 1: Đọc file với BufferedReader

```java
import java.io.*;
import java.nio.charset.StandardCharsets;

public class FileReaderExample {
    public static void main(String[] args) {
        String filename = "input.txt";
        
        // Tạo file mẫu
        createSampleFile(filename);
        
        // Đọc file với BufferedReader
        try (BufferedReader reader = new BufferedReader(
                new FileReader(filename, StandardCharsets.UTF_8))) {
            
            System.out.println("=== Nội dung file ===");
            String line;
            int lineNumber = 1;
            
            while ((line = reader.readLine()) != null) {
                System.out.println(lineNumber + ": " + line);
                lineNumber++;
            }
            
        } catch (IOException e) {
            System.err.println("Lỗi đọc file: " + e.getMessage());
        }
    }
    
    private static void createSampleFile(String filename) {
        try (FileWriter writer = new FileWriter(filename, StandardCharsets.UTF_8)) {
            writer.write("Dòng 1: Chào mừng đến với Java I/O\n");
            writer.write("Dòng 2: Đây là ví dụ đọc file\n");
            writer.write("Dòng 3: Sử dụng BufferedReader\n");
            writer.write("Dòng 4: Với encoding UTF-8\n");
        } catch (IOException e) {
            System.err.println("Lỗi tạo file: " + e.getMessage());
        }
    }
}
```

## Ví dụ 2: Ghi file với BufferedWriter

```java
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

public class FileWriterExample {
    public static void main(String[] args) {
        String filename = "output.txt";
        
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(filename, StandardCharsets.UTF_8))) {
            
            // Ghi thông tin vào file
            writer.write("=== Báo cáo hệ thống ===\n");
            writer.write("Thời gian tạo: " + LocalDateTime.now() + "\n");
            writer.write("Người dùng: " + System.getProperty("user.name") + "\n");
            writer.write("Hệ điều hành: " + System.getProperty("os.name") + "\n");
            writer.write("Phiên bản Java: " + System.getProperty("java.version") + "\n");
            writer.write("\n");
            
            // Ghi danh sách số
            writer.write("Danh sách số từ 1 đến 10:\n");
            for (int i = 1; i <= 10; i++) {
                writer.write("Số " + i + ": " + (i * i) + "\n");
            }
            
            System.out.println("Đã ghi file thành công: " + filename);
            
        } catch (IOException e) {
            System.err.println("Lỗi ghi file: " + e.getMessage());
        }
    }
}
```

## Ví dụ 3: Sử dụng NIO.2 Files class

```java
import java.io.*;
import java.nio.file.*;
import java.util.List;
import java.util.stream.Stream;

public class NIO2FileExample {
    public static void main(String[] args) {
        String filename = "nio_example.txt";
        
        // Tạo file với NIO.2
        createFileWithNIO(filename);
        
        // Đọc file với Files.readAllLines()
        readFileWithNIO(filename);
        
        // Đọc file với Files.lines() (Stream)
        readFileWithStream(filename);
        
        // Sao chép file
        copyFile(filename, "copy_of_" + filename);
    }
    
    private static void createFileWithNIO(String filename) {
        try {
            Path path = Paths.get(filename);
            
            // Tạo nội dung file
            List<String> lines = List.of(
                "Dòng 1: Sử dụng NIO.2 Files class",
                "Dòng 2: Đây là cách hiện đại để làm việc với file",
                "Dòng 3: Files.write() rất tiện lợi",
                "Dòng 4: Hỗ trợ encoding UTF-8 mặc định"
            );
            
            // Ghi file
            Files.write(path, lines, StandardOpenOption.CREATE);
            System.out.println("Đã tạo file: " + filename);
            
        } catch (IOException e) {
            System.err.println("Lỗi tạo file: " + e.getMessage());
        }
    }
    
    private static void readFileWithNIO(String filename) {
        try {
            Path path = Paths.get(filename);
            
            // Đọc tất cả dòng vào List
            List<String> lines = Files.readAllLines(path);
            
            System.out.println("\n=== Đọc file với readAllLines() ===");
            for (int i = 0; i < lines.size(); i++) {
                System.out.println((i + 1) + ": " + lines.get(i));
            }
            
        } catch (IOException e) {
            System.err.println("Lỗi đọc file: " + e.getMessage());
        }
    }
    
    private static void readFileWithStream(String filename) {
        try {
            Path path = Paths.get(filename);
            
            System.out.println("\n=== Đọc file với Stream ===");
            try (Stream<String> lines = Files.lines(path)) {
                lines.forEach(line -> System.out.println("Stream: " + line));
            }
            
        } catch (IOException e) {
            System.err.println("Lỗi đọc file: " + e.getMessage());
        }
    }
    
    private static void copyFile(String source, String destination) {
        try {
            Path sourcePath = Paths.get(source);
            Path destPath = Paths.get(destination);
            
            // Sao chép file
            Files.copy(sourcePath, destPath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Đã sao chép file: " + source + " -> " + destination);
            
        } catch (IOException e) {
            System.err.println("Lỗi sao chép file: " + e.getMessage());
        }
    }
}
```

## Ví dụ 4: Xử lý file CSV

```java
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class CSVProcessor {
    public static void main(String[] args) {
        String csvFile = "students.csv";
        
        // Tạo file CSV mẫu
        createSampleCSV(csvFile);
        
        // Đọc và xử lý file CSV
        List<Student> students = readCSV(csvFile);
        
        // Hiển thị dữ liệu
        displayStudents(students);
        
        // Ghi file CSV mới với dữ liệu đã xử lý
        writeProcessedCSV("processed_students.csv", students);
    }
    
    private static void createSampleCSV(String filename) {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(filename, StandardCharsets.UTF_8))) {
            
            // Header
            writer.write("ID,Tên,Tuổi,Điểm Toán,Điểm Lý,Điểm Hóa\n");
            
            // Data
            writer.write("1,Nguyễn Văn A,20,8.5,7.8,9.2\n");
            writer.write("2,Trần Thị B,19,9.1,8.9,8.7\n");
            writer.write("3,Lê Văn C,21,7.5,8.2,7.9\n");
            writer.write("4,Phạm Thị D,20,8.8,9.1,8.5\n");
            writer.write("5,Hoàng Văn E,22,6.9,7.5,8.1\n");
            
            System.out.println("Đã tạo file CSV: " + filename);
            
        } catch (IOException e) {
            System.err.println("Lỗi tạo file CSV: " + e.getMessage());
        }
    }
    
    private static List<Student> readCSV(String filename) {
        List<Student> students = new ArrayList<>();
        
        try (BufferedReader reader = new BufferedReader(
                new FileReader(filename, StandardCharsets.UTF_8))) {
            
            String line;
            boolean isFirstLine = true;
            
            while ((line = reader.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue; // Bỏ qua header
                }
                
                String[] fields = line.split(",");
                if (fields.length >= 6) {
                    Student student = new Student(
                        Integer.parseInt(fields[0]),
                        fields[1],
                        Integer.parseInt(fields[2]),
                        Double.parseDouble(fields[3]),
                        Double.parseDouble(fields[4]),
                        Double.parseDouble(fields[5])
                    );
                    students.add(student);
                }
            }
            
        } catch (IOException e) {
            System.err.println("Lỗi đọc file CSV: " + e.getMessage());
        }
        
        return students;
    }
    
    private static void displayStudents(List<Student> students) {
        System.out.println("\n=== Danh sách sinh viên ===");
        System.out.printf("%-5s %-15s %-5s %-8s %-8s %-8s %-8s%n", 
            "ID", "Tên", "Tuổi", "Toán", "Lý", "Hóa", "TB");
        System.out.println("-".repeat(70));
        
        for (Student student : students) {
            System.out.printf("%-5d %-15s %-5d %-8.1f %-8.1f %-8.1f %-8.1f%n",
                student.getId(),
                student.getName(),
                student.getAge(),
                student.getMathScore(),
                student.getPhysicsScore(),
                student.getChemistryScore(),
                student.getAverageScore()
            );
        }
    }
    
    private static void writeProcessedCSV(String filename, List<Student> students) {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(filename, StandardCharsets.UTF_8))) {
            
            // Header
            writer.write("ID,Tên,Tuổi,Điểm Toán,Điểm Lý,Điểm Hóa,Điểm TB,Xếp loại\n");
            
            // Data
            for (Student student : students) {
                writer.write(String.format("%d,%s,%d,%.1f,%.1f,%.1f,%.1f,%s%n",
                    student.getId(),
                    student.getName(),
                    student.getAge(),
                    student.getMathScore(),
                    student.getPhysicsScore(),
                    student.getChemistryScore(),
                    student.getAverageScore(),
                    student.getGrade()
                ));
            }
            
            System.out.println("Đã ghi file CSV đã xử lý: " + filename);
            
        } catch (IOException e) {
            System.err.println("Lỗi ghi file CSV: " + e.getMessage());
        }
    }
}

// Lớp Student để lưu trữ dữ liệu
class Student {
    private int id;
    private String name;
    private int age;
    private double mathScore;
    private double physicsScore;
    private double chemistryScore;
    
    public Student(int id, String name, int age, double mathScore, 
                   double physicsScore, double chemistryScore) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.mathScore = mathScore;
        this.physicsScore = physicsScore;
        this.chemistryScore = chemistryScore;
    }
    
    public double getAverageScore() {
        return (mathScore + physicsScore + chemistryScore) / 3.0;
    }
    
    public String getGrade() {
        double avg = getAverageScore();
        if (avg >= 9.0) return "Xuất sắc";
        if (avg >= 8.0) return "Giỏi";
        if (avg >= 7.0) return "Khá";
        if (avg >= 6.0) return "Trung bình";
        return "Yếu";
    }
    
    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public double getMathScore() { return mathScore; }
    public double getPhysicsScore() { return physicsScore; }
    public double getChemistryScore() { return chemistryScore; }
}
```

## Ví dụ 5: Xử lý file Binary

```java
import java.io.*;
import java.nio.file.*;

public class BinaryFileExample {
    public static void main(String[] args) {
        String filename = "data.bin";
        
        // Ghi file binary
        writeBinaryFile(filename);
        
        // Đọc file binary
        readBinaryFile(filename);
        
        // Sao chép file binary
        copyBinaryFile(filename, "copy_" + filename);
    }
    
    private static void writeBinaryFile(String filename) {
        try (DataOutputStream dos = new DataOutputStream(
                new FileOutputStream(filename))) {
            
            // Ghi các kiểu dữ liệu khác nhau
            dos.writeInt(12345);
            dos.writeDouble(3.14159);
            dos.writeBoolean(true);
            dos.writeUTF("Hello Binary World!");
            dos.writeChar('A');
            
            System.out.println("Đã ghi file binary: " + filename);
            
        } catch (IOException e) {
            System.err.println("Lỗi ghi file binary: " + e.getMessage());
        }
    }
    
    private static void readBinaryFile(String filename) {
        try (DataInputStream dis = new DataInputStream(
                new FileInputStream(filename))) {
            
            System.out.println("\n=== Đọc file binary ===");
            
            // Đọc theo đúng thứ tự đã ghi
            int intValue = dis.readInt();
            double doubleValue = dis.readDouble();
            boolean boolValue = dis.readBoolean();
            String stringValue = dis.readUTF();
            char charValue = dis.readChar();
            
            System.out.println("Int: " + intValue);
            System.out.println("Double: " + doubleValue);
            System.out.println("Boolean: " + boolValue);
            System.out.println("String: " + stringValue);
            System.out.println("Char: " + charValue);
            
        } catch (IOException e) {
            System.err.println("Lỗi đọc file binary: " + e.getMessage());
        }
    }
    
    private static void copyBinaryFile(String source, String destination) {
        try {
            Path sourcePath = Paths.get(source);
            Path destPath = Paths.get(destination);
            
            // Sao chép file binary
            Files.copy(sourcePath, destPath, StandardCopyOption.REPLACE_EXISTING);
            
            // Kiểm tra kích thước file
            long sourceSize = Files.size(sourcePath);
            long destSize = Files.size(destPath);
            
            System.out.println("Đã sao chép file binary: " + source + " -> " + destination);
            System.out.println("Kích thước file gốc: " + sourceSize + " bytes");
            System.out.println("Kích thước file copy: " + destSize + " bytes");
            
        } catch (IOException e) {
            System.err.println("Lỗi sao chép file binary: " + e.getMessage());
        }
    }
}
```

## Ví dụ 6: Quản lý thư mục

```java
import java.io.*;
import java.nio.file.*;
import java.util.stream.Stream;

public class DirectoryManager {
    public static void main(String[] args) {
        String dirName = "test_directory";
        
        // Tạo thư mục
        createDirectory(dirName);
        
        // Tạo file trong thư mục
        createFilesInDirectory(dirName);
        
        // Liệt kê nội dung thư mục
        listDirectoryContents(dirName);
        
        // Tìm kiếm file
        searchFiles(dirName, ".txt");
        
        // Xóa thư mục
        deleteDirectory(dirName);
    }
    
    private static void createDirectory(String dirName) {
        try {
            Path dir = Paths.get(dirName);
            Files.createDirectories(dir);
            System.out.println("Đã tạo thư mục: " + dirName);
        } catch (IOException e) {
            System.err.println("Lỗi tạo thư mục: " + e.getMessage());
        }
    }
    
    private static void createFilesInDirectory(String dirName) {
        try {
            // Tạo các file khác nhau
            String[] files = {"file1.txt", "file2.log", "file3.dat", "subdir/file4.txt"};
            
            for (String fileName : files) {
                Path filePath = Paths.get(dirName, fileName);
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, ("Nội dung file " + fileName).getBytes());
            }
            
            System.out.println("Đã tạo các file trong thư mục");
            
        } catch (IOException e) {
            System.err.println("Lỗi tạo file: " + e.getMessage());
        }
    }
    
    private static void listDirectoryContents(String dirName) {
        try {
            Path dir = Paths.get(dirName);
            
            System.out.println("\n=== Nội dung thư mục " + dirName + " ===");
            
            try (Stream<Path> paths = Files.walk(dir)) {
                paths.forEach(path -> {
                    try {
                        if (Files.isDirectory(path)) {
                            System.out.println("[DIR]  " + path);
                        } else {
                            long size = Files.size(path);
                            System.out.println("[FILE] " + path + " (" + size + " bytes)");
                        }
                    } catch (IOException e) {
                        System.err.println("Lỗi đọc thông tin file: " + e.getMessage());
                    }
                });
            }
            
        } catch (IOException e) {
            System.err.println("Lỗi liệt kê thư mục: " + e.getMessage());
        }
    }
    
    private static void searchFiles(String dirName, String extension) {
        try {
            Path dir = Paths.get(dirName);
            
            System.out.println("\n=== Tìm file có đuôi " + extension + " ===");
            
            try (Stream<Path> paths = Files.walk(dir)) {
                paths.filter(Files::isRegularFile)
                     .filter(path -> path.toString().endsWith(extension))
                     .forEach(System.out::println);
            }
            
        } catch (IOException e) {
            System.err.println("Lỗi tìm kiếm file: " + e.getMessage());
        }
    }
    
    private static void deleteDirectory(String dirName) {
        try {
            Path dir = Paths.get(dirName);
            
            // Xóa thư mục và tất cả nội dung bên trong
            Files.walk(dir)
                 .sorted((a, b) -> b.compareTo(a)) // Xóa file trước, thư mục sau
                 .forEach(path -> {
                     try {
                         Files.delete(path);
                         System.out.println("Đã xóa: " + path);
                     } catch (IOException e) {
                         System.err.println("Lỗi xóa: " + path + " - " + e.getMessage());
                     }
                 });
            
            System.out.println("Đã xóa thư mục: " + dirName);
            
        } catch (IOException e) {
            System.err.println("Lỗi xóa thư mục: " + e.getMessage());
        }
    }
}
```

## Best Practices cho File I/O

### 1. Luôn sử dụng try-with-resources
```java
// Tốt
try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
    // xử lý file
} catch (IOException e) {
    // xử lý lỗi
}

// Tránh
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("file.txt"));
    // xử lý file
} finally {
    if (reader != null) {
        try { reader.close(); } catch (IOException e) { }
    }
}
```

### 2. Sử dụng encoding phù hợp
```java
// Luôn chỉ định encoding
new FileReader("file.txt", StandardCharsets.UTF_8)
new FileWriter("file.txt", StandardCharsets.UTF_8)
```

### 3. Kiểm tra file tồn tại
```java
Path path = Paths.get("file.txt");
if (Files.exists(path)) {
    // xử lý file
} else {
    System.out.println("File không tồn tại");
}
```

### 4. Xử lý exception phù hợp
```java
try {
    // file operations
} catch (FileNotFoundException e) {
    // file không tồn tại
} catch (IOException e) {
    // lỗi I/O khác
}
```

## Kết luận

File I/O là một phần quan trọng trong lập trình Java. Việc hiểu và sử dụng đúng các API I/O sẽ giúp bạn tạo ra ứng dụng có thể xử lý dữ liệu một cách hiệu quả và an toàn. NIO.2 cung cấp API hiện đại và mạnh mẽ hơn so với traditional I/O, nên hãy ưu tiên sử dụng khi có thể.
