  // Assignment Questions
  export default [
    {
      id: 1,
      title: 'Advantages and Limitations of Java',
      question: 'Explain the advantages and limitations of Java.',
      dueDate: '25/08/2025',
      topics: ['Java Basics', 'Theory'],
      description: 'Discuss the key benefits and drawbacks of the Java programming language.',
      answer: `**Advantages of Java:**

1. **Platform Independence (Write Once, Run Anywhere)**
   - Java code is compiled into bytecode that runs on JVM
   - Can run on any platform with JVM installed (Windows, Linux, Mac, etc.)
   - No need to recompile for different platforms

2. **Object-Oriented Programming**
   - Everything is an object in Java (except primitives)
   - Supports encapsulation, inheritance, polymorphism, and abstraction
   - Promotes code reusability and modularity

3. **Simple and Easy to Learn**
   - Syntax is clean and easy to understand
   - Removed complex features like pointers and operator overloading
   - Automatic memory management with garbage collection

4. **Robust and Secure**
   - Strong type checking at compile time
   - Exception handling mechanism for error management
   - Security features like bytecode verification and sandbox execution
   - No direct memory access prevents memory corruption

5. **Multithreading Support**
   - Built-in support for concurrent programming
   - Easy to create multithreaded applications
   - Thread synchronization mechanisms available

6. **Rich API and Libraries**
   - Extensive standard library (Java API)
   - Large ecosystem of third-party libraries and frameworks
   - Support for networking, I/O, database connectivity, etc.

7. **Automatic Memory Management**
   - Garbage collection handles memory deallocation
   - Reduces memory leaks and pointer-related errors

**Limitations of Java:**

1. **Performance Overhead**
   - Slower than natively compiled languages like C/C++
   - JVM interpretation adds overhead
   - Not suitable for performance-critical applications

2. **Memory Consumption**
   - Requires more memory compared to native languages
   - JVM itself consumes significant memory
   - Not ideal for memory-constrained devices

3. **Verbose Syntax**
   - Requires more lines of code compared to modern languages
   - Boilerplate code for simple tasks
   - Can reduce developer productivity

4. **Limited Control Over Hardware**
   - No direct access to memory pointers
   - Cannot perform low-level system operations easily
   - Not suitable for system programming

5. **Startup Time**
   - JVM takes time to initialize
   - Slower application startup compared to native applications

6. **Look and Feel**
   - GUI applications may not match native OS appearance
   - Swing/JavaFX applications can look different across platforms

7. **Paid Commercial Use**
   - Oracle JDK requires licensing for commercial use
   - Need to consider alternatives like OpenJDK`
    },
    {
      id: 2,
      title: 'JVM, JDK, and JRE',
      question: 'Explain JVM, JDK, and JRE in detail with neat diagrams.',
      dueDate: '25/08/2025',
      topics: ['Java Architecture', 'Theory'],
      description: 'Provide detailed explanations of Java Virtual Machine, Java Development Kit, and Java Runtime Environment with architectural diagrams.',
      answer: `**1. JVM (Java Virtual Machine)**

JVM is an abstract machine that provides the runtime environment to execute Java bytecode. It is platform-dependent but makes Java platform-independent.

**Key Components of JVM:**
- **Class Loader:** Loads .class files into memory
- **Bytecode Verifier:** Ensures bytecode is valid and secure
- **Execution Engine:** Executes bytecode (Interpreter + JIT Compiler)
- **Runtime Data Areas:** Method Area, Heap, Stack, PC Register, Native Method Stack
- **Garbage Collector:** Manages memory automatically

**JVM Architecture:**
\`\`\`
┌─────────────────────────────────────────┐
│          Java Source Code (.java)        │
└──────────────┬──────────────────────────┘
               │ javac (compiler)
               ▼
┌─────────────────────────────────────────┐
│          Bytecode (.class)               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│              JVM                         │
│  ┌────────────────────────────────┐    │
│  │      Class Loader Subsystem    │    │
│  └──────────────┬─────────────────┘    │
│                 │                       │
│  ┌──────────────▼─────────────────┐    │
│  │   Runtime Data Areas           │    │
│  │  • Method Area                 │    │
│  │  • Heap                        │    │
│  │  • Stack                       │    │
│  │  • PC Registers                │    │
│  └──────────────┬─────────────────┘    │
│                 │                       │
│  ┌──────────────▼─────────────────┐    │
│  │    Execution Engine             │    │
│  │  • Interpreter                 │    │
│  │  • JIT Compiler                │    │
│  │  • Garbage Collector           │    │
│  └────────────────────────────────┘    │
└─────────────────────────────────────────┘
\`\`\`

**2. JRE (Java Runtime Environment)**

JRE provides the environment to run Java applications. It includes JVM and standard libraries but does NOT include development tools.

**Components:**
- JVM (Java Virtual Machine)
- Java Class Libraries (rt.jar, etc.)
- Java Runtime Libraries
- Supporting files

**JRE = JVM + Libraries + Other Components**

Used by end-users who only need to run Java applications.

**3. JDK (Java Development Kit)**

JDK is a complete development kit for Java developers. It includes JRE plus development tools.

**Components:**
- JRE (JVM + Libraries)
- Java Compiler (javac)
- Debugger (jdb)
- JavaDoc (documentation generator)
- Archiver (jar)
- Other development tools

**JDK = JRE + Development Tools**

Used by developers to write, compile, and debug Java applications.

**Relationship Diagram:**
\`\`\`
┌───────────────────────────────────────────┐
│              JDK                          │
│  (Java Development Kit)                   │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │  Development Tools                  │ │
│  │  • javac (compiler)                 │ │
│  │  • java (launcher)                  │ │
│  │  • javadoc                          │ │
│  │  • jar, jdb, etc.                   │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │           JRE                       │ │
│  │  (Java Runtime Environment)         │ │
│  │                                     │ │
│  │  ┌───────────────────────────────┐ │ │
│  │  │       JVM                     │ │ │
│  │  │  (Java Virtual Machine)       │ │ │
│  │  │  • Interpreter                │ │ │
│  │  │  • JIT Compiler               │ │ │
│  │  │  • Class Loader               │ │ │
│  │  │  • Garbage Collector          │ │ │
│  │  └───────────────────────────────┘ │ │
│  │                                     │ │
│  │  ┌───────────────────────────────┐ │ │
│  │  │   Java Class Libraries        │ │ │
│  │  │   (rt.jar, API packages)      │ │ │
│  │  └───────────────────────────────┘ │ │
│  └─────────────────────────────────────┘ │
└───────────────────────────────────────────┘
\`\`\`

**Key Differences:**

| Feature | JVM | JRE | JDK |
|---------|-----|-----|-----|
| Purpose | Execute bytecode | Run Java apps | Develop Java apps |
| Contains | Execution engine only | JVM + Libraries | JRE + Dev tools |
| Platform | Platform-specific | Platform-specific | Platform-specific |
| Users | Hidden from user | End users | Developers |
| Size | Smallest | Medium | Largest |`
    },
    {
      id: 3,
      title: 'Java Program Structure',
      question: 'Write and explain the general structure of a Java program with a suitable example.',
      dueDate: '25/08/2025',
      topics: ['Java Basics', 'Program Structure'],
      description: 'Demonstrate the basic structure of a Java program including class declaration, main method, and code organization.',
      answer: `**General Structure of a Java Program:**

A Java program follows a specific structure with several key components:

**1. Package Declaration (Optional)**
\`\`\`java
package com.example.myapp;
\`\`\`
- Groups related classes together
- Must be the first statement (if present)
- Follows reverse domain naming convention

**2. Import Statements (Optional)**
\`\`\`java
import java.util.Scanner;
import java.util.*;
\`\`\`
- Imports classes from other packages
- Comes after package declaration
- Allows using classes without fully qualified names

**3. Class Declaration (Mandatory)**
\`\`\`java
public class ClassName {
    // class body
}
\`\`\`
- Every Java program must have at least one class
- Class name should match the filename
- Only one public class per file

**4. Main Method (Entry Point)**
\`\`\`java
public static void main(String[] args) {
    // program execution starts here
}
\`\`\`
- Entry point of the program
- Must be public, static, and void
- Takes String array as parameter

**Complete Example with Explanation:**

\`\`\`java
// 1. Package Declaration (optional)
package com.college.oop;

// 2. Import Statements (optional)
import java.util.Scanner;
import java.time.LocalDate;

// 3. Class Declaration
/**
 * JavaDoc comments for documentation
 * This class demonstrates basic Java program structure
 */
public class StudentInfo {

    // 4. Class Variables (Fields)
    private String name;
    private int rollNumber;
    private String department;
    private static int studentCount = 0;

    // 5. Constructor
    public StudentInfo(String name, int rollNumber, String department) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.department = department;
        studentCount++;
    }

    // 6. Methods
    public void displayInfo() {
        System.out.println("\\n--- Student Information ---");
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Department: " + department);
    }

    public static void displayCount() {
        System.out.println("Total Students: " + studentCount);
    }

    // 7. Main Method (Entry Point)
    public static void main(String[] args) {
        // Program execution starts here
        System.out.println("Welcome to Student Management System");
        System.out.println("Date: " + LocalDate.now());

        // Creating objects
        StudentInfo student1 = new StudentInfo("Alice Johnson", 101, "Computer Science");
        StudentInfo student2 = new StudentInfo("Bob Smith", 102, "Electronics");

        // Calling methods
        student1.displayInfo();
        student2.displayInfo();

        // Calling static method
        StudentInfo.displayCount();
    }
}
\`\`\`

**Component Breakdown:**

**1. Package Declaration:**
- \`package com.college.oop;\`
- Organizes classes into namespaces
- Optional but recommended for larger projects

**2. Import Statements:**
- \`import java.util.Scanner;\` - imports specific class
- \`import java.time.LocalDate;\` - imports date functionality
- Allows using classes without full package path

**3. Class Declaration:**
- \`public class StudentInfo\` - class must be public if filename matches
- Class name follows PascalCase convention
- Contains all program logic

**4. Instance Variables:**
- \`private String name;\` - accessible only within class
- Store object state/data
- Should be declared at the top of class

**5. Static Variables:**
- \`static int studentCount\` - shared among all instances
- Belongs to class, not individual objects

**6. Constructor:**
- \`public StudentInfo(...)\` - special method to initialize objects
- Same name as class
- Called when object is created with 'new'

**7. Methods:**
- \`displayInfo()\` - instance method (requires object)
- \`displayCount()\` - static method (called on class)
- Perform operations and behaviors

**8. Main Method:**
- \`public static void main(String[] args)\`
- **public:** accessible from anywhere
- **static:** can run without creating object
- **void:** doesn't return any value
- **String[] args:** command-line arguments

**Program Flow:**
1. JVM loads the class
2. JVM calls the main() method
3. Code inside main() executes line by line
4. Objects are created and methods are called
5. Program terminates when main() ends

**Naming Conventions:**
- **Classes:** PascalCase (StudentInfo)
- **Methods:** camelCase (displayInfo)
- **Variables:** camelCase (rollNumber)
- **Constants:** UPPER_SNAKE_CASE (MAX_STUDENTS)
- **Packages:** lowercase (com.college.oop)

**Output:**
\`\`\`
Welcome to Student Management System
Date: 2025-01-15

--- Student Information ---
Name: Alice Johnson
Roll Number: 101
Department: Computer Science

--- Student Information ---
Name: Bob Smith
Roll Number: 102
Department: Electronics

Total Students: 2
\`\`\``
    },
    {
      id: 4,
      title: 'Four Pillars of OOP',
      question: 'Describe the four pillars of Object-Oriented Programming in Java with examples.',
      dueDate: '25/08/2025',
      topics: ['OOP Concepts', 'Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'],
      description: 'Explain Encapsulation, Inheritance, Polymorphism, and Abstraction with practical Java examples.',
      answer: `**The Four Pillars of Object-Oriented Programming**

**1. ENCAPSULATION**

Encapsulation is the bundling of data (variables) and methods that operate on that data within a single unit (class), and restricting direct access to some components.

**Key Concepts:**
- Data hiding using private access modifiers
- Public getter and setter methods
- Protects data integrity
- Increases security and maintainability

**Example:**
\`\`\`java
public class BankAccount {
    // Private variables (data hiding)
    private String accountNumber;
    private double balance;
    private String accountHolder;

    // Constructor
    public BankAccount(String accountNumber, String accountHolder) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = 0.0;
    }

    // Public getter methods
    public double getBalance() {
        return balance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    // Public methods with validation
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        } else {
            System.out.println("Invalid withdrawal");
        }
    }

    public void displayInfo() {
        System.out.println("Account: " + accountNumber);
        System.out.println("Holder: " + accountHolder);
        System.out.println("Balance: $" + balance);
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("ACC001", "John Doe");
        account.deposit(1000);
        account.withdraw(300);
        // Cannot access: account.balance = 5000; // Error!
        System.out.println("Balance: " + account.getBalance());
    }
}
\`\`\`

**Benefits:**
- Data protection from unauthorized access
- Flexibility to change implementation
- Controlled access through methods

---

**2. INHERITANCE**

Inheritance allows a class to acquire properties and methods from another class, promoting code reusability.

**Key Concepts:**
- Parent class (superclass) and child class (subclass)
- 'extends' keyword
- IS-A relationship
- Single, multilevel, and hierarchical inheritance

**Example:**
\`\`\`java
// Parent class
class Vehicle {
    protected String brand;
    protected int year;

    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }

    public void start() {
        System.out.println("Vehicle is starting...");
    }

    public void displayInfo() {
        System.out.println("Brand: " + brand);
        System.out.println("Year: " + year);
    }
}

// Child class 1
class Car extends Vehicle {
    private int numberOfDoors;

    public Car(String brand, int year, int doors) {
        super(brand, year);  // Call parent constructor
        this.numberOfDoors = doors;
    }

    @Override
    public void start() {
        System.out.println("Car engine starting...");
    }

    public void displayCarInfo() {
        displayInfo();  // Inherited method
        System.out.println("Doors: " + numberOfDoors);
    }
}

// Child class 2
class Motorcycle extends Vehicle {
    private boolean hasSidecar;

    public Motorcycle(String brand, int year, boolean hasSidecar) {
        super(brand, year);
        this.hasSidecar = hasSidecar;
    }

    @Override
    public void start() {
        System.out.println("Motorcycle ignition starting...");
    }

    public void displayMotorcycleInfo() {
        displayInfo();
        System.out.println("Sidecar: " + (hasSidecar ? "Yes" : "No"));
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Car car = new Car("Toyota", 2023, 4);
        car.start();
        car.displayCarInfo();

        Motorcycle bike = new Motorcycle("Harley", 2022, true);
        bike.start();
        bike.displayMotorcycleInfo();
    }
}
\`\`\`

**Benefits:**
- Code reusability
- Establishes relationship between classes
- Method overriding capability

---

**3. POLYMORPHISM**

Polymorphism means "many forms" - ability of an object to take multiple forms. Same method behaves differently based on the object.

**Types:**
- **Compile-time (Method Overloading):** Same method name, different parameters
- **Runtime (Method Overriding):** Subclass provides specific implementation

**Example:**
\`\`\`java
// Compile-time Polymorphism (Method Overloading)
class Calculator {
    // Same method name, different parameters
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {
        return a + b;
    }

    public int add(int a, int b, int c) {
        return a + b + c;
    }

    public String add(String a, String b) {
        return a + b;
    }
}

// Runtime Polymorphism (Method Overriding)
class Shape {
    public void draw() {
        System.out.println("Drawing a shape");
    }

    public double area() {
        return 0.0;
    }
}

class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {
    private double width, height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public void draw() {
        System.out.println("Drawing a rectangle");
    }

    @Override
    public double area() {
        return width * height;
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        // Method Overloading
        Calculator calc = new Calculator();
        System.out.println(calc.add(5, 10));           // 15
        System.out.println(calc.add(5.5, 10.5));       // 16.0
        System.out.println(calc.add(5, 10, 15));       // 30
        System.out.println(calc.add("Hello ", "World")); // Hello World

        // Method Overriding (Runtime Polymorphism)
        Shape shape1 = new Circle(5.0);
        Shape shape2 = new Rectangle(4.0, 6.0);

        shape1.draw();                    // Drawing a circle
        System.out.println("Area: " + shape1.area()); // 78.54

        shape2.draw();                    // Drawing a rectangle
        System.out.println("Area: " + shape2.area()); // 24.0
    }
}
\`\`\`

**Benefits:**
- Flexibility and extensibility
- Single interface, multiple implementations
- Cleaner and more maintainable code

---

**4. ABSTRACTION**

Abstraction means hiding implementation details and showing only essential features. Focus on WHAT an object does, not HOW it does it.

**Ways to achieve:**
- Abstract classes (0-100% abstraction)
- Interfaces (100% abstraction)

**Example:**
\`\`\`java
// Abstract class
abstract class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    // Abstract methods (no implementation)
    public abstract void makeSound();
    public abstract void move();

    // Concrete method
    public void sleep() {
        System.out.println(name + " is sleeping...");
    }
}

// Concrete class 1
class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    @Override
    public void makeSound() {
        System.out.println(name + " says: Woof! Woof!");
    }

    @Override
    public void move() {
        System.out.println(name + " runs on four legs");
    }
}

// Concrete class 2
class Bird extends Animal {
    public Bird(String name) {
        super(name);
    }

    @Override
    public void makeSound() {
        System.out.println(name + " says: Chirp! Chirp!");
    }

    @Override
    public void move() {
        System.out.println(name + " flies in the sky");
    }
}

// Interface for additional abstraction
interface Swimmable {
    void swim();
}

class Duck extends Animal implements Swimmable {
    public Duck(String name) {
        super(name);
    }

    @Override
    public void makeSound() {
        System.out.println(name + " says: Quack! Quack!");
    }

    @Override
    public void move() {
        System.out.println(name + " walks and flies");
    }

    @Override
    public void swim() {
        System.out.println(name + " swims in the water");
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        // Cannot create: Animal a = new Animal(); // Error!

        Animal dog = new Dog("Buddy");
        dog.makeSound();
        dog.move();
        dog.sleep();

        Animal bird = new Bird("Tweety");
        bird.makeSound();
        bird.move();

        Duck duck = new Duck("Donald");
        duck.makeSound();
        duck.move();
        duck.swim();
    }
}
\`\`\`

**Benefits:**
- Reduces complexity
- Increases security
- Supports modularity
- Focuses on interface rather than implementation

---

**Summary Table:**

| Pillar | Purpose | Implementation | Example |
|--------|---------|----------------|---------|
| Encapsulation | Data hiding & bundling | Private fields + Public methods | Bank account with balance |
| Inheritance | Code reusability | extends keyword | Vehicle → Car, Motorcycle |
| Polymorphism | Multiple forms | Overloading & Overriding | Shape → Circle, Rectangle |
| Abstraction | Hide complexity | Abstract class & Interface | Animal → Dog, Bird, Duck |

These four pillars work together to create robust, maintainable, and scalable object-oriented programs.`
    },
    {
      id: 5,
      title: 'Operators in Java',
      question: 'Discuss the different types of operators in Java with examples.',
      dueDate: '25/08/2025',
      topics: ['Operators', 'Java Basics'],
      description: 'Cover arithmetic, relational, logical, bitwise, assignment, and other operators with code examples.',
      answer: `**Types of Operators in Java**

Java provides a rich set of operators to perform various operations on variables and values.

**1. ARITHMETIC OPERATORS**

Used to perform mathematical operations.

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| + | Addition | 5 + 3 | 8 |
| - | Subtraction | 5 - 3 | 2 |
| * | Multiplication | 5 * 3 | 15 |
| / | Division | 10 / 3 | 3 |
| % | Modulus (Remainder) | 10 % 3 | 1 |

\`\`\`java
public class ArithmeticExample {
    public static void main(String[] args) {
        int a = 15, b = 4;

        System.out.println("Addition: " + (a + b));      // 19
        System.out.println("Subtraction: " + (a - b));   // 11
        System.out.println("Multiplication: " + (a * b)); // 60
        System.out.println("Division: " + (a / b));      // 3
        System.out.println("Modulus: " + (a % b));       // 3

        double c = 15.0, d = 4.0;
        System.out.println("Float Division: " + (c / d)); // 3.75
    }
}
\`\`\`

---

**2. UNARY OPERATORS**

Operate on a single operand.

| Operator | Name | Description | Example |
|----------|------|-------------|---------|
| + | Unary plus | Positive value | +5 |
| - | Unary minus | Negative value | -5 |
| ++ | Increment | Increase by 1 | x++ or ++x |
| -- | Decrement | Decrease by 1 | x-- or --x |
| ! | Logical NOT | Inverts boolean | !true = false |

\`\`\`java
public class UnaryExample {
    public static void main(String[] args) {
        int x = 10;

        // Pre-increment: increment first, then use
        System.out.println("Pre-increment: " + (++x));   // 11
        System.out.println("Value: " + x);               // 11

        // Post-increment: use first, then increment
        System.out.println("Post-increment: " + (x++));  // 11
        System.out.println("Value: " + x);               // 12

        // Decrement
        System.out.println("Pre-decrement: " + (--x));   // 11
        System.out.println("Post-decrement: " + (x--));  // 11
        System.out.println("Final value: " + x);         // 10

        // Logical NOT
        boolean flag = true;
        System.out.println("NOT flag: " + !flag);        // false
    }
}
\`\`\`

---

**3. RELATIONAL (COMPARISON) OPERATORS**

Compare two values and return boolean result.

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| == | Equal to | 5 == 3 | false |
| != | Not equal to | 5 != 3 | true |
| > | Greater than | 5 > 3 | true |
| < | Less than | 5 < 3 | false |
| >= | Greater than or equal | 5 >= 5 | true |
| <= | Less than or equal | 5 <= 3 | false |

\`\`\`java
public class RelationalExample {
    public static void main(String[] args) {
        int a = 10, b = 20;

        System.out.println("a == b: " + (a == b));  // false
        System.out.println("a != b: " + (a != b));  // true
        System.out.println("a > b: " + (a > b));    // false
        System.out.println("a < b: " + (a < b));    // true
        System.out.println("a >= 10: " + (a >= 10)); // true
        System.out.println("b <= 20: " + (b <= 20)); // true
    }
}
\`\`\`

---

**4. LOGICAL OPERATORS**

Combine multiple boolean expressions.

| Operator | Name | Description | Example |
|----------|------|-------------|---------|
| && | Logical AND | Both must be true | true && false = false |
| \\|\\| | Logical OR | At least one true | true \\|\\| false = true |
| ! | Logical NOT | Inverts boolean | !true = false |

\`\`\`java
public class LogicalExample {
    public static void main(String[] args) {
        int age = 25;
        boolean hasLicense = true;

        // AND operator
        if (age >= 18 && hasLicense) {
            System.out.println("Can drive!");  // This prints
        }

        // OR operator
        boolean isWeekend = false;
        boolean isHoliday = true;
        if (isWeekend || isHoliday) {
            System.out.println("No work today!"); // This prints
        }

        // NOT operator
        boolean isRaining = false;
        if (!isRaining) {
            System.out.println("Go for a walk!"); // This prints
        }

        // Short-circuit evaluation
        int x = 0;
        // Second part not evaluated because first is false
        if (x != 0 && 10/x > 2) {
            System.out.println("Safe from division by zero");
        }
    }
}
\`\`\`

---

**5. ASSIGNMENT OPERATORS**

Assign values to variables.

| Operator | Example | Equivalent to |
|----------|---------|---------------|
| = | x = 5 | x = 5 |
| += | x += 3 | x = x + 3 |
| -= | x -= 3 | x = x - 3 |
| *= | x *= 3 | x = x * 3 |
| /= | x /= 3 | x = x / 3 |
| %= | x %= 3 | x = x % 3 |

\`\`\`java
public class AssignmentExample {
    public static void main(String[] args) {
        int x = 10;
        System.out.println("Initial: " + x);     // 10

        x += 5;  // x = x + 5
        System.out.println("After +=5: " + x);   // 15

        x -= 3;  // x = x - 3
        System.out.println("After -=3: " + x);   // 12

        x *= 2;  // x = x * 2
        System.out.println("After *=2: " + x);   // 24

        x /= 4;  // x = x / 4
        System.out.println("After /=4: " + x);   // 6

        x %= 4;  // x = x % 4
        System.out.println("After %=4: " + x);   // 2
    }
}
\`\`\`

---

**6. BITWISE OPERATORS**

Operate on individual bits.

| Operator | Name | Description |
|----------|------|-------------|
| & | Bitwise AND | 1 if both bits are 1 |
| \\| | Bitwise OR | 1 if at least one bit is 1 |
| ^ | Bitwise XOR | 1 if bits are different |
| ~ | Bitwise NOT | Inverts all bits |
| << | Left shift | Shift bits left |
| >> | Right shift | Shift bits right |
| >>> | Unsigned right shift | Shift right with zero fill |

\`\`\`java
public class BitwiseExample {
    public static void main(String[] args) {
        int a = 5;   // 0101 in binary
        int b = 3;   // 0011 in binary

        System.out.println("a & b: " + (a & b));   // 1 (0001)
        System.out.println("a | b: " + (a | b));   // 7 (0111)
        System.out.println("a ^ b: " + (a ^ b));   // 6 (0110)
        System.out.println("~a: " + (~a));         // -6 (inverts all bits)

        // Shift operators
        System.out.println("a << 1: " + (a << 1)); // 10 (1010) - multiply by 2
        System.out.println("a >> 1: " + (a >> 1)); // 2 (0010)  - divide by 2
    }
}
\`\`\`

---

**7. TERNARY OPERATOR**

Shorthand for if-else statement.

**Syntax:** \`condition ? value_if_true : value_if_false\`

\`\`\`java
public class TernaryExample {
    public static void main(String[] args) {
        int age = 20;

        // Ternary operator
        String result = (age >= 18) ? "Adult" : "Minor";
        System.out.println(result);  // Adult

        // Nested ternary
        int marks = 85;
        String grade = (marks >= 90) ? "A" :
                       (marks >= 80) ? "B" :
                       (marks >= 70) ? "C" : "D";
        System.out.println("Grade: " + grade);  // B

        // Finding max
        int x = 15, y = 25;
        int max = (x > y) ? x : y;
        System.out.println("Maximum: " + max);  // 25
    }
}
\`\`\`

---

**8. INSTANCEOF OPERATOR**

Checks if an object is an instance of a class or interface.

\`\`\`java
public class InstanceOfExample {
    public static void main(String[] args) {
        String str = "Hello";
        Integer num = 100;

        System.out.println(str instanceof String);  // true
        System.out.println(num instanceof Integer); // true
        System.out.println(str instanceof Object);  // true
        System.out.println(num instanceof String);  // false
    }
}
\`\`\`

---

**Operator Precedence (Highest to Lowest):**

1. Postfix: \`expr++\`, \`expr--\`
2. Unary: \`++expr\`, \`--expr\`, \`+\`, \`-\`, \`!\`, \`~\`
3. Multiplicative: \`*\`, \`/\`, \`%\`
4. Additive: \`+\`, \`-\`
5. Shift: \`<<\`, \`>>\`, \`>>>\`
6. Relational: \`<\`, \`>\`, \`<=\`, \`>=\`, \`instanceof\`
7. Equality: \`==\`, \`!=\`
8. Bitwise AND: \`&\`
9. Bitwise XOR: \`^\`
10. Bitwise OR: \`|\`
11. Logical AND: \`&&\`
12. Logical OR: \`||\`
13. Ternary: \`? :\`
14. Assignment: \`=\`, \`+=\`, \`-=\`, etc.

**Complete Example:**
\`\`\`java
public class OperatorDemo {
    public static void main(String[] args) {
        // Mixed operators with precedence
        int result = 10 + 5 * 2;  // Multiplication first
        System.out.println("10 + 5 * 2 = " + result);  // 20

        // Using parentheses to change precedence
        result = (10 + 5) * 2;
        System.out.println("(10 + 5) * 2 = " + result);  // 30

        // Complex expression
        int a = 5, b = 10, c = 15;
        boolean check = (a < b) && (b < c) || (a == 5);
        System.out.println("Complex: " + check);  // true
    }
}
\`\`\``
    },
    {
      id: 6,
      title: 'Data Types in Java',
      question: 'Explain data types in Java with examples.',
      dueDate: '25/08/2025',
      topics: ['Data Types', 'Java Basics'],
      description: 'Describe primitive and reference data types in Java with practical examples.',
      answer: `**Data Types in Java**

Java is a strongly-typed language, meaning every variable must have a declared type. Data types are divided into two categories:

**1. PRIMITIVE DATA TYPES (8 types)**

These are predefined by Java and store simple values directly in memory.

**A. Integer Types:**

| Type | Size | Range | Default |
|------|------|-------|---------|
| byte | 8-bit | -128 to 127 | 0 |
| short | 16-bit | -32,768 to 32,767 | 0 |
| int | 32-bit | -2³¹ to 2³¹-1 | 0 |
| long | 64-bit | -2⁶³ to 2⁶³-1 | 0L |

\`\`\`java
public class IntegerTypes {
    public static void main(String[] args) {
        byte age = 25;              // Small numbers
        short year = 2024;          // Medium numbers
        int population = 8000000;   // Most commonly used
        long distance = 9460730472580800L; // Large numbers (note L suffix)

        System.out.println("Age: " + age);
        System.out.println("Year: " + year);
        System.out.println("Population: " + population);
        System.out.println("Distance: " + distance);

        // Range demonstration
        System.out.println("\\nByte range: " + Byte.MIN_VALUE + " to " + Byte.MAX_VALUE);
        System.out.println("Int range: " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
    }
}
\`\`\`

**B. Floating-Point Types:**

| Type | Size | Precision | Default |
|------|------|-----------|---------|
| float | 32-bit | 6-7 decimal digits | 0.0f |
| double | 64-bit | 15 decimal digits | 0.0d |

\`\`\`java
public class FloatingTypes {
    public static void main(String[] args) {
        float temperature = 98.6f;     // Note 'f' suffix
        double pi = 3.14159265359;     // More precise
        double scientificNotation = 1.5e10; // 1.5 × 10¹⁰

        System.out.println("Temperature: " + temperature);
        System.out.println("Pi: " + pi);
        System.out.println("Scientific: " + scientificNotation);

        // Precision comparison
        float f = 1.123456789f;
        double d = 1.123456789;
        System.out.println("\\nFloat precision: " + f);   // ~1.1234568
        System.out.println("Double precision: " + d);     // 1.123456789
    }
}
\`\`\`

**C. Character Type:**

| Type | Size | Range | Default |
|------|------|-------|---------|
| char | 16-bit | 0 to 65,535 (Unicode) | '\\u0000' |

\`\`\`java
public class CharacterType {
    public static void main(String[] args) {
        char grade = 'A';
        char symbol = '@';
        char unicode = '\\u0041';  // 'A' in Unicode
        char digit = '5';

        System.out.println("Grade: " + grade);
        System.out.println("Symbol: " + symbol);
        System.out.println("Unicode: " + unicode);
        System.out.println("Digit char: " + digit);

        // ASCII value
        System.out.println("\\nASCII of A: " + (int)'A');  // 65

        // Character operations
        char next = (char)(grade + 1);  // 'B'
        System.out.println("Next grade: " + next);
    }
}
\`\`\`

**D. Boolean Type:**

| Type | Size | Values | Default |
|------|------|--------|---------|
| boolean | 1-bit | true, false | false |

\`\`\`java
public class BooleanType {
    public static void main(String[] args) {
        boolean isJavaFun = true;
        boolean isRaining = false;
        boolean result = (10 > 5);  // true

        System.out.println("Java is fun: " + isJavaFun);
        System.out.println("Is raining: " + isRaining);
        System.out.println("10 > 5: " + result);

        // Used in conditions
        if (isJavaFun) {
            System.out.println("Keep coding!");
        }
    }
}
\`\`\`

---

**2. REFERENCE (NON-PRIMITIVE) DATA TYPES**

These refer to objects and are created by the programmer (except String).

**A. String:**

\`\`\`java
public class StringType {
    public static void main(String[] args) {
        String name = "John Doe";
        String greeting = new String("Hello");

        System.out.println("Name: " + name);
        System.out.println("Length: " + name.length());
        System.out.println("Uppercase: " + name.toUpperCase());
        System.out.println("Substring: " + name.substring(0, 4));

        // String comparison
        String s1 = "Hello";
        String s2 = "Hello";
        String s3 = new String("Hello");

        System.out.println("\\ns1 == s2: " + (s1 == s2));           // true (same reference)
        System.out.println("s1 == s3: " + (s1 == s3));              // false (different reference)
        System.out.println("s1.equals(s3): " + s1.equals(s3));     // true (same content)
    }
}
\`\`\`

**B. Arrays:**

\`\`\`java
public class ArrayType {
    public static void main(String[] args) {
        // Single-dimensional array
        int[] numbers = {10, 20, 30, 40, 50};
        String[] names = new String[3];
        names[0] = "Alice";
        names[1] = "Bob";
        names[2] = "Charlie";

        System.out.println("First number: " + numbers[0]);
        System.out.println("Array length: " + numbers.length);

        // Loop through array
        for (int num : numbers) {
            System.out.print(num + " ");
        }

        // Multi-dimensional array
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        System.out.println("\\n\\nMatrix[1][1]: " + matrix[1][1]);  // 5
    }
}
\`\`\`

**C. Classes and Objects:**

\`\`\`java
class Student {
    String name;
    int rollNumber;

    void display() {
        System.out.println("Name: " + name + ", Roll: " + rollNumber);
    }
}

public class ClassType {
    public static void main(String[] args) {
        Student student1 = new Student();
        student1.name = "John";
        student1.rollNumber = 101;
        student1.display();
    }
}
\`\`\`

**D. Interface:**

\`\`\`java
interface Drawable {
    void draw();
}

class Circle implements Drawable {
    public void draw() {
        System.out.println("Drawing circle");
    }
}
\`\`\`

---

**Type Conversion and Casting**

**Implicit Conversion (Widening):** Automatic, smaller to larger
\`\`\`java
public class TypeConversion {
    public static void main(String[] args) {
        // Implicit (automatic) conversion
        int intValue = 100;
        long longValue = intValue;      // int to long
        float floatValue = longValue;   // long to float
        double doubleValue = floatValue; // float to double

        System.out.println("int: " + intValue);
        System.out.println("long: " + longValue);
        System.out.println("double: " + doubleValue);

        // Explicit (manual) conversion - Type Casting
        double d = 99.99;
        int i = (int) d;  // Loses decimal part
        System.out.println("\\nDouble: " + d);
        System.out.println("Int (casted): " + i);  // 99

        // Possible data loss
        int largeInt = 130;
        byte smallByte = (byte) largeInt;  // Overflow
        System.out.println("\\nLarge int: " + largeInt);
        System.out.println("Byte (overflow): " + smallByte);  // -126
    }
}
\`\`\`

---

**Comparison: Primitive vs Reference**

\`\`\`java
public class PrimitiveVsReference {
    public static void main(String[] args) {
        // Primitive types - store actual value
        int a = 10;
        int b = a;  // Copies value
        b = 20;
        System.out.println("Primitive - a: " + a + ", b: " + b);  // 10, 20

        // Reference types - store reference (address)
        int[] arr1 = {1, 2, 3};
        int[] arr2 = arr1;  // Copies reference
        arr2[0] = 100;
        System.out.println("Reference - arr1[0]: " + arr1[0]);  // 100 (both changed!)
        System.out.println("Reference - arr2[0]: " + arr2[0]);  // 100
    }
}
\`\`\`

---

**Summary Table:**

| Category | Type | Size | Example | Default |
|----------|------|------|---------|---------|
| **Primitive** | byte | 8-bit | byte b = 10; | 0 |
| | short | 16-bit | short s = 100; | 0 |
| | int | 32-bit | int i = 1000; | 0 |
| | long | 64-bit | long l = 10000L; | 0L |
| | float | 32-bit | float f = 10.5f; | 0.0f |
| | double | 64-bit | double d = 10.5; | 0.0d |
| | char | 16-bit | char c = 'A'; | '\\u0000' |
| | boolean | 1-bit | boolean b = true; | false |
| **Reference** | String | - | String s = "Hi"; | null |
| | Array | - | int[] arr = {1,2}; | null |
| | Class | - | Student s = new Student(); | null |
| | Interface | - | List list = new ArrayList(); | null |

**Key Differences:**
- **Primitive:** Store values directly, faster, fixed size
- **Reference:** Store memory addresses, dynamic size, can be null`
    },
    {
      id: 7,
      title: 'String Operations',
      question: 'What is a String in Java? Explain string operations in detail.',
      dueDate: '25/08/2025',
      topics: ['Strings', 'String Methods'],
      description: 'Explain String creation, concatenation, conversion, case manipulation, character extraction, comparison, and StringBuffer usage with programs.',
      answer: `**String in Java**

A String in Java is a sequence of characters. It is an object of the String class (java.lang.String) and is one of the most commonly used classes in Java.

**Key Characteristics:**
- Strings are immutable (cannot be changed once created)
- Stored in String Pool for memory optimization
- Implements CharSequence interface
- Thread-safe due to immutability

---

**1. TWO WAYS OF STRING CREATION**

\`\`\`java
public class StringCreation {
    public static void main(String[] args) {
        // Method 1: String Literal (Recommended)
        // Stored in String Pool
        String str1 = "Hello";
        String str2 = "Hello";

        // Method 2: Using 'new' keyword
        // Stored in Heap memory
        String str3 = new String("Hello");
        String str4 = new String("Hello");

        // Reference comparison (==)
        System.out.println("str1 == str2: " + (str1 == str2));     // true (same reference)
        System.out.println("str3 == str4: " + (str3 == str4));     // false (different objects)
        System.out.println("str1 == str3: " + (str1 == str3));     // false

        // Content comparison (.equals())
        System.out.println("\\nstr1.equals(str3): " + str1.equals(str3)); // true

        // Memory diagram:
        // String Pool: "Hello" ← str1, str2
        // Heap: "Hello" (object 1) ← str3
        //       "Hello" (object 2) ← str4
    }
}
\`\`\`

---

**2. STRING CONCATENATION**

\`\`\`java
public class StringConcatenation {
    public static void main(String[] args) {
        String firstName = "John";
        String lastName = "Doe";

        // Method 1: Using + operator
        String fullName1 = firstName + " " + lastName;
        System.out.println("Using +: " + fullName1);

        // Method 2: Using concat() method
        String fullName2 = firstName.concat(" ").concat(lastName);
        System.out.println("Using concat(): " + fullName2);

        // Method 3: Using StringBuilder (efficient for multiple concatenations)
        StringBuilder sb = new StringBuilder();
        sb.append(firstName).append(" ").append(lastName);
        String fullName3 = sb.toString();
        System.out.println("Using StringBuilder: " + fullName3);

        // Concatenation with other types
        int age = 25;
        String info = "Name: " + firstName + ", Age: " + age;
        System.out.println(info);

        // Performance note: + creates new String objects (inefficient in loops)
        // StringBuilder is mutable and more efficient
        String result = "";
        for (int i = 1; i <= 5; i++) {
            result += i + " ";  // Creates 5 new String objects
        }
        System.out.println("\\nLoop result: " + result);
    }
}
\`\`\`

---

**3. CONVERSION OF A STRING**

\`\`\`java
public class StringConversion {
    public static void main(String[] args) {
        // String to primitive types
        String numStr = "123";
        String floatStr = "45.67";
        String boolStr = "true";

        int num = Integer.parseInt(numStr);
        double decimal = Double.parseDouble(floatStr);
        boolean flag = Boolean.parseBoolean(boolStr);

        System.out.println("String to int: " + num);
        System.out.println("String to double: " + decimal);
        System.out.println("String to boolean: " + flag);

        // Primitive types to String
        int value = 100;
        String str1 = String.valueOf(value);
        String str2 = Integer.toString(value);
        String str3 = "" + value;  // Quick method

        System.out.println("\\nInt to String: " + str1);

        // String to character array
        String text = "Hello";
        char[] chars = text.toCharArray();
        System.out.println("\\nCharacter array:");
        for (char c : chars) {
            System.out.print(c + " ");
        }

        // Character array to String
        char[] charArray = {'J', 'a', 'v', 'a'};
        String str4 = new String(charArray);
        System.out.println("\\n\\nChar array to String: " + str4);

        // String to byte array
        String original = "Hello";
        byte[] bytes = original.getBytes();
        String reconstructed = new String(bytes);
        System.out.println("\\nReconstructed: " + reconstructed);
    }
}
\`\`\`

---

**4. CHANGING CASE OF STRING**

\`\`\`java
public class StringCase {
    public static void main(String[] args) {
        String text = "Hello World";

        // Convert to uppercase
        String upper = text.toUpperCase();
        System.out.println("Uppercase: " + upper);

        // Convert to lowercase
        String lower = text.toLowerCase();
        System.out.println("Lowercase: " + lower);

        // Practical example: Case-insensitive comparison
        String input = "JAVA";
        String expected = "java";

        if (input.toLowerCase().equals(expected.toLowerCase())) {
            System.out.println("\\nMatch found (case-insensitive)");
        }

        // Toggle case example
        String original = "HeLLo";
        StringBuilder toggled = new StringBuilder();
        for (char c : original.toCharArray()) {
            if (Character.isUpperCase(c)) {
                toggled.append(Character.toLowerCase(c));
            } else {
                toggled.append(Character.toUpperCase(c));
            }
        }
        System.out.println("\\nOriginal: " + original);
        System.out.println("Toggled: " + toggled);
    }
}
\`\`\`

---

**5. CHARACTER EXTRACTION**

\`\`\`java
public class CharacterExtraction {
    public static void main(String[] args) {
        String str = "Hello World";

        // charAt() - extract single character
        char ch = str.charAt(0);
        System.out.println("Character at index 0: " + ch);

        char lastChar = str.charAt(str.length() - 1);
        System.out.println("Last character: " + lastChar);

        // getChars() - extract multiple characters into array
        char[] buffer = new char[5];
        str.getChars(0, 5, buffer, 0);  // source start, source end, dest, dest start
        System.out.print("\\nExtracted chars: ");
        for (char c : buffer) {
            System.out.print(c);
        }

        // toCharArray() - convert entire string to char array
        char[] allChars = str.toCharArray();
        System.out.println("\\n\\nAll characters:");
        for (int i = 0; i < allChars.length; i++) {
            System.out.println("Index " + i + ": " + allChars[i]);
        }

        // substring() - extract substring
        String sub1 = str.substring(6);     // From index 6 to end
        String sub2 = str.substring(0, 5);  // From 0 to 5 (exclusive)
        System.out.println("\\nSubstring from 6: " + sub1);
        System.out.println("Substring 0-5: " + sub2);

        // Practical example: Extract first and last name
        String fullName = "John Doe";
        int spaceIndex = fullName.indexOf(' ');
        String first = fullName.substring(0, spaceIndex);
        String last = fullName.substring(spaceIndex + 1);
        System.out.println("\\nFirst Name: " + first);
        System.out.println("Last Name: " + last);
    }
}
\`\`\`

---

**6. STRING COMPARISON**

\`\`\`java
public class StringComparison {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = "Hello";
        String s3 = new String("Hello");
        String s4 = "hello";

        // equals() - compares content (case-sensitive)
        System.out.println("s1.equals(s2): " + s1.equals(s2));         // true
        System.out.println("s1.equals(s3): " + s1.equals(s3));         // true
        System.out.println("s1.equals(s4): " + s1.equals(s4));         // false

        // equalsIgnoreCase() - ignores case
        System.out.println("\\ns1.equalsIgnoreCase(s4): " + s1.equalsIgnoreCase(s4)); // true

        // == operator - compares reference
        System.out.println("\\ns1 == s2: " + (s1 == s2));               // true (same reference)
        System.out.println("s1 == s3: " + (s1 == s3));                  // false (different objects)

        // compareTo() - lexicographic comparison
        String a = "Apple";
        String b = "Banana";
        String c = "Apple";

        System.out.println("\\na.compareTo(b): " + a.compareTo(b));    // negative (a < b)
        System.out.println("b.compareTo(a): " + b.compareTo(a));       // positive (b > a)
        System.out.println("a.compareTo(c): " + a.compareTo(c));       // 0 (equal)

        // compareToIgnoreCase()
        System.out.println("\\n'Hello'.compareToIgnoreCase('HELLO'): " +
                          "Hello".compareToIgnoreCase("HELLO"));        // 0

        // startsWith() and endsWith()
        String filename = "document.pdf";
        System.out.println("\\nStarts with 'doc': " + filename.startsWith("doc"));
        System.out.println("Ends with '.pdf': " + filename.endsWith(".pdf"));

        // contains()
        String sentence = "Java is awesome";
        System.out.println("\\nContains 'awesome': " + sentence.contains("awesome"));

        // matches() - regex pattern matching
        String email = "user@example.com";
        boolean isValidEmail = email.matches(".*@.*\\\\..*");
        System.out.println("\\nValid email format: " + isValidEmail);
    }
}
\`\`\`

---

**7. STRINGBUFFER USAGE**

StringBuffer is a mutable sequence of characters (thread-safe).

\`\`\`java
public class StringBufferUsage {
    public static void main(String[] args) {
        // Create StringBuffer
        StringBuffer sb = new StringBuffer("Hello");
        System.out.println("Initial: " + sb);
        System.out.println("Capacity: " + sb.capacity());     // Default 16 + length
        System.out.println("Length: " + sb.length());

        // append() - add to end
        sb.append(" World");
        sb.append("!").append(" Java");
        System.out.println("\\nAfter append: " + sb);

        // insert() - add at specific position
        sb.insert(6, "Beautiful ");
        System.out.println("After insert: " + sb);

        // delete() - remove characters
        sb.delete(6, 16);  // Remove "Beautiful "
        System.out.println("After delete: " + sb);

        // deleteCharAt() - remove single character
        sb.deleteCharAt(sb.length() - 1);  // Remove last char
        System.out.println("After deleteCharAt: " + sb);

        // reverse() - reverse the string
        sb.reverse();
        System.out.println("\\nReversed: " + sb);
        sb.reverse();  // Reverse back

        // replace() - replace substring
        sb.replace(0, 5, "Hi");
        System.out.println("After replace: " + sb);

        // setCharAt() - change single character
        sb.setCharAt(0, 'h');
        System.out.println("After setCharAt: " + sb);

        // Convert to String
        String result = sb.toString();
        System.out.println("\\nFinal String: " + result);

        // Performance comparison
        System.out.println("\\n--- Performance Test ---");

        // Using String (slow)
        long start1 = System.nanoTime();
        String str = "";
        for (int i = 0; i < 10000; i++) {
            str += "a";  // Creates new String object each time
        }
        long end1 = System.nanoTime();

        // Using StringBuffer (fast)
        long start2 = System.nanoTime();
        StringBuffer sbPerf = new StringBuffer();
        for (int i = 0; i < 10000; i++) {
            sbPerf.append("a");  // Modifies same object
        }
        long end2 = System.nanoTime();

        System.out.println("String time: " + (end1 - start1) + " ns");
        System.out.println("StringBuffer time: " + (end2 - start2) + " ns");
        System.out.println("StringBuffer is faster!");
    }
}
\`\`\`

---

**8. STRING vs STRINGBUFFER vs STRINGBUILDER**

\`\`\`java
public class StringComparison {
    public static void main(String[] args) {
        // String - Immutable, thread-safe
        String str = "Hello";
        str = str + " World";  // Creates new object

        // StringBuffer - Mutable, thread-safe (synchronized)
        StringBuffer sbf = new StringBuffer("Hello");
        sbf.append(" World");  // Modifies same object

        // StringBuilder - Mutable, NOT thread-safe (faster)
        StringBuilder sbd = new StringBuilder("Hello");
        sbd.append(" World");  // Modifies same object

        System.out.println("String: " + str);
        System.out.println("StringBuffer: " + sbf);
        System.out.println("StringBuilder: " + sbd);
    }
}
\`\`\`

**Comparison Table:**

| Feature | String | StringBuffer | StringBuilder |
|---------|--------|--------------|---------------|
| Mutability | Immutable | Mutable | Mutable |
| Thread-Safe | Yes | Yes | No |
| Performance | Slow | Medium | Fast |
| Memory | More | Less | Less |
| Use Case | Few modifications | Multi-threaded | Single-threaded |

**When to Use:**
- **String:** When value doesn't change often
- **StringBuffer:** When value changes and thread-safety needed
- **StringBuilder:** When value changes and no thread-safety needed (most common)

---

**Complete Example Program:**

\`\`\`java
public class StringOperationsDemo {
    public static void main(String[] args) {
        System.out.println("=== STRING OPERATIONS DEMO ===\\n");

        // Creation
        String str = "  Java Programming  ";
        System.out.println("Original: '" + str + "'");

        // Trimming
        str = str.trim();
        System.out.println("Trimmed: '" + str + "'");

        // Length
        System.out.println("Length: " + str.length());

        // Case conversion
        System.out.println("Uppercase: " + str.toUpperCase());
        System.out.println("Lowercase: " + str.toLowerCase());

        // Character extraction
        System.out.println("\\nCharacter at index 5: " + str.charAt(5));
        System.out.println("Substring (5-16): " + str.substring(5, 16));

        // Search operations
        System.out.println("\\nIndex of 'a': " + str.indexOf('a'));
        System.out.println("Last index of 'a': " + str.lastIndexOf('a'));
        System.out.println("Contains 'Program': " + str.contains("Program"));

        // Replace
        String modified = str.replace('a', '@');
        System.out.println("\\nReplaced 'a' with '@': " + modified);

        // Split
        String sentence = "Java is awesome";
        String[] words = sentence.split(" ");
        System.out.println("\\nWords in sentence:");
        for (String word : words) {
            System.out.println("- " + word);
        }

        // StringBuffer demonstration
        System.out.println("\\n=== STRINGBUFFER DEMO ===");
        StringBuffer sb = new StringBuffer("Hello");
        sb.append(" World").insert(5, ",").reverse();
        System.out.println("StringBuffer result: " + sb);
    }
}
\`\`\``
    },
    {
      id: 8,
      title: 'Type Conversion and Type Casting',
      question: 'Define type conversion and type casting in Java.',
      dueDate: '15/09/2025',
      topics: ['Type Conversion', 'Type Casting', 'Data Types'],
      description: 'Understand the difference between implicit type conversion and explicit type casting, with examples of widening and narrowing conversions.',
      answer: `**Type Conversion and Type Casting in Java**

Type conversion and type casting are mechanisms to convert one data type to another in Java.

---

**1. TYPE CONVERSION (Implicit/Automatic/Widening)**

Type conversion happens automatically by the compiler when converting a smaller data type to a larger data type. No data loss occurs.

**Conversion Hierarchy (Widening):**
\`\`\`
byte → short → int → long → float → double
       char → int → long → float → double
\`\`\`

**Example Program:**

\`\`\`java
public class TypeConversionDemo {
    public static void main(String[] args) {
        System.out.println("=== TYPE CONVERSION (Widening) ===\\n");

        // byte to int
        byte byteVal = 100;
        int intVal = byteVal;  // Automatic conversion
        System.out.println("byte to int: " + byteVal + " → " + intVal);

        // int to long
        int num = 12345;
        long longNum = num;  // Automatic conversion
        System.out.println("int to long: " + num + " → " + longNum);

        // int to float
        int intNum = 100;
        float floatNum = intNum;  // Automatic conversion
        System.out.println("int to float: " + intNum + " → " + floatNum);

        // long to double
        long longValue = 999999999L;
        double doubleValue = longValue;  // Automatic conversion
        System.out.println("long to double: " + longValue + " → " + doubleValue);

        // char to int
        char ch = 'A';
        int ascii = ch;  // Automatic conversion (ASCII value)
        System.out.println("char to int: '" + ch + "' → " + ascii);

        // Multiple conversions in expression
        byte b = 50;
        int i = 100;
        long l = 500L;
        float f = 10.5f;

        // Result will be float (highest type in expression)
        float result = b + i + l + f;
        System.out.println("\\nMixed expression result: " + result);
        System.out.println("Result type: float");
    }
}
\`\`\`

**Output:**
\`\`\`
=== TYPE CONVERSION (Widening) ===

byte to int: 100 → 100
int to long: 12345 → 12345
int to float: 100 → 100.0
long to double: 999999999 → 9.99999999E8
char to int: 'A' → 65

Mixed expression result: 660.5
Result type: float
\`\`\`

**Characteristics of Type Conversion:**
- Automatic/Implicit
- No data loss
- Smaller to larger data type
- No casting operator needed
- Always safe

---

**2. TYPE CASTING (Explicit/Manual/Narrowing)**

Type casting must be done explicitly by the programmer when converting a larger data type to a smaller data type. May result in data loss.

**Syntax:**
\`\`\`java
targetType variable = (targetType) value;
\`\`\`

**Example Program:**

\`\`\`java
public class TypeCastingDemo {
    public static void main(String[] args) {
        System.out.println("=== TYPE CASTING (Narrowing) ===\\n");

        // double to int (decimal part lost)
        double doubleVal = 99.99;
        int intVal = (int) doubleVal;  // Explicit casting
        System.out.println("double to int: " + doubleVal + " → " + intVal);
        System.out.println("Data lost: " + (doubleVal - intVal) + "\\n");

        // long to int
        long longVal = 100000L;
        int intFromLong = (int) longVal;  // Explicit casting
        System.out.println("long to int: " + longVal + " → " + intFromLong);

        // float to int
        float floatVal = 45.75f;
        int intFromFloat = (int) floatVal;  // Explicit casting
        System.out.println("float to int: " + floatVal + " → " + intFromFloat);
        System.out.println("Decimal part lost: " + (floatVal - intFromFloat) + "\\n");

        // int to byte (may lose data if out of range)
        int largeInt = 300;
        byte byteVal = (byte) largeInt;  // Explicit casting
        System.out.println("int to byte: " + largeInt + " → " + byteVal);
        System.out.println("Note: Data loss due to range overflow!\\n");

        // int to char
        int asciiCode = 65;
        char character = (char) asciiCode;  // Explicit casting
        System.out.println("int to char: " + asciiCode + " → '" + character + "'");

        // Demonstrating data loss
        System.out.println("\\n=== DATA LOSS EXAMPLES ===");
        double pi = 3.14159;
        int intPi = (int) pi;
        System.out.println("Original double: " + pi);
        System.out.println("After casting to int: " + intPi);
        System.out.println("Information lost: " + (pi - intPi));
    }
}
\`\`\`

**Output:**
\`\`\`
=== TYPE CASTING (Narrowing) ===

double to int: 99.99 → 99
Data lost: 0.9900000000000091

long to int: 100000 → 100000
float to int: 45.75 → 45
Decimal part lost: 0.75

int to byte: 300 → 44
Note: Data loss due to range overflow!

int to char: 65 → 'A'

=== DATA LOSS EXAMPLES ===
Original double: 3.14159
After casting to int: 3
Information lost: 0.14159000000000027
\`\`\`

**Characteristics of Type Casting:**
- Explicit/Manual
- Potential data loss
- Larger to smaller data type
- Requires casting operator ()
- Programmer responsibility

---

**3. COMPLETE COMPARISON PROGRAM**

\`\`\`java
public class ConversionVsCasting {
    public static void main(String[] args) {
        System.out.println("=== COMPARISON: CONVERSION vs CASTING ===\\n");

        // TYPE CONVERSION (Widening - Automatic)
        System.out.println("--- Type Conversion (Automatic) ---");
        int smallNum = 100;
        double largeNum = smallNum;  // No casting needed
        System.out.println("int: " + smallNum + " → double: " + largeNum);
        System.out.println("✓ No data loss\\n");

        // TYPE CASTING (Narrowing - Manual)
        System.out.println("--- Type Casting (Manual) ---");
        double decimal = 100.99;
        int integer = (int) decimal;  // Casting required
        System.out.println("double: " + decimal + " → int: " + integer);
        System.out.println("⚠ Data loss: " + (decimal - integer) + "\\n");

        // Expression with mixed types
        System.out.println("--- Mixed Type Expression ---");
        int a = 10;
        float b = 20.5f;
        double c = 30.75;

        // Result is double (highest type)
        double result = a + b + c;
        System.out.println("int + float + double = " + result);
        System.out.println("Result type: double (automatic conversion)\\n");

        // Casting in expressions
        int x = 10;
        int y = 3;

        System.out.println("--- Division Examples ---");
        System.out.println("int / int: " + x + " / " + y + " = " + (x / y));
        System.out.println("(double) int / int: " + x + " / " + y + " = " + ((double)x / y));
    }
}
\`\`\`

**Output:**
\`\`\`
=== COMPARISON: CONVERSION vs CASTING ===

--- Type Conversion (Automatic) ---
int: 100 → double: 100.0
✓ No data loss

--- Type Casting (Manual) ---
double: 100.99 → int: 100
⚠ Data loss: 0.9900000000000091

--- Mixed Type Expression ---
int + float + double = 61.25
Result type: double (automatic conversion)

--- Division Examples ---
int / int: 10 / 3 = 3
(double) int / int: 10 / 3 = 3.3333333333333335
\`\`\`

---

**KEY DIFFERENCES:**

| Aspect | Type Conversion | Type Casting |
|--------|----------------|--------------|
| **Type** | Widening | Narrowing |
| **Mode** | Automatic/Implicit | Manual/Explicit |
| **Syntax** | No operator needed | Requires () operator |
| **Data Loss** | No | Possible |
| **Direction** | Smaller → Larger | Larger → Smaller |
| **Safety** | Always safe | Risky |
| **Example** | int → long | double → int |

**When to Use:**
- **Type Conversion:** Happens automatically when needed
- **Type Casting:** Use when you intentionally want to convert larger type to smaller type and are aware of potential data loss`
    },
    {
      id: 9,
      title: 'Wrapper Classes',
      question: 'What is a wrapper class in Java? Why do we need it?',
      dueDate: '15/09/2025',
      topics: ['Wrapper Classes', 'Autoboxing', 'Object-Oriented'],
      description: 'Learn about wrapper classes that convert primitive data types into objects, including autoboxing, unboxing, and their practical applications.',
      answer: `**Wrapper Classes in Java**

A wrapper class in Java is a class that encapsulates (wraps) a primitive data type and converts it into an object.

---

**PRIMITIVE vs WRAPPER CLASS MAPPING:**

| Primitive Type | Wrapper Class | Package |
|---------------|---------------|---------|
| byte | Byte | java.lang |
| short | Short | java.lang |
| int | Integer | java.lang |
| long | Long | java.lang |
| float | Float | java.lang |
| double | Double | java.lang |
| char | Character | java.lang |
| boolean | Boolean | java.lang |

---

**WHY DO WE NEED WRAPPER CLASSES?**

**1. Collections Framework**
- Collections (ArrayList, HashSet, etc.) only work with objects, not primitives

**2. Object Required**
- Some methods require objects as parameters

**3. Null Values**
- Primitives cannot be null, but wrapper objects can

**4. Utility Methods**
- Wrapper classes provide useful methods for conversions and operations

**5. Serialization**
- Objects can be serialized, primitives cannot

**6. Synchronization**
- Objects can be used in multithreading synchronization

---

**1. BASIC WRAPPER CLASS USAGE**

\`\`\`java
public class WrapperBasics {
    public static void main(String[] args) {
        System.out.println("=== WRAPPER CLASS BASICS ===\\n");

        // Creating wrapper objects (Old way - before Java 5)
        Integer intObj1 = new Integer(100);  // Deprecated
        Integer intObj2 = Integer.valueOf(200);  // Recommended

        // Modern way (Autoboxing - automatic conversion)
        Integer intObj3 = 300;  // Compiler automatically converts

        System.out.println("Integer objects: " + intObj1 + ", " + intObj2 + ", " + intObj3);

        // Different wrapper classes
        Byte byteObj = Byte.valueOf((byte)10);
        Short shortObj = Short.valueOf((short)100);
        Long longObj = Long.valueOf(1000L);
        Float floatObj = Float.valueOf(3.14f);
        Double doubleObj = Double.valueOf(99.99);
        Character charObj = Character.valueOf('A');
        Boolean boolObj = Boolean.valueOf(true);

        System.out.println("\\nAll Wrapper Objects:");
        System.out.println("Byte: " + byteObj);
        System.out.println("Short: " + shortObj);
        System.out.println("Long: " + longObj);
        System.out.println("Float: " + floatObj);
        System.out.println("Double: " + doubleObj);
        System.out.println("Character: " + charObj);
        System.out.println("Boolean: " + boolObj);
    }
}
\`\`\`

---

**2. AUTOBOXING AND UNBOXING**

**Autoboxing:** Automatic conversion from primitive to wrapper object
**Unboxing:** Automatic conversion from wrapper object to primitive

\`\`\`java
public class AutoboxingDemo {
    public static void main(String[] args) {
        System.out.println("=== AUTOBOXING & UNBOXING ===\\n");

        // AUTOBOXING (primitive → object)
        System.out.println("--- Autoboxing Examples ---");
        int primitive = 100;
        Integer object = primitive;  // Automatic boxing
        System.out.println("Primitive int: " + primitive);
        System.out.println("Wrapper Integer: " + object);

        // UNBOXING (object → primitive)
        System.out.println("\\n--- Unboxing Examples ---");
        Integer wrapperNum = 200;
        int primitiveNum = wrapperNum;  // Automatic unboxing
        System.out.println("Wrapper Integer: " + wrapperNum);
        System.out.println("Primitive int: " + primitiveNum);

        // Autoboxing in expressions
        System.out.println("\\n--- Autoboxing in Expressions ---");
        Integer a = 10;  // Autoboxing
        Integer b = 20;  // Autoboxing
        Integer sum = a + b;  // Unboxing, addition, then autoboxing
        System.out.println("Sum: " + sum);

        // Using in collections (requires objects)
        System.out.println("\\n--- Wrapper in Collections ---");
        java.util.ArrayList<Integer> numbers = new java.util.ArrayList<>();
        numbers.add(10);  // Autoboxing: int → Integer
        numbers.add(20);  // Autoboxing: int → Integer
        numbers.add(30);  // Autoboxing: int → Integer

        int first = numbers.get(0);  // Unboxing: Integer → int
        System.out.println("First element: " + first);
        System.out.println("All numbers: " + numbers);
    }
}
\`\`\`

---

**3. WRAPPER CLASS UTILITY METHODS**

\`\`\`java
public class WrapperUtilityMethods {
    public static void main(String[] args) {
        System.out.println("=== WRAPPER UTILITY METHODS ===\\n");

        // STRING TO PRIMITIVE CONVERSION
        System.out.println("--- String to Primitive ---");
        String numStr = "123";
        int num = Integer.parseInt(numStr);
        double decimal = Double.parseDouble("45.67");
        boolean flag = Boolean.parseBoolean("true");

        System.out.println("String '123' → int: " + num);
        System.out.println("String '45.67' → double: " + decimal);
        System.out.println("String 'true' → boolean: " + flag);

        // PRIMITIVE TO STRING CONVERSION
        System.out.println("\\n--- Primitive to String ---");
        int value = 456;
        String str1 = Integer.toString(value);
        String str2 = String.valueOf(value);

        System.out.println("int 456 → String: '" + str1 + "'");
        System.out.println("Using valueOf: '" + str2 + "'");

        // NUMBER SYSTEM CONVERSIONS
        System.out.println("\\n--- Number System Conversions ---");
        int decimal10 = 255;
        String binary = Integer.toBinaryString(decimal10);
        String octal = Integer.toOctalString(decimal10);
        String hex = Integer.toHexString(decimal10);

        System.out.println("Decimal: " + decimal10);
        System.out.println("Binary: " + binary);
        System.out.println("Octal: " + octal);
        System.out.println("Hexadecimal: " + hex);

        // PARSING FROM DIFFERENT BASES
        System.out.println("\\n--- Parsing from Different Bases ---");
        int fromBinary = Integer.parseInt("11111111", 2);
        int fromOctal = Integer.parseInt("377", 8);
        int fromHex = Integer.parseInt("FF", 16);

        System.out.println("Binary '11111111' → " + fromBinary);
        System.out.println("Octal '377' → " + fromOctal);
        System.out.println("Hex 'FF' → " + fromHex);

        // MIN & MAX VALUES
        System.out.println("\\n--- Min & Max Values ---");
        System.out.println("Byte: " + Byte.MIN_VALUE + " to " + Byte.MAX_VALUE);
        System.out.println("Integer: " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
        System.out.println("Long: " + Long.MIN_VALUE + " to " + Long.MAX_VALUE);

        // CHARACTER UTILITY METHODS
        System.out.println("\\n--- Character Utility Methods ---");
        char ch = 'A';
        System.out.println("Is digit: " + Character.isDigit(ch));
        System.out.println("Is letter: " + Character.isLetter(ch));
        System.out.println("Is uppercase: " + Character.isUpperCase(ch));
        System.out.println("To lowercase: " + Character.toLowerCase(ch));

        // COMPARISON METHODS
        System.out.println("\\n--- Comparison Methods ---");
        Integer x = 100;
        Integer y = 200;
        System.out.println("Compare 100 and 200: " + Integer.compare(x, y));
        System.out.println("100 equals 200: " + x.equals(y));

        // TYPE CHECKING
        System.out.println("\\n--- Type Checking ---");
        Object obj = 123;  // Autoboxing to Integer
        if (obj instanceof Integer) {
            System.out.println("obj is an Integer wrapper object");
            Integer intObj = (Integer) obj;
            System.out.println("Value: " + intObj);
        }
    }
}
\`\`\`

---

**4. PRACTICAL EXAMPLE: NULL VALUES**

\`\`\`java
public class WrapperNullExample {
    public static void main(String[] args) {
        System.out.println("=== NULL VALUES WITH WRAPPERS ===\\n");

        // Primitives cannot be null
        // int num = null;  // Compilation ERROR!

        // Wrappers can be null (useful for databases, optional values)
        Integer nullableNumber = null;
        Boolean nullableFlag = null;

        System.out.println("Integer object: " + nullableNumber);
        System.out.println("Boolean object: " + nullableFlag);

        // Checking for null before using
        if (nullableNumber == null) {
            System.out.println("\\nNumber is null, using default value");
            nullableNumber = 0;
        }

        System.out.println("After null check: " + nullableNumber);

        // Real-world use case: Database retrieval
        Integer studentAge = getStudentAge(123);  // May return null
        if (studentAge != null) {
            System.out.println("\\nStudent age: " + studentAge);
        } else {
            System.out.println("\\nStudent age not found in database");
        }
    }

    // Simulating database retrieval that may return null
    static Integer getStudentAge(int studentId) {
        // Simulate: student not found
        return null;  // Wrapper allows returning null
    }
}
\`\`\`

---

**5. PERFORMANCE COMPARISON**

\`\`\`java
public class WrapperPerformance {
    public static void main(String[] args) {
        System.out.println("=== PERFORMANCE: PRIMITIVE vs WRAPPER ===\\n");

        // Primitive - Fast
        long startTime = System.nanoTime();
        int primitiveSum = 0;
        for (int i = 0; i < 1000000; i++) {
            primitiveSum += i;
        }
        long primitiveTime = System.nanoTime() - startTime;

        // Wrapper - Slower (autoboxing/unboxing overhead)
        startTime = System.nanoTime();
        Integer wrapperSum = 0;
        for (int i = 0; i < 1000000; i++) {
            wrapperSum += i;  // Autoboxing/unboxing in each iteration
        }
        long wrapperTime = System.nanoTime() - startTime;

        System.out.println("Primitive time: " + primitiveTime + " ns");
        System.out.println("Wrapper time: " + wrapperTime + " ns");
        System.out.println("Wrapper is " + (wrapperTime / primitiveTime) + "x slower");
        System.out.println("\\n✓ Use primitives for performance-critical code");
        System.out.println("✓ Use wrappers when objects are required");
    }
}
\`\`\`

---

**ADVANTAGES OF WRAPPER CLASSES:**

1. ✓ Allows primitives to be used in collections
2. ✓ Provides utility methods for conversions
3. ✓ Supports null values
4. ✓ Enables generic programming
5. ✓ Required for reflection and serialization
6. ✓ Used in multithreading synchronization

**DISADVANTAGES:**

1. ✗ Slower performance than primitives
2. ✗ Consumes more memory
3. ✗ NullPointerException risk during unboxing

**WHEN TO USE:**

- **Use Primitives:** Performance-critical code, simple calculations
- **Use Wrappers:** Collections, generics, null values needed, utility methods required`
    },
    {
      id: 10,
      title: 'Garbage Collection',
      question: 'Explain the concept of garbage collection in Java.',
      dueDate: '15/09/2025',
      topics: ['Memory Management', 'Garbage Collection', 'JVM'],
      description: 'Understand how Java automatically manages memory through garbage collection, including how it works, methods to request GC, and best practices.',
      answer: `**Garbage Collection in Java**

Garbage Collection (GC) is an automatic memory management process in Java where the JVM automatically identifies and deletes objects that are no longer in use, freeing up memory.

---

**WHY GARBAGE COLLECTION?**

**Without GC (languages like C/C++):**
- Programmer manually allocates and deallocates memory
- Risk of memory leaks (forgot to free memory)
- Risk of dangling pointers (using freed memory)
- More complex code

**With GC (Java):**
- Automatic memory management
- No memory leaks
- No dangling pointers
- Simpler code
- Focus on business logic

---

**HOW GARBAGE COLLECTION WORKS**

**1. Object Creation:**
- Objects are created in the **Heap memory**
- Heap is divided into: Young Generation, Old Generation, Permanent Generation (Java 7) / Metaspace (Java 8+)

**2. Object Lifecycle:**

\`\`\`
┌──────────────────────────────────────┐
│         HEAP MEMORY                  │
├──────────────────────────────────────┤
│  Young Generation                    │
│  ├─ Eden Space (new objects)         │
│  ├─ Survivor Space 0 (S0)            │
│  └─ Survivor Space 1 (S1)            │
├──────────────────────────────────────┤
│  Old Generation (Tenured)            │
│  (long-lived objects)                │
└──────────────────────────────────────┘
\`\`\`

**3. GC Process:**

**Step 1:** New objects are created in Eden Space
**Step 2:** When Eden is full, Minor GC runs
**Step 3:** Live objects move to Survivor Space (S0/S1)
**Step 4:** Objects surviving multiple GCs move to Old Generation
**Step 5:** When Old Generation is full, Major GC (Full GC) runs

---

**WHEN IS AN OBJECT ELIGIBLE FOR GARBAGE COLLECTION?**

An object is eligible for GC when it is **no longer reachable** from any live thread.

**Ways an Object Becomes Unreachable:**

**1. Nullifying Reference:**
\`\`\`java
Student s = new Student();
s = null;  // Object is now eligible for GC
\`\`\`

**2. Reassigning Reference:**
\`\`\`java
Student s1 = new Student("Alice");
s1 = new Student("Bob");  // "Alice" object is now eligible
\`\`\`

**3. Object Created Inside Method:**
\`\`\`java
void createStudent() {
    Student s = new Student();
}  // 's' goes out of scope, object is eligible
\`\`\`

**4. Island of Isolation:**
\`\`\`java
class Node {
    Node next;
}

Node n1 = new Node();
Node n2 = new Node();
n1.next = n2;
n2.next = n1;

n1 = null;
n2 = null;  // Both objects are eligible (circular reference)
\`\`\`

---

**DEMONSTRATION PROGRAMS**

**1. BASIC GARBAGE COLLECTION DEMO**

\`\`\`java
public class GarbageCollectionDemo {
    static int objectCount = 0;
    int id;

    // Constructor
    public GarbageCollectionDemo() {
        objectCount++;
        id = objectCount;
        System.out.println("Object " + id + " created");
    }

    // finalize() method - called by GC before destroying object
    @Override
    protected void finalize() throws Throwable {
        System.out.println("Object " + id + " is garbage collected");
        objectCount--;
    }

    public static void main(String[] args) {
        System.out.println("=== GARBAGE COLLECTION DEMO ===\\n");

        // Creating objects
        GarbageCollectionDemo obj1 = new GarbageCollectionDemo();
        GarbageCollectionDemo obj2 = new GarbageCollectionDemo();
        GarbageCollectionDemo obj3 = new GarbageCollectionDemo();

        System.out.println("\\nTotal objects: " + objectCount);

        // Making objects eligible for GC
        System.out.println("\\n--- Making objects eligible for GC ---");
        obj1 = null;  // Object 1 eligible
        obj2 = null;  // Object 2 eligible

        System.out.println("Requesting garbage collection...");
        System.gc();  // Request GC (not guaranteed to run immediately)

        try {
            Thread.sleep(1000);  // Give time for GC to run
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\\nRemaining objects: " + objectCount);
        System.out.println("obj3 still alive: " + (obj3 != null));
    }
}
\`\`\`

**Output:**
\`\`\`
=== GARBAGE COLLECTION DEMO ===

Object 1 created
Object 2 created
Object 3 created

Total objects: 3

--- Making objects eligible for GC ---
Requesting garbage collection...
Object 1 is garbage collected
Object 2 is garbage collected

Remaining objects: 1
obj3 still alive: true
\`\`\`

---

**2. WAYS TO MAKE OBJECTS ELIGIBLE FOR GC**

\`\`\`java
class Student {
    String name;

    Student(String name) {
        this.name = name;
        System.out.println("Student " + name + " created");
    }

    @Override
    protected void finalize() {
        System.out.println("Student " + name + " is garbage collected");
    }
}

public class GCEligibilityDemo {
    public static void main(String[] args) {
        System.out.println("=== WAYS TO MAKE OBJECTS ELIGIBLE FOR GC ===\\n");

        // Method 1: Nullifying reference
        System.out.println("Method 1: Nullifying Reference");
        Student s1 = new Student("Alice");
        s1 = null;  // Eligible for GC

        // Method 2: Reassigning reference
        System.out.println("\\nMethod 2: Reassigning Reference");
        Student s2 = new Student("Bob");
        s2 = new Student("Charlie");  // Bob is eligible

        // Method 3: Object created in method
        System.out.println("\\nMethod 3: Object in Method");
        createStudent();  // Object will be eligible when method ends

        // Method 4: Island of Isolation
        System.out.println("\\nMethod 4: Island of Isolation");
        Student s3 = new Student("David");
        Student s4 = new Student("Eve");
        s3 = s4;  // David is eligible
        s3 = null;
        s4 = null;  // Eve is eligible

        System.out.println("\\nRequesting garbage collection...");
        System.gc();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\\nProgram ending...");
    }

    static void createStudent() {
        Student temp = new Student("Temporary");
        // 'temp' goes out of scope when method ends
    }
}
\`\`\`

---

**3. REQUESTING GARBAGE COLLECTION**

\`\`\`java
public class RequestGCDemo {
    @Override
    protected void finalize() {
        System.out.println("finalize() method called");
    }

    public static void main(String[] args) {
        System.out.println("=== REQUESTING GARBAGE COLLECTION ===\\n");

        // Creating objects and making them eligible
        RequestGCDemo obj1 = new RequestGCDemo();
        RequestGCDemo obj2 = new RequestGCDemo();

        obj1 = null;
        obj2 = null;

        // Method 1: Using System.gc()
        System.out.println("Method 1: System.gc()");
        System.gc();

        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {}

        // Method 2: Using Runtime.getRuntime().gc()
        RequestGCDemo obj3 = new RequestGCDemo();
        obj3 = null;

        System.out.println("\\nMethod 2: Runtime.getRuntime().gc()");
        Runtime.getRuntime().gc();

        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {}

        System.out.println("\\nNote: GC request is just a suggestion, not guaranteed!");
    }
}
\`\`\`

---

**4. MEMORY USAGE MONITORING**

\`\`\`java
public class MemoryMonitorDemo {
    public static void main(String[] args) {
        System.out.println("=== MEMORY USAGE MONITORING ===\\n");

        Runtime runtime = Runtime.getRuntime();

        System.out.println("--- Initial Memory Status ---");
        printMemoryStats(runtime);

        // Creating many objects
        System.out.println("\\n--- Creating 100000 objects ---");
        Integer[] arr = new Integer[100000];
        for (int i = 0; i < 100000; i++) {
            arr[i] = new Integer(i);
        }
        printMemoryStats(runtime);

        // Making objects eligible for GC
        System.out.println("\\n--- Making objects eligible for GC ---");
        arr = null;
        System.gc();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {}

        System.out.println("\\n--- After Garbage Collection ---");
        printMemoryStats(runtime);
    }

    static void printMemoryStats(Runtime runtime) {
        long total = runtime.totalMemory();
        long free = runtime.freeMemory();
        long used = total - free;
        long max = runtime.maxMemory();

        System.out.println("Total Memory: " + (total / 1024) + " KB");
        System.out.println("Free Memory: " + (free / 1024) + " KB");
        System.out.println("Used Memory: " + (used / 1024) + " KB");
        System.out.println("Max Memory: " + (max / 1024) + " KB");
    }
}
\`\`\`

---

**TYPES OF GARBAGE COLLECTORS**

1. **Serial GC** - Single thread, simple applications
2. **Parallel GC** - Multiple threads, better throughput
3. **CMS (Concurrent Mark Sweep)** - Low pause times
4. **G1 GC (Garbage First)** - Large heaps, predictable pauses
5. **ZGC / Shenandoah** - Ultra-low latency (modern JVMs)

---

**IMPORTANT METHODS**

| Method | Description |
|--------|-------------|
| \`System.gc()\` | Request garbage collection |
| \`Runtime.getRuntime().gc()\` | Alternative way to request GC |
| \`finalize()\` | Called before object destruction (deprecated in Java 9+) |
| \`Runtime.getRuntime().totalMemory()\` | Total memory in JVM |
| \`Runtime.getRuntime().freeMemory()\` | Free memory available |
| \`Runtime.getRuntime().maxMemory()\` | Maximum memory JVM can use |

---

**KEY POINTS:**

✓ Automatic memory management
✓ Prevents memory leaks
✓ Runs in background by JVM
✓ Cannot be forced (only requested)
✓ finalize() called before destruction (unreliable)
✓ Improves programmer productivity
✓ Some performance overhead

**BEST PRACTICES:**

1. Don't rely on \`finalize()\` (use try-with-resources instead)
2. Don't call \`System.gc()\` unless absolutely necessary
3. Let JVM manage memory automatically
4. Nullify large object references when done
5. Use proper object scoping`
    },
    {
      id: 11,
      title: 'Decision Making Statements',
      question: 'Explain Decision Making statement in Java.',
      dueDate: '15/09/2025',
      topics: ['Control Flow', 'Decision Making', 'Conditionals'],
      description: 'Learn about if, if-else, if-else-if ladder, nested if, and switch-case statements with detailed examples and use cases.',
      answer: `**Decision Making Statements in Java**

Decision making statements allow the program to make decisions and execute different code blocks based on conditions. They control the flow of program execution.

---

**TYPES OF DECISION MAKING STATEMENTS:**

1. if statement
2. if-else statement
3. if-else-if ladder
4. nested if statement
5. switch-case statement

---

**1. IF STATEMENT**

Executes a block of code only if the condition is true.

**Syntax:**
\`\`\`java
if (condition) {
    // code to execute if condition is true
}
\`\`\`

**Flowchart:**
\`\`\`
   ┌─────────┐
   │  Start  │
   └────┬────┘
        │
   ┌────▼────┐
   │Condition│
   │  true?  │
   └─┬────┬──┘
     │Yes │No
     │    │
  ┌──▼──┐ │
  │Code │ │
  └──┬──┘ │
     │    │
   ┌─▼────▼─┐
   │  End   │
   └────────┘
\`\`\`

**Example:**

\`\`\`java
public class IfStatementDemo {
    public static void main(String[] args) {
        System.out.println("=== IF STATEMENT ===\\n");

        int age = 20;

        // Simple if
        if (age >= 18) {
            System.out.println("You are eligible to vote");
        }

        // Multiple conditions with logical operators
        int marks = 85;
        if (marks >= 75 && marks <= 100) {
            System.out.println("Grade: Distinction");
        }

        // Checking even number
        int num = 10;
        if (num % 2 == 0) {
            System.out.println(num + " is an even number");
        }
    }
}
\`\`\`

**Output:**
\`\`\`
=== IF STATEMENT ===

You are eligible to vote
Grade: Distinction
10 is an even number
\`\`\`

---

**2. IF-ELSE STATEMENT**

Executes one block if condition is true, another block if false.

**Syntax:**
\`\`\`java
if (condition) {
    // code if condition is true
} else {
    // code if condition is false
}
\`\`\`

**Example:**

\`\`\`java
public class IfElseDemo {
    public static void main(String[] args) {
        System.out.println("=== IF-ELSE STATEMENT ===\\n");

        // Example 1: Even or Odd
        int number = 15;
        if (number % 2 == 0) {
            System.out.println(number + " is Even");
        } else {
            System.out.println(number + " is Odd");
        }

        // Example 2: Pass or Fail
        int marks = 65;
        if (marks >= 40) {
            System.out.println("\\nResult: PASS");
        } else {
            System.out.println("\\nResult: FAIL");
        }

        // Example 3: Positive or Negative
        int value = -5;
        if (value >= 0) {
            System.out.println("\\n" + value + " is Positive");
        } else {
            System.out.println("\\n" + value + " is Negative");
        }

        // Example 4: Eligible to vote
        int age = 16;
        if (age >= 18) {
            System.out.println("\\nYou can vote");
        } else {
            System.out.println("\\nYou cannot vote. Wait for " + (18 - age) + " years");
        }
    }
}
\`\`\`

**Output:**
\`\`\`
=== IF-ELSE STATEMENT ===

15 is Odd

Result: PASS

-5 is Negative

You cannot vote. Wait for 2 years
\`\`\`

---

**3. IF-ELSE-IF LADDER**

Used for testing multiple conditions sequentially.

**Syntax:**
\`\`\`java
if (condition1) {
    // code for condition1
} else if (condition2) {
    // code for condition2
} else if (condition3) {
    // code for condition3
} else {
    // code if all conditions are false
}
\`\`\`

**Example:**

\`\`\`java
public class IfElseIfLadder {
    public static void main(String[] args) {
        System.out.println("=== IF-ELSE-IF LADDER ===\\n");

        // Example 1: Grade System
        int marks = 78;
        System.out.println("Marks: " + marks);

        if (marks >= 90) {
            System.out.println("Grade: A+ (Outstanding)");
        } else if (marks >= 80) {
            System.out.println("Grade: A (Excellent)");
        } else if (marks >= 70) {
            System.out.println("Grade: B+ (Very Good)");
        } else if (marks >= 60) {
            System.out.println("Grade: B (Good)");
        } else if (marks >= 50) {
            System.out.println("Grade: C (Average)");
        } else if (marks >= 40) {
            System.out.println("Grade: D (Pass)");
        } else {
            System.out.println("Grade: F (Fail)");
        }

        // Example 2: Day of Week
        System.out.println("\\n--- Day of Week ---");
        int day = 3;

        if (day == 1) {
            System.out.println("Monday");
        } else if (day == 2) {
            System.out.println("Tuesday");
        } else if (day == 3) {
            System.out.println("Wednesday");
        } else if (day == 4) {
            System.out.println("Thursday");
        } else if (day == 5) {
            System.out.println("Friday");
        } else if (day == 6) {
            System.out.println("Saturday");
        } else if (day == 7) {
            System.out.println("Sunday");
        } else {
            System.out.println("Invalid day");
        }

        // Example 3: Income Tax Calculator
        System.out.println("\\n--- Income Tax Calculation ---");
        double income = 750000;
        double tax;

        if (income <= 250000) {
            tax = 0;
        } else if (income <= 500000) {
            tax = (income - 250000) * 0.05;
        } else if (income <= 1000000) {
            tax = 12500 + (income - 500000) * 0.20;
        } else {
            tax = 112500 + (income - 1000000) * 0.30;
        }

        System.out.println("Income: ₹" + income);
        System.out.println("Tax: ₹" + tax);
    }
}
\`\`\`

**Output:**
\`\`\`
=== IF-ELSE-IF LADDER ===

Marks: 78
Grade: B+ (Very Good)

--- Day of Week ---
Wednesday

--- Income Tax Calculation ---
Income: ₹750000.0
Tax: ₹62500.0
\`\`\`

---

**4. NESTED IF STATEMENT**

An if statement inside another if statement.

**Syntax:**
\`\`\`java
if (condition1) {
    if (condition2) {
        // code if both conditions are true
    }
}
\`\`\`

**Example:**

\`\`\`java
public class NestedIfDemo {
    public static void main(String[] args) {
        System.out.println("=== NESTED IF STATEMENT ===\\n");

        // Example 1: Voting and License Eligibility
        int age = 20;
        boolean hasID = true;

        System.out.println("Age: " + age);
        System.out.println("Has ID: " + hasID);

        if (age >= 18) {
            System.out.println("Age requirement met");

            if (hasID) {
                System.out.println("✓ You can vote!");
            } else {
                System.out.println("✗ You need an ID card to vote");
            }
        } else {
            System.out.println("✗ You are too young to vote");
        }

        // Example 2: Largest of Three Numbers
        System.out.println("\\n--- Finding Largest Number ---");
        int a = 45, b = 67, c = 23;

        System.out.println("Numbers: " + a + ", " + b + ", " + c);

        if (a >= b) {
            if (a >= c) {
                System.out.println("Largest: " + a);
            } else {
                System.out.println("Largest: " + c);
            }
        } else {
            if (b >= c) {
                System.out.println("Largest: " + b);
            } else {
                System.out.println("Largest: " + c);
            }
        }

        // Example 3: Login System
        System.out.println("\\n--- Login System ---");
        String username = "admin";
        String password = "pass123";
        boolean isActive = true;

        if (username.equals("admin")) {
            if (password.equals("pass123")) {
                if (isActive) {
                    System.out.println("✓ Login Successful!");
                } else {
                    System.out.println("✗ Account is inactive");
                }
            } else {
                System.out.println("✗ Incorrect password");
            }
        } else {
            System.out.println("✗ User not found");
        }
    }
}
\`\`\`

---

**5. SWITCH-CASE STATEMENT**

Used to select one of many code blocks to execute. More readable than multiple if-else-if.

**Syntax:**
\`\`\`java
switch (expression) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    default:
        // code if no case matches
}
\`\`\`

**Example:**

\`\`\`java
public class SwitchCaseDemo {
    public static void main(String[] args) {
        System.out.println("=== SWITCH-CASE STATEMENT ===\\n");

        // Example 1: Day of Week
        int day = 4;
        String dayName;

        switch (day) {
            case 1:
                dayName = "Monday";
                break;
            case 2:
                dayName = "Tuesday";
                break;
            case 3:
                dayName = "Wednesday";
                break;
            case 4:
                dayName = "Thursday";
                break;
            case 5:
                dayName = "Friday";
                break;
            case 6:
                dayName = "Saturday";
                break;
            case 7:
                dayName = "Sunday";
                break;
            default:
                dayName = "Invalid day";
        }

        System.out.println("Day " + day + " is: " + dayName);

        // Example 2: Calculator
        System.out.println("\\n--- Simple Calculator ---");
        int num1 = 20, num2 = 10;
        char operator = '+';
        int result;

        switch (operator) {
            case '+':
                result = num1 + num2;
                System.out.println(num1 + " + " + num2 + " = " + result);
                break;
            case '-':
                result = num1 - num2;
                System.out.println(num1 + " - " + num2 + " = " + result);
                break;
            case '*':
                result = num1 * num2;
                System.out.println(num1 + " * " + num2 + " = " + result);
                break;
            case '/':
                result = num1 / num2;
                System.out.println(num1 + " / " + num2 + " = " + result);
                break;
            default:
                System.out.println("Invalid operator");
        }

        // Example 3: Month Days
        System.out.println("\\n--- Days in Month ---");
        int month = 2;
        int year = 2024;
        int days;

        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                days = 31;
                break;
            case 4: case 6: case 9: case 11:
                days = 30;
                break;
            case 2:
                // Check leap year
                if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
                    days = 29;
                } else {
                    days = 28;
                }
                break;
            default:
                days = 0;
        }

        System.out.println("Month " + month + " of year " + year + " has " + days + " days");

        // Example 4: Vowel or Consonant
        System.out.println("\\n--- Vowel or Consonant ---");
        char ch = 'E';

        switch (Character.toLowerCase(ch)) {
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
                System.out.println(ch + " is a vowel");
                break;
            default:
                if (Character.isLetter(ch)) {
                    System.out.println(ch + " is a consonant");
                } else {
                    System.out.println(ch + " is not a letter");
                }
        }
    }
}
\`\`\`

---

**TERNARY OPERATOR (Shorthand if-else)**

\`\`\`java
public class TernaryOperatorDemo {
    public static void main(String[] args) {
        System.out.println("=== TERNARY OPERATOR ===\\n");

        // Syntax: condition ? value_if_true : value_if_false

        int age = 20;
        String result = (age >= 18) ? "Adult" : "Minor";
        System.out.println("Age " + age + ": " + result);

        // Finding maximum
        int a = 45, b = 67;
        int max = (a > b) ? a : b;
        System.out.println("\\nMax of " + a + " and " + b + ": " + max);

        // Even or Odd
        int num = 15;
        String evenOdd = (num % 2 == 0) ? "Even" : "Odd";
        System.out.println("\\n" + num + " is " + evenOdd);

        // Nested ternary
        int marks = 85;
        String grade = (marks >= 90) ? "A" : (marks >= 80) ? "B" : (marks >= 70) ? "C" : "D";
        System.out.println("\\nMarks: " + marks + ", Grade: " + grade);
    }
}
\`\`\`

---

**COMPARISON TABLE:**

| Statement | Use Case | Readability | Performance |
|-----------|----------|-------------|-------------|
| if | Single condition | High | Fast |
| if-else | Two alternatives | High | Fast |
| if-else-if | Multiple conditions | Medium | Fast |
| Nested if | Complex conditions | Low | Fast |
| switch-case | Multiple fixed values | High | Very Fast |
| Ternary | Simple if-else | Medium | Fast |

---

**KEY POINTS:**

✓ Use **if** for single condition
✓ Use **if-else** for two alternatives
✓ Use **if-else-if** for multiple ranges
✓ Use **switch** for multiple fixed values
✓ Use **ternary** for simple if-else assignments
✓ Avoid deep nesting (hard to read)
✓ Always use **break** in switch cases

**BEST PRACTICES:**

1. Use meaningful condition expressions
2. Keep conditions simple and readable
3. Avoid excessive nesting
4. Use switch for multiple equality checks
5. Always include default case in switch
6. Use braces {} even for single statements`
    },
    {
      id: 12,
      title: 'Arrays in Java',
      question: 'Explain the types of arrays in Java: single-dimensional and multi-dimensional.',
      dueDate: '15/09/2025',
      topics: ['Arrays', 'Data Structures', 'Single-dimensional', 'Multi-dimensional'],
      description: 'Comprehensive coverage of single-dimensional and multi-dimensional arrays including declaration, initialization, traversal, and practical operations.',
      answer: `**Arrays in Java**

An array is a collection of similar type of elements stored in contiguous memory locations. It is a fixed-size data structure.

---

**ARRAY CHARACTERISTICS:**

✓ Fixed size (cannot grow or shrink)
✓ Stores elements of same type
✓ Contiguous memory allocation
✓ Index-based (starts from 0)
✓ Can be single-dimensional or multi-dimensional

---

**1. SINGLE-DIMENSIONAL ARRAY**

A single-dimensional array is a linear list of elements.

**Syntax:**
\`\`\`java
// Declaration
dataType[] arrayName;
dataType arrayName[];

// Initialization
arrayName = new dataType[size];

// Combined
dataType[] arrayName = new dataType[size];
\`\`\`

**Memory Representation:**
\`\`\`
Index:  0    1    2    3    4
       ┌────┬────┬────┬────┬────┐
Array: │ 10 │ 20 │ 30 │ 40 │ 50 │
       └────┴────┴────┴────┴────┘
\`\`\`

**Example Programs:**

**1.1 BASIC ARRAY OPERATIONS**

\`\`\`java
public class SingleDimensionalArray {
    public static void main(String[] args) {
        System.out.println("=== SINGLE-DIMENSIONAL ARRAY ===\\n");

        // Method 1: Declaration and initialization
        int[] numbers = new int[5];
        numbers[0] = 10;
        numbers[1] = 20;
        numbers[2] = 30;
        numbers[3] = 40;
        numbers[4] = 50;

        System.out.println("--- Array Elements ---");
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("numbers[" + i + "] = " + numbers[i]);
        }

        // Method 2: Declaration with initialization
        System.out.println("\\n--- Array with Direct Initialization ---");
        String[] days = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday"};

        for (int i = 0; i < days.length; i++) {
            System.out.println("Day " + (i+1) + ": " + days[i]);
        }

        // Method 3: Using for-each loop
        System.out.println("\\n--- Using Enhanced For Loop ---");
        double[] prices = {99.99, 149.50, 79.99, 199.99};

        for (double price : prices) {
            System.out.println("Price: ₹" + price);
        }

        // Array length
        System.out.println("\\nTotal items: " + prices.length);
    }
}
\`\`\`

**Output:**
\`\`\`
=== SINGLE-DIMENSIONAL ARRAY ===

--- Array Elements ---
numbers[0] = 10
numbers[1] = 20
numbers[2] = 30
numbers[3] = 40
numbers[4] = 50

--- Array with Direct Initialization ---
Day 1: Monday
Day 2: Tuesday
Day 3: Wednesday
Day 4: Thursday
Day 5: Friday

--- Using Enhanced For Loop ---
Price: ₹99.99
Price: ₹149.5
Price: ₹79.99
Price: ₹199.99

Total items: 4
\`\`\`

---

**1.2 ARRAY OPERATIONS**

\`\`\`java
public class ArrayOperations {
    public static void main(String[] args) {
        int[] numbers = {45, 23, 67, 12, 89, 34, 56};

        System.out.println("=== ARRAY OPERATIONS ===\\n");

        // 1. Finding Sum
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("Sum: " + sum);

        // 2. Finding Average
        double average = (double) sum / numbers.length;
        System.out.println("Average: " + average);

        // 3. Finding Maximum
        int max = numbers[0];
        for (int num : numbers) {
            if (num > max) {
                max = num;
            }
        }
        System.out.println("Maximum: " + max);

        // 4. Finding Minimum
        int min = numbers[0];
        for (int num : numbers) {
            if (num < min) {
                min = num;
            }
        }
        System.out.println("Minimum: " + min);

        // 5. Searching for an element
        int searchElement = 67;
        boolean found = false;
        int position = -1;

        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] == searchElement) {
                found = true;
                position = i;
                break;
            }
        }

        if (found) {
            System.out.println("\\n" + searchElement + " found at index " + position);
        } else {
            System.out.println("\\n" + searchElement + " not found");
        }

        // 6. Reversing array
        System.out.println("\\n--- Original Array ---");
        printArray(numbers);

        System.out.println("\\n--- Reversed Array ---");
        reverseArray(numbers);
        printArray(numbers);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    static void reverseArray(int[] arr) {
        int left = 0, right = arr.length - 1;

        while (left < right) {
            // Swap elements
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;

            left++;
            right--;
        }
    }
}
\`\`\`

---

**2. MULTI-DIMENSIONAL ARRAY**

A multi-dimensional array is an array of arrays. Most commonly used is 2D array (matrix).

**2D Array Syntax:**
\`\`\`java
// Declaration
dataType[][] arrayName;

// Initialization
arrayName = new dataType[rows][columns];

// Combined
dataType[][] arrayName = new dataType[rows][columns];
\`\`\`

**Memory Representation (2D Array):**
\`\`\`
       Col0  Col1  Col2
     ┌─────┬─────┬─────┐
Row0 │  1  │  2  │  3  │
     ├─────┼─────┼─────┤
Row1 │  4  │  5  │  6  │
     ├─────┼─────┼─────┤
Row2 │  7  │  8  │  9  │
     └─────┴─────┴─────┘
\`\`\`

**2.1 TWO-DIMENSIONAL ARRAY**

\`\`\`java
public class TwoDimensionalArray {
    public static void main(String[] args) {
        System.out.println("=== TWO-DIMENSIONAL ARRAY ===\\n");

        // Method 1: Declaration and initialization
        int[][] matrix = new int[3][3];

        // Filling matrix
        int value = 1;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                matrix[i][j] = value++;
            }
        }

        // Displaying matrix
        System.out.println("--- 3x3 Matrix ---");
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }

        // Method 2: Direct initialization
        System.out.println("\\n--- Multiplication Table (2D Array) ---");
        int[][] table = {
            {1, 2, 3, 4, 5},
            {2, 4, 6, 8, 10},
            {3, 6, 9, 12, 15},
            {4, 8, 12, 16, 20}
        };

        for (int i = 0; i < table.length; i++) {
            for (int j = 0; j < table[i].length; j++) {
                System.out.printf("%4d", table[i][j]);
            }
            System.out.println();
        }

        // Jagged Array (different column sizes)
        System.out.println("\\n--- Jagged Array ---");
        int[][] jagged = {
            {1},
            {2, 3},
            {4, 5, 6},
            {7, 8, 9, 10}
        };

        for (int i = 0; i < jagged.length; i++) {
            System.out.print("Row " + i + ": ");
            for (int j = 0; j < jagged[i].length; j++) {
                System.out.print(jagged[i][j] + " ");
            }
            System.out.println();
        }
    }
}
\`\`\`

---

**2.2 MATRIX OPERATIONS**

\`\`\`java
public class MatrixOperations {
    public static void main(String[] args) {
        System.out.println("=== MATRIX OPERATIONS ===\\n");

        int[][] matrix1 = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        int[][] matrix2 = {
            {9, 8, 7},
            {6, 5, 4},
            {3, 2, 1}
        };

        System.out.println("Matrix 1:");
        printMatrix(matrix1);

        System.out.println("\\nMatrix 2:");
        printMatrix(matrix2);

        // Matrix Addition
        System.out.println("\\n--- Matrix Addition ---");
        int[][] sum = addMatrices(matrix1, matrix2);
        printMatrix(sum);

        // Matrix Subtraction
        System.out.println("\\n--- Matrix Subtraction ---");
        int[][] diff = subtractMatrices(matrix1, matrix2);
        printMatrix(diff);

        // Matrix Transpose
        System.out.println("\\n--- Matrix Transpose ---");
        int[][] transpose = transposeMatrix(matrix1);
        printMatrix(transpose);

        // Row and Column Sum
        System.out.println("\\n--- Row Sums ---");
        rowSum(matrix1);

        System.out.println("\\n--- Column Sums ---");
        columnSum(matrix1);
    }

    static void printMatrix(int[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.printf("%4d", matrix[i][j]);
            }
            System.out.println();
        }
    }

    static int[][] addMatrices(int[][] a, int[][] b) {
        int rows = a.length;
        int cols = a[0].length;
        int[][] result = new int[rows][cols];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i][j] = a[i][j] + b[i][j];
            }
        }
        return result;
    }

    static int[][] subtractMatrices(int[][] a, int[][] b) {
        int rows = a.length;
        int cols = a[0].length;
        int[][] result = new int[rows][cols];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i][j] = a[i][j] - b[i][j];
            }
        }
        return result;
    }

    static int[][] transposeMatrix(int[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;
        int[][] transpose = new int[cols][rows];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                transpose[j][i] = matrix[i][j];
            }
        }
        return transpose;
    }

    static void rowSum(int[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            int sum = 0;
            for (int j = 0; j < matrix[i].length; j++) {
                sum += matrix[i][j];
            }
            System.out.println("Row " + i + " sum: " + sum);
        }
    }

    static void columnSum(int[][] matrix) {
        int cols = matrix[0].length;
        for (int j = 0; j < cols; j++) {
            int sum = 0;
            for (int i = 0; i < matrix.length; i++) {
                sum += matrix[i][j];
            }
            System.out.println("Column " + j + " sum: " + sum);
        }
    }
}
\`\`\`

---

**2.3 THREE-DIMENSIONAL ARRAY**

\`\`\`java
public class ThreeDimensionalArray {
    public static void main(String[] args) {
        System.out.println("=== THREE-DIMENSIONAL ARRAY ===\\n");

        // 3D array: 2 blocks, 3 rows, 4 columns
        int[][][] array3D = new int[2][3][4];

        // Filling 3D array
        int value = 1;
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 3; j++) {
                for (int k = 0; k < 4; k++) {
                    array3D[i][j][k] = value++;
                }
            }
        }

        // Displaying 3D array
        for (int i = 0; i < 2; i++) {
            System.out.println("Block " + i + ":");
            for (int j = 0; j < 3; j++) {
                for (int k = 0; k < 4; k++) {
                    System.out.printf("%4d", array3D[i][j][k]);
                }
                System.out.println();
            }
            System.out.println();
        }

        // Real-world example: Student marks
        // 2 semesters, 3 students, 4 subjects
        int[][][] marks = {
            {  // Semester 1
                {85, 90, 78, 92},  // Student 1
                {88, 76, 85, 80},  // Student 2
                {92, 88, 91, 95}   // Student 3
            },
            {  // Semester 2
                {87, 89, 80, 93},  // Student 1
                {90, 78, 87, 82},  // Student 2
                {94, 90, 93, 97}   // Student 3
            }
        };

        System.out.println("--- Student Marks Analysis ---");
        for (int sem = 0; sem < 2; sem++) {
            System.out.println("\\nSemester " + (sem + 1) + ":");
            for (int stu = 0; stu < 3; stu++) {
                int total = 0;
                System.out.print("Student " + (stu + 1) + " marks: ");
                for (int sub = 0; sub < 4; sub++) {
                    System.out.print(marks[sem][stu][sub] + " ");
                    total += marks[sem][stu][sub];
                }
                double avg = total / 4.0;
                System.out.println("| Total: " + total + " | Avg: " + avg);
            }
        }
    }
}
\`\`\`

---

**COMPARISON: 1D vs 2D vs 3D ARRAYS**

| Feature | 1D Array | 2D Array | 3D Array |
|---------|----------|----------|----------|
| Dimensions | 1 | 2 | 3 |
| Declaration | \`int[] arr\` | \`int[][] arr\` | \`int[][][] arr\` |
| Example | List | Matrix/Table | Cube/Blocks |
| Access | \`arr[i]\` | \`arr[i][j]\` | \`arr[i][j][k]\` |
| Memory | Linear | Rows × Cols | Blocks × Rows × Cols |
| Use Case | Simple list | Spreadsheet | 3D coordinates |

---

**KEY POINTS:**

✓ Arrays are fixed-size
✓ Index starts from 0
✓ Can store primitives or objects
✓ Length property gives size
✓ ArrayIndexOutOfBoundsException if index invalid
✓ Arrays are objects in Java
✓ Default values: 0 for numbers, false for boolean, null for objects

**ADVANTAGES:**
- Fast access by index (O(1))
- Memory efficient
- Simple to use

**DISADVANTAGES:**
- Fixed size
- Insertion/deletion is costly
- Wasted memory if not fully used

**BEST PRACTICES:**
1. Use enhanced for loop when index not needed
2. Check array bounds before access
3. Initialize arrays before use
4. Use Arrays utility class for operations
5. Consider ArrayList for dynamic size needs`
    },
    {
      id: 13,
      title: 'Jump Statements',
      question: 'What are jump statements in Java? Name the types.',
      dueDate: '15/09/2025',
      topics: ['Control Flow', 'Jump Statements', 'break', 'continue', 'return'],
      description: 'Complete guide to jump statements: break, continue, and return with their usage in loops, switch statements, and methods.',
      answer: `**Jump Statements in Java**

Jump statements are used to transfer the control of the program to a specific statement. They alter the normal flow of program execution.

---

**TYPES OF JUMP STATEMENTS:**

1. **break** - Terminates loop or switch statement
2. **continue** - Skips current iteration and continues with next
3. **return** - Exits from method and returns value (optional)

---

**1. BREAK STATEMENT**

The break statement terminates the loop or switch statement immediately and transfers control to the statement following the loop/switch.

**Uses of break:**
- Exit from a loop (for, while, do-while)
- Exit from a switch statement
- Exit from labeled blocks (labeled break)

**Syntax:**
\`\`\`java
break;           // Unlabeled break
break label;     // Labeled break
\`\`\`

**1.1 BREAK IN LOOPS**

\`\`\`java
public class BreakInLoops {
    public static void main(String[] args) {
        System.out.println("=== BREAK STATEMENT IN LOOPS ===\\n");

        // Example 1: Break in for loop
        System.out.println("--- Break in For Loop ---");
        System.out.println("Printing numbers 1 to 10, stop at 5:");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                break;  // Exit loop when i is 5
            }
            System.out.print(i + " ");
        }
        System.out.println("\\nLoop terminated!\\n");

        // Example 2: Break in while loop
        System.out.println("--- Break in While Loop ---");
        System.out.println("Finding first multiple of 7 greater than 50:");
        int num = 50;
        while (true) {
            num++;
            if (num % 7 == 0) {
                System.out.println("Found: " + num);
                break;  // Exit infinite loop
            }
        }

        // Example 3: Practical example - Search in array
        System.out.println("\\n--- Searching in Array ---");
        int[] numbers = {10, 25, 30, 45, 50, 67, 80};
        int searchFor = 45;
        boolean found = false;

        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] == searchFor) {
                System.out.println(searchFor + " found at index " + i);
                found = true;
                break;  // No need to search further
            }
        }

        if (!found) {
            System.out.println(searchFor + " not found");
        }
    }
}
\`\`\`

**Output:**
\`\`\`
=== BREAK STATEMENT IN LOOPS ===

--- Break in For Loop ---
Printing numbers 1 to 10, stop at 5:
1 2 3 4
Loop terminated!

--- Break in While Loop ---
Finding first multiple of 7 greater than 50:
Found: 56

--- Searching in Array ---
45 found at index 3
\`\`\`

---

**1.2 BREAK IN SWITCH**

\`\`\`java
public class BreakInSwitch {
    public static void main(String[] args) {
        System.out.println("=== BREAK IN SWITCH STATEMENT ===\\n");

        int day = 3;
        String dayName;

        switch (day) {
            case 1:
                dayName = "Monday";
                break;  // Exit switch after this case
            case 2:
                dayName = "Tuesday";
                break;
            case 3:
                dayName = "Wednesday";
                break;
            case 4:
                dayName = "Thursday";
                break;
            case 5:
                dayName = "Friday";
                break;
            default:
                dayName = "Weekend";
        }

        System.out.println("Day " + day + " is: " + dayName);

        // Example: Switch without break (fall-through)
        System.out.println("\\n--- Switch Without Break (Fall-through) ---");
        int month = 2;

        switch (month) {
            case 12:
            case 1:
            case 2:
                System.out.println("Winter");
                break;  // Single break for multiple cases
            case 3:
            case 4:
            case 5:
                System.out.println("Spring");
                break;
            case 6:
            case 7:
            case 8:
                System.out.println("Summer");
                break;
            case 9:
            case 10:
            case 11:
                System.out.println("Autumn");
                break;
        }
    }
}
\`\`\`

---

**1.3 LABELED BREAK**

Used to break out of nested loops.

\`\`\`java
public class LabeledBreak {
    public static void main(String[] args) {
        System.out.println("=== LABELED BREAK ===\\n");

        // Example 1: Breaking out of nested loop
        System.out.println("--- Breaking Nested Loop ---");

        outerLoop:  // Label for outer loop
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (i == 2 && j == 2) {
                    System.out.println("Breaking outer loop at i=" + i + ", j=" + j);
                    break outerLoop;  // Breaks outer loop
                }
                System.out.println("i=" + i + ", j=" + j);
            }
        }
        System.out.println("Outer loop terminated\\n");

        // Example 2: Finding element in 2D array
        System.out.println("--- Finding in 2D Array ---");
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        int target = 5;

        search:  // Label
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == target) {
                    System.out.println(target + " found at position [" + i + "][" + j + "]");
                    break search;  // Break out of both loops
                }
            }
        }
    }
}
\`\`\`

---

**2. CONTINUE STATEMENT**

The continue statement skips the current iteration of the loop and continues with the next iteration.

**Syntax:**
\`\`\`java
continue;           // Unlabeled continue
continue label;     // Labeled continue
\`\`\`

**2.1 CONTINUE IN LOOPS**

\`\`\`java
public class ContinueStatement {
    public static void main(String[] args) {
        System.out.println("=== CONTINUE STATEMENT ===\\n");

        // Example 1: Skip even numbers
        System.out.println("--- Printing Odd Numbers (1-10) ---");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                continue;  // Skip even numbers
            }
            System.out.print(i + " ");
        }
        System.out.println("\\n");

        // Example 2: Skip specific values
        System.out.println("--- Skip Multiples of 3 ---");
        for (int i = 1; i <= 15; i++) {
            if (i % 3 == 0) {
                continue;  // Skip multiples of 3
            }
            System.out.print(i + " ");
        }
        System.out.println("\\n");

        // Example 3: Continue in while loop
        System.out.println("--- Continue in While Loop ---");
        int count = 0;
        while (count < 10) {
            count++;
            if (count == 5 || count == 7) {
                continue;  // Skip 5 and 7
            }
            System.out.print(count + " ");
        }
        System.out.println("\\n");

        // Example 4: Practical - Sum of positive numbers only
        System.out.println("--- Sum of Positive Numbers ---");
        int[] numbers = {10, -5, 20, -15, 30, -10, 40};
        int sum = 0;

        for (int num : numbers) {
            if (num < 0) {
                continue;  // Skip negative numbers
            }
            sum += num;
        }
        System.out.println("Sum of positive numbers: " + sum);
    }
}
\`\`\`

**Output:**
\`\`\`
=== CONTINUE STATEMENT ===

--- Printing Odd Numbers (1-10) ---
1 3 5 7 9

--- Skip Multiples of 3 ---
1 2 4 5 7 8 10 11 13 14

--- Continue in While Loop ---
1 2 3 4 6 8 9 10

--- Sum of Positive Numbers ---
Sum of positive numbers: 100
\`\`\`

---

**2.2 LABELED CONTINUE**

\`\`\`java
public class LabeledContinue {
    public static void main(String[] args) {
        System.out.println("=== LABELED CONTINUE ===\\n");

        // Example: Skip entire outer loop iteration
        System.out.println("--- Nested Loop with Labeled Continue ---");

        outerLoop:
        for (int i = 1; i <= 3; i++) {
            System.out.println("Outer loop iteration: " + i);

            for (int j = 1; j <= 3; j++) {
                if (i == 2 && j == 2) {
                    System.out.println("  Skipping rest of outer iteration " + i);
                    continue outerLoop;  // Continue outer loop
                }
                System.out.println("  Inner: i=" + i + ", j=" + j);
            }
        }

        // Example 2: Printing pattern
        System.out.println("\\n--- Pattern with Labeled Continue ---");

        outer:
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= 5; j++) {
                if (j > i) {
                    System.out.println();
                    continue outer;
                }
                System.out.print("* ");
            }
        }
    }
}
\`\`\`

---

**3. RETURN STATEMENT**

The return statement exits from the current method and optionally returns a value.

**Syntax:**
\`\`\`java
return;              // For void methods
return value;        // For methods with return type
\`\`\`

**3.1 RETURN IN METHODS**

\`\`\`java
public class ReturnStatement {
    public static void main(String[] args) {
        System.out.println("=== RETURN STATEMENT ===\\n");

        // Example 1: Return with value
        int sum = add(10, 20);
        System.out.println("Sum: " + sum);

        // Example 2: Return in void method
        System.out.println("\\n--- Checking Eligibility ---");
        checkEligibility(25);
        checkEligibility(15);

        // Example 3: Multiple return statements
        System.out.println("\\n--- Grade Calculation ---");
        System.out.println("Marks 85: Grade " + getGrade(85));
        System.out.println("Marks 65: Grade " + getGrade(65));
        System.out.println("Marks 45: Grade " + getGrade(45));
        System.out.println("Marks 25: Grade " + getGrade(25));

        // Example 4: Early return
        System.out.println("\\n--- Divide Numbers ---");
        System.out.println("10 / 2 = " + divide(10, 2));
        System.out.println("10 / 0 = " + divide(10, 0));
    }

    // Method with return value
    static int add(int a, int b) {
        return a + b;  // Returns sum
    }

    // Void method with return
    static void checkEligibility(int age) {
        if (age < 18) {
            System.out.println("Age " + age + ": Not eligible");
            return;  // Exit method early
        }
        System.out.println("Age " + age + ": Eligible");
    }

    // Multiple return statements
    static char getGrade(int marks) {
        if (marks >= 90) return 'A';
        if (marks >= 80) return 'B';
        if (marks >= 70) return 'C';
        if (marks >= 60) return 'D';
        if (marks >= 40) return 'E';
        return 'F';  // Default return
    }

    // Early return for error handling
    static String divide(int a, int b) {
        if (b == 0) {
            return "Error: Division by zero";  // Early return
        }
        return String.valueOf(a / b);
    }
}
\`\`\`

**Output:**
\`\`\`
=== RETURN STATEMENT ===

Sum: 30

--- Checking Eligibility ---
Age 25: Eligible
Age 15: Not eligible

--- Grade Calculation ---
Marks 85: Grade B
Marks 65: Grade D
Marks 45: Grade E
Marks 25: Grade F

--- Divide Numbers ---
10 / 2 = 5
10 / 0 = Error: Division by zero
\`\`\`

---

**COMPARISON OF JUMP STATEMENTS**

| Statement | Purpose | Use Case | Scope |
|-----------|---------|----------|-------|
| **break** | Exit loop/switch | Stop execution completely | Current loop/switch |
| **continue** | Skip iteration | Skip current, continue next | Current iteration |
| **return** | Exit method | Return value and exit | Entire method |

---

**COMPLETE COMPARISON PROGRAM**

\`\`\`java
public class JumpStatementsComparison {
    public static void main(String[] args) {
        System.out.println("=== COMPARING: BREAK vs CONTINUE vs RETURN ===\\n");

        // 1. BREAK - Stops loop completely
        System.out.println("--- Using BREAK (stops at 5) ---");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) break;
            System.out.print(i + " ");
        }
        System.out.println("\\n");

        // 2. CONTINUE - Skips iteration
        System.out.println("--- Using CONTINUE (skips 5) ---");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) continue;
            System.out.print(i + " ");
        }
        System.out.println("\\n");

        // 3. RETURN - Exits method
        System.out.println("--- Using RETURN (exits method at 5) ---");
        printNumbers();

        System.out.println("\\n=== PRACTICAL EXAMPLE ===");

        // Finding prime numbers
        System.out.println("\\nPrime numbers from 1 to 20:");
        for (int num = 2; num <= 20; num++) {
            if (isPrime(num)) {
                System.out.print(num + " ");
            }
        }
    }

    static void printNumbers() {
        for (int i = 1; i <= 10; i++) {
            if (i == 5) return;  // Exits entire method
            System.out.print(i + " ");
        }
        System.out.println("This line won't be reached");
    }

    static boolean isPrime(int n) {
        if (n < 2) return false;  // Early return

        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) {
                return false;  // Not prime, exit method
            }
        }
        return true;  // Is prime
    }
}
\`\`\`

---

**KEY POINTS:**

**BREAK:**
✓ Terminates loop or switch completely
✓ Control moves to statement after loop/switch
✓ Can be labeled to break outer loops
✓ Required in switch cases

**CONTINUE:**
✓ Skips current iteration only
✓ Loop continues with next iteration
✓ Can be labeled to continue outer loops
✓ Useful for filtering

**RETURN:**
✓ Exits from method immediately
✓ Can return a value
✓ Multiple returns allowed in a method
✓ Used for early exit and error handling

**BEST PRACTICES:**

1. Use **break** to exit loops early when condition met
2. Use **continue** to skip invalid data in loops
3. Use **return** for early exit in methods
4. Avoid excessive use of labeled break/continue (hard to read)
5. Always use break in switch cases to prevent fall-through
6. Use return for guard clauses in methods`
    },
    {
      id: 14,
      title: 'Loop Statements',
      question: 'Explain for loop, while loop, and do-while loop with examples.',
      dueDate: '15/09/2025',
      topics: ['Loops', 'Control Flow', 'for', 'while', 'do-while'],
      description: 'Comprehensive guide to all three loop types in Java with syntax, flowcharts, examples, and practical applications.',
      answer: `**Loop Statements in Java**

Loops are used to execute a block of code repeatedly until a specific condition is met. They help in reducing code redundancy and improving efficiency.

---

**TYPES OF LOOPS IN JAVA:**

1. **for loop** - Known number of iterations
2. **while loop** - Condition checked before execution
3. **do-while loop** - Condition checked after execution
4. **Enhanced for loop (for-each)** - Iterate through arrays/collections

---

**1. FOR LOOP**

The for loop is used when the number of iterations is known beforehand.

**Syntax:**
\`\`\`java
for (initialization; condition; update) {
    // code to be executed
}
\`\`\`

**Components:**
- **Initialization:** Executed once at the beginning
- **Condition:** Checked before each iteration
- **Update:** Executed after each iteration
- **Body:** Code to be executed repeatedly

**Flowchart:**
\`\`\`
   ┌─────────────┐
   │ Initialize  │
   └──────┬──────┘
          │
   ┌──────▼──────┐
   │  Condition  │
   │   True?     │
   └──┬───────┬──┘
      │Yes    │No
   ┌──▼────┐  │
   │ Body  │  │
   └──┬────┘  │
      │       │
   ┌──▼────┐  │
   │Update │  │
   └──┬────┘  │
      │       │
      └───────┼──► Exit
\`\`\`

**1.1 BASIC FOR LOOP EXAMPLES**

\`\`\`java
public class ForLoopDemo {
    public static void main(String[] args) {
        System.out.println("=== FOR LOOP EXAMPLES ===\\n");

        // Example 1: Print numbers 1 to 10
        System.out.println("--- Printing 1 to 10 ---");
        for (int i = 1; i <= 10; i++) {
            System.out.print(i + " ");
        }
        System.out.println("\\n");

        // Example 2: Print even numbers
        System.out.println("--- Even Numbers (2 to 20) ---");
        for (int i = 2; i <= 20; i += 2) {
            System.out.print(i + " ");
        }
        System.out.println("\\n");

        // Example 3: Reverse counting
        System.out.println("--- Countdown from 10 ---");
        for (int i = 10; i >= 1; i--) {
            System.out.print(i + " ");
        }
        System.out.println("\\n");

        // Example 4: Table of 5
        System.out.println("--- Multiplication Table of 5 ---");
        for (int i = 1; i <= 10; i++) {
            System.out.println("5 x " + i + " = " + (5 * i));
        }

        // Example 5: Sum of first N numbers
        System.out.println("\\n--- Sum of First 10 Numbers ---");
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println("Sum = " + sum);

        // Example 6: Factorial
        System.out.println("\\n--- Factorial of 5 ---");
        int factorial = 1;
        for (int i = 1; i <= 5; i++) {
            factorial *= i;
        }
        System.out.println("5! = " + factorial);
    }
}
\`\`\`

**Output:**
\`\`\`
=== FOR LOOP EXAMPLES ===

--- Printing 1 to 10 ---
1 2 3 4 5 6 7 8 9 10

--- Even Numbers (2 to 20) ---
2 4 6 8 10 12 14 16 18 20

--- Countdown from 10 ---
10 9 8 7 6 5 4 3 2 1

--- Multiplication Table of 5 ---
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50

--- Sum of First 10 Numbers ---
Sum = 55

--- Factorial of 5 ---
5! = 120
\`\`\`

---

**1.2 NESTED FOR LOOPS & PATTERNS**

\`\`\`java
public class NestedForLoop {
    public static void main(String[] args) {
        System.out.println("=== NESTED FOR LOOPS ===\\n");

        // Pattern 1: Square
        System.out.println("--- Pattern 1: Square ---");
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= 4; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        // Pattern 2: Right Triangle
        System.out.println("\\n--- Pattern 2: Right Triangle ---");
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        // Pattern 3: Number Triangle
        System.out.println("\\n--- Pattern 3: Number Triangle ---");
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }

        // Pattern 4: Inverted Triangle
        System.out.println("\\n--- Pattern 4: Inverted Triangle ---");
        for (int i = 5; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        // Multiplication Table (1 to 5)
        System.out.println("\\n--- Multiplication Table ---");
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= 10; j++) {
                System.out.printf("%4d", i * j);
            }
            System.out.println();
        }
    }
}
\`\`\`

---

**2. WHILE LOOP**

The while loop executes as long as the condition is true. Condition is checked **before** execution.

**Syntax:**
\`\`\`java
initialization;
while (condition) {
    // code to be executed
    update;
}
\`\`\`

**Flowchart:**
\`\`\`
   ┌─────────────┐
   │ Initialize  │
   └──────┬──────┘
          │
   ┌──────▼──────┐
   │  Condition  │
   │   True?     │
   └──┬───────┬──┘
      │Yes    │No
   ┌──▼────┐  │
   │ Body  │  │
   └──┬────┘  │
      │       │
   ┌──▼────┐  │
   │Update │  │
   └──┬────┘  │
      │       │
      └───────┼──► Exit
\`\`\`

**2.1 WHILE LOOP EXAMPLES**

\`\`\`java
public class WhileLoopDemo {
    public static void main(String[] args) {
        System.out.println("=== WHILE LOOP EXAMPLES ===\\n");

        // Example 1: Print 1 to 10
        System.out.println("--- Printing 1 to 10 ---");
        int i = 1;
        while (i <= 10) {
            System.out.print(i + " ");
            i++;
        }
        System.out.println("\\n");

        // Example 2: Sum of digits
        System.out.println("--- Sum of Digits of 12345 ---");
        int number = 12345;
        int sum = 0;

        while (number > 0) {
            int digit = number % 10;  // Get last digit
            sum += digit;
            number /= 10;  // Remove last digit
        }
        System.out.println("Sum of digits: " + sum);

        // Example 3: Reverse a number
        System.out.println("\\n--- Reverse of 12345 ---");
        int num = 12345;
        int reverse = 0;

        while (num != 0) {
            int digit = num % 10;
            reverse = reverse * 10 + digit;
            num /= 10;
        }
        System.out.println("Reversed: " + reverse);

        // Example 4: Finding factorial
        System.out.println("\\n--- Factorial of 6 ---");
        int n = 6;
        int factorial = 1;
        int count = 1;

        while (count <= n) {
            factorial *= count;
            count++;
        }
        System.out.println("6! = " + factorial);

        // Example 5: Power calculation
        System.out.println("\\n--- 2 raised to power 5 ---");
        int base = 2;
        int exponent = 5;
        int result = 1;
        int exp = exponent;

        while (exp > 0) {
            result *= base;
            exp--;
        }
        System.out.println(base + "^" + exponent + " = " + result);

        // Example 6: User input simulation (with sentinel value)
        System.out.println("\\n--- Sum of Numbers (stop at -1) ---");
        int[] inputs = {10, 20, 30, 40, -1};  // Simulating user input
        int index = 0;
        int total = 0;

        while (inputs[index] != -1) {
            total += inputs[index];
            index++;
        }
        System.out.println("Total sum: " + total);
    }
}
\`\`\`

**Output:**
\`\`\`
=== WHILE LOOP EXAMPLES ===

--- Printing 1 to 10 ---
1 2 3 4 5 6 7 8 9 10

--- Sum of Digits of 12345 ---
Sum of digits: 15

--- Reverse of 12345 ---
Reversed: 54321

--- Factorial of 6 ---
6! = 720

--- 2 raised to power 5 ---
2^5 = 32

--- Sum of Numbers (stop at -1) ---
Total sum: 100
\`\`\`

---

**3. DO-WHILE LOOP**

The do-while loop is similar to while loop, but condition is checked **after** execution. Guarantees at least one execution.

**Syntax:**
\`\`\`java
initialization;
do {
    // code to be executed
    update;
} while (condition);
\`\`\`

**Flowchart:**
\`\`\`
   ┌─────────────┐
   │ Initialize  │
   └──────┬──────┘
          │
   ┌──────▼──────┐
   │    Body     │
   └──────┬──────┘
          │
   ┌──────▼──────┐
   │   Update    │
   └──────┬──────┘
          │
   ┌──────▼──────┐
   │  Condition  │
   │   True?     │
   └──┬───────┬──┘
      │Yes    │No
      └───────┼──► Exit
\`\`\`

**3.1 DO-WHILE LOOP EXAMPLES**

\`\`\`java
public class DoWhileLoopDemo {
    public static void main(String[] args) {
        System.out.println("=== DO-WHILE LOOP EXAMPLES ===\\n");

        // Example 1: Print 1 to 10
        System.out.println("--- Printing 1 to 10 ---");
        int i = 1;
        do {
            System.out.print(i + " ");
            i++;
        } while (i <= 10);
        System.out.println("\\n");

        // Example 2: Menu-driven program
        System.out.println("--- Menu Simulation ---");
        int choice = 0;
        int attempt = 0;
        int[] choices = {1, 2, 3, 0};  // Simulated user choices

        do {
            choice = choices[attempt++];
            System.out.println("\\nMenu:");
            System.out.println("1. Add");
            System.out.println("2. Subtract");
            System.out.println("3. Multiply");
            System.out.println("0. Exit");
            System.out.println("Choice entered: " + choice);

            switch (choice) {
                case 1:
                    System.out.println("Addition selected");
                    break;
                case 2:
                    System.out.println("Subtraction selected");
                    break;
                case 3:
                    System.out.println("Multiplication selected");
                    break;
                case 0:
                    System.out.println("Exiting...");
                    break;
            }
        } while (choice != 0);

        // Example 3: Executes at least once even if condition is false
        System.out.println("\\n--- Executes At Least Once ---");
        int x = 10;
        do {
            System.out.println("x = " + x);
            x++;
        } while (x < 5);  // Condition false initially, but body executes once

        // Example 4: Password validation
        System.out.println("\\n--- Password Validation ---");
        String correctPassword = "java123";
        String[] passwords = {"wrong1", "wrong2", "java123"};  // Simulated inputs
        int passAttempt = 0;
        String enteredPassword;

        do {
            enteredPassword = passwords[passAttempt++];
            System.out.println("Enter password: " + enteredPassword);

            if (enteredPassword.equals(correctPassword)) {
                System.out.println("✓ Access granted!");
            } else {
                System.out.println("✗ Wrong password. Try again.");
            }
        } while (!enteredPassword.equals(correctPassword));

        // Example 5: Calculate sum until negative
        System.out.println("\\n--- Sum Until Negative Number ---");
        int[] numbers = {10, 20, 30, 40, 50, -5};
        int idx = 0;
        int sum = 0;
        int currentNum;

        do {
            currentNum = numbers[idx++];
            if (currentNum > 0) {
                sum += currentNum;
                System.out.println("Added: " + currentNum + ", Sum: " + sum);
            }
        } while (currentNum > 0 && idx < numbers.length);

        System.out.println("Final sum: " + sum);
    }
}
\`\`\`

---

**4. ENHANCED FOR LOOP (FOR-EACH)**

Used to iterate through arrays and collections without using index.

**Syntax:**
\`\`\`java
for (dataType variable : arrayName) {
    // code to be executed
}
\`\`\`

**Example:**

\`\`\`java
public class EnhancedForLoop {
    public static void main(String[] args) {
        System.out.println("=== ENHANCED FOR LOOP ===\\n");

        // Example 1: Array iteration
        System.out.println("--- Iterating Integer Array ---");
        int[] numbers = {10, 20, 30, 40, 50};

        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println("\\n");

        // Example 2: String array
        System.out.println("--- Iterating String Array ---");
        String[] fruits = {"Apple", "Banana", "Orange", "Mango"};

        for (String fruit : fruits) {
            System.out.println("Fruit: " + fruit);
        }

        // Example 3: Sum of array elements
        System.out.println("\\n--- Sum of Array ---");
        int[] values = {5, 10, 15, 20, 25};
        int sum = 0;

        for (int value : values) {
            sum += value;
        }
        System.out.println("Sum: " + sum);

        // Example 4: 2D array
        System.out.println("\\n--- 2D Array Iteration ---");
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        for (int[] row : matrix) {
            for (int element : row) {
                System.out.print(element + " ");
            }
            System.out.println();
        }
    }
}
\`\`\`

---

**COMPARISON OF LOOPS**

| Feature | for | while | do-while | for-each |
|---------|-----|-------|----------|----------|
| **When to use** | Known iterations | Unknown iterations | At least one execution | Array/Collection iteration |
| **Condition check** | Before | Before | After | N/A |
| **Minimum executions** | 0 | 0 | 1 | 0 |
| **Syntax complexity** | Medium | Simple | Simple | Simplest |
| **Index access** | Yes | Yes | Yes | No |

---

**COMPLETE COMPARISON PROGRAM**

\`\`\`java
public class LoopComparison {
    public static void main(String[] args) {
        System.out.println("=== LOOP COMPARISON ===\\n");

        int[] array = {1, 2, 3, 4, 5};

        // Using FOR loop
        System.out.println("--- Using FOR Loop ---");
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
        System.out.println("\\n");

        // Using WHILE loop
        System.out.println("--- Using WHILE Loop ---");
        int i = 0;
        while (i < array.length) {
            System.out.print(array[i] + " ");
            i++;
        }
        System.out.println("\\n");

        // Using DO-WHILE loop
        System.out.println("--- Using DO-WHILE Loop ---");
        int j = 0;
        do {
            System.out.print(array[j] + " ");
            j++;
        } while (j < array.length);
        System.out.println("\\n");

        // Using FOR-EACH loop
        System.out.println("--- Using FOR-EACH Loop ---");
        for (int num : array) {
            System.out.print(num + " ");
        }
        System.out.println("\\n");

        // Comparison: Condition false initially
        System.out.println("--- When Condition is False Initially ---");

        System.out.print("FOR loop: ");
        for (int k = 10; k < 5; k++) {
            System.out.print(k + " ");
        }
        System.out.println("(No output)");

        System.out.print("WHILE loop: ");
        int w = 10;
        while (w < 5) {
            System.out.print(w + " ");
            w++;
        }
        System.out.println("(No output)");

        System.out.print("DO-WHILE loop: ");
        int d = 10;
        do {
            System.out.print(d + " ");
            d++;
        } while (d < 5);
        System.out.println("(Executes once!)");
    }
}
\`\`\`

---

**KEY POINTS:**

**FOR LOOP:**
✓ Use when number of iterations is known
✓ All loop components in one line
✓ Best for counting and index-based operations

**WHILE LOOP:**
✓ Use when number of iterations is unknown
✓ Condition checked before execution
✓ Best for reading input until condition

**DO-WHILE LOOP:**
✓ Guarantees at least one execution
✓ Condition checked after execution
✓ Best for menu-driven programs

**FOR-EACH LOOP:**
✓ Simplest syntax for arrays/collections
✓ No index management needed
✓ Cannot modify array elements
✓ Cannot access index directly

**BEST PRACTICES:**

1. Use **for** loop for fixed iterations
2. Use **while** loop for unknown iterations
3. Use **do-while** for menu systems
4. Use **for-each** for simple array traversal
5. Always ensure loop termination condition
6. Avoid infinite loops (check condition carefully)
7. Use meaningful variable names for loop counters`

    },
    {
      id: 15,
      title: 'Define a Class and Explain Its Purpose in Java',
      question: 'Define a class and explain its purpose in Java.',
      dueDate: '29/10/2025',
      assignmentDate: '06/10/2025',
      topics: ['Classes', 'OOP Fundamentals'],
      description: 'Understanding the fundamental building block of Java - the class.',
      answer: `**Class in Java:**

A class is a blueprint or template that defines the structure and behavior of objects. It is a fundamental concept in Object-Oriented Programming (OOP) that encapsulates data (fields/attributes) and methods (functions) that operate on that data.

**Syntax:**
\`\`\`java
class ClassName {
    // Data members (fields/attributes)
    dataType field1;
    dataType field2;

    // Methods (functions)
    returnType methodName() {
        // method body
    }
}
\`\`\`

**Purpose of Class in Java:**

1. **Encapsulation:**
   - Groups related data and methods together
   - Provides data hiding and abstraction
   - Controls access through access modifiers

2. **Blueprint for Objects:**
   - Defines the structure that objects will follow
   - Specifies what properties and behaviors objects will have
   - Multiple objects can be created from a single class

3. **Code Reusability:**
   - Once defined, can be used to create multiple objects
   - Can be inherited by other classes
   - Promotes DRY (Don't Repeat Yourself) principle

4. **Modularity:**
   - Breaks down complex programs into smaller, manageable units
   - Each class handles specific functionality
   - Easier to maintain and debug

5. **Abstraction:**
   - Hides implementation details
   - Shows only essential features to the user
   - Simplifies complex systems

**Example:**
\`\`\`java
class Student {
    // Data members
    String name;
    int rollNo;
    double marks;

    // Method to display student details
    void display() {
        System.out.println("Name: " + name);
        System.out.println("Roll No: " + rollNo);
        System.out.println("Marks: " + marks);
    }

    // Method to calculate grade
    char calculateGrade() {
        if(marks >= 90) return 'A';
        else if(marks >= 80) return 'B';
        else if(marks >= 70) return 'C';
        else if(marks >= 60) return 'D';
        else return 'F';
    }
}
\`\`\`

**Key Points:**
- Class is a logical entity (exists in code)
- Does not occupy memory until objects are created
- Defined using \`class\` keyword
- Can contain fields, methods, constructors, blocks, and nested classes`
    },
    {
      id: 16,
      title: 'What is an Object? How is it Created in Java?',
      question: 'What is an object? How is it created in Java?',
      dueDate: '29/10/2025',
      assignmentDate: '06/10/2025',
      topics: ['Objects', 'OOP Fundamentals'],
      description: 'Understanding objects and their creation in Java.',
      answer: `**Object in Java:**

An object is a runtime entity that is an instance of a class. It is a physical entity that occupies memory and has a state and behavior. Objects are the fundamental units of OOP that represent real-world entities.

**Characteristics of an Object:**

1. **State:** Represented by attributes/fields (data members)
2. **Behavior:** Represented by methods (functions)
3. **Identity:** Unique identification (memory address)

**How Objects are Created in Java:**

Objects are created using the \`new\` keyword, which allocates memory for the object and returns a reference to it.

**Syntax:**
\`\`\`java
ClassName objectName = new ClassName();
\`\`\`

**Three Steps in Object Creation:**

1. **Declaration:** Declare a reference variable of the class type
   \`\`\`java
   Student student1;
   \`\`\`

2. **Instantiation:** Use \`new\` keyword to allocate memory
   \`\`\`java
   new Student();
   \`\`\`

3. **Initialization:** Constructor is called to initialize the object
   \`\`\`java
   student1 = new Student();
   \`\`\`

**Complete Example:**
\`\`\`java
class Student {
    String name;
    int rollNo;

    void display() {
        System.out.println("Name: " + name);
        System.out.println("Roll No: " + rollNo);
    }
}

class Main {
    public static void main(String[] args) {
        // Creating object - Method 1
        Student student1 = new Student();
        student1.name = "John";
        student1.rollNo = 101;
        student1.display();

        // Creating object - Method 2 (separate declaration)
        Student student2;
        student2 = new Student();
        student2.name = "Alice";
        student2.rollNo = 102;
        student2.display();

        // Creating multiple objects
        Student student3 = new Student();
        Student student4 = new Student();
    }
}
\`\`\`

**Different Ways to Create Objects:**

1. **Using new keyword:**
   \`\`\`java
   Student s = new Student();
   \`\`\`

2. **Using Class.forName():**
   \`\`\`java
   Student s = (Student) Class.forName("Student").newInstance();
   \`\`\`

3. **Using clone() method:**
   \`\`\`java
   Student s2 = (Student) s1.clone();
   \`\`\`

4. **Using deserialization:**
   \`\`\`java
   ObjectInputStream in = new ObjectInputStream(new FileInputStream("file.txt"));
   Student s = (Student) in.readObject();
   \`\`\`

**What Happens When Object is Created:**

1. Memory is allocated in heap
2. Instance variables are initialized with default values
3. Constructor is called
4. Reference to object is returned
5. Reference variable stores the memory address

**Key Points:**
- Objects are instances of classes
- Multiple objects can be created from one class
- Each object has its own copy of instance variables
- Objects are stored in heap memory
- Reference variables are stored in stack memory`
    },
    {
      id: 17,
      title: 'Differentiate Between Instance Variables and Static Variables',
      question: 'Differentiate between instance variables and static variables.',
      dueDate: '29/10/2025',
      assignmentDate: '06/10/2025',
      topics: ['Variables', 'OOP Concepts'],
      description: 'Understanding the difference between instance and static variables in Java.',
      answer: `**Instance Variables vs Static Variables:**

**INSTANCE VARIABLES:**

Instance variables are variables that belong to an instance (object) of a class. Each object has its own copy of instance variables.

**Characteristics:**
- Declared inside class but outside methods
- Created when object is created using \`new\` keyword
- Destroyed when object is destroyed
- Each object has separate copy
- Accessed using object reference
- Stored in heap memory
- No \`static\` keyword used

**Syntax:**
\`\`\`java
class Student {
    String name;      // instance variable
    int rollNo;       // instance variable
}
\`\`\`

**STATIC VARIABLES:**

Static variables are class-level variables that are shared among all instances of a class. Only one copy exists regardless of how many objects are created.

**Characteristics:**
- Declared with \`static\` keyword
- Created when class is loaded (before any object)
- Destroyed when program ends
- Shared by all objects of the class
- Accessed using class name or object reference
- Stored in method area (static memory)
- Memory allocated only once

**Syntax:**
\`\`\`java
class Student {
    static String collegeName;  // static variable
}
\`\`\`

**COMPARISON TABLE:**

| **Aspect** | **Instance Variable** | **Static Variable** |
|------------|----------------------|---------------------|
| **Keyword** | No \`static\` keyword | Uses \`static\` keyword |
| **Memory Allocation** | When object is created | When class is loaded |
| **Memory Location** | Heap memory | Method area |
| **Copies** | Each object has own copy | One copy shared by all |
| **Access** | Through object reference | Through class name or object |
| **Lifetime** | Until object exists | Until program ends |
| **Default Value** | Gets default value | Gets default value |
| **Usage** | Object-specific data | Class-level data |

**Complete Example:**
\`\`\`java
class Student {
    // Instance variables
    String name;
    int rollNo;

    // Static variable
    static String collegeName = "ABC College";
    static int totalStudents = 0;

    // Constructor
    Student(String n, int r) {
        name = n;
        rollNo = r;
        totalStudents++;  // Shared by all objects
    }

    void display() {
        System.out.println("Name: " + name);           // Different for each object
        System.out.println("Roll No: " + rollNo);      // Different for each object
        System.out.println("College: " + collegeName); // Same for all objects
    }
}

class Main {
    public static void main(String[] args) {
        // Creating first student
        Student s1 = new Student("John", 101);
        s1.display();

        // Creating second student
        Student s2 = new Student("Alice", 102);
        s2.display();

        // Accessing static variable using class name
        System.out.println("Total Students: " + Student.totalStudents);

        // Changing static variable affects all objects
        Student.collegeName = "XYZ College";
        s1.display();  // Will show XYZ College
        s2.display();  // Will show XYZ College
    }
}
\`\`\`

**Output:**
\`\`\`
Name: John
Roll No: 101
College: ABC College
Name: Alice
Roll No: 102
College: ABC College
Total Students: 2
Name: John
Roll No: 101
College: XYZ College
Name: Alice
Roll No: 102
College: XYZ College
\`\`\`

**When to Use:**

**Instance Variables:**
- When each object needs its own copy
- For object-specific properties
- Example: name, rollNo, age, marks

**Static Variables:**
- When value should be shared by all objects
- For constants or counters
- Example: collegeName, totalStudents, PI value

**Key Points:**
- Instance variables represent object state
- Static variables represent class state
- Static variables save memory (only one copy)
- Instance variables provide object uniqueness`
    },
    {
      id: 18,
      title: 'What is the Use of "this" Keyword? Give an Example',
      question: 'What is the use of this keyword? Give an example.',
      dueDate: '29/10/2025',
      assignmentDate: '06/10/2025',
      topics: ['this keyword', 'OOP Concepts'],
      description: 'Understanding the this keyword and its various uses in Java.',
      answer: `**The "this" Keyword in Java:**

The \`this\` keyword is a reference variable that refers to the current object. It is used inside instance methods or constructors to refer to the current instance of the class.

**Uses of "this" Keyword:**

**1. To Refer to Current Class Instance Variables:**

When parameter names are same as instance variable names, \`this\` is used to differentiate between them.

\`\`\`java
class Student {
    String name;
    int rollNo;

    Student(String name, int rollNo) {
        this.name = name;      // this.name refers to instance variable
        this.rollNo = rollNo;  // this.rollNo refers to instance variable
    }
}
\`\`\`

**2. To Call Current Class Methods:**

\`\`\`java
class Calculator {
    void display() {
        System.out.println("Display method");
    }

    void show() {
        this.display();  // Calling current class method
        // OR simply: display();
    }
}
\`\`\`

**3. To Call Current Class Constructor (Constructor Chaining):**

\`\`\`java
class Student {
    String name;
    int rollNo;
    String course;

    // Default constructor
    Student() {
        this("Unknown", 0, "None");  // Calls parameterized constructor
    }

    // Two parameter constructor
    Student(String name, int rollNo) {
        this(name, rollNo, "Computer Science");  // Calls three parameter constructor
    }

    // Three parameter constructor
    Student(String name, int rollNo, String course) {
        this.name = name;
        this.rollNo = rollNo;
        this.course = course;
    }
}
\`\`\`

**4. To Pass as an Argument in Method Call:**

\`\`\`java
class Student {
    void display(Student s) {
        System.out.println("Student object passed");
    }

    void show() {
        display(this);  // Passing current object as argument
    }
}
\`\`\`

**5. To Return Current Class Instance:**

\`\`\`java
class Student {
    Student getStudent() {
        return this;  // Returning current object
    }
}
\`\`\`

**Complete Example with All Uses:**

\`\`\`java
class Employee {
    String name;
    int id;
    double salary;

    // 1. Using this to differentiate between instance and local variables
    Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }

    // 2. Using this for constructor chaining
    Employee(String name, int id) {
        this(name, id, 25000.0);  // Calls main constructor with default salary
    }

    Employee() {
        this("Unknown", 0, 0.0);  // Calls main constructor with defaults
    }

    // 3. Using this to call current class method
    void display() {
        System.out.println("Name: " + this.name);
        System.out.println("ID: " + this.id);
        System.out.println("Salary: " + this.salary);
    }

    void show() {
        this.display();  // Calling display method
    }

    // 4. Using this to return current object
    Employee getSalaryIncrement(double increment) {
        this.salary += increment;
        return this;  // Method chaining
    }

    // 5. Using this as method argument
    void compare(Employee e) {
        if(this.salary > e.salary) {
            System.out.println(this.name + " has higher salary");
        } else {
            System.out.println(e.name + " has higher salary");
        }
    }

    void compareWithAnother(Employee e) {
        compare(this);  // Passing current object
    }
}

class Main {
    public static void main(String[] args) {
        Employee e1 = new Employee("John", 101, 30000);
        Employee e2 = new Employee("Alice", 102);
        Employee e3 = new Employee();

        e1.show();
        System.out.println();

        // Method chaining using this
        e2.getSalaryIncrement(5000).display();
        System.out.println();

        e1.compare(e2);
    }
}
\`\`\`

**Output:**
\`\`\`
Name: John
ID: 101
Salary: 30000.0

Name: Alice
ID: 102
Salary: 30000.0

John has higher salary
\`\`\`

**Important Points:**

1. **Cannot be used in static context:**
   \`\`\`java
   static void method() {
       this.name = "John";  // ERROR: Cannot use this in static context
   }
   \`\`\`

2. **this() must be first statement in constructor:**
   \`\`\`java
   Employee() {
       System.out.println("Hello");
       this("John", 101);  // ERROR: this() must be first statement
   }
   \`\`\`

3. **Improves code readability:**
   - Makes clear distinction between instance and local variables
   - Shows explicitly that we're referring to current object

4. **Required when parameter names match instance variables:**
   - Without \`this\`, parameter shadows instance variable
   - \`this\` resolves the ambiguity

**Benefits:**
- Eliminates ambiguity between instance and local variables
- Enables constructor chaining (code reusability)
- Facilitates method chaining
- Makes code more readable and maintainable`
    },
    {
      id: 19,
      title: 'Explain Method Overloading with a Suitable Example',
      question: 'Explain method overloading with a suitable example.',
      dueDate: '29/10/2025',
      assignmentDate: '06/10/2025',
      topics: ['Method Overloading', 'Polymorphism'],
      description: 'Understanding compile-time polymorphism through method overloading.',
      answer: `**Method Overloading:**

Method overloading is a feature in Java that allows a class to have multiple methods with the same name but different parameters. It is a type of compile-time polymorphism (static polymorphism).

**Definition:**
When two or more methods in a class have the same name but different parameters (different number, type, or order of parameters), it is called method overloading.

**Ways to Overload a Method:**

1. **By changing number of parameters:**
\`\`\`java
void display(int a)
void display(int a, int b)
\`\`\`

2. **By changing data type of parameters:**
\`\`\`java
void display(int a)
void display(double a)
\`\`\`

3. **By changing order of parameters:**
\`\`\`java
void display(int a, double b)
void display(double a, int b)
\`\`\`

**Rules for Method Overloading:**

✓ Method name must be same
✓ Parameter list must be different
✓ Return type can be same or different
✓ Access modifiers can be different
✓ Occurs in same class or subclass

**Note:** Return type alone is NOT sufficient for overloading
\`\`\`java
int add(int a, int b)
double add(int a, int b)  // ERROR: Cannot overload by return type alone
\`\`\`

**Example 1: Calculator Class (Number of Parameters)**

\`\`\`java
class Calculator {
    // Method with 2 parameters
    int add(int a, int b) {
        return a + b;
    }

    // Overloaded method with 3 parameters
    int add(int a, int b, int c) {
        return a + b + c;
    }

    // Overloaded method with 4 parameters
    int add(int a, int b, int c, int d) {
        return a + b + c + d;
    }
}

class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();

        System.out.println("Sum of 2 numbers: " + calc.add(10, 20));
        System.out.println("Sum of 3 numbers: " + calc.add(10, 20, 30));
        System.out.println("Sum of 4 numbers: " + calc.add(10, 20, 30, 40));
    }
}
\`\`\`

**Output:**
\`\`\`
Sum of 2 numbers: 30
Sum of 3 numbers: 60
Sum of 4 numbers: 100
\`\`\`

**Example 2: Area Calculator (Different Data Types)**

\`\`\`java
class AreaCalculator {
    // Area of square (int)
    double area(int side) {
        return side * side;
    }

    // Area of rectangle (double)
    double area(double length, double width) {
        return length * width;
    }

    // Area of circle (double)
    double area(double radius) {
        return 3.14159 * radius * radius;
    }

    // Area of triangle (int)
    double area(int base, int height) {
        return 0.5 * base * height;
    }
}

class Main {
    public static void main(String[] args) {
        AreaCalculator ac = new AreaCalculator();

        System.out.println("Area of square: " + ac.area(5));
        System.out.println("Area of rectangle: " + ac.area(5.5, 3.2));
        System.out.println("Area of circle: " + ac.area(4.0));
        System.out.println("Area of triangle: " + ac.area(6, 8));
    }
}
\`\`\`

**Example 3: Display Methods (Order of Parameters)**

\`\`\`java
class Student {
    // Method 1: int, String
    void display(int rollNo, String name) {
        System.out.println("Roll No: " + rollNo);
        System.out.println("Name: " + name);
    }

    // Method 2: String, int (different order)
    void display(String name, int rollNo) {
        System.out.println("Name: " + name);
        System.out.println("Roll No: " + rollNo);
    }

    // Method 3: String, double
    void display(String name, double marks) {
        System.out.println("Name: " + name);
        System.out.println("Marks: " + marks);
    }
}

class Main {
    public static void main(String[] args) {
        Student s = new Student();

        s.display(101, "John");
        System.out.println();
        s.display("Alice", 102);
        System.out.println();
        s.display("Bob", 95.5);
    }
}
\`\`\`

**Example 4: Practical Example - Print Method**

\`\`\`java
class Printer {
    void print(int num) {
        System.out.println("Printing integer: " + num);
    }

    void print(double num) {
        System.out.println("Printing double: " + num);
    }

    void print(String text) {
        System.out.println("Printing string: " + text);
    }

    void print(int[] arr) {
        System.out.print("Printing array: ");
        for(int i : arr) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}

class Main {
    public static void main(String[] args) {
        Printer p = new Printer();

        p.print(100);
        p.print(99.99);
        p.print("Hello Java");
        p.print(new int[]{1, 2, 3, 4, 5});
    }
}
\`\`\`

**Advantages of Method Overloading:**

1. **Code Readability:**
   - Same method name for similar operations
   - Easy to remember and use

2. **Code Reusability:**
   - Same logic for different data types
   - Reduces code duplication

3. **Flexibility:**
   - Multiple ways to call the same functionality
   - Works with different parameter combinations

4. **Polymorphism:**
   - Implements compile-time polymorphism
   - Makes code more object-oriented

**Type Promotion in Overloading:**

If exact match not found, Java promotes smaller data types to larger:
\`\`\`java
class Test {
    void show(int a) {
        System.out.println("int method");
    }

    void show(double a) {
        System.out.println("double method");
    }
}

Test t = new Test();
t.show(10);    // Calls int method
t.show(10.5);  // Calls double method
t.show('A');   // Calls int method (char promoted to int)
\`\`\`

**Promotion Order:**
byte → short → int → long → float → double
char → int → long → float → double

**Key Points:**
- Method overloading is compile-time polymorphism
- Increases program flexibility and readability
- Parameters must differ (count, type, or order)
- Return type alone cannot distinguish overloaded methods
- Constructors can also be overloaded`
    },
    {
      id: 20,
      title: 'What is the final Keyword? Explain Its Use',
      question: 'What is the final keyword? Explain its use with variables, methods, and classes.',
      dueDate: '29/10/2025',
      assignmentDate: '06/10/2025',
      topics: ['final keyword', 'Java Modifiers'],
      description: 'Understanding the final keyword and its applications in Java.',
      answer: `**The final Keyword in Java:**

The \`final\` keyword is a non-access modifier used to restrict the user from changing the value, method definition, or class inheritance. Once something is declared as \`final\`, it cannot be modified.

**Uses of final Keyword:**

1. **final with Variables** (Creates Constants)
2. **final with Methods** (Prevents Method Overriding)
3. **final with Classes** (Prevents Inheritance)

---

**1. final WITH VARIABLES:**

When a variable is declared as \`final\`, its value cannot be changed once assigned. It becomes a constant.

**Syntax:**
\`\`\`java
final dataType variableName = value;
\`\`\`

**Types of final Variables:**

**a) final Instance Variable:**
\`\`\`java
class Student {
    final int MAX_MARKS = 100;  // Must be initialized

    void display() {
        // MAX_MARKS = 150;  // ERROR: Cannot change final variable
        System.out.println("Maximum Marks: " + MAX_MARKS);
    }
}
\`\`\`

**b) final Static Variable (Constant):**
\`\`\`java
class MathConstants {
    static final double PI = 3.14159;
    static final double E = 2.71828;
}
\`\`\`

**c) final Local Variable:**
\`\`\`java
void calculate() {
    final int TAX_RATE = 18;
    // TAX_RATE = 20;  // ERROR: Cannot modify
}
\`\`\`

**d) final Parameter:**
\`\`\`java
void display(final int value) {
    // value = 100;  // ERROR: Cannot modify final parameter
    System.out.println(value);
}
\`\`\`

**Initialization of final Variables:**

**Method 1: At declaration**
\`\`\`java
final int MAX = 100;
\`\`\`

**Method 2: Inside constructor (for instance variables)**
\`\`\`java
class Student {
    final int rollNo;

    Student(int r) {
        rollNo = r;  // Initialized in constructor
    }
}
\`\`\`

**Method 3: Inside static block (for static final variables)**
\`\`\`java
class Test {
    static final int VALUE;

    static {
        VALUE = 100;  // Initialized in static block
    }
}
\`\`\`

---

**2. final WITH METHODS:**

When a method is declared as \`final\`, it cannot be overridden by subclasses. It prevents method modification in child classes.

**Syntax:**
\`\`\`java
final returnType methodName() {
    // method body
}
\`\`\`

**Example:**
\`\`\`java
class Parent {
    // final method
    final void display() {
        System.out.println("This is final method in Parent");
    }

    void show() {
        System.out.println("This is normal method");
    }
}

class Child extends Parent {
    // Cannot override final method
    // void display() {  // ERROR: Cannot override final method
    //     System.out.println("Trying to override");
    // }

    // Can override normal method
    void show() {
        System.out.println("Overridden method in Child");
    }
}

class Main {
    public static void main(String[] args) {
        Child c = new Child();
        c.display();  // Calls Parent's final method
        c.show();     // Calls Child's overridden method
    }
}
\`\`\`

**Output:**
\`\`\`
This is final method in Parent
Overridden method in Child
\`\`\`

---

**3. final WITH CLASSES:**

When a class is declared as \`final\`, it cannot be inherited. No class can extend a \`final\` class.

**Syntax:**
\`\`\`java
final class ClassName {
    // class body
}
\`\`\`

**Example:**
\`\`\`java
final class Vehicle {
    void display() {
        System.out.println("This is a Vehicle");
    }
}

// Cannot extend final class
// class Car extends Vehicle {  // ERROR: Cannot inherit from final class
// }

class Main {
    public static void main(String[] args) {
        Vehicle v = new Vehicle();
        v.display();
    }
}
\`\`\`

**Real-World Examples of final Classes:**
- \`String\` class is final
- \`Math\` class is final
- \`System\` class is final
- Wrapper classes (Integer, Double, etc.) are final

---

**COMPLETE EXAMPLE:**

\`\`\`java
// final class
final class Constants {
    // final static variable
    static final double PI = 3.14159;
    static final int MAX_STUDENTS = 100;

    // final instance variable
    final String COLLEGE_NAME;

    // Constructor to initialize final instance variable
    Constants(String name) {
        COLLEGE_NAME = name;
    }

    // final method
    final void display() {
        System.out.println("College: " + COLLEGE_NAME);
        System.out.println("Max Students: " + MAX_STUDENTS);
    }
}

class Circle {
    // Using final variable
    static final double PI = 3.14159;

    double calculateArea(final double radius) {
        // radius = 10;  // ERROR: Cannot modify final parameter
        return PI * radius * radius;
    }
}

class Main {
    public static void main(String[] args) {
        Constants c = new Constants("ABC College");
        c.display();

        System.out.println("PI value: " + Constants.PI);

        Circle circle = new Circle();
        System.out.println("Area: " + circle.calculateArea(5.0));
    }
}
\`\`\`

---

**COMPARISON TABLE:**

| **Aspect** | **final Variable** | **final Method** | **final Class** |
|------------|-------------------|------------------|----------------|
| **Purpose** | Create constants | Prevent overriding | Prevent inheritance |
| **Effect** | Value cannot change | Cannot be overridden | Cannot be extended |
| **Example** | \`final int MAX = 100;\` | \`final void show() {}\` | \`final class Math {}\` |
| **Real Use** | PI, TAX_RATE | Security, consistency | String, Math, System |

---

**Advantages of final Keyword:**

**1. Security:**
- Prevents unwanted changes
- Protects critical methods and classes

**2. Performance:**
- Compiler can optimize final variables
- Methods can be inlined

**3. Thread Safety:**
- final variables are inherently thread-safe
- No synchronization needed

**4. Design:**
- Forces immutability
- Creates reliable constants

---

**Important Points:**

1. **final variable must be initialized:**
   - At declaration
   - In constructor (instance)
   - In static block (static)

2. **final variable naming convention:**
   \`\`\`java
   static final int MAX_VALUE = 100;  // All UPPERCASE
   \`\`\`

3. **final with reference variables:**
   \`\`\`java
   final StringBuilder sb = new StringBuilder("Hello");
   sb.append(" World");  // OK: Object content can change
   // sb = new StringBuilder();  // ERROR: Reference cannot change
   \`\`\`

4. **final methods are faster:**
   - Can be inlined by compiler
   - No dynamic binding needed

5. **Cannot combine final with abstract:**
   \`\`\`java
   // abstract final class Test {}  // ERROR: Invalid combination
   // abstract final void method();  // ERROR: Invalid combination
   \`\`\`

**When to Use final:**

✓ Use final for constants (PI, MAX_VALUE)
✓ Use final for methods that shouldn't be overridden
✓ Use final for classes that shouldn't be inherited
✓ Use final for parameters to prevent modification
✓ Use final for immutability and thread safety`
    },
    {
      id: 21,
      title: 'Define a Constructor. How is it Different from a Method?',
      question: 'Define a constructor. How is it different from a method?',
      dueDate: '29/10/2025',
      assignmentDate: '06/10/2025',
      topics: ['Constructors', 'OOP Fundamentals'],
      description: 'Understanding constructors and their differences from regular methods.',
      answer: `**Constructor in Java:**

A constructor is a special type of method that is used to initialize objects. It is automatically called when an object is created using the \`new\` keyword.

**Definition:**
A constructor is a block of code similar to a method that is called when an instance of a class is created. It has the same name as the class and has no return type.

**Syntax:**
\`\`\`java
class ClassName {
    // Constructor
    ClassName() {
        // initialization code
    }
}
\`\`\`

**Characteristics of Constructor:**

1. **Same name as class**
2. **No return type** (not even void)
3. **Called automatically** when object is created
4. **Used to initialize object state**
5. **Cannot be abstract, static, or final**
6. **Can be overloaded**

**Example:**
\`\`\`java
class Student {
    String name;
    int rollNo;

    // Constructor
    Student() {
        name = "Unknown";
        rollNo = 0;
        System.out.println("Constructor called");
    }
}

class Main {
    public static void main(String[] args) {
        Student s1 = new Student();  // Constructor is called automatically
        System.out.println("Name: " + s1.name);
        System.out.println("Roll No: " + s1.rollNo);
    }
}
\`\`\`

**Output:**
\`\`\`
Constructor called
Name: Unknown
Roll No: 0
\`\`\`

---

**DIFFERENCE BETWEEN CONSTRUCTOR AND METHOD:**

| **Aspect** | **Constructor** | **Method** |
|------------|----------------|------------|
| **Name** | Must be same as class name | Can be any valid identifier |
| **Return Type** | No return type (not even void) | Must have return type (including void) |
| **Calling** | Called automatically when object is created | Called explicitly using object reference |
| **Purpose** | Initialize object state | Perform specific operations |
| **Invocation** | Invoked using \`new\` keyword | Invoked using object.method() |
| **Default** | Compiler provides default if not defined | No default method provided |
| **Modifiers** | Cannot be abstract, static, final | Can be abstract, static, final |
| **Inheritance** | Not inherited (but called via super) | Inherited by subclass |
| **this() / super()** | Can call other constructors using this() or super() | Cannot call constructors directly |
| **Execution** | Executes only once per object creation | Can be executed multiple times |

---

**DETAILED COMPARISON WITH EXAMPLES:**

**1. NAME:**

\`\`\`java
class Demo {
    // Constructor - MUST have same name as class
    Demo() {
        System.out.println("Constructor");
    }

    // Method - can have any name
    void display() {
        System.out.println("Method");
    }
}
\`\`\`

---

**2. RETURN TYPE:**

\`\`\`java
class Demo {
    // Constructor - NO return type
    Demo() {
        System.out.println("Constructor");
    }

    // Method - MUST have return type
    void display() {  // void is return type
        System.out.println("Method");
    }

    int getValue() {  // int is return type
        return 100;
    }
}
\`\`\`

---

**3. CALLING:**

\`\`\`java
class Demo {
    Demo() {
        System.out.println("Constructor called automatically");
    }

    void display() {
        System.out.println("Method called explicitly");
    }

    public static void main(String[] args) {
        Demo d = new Demo();  // Constructor called automatically
        d.display();          // Method called explicitly
    }
}
\`\`\`

---

**4. PURPOSE:**

\`\`\`java
class Student {
    String name;
    int rollNo;

    // Constructor - Initialize object
    Student(String n, int r) {
        name = n;
        rollNo = r;
    }

    // Method - Perform operation
    void display() {
        System.out.println("Name: " + name);
        System.out.println("Roll No: " + rollNo);
    }

    void updateMarks(double marks) {
        System.out.println("Marks updated: " + marks);
    }
}
\`\`\`

---

**5. MODIFIERS:**

\`\`\`java
class Demo {
    // Constructor - Cannot be static, final, or abstract
    // static Demo() { }   // ERROR
    // final Demo() { }    // ERROR
    // abstract Demo();    // ERROR

    Demo() {
        System.out.println("Valid constructor");
    }

    // Method - Can be static, final, or abstract
    static void staticMethod() {
        System.out.println("Static method");
    }

    final void finalMethod() {
        System.out.println("Final method");
    }
}

abstract class Test {
    abstract void abstractMethod();  // Valid
}
\`\`\`

---

**6. INHERITANCE:**

\`\`\`java
class Parent {
    Parent() {
        System.out.println("Parent constructor");
    }

    void display() {
        System.out.println("Parent method");
    }
}

class Child extends Parent {
    Child() {
        super();  // Calls parent constructor explicitly
        System.out.println("Child constructor");
    }

    // Method is inherited and can be overridden
    void display() {
        System.out.println("Child method");
    }
}

class Main {
    public static void main(String[] args) {
        Child c = new Child();
        c.display();  // Calls Child's method
    }
}
\`\`\`

**Output:**
\`\`\`
Parent constructor
Child constructor
Child method
\`\`\`

---

**7. FREQUENCY OF EXECUTION:**

\`\`\`java
class Demo {
    Demo() {
        System.out.println("Constructor - executed once");
    }

    void display() {
        System.out.println("Method - can execute multiple times");
    }

    public static void main(String[] args) {
        Demo d = new Demo();  // Constructor called once
        d.display();          // Method called
        d.display();          // Method called again
        d.display();          // Method called again
    }
}
\`\`\`

**Output:**
\`\`\`
Constructor - executed once
Method - can execute multiple times
Method - can execute multiple times
Method - can execute multiple times
\`\`\`

---

**COMPLETE COMPARISON EXAMPLE:**

\`\`\`java
class Employee {
    String name;
    int id;
    double salary;

    // CONSTRUCTOR
    // 1. Same name as class
    // 2. No return type
    // 3. Called automatically
    // 4. Initializes object
    Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
        System.out.println("Employee object created");
    }

    // METHOD
    // 1. Different name from class
    // 2. Has return type (void)
    // 3. Called explicitly
    // 4. Performs operation
    void display() {
        System.out.println("Name: " + name);
        System.out.println("ID: " + id);
        System.out.println("Salary: " + salary);
    }

    // METHOD with return type
    double calculateAnnualSalary() {
        return salary * 12;
    }

    // METHOD that can be called multiple times
    void giveRaise(double percentage) {
        salary += salary * percentage / 100;
        System.out.println("Salary increased by " + percentage + "%");
    }
}

class Main {
    public static void main(String[] args) {
        // Constructor called automatically during object creation
        Employee emp = new Employee("John", 101, 50000);

        // Methods called explicitly
        emp.display();

        double annual = emp.calculateAnnualSalary();
        System.out.println("Annual Salary: " + annual);

        // Method can be called multiple times
        emp.giveRaise(10);
        emp.giveRaise(5);
        emp.display();
    }
}
\`\`\`

---

**KEY POINTS:**

**Constructor:**
✓ Special method for initialization
✓ Same name as class
✓ No return type
✓ Called once per object
✓ Cannot be inherited
✓ Cannot be static, final, or abstract

**Method:**
✓ Regular function for operations
✓ Any valid name
✓ Must have return type
✓ Can be called multiple times
✓ Can be inherited
✓ Can be static, final, or abstract

**Common Use Cases:**

**Use Constructor for:**
- Initializing instance variables
- Allocating resources
- Setting default values
- Validating object state

**Use Methods for:**
- Business logic
- Data manipulation
- Calculations
- Retrieving information
- Updating state`
    },
    {
      id: 22,
      title: 'What are Default, Parameterized, and Copy Constructors?',
      question: 'What are default, parameterized, and copy constructors?',
      dueDate: '29/10/2025',
      assignmentDate: '06/10/2025',
      topics: ['Constructors', 'Constructor Types'],
      description: 'Understanding different types of constructors in Java.',
      answer: `**Types of Constructors in Java:**

Java supports three main types of constructors:
1. **Default Constructor** (No-argument Constructor)
2. **Parameterized Constructor**
3. **Copy Constructor**

---

**1. DEFAULT CONSTRUCTOR (No-Argument Constructor):**

A constructor that takes no parameters is called a default constructor. It initializes instance variables with default values.

**Characteristics:**
- Takes no parameters
- Has same name as class
- No return type
- If not defined, compiler automatically provides one
- Initializes variables with default values (0, null, false)

**Syntax:**
\`\`\`java
ClassName() {
    // initialization code
}
\`\`\`

**Example:**
\`\`\`java
class Student {
    String name;
    int rollNo;
    double marks;

    // Default Constructor
    Student() {
        name = "Unknown";
        rollNo = 0;
        marks = 0.0;
        System.out.println("Default constructor called");
    }

    void display() {
        System.out.println("Name: " + name);
        System.out.println("Roll No: " + rollNo);
        System.out.println("Marks: " + marks);
    }
}

class Main {
    public static void main(String[] args) {
        Student s1 = new Student();  // Calls default constructor
        s1.display();
    }
}
\`\`\`

**Output:**
\`\`\`
Default constructor called
Name: Unknown
Roll No: 0
Marks: 0.0
\`\`\`

**Compiler-Provided Default Constructor:**
\`\`\`java
class Test {
    int value;
    // No constructor defined
}

// Compiler automatically adds:
// Test() {
//     super();
// }

class Main {
    public static void main(String[] args) {
        Test t = new Test();  // Uses compiler's default constructor
        System.out.println(t.value);  // Prints 0 (default value)
    }
}
\`\`\`

---

**2. PARAMETERIZED CONSTRUCTOR:**

A constructor that takes parameters is called a parameterized constructor. It allows passing values during object creation to initialize the object with specific values.

**Characteristics:**
- Takes one or more parameters
- Used to initialize objects with custom values
- Each parameter can have different data type
- Can have multiple parameterized constructors (overloading)

**Syntax:**
\`\`\`java
ClassName(parameter1, parameter2, ...) {
    // initialization using parameters
}
\`\`\`

**Example:**
\`\`\`java
class Student {
    String name;
    int rollNo;
    double marks;

    // Parameterized Constructor
    Student(String n, int r, double m) {
        name = n;
        rollNo = r;
        marks = m;
        System.out.println("Parameterized constructor called");
    }

    void display() {
        System.out.println("Name: " + name);
        System.out.println("Roll No: " + rollNo);
        System.out.println("Marks: " + marks);
    }
}

class Main {
    public static void main(String[] args) {
        Student s1 = new Student("John", 101, 95.5);
        Student s2 = new Student("Alice", 102, 88.0);

        s1.display();
        System.out.println();
        s2.display();
    }
}
\`\`\`

**Output:**
\`\`\`
Parameterized constructor called
Parameterized constructor called
Name: John
Roll No: 101
Marks: 95.5

Name: Alice
Roll No: 102
Marks: 88.0
\`\`\`

**Multiple Parameterized Constructors (Overloading):**
\`\`\`java
class Student {
    String name;
    int rollNo;
    double marks;

    // Constructor with 1 parameter
    Student(String n) {
        name = n;
        rollNo = 0;
        marks = 0.0;
    }

    // Constructor with 2 parameters
    Student(String n, int r) {
        name = n;
        rollNo = r;
        marks = 0.0;
    }

    // Constructor with 3 parameters
    Student(String n, int r, double m) {
        name = n;
        rollNo = r;
        marks = m;
    }
}
\`\`\`

---

**3. COPY CONSTRUCTOR:**

A constructor that creates a new object by copying values from an existing object of the same class is called a copy constructor.

**Characteristics:**
- Takes an object of same class as parameter
- Creates a new object with same values as the passed object
- Not provided by compiler (must be explicitly defined)
- Used for creating deep or shallow copies

**Syntax:**
\`\`\`java
ClassName(ClassName object) {
    // copy values from object
}
\`\`\`

**Example:**
\`\`\`java
class Student {
    String name;
    int rollNo;
    double marks;

    // Parameterized Constructor
    Student(String n, int r, double m) {
        name = n;
        rollNo = r;
        marks = m;
    }

    // Copy Constructor
    Student(Student s) {
        name = s.name;
        rollNo = s.rollNo;
        marks = s.marks;
        System.out.println("Copy constructor called");
    }

    void display() {
        System.out.println("Name: " + name);
        System.out.println("Roll No: " + rollNo);
        System.out.println("Marks: " + marks);
    }
}

class Main {
    public static void main(String[] args) {
        // Original object
        Student s1 = new Student("John", 101, 95.5);

        // Copy object using copy constructor
        Student s2 = new Student(s1);

        System.out.println("Original Object:");
        s1.display();

        System.out.println("\nCopied Object:");
        s2.display();

        // Modifying copied object
        s2.name = "John Copy";
        s2.rollNo = 201;

        System.out.println("\nAfter modifying copied object:");
        System.out.println("Original:");
        s1.display();
        System.out.println("\nCopied:");
        s2.display();
    }
}
\`\`\`

**Output:**
\`\`\`
Copy constructor called
Original Object:
Name: John
Roll No: 101
Marks: 95.5

Copied Object:
Name: John
Roll No: 101
Marks: 95.5

After modifying copied object:
Original:
Name: John
Roll No: 101
Marks: 95.5

Copied:
Name: John Copy
Roll No: 201
Marks: 95.5
\`\`\`

---

**COMPARISON TABLE:**

| **Aspect** | **Default Constructor** | **Parameterized Constructor** | **Copy Constructor** |
|------------|------------------------|------------------------------|---------------------|
| **Parameters** | No parameters | One or more parameters | One parameter (object of same class) |
| **Purpose** | Initialize with default values | Initialize with custom values | Create copy of existing object |
| **Provided by Compiler** | Yes (if no constructor defined) | No | No |
| **Syntax** | \`ClassName() { }\` | \`ClassName(params) { }\` | \`ClassName(ClassName obj) { }\` |
| **Usage** | Basic initialization | Custom initialization | Object cloning |
| **Example** | \`Student s = new Student();\` | \`Student s = new Student("John", 101);\` | \`Student s2 = new Student(s1);\` |

---

**COMPLETE EXAMPLE WITH ALL THREE TYPES:**

\`\`\`java
class Employee {
    String name;
    int id;
    double salary;
    String department;

    // 1. DEFAULT CONSTRUCTOR
    Employee() {
        name = "Not Assigned";
        id = 0;
        salary = 0.0;
        department = "General";
        System.out.println("Default constructor called");
    }

    // 2. PARAMETERIZED CONSTRUCTOR (2 parameters)
    Employee(String n, int i) {
        name = n;
        id = i;
        salary = 25000.0;  // Default salary
        department = "General";
        System.out.println("Parameterized constructor (2 params) called");
    }

    // 2. PARAMETERIZED CONSTRUCTOR (4 parameters)
    Employee(String n, int i, double s, String d) {
        name = n;
        id = i;
        salary = s;
        department = d;
        System.out.println("Parameterized constructor (4 params) called");
    }

    // 3. COPY CONSTRUCTOR
    Employee(Employee e) {
        name = e.name;
        id = e.id;
        salary = e.salary;
        department = e.department;
        System.out.println("Copy constructor called");
    }

    void display() {
        System.out.println("Name: " + name);
        System.out.println("ID: " + id);
        System.out.println("Salary: " + salary);
        System.out.println("Department: " + department);
        System.out.println("------------------------");
    }
}

class Main {
    public static void main(String[] args) {
        // Using default constructor
        Employee e1 = new Employee();
        e1.display();

        // Using parameterized constructor (2 params)
        Employee e2 = new Employee("Alice", 101);
        e2.display();

        // Using parameterized constructor (4 params)
        Employee e3 = new Employee("Bob", 102, 50000, "IT");
        e3.display();

        // Using copy constructor
        Employee e4 = new Employee(e3);
        e4.display();
    }
}
\`\`\`

**Output:**
\`\`\`
Default constructor called
Name: Not Assigned
ID: 0
Salary: 0.0
Department: General
------------------------
Parameterized constructor (2 params) called
Name: Alice
ID: 101
Salary: 25000.0
Department: General
------------------------
Parameterized constructor (4 params) called
Name: Bob
ID: 102
Salary: 50000.0
Department: IT
------------------------
Copy constructor called
Name: Bob
ID: 102
Salary: 50000.0
Department: IT
------------------------
\`\`\`

---

**IMPORTANT NOTES:**

**1. Default Constructor and Compiler:**
\`\`\`java
class Test {
    // No constructor defined
    // Compiler adds: Test() { super(); }
}

class Test2 {
    Test2(int x) { }  // Parameterized constructor defined
    // Compiler does NOT add default constructor
}

Test2 t = new Test2();  // ERROR: No default constructor
\`\`\`

**2. Using this() for Constructor Chaining:**
\`\`\`java
class Student {
    String name;
    int rollNo;

    Student() {
        this("Unknown", 0);  // Calls parameterized constructor
    }

    Student(String n, int r) {
        name = n;
        rollNo = r;
    }
}
\`\`\`

**3. Copy Constructor - Deep vs Shallow Copy:**
\`\`\`java
class Student {
    String name;
    int[] marks;

    // Shallow copy
    Student(Student s) {
        this.name = s.name;
        this.marks = s.marks;  // Both refer to same array
    }

    // Deep copy
    Student(Student s, boolean deep) {
        this.name = s.name;
        this.marks = new int[s.marks.length];
        for(int i = 0; i < s.marks.length; i++) {
            this.marks[i] = s.marks[i];  // New array created
        }
    }
}
\`\`\`

**When to Use Each Type:**

**Default Constructor:**
✓ When objects need default initialization
✓ When no specific values are required
✓ For creating empty objects

**Parameterized Constructor:**
✓ When specific values are needed during creation
✓ For custom initialization
✓ Most commonly used in real applications

**Copy Constructor:**
✓ When creating duplicate objects
✓ For object cloning
✓ When implementing copy functionality`
    },
    {
      id: 23,
      title: 'What is Constructor Overloading?',
      question: 'What is constructor overloading?',
      dueDate: '29/10/2025',
      assignmentDate: '06/10/2025',
      topics: ['Constructors', 'Overloading'],
      description: 'Understanding constructor overloading and its implementation.',
      answer: `**Constructor Overloading:**

Constructor overloading is a technique in Java where a class can have multiple constructors with different parameter lists. Each constructor has the same name (class name) but different parameters.

**Definition:**
When a class has more than one constructor with different parameters (different number, type, or order), it is called constructor overloading. It allows objects to be initialized in different ways.

**Characteristics:**

1. **Same name** (class name)
2. **Different parameters** (count, type, or order)
3. **Provides flexibility** in object creation
4. **Compile-time polymorphism**
5. **Constructor signature must be unique**

---

**RULES FOR CONSTRUCTOR OVERLOADING:**

✓ Constructors must have same name as class
✓ Parameter list must be different
✓ Return type is not applicable (constructors have no return type)
✓ Can have different access modifiers
✓ Can call other constructors using this()

---

**WAYS TO OVERLOAD CONSTRUCTORS:**

**1. By Number of Parameters:**
\`\`\`java
class Student {
    String name;
    int rollNo;
    double marks;

    // Constructor with no parameters
    Student() {
        name = "Unknown";
        rollNo = 0;
        marks = 0.0;
    }

    // Constructor with 1 parameter
    Student(String n) {
        name = n;
        rollNo = 0;
        marks = 0.0;
    }

    // Constructor with 2 parameters
    Student(String n, int r) {
        name = n;
        rollNo = r;
        marks = 0.0;
    }

    // Constructor with 3 parameters
    Student(String n, int r, double m) {
        name = n;
        rollNo = r;
        marks = m;
    }
}
\`\`\`

**2. By Data Type of Parameters:**
\`\`\`java
class Box {
    double length, width, height;

    // Constructor with int parameters
    Box(int l, int w, int h) {
        length = l;
        width = w;
        height = h;
    }

    // Constructor with double parameters
    Box(double l, double w, double h) {
        length = l;
        width = w;
        height = h;
    }
}
\`\`\`

**3. By Order of Parameters:**
\`\`\`java
class Employee {
    String name;
    int id;
    double salary;

    // Constructor: String, int, double
    Employee(String n, int i, double s) {
        name = n;
        id = i;
        salary = s;
    }

    // Constructor: int, String, double
    Employee(int i, String n, double s) {
        id = i;
        name = n;
        salary = s;
    }
}
\`\`\`

---

**COMPLETE EXAMPLE:**

\`\`\`java
class Student {
    String name;
    int rollNo;
    double marks;
    String course;

    // Constructor 1: No parameters (Default)
    Student() {
        name = "Unknown";
        rollNo = 0;
        marks = 0.0;
        course = "Not Assigned";
        System.out.println("Constructor with 0 parameters called");
    }

    // Constructor 2: One parameter
    Student(String n) {
        name = n;
        rollNo = 0;
        marks = 0.0;
        course = "Not Assigned";
        System.out.println("Constructor with 1 parameter called");
    }

    // Constructor 3: Two parameters
    Student(String n, int r) {
        name = n;
        rollNo = r;
        marks = 0.0;
        course = "Not Assigned";
        System.out.println("Constructor with 2 parameters called");
    }

    // Constructor 4: Three parameters
    Student(String n, int r, double m) {
        name = n;
        rollNo = r;
        marks = m;
        course = "Computer Science";
        System.out.println("Constructor with 3 parameters called");
    }

    // Constructor 5: Four parameters
    Student(String n, int r, double m, String c) {
        name = n;
        rollNo = r;
        marks = m;
        course = c;
        System.out.println("Constructor with 4 parameters called");
    }

    void display() {
        System.out.println("Name: " + name);
        System.out.println("Roll No: " + rollNo);
        System.out.println("Marks: " + marks);
        System.out.println("Course: " + course);
        System.out.println("------------------------");
    }
}

class Main {
    public static void main(String[] args) {
        // Using different constructors
        Student s1 = new Student();
        s1.display();

        Student s2 = new Student("John");
        s2.display();

        Student s3 = new Student("Alice", 101);
        s3.display();

        Student s4 = new Student("Bob", 102, 95.5);
        s4.display();

        Student s5 = new Student("Charlie", 103, 88.0, "Mechanical");
        s5.display();
    }
}
\`\`\`

**Output:**
\`\`\`
Constructor with 0 parameters called
Name: Unknown
Roll No: 0
Marks: 0.0
Course: Not Assigned
------------------------
Constructor with 1 parameter called
Name: John
Roll No: 0
Marks: 0.0
Course: Not Assigned
------------------------
Constructor with 2 parameters called
Name: Alice
Roll No: 101
Marks: 0.0
Course: Not Assigned
------------------------
Constructor with 3 parameters called
Name: Bob
Roll No: 102
Marks: 95.5
Course: Computer Science
------------------------
Constructor with 4 parameters called
Name: Charlie
Roll No: 103
Marks: 88.0
Course: Mechanical
------------------------
\`\`\`

---

**CONSTRUCTOR CHAINING USING this():**

Constructor chaining allows one constructor to call another constructor using \`this()\` keyword. This reduces code duplication.

\`\`\`java
class Employee {
    String name;
    int id;
    double salary;
    String department;

    // Constructor 1: Calls Constructor 2
    Employee() {
        this("Not Assigned", 0);
        System.out.println("Default constructor");
    }

    // Constructor 2: Calls Constructor 3
    Employee(String n, int i) {
        this(n, i, 25000.0);
        System.out.println("Constructor with 2 parameters");
    }

    // Constructor 3: Calls Constructor 4
    Employee(String n, int i, double s) {
        this(n, i, s, "General");
        System.out.println("Constructor with 3 parameters");
    }

    // Constructor 4: Main constructor
    Employee(String n, int i, double s, String d) {
        name = n;
        id = i;
        salary = s;
        department = d;
        System.out.println("Constructor with 4 parameters");
    }

    void display() {
        System.out.println("Name: " + name);
        System.out.println("ID: " + id);
        System.out.println("Salary: " + salary);
        System.out.println("Department: " + department);
    }
}

class Main {
    public static void main(String[] args) {
        Employee e1 = new Employee();
        e1.display();

        System.out.println("\n------------------------\n");

        Employee e2 = new Employee("Alice", 101);
        e2.display();
    }
}
\`\`\`

**Output:**
\`\`\`
Constructor with 4 parameters
Constructor with 3 parameters
Constructor with 2 parameters
Default constructor
Name: Not Assigned
ID: 0
Salary: 25000.0
Department: General

------------------------

Constructor with 4 parameters
Constructor with 3 parameters
Constructor with 2 parameters
Name: Alice
ID: 101
Salary: 25000.0
Department: General
\`\`\`

---

**PRACTICAL EXAMPLE: Rectangle Class**

\`\`\`java
class Rectangle {
    double length;
    double width;

    // Constructor 1: No parameters (creates unit square)
    Rectangle() {
        length = 1.0;
        width = 1.0;
        System.out.println("Creating unit square (1x1)");
    }

    // Constructor 2: One parameter (creates square)
    Rectangle(double side) {
        length = side;
        width = side;
        System.out.println("Creating square (" + side + "x" + side + ")");
    }

    // Constructor 3: Two parameters (creates rectangle)
    Rectangle(double l, double w) {
        length = l;
        width = w;
        System.out.println("Creating rectangle (" + l + "x" + w + ")");
    }

    // Constructor 4: Copy constructor
    Rectangle(Rectangle r) {
        length = r.length;
        width = r.width;
        System.out.println("Creating copy of rectangle");
    }

    double getArea() {
        return length * width;
    }

    double getPerimeter() {
        return 2 * (length + width);
    }

    void display() {
        System.out.println("Length: " + length);
        System.out.println("Width: " + width);
        System.out.println("Area: " + getArea());
        System.out.println("Perimeter: " + getPerimeter());
        System.out.println("------------------------");
    }
}

class Main {
    public static void main(String[] args) {
        Rectangle r1 = new Rectangle();
        r1.display();

        Rectangle r2 = new Rectangle(5.0);
        r2.display();

        Rectangle r3 = new Rectangle(10.0, 5.0);
        r3.display();

        Rectangle r4 = new Rectangle(r3);
        r4.display();
    }
}
\`\`\`

---

**ADVANTAGES OF CONSTRUCTOR OVERLOADING:**

**1. Flexibility:**
- Objects can be created in multiple ways
- Users have options for initialization

**2. Code Reusability:**
- Different constructors for different scenarios
- Reduces redundant code

**3. Convenience:**
- Simpler object creation
- Default values can be provided

**4. Polymorphism:**
- Implements compile-time polymorphism
- Makes code more object-oriented

---

**IMPORTANT RULES:**

**1. this() must be first statement:**
\`\`\`java
Student(String n) {
    System.out.println("Hello");
    this(n, 0);  // ERROR: this() must be first statement
}
\`\`\`

**Correct way:**
\`\`\`java
Student(String n) {
    this(n, 0);  // this() as first statement
    System.out.println("Hello");
}
\`\`\`

**2. Cannot call constructor directly:**
\`\`\`java
void method() {
    Student();  // ERROR: Cannot call constructor like this
}
\`\`\`

**3. Avoid circular constructor calls:**
\`\`\`java
Student() {
    this(10);  // Calls Student(int)
}

Student(int r) {
    this();    // ERROR: Circular call - causes infinite recursion
}
\`\`\`

---

**BEST PRACTICES:**

1. **Use constructor chaining to avoid code duplication:**
\`\`\`java
Student(String n) {
    this(n, 0, 0.0);  // Reuse existing constructor
}
\`\`\`

2. **Provide default constructor for flexibility:**
\`\`\`java
Student() {
    this("Unknown", 0, 0.0);
}
\`\`\`

3. **Most specific constructor should have actual initialization:**
\`\`\`java
Student(String n, int r, double m) {
    // Actual initialization here
    name = n;
    rollNo = r;
    marks = m;
}
\`\`\`

4. **Use meaningful parameter names:**
\`\`\`java
Student(String studentName, int studentRollNo) {
    // Clear parameter names
}
\`\`\`

---

**KEY POINTS:**

✓ Constructor overloading provides multiple ways to create objects
✓ Constructors differ by number, type, or order of parameters
✓ Improves code flexibility and usability
✓ Uses compile-time polymorphism
✓ Constructor chaining reduces code duplication
✓ this() must be first statement in constructor
✓ Each constructor should have unique signature`


    },
    {
      id: 24,
      title: 'Define Inheritance and Its Types in Java',
      question: 'Define inheritance. List and describe different types of inheritance in Java.',
      dueDate: '10/11/2025',
      assignmentDate: '06/10/2025',
      topics: ['Inheritance', 'OOP Concepts'],
      description: 'Understanding inheritance and its different types in Java.',
      answer: `**Inheritance in Java:**

**Definition:**
Inheritance is a fundamental Object-Oriented Programming (OOP) concept where a new class (child/subclass) derives properties and behaviors (fields and methods) from an existing class (parent/superclass). It establishes an "IS-A" relationship between classes.

**Key Points:**
- Promotes code reusability
- Establishes hierarchical relationships
- Supports polymorphism
- Uses \`extends\` keyword in Java

**Syntax:**
\`\`\`java
class ParentClass {
    // Parent class members
}

class ChildClass extends ParentClass {
    // Child class inherits parent members
    // Can add its own members
}
\`\`\`

---

**TYPES OF INHERITANCE IN JAVA:**

**1. SINGLE INHERITANCE:**

A class inherits from only one parent class.

\`\`\`java
// Parent class
class Animal {
    void eat() {
        System.out.println("Animal is eating");
    }
}

// Child class inherits from Animal
class Dog extends Animal {
    void bark() {
        System.out.println("Dog is barking");
    }
}

// Usage
class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.eat();   // Inherited method
        d.bark();  // Own method
    }
}
\`\`\`

**Output:**
\`\`\`
Animal is eating
Dog is barking
\`\`\`

---

**2. MULTILEVEL INHERITANCE:**

A class inherits from a child class, forming a chain of inheritance (grandparent → parent → child).

\`\`\`java
// Grandparent class
class Animal {
    void eat() {
        System.out.println("Animal eats");
    }
}

// Parent class
class Mammal extends Animal {
    void breathe() {
        System.out.println("Mammal breathes");
    }
}

// Child class
class Dog extends Mammal {
    void bark() {
        System.out.println("Dog barks");
    }
}

// Usage
class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.eat();      // From Animal
        d.breathe();  // From Mammal
        d.bark();     // Own method
    }
}
\`\`\`

**Output:**
\`\`\`
Animal eats
Mammal breathes
Dog barks
\`\`\`

---

**3. HIERARCHICAL INHERITANCE:**

Multiple classes inherit from a single parent class.

\`\`\`java
// Parent class
class Animal {
    void eat() {
        System.out.println("Animal eats");
    }
}

// Child class 1
class Dog extends Animal {
    void bark() {
        System.out.println("Dog barks");
    }
}

// Child class 2
class Cat extends Animal {
    void meow() {
        System.out.println("Cat meows");
    }
}

// Usage
class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        Cat c = new Cat();

        d.eat();   // Inherited
        d.bark();  // Own method

        c.eat();   // Inherited
        c.meow();  // Own method
    }
}
\`\`\`

**Output:**
\`\`\`
Animal eats
Dog barks
Animal eats
Cat meows
\`\`\`

---

**4. MULTIPLE INHERITANCE (NOT SUPPORTED IN JAVA):**

A class inherits from multiple parent classes. Java does NOT support multiple inheritance with classes to avoid the "Diamond Problem" (ambiguity).

**Why Not Supported:**
\`\`\`java
// This is NOT allowed in Java
class A {
    void show() { System.out.println("A"); }
}

class B {
    void show() { System.out.println("B"); }
}

// ERROR: Cannot extend multiple classes
class C extends A, B {  // Compilation Error
}
\`\`\`

**Solution:** Java uses **interfaces** to achieve multiple inheritance:
\`\`\`java
interface A {
    void showA();
}

interface B {
    void showB();
}

class C implements A, B {
    public void showA() { System.out.println("A"); }
    public void showB() { System.out.println("B"); }
}
\`\`\`

---

**5. HYBRID INHERITANCE (NOT SUPPORTED IN JAVA):**

Combination of two or more types of inheritance. Since Java doesn't support multiple inheritance with classes, hybrid inheritance is also not directly supported.

**Example (NOT possible with classes):**
\`\`\`
    Animal
    /    \\
  Dog    Cat
    \\    /
     Hybrid
\`\`\`

**Solution:** Use interfaces for hybrid inheritance patterns.

---

**COMPARISON TABLE:**

| Type | Description | Supported in Java |
|------|-------------|-------------------|
| Single | One child, one parent | ✓ Yes |
| Multilevel | Chain of inheritance | ✓ Yes |
| Hierarchical | Multiple children, one parent | ✓ Yes |
| Multiple | One child, multiple parents | ✗ No (use interfaces) |
| Hybrid | Combination of types | ✗ No (use interfaces) |

---

**KEY ADVANTAGES OF INHERITANCE:**

1. **Code Reusability:** Reuse existing code without rewriting
2. **Method Overriding:** Runtime polymorphism
3. **Extensibility:** Easy to add new features
4. **Data Hiding:** Through access modifiers
5. **Abstraction:** Hide complex implementation details

**IMPORTANT NOTES:**

- Java supports single, multilevel, and hierarchical inheritance with classes
- Multiple and hybrid inheritance achieved through interfaces
- Constructor is not inherited but called using \`super()\`
- Private members are not inherited
- Use \`extends\` keyword for inheritance`
    },
    {
      id: 25,
      title: 'Explain super Keyword with Examples',
      question: 'Explain super keyword with examples.',
      dueDate: '10/11/2025',
      assignmentDate: '06/10/2025',
      topics: ['super keyword', 'Inheritance'],
      description: 'Understanding the super keyword in Java inheritance.',
      answer: `**The super Keyword in Java:**

**Definition:**
The \`super\` keyword is a reference variable used to refer to the immediate parent class object. It is used to access parent class members (variables, methods, constructors) from the child class.

---

**THREE MAIN USES OF super KEYWORD:**

1. **Access parent class variables**
2. **Call parent class methods**
3. **Invoke parent class constructor**

---

**1. ACCESS PARENT CLASS VARIABLES:**

When a child class has a variable with the same name as the parent class, \`super\` is used to access the parent class variable.

\`\`\`java
class Parent {
    int num = 100;
}

class Child extends Parent {
    int num = 200;  // Same variable name

    void display() {
        System.out.println("Child num: " + num);         // 200
        System.out.println("Parent num: " + super.num);  // 100
    }
}

class Main {
    public static void main(String[] args) {
        Child c = new Child();
        c.display();
    }
}
\`\`\`

**Output:**
\`\`\`
Child num: 200
Parent num: 100
\`\`\`

---

**2. CALL PARENT CLASS METHODS:**

When a child class overrides a parent class method, \`super\` can be used to call the original parent class method.

\`\`\`java
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }

    void displayBoth() {
        super.sound();  // Calls parent class method
        sound();        // Calls overridden method
    }
}

class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.displayBoth();
    }
}
\`\`\`

**Output:**
\`\`\`
Animal makes a sound
Dog barks
\`\`\`

---

**3. INVOKE PARENT CLASS CONSTRUCTOR:**

The \`super()\` is used to call the parent class constructor from the child class constructor. This is the most important use of \`super\`.

**Example 1: Default Constructor**
\`\`\`java
class Parent {
    Parent() {
        System.out.println("Parent constructor called");
    }
}

class Child extends Parent {
    Child() {
        super();  // Calls parent constructor (optional here)
        System.out.println("Child constructor called");
    }
}

class Main {
    public static void main(String[] args) {
        Child c = new Child();
    }
}
\`\`\`

**Output:**
\`\`\`
Parent constructor called
Child constructor called
\`\`\`

**Example 2: Parameterized Constructor**
\`\`\`java
class Vehicle {
    String brand;

    Vehicle(String brand) {
        this.brand = brand;
        System.out.println("Vehicle: " + brand);
    }
}

class Car extends Vehicle {
    String model;

    Car(String brand, String model) {
        super(brand);  // Must be first statement
        this.model = model;
        System.out.println("Model: " + model);
    }
}

class Main {
    public static void main(String[] args) {
        Car c = new Car("Toyota", "Camry");
    }
}
\`\`\`

**Output:**
\`\`\`
Vehicle: Toyota
Model: Camry
\`\`\`

---

**COMPREHENSIVE EXAMPLE:**

\`\`\`java
class Employee {
    String name;
    int id;

    Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }

    void display() {
        System.out.println("Employee: " + name + " (ID: " + id + ")");
    }
}

class Manager extends Employee {
    String department;
    int teamSize;

    Manager(String name, int id, String department, int teamSize) {
        super(name, id);  // Call parent constructor
        this.department = department;
        this.teamSize = teamSize;
    }

    @Override
    void display() {
        super.display();  // Call parent method
        System.out.println("Department: " + department);
        System.out.println("Team Size: " + teamSize);
    }
}

class Main {
    public static void main(String[] args) {
        Manager m = new Manager("John", 101, "IT", 10);
        m.display();
    }
}
\`\`\`

**Output:**
\`\`\`
Employee: John (ID: 101)
Department: IT
Team Size: 10
\`\`\`

---

**IMPORTANT RULES:**

**1. super() must be the first statement:**
\`\`\`java
Child() {
    System.out.println("Hello");
    super();  // ERROR: super() must be first statement
}
\`\`\`

**Correct way:**
\`\`\`java
Child() {
    super();  // First statement
    System.out.println("Hello");
}
\`\`\`

**2. Implicit super() call:**
If you don't explicitly call \`super()\`, the compiler automatically inserts \`super()\` as the first statement.

\`\`\`java
Child() {
    // Compiler adds: super();
    System.out.println("Child constructor");
}
\`\`\`

**3. Cannot use super in static context:**
\`\`\`java
static void method() {
    super.method();  // ERROR: Cannot use super in static context
}
\`\`\`

**4. Cannot use this() and super() together:**
\`\`\`java
Child() {
    this(10);   // Calls another constructor
    super();    // ERROR: Cannot use both
}
\`\`\`

---

**super vs this COMPARISON:**

| Feature | super | this |
|---------|-------|------|
| Reference | Parent class | Current class |
| Variables | super.variable | this.variable |
| Methods | super.method() | this.method() |
| Constructor | super() | this() |
| Static context | Not allowed | Not allowed |
| First statement | super() must be first | this() must be first |

---

**KEY POINTS:**

✓ \`super\` refers to immediate parent class object
✓ Used to access parent class variables, methods, and constructors
✓ \`super()\` must be first statement in constructor
✓ Compiler automatically adds \`super()\` if not present
✓ Cannot use \`super\` in static methods
✓ Essential for method overriding and constructor chaining
✓ Resolves naming conflicts between parent and child classes`
    },
    {
      id: 26,
      title: 'Define Package and Explain Its Advantages',
      question: 'Define a package and explain its advantages.',
      dueDate: '10/11/2025',
      assignmentDate: '06/10/2025',
      topics: ['Packages', 'Java Organization'],
      description: 'Understanding packages in Java and their benefits.',
      answer: `**Package in Java:**

**Definition:**
A package is a namespace that organizes a set of related classes, interfaces, enumerations, and sub-packages. It acts like a folder/directory structure that groups related Java files together.

**Syntax:**
\`\`\`java
package packageName;

// Class definition follows
public class ClassName {
    // Class body
}
\`\`\`

**Example:**
\`\`\`java
package com.company.project;

public class Employee {
    // Employee class code
}
\`\`\`

---

**TYPES OF PACKAGES:**

**1. Built-in Packages:**
Pre-defined packages provided by Java API:
- \`java.lang\` - Fundamental classes (String, Math, System)
- \`java.util\` - Utility classes (ArrayList, HashMap, Scanner)
- \`java.io\` - Input/Output classes
- \`java.awt\` - GUI components
- \`java.net\` - Networking classes

**2. User-defined Packages:**
Custom packages created by programmers to organize their code.

---

**HOW TO CREATE A PACKAGE:**

**Step 1: Declare the package**
\`\`\`java
// File: Employee.java
package com.company.hr;

public class Employee {
    private String name;
    private int id;

    public Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public void display() {
        System.out.println("Name: " + name + ", ID: " + id);
    }
}
\`\`\`

**Step 2: Compile with package structure**
\`\`\`bash
javac -d . Employee.java
# -d flag creates directory structure: com/company/hr/Employee.class
\`\`\`

**Step 3: Use the package**
\`\`\`java
// File: Main.java
import com.company.hr.Employee;

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee("John", 101);
        emp.display();
    }
}
\`\`\`

---

**ADVANTAGES OF PACKAGES:**

**1. NAME SPACE MANAGEMENT / AVOIDING NAME CONFLICTS:**

Packages prevent naming conflicts by providing unique namespace for classes.

\`\`\`java
// Two different Date classes can coexist
package com.company.utils;
public class Date { }

package com.library.common;
public class Date { }

// Usage:
com.company.utils.Date date1 = new com.company.utils.Date();
com.library.common.Date date2 = new com.library.common.Date();
\`\`\`

Without packages, you cannot have two classes with the same name in one project.

---

**2. ORGANIZING CLASSES:**

Packages provide logical organization and grouping of related classes.

\`\`\`
com.company.project
├── model
│   ├── Employee.java
│   ├── Department.java
│   └── Salary.java
├── service
│   ├── EmployeeService.java
│   └── DepartmentService.java
├── controller
│   └── MainController.java
└── util
    ├── DateUtils.java
    └── StringUtils.java
\`\`\`

**Benefits:**
- Easy to locate classes
- Better project structure
- Clear separation of concerns
- Easier maintenance

---

**3. ACCESS CONTROL / PROTECTION:**

Packages provide an additional layer of access control through access modifiers:

\`\`\`java
package com.company.hr;

public class Employee {
    public String name;        // Accessible everywhere
    protected int id;          // Accessible in package and subclasses
    String department;         // Package-private (default)
    private double salary;     // Only within class
}
\`\`\`

**Access Control Summary:**
- **public:** Accessible from anywhere
- **protected:** Accessible in same package and subclasses
- **default (no modifier):** Accessible only in same package
- **private:** Only within the class

---

**4. CODE REUSABILITY:**

Packages allow classes to be reused across different projects.

\`\`\`java
// Create reusable utility package
package com.utils.math;

public class Calculator {
    public static int add(int a, int b) { return a + b; }
    public static int multiply(int a, int b) { return a * b; }
}

// Use in multiple projects
import com.utils.math.Calculator;

public class Project1 {
    public static void main(String[] args) {
        int result = Calculator.add(10, 20);
    }
}
\`\`\`

---

**5. EASIER SEARCHING AND LOCATING:**

Organized package structure makes it easy to find specific classes.

\`\`\`
Project
├── com.company.model       → Data models
├── com.company.dao         → Database operations
├── com.company.service     → Business logic
└── com.company.controller  → Request handling
\`\`\`

Instead of searching through hundreds of files, you know exactly where to look.

---

**6. PROVIDES UNIQUE IDENTIFICATION:**

Packages ensure classes have unique identities even with same names.

\`\`\`java
// Fully qualified names provide unique identification
com.google.common.collect.List
java.util.List
com.company.custom.List

// All three are different classes
\`\`\`

---

**7. MAINTAINABILITY:**

- **Easier updates:** Changes in one package don't affect others
- **Version control:** Different versions can coexist
- **Team collaboration:** Multiple developers can work on different packages
- **Testing:** Individual packages can be tested separately

---

**8. MODULARITY:**

Packages promote modular programming:

\`\`\`java
// Each module is a separate package
com.ecommerce.authentication
com.ecommerce.cart
com.ecommerce.payment
com.ecommerce.shipping
com.ecommerce.notification
\`\`\`

Each module can be developed, tested, and maintained independently.

---

**IMPORTING PACKAGES:**

**1. Import specific class:**
\`\`\`java
import java.util.ArrayList;
import java.util.HashMap;
\`\`\`

**2. Import all classes from package:**
\`\`\`java
import java.util.*;
\`\`\`

**3. Import static members:**
\`\`\`java
import static java.lang.Math.PI;
import static java.lang.Math.sqrt;

// Use directly without class name
double result = sqrt(25) * PI;
\`\`\`

**4. Fully qualified name (no import needed):**
\`\`\`java
java.util.ArrayList<String> list = new java.util.ArrayList<>();
\`\`\`

---

**PACKAGE NAMING CONVENTIONS:**

1. **All lowercase letters**
2. **Reverse domain name:** com.company.project
3. **Descriptive names:** com.company.inventory.model
4. **Avoid Java keywords**

**Examples:**
- ✓ com.company.project.model
- ✓ org.university.library.service
- ✗ Com.Company.Project (wrong case)
- ✗ com.company.package (package is keyword)

---

**COMPLETE EXAMPLE:**

\`\`\`java
// File: com/company/geometry/Shape.java
package com.company.geometry;

public class Shape {
    protected String name;

    public Shape(String name) {
        this.name = name;
    }

    public void display() {
        System.out.println("Shape: " + name);
    }
}

// File: com/company/geometry/Circle.java
package com.company.geometry;

public class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        super("Circle");
        this.radius = radius;
    }

    public double area() {
        return Math.PI * radius * radius;
    }
}

// File: Main.java
import com.company.geometry.Circle;

public class Main {
    public static void main(String[] args) {
        Circle c = new Circle(5.0);
        c.display();
        System.out.println("Area: " + c.area());
    }
}
\`\`\`

---

**KEY POINTS:**

✓ Packages organize related classes into namespaces
✓ Prevent naming conflicts and provide unique identification
✓ Provide access protection through access modifiers
✓ Promote code reusability and modularity
✓ Follow reverse domain naming convention
✓ Use \`import\` statement to access package classes
✓ \`java.lang\` package is imported by default
✓ Improve project structure and maintainability`
    },
    {
      id: 27,
      title: 'Access Rules for Packages',
      question: 'What are access rules for packages?',
      dueDate: '10/11/2025',
      assignmentDate: '06/10/2025',
      topics: ['Packages', 'Access Modifiers'],
      description: 'Understanding access control rules in Java packages.',
      answer: `**Access Rules for Packages in Java:**

Access rules determine which classes and members (variables, methods, constructors) can access other classes and members across different packages.

---

**FOUR ACCESS MODIFIERS IN JAVA:**

1. **public** - Accessible everywhere
2. **protected** - Accessible in same package and subclasses
3. **default (no modifier)** - Accessible only in same package
4. **private** - Accessible only within the class

---

**ACCESS LEVEL TABLE:**

| Modifier | Same Class | Same Package | Subclass (Different Package) | Other Packages |
|----------|------------|--------------|------------------------------|----------------|
| **public** | ✓ Yes | ✓ Yes | ✓ Yes | ✓ Yes |
| **protected** | ✓ Yes | ✓ Yes | ✓ Yes | ✗ No |
| **default** | ✓ Yes | ✓ Yes | ✗ No | ✗ No |
| **private** | ✓ Yes | ✗ No | ✗ No | ✗ No |

---

**1. PUBLIC ACCESS:**

Classes, methods, and variables declared as \`public\` are accessible from anywhere.

\`\`\`java
// File: com/company/model/Employee.java
package com.company.model;

public class Employee {
    public String name;
    public int id;

    public void display() {
        System.out.println("Name: " + name + ", ID: " + id);
    }
}

// File: com/test/Main.java (different package)
package com.test;

import com.company.model.Employee;

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee();
        emp.name = "John";     // ✓ public variable accessible
        emp.id = 101;          // ✓ public variable accessible
        emp.display();         // ✓ public method accessible
    }
}
\`\`\`

**Rules:**
- ✓ Accessible from any package
- ✓ Must be imported (except java.lang)
- ✓ Only one public class per .java file
- ✓ Public class name must match file name

---

**2. PROTECTED ACCESS:**

Protected members are accessible in:
- Same package (all classes)
- Subclasses in different packages

\`\`\`java
// File: com/company/model/Person.java
package com.company.model;

public class Person {
    protected String name;
    protected int age;

    protected void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

// File: com/company/model/Test.java (same package)
package com.company.model;

public class Test {
    public static void main(String[] args) {
        Person p = new Person();
        p.name = "Alice";    // ✓ Accessible (same package)
        p.age = 25;          // ✓ Accessible (same package)
        p.display();         // ✓ Accessible (same package)
    }
}

// File: com/test/Employee.java (different package, subclass)
package com.test;

import com.company.model.Person;

public class Employee extends Person {
    public void setDetails() {
        name = "Bob";        // ✓ Accessible (subclass)
        age = 30;            // ✓ Accessible (subclass)
        display();           // ✓ Accessible (subclass)
    }
}

// File: com/test/Main.java (different package, not a subclass)
package com.test;

import com.company.model.Person;

public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        p.name = "Charlie";  // ✗ ERROR: Not accessible (different package, not subclass)
        p.age = 35;          // ✗ ERROR: Not accessible
        p.display();         // ✗ ERROR: Not accessible
    }
}
\`\`\`

**Rules:**
- ✓ Accessible in same package
- ✓ Accessible in subclass (different package)
- ✗ Not accessible in non-subclass (different package)

---

**3. DEFAULT (PACKAGE-PRIVATE) ACCESS:**

When no access modifier is specified, it has default access (package-private). Accessible only within the same package.

\`\`\`java
// File: com/company/model/Department.java
package com.company.model;

class Department {  // Default access (no public)
    String name;    // Default access
    int code;       // Default access

    void display() {  // Default access
        System.out.println("Department: " + name + ", Code: " + code);
    }
}

// File: com/company/model/Test.java (same package)
package com.company.model;

public class Test {
    public static void main(String[] args) {
        Department dept = new Department();  // ✓ Accessible (same package)
        dept.name = "IT";                    // ✓ Accessible (same package)
        dept.code = 101;                     // ✓ Accessible (same package)
        dept.display();                      // ✓ Accessible (same package)
    }
}

// File: com/test/Main.java (different package)
package com.test;

import com.company.model.Department;  // ✗ ERROR: Department not visible

public class Main {
    public static void main(String[] args) {
        Department dept = new Department();  // ✗ ERROR: Cannot access
        dept.name = "HR";                    // ✗ ERROR: Cannot access
        dept.display();                      // ✗ ERROR: Cannot access
    }
}
\`\`\`

**Rules:**
- ✓ Accessible only in same package
- ✗ Not accessible in different packages
- ✗ Even subclasses in different packages cannot access
- Default for classes that are not public

---

**4. PRIVATE ACCESS:**

Private members are accessible only within the same class.

\`\`\`java
// File: com/company/model/Account.java
package com.company.model;

public class Account {
    private String accountNumber;
    private double balance;

    public Account(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    // Public getter/setter to access private members
    public String getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    private void internalCalculation() {
        // Only accessible within this class
        balance = balance * 1.05;
    }

    public void updateBalance() {
        internalCalculation();  // ✓ Accessible within same class
    }
}

// File: com/test/Main.java
package com.test;

import com.company.model.Account;

public class Main {
    public static void main(String[] args) {
        Account acc = new Account("ACC123", 1000);

        System.out.println(acc.getAccountNumber());  // ✓ Public method
        System.out.println(acc.getBalance());        // ✓ Public method

        // acc.accountNumber;     // ✗ ERROR: Private variable
        // acc.balance;           // ✗ ERROR: Private variable
        // acc.internalCalculation();  // ✗ ERROR: Private method

        acc.updateBalance();     // ✓ Public method
    }
}
\`\`\`

**Rules:**
- ✓ Accessible only within the same class
- ✗ Not accessible in subclasses
- ✗ Not accessible in same package
- ✗ Not accessible anywhere outside the class

---

**CLASS-LEVEL ACCESS RULES:**

**For Top-Level Classes:**

\`\`\`java
// Only two access levels for top-level classes:

// 1. Public class
public class MyClass {  // ✓ Can be accessed from anywhere
}

// 2. Default (package-private) class
class MyClass {  // ✓ Can be accessed only in same package
}

// ERROR: Cannot use protected or private for top-level classes
protected class MyClass {  // ✗ ERROR
}

private class MyClass {  // ✗ ERROR
}
\`\`\`

**For Nested Classes:**
Nested classes can use all four access modifiers.

\`\`\`java
public class Outer {
    public class PublicInner { }       // ✓ Accessible everywhere
    protected class ProtectedInner { } // ✓ Accessible in package and subclasses
    class DefaultInner { }             // ✓ Accessible in same package
    private class PrivateInner { }     // ✓ Accessible only in Outer class
}
\`\`\`

---

**COMPREHENSIVE EXAMPLE:**

\`\`\`java
// File: com/company/model/BankAccount.java
package com.company.model;

public class BankAccount {
    public String bankName;          // Accessible everywhere
    protected String accountType;    // Same package + subclasses
    String branchCode;               // Same package only (default)
    private double balance;          // Same class only

    public BankAccount(String bankName, String accountType,
                       String branchCode, double balance) {
        this.bankName = bankName;
        this.accountType = accountType;
        this.branchCode = branchCode;
        this.balance = balance;
    }

    public void deposit(double amount) {
        balance += amount;  // ✓ Private variable accessible in same class
    }

    private void validateTransaction() {
        // Private method - internal use only
    }

    protected void processInterest() {
        // Protected - available to subclasses
        balance *= 1.05;
    }
}

// File: com/company/model/Test.java (same package)
package com.company.model;

public class Test {
    public void test() {
        BankAccount acc = new BankAccount("SBI", "Savings", "BR001", 1000);

        System.out.println(acc.bankName);      // ✓ public
        System.out.println(acc.accountType);   // ✓ protected (same package)
        System.out.println(acc.branchCode);    // ✓ default (same package)
        // System.out.println(acc.balance);    // ✗ private

        acc.deposit(500);                      // ✓ public method
        acc.processInterest();                 // ✓ protected (same package)
        // acc.validateTransaction();          // ✗ private method
    }
}

// File: com/test/SavingsAccount.java (different package, subclass)
package com.test;

import com.company.model.BankAccount;

public class SavingsAccount extends BankAccount {
    public SavingsAccount() {
        super("ICICI", "Savings", "BR002", 2000);
    }

    public void test() {
        System.out.println(bankName);        // ✓ public
        System.out.println(accountType);     // ✓ protected (subclass)
        // System.out.println(branchCode);   // ✗ default (different package)
        // System.out.println(balance);      // ✗ private

        deposit(1000);                       // ✓ public method
        processInterest();                   // ✓ protected method (subclass)
        // validateTransaction();            // ✗ private method
    }
}

// File: com/test/Main.java (different package, not subclass)
package com.test;

import com.company.model.BankAccount;

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("HDFC", "Current", "BR003", 5000);

        System.out.println(acc.bankName);    // ✓ public
        // System.out.println(acc.accountType);  // ✗ protected (different package)
        // System.out.println(acc.branchCode);   // ✗ default (different package)
        // System.out.println(acc.balance);      // ✗ private

        acc.deposit(2000);                   // ✓ public method
        // acc.processInterest();            // ✗ protected (different package, not subclass)
        // acc.validateTransaction();        // ✗ private method
    }
}
\`\`\`

---

**BEST PRACTICES:**

1. **Use private by default** - Provide maximum encapsulation
2. **Use public for API** - Only expose what's necessary
3. **Use protected for inheritance** - When subclasses need access
4. **Avoid default access** - Be explicit with access modifiers
5. **Follow least privilege principle** - Give minimum access required

---

**KEY POINTS:**

✓ Four access modifiers: public, protected, default, private
✓ public: Accessible everywhere
✓ protected: Same package + subclasses in different packages
✓ default: Same package only
✓ private: Same class only
✓ Top-level classes: only public or default
✓ Nested classes: all four modifiers allowed
✓ Access control provides encapsulation and security`
    },
    {
      id: 28,
      title: 'Explain Class Hiding in Packages',
      question: 'Explain the concept of class hiding in packages.',
      dueDate: '10/11/2025',
      assignmentDate: '06/10/2025',
      topics: ['Packages', 'Class Hiding', 'Encapsulation'],
      description: 'Understanding how classes can be hidden within packages.',
      answer: `**Class Hiding in Packages:**

**Definition:**
Class hiding refers to the practice of restricting access to classes by not declaring them as \`public\`. When a class is not declared public, it becomes package-private (default access), making it accessible only within its own package. This hides the class from other packages.

**Purpose:**
- Encapsulation at package level
- Hide implementation details
- Prevent unauthorized access
- Provide internal utility classes
- Reduce public API surface

---

**HOW CLASS HIDING WORKS:**

**1. PUBLIC CLASS (Visible to All Packages):**

\`\`\`java
// File: com/company/model/Employee.java
package com.company.model;

public class Employee {  // PUBLIC - Visible everywhere
    private String name;
    private int id;

    public Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public void display() {
        System.out.println("Name: " + name + ", ID: " + id);
    }
}

// File: com/test/Main.java (different package)
package com.test;

import com.company.model.Employee;  // ✓ Can import public class

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee("John", 101);  // ✓ Accessible
        emp.display();
    }
}
\`\`\`

---

**2. PACKAGE-PRIVATE CLASS (Hidden from Other Packages):**

\`\`\`java
// File: com/company/model/EmployeeValidator.java
package com.company.model;

class EmployeeValidator {  // NO 'public' - HIDDEN from other packages

    static boolean isValidId(int id) {
        return id > 0 && id < 10000;
    }

    static boolean isValidName(String name) {
        return name != null && !name.trim().isEmpty();
    }
}

// File: com/company/model/Employee.java (same package)
package com.company.model;

public class Employee {
    private String name;
    private int id;

    public Employee(String name, int id) {
        // ✓ Can use EmployeeValidator (same package)
        if (!EmployeeValidator.isValidName(name)) {
            throw new IllegalArgumentException("Invalid name");
        }
        if (!EmployeeValidator.isValidId(id)) {
            throw new IllegalArgumentException("Invalid ID");
        }

        this.name = name;
        this.id = id;
    }
}

// File: com/test/Main.java (different package)
package com.test;

import com.company.model.Employee;
import com.company.model.EmployeeValidator;  // ✗ ERROR: Not visible

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee("John", 101);  // ✓ Works

        // ✗ ERROR: Cannot access EmployeeValidator (hidden class)
        // boolean valid = EmployeeValidator.isValidId(101);
    }
}
\`\`\`

---

**WHY USE CLASS HIDING:**

**1. HIDE IMPLEMENTATION DETAILS:**

\`\`\`java
// File: com/company/util/StringProcessor.java
package com.company.util;

// Public API - Exposed to users
public class StringProcessor {
    public static String process(String input) {
        // Use hidden helper classes internally
        input = StringCleaner.clean(input);
        input = StringFormatter.format(input);
        input = StringValidator.validate(input);
        return input;
    }
}

// Hidden helper class 1
class StringCleaner {
    static String clean(String s) {
        return s.trim().replaceAll("\\s+", " ");
    }
}

// Hidden helper class 2
class StringFormatter {
    static String format(String s) {
        return s.toLowerCase();
    }
}

// Hidden helper class 3
class StringValidator {
    static String validate(String s) {
        if (s == null || s.isEmpty()) {
            throw new IllegalArgumentException("Invalid string");
        }
        return s;
    }
}

// Users only see StringProcessor, not the helper classes
\`\`\`

---

**2. REDUCE PUBLIC API SURFACE:**

\`\`\`java
// File: com/company/database/DatabaseManager.java
package com.company.database;

// Public API - What users interact with
public class DatabaseManager {
    private ConnectionPool pool;
    private QueryBuilder builder;

    public DatabaseManager() {
        this.pool = new ConnectionPool();
        this.builder = new QueryBuilder();
    }

    public void executeQuery(String sql) {
        // Implementation using hidden classes
        Connection conn = pool.getConnection();
        Query query = builder.build(sql);
        query.execute(conn);
        pool.releaseConnection(conn);
    }
}

// Hidden - Internal implementation
class ConnectionPool {
    Connection getConnection() { /* ... */ return null; }
    void releaseConnection(Connection c) { /* ... */ }
}

// Hidden - Internal implementation
class QueryBuilder {
    Query build(String sql) { /* ... */ return null; }
}

// Hidden - Internal implementation
class Query {
    void execute(Connection c) { /* ... */ }
}

// Hidden - Internal implementation
class Connection {
    // Connection details
}

// Users only use DatabaseManager, all other classes are hidden
\`\`\`

---

**3. PREVENT MISUSE:**

\`\`\`java
// File: com/company/security/PasswordManager.java
package com.company.security;

public class PasswordManager {
    public static String hashPassword(String password) {
        // Use hidden encryption class
        return PasswordEncryptor.encrypt(password);
    }

    public static boolean verifyPassword(String password, String hash) {
        return PasswordEncryptor.verify(password, hash);
    }
}

// Hidden - Prevents direct access to encryption methods
class PasswordEncryptor {
    private static final String SALT = "secret_salt";

    static String encrypt(String password) {
        // Complex encryption logic
        return password + SALT;  // Simplified
    }

    static boolean verify(String password, String hash) {
        return encrypt(password).equals(hash);
    }
}

// Users cannot directly call PasswordEncryptor methods
// They must use PasswordManager (which enforces proper usage)
\`\`\`

---

**MULTIPLE CLASSES IN ONE FILE:**

Java allows multiple classes in one file, but only ONE can be public, and it must match the filename.

\`\`\`java
// File: Calculator.java
package com.company.math;

// Public class - Must match filename
public class Calculator {
    public int add(int a, int b) {
        return MathHelper.sum(a, b);
    }

    public int multiply(int a, int b) {
        return MathHelper.product(a, b);
    }
}

// Hidden class in same file - Not accessible outside package
class MathHelper {
    static int sum(int a, int b) {
        return a + b;
    }

    static int product(int a, int b) {
        return a * b;
    }
}

// Another hidden class - Not accessible outside package
class MathValidator {
    static boolean isValid(int num) {
        return num >= 0;
    }
}
\`\`\`

**Rules:**
- Only ONE public class per file
- Public class name must match filename
- Other classes in file are package-private (hidden)
- Hidden classes can only be accessed within same package

---

**COMPREHENSIVE EXAMPLE:**

\`\`\`java
// File: com/company/banking/BankAccount.java
package com.company.banking;

// PUBLIC CLASS - Accessible from anywhere
public class BankAccount {
    private String accountNumber;
    private double balance;
    private TransactionLogger logger;  // Uses hidden class

    public BankAccount(String accountNumber, double initialBalance) {
        // Validate using hidden validator
        if (!AccountValidator.isValidAccountNumber(accountNumber)) {
            throw new IllegalArgumentException("Invalid account number");
        }

        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.logger = new TransactionLogger();

        logger.log("Account created: " + accountNumber);
    }

    public void deposit(double amount) {
        if (!AccountValidator.isValidAmount(amount)) {
            throw new IllegalArgumentException("Invalid amount");
        }

        balance += amount;
        logger.log("Deposited: " + amount);
    }

    public void withdraw(double amount) {
        if (!AccountValidator.isValidAmount(amount)) {
            throw new IllegalArgumentException("Invalid amount");
        }

        if (balance >= amount) {
            balance -= amount;
            logger.log("Withdrawn: " + amount);
        } else {
            throw new IllegalArgumentException("Insufficient balance");
        }
    }

    public double getBalance() {
        return balance;
    }
}

// HIDDEN CLASS - Package-private
class AccountValidator {
    static boolean isValidAccountNumber(String accNum) {
        return accNum != null && accNum.length() == 10;
    }

    static boolean isValidAmount(double amount) {
        return amount > 0;
    }
}

// HIDDEN CLASS - Package-private
class TransactionLogger {
    void log(String message) {
        System.out.println("[LOG] " + message);
    }
}

// File: com/company/banking/SavingsAccount.java (same package)
package com.company.banking;

public class SavingsAccount extends BankAccount {
    public SavingsAccount(String accountNumber, double balance) {
        super(accountNumber, balance);
    }

    public void addInterest() {
        // ✓ Can use hidden classes (same package)
        if (AccountValidator.isValidAmount(getBalance())) {
            deposit(getBalance() * 0.05);
        }
    }
}

// File: com/test/Main.java (different package)
package com.test;

import com.company.banking.BankAccount;
import com.company.banking.SavingsAccount;
// import com.company.banking.AccountValidator;    // ✗ ERROR: Not visible
// import com.company.banking.TransactionLogger;  // ✗ ERROR: Not visible

public class Main {
    public static void main(String[] args) {
        // ✓ Can use public classes
        BankAccount acc = new BankAccount("1234567890", 1000);
        acc.deposit(500);
        acc.withdraw(200);
        System.out.println("Balance: " + acc.getBalance());

        // ✗ Cannot access hidden classes
        // AccountValidator.isValidAccountNumber("123");  // ERROR
        // TransactionLogger logger = new TransactionLogger();  // ERROR
    }
}
\`\`\`

**Output:**
\`\`\`
[LOG] Account created: 1234567890
[LOG] Deposited: 500.0
[LOG] Withdrawn: 200.0
Balance: 1300.0
\`\`\`

---

**BENEFITS OF CLASS HIDING:**

1. **Encapsulation:** Hide internal implementation
2. **Security:** Prevent unauthorized access
3. **Flexibility:** Change hidden classes without affecting users
4. **Simplicity:** Users see only what they need
5. **Maintainability:** Easier to refactor internal code
6. **API Control:** Prevent users from depending on internal classes

---

**WHEN TO USE CLASS HIDING:**

✓ **Use hidden classes for:**
- Helper/utility classes used internally
- Implementation details
- Internal data structures
- Validators, formatters, converters
- Classes that should not be part of public API

✗ **Don't hide classes that:**
- Are part of public API
- Need to be extended by users
- Are meant for external use
- Are part of documentation

---

**KEY POINTS:**

✓ Package-private classes (no public modifier) are hidden from other packages
✓ Hidden classes accessible only within same package
✓ Helps encapsulate implementation details
✓ Reduces public API surface
✓ Only one public class allowed per file
✓ Public class name must match filename
✓ Multiple hidden classes can exist in one file
✓ Improves security and maintainability
✓ Prevents misuse of internal implementation`
    },
    {
      id: 29,
      title: 'What is an Abstract Class',
      question: 'What is an abstract class? How is it different from a concrete class?',
      dueDate: '10/11/2025',
      assignmentDate: '06/10/2025',
      topics: ['Abstract Class', 'OOP Concepts'],
      description: 'Understanding abstract classes and their differences from concrete classes.',
      answer: `**Abstract Class in Java:**

**Definition:**
An abstract class is a class that is declared using the \`abstract\` keyword and cannot be instantiated (cannot create objects directly). It may contain both abstract methods (without implementation) and concrete methods (with implementation). It serves as a base class for other classes to extend.

**Syntax:**
\`\`\`java
abstract class ClassName {
    // Abstract method (no body)
    abstract returnType methodName();

    // Concrete method (with body)
    returnType methodName() {
        // Implementation
    }
}
\`\`\`

---

**KEY CHARACTERISTICS OF ABSTRACT CLASS:**

1. **Cannot be instantiated**
2. **May contain abstract methods** (without body)
3. **May contain concrete methods** (with body)
4. **Can have constructors**
5. **Can have instance variables**
6. **Can have static methods and variables**
7. **Subclass must implement all abstract methods** (or be abstract itself)
8. **Uses \`extends\` keyword for inheritance**

---

**EXAMPLE 1: Basic Abstract Class**

\`\`\`java
// Abstract class
abstract class Animal {
    String name;

    // Constructor
    Animal(String name) {
        this.name = name;
    }

    // Abstract method (no implementation)
    abstract void sound();

    // Concrete method (with implementation)
    void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Concrete class extending abstract class
class Dog extends Animal {
    Dog(String name) {
        super(name);
    }

    // Must implement abstract method
    @Override
    void sound() {
        System.out.println(name + " says: Woof!");
    }
}

class Cat extends Animal {
    Cat(String name) {
        super(name);
    }

    @Override
    void sound() {
        System.out.println(name + " says: Meow!");
    }
}

// Usage
class Main {
    public static void main(String[] args) {
        // Animal a = new Animal("Generic");  // ✗ ERROR: Cannot instantiate

        Animal dog = new Dog("Buddy");
        dog.sound();   // Woof!
        dog.sleep();   // Buddy is sleeping

        Animal cat = new Cat("Whiskers");
        cat.sound();   // Meow!
        cat.sleep();   // Whiskers is sleeping
    }
}
\`\`\`

**Output:**
\`\`\`
Buddy says: Woof!
Buddy is sleeping
Whiskers says: Meow!
Whiskers is sleeping
\`\`\`

---

**EXAMPLE 2: Abstract Class with Multiple Methods**

\`\`\`java
abstract class Shape {
    String color;

    // Constructor
    Shape(String color) {
        this.color = color;
    }

    // Abstract methods (must be implemented by subclasses)
    abstract double area();
    abstract double perimeter();

    // Concrete method (inherited by all subclasses)
    void displayColor() {
        System.out.println("Color: " + color);
    }
}

class Circle extends Shape {
    double radius;

    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    double area() {
        return Math.PI * radius * radius;
    }

    @Override
    double perimeter() {
        return 2 * Math.PI * radius;
    }
}

class Rectangle extends Shape {
    double length, width;

    Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
    }

    @Override
    double area() {
        return length * width;
    }

    @Override
    double perimeter() {
        return 2 * (length + width);
    }
}

// Usage
class Main {
    public static void main(String[] args) {
        Shape circle = new Circle("Red", 5.0);
        circle.displayColor();
        System.out.println("Area: " + circle.area());
        System.out.println("Perimeter: " + circle.perimeter());

        System.out.println();

        Shape rectangle = new Rectangle("Blue", 4.0, 6.0);
        rectangle.displayColor();
        System.out.println("Area: " + rectangle.area());
        System.out.println("Perimeter: " + rectangle.perimeter());
    }
}
\`\`\`

**Output:**
\`\`\`
Color: Red
Area: 78.53981633974483
Perimeter: 31.41592653589793

Color: Blue
Area: 24.0
Perimeter: 20.0
\`\`\`

---

**CONCRETE CLASS:**

**Definition:**
A concrete class is a regular class that can be instantiated (objects can be created). It contains only complete method implementations (no abstract methods).

**Example:**
\`\`\`java
class Student {  // Concrete class
    String name;
    int rollNo;

    Student(String name, int rollNo) {
        this.name = name;
        this.rollNo = rollNo;
    }

    void display() {
        System.out.println("Name: " + name + ", Roll No: " + rollNo);
    }
}

// Usage
class Main {
    public static void main(String[] args) {
        Student s = new Student("John", 101);  // ✓ Can instantiate
        s.display();
    }
}
\`\`\`

---

**ABSTRACT CLASS vs CONCRETE CLASS:**

| Feature | Abstract Class | Concrete Class |
|---------|----------------|----------------|
| **Instantiation** | Cannot create objects | Can create objects |
| **Keyword** | Uses \`abstract\` keyword | No special keyword |
| **Abstract Methods** | Can have abstract methods | Cannot have abstract methods |
| **Concrete Methods** | Can have concrete methods | All methods are concrete |
| **Implementation** | Partial or no implementation | Complete implementation |
| **Purpose** | Base class for inheritance | Can be used directly |
| **Constructor** | Can have constructor | Can have constructor |
| **Usage** | Must be extended | Can be used as-is |
| **0-100% abstraction** | 0-100% abstraction | 0% abstraction |

---

**DETAILED COMPARISON EXAMPLE:**

\`\`\`java
// ABSTRACT CLASS
abstract class Vehicle {
    String brand;

    // Constructor
    Vehicle(String brand) {
        this.brand = brand;
    }

    // Abstract method (no implementation)
    abstract void start();

    // Concrete method (with implementation)
    void stop() {
        System.out.println(brand + " stopped");
    }
}

// CONCRETE CLASS extending abstract class
class Car extends Vehicle {
    Car(String brand) {
        super(brand);
    }

    // Must implement abstract method
    @Override
    void start() {
        System.out.println(brand + " car started with key");
    }
}

// CONCRETE CLASS (independent)
class Bicycle {
    String brand;

    Bicycle(String brand) {
        this.brand = brand;
    }

    // All methods have implementation
    void start() {
        System.out.println(brand + " bicycle started pedaling");
    }

    void stop() {
        System.out.println(brand + " bicycle stopped");
    }
}

// Usage
class Main {
    public static void main(String[] args) {
        // Vehicle v = new Vehicle("Generic");  // ✗ ERROR: Abstract class

        Vehicle car = new Car("Toyota");  // ✓ Concrete class
        car.start();
        car.stop();

        Bicycle bike = new Bicycle("Atlas");  // ✓ Concrete class
        bike.start();
        bike.stop();
    }
}
\`\`\`

**Output:**
\`\`\`
Toyota car started with key
Toyota stopped
Atlas bicycle started pedaling
Atlas bicycle stopped
\`\`\`

---

**WHEN TO USE ABSTRACT CLASS:**

**Use Abstract Class When:**

1. **Common base with partial implementation:**
\`\`\`java
abstract class Employee {
    String name;
    double baseSalary;

    abstract double calculateSalary();  // Different for each type

    void display() {  // Common for all
        System.out.println("Name: " + name);
    }
}
\`\`\`

2. **Force subclasses to implement certain methods:**
\`\`\`java
abstract class Database {
    abstract void connect();
    abstract void disconnect();
    // Subclasses MUST implement these
}
\`\`\`

3. **Share code among related classes:**
\`\`\`java
abstract class Animal {
    void breathe() { }  // Common implementation
    abstract void move();  // Different for each animal
}
\`\`\`

**Use Concrete Class When:**

1. **Complete implementation is provided**
2. **No need for inheritance hierarchy**
3. **Class can be used directly**
4. **No abstract behavior needed**

---

**IMPORTANT RULES:**

**1. Cannot instantiate abstract class:**
\`\`\`java
abstract class Test {
    abstract void show();
}

Test t = new Test();  // ✗ ERROR: Cannot instantiate
\`\`\`

**2. Subclass must implement all abstract methods:**
\`\`\`java
abstract class Parent {
    abstract void method1();
    abstract void method2();
}

class Child extends Parent {
    // Must implement both methods
    void method1() { }
    void method2() { }
}
\`\`\`

**3. Or subclass must also be abstract:**
\`\`\`java
abstract class Parent {
    abstract void method1();
    abstract void method2();
}

abstract class Child extends Parent {
    // Implements only one method
    void method1() { }
    // method2() still abstract
}

class GrandChild extends Child {
    // Must implement remaining abstract methods
    void method2() { }
}
\`\`\`

**4. Abstract class can have constructors:**
\`\`\`java
abstract class Parent {
    Parent() {
        System.out.println("Parent constructor");
    }
}

class Child extends Parent {
    Child() {
        super();  // Calls parent constructor
        System.out.println("Child constructor");
    }
}
\`\`\`

**5. Abstract class can have static methods:**
\`\`\`java
abstract class MathUtils {
    static int add(int a, int b) {
        return a + b;
    }
}

// Can call static method without instantiation
int result = MathUtils.add(5, 10);
\`\`\`

**6. Abstract method cannot be private:**
\`\`\`java
abstract class Test {
    private abstract void method();  // ✗ ERROR: Cannot be private
}
\`\`\`

**7. Abstract method cannot be final:**
\`\`\`java
abstract class Test {
    final abstract void method();  // ✗ ERROR: Cannot be final
}
\`\`\`

**8. Abstract method cannot be static:**
\`\`\`java
abstract class Test {
    static abstract void method();  // ✗ ERROR: Cannot be static
}
\`\`\`

---

**COMPREHENSIVE EXAMPLE:**

\`\`\`java
abstract class BankAccount {
    protected String accountNumber;
    protected String holderName;
    protected double balance;

    // Constructor
    BankAccount(String accountNumber, String holderName, double balance) {
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.balance = balance;
    }

    // Abstract methods (must be implemented by subclasses)
    abstract void calculateInterest();
    abstract double getMinimumBalance();

    // Concrete methods (inherited by all subclasses)
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: " + amount);
        }
    }

    void withdraw(double amount) {
        if (amount > 0 && balance - amount >= getMinimumBalance()) {
            balance -= amount;
            System.out.println("Withdrawn: " + amount);
        } else {
            System.out.println("Insufficient balance or below minimum");
        }
    }

    void displayInfo() {
        System.out.println("Account: " + accountNumber);
        System.out.println("Holder: " + holderName);
        System.out.println("Balance: " + balance);
    }
}

class SavingsAccount extends BankAccount {
    SavingsAccount(String accountNumber, String holderName, double balance) {
        super(accountNumber, holderName, balance);
    }

    @Override
    void calculateInterest() {
        double interest = balance * 0.04;  // 4% interest
        balance += interest;
        System.out.println("Interest added: " + interest);
    }

    @Override
    double getMinimumBalance() {
        return 1000.0;
    }
}

class CurrentAccount extends BankAccount {
    CurrentAccount(String accountNumber, String holderName, double balance) {
        super(accountNumber, holderName, balance);
    }

    @Override
    void calculateInterest() {
        // No interest for current account
        System.out.println("No interest for current account");
    }

    @Override
    double getMinimumBalance() {
        return 5000.0;
    }
}

// Usage
class Main {
    public static void main(String[] args) {
        BankAccount savings = new SavingsAccount("SA001", "Alice", 10000);
        savings.displayInfo();
        savings.deposit(2000);
        savings.calculateInterest();
        savings.withdraw(3000);
        savings.displayInfo();

        System.out.println("\\n---\\n");

        BankAccount current = new CurrentAccount("CA001", "Bob", 20000);
        current.displayInfo();
        current.deposit(5000);
        current.calculateInterest();
        current.withdraw(10000);
        current.displayInfo();
    }
}
\`\`\`

---

**KEY POINTS:**

✓ Abstract class cannot be instantiated
✓ Can have both abstract and concrete methods
✓ Subclasses must implement all abstract methods
✓ Can have constructors, variables, and static methods
✓ Provides 0-100% abstraction
✓ Uses \`extends\` keyword for inheritance
✓ Concrete class has complete implementation
✓ Concrete class can be instantiated directly
✓ Abstract classes are used for inheritance hierarchy
✓ Concrete classes are used for creating objects`
    },
    {
      id: 30,
      title: 'Can a final Class be Inherited',
      question: 'Can a final class be inherited? Why or why not?',
      dueDate: '10/11/2025',
      assignmentDate: '06/10/2025',
      topics: ['final keyword', 'Inheritance'],
      description: 'Understanding the final keyword with classes and inheritance.',
      answer: `**Can a final Class be Inherited?**

**Answer: NO**

A \`final\` class **CANNOT** be inherited. When a class is declared as \`final\`, it becomes the end of the inheritance chain, and no other class can extend it.

---

**WHY final CLASSES CANNOT BE INHERITED:**

**1. Design Intent:**
The \`final\` keyword explicitly declares that the class is complete and should not be modified through inheritance.

**2. Security:**
Prevents malicious or unintended modification of critical class behavior.

**3. Immutability:**
Ensures the class implementation remains unchanged.

**4. Performance:**
The JVM can optimize final classes better since their methods cannot be overridden.

**5. API Stability:**
Prevents breaking changes in well-defined classes.

---

**SYNTAX:**

\`\`\`java
final class ClassName {
    // Class members
}
\`\`\`

---

**EXAMPLE 1: Cannot Inherit final Class**

\`\`\`java
// Declaring a final class
final class Vehicle {
    String brand;

    Vehicle(String brand) {
        this.brand = brand;
    }

    void display() {
        System.out.println("Brand: " + brand);
    }
}

// Trying to inherit final class
class Car extends Vehicle {  // ✗ COMPILATION ERROR
    Car(String brand) {
        super(brand);
    }
}
\`\`\`

**Error Message:**
\`\`\`
error: cannot inherit from final Vehicle
class Car extends Vehicle {
                  ^
\`\`\`

---

**EXAMPLE 2: Final Class Works Independently**

\`\`\`java
// Final class
final class MathUtils {
    static final double PI = 3.14159;

    static double calculateArea(double radius) {
        return PI * radius * radius;
    }

    static double calculateCircumference(double radius) {
        return 2 * PI * radius;
    }
}

// Usage
class Main {
    public static void main(String[] args) {
        // ✓ Can use final class directly
        double area = MathUtils.calculateArea(5.0);
        double circumference = MathUtils.calculateCircumference(5.0);

        System.out.println("Area: " + area);
        System.out.println("Circumference: " + circumference);

        // ✗ Cannot extend
        // class MyMath extends MathUtils { }  // ERROR
    }
}
\`\`\`

**Output:**
\`\`\`
Area: 78.53975
Circumference: 31.4159
\`\`\`

---

**REAL-WORLD EXAMPLES OF final CLASSES IN JAVA:**

**1. String Class:**
\`\`\`java
public final class String {
    // String implementation
}

// Cannot extend String
class MyString extends String {  // ✗ ERROR
}
\`\`\`

**Why String is final:**
- Ensures immutability
- Security (prevents malicious overriding)
- String pool optimization
- Thread safety

---

**2. Wrapper Classes:**
\`\`\`java
public final class Integer {
    // Integer implementation
}

public final class Double {
    // Double implementation
}

// Cannot extend wrapper classes
class MyInteger extends Integer {  // ✗ ERROR
}
\`\`\`

**Why wrapper classes are final:**
- Ensures consistent behavior
- Prevents modification of primitive wrappers
- Maintains immutability

---

**3. System Class:**
\`\`\`java
public final class System {
    // System implementation
}

// Cannot extend System
class MySystem extends System {  // ✗ ERROR
}
\`\`\`

---

**WHEN TO USE final CLASSES:**

**1. UTILITY CLASSES:**
\`\`\`java
final class StringUtils {
    // Private constructor to prevent instantiation
    private StringUtils() { }

    static String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    static String reverse(String str) {
        return new StringBuilder(str).reverse().toString();
    }
}

// Usage
String result = StringUtils.capitalize("hello");
\`\`\`

---

**2. IMMUTABLE CLASSES:**
\`\`\`java
final class ImmutablePoint {
    private final int x;
    private final int y;

    ImmutablePoint(int x, int y) {
        this.x = x;
        this.y = y;
    }

    int getX() { return x; }
    int getY() { return y; }

    // No setters - immutable
}

// Cannot extend to add mutable behavior
\`\`\`

---

**3. SECURITY-CRITICAL CLASSES:**
\`\`\`java
final class PasswordEncryptor {
    private static final String SECRET_KEY = "secret123";

    static String encrypt(String password) {
        // Encryption logic
        return password + SECRET_KEY;
    }

    static boolean verify(String password, String encrypted) {
        return encrypt(password).equals(encrypted);
    }
}

// Cannot be extended to override security logic
\`\`\`

---

**4. CONSTANT CLASSES:**
\`\`\`java
final class AppConstants {
    static final String APP_NAME = "MyApp";
    static final String VERSION = "1.0.0";
    static final int MAX_USERS = 1000;

    private AppConstants() { }  // Prevent instantiation
}

// Cannot be extended
\`\`\`

---

**final CLASS vs final METHOD vs final VARIABLE:**

| Feature | final Class | final Method | final Variable |
|---------|-------------|--------------|----------------|
| **Cannot be** | Inherited | Overridden | Modified |
| **Purpose** | Prevent inheritance | Prevent overriding | Create constant |
| **Scope** | Class level | Method level | Variable level |
| **Example** | \`final class A\` | \`final void show()\` | \`final int x = 10\` |

---

**COMPREHENSIVE EXAMPLE:**

\`\`\`java
// Final class - Complete implementation, no inheritance allowed
final class CreditCardValidator {
    private static final int CARD_LENGTH = 16;

    // Private constructor - cannot instantiate
    private CreditCardValidator() { }

    // Validate card number
    static boolean isValidCardNumber(String cardNumber) {
        if (cardNumber == null || cardNumber.length() != CARD_LENGTH) {
            return false;
        }

        for (char c : cardNumber.toCharArray()) {
            if (!Character.isDigit(c)) {
                return false;
            }
        }

        return true;
    }

    // Validate CVV
    static boolean isValidCVV(String cvv) {
        return cvv != null && cvv.length() == 3 && cvv.matches("\\\\d{3}");
    }

    // Validate expiry date
    static boolean isValidExpiry(int month, int year) {
        return month >= 1 && month <= 12 && year >= 2025;
    }
}

// Usage
class PaymentProcessor {
    void processPayment(String cardNumber, String cvv, int month, int year) {
        if (!CreditCardValidator.isValidCardNumber(cardNumber)) {
            System.out.println("Invalid card number");
            return;
        }

        if (!CreditCardValidator.isValidCVV(cvv)) {
            System.out.println("Invalid CVV");
            return;
        }

        if (!CreditCardValidator.isValidExpiry(month, year)) {
            System.out.println("Invalid expiry date");
            return;
        }

        System.out.println("Payment processed successfully");
    }
}

// Cannot extend CreditCardValidator
// class CustomValidator extends CreditCardValidator { }  // ✗ ERROR

class Main {
    public static void main(String[] args) {
        PaymentProcessor processor = new PaymentProcessor();
        processor.processPayment("1234567890123456", "123", 12, 2025);
    }
}
\`\`\`

**Output:**
\`\`\`
Payment processed successfully
\`\`\`

---

**ADVANTAGES OF final CLASSES:**

**1. Security:**
- Prevents unauthorized modification
- Protects critical functionality
- Ensures consistent behavior

**2. Immutability:**
- Objects remain unchanged
- Thread-safe by design
- Predictable behavior

**3. Performance:**
- JVM can optimize better
- Method calls can be inlined
- No virtual method lookup

**4. Design Clarity:**
- Clear intent - class is complete
- No ambiguity about inheritance
- Better API documentation

---

**DISADVANTAGES OF final CLASSES:**

**1. Limited Extensibility:**
- Cannot add new features through inheritance
- Reduces code reusability
- Less flexible design

**2. Testing Challenges:**
- Cannot create mock subclasses
- Harder to write unit tests
- May need other testing approaches

**3. Tight Coupling:**
- Users must use class as-is
- Cannot adapt to specific needs
- May require composition instead

---

**ALTERNATIVE TO INHERITANCE: COMPOSITION**

If you need to extend functionality of a final class, use composition:

\`\`\`java
final class Engine {
    void start() {
        System.out.println("Engine started");
    }

    void stop() {
        System.out.println("Engine stopped");
    }
}

// Cannot extend Engine, so use composition
class Car {
    private Engine engine;  // HAS-A relationship

    Car() {
        this.engine = new Engine();
    }

    void startCar() {
        engine.start();
        System.out.println("Car started");
    }

    void stopCar() {
        engine.stop();
        System.out.println("Car stopped");
    }
}

// Usage
class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.startCar();
        car.stopCar();
    }
}
\`\`\`

**Output:**
\`\`\`
Engine started
Car started
Engine stopped
Car stopped
\`\`\`

---

**IMPORTANT NOTES:**

1. **final class != final methods:**
   - A non-final class can have final methods
   - A final class automatically makes all methods final

2. **final class can be instantiated:**
\`\`\`java
final class Test { }
Test t = new Test();  // ✓ Valid
\`\`\`

3. **final class can extend other classes:**
\`\`\`java
class Parent { }
final class Child extends Parent { }  // ✓ Valid
\`\`\`

4. **final class can implement interfaces:**
\`\`\`java
interface MyInterface { }
final class MyClass implements MyInterface { }  // ✓ Valid
\`\`\`

5. **abstract and final cannot be used together:**
\`\`\`java
abstract final class Test { }  // ✗ ERROR: Contradictory modifiers
\`\`\`

---

**KEY POINTS:**

✓ final classes **CANNOT** be inherited
✓ Prevents extension and modification
✓ Used for security, immutability, and performance
✓ Examples: String, Integer, Double, System
✓ Use for utility classes, immutable classes, constants
✓ Can be instantiated directly
✓ Can extend other classes and implement interfaces
✓ Use composition as alternative to inheritance
✓ Cannot be combined with abstract keyword
✓ All methods in final class are implicitly final`
    }
  ]
