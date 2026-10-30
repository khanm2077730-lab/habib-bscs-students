import { Subject } from '../types';

export const ALL_SUBJECTS: Subject[] = [
  {
    id: 'pf-theory',
    name: 'Programming Fundamentals (Theory)',
    code: 'CS-101',
    category: 'theory',
    creditHours: '3 Credit Hours (Theory)',
    iconName: 'Code',
    color: 'blue',
    gradient: 'from-blue-600 to-indigo-700',
    borderColor: 'border-blue-500/30 hover:border-blue-400',
    tagline: 'Master the foundations of logic, C++ programming, data types, loops, and modular functions.',
    description: 'Programming Fundamentals Theory introduces university computer science students to structured problem solving, algorithmic thinking, and core C++ language concepts.',
    prerequisites: 'High School Mathematics & Basic Computer Familiarity',
    learningObjectives: [
      'Understand how programs execute in computer memory and CPU architecture.',
      'Declare and manipulate fundamental data types, variables, and arithmetic expressions.',
      'Construct decision-making logic using if-else statements and switch structures.',
      'Implement repetition and iteration using for, while, and do-while loops.',
      'Design modular programs using functions, pass-by-value, and pass-by-reference.',
      'Work with single-dimensional and multi-dimensional arrays, C-strings, and string objects.'
    ],
    importantDefinitions: [
      {
        term: 'Algorithm',
        definition: 'A finite, unambiguous sequence of step-by-step instructions designed to solve a specific computational problem.'
      },
      {
        term: 'Variable',
        definition: 'A named storage location in primary memory (RAM) that holds a value of a specific data type which can change during program execution.'
      },
      {
        term: 'Function',
        definition: 'A self-contained subprogram block of code designed to perform a distinct task, receiving inputs (parameters) and returning an output.'
      },
      {
        term: 'Zero-Based Indexing',
        definition: 'A memory indexing convention where the initial element of a contiguous data structure like an array is addressed by position 0.'
      }
    ],
    revisionHighlights: [
      'Always match data types to prevent truncation (e.g. integer division 7/2 = 3).',
      'Remember that && requires both operands true; || requires at least one operand true.',
      'Every opened brace { must have a corresponding closing brace }.',
      'Use pass-by-reference (&) only when you need the function to alter caller variables or avoid heavy copying.'
    ],
    chapters: [
      {
        id: 'pf-ch1',
        chapterNumber: 1,
        title: 'Introduction to Computer Systems & Algorithmic Thinking',
        summary: 'Explore how human logic transforms into binary machine code. Learn about compilers, linkers, source code, and how algorithms are designed using pseudocode and flowcharts.',
        realWorldApplication: 'Every software application—from ATM machines to WhatsApp—starts with an algorithm breaking complex actions into deterministic logical steps.',
        practiceQuestions: [
          'What is the distinct difference between a compiler and an interpreter?',
          'Trace an algorithm that calculates the average of three exam test scores.',
          'Explain why syntax errors are caught at compile time while logic errors occur at runtime.'
        ],
        lessons: [
          {
            id: 'pf-l1-1',
            title: 'How Source Code Becomes Executable Software',
            estimatedMinutes: 20,
            content: `Computers do not comprehend English or high-level C++ directly; they only process electrical binary states (0s and 1s) representing machine instructions.

When you write a C++ program in a text file (such as main.cpp):
1. **Preprocessor**: Processes directives starting with '#' (like #include <iostream>), inserting header code.
2. **Compiler**: Translates human-readable C++ source code into low-level assembly/machine object code (.obj or .o).
3. **Linker**: Combines your object files with pre-compiled standard library binaries to generate the final executable (.exe or ELF binary).
4. **Loader**: Loads the program into RAM so the CPU can execute the instructions step-by-step.`,
            codeSnippet: {
              language: 'cpp',
              code: `#include <iostream>
using namespace std;

int main() {
    // First C++ program in Habib BSCS Students
    cout << "Welcome to BSCS at Habib Platform!" << endl;
    return 0;
}`,
              explanation: '#include imports standard streams; main() is the mandatory entry point; cout prints to screen; return 0 signals success.'
            },
            keyTakeaways: [
              'C++ is a compiled, strongly-typed high-performance language.',
              'main() is the universal entry point where execution begins in C++.',
              'Comments (// and /* */) are ignored by the compiler.'
            ],
            practiceTask: 'Write a C++ program that prints your name, degree program, and favorite career goal on separate lines.'
          },
          {
            id: 'pf-l1-2',
            title: 'Variables, Memory Allocation, and Fundamental Data Types',
            estimatedMinutes: 25,
            content: `A variable is a named container residing in RAM. In C++, every variable must be declared with an explicit data type before it can store data.

Common C++ Data Types:
- **int**: 4 bytes (-2,147,483,648 to +2,147,483,647) for integers.
- **float**: 4 bytes for single-precision floating point numbers (~7 digits precision).
- **double**: 8 bytes for high-precision decimal measurements (~15 digits precision).
- **char**: 1 byte for a single ASCII character in single quotes (e.g. 'A').
- **bool**: 1 byte representing truth values (true or false).
- **string**: A dynamic sequence of characters enclosed in double quotes.`,
            codeSnippet: {
              language: 'cpp',
              code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string studentName = "Habib";
    int currentSemester = 1;
    double cgpa = 3.85;
    bool isEnrolled = true;

    cout << "Student: " << studentName << endl;
    cout << "Semester: " << currentSemester << " | CGPA: " << cgpa << endl;
    return 0;
}`,
              explanation: 'Different data types allocate distinct byte sizes in RAM to efficiently represent text, integers, and real numbers.'
            },
            keyTakeaways: [
              'Use int for counts and whole numbers; double for scientific calculations or money.',
              'Single quotes are reserved for char (\'A\'); double quotes are for string ("Text").',
              'Identifiers cannot start with a digit or match C++ reserved keywords.'
            ],
            practiceTask: 'Declare variables for a product name, quantity, unit price, and discount percentage, then compute the total cost.'
          }
        ]
      },
      {
        id: 'pf-ch2',
        chapterNumber: 2,
        title: 'Decision Structures and Conditional Logic',
        summary: 'Understand relational and logical operators to build programs capable of making intelligent choices based on dynamic user input and business rules.',
        realWorldApplication: 'Login portals verify whether the username exists AND if the password matches; banking apps verify whether account balance is greater than withdrawal amount.',
        practiceQuestions: [
          'Compare if-else ladders with switch statements. When is each preferred?',
          'What happens when a switch case is missing a break statement?',
          'Write a boolean expression that tests if a number is both positive and an even number.'
        ],
        lessons: [
          {
            id: 'pf-l2-1',
            title: 'If, Else If, and Else Control Structures',
            estimatedMinutes: 25,
            content: `Computers derive intelligence from conditional branching. In C++, relational operators (==, !=, <, >, <=, >=) compare operands and yield boolean results.

Logical operators allow multiple conditions to be evaluated together:
- **&& (Logical AND)**: True only if BOTH sides evaluate to true.
- **|| (Logical OR)**: True if AT LEAST ONE side evaluates to true.
- **! (Logical NOT)**: Inverts the boolean truth value.`,
            codeSnippet: {
              language: 'cpp',
              code: `#include <iostream>
using namespace std;

int main() {
    int marks;
    cout << "Enter student marks (0-100): ";
    cin >> marks;

    if (marks >= 85) {
        cout << "Grade: A (Excellent!)" << endl;
    } else if (marks >= 70) {
        cout << "Grade: B (Good)" << endl;
    } else if (marks >= 50) {
        cout << "Grade: C (Pass)" << endl;
    } else {
        cout << "Grade: F (Needs Improvement)" << endl;
    }
    return 0;
}`,
              explanation: 'Condition chains check from top to bottom; the first true block runs, and remaining branches are bypassed.'
            },
            keyTakeaways: [
              'Beware the common typo of using single = (assignment) instead of double == (comparison).',
              'Wrap compound conditions in parentheses for clarity and correct operator precedence.'
            ]
          }
        ]
      },
      {
        id: 'pf-ch3',
        chapterNumber: 3,
        title: 'Loops and Iteration (For, While, Do-While)',
        summary: 'Harness the immense speed of computing through automated iteration. Master loop counters, accumulation, sentinel values, and nested loops.',
        realWorldApplication: 'Iterating through millions of records in a database, rendering frames in a video game at 60 FPS, or scanning an array for search targets.',
        practiceQuestions: [
          'When would a programmer choose a while loop over a for loop?',
          'Explain why do-while is called an exit-controlled loop.',
          'How do you prevent accidental infinite loops?'
        ],
        lessons: [
          {
            id: 'pf-l3-1',
            title: 'Mastering For, While, and Do-While Loops',
            estimatedMinutes: 30,
            content: `Iteration allows repeating a block of statements without copying code.

1. **for Loop**: Best when the exact iteration count is known in advance (Initialization; Condition; Update).
2. **while Loop**: Best when iteration continues until an external condition changes or a sentinel input arrives.
3. **do-while Loop**: Guarantees at least one execution before testing the condition (ideal for user menus).`,
            codeSnippet: {
              language: 'cpp',
              code: `#include <iostream>
using namespace std;

int main() {
    // 1. for loop counting
    cout << "Counting 1 to 5: ";
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;

    // 2. while loop accumulator
    int sum = 0, num = 1;
    while (num <= 10) {
        sum += num;
        num++;
    }
    cout << "Sum of numbers 1-10: " << sum << endl;
    return 0;
}`,
              explanation: 'The for loop manages the loop counter variable automatically; the while loop runs until num exceeds 10.'
            },
            keyTakeaways: [
              'Ensure loop counters are modified in every iteration to avoid infinite loops.',
              'Use break to terminate early; use continue to skip the current iteration.'
            ]
          }
        ]
      },
      {
        id: 'pf-ch4',
        chapterNumber: 4,
        title: 'Modular Functions & Parameter Passing',
        summary: 'Decompose monolithic code into clean, reusable functions. Explore scope, return types, pass-by-value versus pass-by-reference.',
        realWorldApplication: 'Large systems like Windows or Android have millions of specialized functions. Modular architecture allows teams to work in parallel.',
        practiceQuestions: [
          'What is function signature and function prototype?',
          'Explain the difference in memory when passing by value versus reference (&).',
          'What is variable scope and lifetime?'
        ],
        lessons: [
          {
            id: 'pf-l4-1',
            title: 'Function Design and Memory References',
            estimatedMinutes: 30,
            content: `Functions encapsulate logic to prevent code repetition (DRY: Don't Repeat Yourself).

When passing parameters:
- **Pass by Value**: The function gets an isolated duplicate copy. Changes inside do not alter the caller's variable.
- **Pass by Reference (using &)**: The function receives an alias pointing directly to the caller's memory address. Changes directly affect the caller.`,
            codeSnippet: {
              language: 'cpp',
              code: `#include <iostream>
using namespace std;

// Pass by reference alters original values
void swapValues(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 10, y = 20;
    cout << "Before swap: x=" << x << ", y=" << y << endl;
    swapValues(x, y);
    cout << "After swap:  x=" << x << ", y=" << y << endl;
    return 0;
}`,
              explanation: 'Using the & symbol creates reference parameters that modify the caller variables x and y directly.'
            },
            keyTakeaways: [
              'Function prototypes placed above main() allow functions to be defined below main().',
              'Use void if the function solely displays output and produces no return value.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'pf-lab',
    name: 'Programming Fundamentals Lab',
    code: 'CS-101L',
    category: 'lab',
    creditHours: '1 Credit Hour (Practical)',
    iconName: 'Terminal',
    color: 'cyan',
    gradient: 'from-cyan-600 to-teal-700',
    borderColor: 'border-cyan-500/30 hover:border-cyan-400',
    tagline: 'Hands-on C++ coding, compiler diagnostics, terminal debugging, and practical problem-solving tasks.',
    description: 'The Programming Fundamentals Lab provides practical coding sessions where students translate algorithmic logic into working C++ programs using GCC/Clang compilers and debuggers.',
    prerequisites: 'Concurrent enrollment in Programming Fundamentals Theory',
    learningObjectives: [
      'Set up command line tools, GCC/G++ compilers, and Code::Blocks / VS Code environments.',
      'Handle console I/O, whitespace extraction, and user input validation.',
      'Debug segmentation faults, off-by-one errors, and syntax errors using GDB.',
      'Build practical console tools including calculators, grade processors, and menu systems.',
      'Work with arrays, linear search, and bubble sort algorithms in practical labs.'
    ],
    importantDefinitions: [
      {
        term: 'Segmentation Fault',
        definition: 'A specific hardware error condition raised when a program tries to access a restricted memory address outside its allocated boundary.'
      },
      {
        term: 'Compiler Warning',
        definition: 'A non-fatal diagnostic advisory issued by the compiler (e.g. -Wall) notifying of suspicious code constructs or uninitialized variables.'
      },
      {
        term: 'Buffer Overflow',
        definition: 'An anomaly where software writes more data to a buffer than its allocated capacity, corrupting adjacent stack or heap memory.'
      }
    ],
    revisionHighlights: [
      'Always compile with "g++ -Wall -Wextra main.cpp -o main" to catch subtle bugs early.',
      'Clear input buffers using cin.ignore() when switching between cin >> number and getline(cin, string).',
      'Double check that arrays of size N only have valid indices from 0 up to N-1.'
    ],
    chapters: [
      {
        id: 'pfl-ch1',
        chapterNumber: 1,
        title: 'Lab 01-03: Environment Setup, I/O Formatting & Debugging',
        summary: 'Learn terminal commands for compilation, understand standard stream manipulators from <iomanip>, and master compiler error diagnostics.',
        realWorldApplication: 'Real-world software engineering requires mastering terminal toolchains, understanding build logs, and formatting console data.',
        practiceQuestions: [
          'How do you fix the issue where getline() skips input after cin >> val?',
          'What compiler flag produces debugging symbols required by GDB?',
          'Demonstrate how to format monetary output to exactly two decimal places.'
        ],
        lessons: [
          {
            id: 'pfl-l1',
            title: 'Compiling via Terminal & Stream Manipulators',
            estimatedMinutes: 35,
            content: `In the university laboratory, students write programs in source files and compile them through terminal commands.

### GCC/G++ Compilation Commands:
\`\`\`bash
# Compile and create binary executable named "lab1"
g++ -Wall -std=c++17 lab1.cpp -o lab1

# Execute binary on Linux/macOS
./lab1

# Execute on Windows
lab1.exe
\`\`\`

### Avoiding the cin / getline() newline bug:
When you use \`cin >> age;\`, it reads the number but leaves the trailing '\\n' (Enter key) in the input buffer. If you subsequently call \`getline(cin, name);\`, it immediately reads that lingering newline and returns an empty string!
**Fix**: Call \`cin.ignore();\` immediately after \`cin >> age;\` to discard the newline.`,
            codeSnippet: {
              language: 'cpp',
              code: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    string studentName;
    int rollNumber;
    double labScore;

    cout << "Enter Roll Number: ";
    cin >> rollNumber;
    cin.ignore(); // Discards leftover newline

    cout << "Enter Full Name: ";
    getline(cin, studentName);

    cout << "Enter Lab Score (0-100): ";
    cin >> labScore;

    cout << "\\n--- STUDENT LAB REPORT ---" << endl;
    cout << left << setw(15) << "Roll Number" 
         << setw(25) << "Name" 
         << right << setw(10) << "Score" << endl;
    cout << string(50, '-') << endl;
    cout << left << setw(15) << rollNumber 
         << setw(25) << studentName 
         << right << setw(10) << fixed << setprecision(2) << labScore << "%" << endl;

    return 0;
}`,
              explanation: 'Demonstrates clean console table formatting using <iomanip> (setw, left, right, fixed, setprecision).'
            },
            keyTakeaways: [
              'Use setw() and setprecision() to format tabular reports.',
              'Always use cin.ignore() before getline() when reading input.'
            ]
          }
        ]
      },
      {
        id: 'pfl-ch2',
        chapterNumber: 2,
        title: 'Lab 04-06: Practical Arrays, Linear Search & Algorithms',
        summary: 'Construct practical data management scripts: finding min/max values, calculating averages, linear searching, and array reversal.',
        realWorldApplication: 'Sensor data processing, student grade ranking, and basic inventory tracking in Point of Sale (POS) terminals.',
        practiceQuestions: [
          'Write a function that returns the index of a target element in an array using linear search.',
          'How do you pass an array to a function along with its size?',
          'Explain why arrays do not store their own length in standard C++.'
        ],
        lessons: [
          {
            id: 'pfl-l2',
            title: 'Array Operations & Linear Search Implementation',
            estimatedMinutes: 40,
            content: `Arrays store multiple items of the identical data type in contiguous memory slots. In C++, when an array is passed to a function, it decays into a pointer to the first element; therefore, the size must be passed explicitly as a second argument.`,
            codeSnippet: {
              language: 'cpp',
              code: `#include <iostream>
using namespace std;

int linearSearch(const int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i; // Target found at index i
        }
    }
    return -1; // Target not found
}

int main() {
    int scores[] = {78, 92, 65, 88, 95, 71, 84};
    int totalElements = sizeof(scores) / sizeof(scores[0]);
    int target = 88;

    int foundIndex = linearSearch(scores, totalElements, target);
    if (foundIndex != -1) {
        cout << "Score " << target << " was found at index position: " << foundIndex << endl;
    } else {
        cout << "Score not found in array." << endl;
    }
    return 0;
}`,
              explanation: 'Linear search sequentially iterates from index 0 to size-1, returning the matching index or -1 if absent.'
            },
            keyTakeaways: [
              'Arrays decay into pointers when passed to functions.',
              'Linear search has a time complexity of O(N).'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ict-theory',
    name: 'Information and Communication Technology (ICT Theory)',
    code: 'ICT-101',
    category: 'theory',
    creditHours: '3 Credit Hours (Theory)',
    iconName: 'Cpu',
    color: 'purple',
    gradient: 'from-purple-600 to-violet-800',
    borderColor: 'border-purple-500/30 hover:border-purple-400',
    tagline: 'Understand computer architecture, networks, cloud computing, cybersecurity, and databases.',
    description: 'Information and Communication Technology covers the core mechanisms of modern computing: processor design, operating systems, internet routing, network security, and data storage.',
    prerequisites: 'None',
    learningObjectives: [
      'Examine computer architecture: CPU (ALU, CU, Registers), memory hierarchy, and storage.',
      'Distinguish between system software, application software, and operating system functions.',
      'Analyze computer networking topologies, IP addressing, and the TCP/IP stack.',
      'Explore cybersecurity essentials: malware types, encryption, hashing, and defense mechanisms.',
      'Understand database concepts: relational tables, primary keys, foreign keys, and SQL queries.'
    ],
    importantDefinitions: [
      {
        term: 'Von Neumann Architecture',
        definition: 'A theoretical computer design architecture where CPU and unified memory store both program instructions and working data.'
      },
      {
        term: 'Bandwidth',
        definition: 'The maximum rate of data transfer across a given network transmission path in a given period of time (measured in Mbps or Gbps).'
      },
      {
        term: 'Cloud Computing',
        definition: 'The on-demand availability of computing resources (servers, storage, databases, networking) via the Internet on a pay-as-you-go model.'
      }
    ],
    revisionHighlights: [
      'Registers are the fastest memory in the CPU, followed by L1/L2/L3 Cache, RAM, and SSD.',
      'IPv4 addresses use 32 bits (4 octets); IPv6 addresses use 128 bits (hexadecimal).',
      'HTTPS uses Port 443 with TLS encryption; HTTP uses unencrypted Port 80.'
    ],
    chapters: [
      {
        id: 'ict-ch1',
        chapterNumber: 1,
        title: 'Hardware Architecture & The Memory Hierarchy',
        summary: 'Deep dive into the microprocessor, CPU clock cycles, bus architectures, and how RAM, cache, and permanent storage cooperate.',
        realWorldApplication: 'Choosing smartphone hardware, server specs for cloud applications, and understanding bottlenecks when apps freeze.',
        practiceQuestions: [
          'Trace the stages of the Fetch-Decode-Execute cycle in a CPU.',
          'Why is CPU Cache faster than standard dynamic RAM?',
          'What is the difference between volatile and non-volatile storage?'
        ],
        lessons: [
          {
            id: 'ict-l1',
            title: 'Inside the CPU: ALU, CU, Registers & Fetch-Decode-Execute',
            estimatedMinutes: 30,
            content: `The Central Processing Unit (CPU) is the brain of any computer.

### Fundamental Subsystems:
1. **Control Unit (CU)**: Coordinates all activities inside the computer, extracting instructions from memory, decoding them, and issuing timing signals.
2. **Arithmetic Logic Unit (ALU)**: Performs mathematical operations (addition, subtraction) and logical evaluations (AND, OR, NOT).
3. **Registers**: Tiny, ultra-fast internal memory cells located directly inside the CPU (e.g. Program Counter, Instruction Register, Accumulator).

### The Instruction Cycle:
- **Fetch**: The CPU retrieves the next instruction byte from RAM using the address in the Program Counter (PC).
- **Decode**: The Control Unit breaks down the opcode and determines what action must take place.
- **Execute**: The ALU or hardware performs the requested action, updating registers or memory.`,
            keyTakeaways: [
              'CPU speed is measured in Gigahertz (GHz) indicating billions of clock cycles per second.',
              'Cache memory bridges the immense speed gap between the fast CPU and slower RAM.'
            ]
          }
        ]
      },
      {
        id: 'ict-ch2',
        chapterNumber: 2,
        title: 'Computer Networks, The Internet & Protocols',
        summary: 'Explore how devices exchange data across the globe using the OSI model, TCP/IP, IP addressing, DNS resolution, and routers.',
        realWorldApplication: 'When you type a URL into a browser, packets traverse transatlantic optical fiber cables within milliseconds.',
        practiceQuestions: [
          'Explain what happens during a DNS lookup when visiting a website.',
          'Contrast TCP (connection-oriented) with UDP (connectionless).',
          'Describe the role of a router versus a network switch.'
        ],
        lessons: [
          {
            id: 'ict-l2',
            title: 'Internet Architecture, IP Addresses & DNS Resolution',
            estimatedMinutes: 35,
            content: `The Internet is a global network of interconnected computer networks communicating through standardized protocol suites.

### Key Protocols:
- **IP (Internet Protocol)**: Addresses and routes packets across internet networks.
- **TCP (Transmission Control Protocol)**: Provides reliable, ordered delivery with error checking (used for web, email, file transfers).
- **UDP (User Datagram Protocol)**: Prioritizes transmission speed over reliability (used for live streaming, gaming, VoIP).
- **DNS (Domain Name System)**: Translates human-memorable names (e.g. \`google.com\`) into numeric machine IP addresses (e.g. \`142.250.190.46\`).`,
            keyTakeaways: [
              'Data is broken into discrete packets that travel independently across network routers.',
              'Routers connect different networks; switches connect local devices within the same network.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ict-lab',
    name: 'Information and Communication Technology Lab',
    code: 'ICT-101L',
    category: 'lab',
    creditHours: '1 Credit Hour (Practical)',
    iconName: 'Wrench',
    color: 'indigo',
    gradient: 'from-indigo-600 to-purple-800',
    borderColor: 'border-indigo-500/30 hover:border-indigo-400',
    tagline: 'Practical command-line utilities, network diagnostic tools, file management, and spreadsheets.',
    description: 'The ICT Lab provides hands-on practical skills in command line operating systems (Windows CLI & Linux Bash), network diagnostics (ping, traceroute), spreadsheet automation, and document formatting.',
    prerequisites: 'Concurrent enrollment in ICT Theory',
    learningObjectives: [
      'Master CLI file systems: navigation, permissions (chmod), creating, moving, and archiving files.',
      'Run diagnostic networking commands: ping, ipconfig, tracert, nslookup, netstat.',
      'Automate data calculations using advanced spreadsheet formulas (VLOOKUP, IF, AVERAGE, SUM).',
      'Configure operating system security, user permissions, and troubleshoot unresponsive processes.'
    ],
    importantDefinitions: [
      {
        term: 'Command-Line Interface (CLI)',
        definition: 'A text-based user interface used to view, manage, and manipulate system files and execute system programs through typed commands.'
      },
      {
        term: 'Default Gateway',
        definition: 'The node/router on a computer network that serves as an access point to other networks outside the local subnet.'
      }
    ],
    revisionHighlights: [
      'Use ping to test if a remote server responds; use tracert to identify which intermediate router drops packets.',
      'In Excel, use $ to lock row/column references before dragging formulas across cells.',
      'Remember that "chmod 755 filename" gives read/write/execute to owner and read/execute to others.'
    ],
    chapters: [
      {
        id: 'ictl-ch1',
        chapterNumber: 1,
        title: 'Command Line File Systems & Terminal Operations',
        summary: 'Learn commands for directory navigation, creating files, searching, managing process tasks, and setting security permissions.',
        realWorldApplication: 'System administrators and DevOps engineers manage cloud servers exclusively through SSH terminals without graphical user interfaces.',
        practiceQuestions: [
          'List commands used to create, rename, and delete directories on Linux and Windows.',
          'What is the difference between relative path and absolute path in terminal navigation?'
        ],
        lessons: [
          {
            id: 'ictl-l1',
            title: 'Essential CLI Commands Reference',
            estimatedMinutes: 30,
            content: `Every computer science student must be proficient in terminal commands.

### Comparison Table:
| Action | Windows CMD | Linux / macOS Bash |
| :--- | :--- | :--- |
| Print Working Directory | \`cd\` | \`pwd\` |
| List Files | \`dir\` | \`ls -la\` |
| Change Directory | \`cd folder\` | \`cd folder\` |
| Go to Parent Folder | \`cd ..\` | \`cd ..\` |
| Create Directory | \`mkdir my_dir\` | \`mkdir my_dir\` |
| Delete File | \`del file.txt\` | \`rm file.txt\` |
| View File Contents | \`type file.txt\` | \`cat file.txt\` |
| Network Config | \`ipconfig\` | \`ip a\` or \`ifconfig\` |`,
            keyTakeaways: [
              'Paths starting with "/" or "C:\\" are absolute; paths relative to current folder are relative.',
              'Use Tab key for automatic command line autocomplete.'
            ]
          }
        ]
      },
      {
        id: 'ictl-ch2',
        chapterNumber: 2,
        title: 'Network Diagnostics & Spreadsheet Data Analysis',
        summary: 'Diagnose network outages with ping, traceroute, and nslookup. Automate grading spreadsheets using formula functions.',
        realWorldApplication: 'Helpdesk support engineers use ping/tracert to diagnose internet faults; financial analysts use Excel functions daily.',
        practiceQuestions: [
          'What does "Request timed out" signify during a ping test?',
          'Write an Excel formula to calculate letter grade based on marks in cell B5.'
        ],
        lessons: [
          {
            id: 'ictl-l2',
            title: 'Practical Network Auditing Tools',
            estimatedMinutes: 35,
            content: `When network connectivity fails, engineers execute a diagnostic sequence:
1. \`ping 127.0.0.1\`: Checks local network stack loopback.
2. \`ipconfig\` / \`ifconfig\`: Verifies valid local IP assignment.
3. \`ping <Default_Gateway_IP>\`: Verifies connection to the local Wi-Fi router.
4. \`ping 8.8.8.8\`: Verifies raw Internet reachability.
5. \`nslookup google.com\`: Checks whether DNS name resolution is functioning.`,
            keyTakeaways: [
              'ping measures round-trip time in milliseconds (latency).',
              'tracert exposes the physical hop route taken by packets.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'functional-english',
    name: 'Functional English',
    code: 'ENG-101',
    category: 'theory',
    creditHours: '3 Credit Hours (Theory)',
    iconName: 'BookOpen',
    color: 'emerald',
    gradient: 'from-emerald-600 to-green-700',
    borderColor: 'border-emerald-500/30 hover:border-emerald-400',
    tagline: 'Refine technical writing, grammar, vocabulary, reading comprehension, and professional presentation skills.',
    description: 'Functional English develops clear, professional communication capabilities essential for university students: grammatical precision, technical report writing, active listening, and persuasive oral presentation.',
    prerequisites: 'Intermediate High School English',
    learningObjectives: [
      'Master English grammar: subject-verb agreement, verb tenses, and correct preposition usage.',
      'Eliminate common writing pitfalls: run-on sentences, comma splices, and dangling modifiers.',
      'Compose clear technical paragraphs featuring a topic sentence, supporting data, and conclusion.',
      'Enhance professional email correspondence, resume composition, and presentation delivery.'
    ],
    importantDefinitions: [
      {
        term: 'Subject-Verb Agreement',
        definition: 'The grammatical rule stating that the number (singular or plural) of the subject must match the number of its associated verb.'
      },
      {
        term: 'Topic Sentence',
        definition: 'A sentence that expresses the main idea of the paragraph in which it occurs, providing unity and direction.'
      },
      {
        term: 'Cohesion',
        definition: 'The grammatical and lexical linking within a text or sentence that holds a discourse together and gives it meaningful structure.'
      }
    ],
    revisionHighlights: [
      'Collective nouns (team, group, committee) take singular verbs when acting as a single unit.',
      'Use active voice ("The engineer coded the module") for crisp technical clarity over passive voice.',
      'Avoid vague pronouns: always make sure "it" and "they" clearly refer to a specific noun.'
    ],
    chapters: [
      {
        id: 'eng-ch1',
        chapterNumber: 1,
        title: 'Grammar Foundations & Parts of Speech',
        summary: 'Review parts of speech, tricky subject-verb agreements, and verb tenses essential for technical academic writing.',
        realWorldApplication: 'Clear documentation prevents costly misunderstandings in international software engineering teams and client proposals.',
        practiceQuestions: [
          'Correct this sentence: "Each of the software developers have their own workstation."',
          'Identify the difference between active voice and passive voice with technical examples.'
        ],
        lessons: [
          {
            id: 'eng-l1',
            title: 'Subject-Verb Agreement & Tense Accuracy',
            estimatedMinutes: 25,
            content: `Grammar forms the bedrock of credible communication.

### Common Trap: Intervening Phrases
The subject of a sentence is never part of an intervening prepositional phrase!
- **Incorrect**: The collection of scientific papers *were* published.
- **Correct**: The **collection** [of scientific papers] **was** published.

### Present Perfect vs. Simple Past
- **Simple Past**: Refers to an event finished at a specific past time ("We launched the app yesterday").
- **Present Perfect**: Refers to an action that occurred at an indefinite past time or continues to the present ("We have launched three successful apps").`,
            keyTakeaways: [
              'Singular subjects take singular verbs ending in "s" in the simple present tense.',
              'Use clear transition words (Furthermore, Consequently, In contrast) to link thoughts.'
            ]
          }
        ]
      },
      {
        id: 'eng-ch2',
        chapterNumber: 2,
        title: 'Technical Paragraph Writing & Professional Emails',
        summary: 'Construct cohesive academic paragraphs with evidence and write polite, effective business emails for internships and project proposals.',
        realWorldApplication: 'Writing job applications, bug reports on GitHub, technical documentation, and professional emails to university professors.',
        practiceQuestions: [
          'Draft a formal email requesting a one-day deadline extension for an academic project.',
          'Identify three transitional phrases used to introduce counter-arguments.'
        ],
        lessons: [
          {
            id: 'eng-l2',
            title: 'Professional Email Etiquette for University & Tech',
            estimatedMinutes: 25,
            content: `Professional emails must be respectful, concise, and structured.

### Structure of an Academic / Professional Email:
1. **Subject Line**: Specific and descriptive (e.g. \`BSCS-101: Assignment 2 Clarification - Roll #1042\`).
2. **Salutation**: Formal greeting (\`Dear Professor Khan,\` or \`Dear Dr. Ahmad,\`).
3. **Opening & Purpose**: State reason for writing in the first sentence.
4. **Body Details**: Keep points bulleted or short.
5. **Call to Action**: Clearly state what is requested.
6. **Sign-off**: Professional closing (\`Sincerely,\` or \`Best regards,\`) followed by your full name, student ID, and contact info.`,
            keyTakeaways: [
              'Never send emails with blank subject lines.',
              'Proofread for spelling and tone before hitting send.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'natural-science-theory',
    name: 'Natural Science Theory',
    code: 'SCI-101',
    category: 'theory',
    creditHours: '3 Credit Hours (Theory)',
    iconName: 'Atom',
    color: 'teal',
    gradient: 'from-teal-600 to-emerald-800',
    borderColor: 'border-teal-500/30 hover:border-teal-400',
    tagline: 'Explore the physical universe: classical mechanics, thermodynamics, atomic theory, and environmental systems.',
    description: 'Natural Science Theory provides computer science students with a grounding in physical principles: mechanics, electrical phenomena, optics, chemistry of materials, and ecology.',
    prerequisites: 'High School General Science & Algebra',
    learningObjectives: [
      'Apply Newton\'s laws of motion to linear systems, forces, and kinetic energy calculations.',
      'Understand the laws of thermodynamics, energy conservation, and heat transfer mechanisms.',
      'Examine atomic structure, electrons, chemical bonding, and semiconductors.',
      'Study environmental systems, the carbon cycle, renewable energy, and climate science.'
    ],
    importantDefinitions: [
      {
        term: 'Inertia',
        definition: 'The resistance of any physical object to any change in its velocity, including changes to speed or direction.'
      },
      {
        term: 'First Law of Thermodynamics',
        definition: 'Energy can neither be created nor destroyed in an isolated system; it can only change from one form to another.'
      },
      {
        term: 'Semiconductor',
        definition: 'A solid substance that has a conductivity between that of an insulator and that of most metals, fundamental to microchips and transistors.'
      }
    ],
    revisionHighlights: [
      'Work done equals Force multiplied by distance (W = F * d * cos θ), measured in Joules.',
      'Current is charge flow per second (I = Q / t); Voltage is energy per unit charge (V = W / Q).',
      'Electromagnetic waves travel at c ≈ 3 x 10^8 m/s in vacuum; wavelength and frequency are inversely related.'
    ],
    chapters: [
      {
        id: 'sci-ch1',
        chapterNumber: 1,
        title: 'Mechanics, Newton\'s Laws & Conservation of Energy',
        summary: 'Analyze motion, gravitational acceleration, momentum, kinetic vs potential energy, and work-energy theorem.',
        realWorldApplication: 'Physics engines in video games, robotics trajectory calculations, and satellite orbit mechanics.',
        practiceQuestions: [
          'Calculate the force required to accelerate a 1200 kg vehicle at 3 m/s².',
          'State Newton\'s Third Law and explain how it enables rocket propulsion in space.'
        ],
        lessons: [
          {
            id: 'sci-l1',
            title: 'Newton\'s Three Laws of Motion with Engineering Examples',
            estimatedMinutes: 30,
            content: `Sir Isaac Newton formulated three fundamental laws governing classical physical motion:

1. **First Law (Law of Inertia)**: An object remains at rest, or continues in uniform straight-line motion, unless compelled to change that state by an external net force.
2. **Second Law (F = ma)**: Acceleration is directly proportional to net force and inversely proportional to object mass.
3. **Third Law (Action-Reaction)**: For every action force, there exists an equal in magnitude and opposite in direction reaction force.`,
            keyTakeaways: [
              'Mass is a measure of an object\'s inertia.',
              'Weight is a force (W = mg) dependent on local gravitational field strength.'
            ]
          }
        ]
      },
      {
        id: 'sci-ch2',
        chapterNumber: 2,
        title: 'Electricity, Magnetism & Semiconductor Materials',
        summary: 'Understand electrical potential, Ohm\'s law, magnetic induction, and how Silicon crystals form transistors.',
        realWorldApplication: 'All modern CPUs, RAM modules, and solid-state storage rely on silicon semiconductor properties.',
        practiceQuestions: [
          'What is the difference between an n-type semiconductor and a p-type semiconductor?',
          'If a circuit has a voltage of 12V across a 4Ω resistor, what current flows through it?'
        ],
        lessons: [
          {
            id: 'sci-l2',
            title: 'Ohm\'s Law and Fundamentals of Semiconductor Diodes',
            estimatedMinutes: 30,
            content: `Electricity powers modern computing systems.

### Ohm's Law:
\`\`\`
V = I * R
- V: Voltage (Volts, V)
- I: Current (Amperes, A)
- R: Resistance (Ohms, Ω)
\`\`\`

### Semiconductor Physics:
Pure silicon (Group IV) has 4 valence electrons. Doping silicon with phosphorus (Group V) creates extra free conduction electrons (**n-type**). Doping with boron (Group III) creates electron deficiencies or holes (**p-type**). Combining both forms a **p-n junction diode**, which allows current in one direction only—the cornerstone of the modern transistor!`,
            keyTakeaways: [
              'Transistors act as microscopic electrical switches representing binary 1s and 0s.',
              'Ohm\'s Law relates electric potential, current flow, and resistive opposition.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'natural-science-lab',
    name: 'Natural Science Lab',
    code: 'SCI-101L',
    category: 'lab',
    creditHours: '1 Credit Hour (Practical)',
    iconName: 'FlaskConical',
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-700',
    borderColor: 'border-teal-500/30 hover:border-teal-400',
    tagline: 'Laboratory safety, precision measurement instruments, circuit verification, and scientific reporting.',
    description: 'The Natural Science Lab immerses students in the experimental scientific method: taking precision measurements with vernier calipers and analytical scales, building DC circuits, and documenting observations.',
    prerequisites: 'Concurrent enrollment in Natural Science Theory',
    learningObjectives: [
      'Adhere to laboratory chemical and electrical safety guidelines and personal protective equipment (PPE).',
      'Measure physical dimensions using Vernier calipers, screw gauges, and analytical balances.',
      'Assemble basic electrical circuits on breadboards and verify Ohm\'s Law using multimeters.',
      'Compute experimental errors, percentage errors, and plot linear regression graphs.'
    ],
    importantDefinitions: [
      {
        term: 'Least Count',
        definition: 'The smallest value that can be accurately measured by a measuring instrument without estimation.'
      },
      {
        term: 'Parallax Error',
        definition: 'An apparent shift in the measurement reading when the viewer\'s eye is not positioned perpendicular to the measurement scale.'
      }
    ],
    revisionHighlights: [
      'Always read the bottom of the meniscus at eye level when measuring liquid volumes.',
      'Zero errors on calipers must be algebraically subtracted from all measured readings.',
      'Never connect an ammeter in parallel; ammeters must always be wired in series!'
    ],
    chapters: [
      {
        id: 'scil-ch1',
        chapterNumber: 1,
        title: 'Laboratory Safety, Vernier Calipers & Micrometer Screw Gauges',
        summary: 'Learn essential laboratory safety rules, emergency eye-wash protocols, and measure tiny cylinders and wires with sub-millimeter precision.',
        realWorldApplication: 'Precision engineering, hardware fabrication, and microchip dimension tolerances in manufacturing.',
        practiceQuestions: [
          'How do you calculate the least count of a micrometer screw gauge with 50 circular divisions and 0.5 mm pitch?',
          'What is positive zero error versus negative zero error on a vernier caliper?'
        ],
        lessons: [
          {
            id: 'scil-l1',
            title: 'Precision Measurement & Error Reduction',
            estimatedMinutes: 35,
            content: `Accurate data measurement is the hallmark of the scientific method.

### How to use a Vernier Caliper:
1. **Determine Least Count (L.C.)**:
   \`\`\`
   L.C. = 1 Main Scale Division (MSD) - 1 Vernier Scale Division (VSD)
        = 1 mm - 0.9 mm = 0.1 mm (or 0.01 cm)
   \`\`\`
2. **Determine Zero Error**: Close jaws with no object. If the 0 mark of the vernier scale aligns with 0 on the main scale, there is no zero error.
3. **Total Measurement**:
   \`\`\`
   Total Reading = Main Scale Reading + (Coinciding Vernier Division * L.C.) - Zero Error
   \`\`\``,
            keyTakeaways: [
              'Take at least three independent measurements at different angles and average them.',
              'Account for zero error before recording final observations.'
            ]
          }
        ]
      },
      {
        id: 'scil-ch2',
        chapterNumber: 2,
        title: 'Circuit Experiments: Verifying Ohm\'s Law & Multimeter Skills',
        summary: 'Build series and parallel resistor circuits on breadboards, measure current with an ammeter, and plot voltage-current graphs.',
        realWorldApplication: 'Testing computer power supplies, checking motherboard traces, and measuring battery health.',
        practiceQuestions: [
          'Why must a voltmeter have a very high internal resistance while an ammeter must have near-zero resistance?',
          'How does the slope of a V vs. I graph represent resistance?'
        ],
        lessons: [
          {
            id: 'scil-l2',
            title: 'Building DC Circuits & Verifying V = IR',
            estimatedMinutes: 40,
            content: `In this practical session, students verify that electrical potential across a metallic conductor is directly proportional to the current flowing through it at constant temperature.

### Equipment:
- Variable DC Power Supply (0-12V)
- Standard Resistors (e.g. 100 Ω, 220 Ω)
- Digital Multimeter (DMM)
- Breadboard and jumper wires

### Procedure:
1. Connect power supply, ammeter, and test resistor in **series**.
2. Connect voltmeter leads in **parallel** across the test resistor.
3. Vary voltage in 1.0V increments from 1V to 6V, recording corresponding current readings.
4. Plot Voltage (y-axis) against Current (x-axis). The slope of the resulting straight line equals the resistance R!`,
            keyTakeaways: [
              'Ohmic conductors yield a linear line passing through the origin (0,0).',
              'A non-linear graph indicates heating effects altering resistance.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'calculus-analytical-geometry',
    name: 'Calculus and Analytical Geometry',
    code: 'MTH-101',
    category: 'theory',
    creditHours: '3 Credit Hours (Theory)',
    iconName: 'LineChart',
    color: 'amber',
    gradient: 'from-amber-600 to-orange-700',
    borderColor: 'border-amber-500/30 hover:border-amber-400',
    tagline: 'Unlock limits, derivatives, integrals, and coordinate geometry foundational for algorithms and graphics.',
    description: 'Calculus and Analytical Geometry equips computer science students with the mathematical foundation needed for graphics programming, machine learning gradient descent, physical simulations, and algorithm analysis.',
    prerequisites: 'High School Trigonometry & Algebra',
    learningObjectives: [
      'Evaluate mathematical limits algebraically, graphically, and via L\'Hôpital\'s Rule.',
      'Differentiate functions using power, product, quotient, and chain rules.',
      'Apply derivatives to optimization problems, curve sketching, and rates of change.',
      'Calculate definite and indefinite integrals using substitution and fundamental theorems.',
      'Analyze 2D geometry: lines, circles, distance formulas, parabolas, and ellipses.'
    ],
    importantDefinitions: [
      {
        term: 'Derivative',
        definition: 'The instantaneous rate of change of a function with respect to one of its variables: f\'(x) = lim(h->0) [f(x+h) - f(x)] / h.'
      },
      {
        term: 'Definite Integral',
        definition: 'The net signed area under the curve of a function between two specified limits of integration [a, b].'
      },
      {
        term: 'Critical Point',
        definition: 'A point c in the domain of f(x) where either the first derivative f\'(c) = 0 or f\'(c) does not exist.'
      }
    ],
    revisionHighlights: [
      'Power rule: d/dx [x^n] = n * x^(n-1); Integral: ∫ x^n dx = (x^(n+1))/(n+1) + C (for n ≠ -1).',
      'Product rule: (uv)\' = u\'v + uv\'; Quotient rule: (u/v)\' = (u\'v - uv\') / v^2.',
      'Two lines are perpendicular if their slopes multiply to -1 (m1 * m2 = -1).'
    ],
    chapters: [
      {
        id: 'calc-ch1',
        chapterNumber: 1,
        title: 'Limits, Continuity & The Foundation of Calculus',
        summary: 'Explore the behavior of functions as inputs approach specific values or infinity. Master indeterminate forms (0/0) and continuity.',
        realWorldApplication: 'Analyzing asymptotic upper bounds (Big-O notation) in algorithms and rendering continuous curves in digital animation.',
        practiceQuestions: [
          'Evaluate lim (x -> 2) of (x^2 - 4) / (x - 2).',
          'What are the three criteria for a function f(x) to be continuous at x = a?'
        ],
        lessons: [
          {
            id: 'calc-l1',
            title: 'Limits and Indeterminate Forms',
            estimatedMinutes: 30,
            content: `Calculus is the study of continuous change.

### Definition of a Limit:
We write \`lim (x -> c) f(x) = L\` if we can make the values of f(x) arbitrarily close to L by taking x sufficiently close to c.

### Factoring Indeterminate 0/0 Forms:
Consider:
\`\`\`
lim (x -> 4) [ (x^2 - 16) / (x - 4) ]
\`\`\`
Direct substitution yields 0/0 (indeterminate). Factoring the difference of squares:
\`\`\`
= lim (x -> 4) [ (x - 4)(x + 4) / (x - 4) ]
= lim (x -> 4) [ x + 4 ]
= 4 + 4 = 8
\`\`\``,
            keyTakeaways: [
              'Indeterminate 0/0 means you must factor, rationalize, or apply algebraic simplification.',
              'A function is continuous at a if lim(x->a) f(x) = f(a).'
            ]
          }
        ]
      },
      {
        id: 'calc-ch2',
        chapterNumber: 2,
        title: 'Differentiation Rules & Chain Rule',
        summary: 'Master standard derivatives: polynomials, trigonometric, exponential, and composite functions using the Chain Rule.',
        realWorldApplication: 'Gradient Descent optimization in Artificial Intelligence and Neural Networks adjusts weights using derivatives.',
        practiceQuestions: [
          'Differentiate f(x) = (3x^2 + 1)^4 with respect to x.',
          'Find the equation of the tangent line to y = x^2 at the point (2, 4).'
        ],
        lessons: [
          {
            id: 'calc-l2',
            title: 'Core Derivative Rules & Step-by-Step Solutions',
            estimatedMinutes: 35,
            content: `The derivative represents the slope of the tangent line to a curve at any point.

### Fundamental Rules:
1. **Constant Rule**: \`d/dx [c] = 0\`
2. **Power Rule**: \`d/dx [x^n] = n * x^(n-1)\`
3. **Product Rule**: \`d/dx [u * v] = u'v + uv'\`
4. **Quotient Rule**: \`d/dx [u / v] = (u'v - uv') / v^2\`
5. **Chain Rule**: \`d/dx [f(g(x))] = f'(g(x)) * g'(x)\`

### Step-by-Step Example:
Differentiate \`y = (2x^3 - 5x)^3\`:
- Let inner function \`u = 2x^3 - 5x\`, so \`y = u^3\`.
- \`dy/du = 3u^2\`
- \`du/dx = 6x^2 - 5\`
- \`dy/dx = (dy/du) * (du/dx) = 3(2x^3 - 5x)^2 * (6x^2 - 5)\`.`,
            keyTakeaways: [
              'Chain rule differentiates the outer function first, multiplied by derivative of inside function.',
              'The second derivative f\'\'(x) describes curvature and concavity.'
            ]
          }
        ]
      },
      {
        id: 'calc-ch3',
        chapterNumber: 3,
        title: 'Analytical Coordinate Geometry: Lines & Circles',
        summary: 'Investigate the Cartesian plane: distance, midpoints, slope-intercept forms, circle equations, and intersections.',
        realWorldApplication: 'Collision detection in video games, user interface coordinates, and computer-aided design (CAD) engines.',
        practiceQuestions: [
          'Find the center and radius of the circle x^2 + y^2 - 6x + 8y = 0.',
          'Determine whether the lines 2x - 3y = 5 and 3x + 2y = 8 are perpendicular.'
        ],
        lessons: [
          {
            id: 'calc-l3',
            title: 'Straight Lines & Circle Geometry in 2D',
            estimatedMinutes: 30,
            content: `Coordinate geometry connects algebra with visual spatial geometry.

### Equation of a Straight Line:
- **Slope-Intercept**: \`y = mx + c\` (m is slope, c is y-intercept)
- **Slope Formula**: \`m = (y2 - y1) / (x2 - x1)\`
- **Perpendicular Condition**: \`m1 * m2 = -1\`

### Standard Circle Equation:
\`\`\`
(x - h)^2 + (y - k)^2 = r^2
\`\`\`
Where \`(h, k)\` is the center coordinates and \`r\` is the radius.`,
            keyTakeaways: [
              'Distance between points (x1, y1) and (x2, y2) is √[(x2 - x1)² + (y2 - y1)²].',
              'Completing the square converts general quadratic equations into standard circle form.'
            ]
          }
        ]
      }
    ]
  }
];
