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
      id: 3,
      title: 'Second Maximum without Arrays',
      category: 'Basics',
      difficulty: 'Medium',
      description: 'Find second maximum of n numbers without using arrays.',
      topics: ['Logic Building', 'Variables', 'Loops'],
      explanation: `Track two variables (max and secondMax):
• Initialize both to Integer.MIN_VALUE
• Update max and secondMax as you read inputs
• Handle cases where all numbers are equal
• No array storage needed - process on-the-fly`,
      starterCode: `import java.util.Scanner;

public class SecondMax {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter count of numbers: ");
        int n = sc.nextInt();

        // Write your logic here

        sc.close();
    }
}`,
      solution: `import java.util.Scanner;

public class SecondMax {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter count of numbers: ");
        int n = sc.nextInt();

        if (n < 2) {
            System.out.println("Need at least 2 numbers!");
            sc.close();
            return;
        }

        int max = Integer.MIN_VALUE;
        int secondMax = Integer.MIN_VALUE;

        System.out.println("Enter " + n + " numbers:");
        for (int i = 0; i < n; i++) {
            int num = sc.nextInt();

            if (num > max) {
                secondMax = max;
                max = num;
            } else if (num > secondMax && num != max) {
                secondMax = num;
            }
        }

        if (secondMax == Integer.MIN_VALUE) {
            System.out.println("All numbers are equal!");
        } else {
            System.out.println("Second Maximum: " + secondMax);
        }

        sc.close();
    }
}`,
      output: `Enter count of numbers: 5
Enter 5 numbers:
45 89 23 67 89
Second Maximum: 67`
    },
    {
      id: 4,
      title: 'Reverse Digits using While Loop',
      category: 'Basics',
      difficulty: 'Easy',
      description: 'Reverse the digits of a number using while loop.',
      topics: ['While Loop', 'Modulo Operator', 'Math Operations'],
      explanation: `Algorithm to reverse digits:
• Extract last digit using num % 10
• Add to reversed number: reversed = reversed * 10 + digit
• Remove last digit: num = num / 10
• Continue until num becomes 0`,
      starterCode: `import java.util.Scanner;

public class ReverseDigits {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        // Write your code here

        sc.close();
    }
}`,
      solution: `import java.util.Scanner;

public class ReverseDigits {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        int original = num;
        int reversed = 0;

        while (num != 0) {
            int digit = num % 10;        // Extract last digit
            reversed = reversed * 10 + digit;  // Add to reversed
            num = num / 10;              // Remove last digit
        }

        System.out.println("Original: " + original);
        System.out.println("Reversed: " + reversed);

        sc.close();
    }
}`,
      output: `Enter a number: 12345
Original: 12345
Reversed: 54321`
    },
    {
      id: 5,
      title: 'Number to Words Converter',
      category: 'Basics',
      difficulty: 'Hard',
      description: 'Convert a number into words and print it.',
      topics: ['Strings', 'Arrays', 'Logic Building', 'Recursion'],
      explanation: `Convert number to words (supports up to millions):
• Break number into groups (ones, tens, hundreds, thousands, etc.)
• Use arrays for word mappings (0-19, tens, scale)
• Handle special cases (10-19, zero)
• Recursive approach for large numbers`,
      starterCode: `import java.util.Scanner;

public class NumberToWords {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        // Write your code here

        sc.close();
    }
}`,
      solution: `import java.util.Scanner;

public class NumberToWords {

    private static final String[] ones = {
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
        "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
        "Seventeen", "Eighteen", "Nineteen"
    };

    private static final String[] tens = {
        "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    };

    public static String convertToWords(int num) {
        if (num == 0) return "Zero";

        if (num < 20) return ones[num];

        if (num < 100) {
            return tens[num / 10] + ((num % 10 != 0) ? " " + ones[num % 10] : "");
        }

        if (num < 1000) {
            return ones[num / 100] + " Hundred" +
                   ((num % 100 != 0) ? " " + convertToWords(num % 100) : "");
        }

        if (num < 1000000) {
            return convertToWords(num / 1000) + " Thousand" +
                   ((num % 1000 != 0) ? " " + convertToWords(num % 1000) : "");
        }

        return convertToWords(num / 1000000) + " Million" +
               ((num % 1000000 != 0) ? " " + convertToWords(num % 1000000) : "");
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();

        if (num < 0) {
            System.out.println("Negative numbers not supported");
        } else {
            System.out.println("In words: " + convertToWords(num));
        }

        sc.close();
    }
}`,
      output: `Enter a number: 12345
In words: Twelve Thousand Three Hundred Forty Five`
    },
    {
      id: 6,
      title: 'Wrapper Classes Demo',
      category: 'Basics',
      difficulty: 'Easy',
      description: 'Demonstrate use of Wrapper classes for each primitive data type.',
      topics: ['Wrapper Classes', 'Autoboxing', 'Unboxing', 'Type Conversion'],
      explanation: `Wrapper classes convert primitives to objects:
• byte → Byte, short → Short, int → Integer, long → Long
• float → Float, double → Double
• char → Character, boolean → Boolean
• Autoboxing: automatic primitive to wrapper conversion
• Unboxing: automatic wrapper to primitive conversion`,
      starterCode: `public class WrapperDemo {
    public static void main(String[] args) {
        // Demonstrate all 8 wrapper classes
    }
}`,
      solution: `public class WrapperDemo {
    public static void main(String[] args) {
        System.out.println("=== Wrapper Classes Demo ===\\n");

        // Byte Wrapper
        byte b = 10;
        Byte byteObj = Byte.valueOf(b);  // Boxing
        System.out.println("Byte: " + byteObj + " | Max: " + Byte.MAX_VALUE);

        // Short Wrapper
        short s = 100;
        Short shortObj = Short.valueOf(s);
        System.out.println("Short: " + shortObj + " | Max: " + Short.MAX_VALUE);

        // Integer Wrapper
        int i = 1000;
        Integer intObj = Integer.valueOf(i);  // Boxing
        int primitive = intObj.intValue();    // Unboxing
        System.out.println("Integer: " + intObj + " | Primitive: " + primitive);

        // Long Wrapper
        long l = 100000L;
        Long longObj = Long.valueOf(l);
        System.out.println("Long: " + longObj + " | Max: " + Long.MAX_VALUE);

        // Float Wrapper
        float f = 3.14f;
        Float floatObj = Float.valueOf(f);
        System.out.println("Float: " + floatObj + " | Min: " + Float.MIN_VALUE);

        // Double Wrapper
        double d = 2.71828;
        Double doubleObj = Double.valueOf(d);
        System.out.println("Double: " + doubleObj + " | Max: " + Double.MAX_VALUE);

        // Character Wrapper
        char c = 'A';
        Character charObj = Character.valueOf(c);
        System.out.println("Character: " + charObj + " | Is Letter: " + Character.isLetter(c));

        // Boolean Wrapper
        boolean bool = true;
        Boolean boolObj = Boolean.valueOf(bool);
        System.out.println("Boolean: " + boolObj + " | Parse: " + Boolean.parseBoolean("false"));

        // Autoboxing & Unboxing (Java 5+)
        System.out.println("\\n=== Autoboxing/Unboxing ===");
        Integer autoBox = 50;  // Autoboxing
        int autoUnbox = autoBox;  // Auto-unboxing
        System.out.println("Autoboxed: " + autoBox + " | Unboxed: " + autoUnbox);
    }
}`,
      output: `=== Wrapper Classes Demo ===

Byte: 10 | Max: 127
Short: 100 | Max: 32767
Integer: 1000 | Primitive: 1000
Long: 100000 | Max: 9223372036854775807
Float: 3.14 | Min: 1.4E-45
Double: 2.71828 | Max: 1.7976931348623157E308
Character: A | Is Letter: true
Boolean: true | Parse: false

=== Autoboxing/Unboxing ===
Autoboxed: 50 | Unboxed: 50`
    },
    {
      id: 7,
      title: 'Matrix Multiplication',
      category: 'Basics',
      difficulty: 'Medium',
      description: 'Write a program to multiply two matrices.',
      topics: ['2D Arrays', 'Nested Loops', 'Matrix Operations'],
      explanation: `Matrix multiplication rules:
• Matrix A (m×n) × Matrix B (n×p) = Result (m×p)
• Columns in A must equal rows in B
• Element [i][j] = sum of (A[i][k] * B[k][j]) for all k
• Triple nested loop: outer(rows), middle(cols), inner(sum)`,
      starterCode: `import java.util.Scanner;

public class MatrixMultiplication {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Get dimensions and matrices
        // Multiply them

        sc.close();
    }
}`,
      solution: `import java.util.Scanner;

public class MatrixMultiplication {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter rows and columns of first matrix: ");
        int r1 = sc.nextInt();
        int c1 = sc.nextInt();

        System.out.print("Enter rows and columns of second matrix: ");
        int r2 = sc.nextInt();
        int c2 = sc.nextInt();

        if (c1 != r2) {
            System.out.println("Matrix multiplication not possible!");
            System.out.println("Columns of first matrix must equal rows of second matrix");
            sc.close();
            return;
        }

        int[][] matrix1 = new int[r1][c1];
        int[][] matrix2 = new int[r2][c2];
        int[][] result = new int[r1][c2];

        // Input first matrix
        System.out.println("Enter elements of first matrix:");
        for (int i = 0; i < r1; i++) {
            for (int j = 0; j < c1; j++) {
                matrix1[i][j] = sc.nextInt();
            }
        }

        // Input second matrix
        System.out.println("Enter elements of second matrix:");
        for (int i = 0; i < r2; i++) {
            for (int j = 0; j < c2; j++) {
                matrix2[i][j] = sc.nextInt();
            }
        }

        // Multiply matrices
        for (int i = 0; i < r1; i++) {
            for (int j = 0; j < c2; j++) {
                result[i][j] = 0;
                for (int k = 0; k < c1; k++) {
                    result[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }
        }

        // Display result
        System.out.println("\\nResultant Matrix:");
        for (int i = 0; i < r1; i++) {
            for (int j = 0; j < c2; j++) {
                System.out.print(result[i][j] + " ");
            }
            System.out.println();
        }

        sc.close();
    }
}`,
      output: `Enter rows and columns of first matrix: 2 3
Enter rows and columns of second matrix: 3 2
Enter elements of first matrix:
1 2 3
4 5 6
Enter elements of second matrix:
7 8
9 10
11 12
Resultant Matrix:
58 64
139 154`
    },
    {
      id: 8,
      title: 'Static Block Execution',
      category: 'Classes & Objects',
      difficulty: 'Easy',
      description: 'Write a static block which will be executed before main() method in a class.',
      topics: ['Static Block', 'Class Loading', 'Initialization'],
      explanation: `Static block characteristics:
• Executed when class is loaded (before main)
• Runs only once, even if multiple objects created
• Used for static variable initialization
• Can have multiple static blocks (execute in order)
• Cannot access instance variables`,
      starterCode: `public class StaticBlockDemo {
    // Add static variables and static block

    public static void main(String[] args) {
        System.out.println("Inside main method");
    }
}`,
      solution: `public class StaticBlockDemo {
    static int count;
    static String message;

    // Static block 1 - Executes first
    static {
        System.out.println("=== Static Block 1 Executed ===");
        count = 100;
        System.out.println("Count initialized to: " + count);
    }

    // Static block 2 - Executes second
    static {
        System.out.println("=== Static Block 2 Executed ===");
        message = "Hello from static block!";
        System.out.println("Message: " + message);
    }

    // Constructor
    public StaticBlockDemo() {
        System.out.println("Constructor called");
    }

    public static void main(String[] args) {
        System.out.println("\\n=== Main Method Started ===");
        System.out.println("Count value: " + count);
        System.out.println("Message value: " + message);

        System.out.println("\\nCreating objects...");
        StaticBlockDemo obj1 = new StaticBlockDemo();
        StaticBlockDemo obj2 = new StaticBlockDemo();
        System.out.println("\\nNote: Static blocks run only once!");
    }
}`,
      output: `=== Static Block 1 Executed ===
Count initialized to: 100
=== Static Block 2 Executed ===
Message: Hello from static block!

=== Main Method Started ===
Count value: 100
Message value: Hello from static block!

Creating objects...
Constructor called
Constructor called

Note: Static blocks run only once!`
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
      id: 11,
      title: 'Leap Year Checker with Inheritance',
      category: 'Inheritance',
      difficulty: 'Easy',
      description: 'Create a class to find out whether the given year is leap year or not using inheritance.',
      topics: ['Inheritance', 'Logic Building', 'extends keyword'],
      explanation: `Leap year rules using inheritance:
• Divisible by 400 → Leap year
• Divisible by 100 but not 400 → Not leap year
• Divisible by 4 but not 100 → Leap year
• Otherwise → Not leap year
• Parent class handles year, child adds leap logic`,
      starterCode: `import java.util.Scanner;

class Year {
    int year;
    // Add constructor
}

class LeapYear extends Year {
    // Add method to check leap year
}

public class LeapYearDemo {
    public static void main(String[] args) {
        // Test the leap year checker
    }
}`,
      solution: `import java.util.Scanner;

class Year {
    protected int year;

    public Year(int year) {
        this.year = year;
    }

    public void displayYear() {
        System.out.println("Year: " + year);
    }
}

class LeapYear extends Year {
    public LeapYear(int year) {
        super(year);  // Call parent constructor
    }

    public boolean isLeap() {
        // Leap year logic
        if (year % 400 == 0) {
            return true;
        } else if (year % 100 == 0) {
            return false;
        } else if (year % 4 == 0) {
            return true;
        } else {
            return false;
        }
    }

    public void checkLeapYear() {
        displayYear();  // Inherited method
        if (isLeap()) {
            System.out.println(year + " is a LEAP YEAR");
        } else {
            System.out.println(year + " is NOT a leap year");
        }
    }
}

public class LeapYearDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a year: ");
        int y = sc.nextInt();

        LeapYear ly = new LeapYear(y);
        ly.checkLeapYear();

        System.out.println("\\n--- Testing Multiple Years ---");
        int[] testYears = {2000, 1900, 2024, 2023};
        for (int year : testYears) {
            LeapYear test = new LeapYear(year);
            test.checkLeapYear();
        }

        sc.close();
    }
}`,
      output: `Enter a year: 2024
Year: 2024
2024 is a LEAP YEAR

--- Testing Multiple Years ---
Year: 2000
2000 is a LEAP YEAR
Year: 1900
1900 is NOT a leap year
Year: 2024
2024 is a LEAP YEAR
Year: 2023
2023 is NOT a leap year`
    },
    {
      id: 12,
      title: 'Final Class Demo',
      category: 'Inheritance',
      difficulty: 'Easy',
      description: 'Demonstrate use of final class (cannot be extended).',
      topics: ['final keyword', 'Inheritance', 'Immutability'],
      explanation: `Final class characteristics:
• Cannot be subclassed/extended
• Prevents inheritance hierarchy
• Used for security and immutability (e.g., String class)
• All methods implicitly final
• Attempting to extend causes compile error`,
      starterCode: `// Create a final class

public class FinalClassDemo {
    public static void main(String[] args) {
        // Test the final class
    }
}`,
      solution: `// Final class - cannot be extended
final class Configuration {
    private final String appName;
    private final String version;

    public Configuration(String appName, String version) {
        this.appName = appName;
        this.version = version;
    }

    public void displayConfig() {
        System.out.println("Application: " + appName);
        System.out.println("Version: " + version);
    }

    public String getAppName() {
        return appName;
    }

    public String getVersion() {
        return version;
    }
}

// This would cause a compile error:
// class ExtendedConfig extends Configuration { }
// Error: Cannot inherit from final 'Configuration'

// Regular class with final method
class MathOperations {
    // Final method - cannot be overridden
    public final int add(int a, int b) {
        return a + b;
    }

    // Regular method - can be overridden
    public int multiply(int a, int b) {
        return a * b;
    }
}

class AdvancedMath extends MathOperations {
    // This would cause error:
    // public int add(int a, int b) { return a + b + 1; }
    // Error: Cannot override final method

    // This is allowed
    @Override
    public int multiply(int a, int b) {
        System.out.println("Advanced multiplication");
        return a * b;
    }
}

public class FinalClassDemo {
    public static void main(String[] args) {
        System.out.println("=== Final Class Demo ===");
        Configuration config = new Configuration("MyApp", "1.0.0");
        config.displayConfig();

        System.out.println("\\n=== Final Method Demo ===");
        AdvancedMath math = new AdvancedMath();
        System.out.println("Add: " + math.add(5, 3));
        System.out.println("Multiply: " + math.multiply(5, 3));

        System.out.println("\\n=== Final Variable Demo ===");
        final int MAX_USERS = 100;
        System.out.println("Max users allowed: " + MAX_USERS);
        // MAX_USERS = 200;  // Error: cannot assign to final variable

        System.out.println("\\nNote: Final class cannot be extended!");
        System.out.println("Examples: String, Integer, Math are final classes");
    }
}`,
      output: `=== Final Class Demo ===
Application: MyApp
Version: 1.0.0

=== Final Method Demo ===
Add: 8
Advanced multiplication
Multiply: 15

=== Final Variable Demo ===
Max users allowed: 100

Note: Final class cannot be extended!
Examples: String, Integer, Math are final classes`
    },
    {
      id: 13,
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
      id: 14,
      title: 'Thread Synchronization Demo',
      category: 'Multithreading',
      difficulty: 'Hard',
      description: 'Demonstrate use of synchronization when multiple threads access shared resource.',
      topics: ['Synchronization', 'synchronized keyword', 'Thread Safety', 'Race Condition'],
      explanation: `Synchronization prevents race conditions:
• synchronized method - locks entire method
• synchronized block - locks specific code section
• Only one thread can execute synchronized code at a time
• Prevents data inconsistency when threads share resources
• Compare with/without synchronization to see the difference`,
      starterCode: `class Counter {
    private int count = 0;

    // Add synchronized method
}

class IncrementThread extends Thread {
    // Increment counter multiple times
}

public class SyncDemo {
    public static void main(String[] args) {
        // Create and start multiple threads
    }
}`,
      solution: `class Counter {
    private int count = 0;

    // Synchronized method - thread-safe
    public synchronized void increment() {
        count++;
    }

    // Non-synchronized method - not thread-safe
    public void incrementUnsafe() {
        count++;
    }

    public int getCount() {
        return count;
    }

    public void reset() {
        count = 0;
    }
}

class IncrementThread extends Thread {
    private Counter counter;
    private boolean useSynchronized;

    public IncrementThread(Counter counter, boolean useSynchronized) {
        this.counter = counter;
        this.useSynchronized = useSynchronized;
    }

    public void run() {
        for (int i = 0; i < 1000; i++) {
            if (useSynchronized) {
                counter.increment();  // Synchronized
            } else {
                counter.incrementUnsafe();  // Not synchronized
            }
        }
    }
}

public class SyncDemo {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        System.out.println("=== WITHOUT Synchronization ===");
        IncrementThread t1 = new IncrementThread(counter, false);
        IncrementThread t2 = new IncrementThread(counter, false);
        IncrementThread t3 = new IncrementThread(counter, false);

        t1.start();
        t2.start();
        t3.start();

        t1.join();  // Wait for t1 to finish
        t2.join();
        t3.join();

        System.out.println("Expected count: 3000");
        System.out.println("Actual count: " + counter.getCount());
        System.out.println("Data inconsistency due to race condition!\\n");

        // Reset and test with synchronization
        counter.reset();

        System.out.println("=== WITH Synchronization ===");
        IncrementThread t4 = new IncrementThread(counter, true);
        IncrementThread t5 = new IncrementThread(counter, true);
        IncrementThread t6 = new IncrementThread(counter, true);

        t4.start();
        t5.start();
        t6.start();

        t4.join();
        t5.join();
        t6.join();

        System.out.println("Expected count: 3000");
        System.out.println("Actual count: " + counter.getCount());
        System.out.println("Perfect! Synchronization prevents race condition.");
    }
}`,
      output: `=== WITHOUT Synchronization ===
Expected count: 3000
Actual count: 2847
Data inconsistency due to race condition!

=== WITH Synchronization ===
Expected count: 3000
Actual count: 3000
Perfect! Synchronization prevents race condition.`
    },
    {
      id: 15,
      title: 'File Operations - Create, Write, Read, Modify',
      category: 'File Handling',
      difficulty: 'Hard',
      description: 'Demonstrate create, write, modify, and read operations on a Text file.',
      topics: ['File I/O', 'FileWriter', 'FileReader', 'BufferedReader', 'Exception Handling'],
      explanation: `File operations in Java:
• FileWriter - writes to file (overwrite mode)
• FileReader + BufferedReader - reads from file
• File class - check existence, create, delete
• Always close resources (use try-with-resources)
• Handle IOException for file operations`,
      starterCode: `import java.io.*;

public class FileOperations {
    public static void main(String[] args) {
        // Implement file operations
    }
}`,
      solution: `import java.io.*;

public class FileOperations {

    public static void createAndWriteFile(String filename, String content) {
        try (FileWriter writer = new FileWriter(filename)) {
            writer.write(content);
            System.out.println("✓ File created and content written successfully!");
        } catch (IOException e) {
            System.out.println("Error writing file: " + e.getMessage());
        }
    }

    public static void readFile(String filename) {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            System.out.println("\\n--- File Content ---");
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            System.out.println("--- End of File ---");
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }

    public static void modifyFile(String filename, String newContent) {
        try (FileWriter writer = new FileWriter(filename, true)) {  // append mode
            writer.write("\\n" + newContent);
            System.out.println("\\n✓ Content appended successfully!");
        } catch (IOException e) {
            System.out.println("Error modifying file: " + e.getMessage());
        }
    }

    public static void overwriteFile(String filename, String newContent) {
        try (FileWriter writer = new FileWriter(filename)) {  // overwrite mode
            writer.write(newContent);
            System.out.println("\\n✓ File overwritten successfully!");
        } catch (IOException e) {
            System.out.println("Error overwriting file: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        String filename = "demo.txt";

        System.out.println("=== File Operations Demo ===\\n");

        // 1. Create and Write
        System.out.println("1. Creating file and writing initial content...");
        createAndWriteFile(filename, "Hello, World!\\nThis is line 2.\\nJava File I/O Demo.");

        // 2. Read
        System.out.println("\\n2. Reading file content:");
        readFile(filename);

        // 3. Modify (Append)
        System.out.println("\\n3. Appending new content...");
        modifyFile(filename, "This line was appended!");
        readFile(filename);

        // 4. Overwrite
        System.out.println("\\n4. Overwriting entire file...");
        overwriteFile(filename, "File has been completely overwritten.\\nOld content is gone.");
        readFile(filename);

        // 5. Check file existence
        File file = new File(filename);
        System.out.println("\\n5. File Info:");
        System.out.println("Exists: " + file.exists());
        System.out.println("Size: " + file.length() + " bytes");
        System.out.println("Path: " + file.getAbsolutePath());
    }
}`,
      output: `=== File Operations Demo ===

1. Creating file and writing initial content...
✓ File created and content written successfully!

2. Reading file content:

--- File Content ---
Hello, World!
This is line 2.
Java File I/O Demo.
--- End of File ---

3. Appending new content...

✓ Content appended successfully!

--- File Content ---
Hello, World!
This is line 2.
Java File I/O Demo.
This line was appended!
--- End of File ---

4. Overwriting entire file...

✓ File overwritten successfully!

--- File Content ---
File has been completely overwritten.
Old content is gone.
--- End of File ---

5. File Info:
Exists: true
Size: 58 bytes
Path: C:\\Users\\YourName\\demo.txt`
    },
    {
      id: 16,
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
      id: 17,
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
      id: 18,
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
    },
    {
      id: 19,
      title: 'Private Constructor & Instance Counter',
      category: 'Constructors',
      difficulty: 'Medium',
      description: 'Demonstrate use of private constructor and count instances created using default constructor.',
      topics: ['Private Constructor', 'Static Variables', 'Instance Counting', 'Singleton Pattern'],
      explanation: `Private constructor prevents direct instantiation:
• Only accessible within the class itself
• Used in Singleton pattern for single instance control
• Static counter tracks total instances created
• Static method provides controlled object creation
• Useful for resource management and factory patterns`,
      starterCode: `class InstanceCounter {
    private static int instanceCount = 0;

    // Make constructor private
    // Add instance counting logic

    public static void displayCount() {
        // Display total instances
    }
}

public class PrivateConstructorDemo {
    public static void main(String[] args) {
        // Try to create instances
    }
}`,
      solution: `class InstanceCounter {
    private static int instanceCount = 0;
    private String name;

    // Private constructor - cannot be called from outside
    private InstanceCounter(String name) {
        this.name = name;
        instanceCount++;
        System.out.println("Instance created: " + name);
    }

    // Public static factory method to create instances
    public static InstanceCounter createInstance(String name) {
        return new InstanceCounter(name);
    }

    public static int getInstanceCount() {
        return instanceCount;
    }

    public static void displayCount() {
        System.out.println("Total instances created: " + instanceCount);
    }

    public void display() {
        System.out.println("Instance name: " + name);
    }
}

// Singleton Pattern Example
class DatabaseConnection {
    private static DatabaseConnection singleInstance = null;
    private static int connectionCount = 0;

    // Private constructor
    private DatabaseConnection() {
        connectionCount++;
        System.out.println("Database connection established!");
    }

    // Public method to get single instance
    public static DatabaseConnection getInstance() {
        if (singleInstance == null) {
            singleInstance = new DatabaseConnection();
        } else {
            System.out.println("Returning existing connection...");
        }
        return singleInstance;
    }

    public static int getConnectionCount() {
        return connectionCount;
    }
}

public class PrivateConstructorDemo {
    public static void main(String[] args) {
        System.out.println("=== Instance Counter Demo ===\\n");

        // This would cause error: constructor is private
        // InstanceCounter obj = new InstanceCounter("Test");

        // Must use factory method
        InstanceCounter obj1 = InstanceCounter.createInstance("Object1");
        InstanceCounter obj2 = InstanceCounter.createInstance("Object2");
        InstanceCounter obj3 = InstanceCounter.createInstance("Object3");

        System.out.println();
        InstanceCounter.displayCount();

        System.out.println("\\n=== Singleton Pattern Demo ===\\n");

        DatabaseConnection db1 = DatabaseConnection.getInstance();
        DatabaseConnection db2 = DatabaseConnection.getInstance();
        DatabaseConnection db3 = DatabaseConnection.getInstance();

        System.out.println("\\ndb1 == db2: " + (db1 == db2));
        System.out.println("db2 == db3: " + (db2 == db3));
        System.out.println("All references point to same instance!");
        System.out.println("Total connections created: " + DatabaseConnection.getConnectionCount());
    }
}`,
      output: `=== Instance Counter Demo ===

Instance created: Object1
Instance created: Object2
Instance created: Object3

Total instances created: 3

=== Singleton Pattern Demo ===

Database connection established!
Returning existing connection...
Returning existing connection...

db1 == db2: true
db2 == db3: true
All references point to same instance!
Total connections created: 1`
    },
    {
      id: 20,
      title: 'Method Variations - Pass by Value/Reference',
      category: 'Classes & Objects',
      difficulty: 'Medium',
      description: 'Demonstrate 4 variations: passing by value, passing by reference, returning values, and returning objects.',
      topics: ['Method Parameters', 'Pass by Value', 'Pass by Reference', 'Return Types', 'Object References'],
      explanation: `Java method parameter passing mechanics:
• Primitives: Pass by VALUE (copy of value)
• Objects: Pass by REFERENCE (copy of reference)
• Modifying primitives inside methods doesn't affect original
• Modifying object properties affects original object
• Methods can return primitives or object references
• Understanding this prevents common bugs`,
      starterCode: `class Calculator {
    // Add methods demonstrating:
    // 1. Pass by value (primitive)
    // 2. Pass by reference (object)
    // 3. Return value (primitive)
    // 4. Return object
}

public class MethodVariations {
    public static void main(String[] args) {
        // Test all method variations
    }
}`,
      solution: `class Student {
    String name;
    int marks;

    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    public void display() {
        System.out.println(name + " - Marks: " + marks);
    }
}

class Calculator {
    // 1. Pass by VALUE (primitive types)
    public void modifyPrimitive(int num) {
        num = num * 2;
        System.out.println("Inside method: " + num);
    }

    // 2. Pass by REFERENCE (objects)
    public void modifyObject(Student student) {
        student.marks = student.marks + 10;  // Modifies original object
        System.out.println("Inside method - " + student.name + ": " + student.marks);
    }

    // 3. Return VALUE (primitive)
    public int add(int a, int b) {
        return a + b;
    }

    public double calculatePercentage(int marks, int total) {
        return (marks * 100.0) / total;
    }

    // 4. Return OBJECT
    public Student createStudent(String name, int marks) {
        return new Student(name, marks);
    }

    public Student getTopStudent(Student s1, Student s2) {
        return (s1.marks > s2.marks) ? s1 : s2;
    }
}

public class MethodVariations {
    public static void main(String[] args) {
        Calculator calc = new Calculator();

        System.out.println("=== 1. Pass by VALUE (Primitive) ===");
        int number = 10;
        System.out.println("Before method call: " + number);
        calc.modifyPrimitive(number);
        System.out.println("After method call: " + number);
        System.out.println("Original value UNCHANGED!\\n");

        System.out.println("=== 2. Pass by REFERENCE (Object) ===");
        Student student = new Student("Alice", 75);
        System.out.print("Before method call - ");
        student.display();
        calc.modifyObject(student);
        System.out.print("After method call - ");
        student.display();
        System.out.println("Original object MODIFIED!\\n");

        System.out.println("=== 3. Return VALUE (Primitive) ===");
        int sum = calc.add(15, 25);
        System.out.println("Sum: " + sum);
        double percentage = calc.calculatePercentage(85, 100);
        System.out.println("Percentage: " + percentage + "%\\n");

        System.out.println("=== 4. Return OBJECT ===");
        Student newStudent = calc.createStudent("Bob", 92);
        System.out.print("Created student: ");
        newStudent.display();

        Student s1 = new Student("Charlie", 88);
        Student s2 = new Student("David", 95);
        Student topStudent = calc.getTopStudent(s1, s2);
        System.out.print("Top student: ");
        topStudent.display();
    }
}`,
      output: `=== 1. Pass by VALUE (Primitive) ===
Before method call: 10
Inside method: 20
After method call: 10
Original value UNCHANGED!

=== 2. Pass by REFERENCE (Object) ===
Before method call - Alice - Marks: 75
Inside method - Alice: 85
After method call - Alice - Marks: 85
Original object MODIFIED!

=== 3. Return VALUE (Primitive) ===
Sum: 40
Percentage: 85.0%

=== 4. Return OBJECT ===
Created student: Bob - Marks: 92
Top student: David - Marks: 95`
    },
    {
      id: 21,
      title: 'Subclass Constructor Invokes Superclass',
      category: 'Inheritance',
      difficulty: 'Easy',
      description: 'Write a program where subclass constructor invokes the constructor of the super class.',
      topics: ['super keyword', 'Constructor Chaining', 'Inheritance', 'Initialization'],
      explanation: `Constructor chaining with super():
• super() calls parent class constructor
• Must be first statement in child constructor
• Implicit super() called if not specified
• Used to initialize parent class members
• Can pass arguments to parameterized parent constructor
• Constructor executes: Parent → Child order`,
      starterCode: `class Vehicle {
    String brand;
    int year;

    // Add constructor
}

class Car extends Vehicle {
    String model;
    int price;

    // Add constructor using super()
}

public class ConstructorChainingDemo {
    public static void main(String[] args) {
        // Create Car object
    }
}`,
      solution: `class Vehicle {
    String brand;
    int year;

    // Parent constructor with no parameters
    public Vehicle() {
        System.out.println("Vehicle constructor called (no-arg)");
        this.brand = "Unknown";
        this.year = 0;
    }

    // Parent constructor with parameters
    public Vehicle(String brand, int year) {
        System.out.println("Vehicle constructor called (parameterized)");
        this.brand = brand;
        this.year = year;
    }

    public void displayVehicle() {
        System.out.println("Brand: " + brand + ", Year: " + year);
    }
}

class Car extends Vehicle {
    String model;
    int price;

    // Child constructor - calls parent no-arg constructor implicitly
    public Car() {
        // Implicit: super();
        System.out.println("Car constructor called (no-arg)");
        this.model = "Unknown";
        this.price = 0;
    }

    // Child constructor - explicitly calls parent parameterized constructor
    public Car(String brand, int year, String model, int price) {
        super(brand, year);  // MUST be first statement!
        System.out.println("Car constructor called (parameterized)");
        this.model = model;
        this.price = price;
    }

    public void displayCar() {
        System.out.println("=== Car Details ===");
        displayVehicle();  // Inherited method
        System.out.println("Model: " + model);
        System.out.println("Price: Rs." + price);
        System.out.println();
    }
}

class Bike extends Vehicle {
    String type;

    public Bike(String brand, int year, String type) {
        super(brand, year);  // Calls parent constructor
        System.out.println("Bike constructor called");
        this.type = type;
    }

    public void displayBike() {
        System.out.println("=== Bike Details ===");
        System.out.println("Brand: " + brand);
        System.out.println("Year: " + year);
        System.out.println("Type: " + type);
        System.out.println();
    }
}

public class ConstructorChainingDemo {
    public static void main(String[] args) {
        System.out.println("Creating Car with no-arg constructor:\\n");
        Car car1 = new Car();
        car1.displayCar();

        System.out.println("\\nCreating Car with parameterized constructor:\\n");
        Car car2 = new Car("Toyota", 2024, "Camry", 2500000);
        car2.displayCar();

        System.out.println("\\nCreating Bike:\\n");
        Bike bike = new Bike("Honda", 2023, "Sports");
        bike.displayBike();

        System.out.println("=== Constructor Execution Order ===");
        System.out.println("1. Parent class constructor executes FIRST");
        System.out.println("2. Child class constructor executes AFTER");
        System.out.println("3. super() must be FIRST statement in child constructor");
    }
}`,
      output: `Creating Car with no-arg constructor:

Vehicle constructor called (no-arg)
Car constructor called (no-arg)
=== Car Details ===
Brand: Unknown, Year: 0
Model: Unknown
Price: Rs.0


Creating Car with parameterized constructor:

Vehicle constructor called (parameterized)
Car constructor called (parameterized)
=== Car Details ===
Brand: Toyota, Year: 2024
Model: Camry
Price: Rs.2500000


Creating Bike:

Vehicle constructor called (parameterized)
Bike constructor called
=== Bike Details ===
Brand: Honda
Year: 2023
Type: Sports

=== Constructor Execution Order ===
1. Parent class constructor executes FIRST
2. Child class constructor executes AFTER
3. super() must be FIRST statement in child constructor`
    },
    {
      id: 22,
      title: 'Interface Inheritance (P12 extends P1, P2)',
      category: 'Interfaces',
      difficulty: 'Medium',
      description: 'Interface P12 inherits from P1 and P2. Each declares one constant and method. Class Q implements P12.',
      topics: ['Interface Inheritance', 'Multiple Inheritance', 'implements keyword', 'extends keyword'],
      explanation: `Interface inheritance characteristics:
• Interface can extend multiple interfaces (multiple inheritance)
• All methods are implicitly public abstract
• All fields are implicitly public static final (constants)
• Class implementing child interface must implement ALL methods
• Provides contract for implementing classes
• Java's solution to multiple inheritance problem`,
      starterCode: `interface P1 {
    // Add constant and method
}

interface P2 {
    // Add constant and method
}

interface P12 extends P1, P2 {
    // Can add additional members
}

class Q implements P12 {
    // Implement all methods
}

public class InterfaceInheritanceDemo {
    public static void main(String[] args) {
        // Create object and test
    }
}`,
      solution: `interface P1 {
    // Constant (public static final by default)
    int MAX_VALUE = 100;

    // Abstract method (public abstract by default)
    void methodP1();
}

interface P2 {
    // Constant
    String MESSAGE = "Hello from P2";

    // Abstract method
    void methodP2();
}

// Interface P12 inherits from both P1 and P2
interface P12 extends P1, P2 {
    // P12 has access to constants and methods from both P1 and P2
    // Can add its own members
    double PI = 3.14159;

    void methodP12();
}

class Q implements P12 {
    // Must implement ALL methods from P1, P2, and P12

    @Override
    public void methodP1() {
        System.out.println("methodP1() implemented");
        System.out.println("MAX_VALUE from P1: " + MAX_VALUE);
    }

    @Override
    public void methodP2() {
        System.out.println("methodP2() implemented");
        System.out.println("MESSAGE from P2: " + MESSAGE);
    }

    @Override
    public void methodP12() {
        System.out.println("methodP12() implemented");
        System.out.println("PI from P12: " + PI);
    }

    public void displayAllConstants() {
        System.out.println("\\n=== All Constants ===");
        System.out.println("P1.MAX_VALUE: " + MAX_VALUE);
        System.out.println("P2.MESSAGE: " + MESSAGE);
        System.out.println("P12.PI: " + PI);
    }
}

public class InterfaceInheritanceDemo {
    public static void main(String[] args) {
        System.out.println("=== Interface Inheritance Demo ===\\n");

        Q obj = new Q();

        System.out.println("Calling methods from P1:");
        obj.methodP1();

        System.out.println("\\nCalling methods from P2:");
        obj.methodP2();

        System.out.println("\\nCalling methods from P12:");
        obj.methodP12();

        obj.displayAllConstants();

        System.out.println("\\n=== Key Points ===");
        System.out.println("1. Interface P12 extends both P1 and P2");
        System.out.println("2. Class Q must implement ALL methods");
        System.out.println("3. Constants are accessible in implementing class");
        System.out.println("4. This is Java's way of multiple inheritance");

        // Polymorphism with interfaces
        System.out.println("\\n=== Polymorphism ===");
        P1 ref1 = obj;
        ref1.methodP1();

        P2 ref2 = obj;
        ref2.methodP2();

        P12 ref12 = obj;
        ref12.methodP1();
        ref12.methodP2();
        ref12.methodP12();
    }
}`,
      output: `=== Interface Inheritance Demo ===

Calling methods from P1:
methodP1() implemented
MAX_VALUE from P1: 100

Calling methods from P2:
methodP2() implemented
MESSAGE from P2: Hello from P2

Calling methods from P12:
methodP12() implemented
PI from P12: 3.14159

=== All Constants ===
P1.MAX_VALUE: 100
P2.MESSAGE: Hello from P2
P12.PI: 3.14159

=== Key Points ===
1. Interface P12 extends both P1 and P2
2. Class Q must implement ALL methods
3. Constants are accessible in implementing class
4. This is Java's way of multiple inheritance

=== Polymorphism ===
methodP1() implemented
MAX_VALUE from P1: 100
methodP2() implemented
MESSAGE from P2: Hello from P2
methodP1() implemented
MAX_VALUE from P1: 100
methodP2() implemented
MESSAGE from P2: Hello from P2
methodP12() implemented
PI from P12: 3.14159`
    },
    {
      id: 23,
      title: 'Method Overriding & Accessibility Rules',
      category: 'Polymorphism',
      difficulty: 'Hard',
      description: 'Method overriding in same package and different packages, demonstrating accessibility rules.',
      topics: ['Method Overriding', 'Access Modifiers', 'Packages', 'Runtime Polymorphism'],
      explanation: `Method overriding rules and accessibility:
• Same method signature in parent and child
• @Override annotation for clarity (optional but recommended)
• Cannot reduce access level (public → protected ❌)
• Can increase access level (protected → public ✓)
• private methods cannot be overridden
• static methods are hidden, not overridden
• final methods cannot be overridden`,
      starterCode: `// Package 1
class ParentA {
    public void publicMethod() { }
    protected void protectedMethod() { }
    // Add more methods
}

class ChildA extends ParentA {
    // Override methods
}

// Package 2
class ChildB extends ParentA {
    // Override with different accessibility
}

public class OverridingDemo {
    public static void main(String[] args) {
        // Test overriding and accessibility
    }
}`,
      solution: `// Simulating package p1
class ParentA {
    public void publicMethod() {
        System.out.println("ParentA - publicMethod");
    }

    protected void protectedMethod() {
        System.out.println("ParentA - protectedMethod");
    }

    void defaultMethod() {  // Package-private
        System.out.println("ParentA - defaultMethod");
    }

    // private methods CANNOT be overridden
    private void privateMethod() {
        System.out.println("ParentA - privateMethod");
    }

    public void callPrivate() {
        privateMethod();
    }
}

// Same package - ChildA can access all except private
class ChildA extends ParentA {
    @Override
    public void publicMethod() {
        System.out.println("ChildA - publicMethod (OVERRIDDEN)");
    }

    @Override
    protected void protectedMethod() {
        System.out.println("ChildA - protectedMethod (OVERRIDDEN)");
    }

    @Override
    void defaultMethod() {
        System.out.println("ChildA - defaultMethod (OVERRIDDEN)");
    }

    // Can increase access level: protected → public
    public void enhancedMethod() {
        System.out.println("ChildA - enhancedMethod");
    }
}

// Simulating different package
class ChildB extends ParentA {
    @Override
    public void publicMethod() {
        System.out.println("ChildB - publicMethod (OVERRIDDEN)");
    }

    // Can access protected in different package (through inheritance)
    @Override
    protected void protectedMethod() {
        System.out.println("ChildB - protectedMethod (OVERRIDDEN)");
    }

    // Increasing access level: protected → public
    @Override
    public void defaultMethod() {  // Note: Changed to public
        System.out.println("ChildB - defaultMethod (public now)");
    }

    // This would cause ERROR - reducing access level
    // @Override
    // private void publicMethod() { }  // ❌ Cannot reduce public → private
}

// Demo of final and static
class Parent {
    public final void finalMethod() {
        System.out.println("Parent - finalMethod (CANNOT override)");
    }

    public static void staticMethod() {
        System.out.println("Parent - staticMethod (hidden, not overridden)");
    }
}

class Child extends Parent {
    // This would cause ERROR
    // public void finalMethod() { }  // ❌ Cannot override final method

    // This HIDES, not overrides
    public static void staticMethod() {
        System.out.println("Child - staticMethod (HIDING, not overriding)");
    }
}

public class OverridingDemo {
    public static void main(String[] args) {
        System.out.println("=== Same Package Overriding ===\\n");
        ParentA parent = new ParentA();
        parent.publicMethod();
        parent.protectedMethod();
        parent.defaultMethod();

        System.out.println();
        ChildA child = new ChildA();
        child.publicMethod();
        child.protectedMethod();
        child.defaultMethod();

        System.out.println("\\n=== Runtime Polymorphism ===\\n");
        ParentA poly = new ChildA();  // Parent reference, child object
        poly.publicMethod();  // Calls ChildA version
        poly.protectedMethod();  // Calls ChildA version

        System.out.println("\\n=== Different Package Simulation ===\\n");
        ParentA poly2 = new ChildB();
        poly2.publicMethod();  // Calls ChildB version
        poly2.protectedMethod();  // Calls ChildB version

        System.out.println("\\n=== Static Method Hiding ===\\n");
        Parent p = new Parent();
        Child c = new Child();
        Parent polyChild = new Child();

        p.staticMethod();  // Parent version
        c.staticMethod();  // Child version
        polyChild.staticMethod();  // Parent version (static binding!)

        System.out.println("\\n=== Access Level Rules ===");
        System.out.println("✓ Can increase: protected → public");
        System.out.println("✓ Can keep same: public → public");
        System.out.println("❌ Cannot reduce: public → protected");
        System.out.println("❌ Cannot override private methods");
        System.out.println("❌ Cannot override final methods");
    }
}`,
      output: `=== Same Package Overriding ===

ParentA - publicMethod
ParentA - protectedMethod
ParentA - defaultMethod

ChildA - publicMethod (OVERRIDDEN)
ChildA - protectedMethod (OVERRIDDEN)
ChildA - defaultMethod (OVERRIDDEN)

=== Runtime Polymorphism ===

ChildA - publicMethod (OVERRIDDEN)
ChildA - protectedMethod (OVERRIDDEN)

=== Different Package Simulation ===

ChildB - publicMethod (OVERRIDDEN)
ChildB - protectedMethod (OVERRIDDEN)

=== Static Method Hiding ===

Parent - staticMethod (hidden, not overridden)
Child - staticMethod (HIDING, not overriding)
Parent - staticMethod (hidden, not overridden)

=== Access Level Rules ===
✓ Can increase: protected → public
✓ Can keep same: public → public
❌ Cannot reduce: public → protected
❌ Cannot override private methods
❌ Cannot override final methods`
    },
    {
      id: 24,
      title: 'Multiple Inheritance using Interfaces',
      category: 'Interfaces',
      difficulty: 'Medium',
      description: 'Demonstrate implementation of multiple inheritance using interfaces.',
      topics: ['Multiple Inheritance', 'Interfaces', 'implements keyword', 'Diamond Problem'],
      explanation: `Multiple inheritance through interfaces:
• Java doesn't allow multiple class inheritance (diamond problem)
• A class can implement multiple interfaces
• Solves ambiguity issues of multiple inheritance
• All interface methods must be implemented
• Interface provides contract without implementation
• Enables flexible design patterns`,
      starterCode: `interface Flyable {
    // Add flying methods
}

interface Swimmable {
    // Add swimming methods
}

class Duck implements Flyable, Swimmable {
    // Implement all interface methods
}

public class MultipleInheritanceDemo {
    public static void main(String[] args) {
        // Test multiple inheritance
    }
}`,
      solution: `interface Flyable {
    int MAX_ALTITUDE = 10000;  // Constant

    void fly();
    void land();
}

interface Swimmable {
    int MAX_DEPTH = 100;  // Constant

    void swim();
    void dive();
}

interface Walkable {
    void walk();
}

// Duck implements multiple interfaces
class Duck implements Flyable, Swimmable, Walkable {
    private String name;

    public Duck(String name) {
        this.name = name;
    }

    // Implementing Flyable methods
    @Override
    public void fly() {
        System.out.println(name + " is flying in the sky!");
    }

    @Override
    public void land() {
        System.out.println(name + " is landing on the ground");
    }

    // Implementing Swimmable methods
    @Override
    public void swim() {
        System.out.println(name + " is swimming in the water");
    }

    @Override
    public void dive() {
        System.out.println(name + " is diving underwater");
    }

    // Implementing Walkable methods
    @Override
    public void walk() {
        System.out.println(name + " is walking on the ground");
    }

    public void displayCapabilities() {
        System.out.println("\\n" + name + " can:");
        System.out.println("- Fly up to " + MAX_ALTITUDE + " feet");
        System.out.println("- Dive up to " + MAX_DEPTH + " feet");
        System.out.println("- Walk, swim, and fly!");
    }
}

// Fish only implements Swimmable
class Fish implements Swimmable {
    private String species;

    public Fish(String species) {
        this.species = species;
    }

    @Override
    public void swim() {
        System.out.println(species + " is swimming gracefully");
    }

    @Override
    public void dive() {
        System.out.println(species + " is diving deep down");
    }
}

// Bird only implements Flyable and Walkable
class Bird implements Flyable, Walkable {
    private String type;

    public Bird(String type) {
        this.type = type;
    }

    @Override
    public void fly() {
        System.out.println(type + " is soaring through the sky");
    }

    @Override
    public void land() {
        System.out.println(type + " is perching on a branch");
    }

    @Override
    public void walk() {
        System.out.println(type + " is hopping on the ground");
    }
}

public class MultipleInheritanceDemo {
    public static void main(String[] args) {
        System.out.println("=== Multiple Inheritance Demo ===\\n");

        // Duck implements ALL three interfaces
        Duck duck = new Duck("Donald Duck");
        System.out.println("--- Duck (Flyable + Swimmable + Walkable) ---");
        duck.fly();
        duck.swim();
        duck.walk();
        duck.land();
        duck.dive();
        duck.displayCapabilities();

        // Fish implements only Swimmable
        System.out.println("\\n--- Fish (Swimmable only) ---");
        Fish fish = new Fish("Goldfish");
        fish.swim();
        fish.dive();

        // Bird implements Flyable and Walkable
        System.out.println("\\n--- Bird (Flyable + Walkable) ---");
        Bird bird = new Bird("Eagle");
        bird.fly();
        bird.walk();
        bird.land();

        // Polymorphism with interfaces
        System.out.println("\\n=== Polymorphism ===\\n");
        Flyable flyingDuck = duck;
        Swimmable swimmingDuck = duck;

        System.out.println("Duck as Flyable:");
        flyingDuck.fly();

        System.out.println("\\nDuck as Swimmable:");
        swimmingDuck.swim();

        System.out.println("\\n=== Why Multiple Inheritance via Interfaces? ===");
        System.out.println("✓ Avoids diamond problem of multiple class inheritance");
        System.out.println("✓ Provides flexibility - mix and match capabilities");
        System.out.println("✓ Enforces contracts without implementation details");
        System.out.println("✓ Enables design patterns like Strategy, Adapter, etc.");
    }
}`,
      output: `=== Multiple Inheritance Demo ===

--- Duck (Flyable + Swimmable + Walkable) ---
Donald Duck is flying in the sky!
Donald Duck is swimming in the water
Donald Duck is walking on the ground
Donald Duck is landing on the ground
Donald Duck is diving underwater

Donald Duck can:
- Fly up to 10000 feet
- Dive up to 100 feet
- Walk, swim, and fly!

--- Fish (Swimmable only) ---
Goldfish is swimming gracefully
Goldfish is diving deep down

--- Bird (Flyable + Walkable) ---
Eagle is soaring through the sky
Eagle is hopping on the ground
Eagle is perching on a branch

=== Polymorphism ===

Duck as Flyable:
Donald Duck is flying in the sky!

Duck as Swimmable:
Donald Duck is swimming in the water

=== Why Multiple Inheritance via Interfaces? ===
✓ Avoids diamond problem of multiple class inheritance
✓ Provides flexibility - mix and match capabilities
✓ Enforces contracts without implementation details
✓ Enables design patterns like Strategy, Adapter, etc.`
    },
    {
      id: 25,
      title: 'Multiple Try-Catch Blocks',
      category: 'Exception Handling',
      difficulty: 'Medium',
      description: 'Demonstrate multiple try blocks and multiple catch exceptions.',
      topics: ['try-catch', 'Multiple Exceptions', 'Exception Hierarchy', 'finally block'],
      explanation: `Multiple exception handling:
• Each try block can have multiple catch blocks
• Catch blocks evaluated in order (specific to general)
• Must catch specific exceptions before general ones
• Multiple try blocks for different code sections
• finally block executes regardless of exception
• Nested try-catch for complex error scenarios`,
      starterCode: `public class MultipleTryCatchDemo {
    public static void main(String[] args) {
        // Add multiple try-catch blocks
        // Handle different exceptions
    }
}`,
      solution: `public class MultipleTryCatchDemo {

    // Method with multiple catch blocks for single try
    public static void testMultipleCatch() {
        System.out.println("=== Single Try, Multiple Catch ===\\n");

        try {
            int[] arr = {1, 2, 3};
            System.out.println("Array element: " + arr[5]);  // ArrayIndexOutOfBoundsException
            int result = 10 / 0;  // ArithmeticException (won't reach here)
            String str = null;
            System.out.println(str.length());  // NullPointerException (won't reach here)

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("❌ Array Index Error: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("❌ Arithmetic Error: " + e.getMessage());
        } catch (NullPointerException e) {
            System.out.println("❌ Null Pointer Error: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("❌ Generic Error: " + e.getMessage());
        } finally {
            System.out.println("✓ Finally block executed\\n");
        }
    }

    // Multiple try-catch blocks
    public static void testMultipleTryBlocks() {
        System.out.println("=== Multiple Try-Catch Blocks ===\\n");

        // First try-catch block
        try {
            System.out.println("Try Block 1: Division");
            int result = 100 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Caught in Block 1: " + e.getMessage());
        } finally {
            System.out.println("Finally Block 1 executed\\n");
        }

        // Second try-catch block
        try {
            System.out.println("Try Block 2: Array Access");
            int[] numbers = {1, 2, 3};
            System.out.println(numbers[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught in Block 2: Index " + e.getMessage());
        } finally {
            System.out.println("Finally Block 2 executed\\n");
        }

        // Third try-catch block
        try {
            System.out.println("Try Block 3: String Operations");
            String text = null;
            System.out.println(text.toUpperCase());
        } catch (NullPointerException e) {
            System.out.println("Caught in Block 3: Null reference error");
        } finally {
            System.out.println("Finally Block 3 executed\\n");
        }
    }

    // Nested try-catch
    public static void testNestedTryCatch() {
        System.out.println("=== Nested Try-Catch ===\\n");

        try {
            System.out.println("Outer try block");
            int a = 10;

            try {
                System.out.println("Inner try block");
                int b = a / 0;  // ArithmeticException
            } catch (ArithmeticException e) {
                System.out.println("Inner catch: " + e.getMessage());
            }

            // This will throw exception in outer try
            int[] arr = new int[5];
            arr[10] = 50;

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Outer catch: " + e.getMessage());
        } finally {
            System.out.println("Outer finally executed\\n");
        }
    }

    // Multi-catch (Java 7+)
    public static void testMultiCatch(int choice) {
        System.out.println("=== Multi-Catch (Java 7+) ===\\n");

        try {
            if (choice == 1) {
                int result = 10 / 0;
            } else if (choice == 2) {
                int[] arr = new int[3];
                arr[5] = 10;
            } else {
                String str = null;
                str.length();
            }
        } catch (ArithmeticException | ArrayIndexOutOfBoundsException | NullPointerException e) {
            System.out.println("Caught multiple exception types: " + e.getClass().getSimpleName());
            System.out.println("Message: " + e.getMessage() + "\\n");
        }
    }

    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║  Multiple Try-Catch Demonstration     ║");
        System.out.println("╚════════════════════════════════════════╝\\n");

        testMultipleCatch();
        testMultipleTryBlocks();
        testNestedTryCatch();
        testMultiCatch(1);
        testMultiCatch(2);
        testMultiCatch(3);

        System.out.println("=== Key Points ===");
        System.out.println("✓ Catch specific exceptions before general ones");
        System.out.println("✓ Each try can have multiple catch blocks");
        System.out.println("✓ Finally always executes (even with return)");
        System.out.println("✓ Multi-catch reduces code duplication");
        System.out.println("✓ Nested try-catch for complex scenarios");
    }
}`,
      output: `╔════════════════════════════════════════╗
║  Multiple Try-Catch Demonstration     ║
╚════════════════════════════════════════╝

=== Single Try, Multiple Catch ===

❌ Array Index Error: Index 5 out of bounds for length 3
✓ Finally block executed

=== Multiple Try-Catch Blocks ===

Try Block 1: Division
Caught in Block 1: / by zero
Finally Block 1 executed

Try Block 2: Array Access
Caught in Block 2: Index 10 out of bounds for length 3
Finally Block 2 executed

Try Block 3: String Operations
Caught in Block 3: Null reference error
Finally Block 3 executed

=== Nested Try-Catch ===

Outer try block
Inner try block
Inner catch: / by zero
Outer catch: Index 10 out of bounds for length 5
Outer finally executed

=== Multi-Catch (Java 7+) ===

Caught multiple exception types: ArithmeticException
Message: / by zero

=== Multi-Catch (Java 7+) ===

Caught multiple exception types: ArrayIndexOutOfBoundsException
Message: Index 5 out of bounds for length 3

=== Multi-Catch (Java 7+) ===

Caught multiple exception types: NullPointerException
Message: null

=== Key Points ===
✓ Catch specific exceptions before general ones
✓ Each try can have multiple catch blocks
✓ Finally always executes (even with return)
✓ Multi-catch reduces code duplication
✓ Nested try-catch for complex scenarios`
    },
    {
      id: 26,
      title: 'Banking Application - Insufficient Fund Exception',
      category: 'Exception Handling',
      difficulty: 'Hard',
      description: 'User deposits Rs 1000, withdraws Rs 400, Rs 300. Throws "Not Sufficient Fund" exception on Rs 500 withdrawal.',
      topics: ['Custom Exceptions', 'Exception Handling', 'Banking Logic', 'Real-world Application'],
      explanation: `Real-world exception handling in banking:
• Custom exception for insufficient balance
• Balance validation before withdrawal
• Exception message with balance details
• Transaction history tracking
• Professional error messages
• Demonstrates practical use of exceptions`,
      starterCode: `class InsufficientFundException extends Exception {
    // Create custom exception
}

class BankAccount {
    private double balance;

    // Add deposit and withdraw methods
}

public class BankingApp {
    public static void main(String[] args) {
        // Test banking operations
    }
}`,
      solution: `// Custom Exception
class InsufficientFundException extends Exception {
    private double balance;
    private double amount;

    public InsufficientFundException(double balance, double amount) {
        super("Insufficient funds! Required: Rs." + amount + ", Available: Rs." + balance);
        this.balance = balance;
        this.amount = amount;
    }

    public double getBalance() {
        return balance;
    }

    public double getShortfall() {
        return amount - balance;
    }
}

class BankAccount {
    private String accountHolder;
    private String accountNumber;
    private double balance;
    private int transactionCount;

    public BankAccount(String accountHolder, String accountNumber) {
        this.accountHolder = accountHolder;
        this.accountNumber = accountNumber;
        this.balance = 0.0;
        this.transactionCount = 0;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            transactionCount++;
            System.out.println("\\n💰 DEPOSIT: Rs." + amount);
            System.out.println("✓ New Balance: Rs." + balance);
        } else {
            System.out.println("❌ Invalid deposit amount!");
        }
    }

    public void withdraw(double amount) throws InsufficientFundException {
        System.out.println("\\n💳 WITHDRAWAL REQUEST: Rs." + amount);

        if (amount <= 0) {
            System.out.println("❌ Invalid withdrawal amount!");
            return;
        }

        if (amount > balance) {
            throw new InsufficientFundException(balance, amount);
        }

        balance -= amount;
        transactionCount++;
        System.out.println("✓ Withdrawal Successful");
        System.out.println("✓ New Balance: Rs." + balance);
    }

    public void checkBalance() {
        System.out.println("\\n📊 Current Balance: Rs." + balance);
    }

    public void displayAccountInfo() {
        System.out.println("\\n╔════════════════════════════════╗");
        System.out.println("║      ACCOUNT INFORMATION       ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Current Balance: Rs." + balance);
        System.out.println("Total Transactions: " + transactionCount);
    }
}

public class BankingApp {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║    BANKING APPLICATION SYSTEM          ║");
        System.out.println("╚════════════════════════════════════════╝");

        BankAccount account = new BankAccount("John Doe", "ACC123456");
        account.displayAccountInfo();

        try {
            // Initial deposit of Rs 1000
            System.out.println("\\n--- Transaction 1: Deposit ---");
            account.deposit(1000);
            account.checkBalance();

            // First withdrawal of Rs 400
            System.out.println("\\n--- Transaction 2: Withdraw Rs 400 ---");
            account.withdraw(400);
            account.checkBalance();

            // Second withdrawal of Rs 300
            System.out.println("\\n--- Transaction 3: Withdraw Rs 300 ---");
            account.withdraw(300);
            account.checkBalance();

            // Third withdrawal of Rs 500 (This will fail!)
            System.out.println("\\n--- Transaction 4: Withdraw Rs 500 ---");
            account.withdraw(500);  // Throws InsufficientFundException
            System.out.println("This line won't execute!");

        } catch (InsufficientFundException e) {
            System.out.println("\\n❌ TRANSACTION FAILED!");
            System.out.println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            System.out.println("Error: " + e.getMessage());
            System.out.println("Shortfall: Rs." + e.getShortfall());
            System.out.println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        } finally {
            System.out.println("\\n--- Final Account Status ---");
            account.displayAccountInfo();
            System.out.println("\\nThank you for using our banking system!");
        }

        // Additional test case
        System.out.println("\\n\\n╔════════════════════════════════════════╗");
        System.out.println("║       TEST CASE 2: Zero Balance        ║");
        System.out.println("╚════════════════════════════════════════╝");

        BankAccount emptyAccount = new BankAccount("Jane Smith", "ACC789012");
        try {
            emptyAccount.withdraw(100);
        } catch (InsufficientFundException e) {
            System.out.println("\\n❌ " + e.getMessage());
            System.out.println("Please deposit funds first!");
        }
    }
}`,
      output: `╔════════════════════════════════════════╗
║    BANKING APPLICATION SYSTEM          ║
╚════════════════════════════════════════╝

╔════════════════════════════════╗
║      ACCOUNT INFORMATION       ║
╚════════════════════════════════╝
Account Holder: John Doe
Account Number: ACC123456
Current Balance: Rs.0.0
Total Transactions: 0

--- Transaction 1: Deposit ---

💰 DEPOSIT: Rs.1000.0
✓ New Balance: Rs.1000.0

📊 Current Balance: Rs.1000.0

--- Transaction 2: Withdraw Rs 400 ---

💳 WITHDRAWAL REQUEST: Rs.400.0
✓ Withdrawal Successful
✓ New Balance: Rs.600.0

📊 Current Balance: Rs.600.0

--- Transaction 3: Withdraw Rs 300 ---

💳 WITHDRAWAL REQUEST: Rs.300.0
✓ Withdrawal Successful
✓ New Balance: Rs.300.0

📊 Current Balance: Rs.300.0

--- Transaction 4: Withdraw Rs 500 ---

💳 WITHDRAWAL REQUEST: Rs.500.0

❌ TRANSACTION FAILED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Error: Insufficient funds! Required: Rs.500.0, Available: Rs.300.0
Shortfall: Rs.200.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

--- Final Account Status ---

╔════════════════════════════════╗
║      ACCOUNT INFORMATION       ║
╚════════════════════════════════╝
Account Holder: John Doe
Account Number: ACC123456
Current Balance: Rs.300.0
Total Transactions: 3

Thank you for using our banking system!


╔════════════════════════════════════════╗
║       TEST CASE 2: Zero Balance        ║
╚════════════════════════════════════════╝

💳 WITHDRAWAL REQUEST: Rs.100.0

❌ Insufficient funds! Required: Rs.100.0, Available: Rs.0.0
Please deposit funds first!`
    },
    {
      id: 27,
      title: 'Even-Odd Thread Program',
      category: 'Multithreading',
      difficulty: 'Hard',
      description: 'Two threads: one prints even numbers, other prints odd numbers from 1 to 50.',
      topics: ['Multithreading', 'Synchronization', 'Thread Communication', 'wait()', 'notify()'],
      explanation: `Thread synchronization and communication:
• Two threads working on shared resource
• wait() pauses thread until notify() is called
• notify() wakes up waiting thread
• synchronized block ensures thread-safety
• Threads communicate to print in sequence
• Demonstrates inter-thread communication`,
      starterCode: `class NumberPrinter {
    private int number = 1;
    private boolean isOddTurn = true;

    // Add synchronized methods for even and odd
}

class EvenThread extends Thread {
    // Print even numbers
}

class OddThread extends Thread {
    // Print odd numbers
}

public class EvenOddThreadDemo {
    public static void main(String[] args) {
        // Start both threads
    }
}`,
      solution: `class NumberPrinter {
    private int number = 1;
    private final int MAX = 50;
    private boolean isOddTurn = true;

    // Method for printing odd numbers
    public synchronized void printOdd() {
        while (number <= MAX) {
            // Wait if it's not odd's turn
            while (!isOddTurn) {
                try {
                    wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

            // Check again after waking up
            if (number <= MAX) {
                System.out.println("ODD Thread: " + number);
                number++;
                isOddTurn = false;
                notify();  // Wake up even thread
            }
        }
    }

    // Method for printing even numbers
    public synchronized void printEven() {
        while (number <= MAX) {
            // Wait if it's not even's turn
            while (isOddTurn) {
                try {
                    wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

            // Check again after waking up
            if (number <= MAX) {
                System.out.println("EVEN Thread: " + number);
                number++;
                isOddTurn = true;
                notify();  // Wake up odd thread
            }
        }
    }
}

class OddThread extends Thread {
    private NumberPrinter printer;

    public OddThread(NumberPrinter printer) {
        this.printer = printer;
    }

    @Override
    public void run() {
        printer.printOdd();
    }
}

class EvenThread extends Thread {
    private NumberPrinter printer;

    public EvenThread(NumberPrinter printer) {
        this.printer = printer;
    }

    @Override
    public void run() {
        printer.printEven();
    }
}

public class EvenOddThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║   EVEN-ODD THREAD DEMONSTRATION        ║");
        System.out.println("║   Printing 1 to 50 with 2 Threads     ║");
        System.out.println("╚════════════════════════════════════════╝\\n");

        NumberPrinter printer = new NumberPrinter();

        OddThread oddThread = new OddThread(printer);
        EvenThread evenThread = new EvenThread(printer);

        // Start both threads
        oddThread.start();
        evenThread.start();

        // Wait for both threads to finish
        oddThread.join();
        evenThread.join();

        System.out.println("\\n╔════════════════════════════════════════╗");
        System.out.println("║          EXECUTION COMPLETE            ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("\\n=== Key Concepts ===");
        System.out.println("✓ Two threads coordinating using wait() and notify()");
        System.out.println("✓ Synchronized methods prevent race conditions");
        System.out.println("✓ wait() releases lock and pauses thread");
        System.out.println("✓ notify() wakes up one waiting thread");
        System.out.println("✓ Inter-thread communication for sequential output");
    }
}`,
      output: `╔════════════════════════════════════════╗
║   EVEN-ODD THREAD DEMONSTRATION        ║
║   Printing 1 to 50 with 2 Threads     ║
╚════════════════════════════════════════╝

ODD Thread: 1
EVEN Thread: 2
ODD Thread: 3
EVEN Thread: 4
ODD Thread: 5
EVEN Thread: 6
ODD Thread: 7
EVEN Thread: 8
ODD Thread: 9
EVEN Thread: 10
ODD Thread: 11
EVEN Thread: 12
ODD Thread: 13
EVEN Thread: 14
ODD Thread: 15
EVEN Thread: 16
ODD Thread: 17
EVEN Thread: 18
ODD Thread: 19
EVEN Thread: 20
ODD Thread: 21
EVEN Thread: 22
ODD Thread: 23
EVEN Thread: 24
ODD Thread: 25
EVEN Thread: 26
ODD Thread: 27
EVEN Thread: 28
ODD Thread: 29
EVEN Thread: 30
ODD Thread: 31
EVEN Thread: 32
ODD Thread: 33
EVEN Thread: 34
ODD Thread: 35
EVEN Thread: 36
ODD Thread: 37
EVEN Thread: 38
ODD Thread: 39
EVEN Thread: 40
ODD Thread: 41
EVEN Thread: 42
ODD Thread: 43
EVEN Thread: 44
ODD Thread: 45
EVEN Thread: 46
ODD Thread: 47
EVEN Thread: 48
ODD Thread: 49
EVEN Thread: 50

╔════════════════════════════════════════╗
║          EXECUTION COMPLETE            ║
╚════════════════════════════════════════╝

=== Key Concepts ===
✓ Two threads coordinating using wait() and notify()
✓ Synchronized methods prevent race conditions
✓ wait() releases lock and pauses thread
✓ notify() wakes up one waiting thread
✓ Inter-thread communication for sequential output`
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
