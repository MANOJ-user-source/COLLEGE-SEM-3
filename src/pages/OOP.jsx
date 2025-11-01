import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Box, Torus, Environment, Stars } from '@react-three/drei'
import { AnimatePresence } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

// Animated 3D Sphere
function AnimatedSphere({ position, color, scale = 1 }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} position={position} args={[scale, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.2}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  )
}

// Animated 3D Cube
function AnimatedCube({ position, color }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <Box ref={meshRef} position={position} args={[1.5, 1.5, 1.5]}>
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Box>
    </Float>
  )
}

// Animated Ring
function AnimatedRing({ position, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1}>
      <Torus ref={meshRef} position={position} args={[2, 0.4, 16, 100]}>
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Torus>
    </Float>
  )
}

// 3D Scene Component
function OOPScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#f472b6" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#a78bfa" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#ec4899" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="city" />
      <AnimatedSphere position={[0, 2, 0]} color="#f472b6" scale={1.5} />
      <AnimatedSphere position={[-3, -1, 0]} color="#a78bfa" scale={1} />
      <AnimatedSphere position={[3, -1, 0]} color="#ec4899" scale={1} />
      <AnimatedCube position={[-5, 0, -3]} color="#60a5fa" />
      <AnimatedCube position={[5, 0, -3]} color="#34d399" />
      <AnimatedCube position={[0, 4, -2]} color="#fbbf24" />
      <AnimatedRing position={[0, -3, 1]} color="#f472b6" />
      <Float speed={2} rotationIntensity={1} floatIntensity={3}>
        <Torus position={[-4, 3, -2]} args={[0.6, 0.2, 16, 100]}>
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </Torus>
      </Float>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Torus position={[4, 3, -2]} args={[0.6, 0.2, 16, 100]}>
          <meshStandardMaterial color="#fb923c" metalness={0.9} roughness={0.1} />
        </Torus>
      </Float>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={8}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  )
}

// Code Block Component with Copy functionality
function CodeBlock({ code, language = 'java' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 rounded-lg text-xs font-semibold border border-pink-500/50 transition-all"
      >
        {copied ? '✓ Copied!' : '📋 Copy'}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: '0.75rem',
          fontSize: '0.875rem',
          padding: '1.5rem',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
        }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

// Main OOP Page Component
function OOP() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showSolution, setShowSolution] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [editableCode, setEditableCode] = useState({})

  const toggleSolution = (taskId) => {
    setShowSolution(prev => ({ ...prev, [taskId]: !prev[taskId] }))
  }

  const handleCodeChange = (taskId, code) => {
    setEditableCode(prev => ({ ...prev, [taskId]: code }))
  }

  const resetCode = (taskId, originalCode) => {
    setEditableCode(prev => ({ ...prev, [taskId]: originalCode }))
  }

  // Java Code Examples for tasks
  const practicalTasks = [
    {
      id: 1,
      title: 'Generate First N Prime Numbers',
      category: 'Basics',
      difficulty: 'Easy',
      description: 'Write a program in Java to generate first n prime numbers.',
      topics: ['Loops', 'Logic Building', 'Methods'],
      explanation: `This program demonstrates:
• Prime number logic using modulo operator
• Helper method design (isPrime)
• Optimized checking up to √n
• Loop control with counters`,
      starterCode: `import java.util.Scanner;

public class PrimeNumbers {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();

        // Write your code here

        sc.close();
    }
}`,
      solution: `import java.util.Scanner;

public class PrimeNumbers {

    public static boolean isPrime(int num) {
        if (num <= 1) return false;
        if (num == 2) return true;
        if (num % 2 == 0) return false;

        for (int i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();

        System.out.println("First " + n + " prime numbers:");
        int count = 0;
        int num = 2;

        while (count < n) {
            if (isPrime(num)) {
                System.out.print(num + " ");
                count++;
            }
            num++;
        }

        sc.close();
    }
}`,
      output: `Enter n: 10
First 10 prime numbers:
2 3 5 7 11 13 17 19 23 29`
    },
    {
      id: 2,
      title: 'Maximum of Three Numbers',
      category: 'Basics',
      difficulty: 'Easy',
      description: 'Find maximum of three numbers using conditional (ternary) operator.',
      topics: ['Conditional Operator', 'Decision Making'],
      explanation: `Ternary operator syntax: (condition) ? value_if_true : value_if_false
• Nested ternary operators for multiple comparisons
• More concise than if-else chains
• Returns a value directly`,
      starterCode: `import java.util.Scanner;

public class MaxOfThree {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();

        // Use ternary operator to find max

        sc.close();
    }
}`,
      solution: `import java.util.Scanner;

public class MaxOfThree {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter three numbers:");
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();

        // Using nested ternary operator
        int max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);

        System.out.println("Maximum: " + max);
        sc.close();
    }
}`,
      output: `Enter three numbers:
25 67 42
Maximum: 67`
    },
    {
      id: 9,
      title: 'This Keyword Demo',
      category: 'Classes & Objects',
      difficulty: 'Easy',
      description: 'Demonstrate use of this keyword and check access to private members.',
      topics: ['this keyword', 'Access Modifiers', 'Encapsulation'],
      explanation: `'this' keyword refers to the current object:
• Differentiates instance variables from parameters
• Can access private members within the class
• Enables method chaining by returning 'this'
• Essential for constructor parameter shadowing`,
      starterCode: `class Student {
    private String name;
    private int rollNo;

    // Add constructor and methods using 'this'
}

public class ThisDemo {
    public static void main(String[] args) {
        // Create object and test
    }
}`,
      solution: `class Student {
    private String name;
    private int rollNo;

    // Constructor using 'this'
    public Student(String name, int rollNo) {
        this.name = name;      // 'this' refers to instance variable
        this.rollNo = rollNo;
    }

    // Method to display using 'this'
    public void display() {
        System.out.println("Name: " + this.name);
        System.out.println("Roll No: " + this.rollNo);
        // 'this' can access private members within the class
    }

    // Method returning 'this' for method chaining
    public Student setName(String name) {
        this.name = name;
        return this;  // Returning current object
    }
}

public class ThisDemo {
    public static void main(String[] args) {
        Student s1 = new Student("Alice", 101);
        s1.display();

        // Method chaining using 'this'
        s1.setName("Bob").display();
    }
}`,
      output: `Name: Alice
Roll No: 101
Name: Bob
Roll No: 101`
    },
    {
      id: 10,
      title: 'Constructor Overloading & Copy Constructor',
      category: 'Constructors',
      difficulty: 'Medium',
      description: 'Demonstrate overloaded constructors and copy constructor.',
      topics: ['Constructors', 'Overloading', 'Object Cloning'],
      explanation: `Constructor overloading allows multiple ways to create objects:
• Default constructor sets default values
• Parameterized constructors accept arguments
• Copy constructor clones an existing object
• Same name, different parameters (overloading)`,
      starterCode: `class Book {
    String title;
    String author;
    double price;

    // Add multiple constructors
}

public class ConstructorDemo {
    public static void main(String[] args) {
        // Test all constructors
    }
}`,
      solution: `class Book {
    String title;
    String author;
    double price;

    // Default constructor
    public Book() {
        this.title = "Unknown";
        this.author = "Unknown";
        this.price = 0.0;
    }

    // Parameterized constructor (2 params)
    public Book(String title, String author) {
        this.title = title;
        this.author = author;
        this.price = 0.0;
    }

    // Parameterized constructor (3 params)
    public Book(String title, String author, double price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }

    // Copy constructor
    public Book(Book b) {
        this.title = b.title;
        this.author = b.author;
        this.price = b.price;
    }

    public void display() {
        System.out.println(title + " by " + author + " - Rs." + price);
    }
}

public class ConstructorDemo {
    public static void main(String[] args) {
        Book b1 = new Book();
        Book b2 = new Book("1984", "George Orwell");
        Book b3 = new Book("Java Programming", "Herbert Schildt", 599.99);
        Book b4 = new Book(b3);  // Copy constructor

        b1.display();
        b2.display();
        b3.display();
        b4.display();
    }
}`,
      output: `Unknown by Unknown - Rs.0.0
1984 by George Orwell - Rs.0.0
Java Programming by Herbert Schildt - Rs.599.99
Java Programming by Herbert Schildt - Rs.599.99`
    },
    {
      id: 15,
      title: 'Inheritance Types Demo',
      category: 'Inheritance',
      difficulty: 'Medium',
      description: 'Demonstrate single, multilevel, and hierarchical inheritance.',
      topics: ['Inheritance', 'extends keyword', 'Hierarchy'],
      explanation: `Three types of inheritance demonstrated:
• Single: Dog extends Animal (1 parent, 1 child)
• Multilevel: Puppy extends Dog extends Animal (chain)
• Hierarchical: Cat & Bird both extend Animal (multiple children)
Note: Java doesn't support multiple inheritance with classes`,
      starterCode: `// Define your inheritance hierarchy here

public class InheritanceDemo {
    public static void main(String[] args) {
        // Test all inheritance types
    }
}`,
      solution: `// Single Inheritance
class Animal {
    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog is barking");
    }
}

// Multilevel Inheritance
class Puppy extends Dog {
    void play() {
        System.out.println("Puppy is playing");
    }
}

// Hierarchical Inheritance
class Cat extends Animal {
    void meow() {
        System.out.println("Cat is meowing");
    }
}

class Bird extends Animal {
    void fly() {
        System.out.println("Bird is flying");
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        System.out.println("=== Single Inheritance ===");
        Dog d = new Dog();
        d.eat();   // Inherited from Animal
        d.bark();  // Own method

        System.out.println("\\n=== Multilevel Inheritance ===");
        Puppy p = new Puppy();
        p.eat();   // From Animal (2 levels up)
        p.bark();  // From Dog (1 level up)
        p.play();  // Own method

        System.out.println("\\n=== Hierarchical Inheritance ===");
        Cat c = new Cat();
        c.eat();   // Inherited from Animal
        c.meow();  // Own method

        Bird b = new Bird();
        b.eat();   // Inherited from Animal
        b.fly();   // Own method
    }
}`,
      output: `=== Single Inheritance ===
Animal is eating
Dog is barking

=== Multilevel Inheritance ===
Animal is eating
Dog is barking
Puppy is playing

=== Hierarchical Inheritance ===
Animal is eating
Cat is meowing
Animal is eating
Bird is flying`
    },
    {
      id: 21,
      title: 'Abstract Shape Class',
      category: 'Polymorphism',
      difficulty: 'Hard',
      description: 'Create abstract Shape class with Triangle, Rectangle, Circle subclasses.',
      topics: ['Abstract Class', 'Method Overriding', 'Polymorphism'],
      explanation: `Abstract classes enable polymorphism:
• Cannot instantiate abstract classes directly
• Abstract methods must be implemented by subclasses
• Parent reference can hold child objects
• Runtime polymorphism through method overriding`,
      starterCode: `abstract class Shape {
    // Define abstract method area()
}

// Create Triangle, Rectangle, Circle classes

public class ShapeDemo {
    public static void main(String[] args) {
        // Test polymorphism
    }
}`,
      solution: `abstract class Shape {
    String name;

    public Shape(String name) {
        this.name = name;
    }

    // Abstract method
    abstract double area();

    void display() {
        System.out.println(name + " - Area: " + area());
    }
}

class Triangle extends Shape {
    double base, height;

    public Triangle(double base, double height) {
        super("Triangle");
        this.base = base;
        this.height = height;
    }

    @Override
    double area() {
        return 0.5 * base * height;
    }
}

class Rectangle extends Shape {
    double length, width;

    public Rectangle(double length, double width) {
        super("Rectangle");
        this.length = length;
        this.width = width;
    }

    @Override
    double area() {
        return length * width;
    }
}

class Circle extends Shape {
    double radius;

    public Circle(double radius) {
        super("Circle");
        this.radius = radius;
    }

    @Override
    double area() {
        return Math.PI * radius * radius;
    }
}

public class ShapeDemo {
    public static void main(String[] args) {
        // Polymorphism - Parent reference, child objects
        Shape[] shapes = {
            new Triangle(10, 5),
            new Rectangle(7, 4),
            new Circle(3.5)
        };

        for (Shape shape : shapes) {
            shape.display();
        }
    }
}`,
      output: `Triangle - Area: 25.0
Rectangle - Area: 28.0
Circle - Area: 38.48451000647496`
    },
    {
      id: 24,
      title: 'Divide by Zero Exception',
      category: 'Exception Handling',
      difficulty: 'Medium',
      description: 'Create user-defined exception for divide by zero error.',
      topics: ['Custom Exceptions', 'throw', 'Exception Handling'],
      explanation: `Custom exceptions for specific error handling:
• Extend Exception class for checked exceptions
• Use 'throw' to raise the exception
• 'throws' in method signature declares exception
• try-catch-finally for complete error handling`,
      starterCode: `// Create custom exception class

class Calculator {
    // Add divide method that throws exception
}

public class ExceptionDemo {
    public static void main(String[] args) {
        // Test the exception
    }
}`,
      solution: `// Custom Exception
class DivideByZeroException extends Exception {
    public DivideByZeroException(String message) {
        super(message);
    }
}

class Calculator {
    public double divide(int a, int b) throws DivideByZeroException {
        if (b == 0) {
            throw new DivideByZeroException("Cannot divide by zero!");
        }
        return (double) a / b;
    }
}

public class ExceptionDemo {
    public static void main(String[] args) {
        Calculator calc = new Calculator();

        try {
            System.out.println("10 / 2 = " + calc.divide(10, 2));
            System.out.println("10 / 0 = " + calc.divide(10, 0));
            System.out.println("This won't execute");
        } catch (DivideByZeroException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            System.out.println("Calculation completed");
        }
    }
}`,
      output: `10 / 2 = 5.0
Error: Cannot divide by zero!
Calculation completed`
    },
    {
      id: 27,
      title: 'Multithreading with Thread Class',
      category: 'Multithreading',
      difficulty: 'Medium',
      description: 'Create threads that display messages at different intervals.',
      topics: ['Thread Class', 'sleep()', 'Multithreading'],
      explanation: `Multithreading for concurrent execution:
• Extend Thread class and override run() method
• start() begins execution in a new thread
• sleep() pauses thread for specified milliseconds
• InterruptedException must be handled`,
      starterCode: `class Thread1 extends Thread {
    // Display "Thread1" every 2 seconds
}

class Thread2 extends Thread {
    // Display "Thread2" every 4 seconds
}

public class ThreadDemo {
    public static void main(String[] args) {
        // Start both threads
    }
}`,
      solution: `class Thread1 extends Thread {
    public void run() {
        try {
            for (int i = 0; i < 5; i++) {
                System.out.println("Thread1 - " + System.currentTimeMillis());
                Thread.sleep(2000);  // 2 seconds
            }
        } catch (InterruptedException e) {
            System.out.println("Thread1 interrupted");
        }
    }
}

class Thread2 extends Thread {
    public void run() {
        try {
            for (int i = 0; i < 3; i++) {
                System.out.println("Thread2 - " + System.currentTimeMillis());
                Thread.sleep(4000);  // 4 seconds
            }
        } catch (InterruptedException e) {
            System.out.println("Thread2 interrupted");
        }
    }
}

public class ThreadDemo {
    public static void main(String[] args) {
        Thread1 t1 = new Thread1();
        Thread2 t2 = new Thread2();

        t1.start();  // Start first thread
        t2.start();  // Start second thread

        System.out.println("Both threads started!");
    }
}`,
      output: `Both threads started!
Thread1 - 1709876543210
Thread2 - 1709876543215
Thread1 - 1709876545212
Thread1 - 1709876547214
Thread2 - 1709876547217
Thread1 - 1709876549216
Thread1 - 1709876551218
Thread2 - 1709876551220`
    }
  ]

  const categories = ['all', 'Basics', 'Classes & Objects', 'Constructors', 'Inheritance', 'Interfaces', 'Polymorphism', 'Exception Handling', 'Multithreading', 'File Handling']

  const difficultyColors = {
    'Easy': 'bg-green-500/20 text-green-300 border-green-500/50',
    'Medium': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    'Hard': 'bg-red-500/20 text-red-300 border-red-500/50'
  }

  const categoryColors = {
    'Basics': 'from-blue-500 to-cyan-500',
    'Classes & Objects': 'from-purple-500 to-pink-500',
    'Constructors': 'from-green-500 to-emerald-500',
    'Inheritance': 'from-pink-500 to-rose-500',
    'Interfaces': 'from-indigo-500 to-purple-500',
    'Polymorphism': 'from-yellow-500 to-orange-500',
    'Exception Handling': 'from-red-500 to-pink-500',
    'Multithreading': 'from-teal-500 to-cyan-500',
    'File Handling': 'from-orange-500 to-red-500'
  }

  const filteredTasks = practicalTasks.filter(task => {
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || task.difficulty === selectedDifficulty
    const matchesSearch = searchQuery === '' ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesDifficulty && matchesSearch
  })

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <OOPScene />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-pink-950/30 via-transparent to-slate-950/60 z-10 pointer-events-none" />

      {/* Scrollable Content */}
      <div className="relative z-20 min-h-screen">
        {/* Header */}
        <header className="bg-slate-900/30 backdrop-blur-xl border-b border-pink-500/20 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-3 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 transition-all border border-pink-500/50 backdrop-blur-sm hover:scale-110"
              >
                <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-600">
                  🧩 Java OOP Practicals
                </h1>
                <p className="text-slate-300 mt-2 text-base md:text-lg">
                  Interactive Java Code Examples with Solutions
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Learn by Coding
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              Complete Java solutions with syntax highlighting, copy functionality, and step-by-step explanations.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, description, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/60 backdrop-blur-xl text-white px-6 py-4 pl-14 rounded-2xl border border-slate-700/50 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all text-base"
              />
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Category Filter */}
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50">
              <h3 className="text-white font-semibold mb-3 text-sm">Category:</h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-800/80 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-pink-500 focus:outline-none transition-all"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50">
              <h3 className="text-white font-semibold mb-3 text-sm">Difficulty:</h3>
              <div className="flex gap-2 flex-wrap">
                {['all', 'Easy', 'Medium', 'Hard'].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDifficulty === difficulty
                        ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
                    }`}
                  >
                    {difficulty === 'all' ? 'All' : difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          {searchQuery && (
            <div className="mb-6 text-center">
              <p className="text-slate-400">
                Found <span className="text-pink-400 font-bold">{filteredTasks.length}</span> {filteredTasks.length === 1 ? 'task' : 'tasks'} matching "{searchQuery}"
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                {filteredTasks.length}
              </div>
              <div className="text-slate-400 text-sm">Tasks</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-green-400">
                {filteredTasks.filter(t => t.difficulty === 'Easy').length}
              </div>
              <div className="text-slate-400 text-sm">Easy</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {filteredTasks.filter(t => t.difficulty === 'Medium').length}
              </div>
              <div className="text-slate-400 text-sm">Medium</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-red-400">
                {filteredTasks.filter(t => t.difficulty === 'Hard').length}
              </div>
              <div className="text-slate-400 text-sm">Hard</div>
            </div>
          </div>

          {/* No Results Message */}
          {filteredTasks.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No tasks found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedDifficulty('all')
                }}
                className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Task List with Code */}
          <div className="space-y-6 md:space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${categoryColors[task.category]}/20 rounded-2xl md:rounded-3xl blur-xl group-hover:blur-2xl transition-all`} />
                  <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 border border-slate-700/50 group-hover:border-pink-500/50 transition-all">
                    {/* Task Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-pink-400 font-bold text-lg">#{task.id}</span>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${difficultyColors[task.difficulty]}`}>
                            {task.difficulty}
                          </span>
                          <span className={`px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${categoryColors[task.category]} text-white`}>
                            {task.category}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">{task.title}</h3>
                        <p className="text-slate-300 text-sm md:text-base mb-3 md:mb-4">{task.description}</p>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {task.topics.map((topic, i) => (
                            <span key={i} className="px-2 md:px-3 py-1 rounded-full text-xs bg-slate-800/80 text-slate-300 border border-slate-700">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Key Concepts */}
                    {task.explanation && (
                      <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                        <h4 className="text-blue-300 font-bold mb-2 text-base flex items-center gap-2">
                          <span className="text-xl">💡</span> Key Concepts
                        </h4>
                        <p className="text-slate-300 text-sm whitespace-pre-line leading-relaxed">{task.explanation}</p>
                      </div>
                    )}

                    {/* Interactive Code Playground */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-bold text-base md:text-lg flex items-center gap-2">
                          <span className="text-xl md:text-2xl">🎮</span> <span className="hidden sm:inline">Interactive Code Playground</span><span className="sm:hidden">Playground</span>
                        </h4>
                        <button
                          onClick={() => resetCode(task.id, task.starterCode)}
                          className="px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-xs rounded-lg transition-all border border-slate-600"
                        >
                          Reset
                        </button>
                      </div>
                      <div className="relative">
                        <textarea
                          value={editableCode[task.id] !== undefined ? editableCode[task.id] : task.starterCode}
                          onChange={(e) => handleCodeChange(task.id, e.target.value)}
                          className="w-full bg-slate-950/95 text-green-400 font-mono text-xs md:text-sm p-4 rounded-xl border border-slate-700 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 min-h-[200px] md:min-h-[250px] resize-y transition-all"
                          spellCheck="false"
                        />
                        <div className="absolute top-2 right-2 bg-slate-800/80 px-2 py-1 rounded text-xs text-slate-400">
                          Editable
                        </div>
                      </div>
                      <p className="text-slate-400 text-xs mt-2">
                        💡 Try modifying the code above! Experiment with different values and logic.
                      </p>
                    </div>

                    {/* Solution Toggle */}
                    <div>
                      <button
                        onClick={() => toggleSolution(task.id)}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-2.5 md:py-3 rounded-xl transition-all shadow-lg shadow-pink-500/30 mb-4 text-sm md:text-base"
                      >
                        {showSolution[task.id] ? '🔒 Hide Solution' : '🔓 Show Solution'}
                      </button>

                      <AnimatePresence>
                        {showSolution[task.id] && (
                          <div>
                            <h4 className="text-white font-bold mb-3 text-base md:text-lg flex items-center gap-2">
                              <span className="text-xl md:text-2xl">✅</span> Complete Solution
                            </h4>
                            <div className="overflow-x-auto">
                              <CodeBlock code={task.solution} />
                            </div>

                            {task.output && (
                              <div className="mt-6">
                                <h4 className="text-white font-bold mb-3 text-base md:text-lg flex items-center gap-2">
                                  <span className="text-xl md:text-2xl">💻</span> Output
                                </h4>
                                <div className="bg-slate-950/95 rounded-xl p-3 md:p-4 border border-green-500/30 font-mono text-xs md:text-sm overflow-x-auto">
                                  <pre className="text-green-400 whitespace-pre-wrap break-words">{task.output}</pre>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OOP
