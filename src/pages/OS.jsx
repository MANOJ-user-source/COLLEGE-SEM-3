import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Torus, Cone, Environment, Stars } from '@react-three/drei'
import { AnimatePresence } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

// Animated Terminal Sphere
function TerminalSphere({ position, color, scale = 1 }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.z += 0.002
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
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  )
}

// Animated Cone
function AnimatedCone({ position, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <Cone ref={meshRef} position={position} args={[1, 2, 32]}>
      <MeshDistortMaterial
        color={color}
        distort={0.3}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    </Cone>
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
function OSScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06b6d4" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#14b8a6" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="city" />
      <TerminalSphere position={[0, 2, 0]} color="#10b981" scale={1.5} />
      <TerminalSphere position={[-3, -1, 0]} color="#06b6d4" scale={1} />
      <TerminalSphere position={[3, -1, 0]} color="#14b8a6" scale={1} />
      <AnimatedCone position={[-5, 0, -3]} color="#22d3ee" />
      <AnimatedCone position={[5, 0, -3]} color="#2dd4bf" />
      <AnimatedRing position={[0, -3, 1]} color="#10b981" />
      <Float speed={2} rotationIntensity={1} floatIntensity={3}>
        <Torus position={[-4, 3, -2]} args={[0.6, 0.2, 16, 100]}>
          <meshStandardMaterial color="#34d399" metalness={0.9} roughness={0.1} />
        </Torus>
      </Float>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Torus position={[4, 3, -2]} args={[0.6, 0.2, 16, 100]}>
          <meshStandardMaterial color="#5eead4" metalness={0.9} roughness={0.1} />
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
function CodeBlock({ code, language = 'bash' }) {
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
        className="absolute right-3 top-3 z-10 px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-500/50 transition-all"
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

// Main OS Page Component
function OS() {
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

  // Shell Script Practicals from GTU Syllabus
  const practicalTasks = [
    {
      id: 1,
      title: 'Shell Commands - Basic Operations',
      category: 'Shell Commands',
      difficulty: 'Easy',
      description: 'Learn essential Linux/Unix shell commands for file and system operations.',
      topics: ['date', 'ls', 'who', 'cal', 'ps', 'wc', 'cat', 'mkdir', 'grep', 'sed', 'awk'],
      explanation: `Essential shell commands for daily operations:
• date - Display current date and time
• ls - List directory contents
• who - Show who is logged in
• cal - Display calendar
• ps - Show running processes
• wc - Count lines, words, characters
• cat - Display file contents
• pwd - Print working directory
• grep - Search text patterns
• sed - Stream editor for text manipulation
• awk - Pattern scanning and processing`,
      starterCode: `# Try these commands in your terminal:

date                    # Display current date/time
ls -la                  # List all files with details
who                     # Show logged in users
cal                     # Display current month calendar
ps aux                  # Show all running processes
wc -l filename.txt      # Count lines in file
cat filename.txt        # Display file contents
pwd                     # Print working directory
mkdir newdir            # Create new directory
grep "pattern" file     # Search pattern in file
sed 's/old/new/g' file  # Replace text in file
awk '{print $1}' file   # Print first column`,
      solution: `# Common Shell Commands with Examples

# Date and time operations
date                           # Current date/time
date "+%Y-%m-%d %H:%M:%S"     # Custom format

# File listing
ls                             # Simple list
ls -l                          # Long format
ls -la                         # Include hidden files
ls -lh                         # Human readable sizes

# User information
who                            # Who is logged in
whoami                         # Current user
id                             # User and group IDs

# File operations
cat file.txt                   # Display file
cat file1 file2 > merged.txt   # Concatenate files
head -n 10 file.txt            # First 10 lines
tail -n 10 file.txt            # Last 10 lines
wc -l file.txt                 # Count lines
wc -w file.txt                 # Count words

# Directory operations
pwd                            # Current directory
mkdir mydir                    # Create directory
mkdir -p parent/child          # Create nested dirs
rmdir emptydir                 # Remove empty directory
cd /path/to/dir                # Change directory

# Process management
ps                             # Current processes
ps aux                         # All processes detailed
ps -ef | grep nginx            # Find nginx processes

# Text search and manipulation
grep "error" logfile.txt       # Search for "error"
grep -i "error" log.txt        # Case insensitive
grep -r "pattern" /path        # Recursive search
sed 's/old/new/g' file.txt     # Replace all occurrences
awk '{print $1, $3}' data.txt  # Print columns 1 and 3`,
      output: `$ date
Fri Oct 31 14:30:45 IST 2025

$ ls -la
total 32
drwxr-xr-x  4 user user 4096 Oct 31 14:30 .
drwxr-xr-x 10 user user 4096 Oct 31 14:25 ..
-rw-r--r--  1 user user  220 Oct 31 14:20 file.txt

$ who
user     tty7         2025-10-31 09:00 (:0)

$ wc -l file.txt
15 file.txt`
    },
    {
      id: 2,
      title: 'Display Executable Files, Directories and Zero-Sized Files',
      category: 'File Operations',
      difficulty: 'Easy',
      description: 'Write a shell script to display all executable files, directories and zero sized files from current directory.',
      topics: ['find', 'file permissions', 'test operators'],
      explanation: `File testing in shell scripts:
• -x flag tests if file is executable
• -d flag tests if path is a directory
• -s flag tests if file is NOT empty
• ! -s tests if file IS empty (zero size)
• for loop iterates through files
• * wildcard matches all files`,
      starterCode: `#!/bin/bash

# Script to display executable files, directories, and zero-sized files

# Your code here`,
      solution: `#!/bin/bash

echo "=== Executable Files ==="
for file in *; do
    if [ -f "$file" ] && [ -x "$file" ]; then
        echo "$file"
    fi
done

echo -e "\\n=== Directories ==="
for item in *; do
    if [ -d "$item" ]; then
        echo "$item"
    fi
done

echo -e "\\n=== Zero-Sized Files ==="
for file in *; do
    if [ -f "$file" ] && [ ! -s "$file" ]; then
        echo "$file"
    fi
done`,
      output: `=== Executable Files ===
script.sh
program.out

=== Directories ===
folder1
docs
temp

=== Zero-Sized Files ===
empty.txt
placeholder.log`
    },
    {
      id: 3,
      title: 'Palindrome Checker',
      category: 'String Manipulation',
      difficulty: 'Easy',
      description: 'Write a shell script to check if entered string is palindrome or not.',
      topics: ['rev command', 'string comparison', 'input/output'],
      explanation: `Palindrome checking logic:
• rev command reverses a string
• read gets user input
• Store original in variable
• Compare original with reversed version
• Use command substitution $(...)
• if-else for conditional logic`,
      starterCode: `#!/bin/bash

# Palindrome checker

echo "Enter a string:"
read str

# Your code here`,
      solution: `#!/bin/bash

echo "Enter a string:"
read str

# Remove spaces and convert to lowercase
clean_str=$(echo "$str" | tr -d ' ' | tr '[:upper:]' '[:lower:]')

# Reverse the string
reversed=$(echo "$clean_str" | rev)

# Check if palindrome
if [ "$clean_str" = "$reversed" ]; then
    echo "'$str' is a palindrome"
else
    echo "'$str' is not a palindrome"
fi`,
      output: `Enter a string:
madam
'madam' is a palindrome

Enter a string:
racecar
'racecar' is a palindrome

Enter a string:
hello
'hello' is not a palindrome`
    },
    {
      id: 4,
      title: 'Shell Programming Using Filters',
      category: 'Filters',
      difficulty: 'Medium',
      description: 'Demonstrate shell programming using filters including grep, egrep, and fgrep.',
      topics: ['grep', 'egrep', 'fgrep', 'pipes', 'filters'],
      explanation: `Understanding grep family:
• grep - Search using basic regex
• egrep - Extended regex (|, +, ?, {})
• fgrep - Fast, literal string search (no regex)
• -i for case insensitive
• -v for inverse match
• -n for line numbers
• -c for count
• Can chain with pipes |`,
      starterCode: `#!/bin/bash

# Create sample file
cat > sample.txt << EOF
Apple
banana
CHERRY
apple pie
Banana split
EOF

# Your grep examples here`,
      solution: `#!/bin/bash

# Create sample file
cat > sample.txt << EOF
Apple 100
banana 200
CHERRY 150
apple pie 300
Banana split 250
grape 180
orange 220
EOF

echo "=== Basic grep (case sensitive) ==="
grep "apple" sample.txt

echo -e "\\n=== grep -i (case insensitive) ==="
grep -i "apple" sample.txt

echo -e "\\n=== grep -v (inverse match - exclude) ==="
grep -v "apple" sample.txt

echo -e "\\n=== grep -n (with line numbers) ==="
grep -n "an" sample.txt

echo -e "\\n=== grep -c (count matches) ==="
grep -c "a" sample.txt

echo -e "\\n=== egrep (extended regex - OR) ==="
egrep "apple|banana" sample.txt

echo -e "\\n=== egrep (pattern with +) ==="
egrep "ban+" sample.txt

echo -e "\\n=== fgrep (literal string, no regex) ==="
fgrep "apple pie" sample.txt

echo -e "\\n=== Combining with awk (filter and print) ==="
grep "an" sample.txt | awk '{print $1, $2}'

echo -e "\\n=== Chaining filters ==="
cat sample.txt | grep -i "apple" | wc -l

# Cleanup
rm sample.txt`,
      output: `=== Basic grep (case sensitive) ===
apple pie 300

=== grep -i (case insensitive) ===
Apple 100
apple pie 300

=== grep -n (with line numbers) ===
2:banana 200
5:Banana split 250
6:grape 180
7:orange 220

=== egrep (extended regex - OR) ===
banana 200
apple pie 300
Banana split 250`
    },
    {
      id: 5,
      title: 'Date Validation',
      category: 'Validation',
      difficulty: 'Medium',
      description: 'Write a shell script to validate the entered date (format: dd-mm-yyyy).',
      topics: ['regex', 'date validation', 'conditional logic'],
      explanation: `Date validation involves:
• Checking format dd-mm-yyyy
• Day range: 1-31
• Month range: 1-12
• Year range validation
• Leap year checking
• Days in month validation
• Using regex for pattern matching`,
      starterCode: `#!/bin/bash

echo "Enter date (dd-mm-yyyy):"
read date

# Your validation code here`,
      solution: `#!/bin/bash

echo "Enter date (dd-mm-yyyy):"
read date

# Check format using regex
if [[ ! $date =~ ^[0-9]{2}-[0-9]{2}-[0-9]{4}$ ]]; then
    echo "Invalid format! Use dd-mm-yyyy"
    exit 1
fi

# Extract day, month, year
day=$(echo $date | cut -d'-' -f1)
month=$(echo $date | cut -d'-' -f2)
year=$(echo $date | cut -d'-' -f3)

# Remove leading zeros for comparison
day=$((10#$day))
month=$((10#$month))
year=$((10#$year))

# Validate month
if [ $month -lt 1 ] || [ $month -gt 12 ]; then
    echo "Invalid month! Must be between 01-12"
    exit 1
fi

# Check leap year
is_leap=0
if [ $((year % 400)) -eq 0 ] || ( [ $((year % 4)) -eq 0 ] && [ $((year % 100)) -ne 0 ] ); then
    is_leap=1
fi

# Days in each month
case $month in
    1|3|5|7|8|10|12) max_days=31 ;;
    4|6|9|11) max_days=30 ;;
    2)
        if [ $is_leap -eq 1 ]; then
            max_days=29
        else
            max_days=28
        fi
        ;;
esac

# Validate day
if [ $day -lt 1 ] || [ $day -gt $max_days ]; then
    echo "Invalid day! Must be between 01-$max_days for month $month"
    exit 1
fi

echo "Valid date: $date"`,
      output: `Enter date (dd-mm-yyyy):
31-12-2025
Valid date: 31-12-2025

Enter date (dd-mm-yyyy):
29-02-2024
Valid date: 29-02-2024

Enter date (dd-mm-yyyy):
31-04-2025
Invalid day! Must be between 01-30 for month 4`
    },
    {
      id: 6,
      title: 'File and Directory Management Menu',
      category: 'File Operations',
      difficulty: 'Medium',
      description: 'Create a menu-based script for file and directory operations (display, list, make, change directory, copy, rename).',
      topics: ['case statement', 'menu', 'file operations', 'loops'],
      explanation: `Menu-based script structure:
• while loop for continuous menu
• case statement for menu options
• pwd - print working directory
• ls - list directory
• mkdir - make directory
• cd - change directory
• cp - copy file
• mv - rename/move file
• read for user input`,
      starterCode: `#!/bin/bash

while true; do
    echo "\\n=== File Management Menu ==="
    echo "1. Display current directory"
    echo "2. List directory"
    # Add more options

    read -p "Enter choice: " choice

    case $choice in
        1) # Your code ;;
        # Add more cases
    esac
done`,
      solution: `#!/bin/bash

while true; do
    echo "\\n==============================="
    echo "  File Management Menu"
    echo "==============================="
    echo "1. Display current directory"
    echo "2. List directory"
    echo "3. Make directory"
    echo "4. Change directory"
    echo "5. Copy a file"
    echo "6. Rename a file"
    echo "7. Exit"
    echo "==============================="

    read -p "Enter your choice [1-7]: " choice

    case $choice in
        1)
            echo "Current directory: $(pwd)"
            ;;
        2)
            echo "Directory contents:"
            ls -la
            ;;
        3)
            read -p "Enter directory name to create: " dirname
            mkdir -p "$dirname" 2>/dev/null
            if [ $? -eq 0 ]; then
                echo "Directory '$dirname' created successfully"
            else
                echo "Failed to create directory"
            fi
            ;;
        4)
            read -p "Enter directory path: " dirpath
            cd "$dirpath" 2>/dev/null
            if [ $? -eq 0 ]; then
                echo "Changed to: $(pwd)"
            else
                echo "Directory not found"
            fi
            ;;
        5)
            read -p "Enter source file: " src
            read -p "Enter destination: " dest
            cp "$src" "$dest" 2>/dev/null
            if [ $? -eq 0 ]; then
                echo "File copied successfully"
            else
                echo "Failed to copy file"
            fi
            ;;
        6)
            read -p "Enter current filename: " oldname
            read -p "Enter new filename: " newname
            mv "$oldname" "$newname" 2>/dev/null
            if [ $? -eq 0 ]; then
                echo "File renamed successfully"
            else
                echo "Failed to rename file"
            fi
            ;;
        7)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo "Invalid choice! Please enter 1-7"
            ;;
    esac

    read -p "\\nPress Enter to continue..."
done`,
      output: `===============================
  File Management Menu
===============================
1. Display current directory
2. List directory
3. Make directory
4. Change directory
5. Copy a file
6. Rename a file
7. Exit
===============================
Enter your choice [1-7]: 1
Current directory: /home/user/documents

Enter your choice [1-7]: 3
Enter directory name to create: testdir
Directory 'testdir' created successfully`
    },
    {
      id: 7,
      title: 'Text File Analysis',
      category: 'Text Processing',
      difficulty: 'Medium',
      description: 'Read a text file and output: character/word/line count, file in reverse, word frequency, and case conversion.',
      topics: ['wc', 'tac', 'rev', 'grep', 'sort', 'tr', 'uniq'],
      explanation: `Text processing commands:
• wc -c counts characters
• wc -w counts words
• wc -l counts lines
• tac reverses file line by line
• rev reverses each line character by character
• tr converts case
• sort | uniq -c for frequency count
• grep -o extracts matching words`,
      starterCode: `#!/bin/bash

read -p "Enter filename: " filename

# Your analysis code here`,
      solution: `#!/bin/bash

echo "Enter filename:"
read filename

if [ ! -f "$filename" ]; then
    echo "File not found!"
    exit 1
fi

echo "\\n=== 1. Count of characters, words, and lines ==="
chars=$(wc -c < "$filename")
words=$(wc -w < "$filename")
lines=$(wc -l < "$filename")
echo "Characters: $chars"
echo "Words: $words"
echo "Lines: $lines"

echo "\\n=== 2. File in reverse ==="
tac "$filename"

echo "\\n=== 3. Frequency of a particular word ==="
read -p "Enter word to search: " word
count=$(grep -ow "$word" "$filename" | wc -l)
echo "The word '$word' appears $count times"

echo "\\n=== 4. Convert to lowercase ==="
tr '[:upper:]' '[:lower:]' < "$filename"

echo "\\n=== Word Frequency (Top 10) ==="
cat "$filename" | tr -s '[:space:]' '\\n' | tr '[:upper:]' '[:lower:]' | \\
    sort | uniq -c | sort -nr | head -10`,
      output: `Enter filename:
sample.txt

=== 1. Count of characters, words, and lines ===
Characters: 256
Words: 45
Lines: 8

=== 2. File in reverse ===
Last line of file
Second to last line
...

=== 3. Frequency of a particular word ===
Enter word to search: the
The word 'the' appears 5 times

=== 4. Convert to lowercase ===
this is the file in lowercase...`
    },
    {
      id: 8,
      title: 'Sort Numbers in Descending Order',
      category: 'Array Operations',
      difficulty: 'Medium',
      description: 'Read n numbers as command arguments and sort them in descending order.',
      topics: ['command line arguments', 'arrays', 'sorting', 'loops'],
      explanation: `Command line argument handling:
• ${'$@'} represents all arguments
• ${'$#'} gives argument count
• Arrays store multiple values
• Bubble sort for manual sorting
• sort -nr for system sort (numeric reverse)
• for loops for iteration`,
      starterCode: `#!/bin/bash

# Check if arguments provided
if [ \\$# -eq 0 ]; then
    echo "Usage: \\$0 num1 num2 num3 ..."
    exit 1
fi

# Your sorting code here`,
      solution: `#!/bin/bash

# Check if arguments provided
if [ \\$# -eq 0 ]; then
    echo "Usage: \\$0 num1 num2 num3 ..."
    exit 1
fi

# Store arguments in array
numbers=("\\${'@'}")
n=\\${'${#numbers[@]}'}

echo "Original numbers: \\${'${numbers[@]}'}"

# Bubble sort in descending order
for ((i=0; i<n; i++)); do
    for ((j=0; j<n-i-1; j++)); do
        if [ \\${'${numbers[j]}'} -lt \\${'${numbers[j+1]}'} ]; then
            # Swap
            temp=\\${'${numbers[j]}'}
            numbers[j]=\\${'${numbers[j+1]}'}
            numbers[j+1]=\\$temp
        fi
    done
done

echo "Sorted (descending): \\${'${numbers[@]}'}"

# Alternative: Using sort command
echo "\\\\nUsing sort command:"
echo "\\${'@'}" | tr ' ' '\\\\n' | sort -nr | tr '\\\\n' ' '
echo`,
      output: `$ ./sort.sh 45 23 67 12 89 34 56
Original numbers: 45 23 67 12 89 34 56
Sorted (descending): 89 67 56 45 34 23 12

Using sort command:
89 67 56 45 34 23 12`
    },
    {
      id: 9,
      title: 'Add Include Statement to C Files',
      category: 'Text Processing',
      difficulty: 'Hard',
      description: 'Add #include <stdio.h> at the beginning of every C source file containing printf and fprintf.',
      topics: ['find', 'grep', 'sed', 'file manipulation'],
      explanation: `Advanced file manipulation:
• find locates C files
• grep checks for printf/fprintf
• sed inserts text at beginning
• -i flag for in-place editing
• 1i inserts at line 1
• Conditional file processing
• Backup before modification`,
      starterCode: `#!/bin/bash

# Find all .c files containing printf or fprintf
# Add #include <stdio.h> at the beginning

# Your code here`,
      solution: `#!/bin/bash

echo "Finding C files with printf/fprintf..."

# Find all .c files in current directory
for file in *.c; do
    # Check if file exists (in case no .c files)
    if [ ! -f "$file" ]; then
        echo "No C files found in current directory"
        break
    fi

    # Check if file contains printf or fprintf
    if grep -q "printf\\|fprintf" "$file"; then
        # Check if stdio.h is already included
        if ! grep -q "#include.*stdio\\.h" "$file"; then
            echo "Processing: $file"

            # Create backup
            cp "$file" "$file.bak"

            # Add #include <stdio.h> at the beginning
            sed -i '1i #include <stdio.h>' "$file"

            echo "  ✓ Added #include <stdio.h>"
        else
            echo "Skipping: $file (already has stdio.h)"
        fi
    else
        echo "Skipping: $file (no printf/fprintf found)"
    fi
done

echo "\\nDone! Backups saved with .bak extension"`,
      output: `Finding C files with printf/fprintf...
Processing: program1.c
  ✓ Added #include <stdio.h>
Processing: test.c
  ✓ Added #include <stdio.h>
Skipping: main.c (already has stdio.h)
Skipping: calc.c (no printf/fprintf found)

Done! Backups saved with .bak extension`
    },
    {
      id: 10,
      title: 'Generate Mark Sheet from File',
      category: 'Data Processing',
      difficulty: 'Hard',
      description: 'Read student data (rollno, name, marks of 3 subjects) from file and generate mark sheet.',
      topics: ['file reading', 'arithmetic', 'formatting', 'awk'],
      explanation: `Mark sheet generation:
• Read data from file line by line
• Calculate total and percentage
• Determine grade based on percentage
• Format output in tabular form
• Use awk for column processing
• printf for formatted output`,
      starterCode: `#!/bin/bash

# Sample data file format:
# rollno name subject1 subject2 subject3

datafile="students.txt"

# Your code here`,
      solution: `#!/bin/bash

datafile="students.txt"

# Create sample data file if not exists
if [ ! -f "$datafile" ]; then
    cat > "$datafile" << EOF
101 Alice 85 90 88
102 Bob 72 68 75
103 Charlie 91 95 89
104 Diana 65 70 68
105 Eve 45 50 48
EOF
fi

echo "=============================================="
echo "           STUDENT MARK SHEET"
echo "=============================================="
printf "%-8s %-12s %-6s %-6s %-6s %-7s %-8s %-6s\\n" \\
    "Roll No" "Name" "Sub1" "Sub2" "Sub3" "Total" "Percent" "Grade"
echo "=============================================="

while read rollno name sub1 sub2 sub3; do
    # Calculate total and percentage
    total=$((sub1 + sub2 + sub3))
    percent=$((total * 100 / 300))

    # Determine grade
    if [ $percent -ge 90 ]; then
        grade="A+"
    elif [ $percent -ge 80 ]; then
        grade="A"
    elif [ $percent -ge 70 ]; then
        grade="B"
    elif [ $percent -ge 60 ]; then
        grade="C"
    elif [ $percent -ge 50 ]; then
        grade="D"
    else
        grade="F"
    fi

    # Print formatted output
    printf "%-8s %-12s %-6d %-6d %-6d %-7d %-8d %-6s\\n" \\
        "$rollno" "$name" "$sub1" "$sub2" "$sub3" "$total" "$percent%" "$grade"

done < "$datafile"

echo "=============================================="

# Alternative using awk (more elegant)
echo "\\n=== Using awk for same result ==="
awk '{
    total = $3 + $4 + $5
    percent = total * 100 / 300

    if (percent >= 90) grade = "A+"
    else if (percent >= 80) grade = "A"
    else if (percent >= 70) grade = "B"
    else if (percent >= 60) grade = "C"
    else if (percent >= 50) grade = "D"
    else grade = "F"

    printf "%-8s %-12s %3d %3d %3d %5d %5d%% %4s\\n",
        $1, $2, $3, $4, $5, total, percent, grade
}' "$datafile"`,
      output: `==============================================
           STUDENT MARK SHEET
==============================================
Roll No  Name         Sub1   Sub2   Sub3   Total   Percent  Grade
==============================================
101      Alice        85     90     88     263     87%      A
102      Bob          72     68     75     215     71%      B
103      Charlie      91     95     89     275     91%      A+
104      Diana        65     70     68     203     67%      C
105      Eve          45     50     48     143     47%      F
==============================================`
    },
    {
      id: 11,
      title: 'Compare Files in Different Directories',
      category: 'File Operations',
      difficulty: 'Hard',
      description: 'Compare identically named files in two directories and copy same files to a third directory.',
      topics: ['find', 'diff', 'file comparison', 'loops'],
      explanation: `File comparison workflow:
• Iterate through files in directory 1
• Check if same filename exists in directory 2
• Use diff to compare file contents
• $? returns last command status (0=success)
• Copy identical files to third directory
• basename extracts filename from path`,
      starterCode: `#!/bin/bash

read -p "Enter first directory: " dir1
read -p "Enter second directory: " dir2
read -p "Enter destination directory: " dir3

# Your comparison code here`,
      solution: `#!/bin/bash

echo "File Comparison and Copy Tool"
echo "=============================="

read -p "Enter first directory: " dir1
read -p "Enter second directory: " dir2
read -p "Enter destination directory: " dir3

# Validate directories
if [ ! -d "$dir1" ]; then
    echo "Error: First directory doesn't exist"
    exit 1
fi

if [ ! -d "$dir2" ]; then
    echo "Error: Second directory doesn't exist"
    exit 1
fi

# Create destination directory if it doesn't exist
mkdir -p "$dir3"

echo "\\nComparing files..."
echo "=================="

identical_count=0
different_count=0

# Iterate through files in first directory
for file1 in "$dir1"/*; do
    # Skip if not a regular file
    if [ ! -f "$file1" ]; then
        continue
    fi

    # Get filename
    filename=$(basename "$file1")
    file2="$dir2/$filename"

    # Check if same file exists in second directory
    if [ -f "$file2" ]; then
        # Compare files
        if diff -q "$file1" "$file2" > /dev/null 2>&1; then
            echo "✓ Identical: $filename"

            # Copy to destination directory
            cp "$file1" "$dir3/$filename"
            identical_count=$((identical_count + 1))
        else
            echo "✗ Different: $filename"
            different_count=$((different_count + 1))
        fi
    else
        echo "○ Not found in dir2: $filename"
    fi
done

echo "\\n=================="
echo "Summary:"
echo "  Identical files: $identical_count (copied to $dir3)"
echo "  Different files: $different_count"
echo "=================="`,
      output: `File Comparison and Copy Tool
==============================
Enter first directory: /home/user/dir1
Enter second directory: /home/user/dir2
Enter destination directory: /home/user/matching

Comparing files...
==================
✓ Identical: file1.txt
✗ Different: file2.txt
✓ Identical: script.sh
○ Not found in dir2: readme.md

==================
Summary:
  Identical files: 2 (copied to /home/user/matching)
  Different files: 1
==================`
    }
  ]

  const categories = ['all', 'Shell Commands', 'File Operations', 'String Manipulation', 'Filters', 'Validation', 'Text Processing', 'Array Operations', 'Data Processing']

  const difficultyColors = {
    'Easy': 'bg-green-500/20 text-green-300 border-green-500/50',
    'Medium': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    'Hard': 'bg-red-500/20 text-red-300 border-red-500/50'
  }

  const categoryColors = {
    'Shell Commands': 'from-emerald-500 to-teal-500',
    'File Operations': 'from-cyan-500 to-blue-500',
    'String Manipulation': 'from-green-500 to-emerald-500',
    'Filters': 'from-teal-500 to-cyan-500',
    'Validation': 'from-blue-500 to-indigo-500',
    'Text Processing': 'from-lime-500 to-green-500',
    'Array Operations': 'from-sky-500 to-blue-500',
    'Data Processing': 'from-teal-500 to-emerald-500'
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
          <OSScene />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-950/30 via-transparent to-slate-950/60 z-10 pointer-events-none" />

      {/* Scrollable Content */}
      <div className="relative z-20 min-h-screen">
        {/* Header */}
        <header className="bg-slate-900/30 backdrop-blur-xl border-b border-emerald-500/20 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 transition-all border border-emerald-500/50 backdrop-blur-sm hover:scale-110"
              >
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                  Operating System Shell Scripts
                </h1>
                <p className="text-slate-300 mt-2 text-base md:text-lg">
                  Linux/Unix Shell Scripting Practicals - GTU Syllabus
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
              Master Shell Scripting
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              Complete shell script solutions for Operating System practicals with explanations and examples.
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
                className="w-full bg-slate-900/60 backdrop-blur-xl text-white px-6 py-4 pl-14 rounded-2xl border border-slate-700/50 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-base"
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
                className="w-full bg-slate-800/80 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-emerald-500 focus:outline-none transition-all"
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
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
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
                Found <span className="text-emerald-400 font-bold">{filteredTasks.length}</span> {filteredTasks.length === 1 ? 'task' : 'tasks'} matching "{searchQuery}"
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
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
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all"
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
                  <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 border border-slate-700/50 group-hover:border-emerald-500/50 transition-all">
                    {/* Task Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-emerald-400 font-bold text-lg">#{task.id}</span>
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
                          className="w-full bg-slate-950/95 text-green-400 font-mono text-xs md:text-sm p-4 rounded-xl border border-slate-700 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[200px] md:min-h-[250px] resize-y transition-all"
                          spellCheck="false"
                        />
                        <div className="absolute top-2 right-2 bg-slate-800/80 px-2 py-1 rounded text-xs text-slate-400">
                          Editable
                        </div>
                      </div>
                      <p className="text-slate-400 text-xs mt-2">
                        💡 Try modifying the code above! Experiment with different commands and logic.
                      </p>
                    </div>

                    {/* Solution Toggle */}
                    <div>
                      <button
                        onClick={() => toggleSolution(task.id)}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-2.5 md:py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/30 mb-4 text-sm md:text-base"
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
                              <CodeBlock code={task.solution} language="bash" />
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

export default OS
