import { SubjectQuiz } from '../types';

export const ALL_QUIZZES: Record<string, SubjectQuiz> = {
  'pf-theory': {
    subjectId: 'pf-theory',
    subjectName: 'Programming Fundamentals (Theory)',
    totalQuestions: 15,
    timeLimitMinutes: 20,
    questions: [
      {
        id: 1,
        question: 'Which header file is required in C++ for standard input and output streams like std::cout and std::cin?',
        options: ['<stdio.h>', '<iostream>', '<conio.h>', '<stdlib.h>'],
        correctAnswer: 1,
        explanation: '<iostream> is the standard C++ header containing definitions for cout, cin, cerr, and clog streams.',
        topic: 'Basics & Headers'
      },
      {
        id: 2,
        question: 'What is the correct syntax for declaring an integer variable named "studentAge" initialized to 20?',
        options: ['integer studentAge = 20;', 'int studentAge := 20;', 'int studentAge = 20;', 'var studentAge = 20;'],
        correctAnswer: 2,
        explanation: 'In C++, variables are declared using the data type followed by the identifier and optional initialization, e.g., int studentAge = 20;.',
        topic: 'Variables & Data Types'
      },
      {
        id: 3,
        question: 'What is the value of 17 % 5 in C++ arithmetic?',
        options: ['3.4', '2', '3', '1'],
        correctAnswer: 1,
        explanation: 'The modulo operator (%) computes the integer remainder after division: 17 divided by 5 is 3 with a remainder of 2.',
        topic: 'Arithmetic Operators'
      },
      {
        id: 4,
        question: 'Which of the following logical operators represents the logical AND operation in C++?',
        options: ['&', 'AND', '&&', '||'],
        correctAnswer: 2,
        explanation: '&& is the logical AND operator in C++. Single & is the bitwise AND operator.',
        topic: 'Logical Operators'
      },
      {
        id: 5,
        question: 'Which loop is guaranteed to execute its block of code at least once before testing its condition?',
        options: ['for loop', 'while loop', 'do-while loop', 'foreach loop'],
        correctAnswer: 2,
        explanation: 'A do-while loop is an exit-controlled loop; the body executes once first, and the condition is evaluated at the end.',
        topic: 'Control Flow'
      },
      {
        id: 6,
        question: 'What will be output by: for (int i = 0; i < 3; i++) { cout << i << " "; } ?',
        options: ['0 1 2 ', '0 1 2 3 ', '1 2 3 ', '0 0 0 '],
        correctAnswer: 0,
        explanation: 'The loop starts at i = 0 and runs while i < 3 (i = 0, 1, 2), incrementing by 1 after each iteration, printing "0 1 2 ".',
        topic: 'Loops'
      },
      {
        id: 7,
        question: 'What is the return type of a function that does not return any value back to the caller?',
        options: ['int', 'null', 'void', 'empty'],
        correctAnswer: 2,
        explanation: 'The void keyword specifies that a function returns no value.',
        topic: 'Functions'
      },
      {
        id: 8,
        question: 'In C++, array indexing begins at which index value?',
        options: ['-1', '0', '1', 'Depends on array size'],
        correctAnswer: 1,
        explanation: 'C++ utilizes zero-based indexing, meaning the first element is located at index 0.',
        topic: 'Arrays'
      },
      {
        id: 9,
        question: 'If int marks[5] = {10, 20, 30, 40, 50}; what is the value stored in marks[3]?',
        options: ['30', '40', '50', '20'],
        correctAnswer: 1,
        explanation: 'marks[0]=10, marks[1]=20, marks[2]=30, marks[3]=40.',
        topic: 'Arrays'
      },
      {
        id: 10,
        question: 'Which keyword is used to terminate a loop or switch case immediately and pass control to the statement following it?',
        options: ['continue', 'exit', 'break', 'return'],
        correctAnswer: 2,
        explanation: 'The break statement immediately terminates the innermost enclosing loop or switch construct.',
        topic: 'Control Flow'
      },
      {
        id: 11,
        question: 'What is the standard size of a char data type in modern C++ standard implementations?',
        options: ['1 byte', '2 bytes', '4 bytes', '8 bytes'],
        correctAnswer: 0,
        explanation: 'In C++, sizeof(char) is defined to be exactly 1 byte (8 bits) by the language specification.',
        topic: 'Data Types'
      },
      {
        id: 12,
        question: 'What will cout << (5 > 3 && 2 < 1); display on screen by default in C++?',
        options: ['true', 'false', '1', '0'],
        correctAnswer: 3,
        explanation: '5 > 3 evaluates to true, but 2 < 1 is false. true && false is false, which prints as 0 in C++ standard output.',
        topic: 'Boolean Expressions'
      },
      {
        id: 13,
        question: 'What does "pass by reference" achieve when passing an argument to a function in C++?',
        options: [
          'Creates a duplicate copy in separate memory',
          'Allows the function to directly access and modify the caller’s original variable',
          'Converts the variable permanently into a constant string',
          'Prevents the function from reading the variable value'
        ],
        correctAnswer: 1,
        explanation: 'Pass-by-reference uses an alias (&) to allow functions to directly inspect and alter the original caller variable without memory duplication.',
        topic: 'Functions & Parameters'
      },
      {
        id: 14,
        question: 'Which escape sequence represents a new line in C++ output strings?',
        options: ['\\t', '\\n', '\\r', '\\b'],
        correctAnswer: 1,
        explanation: '\\n represents the newline character, moving the output cursor to the next line.',
        topic: 'I/O Streams'
      },
      {
        id: 15,
        question: 'What is the purpose of the return 0; statement inside the main() function in C++?',
        options: [
          'Prints the digit 0 to console',
          'Indicates that the program finished execution successfully to the operating system',
          'Clears all RAM allocated to the program',
          'Resets the counter variables to initial values'
        ],
        correctAnswer: 1,
        explanation: 'Returning 0 from main() indicates exit status code 0, signaling successful execution without errors to the host OS.',
        topic: 'Program Structure'
      }
    ]
  },
  'pf-lab': {
    subjectId: 'pf-lab',
    subjectName: 'Programming Fundamentals Lab',
    totalQuestions: 15,
    timeLimitMinutes: 20,
    questions: [
      {
        id: 1,
        question: 'In a C++ lab environment, which command line tool is commonly used on Linux to compile "main.cpp" into an executable named "app"?',
        options: ['python main.cpp app', 'g++ main.cpp -o app', 'run c++ main.cpp', 'compile -gcc main.cpp'],
        correctAnswer: 1,
        explanation: 'g++ is the GNU C++ compiler; the -o flag specifies the target output binary name ("app").',
        topic: 'Compilation & Tools'
      },
      {
        id: 2,
        question: 'When reading an entire line containing spaces into a std::string variable "fullName", which function must be used?',
        options: ['cin >> fullName;', 'getline(cin, fullName);', 'cin.read(fullName);', 'scanf("%s", fullName);'],
        correctAnswer: 1,
        explanation: 'getline(cin, fullName) reads all characters including spaces until encountering a newline character.',
        topic: 'Input Handling'
      },
      {
        id: 3,
        question: 'What runtime problem occurs if a program attempts to write data to array[10] when the array was declared as int array[10]?',
        options: [
          'Automatic array resize',
          'Out-of-bounds memory access (Undefined Behavior/Crash)',
          'Compilation error in C++',
          'Implicit index wrapping back to index 0'
        ],
        correctAnswer: 1,
        explanation: 'int array[10] only has valid indices from 0 to 9. Accessing index 10 is an out-of-bounds error causing undefined behavior or segmentation fault.',
        topic: 'Debugging'
      },
      {
        id: 4,
        question: 'What is the result of using integer division in C++: double result = 7 / 2; ?',
        options: ['3.5', '3.0', '4.0', '3'],
        correctAnswer: 1,
        explanation: 'Both 7 and 2 are integers, so 7 / 2 evaluates to integer 3 first before being assigned to double, becoming 3.0. To fix it, write 7.0 / 2.',
        topic: 'Lab Pitfalls'
      },
      {
        id: 5,
        question: 'Which tool or flag in GCC/Clang is used during lab work to enable all standard compiler warnings?',
        options: ['-w', '-Wall', '-O3', '-std=c99'],
        correctAnswer: 1,
        explanation: '-Wall instructs the compiler to enable all recommended warnings about common programmer oversights and uninitialized variables.',
        topic: 'Compiler Flags'
      },
      {
        id: 6,
        question: 'In debugging with GDB, which command sets a stop point at line 15 of the source code?',
        options: ['stop 15', 'break 15', 'pause 15', 'halt 15'],
        correctAnswer: 1,
        explanation: 'The "break" command (or "b 15") sets a breakpoint at line 15 in GDB.',
        topic: 'Debugging Tools'
      },
      {
        id: 7,
        question: 'Consider: int x = 5; cout << ++x; What will be displayed?',
        options: ['5', '6', '4', 'Undefined'],
        correctAnswer: 1,
        explanation: '++x is a pre-increment operator: it increments x to 6 first, then yields the incremented value to cout.',
        topic: 'Operators Lab'
      },
      {
        id: 8,
        question: 'What does cin.clear() do in a C++ interactive console lab exercise?',
        options: [
          'Clears the monitor screen',
          'Resets the internal error state flags on the input stream',
          'Erases all variable memory',
          'Flushes the output buffer to disk'
        ],
        correctAnswer: 1,
        explanation: 'cin.clear() clears error state flags (like failbit when a user enters text into an integer variable), restoring cin to good state.',
        topic: 'Stream Error Handling'
      },
      {
        id: 9,
        question: 'Which header file provides access to mathematical helper functions like sqrt(), pow(), and abs() in C++?',
        options: ['<mathio>', '<cmath>', '<algorithm>', '<numeric>'],
        correctAnswer: 1,
        explanation: '<cmath> is the standard C++ library header providing common mathematical computations.',
        topic: 'Standard Libraries'
      },
      {
        id: 10,
        question: 'In a practical lab assignment, why is it recommended to initialize local variables like int sum = 0; before looping?',
        options: [
          'Uninitialized local variables contain unpredictable garbage values from stack memory',
          'C++ refuses to compile any uninitialized variable',
          'To make the variable read-only',
          'To register the variable with the graphics card'
        ],
        correctAnswer: 0,
        explanation: 'Local automatic variables in C++ are not automatically zeroed out; they hold arbitrary garbage values, risking severe calculation bugs.',
        topic: 'Best Practices'
      },
      {
        id: 11,
        question: 'What will the condition (x == 5) evaluate to if written accidentally as (x = 5)?',
        options: [
          'Always produces a syntax error',
          'Assigns 5 to x, then evaluates to 5 (which is truthy in C++)',
          'Compares x with 5 safely',
          'Restores the previous value of x'
        ],
        correctAnswer: 1,
        explanation: 'Single = is assignment. (x = 5) sets x to 5 and produces the value 5, which tests as true in conditional statements.',
        topic: 'Common Bugs'
      },
      {
        id: 12,
        question: 'How do you format floating-point output to display exactly 2 decimal places using iomanip in C++?',
        options: [
          'cout << setprecision(2);',
          'cout << fixed << setprecision(2);',
          'cout << round(2);',
          'cout << format("2f");'
        ],
        correctAnswer: 1,
        explanation: 'Combining std::fixed with std::setprecision(2) from <iomanip> forces floating-point values to output with 2 fixed decimal places.',
        topic: 'Formatted I/O'
      },
      {
        id: 13,
        question: 'What is the function of the "continue" keyword inside a for loop lab exercise?',
        options: [
          'Terminates the program completely',
          'Skips the rest of the current iteration and advances to the loop update/increment step',
          'Repeats the current iteration without incrementing',
          'Pauses execution until user presses Enter'
        ],
        correctAnswer: 1,
        explanation: 'continue skips any remaining statements in the current iteration and directly initiates the next iteration of the loop.',
        topic: 'Loop Control'
      },
      {
        id: 14,
        question: 'How do you determine the total number of elements in a statically declared array: int arr[25]; using sizeof?',
        options: ['sizeof(arr)', 'sizeof(arr) / sizeof(arr[0])', 'sizeof(arr) * 4', 'length(arr)'],
        correctAnswer: 1,
        explanation: 'sizeof(arr) gives the total memory bytes of the array; dividing by sizeof(arr[0]) gives the total element count.',
        topic: 'Memory & Arrays'
      },
      {
        id: 15,
        question: 'Which stream in C++ is specifically dedicated to reporting error messages without standard output buffering?',
        options: ['cin', 'cout', 'cerr', 'cmsg'],
        correctAnswer: 2,
        explanation: 'std::cerr is the unbuffered standard error stream intended for immediate display of error diagnostic messages.',
        topic: 'Streams'
      }
    ]
  },
  'ict-theory': {
    subjectId: 'ict-theory',
    subjectName: 'Information and Communication Technology (ICT Theory)',
    totalQuestions: 15,
    timeLimitMinutes: 20,
    questions: [
      {
        id: 1,
        question: 'What are the two primary components inside the Central Processing Unit (CPU)?',
        options: [
          'RAM and ROM',
          'Arithmetic Logic Unit (ALU) and Control Unit (CU)',
          'Hard Disk and SSD',
          'BIOS and CMOS'
        ],
        correctAnswer: 1,
        explanation: 'The CPU consists of the Arithmetic Logic Unit (ALU) for arithmetic/logical calculations and the Control Unit (CU) for instruction sequencing.',
        topic: 'Computer Hardware'
      },
      {
        id: 2,
        question: 'Which type of memory is volatile and loses all stored data when computer power is switched off?',
        options: ['ROM', 'Flash Drive', 'RAM (Random Access Memory)', 'Magnetic Tape'],
        correctAnswer: 2,
        explanation: 'RAM is volatile working memory required by the CPU for active processes; without electrical power, its contents vanish.',
        topic: 'Memory Hierarchy'
      },
      {
        id: 3,
        question: 'How many bits make up one standard byte of computer data?',
        options: ['4 bits', '8 bits', '16 bits', '32 bits'],
        correctAnswer: 1,
        explanation: 'One standard byte is made up of exactly 8 binary digits (bits).',
        topic: 'Data Representation'
      },
      {
        id: 4,
        question: 'What is the primary role of an Operating System (OS)?',
        options: [
          'To browse social media websites',
          'To manage computer hardware resources and provide a platform for application software',
          'To generate electricity for the motherboard',
          'To replace the physical microprocessor'
        ],
        correctAnswer: 1,
        explanation: 'An Operating System acts as an intermediary between computer hardware and user applications, managing CPU, memory, storage, and I/O devices.',
        topic: 'Operating Systems'
      },
      {
        id: 5,
        question: 'Which network topology connects all client nodes directly to a central networking device such as a switch or hub?',
        options: ['Bus topology', 'Ring topology', 'Star topology', 'Mesh topology'],
        correctAnswer: 2,
        explanation: 'In a Star topology, every host is connected via an individual cable directly to a central hub or switch.',
        topic: 'Computer Networks'
      },
      {
        id: 6,
        question: 'What does the acronym "DNS" stand for in internet infrastructure?',
        options: ['Data Network System', 'Domain Name System', 'Digital Node Server', 'Direct Network Socket'],
        correctAnswer: 1,
        explanation: 'DNS stands for Domain Name System. It translates human-friendly domain names (e.g., google.com) into IP addresses (e.g., 142.250.190.46).',
        topic: 'Internet Technologies'
      },
      {
        id: 7,
        question: 'Which protocol is the secure, encrypted standard for transmitting web pages over the World Wide Web?',
        options: ['FTP', 'HTTP', 'HTTPS', 'SMTP'],
        correctAnswer: 2,
        explanation: 'HTTPS (HyperText Transfer Protocol Secure) encrypts communication between the browser and web server using TLS/SSL encryption.',
        topic: 'Cybersecurity & Web'
      },
      {
        id: 8,
        question: 'What is a "Phishing" attack in cybersecurity?',
        options: [
          'A hardware failure caused by water damage',
          'A social engineering deceit where attackers impersonate trusted entities to steal credentials',
          'An algorithm used to sort databases',
          'A tool used to scan network cables'
        ],
        correctAnswer: 1,
        explanation: 'Phishing is a fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity.',
        topic: 'Cybersecurity'
      },
      {
        id: 9,
        question: 'In relational databases (RDBMS), what is a "Primary Key"?',
        options: [
          'The password needed to log into the database server',
          'A column or set of columns that uniquely identifies each record in a table',
          'Any column containing integer values',
          'The first software license key entered by the database administrator'
        ],
        correctAnswer: 1,
        explanation: 'A Primary Key enforces entity integrity by uniquely identifying each distinct record/row within a database table.',
        topic: 'Databases'
      },
      {
        id: 10,
        question: 'Which of the following describes the difference between System Software and Application Software?',
        options: [
          'System software runs the computer hardware; Application software helps users perform specific tasks',
          'Application software cannot be uninstalled',
          'System software is only found on smartphones',
          'There is no distinction in computer science'
        ],
        correctAnswer: 0,
        explanation: 'System software (e.g., Windows, Linux) manages the system hardware, whereas application software (e.g., Word processors, browsers) satisfies end-user tasks.',
        topic: 'Software Categories'
      },
      {
        id: 11,
        question: 'What is an IPv4 address composed of?',
        options: [
          '16 hexadecimal characters separated by colons',
          '32 bits, typically represented as 4 decimal numbers separated by dots',
          '128 bits represented in base 64',
          'A plain text username and password'
        ],
        correctAnswer: 1,
        explanation: 'An IPv4 address has a 32-bit length, partitioned into four 8-bit octets represented in dotted-decimal format (e.g., 192.168.1.1).',
        topic: 'Networking'
      },
      {
        id: 12,
        question: 'What does "Cloud Computing" refer to in modern information technology?',
        options: [
          'Weather simulation software running on supercomputers',
          'On-demand delivery of IT resources (servers, storage, databases) over the internet with pay-as-you-go pricing',
          'Wireless radio broadcasting',
          'Running software solely on an offline USB thumb drive'
        ],
        correctAnswer: 1,
        explanation: 'Cloud computing provides on-demand access to computing resources over the internet, minimizing capital expense on physical on-premise hardware.',
        topic: 'Emerging Technologies'
      },
      {
        id: 13,
        question: 'Which logical gate yields an output of 1 ONLY when both of its inputs are 1?',
        options: ['OR gate', 'NOT gate', 'AND gate', 'XOR gate'],
        correctAnswer: 2,
        explanation: 'The AND gate outputs true (1) if and only if all input operands evaluate to true (1).',
        topic: 'Digital Logic'
      },
      {
        id: 14,
        question: 'What is the role of the BIOS/UEFI when a computer is first powered on?',
        options: [
          'Deletes all temporary internet files',
          'Performs Power-On Self-Test (POST) and bootstraps the operating system into memory',
          'Formats the hard drive automatically',
          'Connects automatically to social media websites'
        ],
        correctAnswer: 1,
        explanation: 'BIOS/UEFI initializes system hardware during POST and locates the bootloader to load the Operating System kernel into RAM.',
        topic: 'System Bootstrapping'
      },
      {
        id: 15,
        question: 'Which of the following is considered open-source software?',
        options: ['Microsoft Windows', 'Apple macOS', 'Linux (Ubuntu/Debian)', 'Adobe Photoshop'],
        correctAnswer: 2,
        explanation: 'Linux is licensed under free and open-source licenses (such as GPL), allowing anyone to inspect, modify, and distribute its source code.',
        topic: 'Software Licensing'
      }
    ]
  },
  'ict-lab': {
    subjectId: 'ict-lab',
    subjectName: 'Information and Communication Technology Lab',
    totalQuestions: 15,
    timeLimitMinutes: 20,
    questions: [
      {
        id: 1,
        question: 'In the Command Prompt / Terminal, which command is used to test connectivity and latency to a remote server like google.com?',
        options: ['connect google.com', 'ping google.com', 'test-net google.com', 'route google.com'],
        correctAnswer: 1,
        explanation: 'ping utilizes ICMP Echo Request messages to evaluate network reachability and round-trip transmission latency.',
        topic: 'Network Diagnostics'
      },
      {
        id: 2,
        question: 'Which command on Windows Command Prompt displays the IP address, subnet mask, and default gateway of the local computer?',
        options: ['ipconfig', 'ifconfig', 'netstat', 'show ip'],
        correctAnswer: 0,
        explanation: 'ipconfig displays all current TCP/IP network configuration values on Microsoft Windows systems (ifconfig on Unix/Linux).',
        topic: 'Network Utilities'
      },
      {
        id: 3,
        question: 'In spreadsheet applications like Microsoft Excel, which formula correctly computes the arithmetic average of cells B2 through B10?',
        options: ['=MEAN(B2:B10)', '=AVERAGE(B2:B10)', '=SUM(B2:B10)/COUNT', '=MEDIAN(B2:B10)'],
        correctAnswer: 1,
        explanation: '=AVERAGE(B2:B10) calculates the arithmetic mean of numeric cells in the defined range.',
        topic: 'Productivity Software'
      },
      {
        id: 4,
        question: 'What is the purpose of the absolute cell reference symbol "$" in Excel formulas (e.g., $A$1)?',
        options: [
          'Formats the cell value as currency',
          'Locks the row and column reference so it does not shift when copied across other cells',
          'Multiplies the cell value by 100',
          'Marks the cell as hidden from print'
        ],
        correctAnswer: 1,
        explanation: 'The $ symbol locks specific rows or columns in formulas, preventing relative offset recalculations during autofill.',
        topic: 'Excel Techniques'
      },
      {
        id: 5,
        question: 'On Linux command line, which command creates a brand new directory named "Assignment1"?',
        options: ['newdir Assignment1', 'mkdir Assignment1', 'createdir Assignment1', 'touch Assignment1'],
        correctAnswer: 1,
        explanation: 'mkdir (make directory) creates new folders in Unix/Linux and Windows command lines.',
        topic: 'File Management'
      },
      {
        id: 6,
        question: 'Which command lists the contents of the current folder on a Linux shell?',
        options: ['dirlist', 'ls', 'list', 'show'],
        correctAnswer: 1,
        explanation: 'ls (list) lists directory contents in Linux and macOS terminals.',
        topic: 'CLI Operations'
      },
      {
        id: 7,
        question: 'What is the purpose of compressing multiple files into a ".zip" or ".tar.gz" archive?',
        options: [
          'To permanently delete duplicated documents',
          'To bundle multiple files into one file and reduce storage size for easier sharing',
          'To execute all files simultaneously',
          'To convert text documents into executable binaries'
        ],
        correctAnswer: 1,
        explanation: 'Archiving bundles items together while lossless compression algorithms reduce aggregate file size for faster email and network transmission.',
        topic: 'Data Compression'
      },
      {
        id: 8,
        question: 'Which command displays the complete route and hop delays taken by network packets to reach a destination server?',
        options: ['tracert (Windows) / traceroute (Linux)', 'netstat', 'nslookup', 'arp -a'],
        correctAnswer: 0,
        explanation: 'tracert (on Windows) or traceroute (on Unix) traces packet hops across intermediate routers to a designated host.',
        topic: 'Network Routing Tools'
      },
      {
        id: 9,
        question: 'What command-line utility queries DNS name servers to find the IP address corresponding to a hostname?',
        options: ['dnsfind', 'nslookup', 'whois', 'lookup-ip'],
        correctAnswer: 1,
        explanation: 'nslookup (Name Server Lookup) queries Domain Name System servers for domain name or IP address mapping.',
        topic: 'DNS Diagnostics'
      },
      {
        id: 10,
        question: 'In a word processor, what feature enables automatically creating a series of personalized letters or certificates for many recipients from a table dataset?',
        options: ['AutoFormat', 'Mail Merge', 'Track Changes', 'Spell Check'],
        correctAnswer: 1,
        explanation: 'Mail Merge links a master template document with a data source (e.g., spreadsheet) to generate customized copies automatically.',
        topic: 'Word Processing'
      },
      {
        id: 11,
        question: 'Which shortcut key in Windows locks the computer screen immediately for laboratory security?',
        options: ['Ctrl + L', 'Windows Key + L', 'Alt + F4', 'Ctrl + Shift + Esc'],
        correctAnswer: 1,
        explanation: 'Pressing Windows Key + L instantly locks the active Windows user workstation.',
        topic: 'Security Best Practices'
      },
      {
        id: 12,
        question: 'What is the primary function of the Task Manager in Windows or Activity Monitor in macOS?',
        options: [
          'To write email drafts',
          'To monitor real-time CPU/RAM/Disk utilization and end unresponsive processes',
          'To configure router passwords',
          'To backup files to external hard drives'
        ],
        correctAnswer: 1,
        explanation: 'Task Manager allows administrators and students to inspect process resource usage and terminate stuck tasks.',
        topic: 'System Administration'
      },
      {
        id: 13,
        question: 'When creating an HTML webpage in lab, which tag wraps the entire visible body content displayed in the browser viewport?',
        options: ['<head>', '<body>', '<content>', '<section>'],
        correctAnswer: 1,
        explanation: 'The <body> tag encloses all renderable content of an HTML document such as headings, paragraphs, and images.',
        topic: 'Web Development Lab'
      },
      {
        id: 14,
        question: 'What does the Linux command "chmod 755 script.sh" do in lab practice?',
        options: [
          'Deletes the file script.sh',
          'Sets read, write, and execute permissions for the owner, and read/execute permissions for others',
          'Renames script.sh to 755',
          'Encrypts script.sh with 755-bit encryption'
        ],
        correctAnswer: 1,
        explanation: 'chmod changes file permissions. 7 (rwx) grants full rights to the owner, while 5 (r-x) gives read and execute rights to group and other users.',
        topic: 'File Permissions'
      },
      {
        id: 15,
        question: 'What is the function of the "netstat -ano" command during a network auditing lab?',
        options: [
          'Downloads a fresh web browser',
          'Lists active TCP/UDP network connections, listening ports, and corresponding process IDs (PID)',
          'Shuts down all network adapters',
          'Tests Wi-Fi signal strength'
        ],
        correctAnswer: 1,
        explanation: 'netstat -ano displays active network connections, numerical addresses/ports, and the associated Process ID (PID) managing each port.',
        topic: 'Network Auditing'
      }
    ]
  },
  'functional-english': {
    subjectId: 'functional-english',
    subjectName: 'Functional English',
    totalQuestions: 15,
    timeLimitMinutes: 20,
    questions: [
      {
        id: 1,
        question: 'Identify the part of speech of the underlined word: "She completed the assignment QUICKLY."',
        options: ['Adjective', 'Adverb', 'Verb', 'Preposition'],
        correctAnswer: 1,
        explanation: '"Quickly" is an adverb because it modifies the action verb "completed", describing how she accomplished it.',
        topic: 'Parts of Speech'
      },
      {
        id: 2,
        question: 'Which of the following sentences adheres to correct subject-verb agreement?',
        options: [
          'The group of students were studying in the computer lab.',
          'The group of students was studying in the computer lab.',
          'The group of students are studying in the computer lab.',
          'The group of students have studying in the computer lab.'
        ],
        correctAnswer: 1,
        explanation: 'The subject is the singular collective noun "The group" (not the plural object of preposition "students"), so it takes the singular verb "was".',
        topic: 'Subject-Verb Agreement'
      },
      {
        id: 3,
        question: 'Which sentence is written in the Present Perfect tense?',
        options: [
          'She wrote three technical reports.',
          'She has written three technical reports.',
          'She is writing three technical reports.',
          'She will write three technical reports.'
        ],
        correctAnswer: 1,
        explanation: 'The present perfect tense is formed using has/have + past participle: "She has written".',
        topic: 'Tenses'
      },
      {
        id: 4,
        question: 'What is the passive voice transformation of: "The engineer debugged the software application"?',
        options: [
          'The software application was debugged by the engineer.',
          'The software application is debugged by the engineer.',
          'The software application has been debugged by the engineer.',
          'The software application debugs the engineer.'
        ],
        correctAnswer: 0,
        explanation: 'In past simple passive voice, object + was/were + past participle + by subject: "The software application was debugged by the engineer."',
        topic: 'Active & Passive Voice'
      },
      {
        id: 5,
        question: 'Which word is the closest synonym for "COMPREHENSIVE"?',
        options: ['Narrow', 'Exhaustive / Thorough', 'Brief', 'Superficial'],
        correctAnswer: 1,
        explanation: '"Comprehensive" means including all or nearly all elements or aspects of something; thorough and exhaustive.',
        topic: 'Vocabulary'
      },
      {
        id: 6,
        question: 'Choose the correct preposition: "The university server has been operational _____ 2018."',
        options: ['for', 'since', 'from', 'in'],
        correctAnswer: 1,
        explanation: '"Since" is used with a specific fixed point in time (since 2018), while "for" is used with a duration of time (for 5 years).',
        topic: 'Prepositions'
      },
      {
        id: 7,
        question: 'Which of the following is a "comma splice" grammatical error?',
        options: [
          'Although the server restarted, the application remained slow.',
          'The server restarted, the application remained slow.',
          'The server restarted; the application remained slow.',
          'The server restarted, and the application remained slow.'
        ],
        correctAnswer: 1,
        explanation: 'A comma splice happens when two independent clauses are joined solely by a comma without a coordinating conjunction (like "and") or semicolon.',
        topic: 'Punctuation & Syntax'
      },
      {
        id: 8,
        question: 'What is the role of a "topic sentence" in an academic paragraph?',
        options: [
          'It provides decorative quotes at the end of the page',
          'It states the main idea and focus of the paragraph',
          'It contains the bibliography citations',
          'It must always be written in bold uppercase text'
        ],
        correctAnswer: 1,
        explanation: 'The topic sentence announces the central controlling idea of a paragraph, guiding the direction of supporting sentences.',
        topic: 'Paragraph Writing'
      },
      {
        id: 9,
        question: 'Select the sentence with the correct conditional structure (Third Conditional):',
        options: [
          'If I studied, I will pass the exam.',
          'If I had studied harder, I would have passed the examination.',
          'If I study harder, I would pass the examination.',
          'If I had studied harder, I will pass the examination.'
        ],
        correctAnswer: 1,
        explanation: 'The Third Conditional (imagining a past outcome) uses: If + past perfect, would have + past participle.',
        topic: 'Conditionals'
      },
      {
        id: 10,
        question: 'What is the antonym of the word "OBSOLETE"?',
        options: ['Outdated', 'Contemporary / Modern', 'Ancient', 'Archaic'],
        correctAnswer: 1,
        explanation: '"Obsolete" means no longer produced or used; out of date. Its direct antonym is modern or contemporary.',
        topic: 'Vocabulary'
      },
      {
        id: 11,
        question: 'In formal business communication, which salutation is best when the recipient’s specific name is unknown?',
        options: [
          'Hey buddy,',
          'Dear Sir or Madam, / Dear Hiring Committee,',
          'What’s up,',
          'Yo,'
        ],
        correctAnswer: 1,
        explanation: 'Formal correspondence requires respectful salutations such as "Dear Sir or Madam," or addressing the relevant committee.',
        topic: 'Professional Communication'
      },
      {
        id: 12,
        question: 'Which word contains a prefix meaning "under" or "below"?',
        options: ['Supercomputer', 'Subroutine', 'Postgraduate', 'Multiprocessor'],
        correctAnswer: 1,
        explanation: 'The prefix "sub-" originates from Latin meaning under, below, or secondary (e.g., subroutine, submarine).',
        topic: 'Word Formation'
      },
      {
        id: 13,
        question: 'Which of the following demonstrates the proper use of an apostrophe for possession?',
        options: [
          'The students laptops were all connected.',
          'The student\'s laptop was repaired yesterday.',
          'The students\' are going to class.',
          'Its a great programming language.'
        ],
        correctAnswer: 1,
        explanation: '"student\'s laptop" correctly shows singular possession (the laptop belonging to one student).',
        topic: 'Punctuation'
      },
      {
        id: 14,
        question: 'What is the purpose of transitional words such as "Furthermore", "In addition", and "Moreover"?',
        options: [
          'To introduce contradictory statements',
          'To add complementary supporting information to an argument',
          'To signal chronological ending',
          'To ask rhetorical questions'
        ],
        correctAnswer: 1,
        explanation: 'Transitional markers like "Furthermore" and "Moreover" signal additive relationship between consecutive ideas.',
        topic: 'Cohesion & Coherence'
      },
      {
        id: 15,
        question: 'Identify the sentence with correct parallel structure:',
        options: [
          'A computer scientist must know coding, debugging, and how to analyze problems.',
          'A computer scientist must know coding, debugging, and analyzing problems.',
          'A computer scientist must know how to code, debugging, and analyze problems.',
          'A computer scientist must know to code, to debug, and analyzing.'
        ],
        correctAnswer: 1,
        explanation: 'Parallel structure requires matching grammatical forms in a series: "coding, debugging, and analyzing" all use gerunds (-ing).',
        topic: 'Sentence Structure'
      }
    ]
  },
  'natural-science-theory': {
    subjectId: 'natural-science-theory',
    subjectName: 'Natural Science Theory',
    totalQuestions: 15,
    timeLimitMinutes: 20,
    questions: [
      {
        id: 1,
        question: 'According to Newton’s Second Law of Motion, what is the formula connecting Force (F), Mass (m), and Acceleration (a)?',
        options: ['F = m / a', 'F = m * a', 'F = m * a^2', 'F = a / m'],
        correctAnswer: 1,
        explanation: 'Newton\'s Second Law states that force equals mass multiplied by acceleration (F = ma).',
        topic: 'Physics Basics'
      },
      {
        id: 2,
        question: 'What is the fundamental subatomic particle carrying a negative electrical charge inside an atom?',
        options: ['Proton', 'Neutron', 'Electron', 'Positron'],
        correctAnswer: 2,
        explanation: 'Electrons orbit the atomic nucleus and carry a fundamental negative electrical charge (-1.602 x 10^-19 C).',
        topic: 'Atomic Structure'
      },
      {
        id: 3,
        question: 'What is the Law of Conservation of Energy?',
        options: [
          'Energy is constantly being destroyed as heat in computers',
          'Energy can neither be created nor destroyed, only transformed from one form to another',
          'Energy always increases in an isolated system',
          'Energy is only conserved at absolute zero temperature'
        ],
        correctAnswer: 1,
        explanation: 'The First Law of Thermodynamics (Conservation of Energy) states that total energy in an isolated system remains constant over time.',
        topic: 'Thermodynamics'
      },
      {
        id: 4,
        question: 'Which cellular organelle is widely known as the "powerhouse of the cell" due to ATP generation?',
        options: ['Ribosome', 'Mitochondria', 'Golgi apparatus', 'Endoplasmic reticulum'],
        correctAnswer: 1,
        explanation: 'Mitochondria generate the majority of chemical energy required by the cell in the form of Adenosine Triphosphate (ATP).',
        topic: 'Biology Fundamentals'
      },
      {
        id: 5,
        question: 'What is the pH value of pure distilled water at 25°C, representing chemical neutrality?',
        options: ['0', '7', '14', '1'],
        correctAnswer: 1,
        explanation: 'A pH of 7 is neutral; values below 7 indicate acidic solutions, while values above 7 indicate basic/alkaline solutions.',
        topic: 'Chemistry'
      },
      {
        id: 6,
        question: 'Which state of matter has a definite volume but takes the shape of its container?',
        options: ['Solid', 'Liquid', 'Gas', 'Plasma'],
        correctAnswer: 1,
        explanation: 'Liquids possess a fixed volume due to cohesive intermolecular forces, but lack rigid structure, conforming to container boundaries.',
        topic: 'States of Matter'
      },
      {
        id: 7,
        question: 'Which electromagnetic wave has the shortest wavelength and highest frequency?',
        options: ['Radio waves', 'Infrared waves', 'Visible light', 'Gamma rays'],
        correctAnswer: 3,
        explanation: 'Gamma rays occupy the highest frequency and shortest wavelength band in the electromagnetic spectrum, carrying the highest photon energies.',
        topic: 'Electromagnetic Spectrum'
      },
      {
        id: 8,
        question: 'What is the primary greenhouse gas produced by burning fossil fuels that contributes to global climate change?',
        options: ['Oxygen (O2)', 'Carbon Dioxide (CO2)', 'Nitrogen (N2)', 'Argon (Ar)'],
        correctAnswer: 1,
        explanation: 'Carbon dioxide (CO2) is a potent greenhouse gas that traps thermal infrared radiation in Earth\'s lower atmosphere.',
        topic: 'Environmental Science'
      },
      {
        id: 9,
        question: 'What does Ohm’s Law state regarding current (I), voltage (V), and resistance (R)?',
        options: ['V = I / R', 'V = I * R', 'I = V * R', 'R = V * I'],
        correctAnswer: 1,
        explanation: 'Ohm\'s Law states that voltage drop across a conductor is proportional to current multiplied by resistance (V = IR).',
        topic: 'Electricity'
      },
      {
        id: 10,
        question: 'What process do green plants use to convert sunlight, carbon dioxide, and water into glucose and oxygen?',
        options: ['Fermentation', 'Photosynthesis', 'Cellular respiration', 'Decomposition'],
        correctAnswer: 1,
        explanation: 'Photosynthesis uses chlorophyll to harness photon energy, producing glucose and releasing oxygen gas.',
        topic: 'Biological Energy'
      },
      {
        id: 11,
        question: 'What is the speed of light in a vacuum (c) approximately?',
        options: ['3 x 10^5 m/s', '3 x 10^8 m/s', '3 x 10^10 m/s', '3 x 10^3 km/h'],
        correctAnswer: 1,
        explanation: 'The universal physical constant for the speed of light in vacuum is approximately 3.0 x 10^8 meters per second (299,792,458 m/s).',
        topic: 'Physics Constants'
      },
      {
        id: 12,
        question: 'In chemistry, what is an isotope?',
        options: [
          'Atoms of the same element having the same number of protons but different numbers of neutrons',
          'Atoms with equal numbers of protons and electrons',
          'Molecules with identical chemical formulas but different structures',
          'Substances composed of multiple compounds'
        ],
        correctAnswer: 0,
        explanation: 'Isotopes are variants of a chemical element with equal proton counts (same atomic number) but differing neutron counts (different mass numbers).',
        topic: 'Chemistry'
      },
      {
        id: 13,
        question: 'What is the First Law of Motion (Newton’s Law of Inertia)?',
        options: [
          'Every action has an equal and opposite reaction',
          'An object remains at rest or in uniform straight motion unless acted upon by a net external force',
          'Gravity is proportional to distance squared',
          'Acceleration decreases as mass decreases'
        ],
        correctAnswer: 1,
        explanation: 'Newton\'s First Law describes inertia: a body preserves its state of rest or constant linear velocity until an unbalanced net force intervenes.',
        topic: 'Classical Mechanics'
      },
      {
        id: 14,
        question: 'Which layer of the atmosphere protects life on Earth by absorbing dangerous ultraviolet (UV) solar radiation?',
        options: ['Troposphere', 'Ozone Layer (in Stratosphere)', 'Exosphere', 'Mesosphere'],
        correctAnswer: 1,
        explanation: 'The ozone layer (O3 molecules) in the stratosphere absorbs high-energy UV-B and UV-C wavelengths.',
        topic: 'Earth & Atmospheric Science'
      },
      {
        id: 15,
        question: 'What is the SI unit of measurement for electrical resistance?',
        options: ['Ampere', 'Volt', 'Ohm (Ω)', 'Watt'],
        correctAnswer: 2,
        explanation: 'The Ohm (symbol Ω) is the SI unit of electrical resistance, named after physicist Georg Ohm.',
        topic: 'Units & Measurements'
      }
    ]
  },
  'natural-science-lab': {
    subjectId: 'natural-science-lab',
    subjectName: 'Natural Science Lab',
    totalQuestions: 15,
    timeLimitMinutes: 20,
    questions: [
      {
        id: 1,
        question: 'When reading the liquid volume in a graduated cylinder, at which point should your eye be aligned with the meniscus?',
        options: [
          'At the very top edge of the liquid curvature',
          'At the bottom curve of the meniscus at eye level',
          'At the middle between top and bottom',
          'Angle from above looking downwards'
        ],
        correctAnswer: 1,
        explanation: 'To eliminate parallax error, view the graduated cylinder at eye level and measure at the bottom tangent of the concave liquid meniscus.',
        topic: 'Measurement Techniques'
      },
      {
        id: 2,
        question: 'What is the least count of a standard metric Vernier caliper with 10 vernier divisions spanning 9 main scale millimeters?',
        options: ['0.1 mm', '0.01 mm', '1.0 mm', '0.05 cm'],
        correctAnswer: 0,
        explanation: 'Least count = 1 Main Scale Division (1 mm) - 1 Vernier Division (0.9 mm) = 0.1 mm.',
        topic: 'Precision Instruments'
      },
      {
        id: 3,
        question: 'In the event of an acid splash on skin in the laboratory, what is the immediate first-aid protocol?',
        options: [
          'Apply concentrated base immediately to neutralize it',
          'Flush the affected area with running water for at least 15 minutes',
          'Bandage the area tightly with dry cotton',
          'Cover with grease or butter'
        ],
        correctAnswer: 1,
        explanation: 'Immediate copiously running water for 15+ minutes dilutes and washes away chemical agents without thermal neutralization injury.',
        topic: 'Lab Safety'
      },
      {
        id: 4,
        question: 'What instrument is used to determine the mass of a small sample with high precision up to milligrams?',
        options: ['Spring balance', 'Electronic Analytical Balance', 'Measuring tape', 'Barometer'],
        correctAnswer: 1,
        explanation: 'Analytical balances measure mass with sub-milligram precision inside draft shields to prevent air disturbance.',
        topic: 'Instruments'
      },
      {
        id: 5,
        question: 'Which glassware is designed for exact titration experiments to dispense known variable volumes of titrant drop-by-drop?',
        options: ['Beaker', 'Burette', 'Conical flask', 'Watch glass'],
        correctAnswer: 1,
        explanation: 'A burette has a graduated glass tube and stopcock valve specifically engineered for precise volumetric chemical titrations.',
        topic: 'Lab Equipment'
      },
      {
        id: 6,
        question: 'What is the primary function of a multimeter set to "DC Voltage" mode in a physics circuit experiment?',
        options: [
          'Measures electric current flowing in series',
          'Measures the potential difference between two circuit nodes in parallel',
          'Measures heat generation in watts',
          'Supplies battery power to components'
        ],
        correctAnswer: 1,
        explanation: 'Voltmeters and multimeters in DCV mode connect in parallel across circuit components to evaluate potential difference in Volts.',
        topic: 'Circuit Labs'
      },
      {
        id: 7,
        question: 'Why should a hot glass beaker never be placed directly onto a freezing metal benchtop?',
        options: [
          'It will magnetize the glass',
          'Thermal shock causes unequal contraction and risks shattering the glassware',
          'The chemical solution inside will change color immediately',
          'It creates an electrical short circuit'
        ],
        correctAnswer: 1,
        explanation: 'Rapid localized temperature drops cause severe thermal gradients and mechanical stress in glass, causing thermal shock fractures.',
        topic: 'Safety Protocols'
      },
      {
        id: 8,
        question: 'When diluting concentrated sulfuric acid (H2SO4) with water, which rule must strictly be followed?',
        options: [
          'Always pour water rapidly into the acid',
          'Always add acid slowly into water while stirring continuously (AA = Add Acid)',
          'Mix both simultaneously in equal volumes',
          'Boil the water first before pouring into acid'
        ],
        correctAnswer: 1,
        explanation: 'The dilution of concentrated acid is violently exothermic; adding acid slowly into water allows the large heat capacity of water to dissipate heat safely.',
        topic: 'Chemical Preparation'
      },
      {
        id: 9,
        question: 'What color does blue litmus paper turn when exposed to an acidic solution?',
        options: ['Remains blue', 'Turns bright red / pink', 'Turns green', 'Turns yellow'],
        correctAnswer: 1,
        explanation: 'Acidic substances (pH < 7) turn blue litmus paper red.',
        topic: 'Qualitative Indicators'
      },
      {
        id: 10,
        question: 'In a pendulum experiment, how does changing the bob mass (without changing length) affect the period T?',
        options: [
          'Doubles the period',
          'Halves the period',
          'Has virtually no effect on the period (T depends on length and gravity)',
          'Causes the pendulum to stop moving'
        ],
        correctAnswer: 2,
        explanation: 'The period of a simple pendulum is T = 2π√(L/g); it is independent of the mass of the pendulum bob for small angular amplitudes.',
        topic: 'Physics Experiments'
      },
      {
        id: 11,
        question: 'What is the function of the fine adjustment knob on an optical compound microscope?',
        options: [
          'Changes the objective lenses rapidly',
          'Moves the stage slightly to bring high-magnification specimens into sharp, crisp focus',
          'Adjusts the intensity of the electric lamp',
          'Controls the aperture diaphragm'
        ],
        correctAnswer: 1,
        explanation: 'The fine focus knob provides micrometric vertical motion to achieve sharp image focus under high magnification.',
        topic: 'Microscopy'
      },
      {
        id: 12,
        question: 'What is "Tare" on a digital electronic balance?',
        options: [
          'A calculation of measurement error percentage',
          'Zeroing out the scale with an empty container on it so only the sample mass is measured',
          'The maximum permissible load before breaking',
          'The calibration date of the device'
        ],
        correctAnswer: 1,
        explanation: 'Pressing Tare resets the balance readout to 0.000 g with the empty weigh-boat on it, subtracting the container\'s tare weight automatically.',
        topic: 'Measurement Skills'
      },
      {
        id: 13,
        question: 'Which graph plot displays Ohm\'s Law compliance where Current (I) is plotted against Voltage (V) for an ohmic conductor?',
        options: [
          'A straight line passing through the origin (0,0)',
          'An exponential curve curving upwards',
          'A flat horizontal line',
          'A parabolic curve'
        ],
        correctAnswer: 0,
        explanation: 'Because V = IR, the V-I relationship is strictly linear; plotting V against I produces a straight line through the origin with slope equal to resistance R.',
        topic: 'Data Analysis'
      },
      {
        id: 14,
        question: 'Which fire extinguisher category is appropriate for extinguishing electrical fires (e.g., in a computing or electronics lab)?',
        options: ['Class A (Water only)', 'Class C / Carbon Dioxide (CO2)', 'Wet Chemical foam', 'Buckets of tap water'],
        correctAnswer: 1,
        explanation: 'Carbon dioxide (CO2) or dry powder extinguishers do not conduct electricity, whereas water creates fatal electrocution hazards.',
        topic: 'Lab Safety'
      },
      {
        id: 15,
        question: 'When recording experimental readings in a lab report, how should random errors be minimized?',
        options: [
          'Take only a single reading and guess subsequent values',
          'Take multiple repeated trials and compute the arithmetic mean (average)',
          'Discard all values that look unexpected without explanation',
          'Round all numbers to the nearest hundreds'
        ],
        correctAnswer: 1,
        explanation: 'Repeated trials and statistical averaging cancel out stochastic random fluctuations, improving experimental precision.',
        topic: 'Error Analysis'
      }
    ]
  },
  'calculus-analytical-geometry': {
    subjectId: 'calculus-analytical-geometry',
    subjectName: 'Calculus and Analytical Geometry',
    totalQuestions: 15,
    timeLimitMinutes: 20,
    questions: [
      {
        id: 1,
        question: 'Evaluate the limit: lim (x -> 3) of (x^2 - 9) / (x - 3).',
        options: ['0', '3', '6', 'Does not exist'],
        correctAnswer: 2,
        explanation: 'Factor numerator as (x - 3)(x + 3). Cancelling (x - 3) gives lim (x -> 3) of (x + 3) = 3 + 3 = 6.',
        topic: 'Limits'
      },
      {
        id: 2,
        question: 'What is the derivative of f(x) = 4x^3 - 5x^2 + 7x - 9 with respect to x?',
        options: ['12x^2 - 10x + 7', '12x^3 - 10x^2 + 7', '4x^2 - 5x + 7', '12x^2 - 5x'],
        correctAnswer: 0,
        explanation: 'Using power rule d/dx[x^n] = n*x^(n-1): d/dx[4x^3] = 12x^2, d/dx[-5x^2] = -10x, d/dx[7x] = 7, d/dx[-9] = 0. Sum: 12x^2 - 10x + 7.',
        topic: 'Differentiation'
      },
      {
        id: 3,
        question: 'What is the derivative of f(x) = sin(x)?',
        options: ['-cos(x)', 'cos(x)', '-sin(x)', 'tan(x)'],
        correctAnswer: 1,
        explanation: 'The derivative of sin(x) with respect to x is cos(x).',
        topic: 'Trigonometric Derivatives'
      },
      {
        id: 4,
        question: 'Find the slope of the straight line defined by the equation 3x + 2y - 8 = 0.',
        options: ['3/2', '-3/2', '2/3', '-2/3'],
        correctAnswer: 1,
        explanation: 'Rearrange into slope-intercept form y = mx + c: 2y = -3x + 8 -> y = (-3/2)x + 4. Thus the slope m is -3/2.',
        topic: 'Coordinate Geometry'
      },
      {
        id: 5,
        question: 'Evaluate the indefinite integral: ∫ (6x^2 + 2x) dx.',
        options: ['12x + 2 + C', '2x^3 + x^2 + C', '3x^3 + 2x^2 + C', '6x^3 + 2x^2 + C'],
        correctAnswer: 1,
        explanation: 'Power rule for integration: ∫ 6x^2 dx = 6*(x^3/3) = 2x^3; ∫ 2x dx = 2*(x^2/2) = x^2. Result is 2x^3 + x^2 + C.',
        topic: 'Integration'
      },
      {
        id: 6,
        question: 'What is the center and radius of the circle defined by (x - 4)^2 + (y + 2)^2 = 25?',
        options: [
          'Center (4, -2), Radius = 25',
          'Center (4, -2), Radius = 5',
          'Center (-4, 2), Radius = 5',
          'Center (4, 2), Radius = 5'
        ],
        correctAnswer: 1,
        explanation: 'Standard circle equation is (x - h)^2 + (y - k)^2 = r^2. Here h = 4, k = -2, and r = √25 = 5.',
        topic: 'Analytical Geometry'
      },
      {
        id: 7,
        question: 'What does the Product Rule state for differentiating u(x) * v(x)?',
        options: [
          'u\'(x) * v\'(x)',
          'u\'(x) * v(x) + u(x) * v\'(x)',
          'u\'(x) * v(x) - u(x) * v\'(x)',
          '(u(x) * v\'(x)) / (v(x))^2'
        ],
        correctAnswer: 1,
        explanation: 'The Product Rule is (u*v)\' = u\'v + uv\'.',
        topic: 'Differentiation Rules'
      },
      {
        id: 8,
        question: 'Evaluate the definite integral: ∫ from 0 to 2 of (3x^2) dx.',
        options: ['6', '8', '12', '16'],
        correctAnswer: 1,
        explanation: 'The antiderivative of 3x^2 is x^3. Evaluated between 0 and 2: [x^3] from 0 to 2 = 2^3 - 0^3 = 8.',
        topic: 'Definite Integrals'
      },
      {
        id: 9,
        question: 'Two non-vertical lines with slopes m1 and m2 are perpendicular if and only if:',
        options: ['m1 = m2', 'm1 * m2 = -1', 'm1 + m2 = 0', 'm1 * m2 = 1'],
        correctAnswer: 1,
        explanation: 'Perpendicular lines have negative reciprocal slopes, meaning m1 * m2 = -1.',
        topic: 'Coordinate Geometry'
      },
      {
        id: 10,
        question: 'What is the distance between the two points A(1, 2) and B(4, 6) in the Cartesian plane?',
        options: ['3', '4', '5', '7'],
        correctAnswer: 2,
        explanation: 'Distance formula: d = √[(4 - 1)^2 + (6 - 2)^2] = √[3^2 + 4^2] = √[9 + 16] = √25 = 5.',
        topic: 'Analytical Geometry'
      },
      {
        id: 11,
        question: 'At a critical point x = c of a smooth function f(x), what is the value of the first derivative f\'(c)?',
        options: ['f\'(c) = 1', 'f\'(c) = 0 (or undefined)', 'f\'(c) = c', 'f\'(c) > 0 always'],
        correctAnswer: 1,
        explanation: 'A critical point occurs where the first derivative is either zero or undefined.',
        topic: 'Extrema & Optimization'
      },
      {
        id: 12,
        question: 'If f\'\'(c) > 0 at a critical point where f\'(c) = 0, what does the Second Derivative Test conclude about f(c)?',
        options: [
          'f(c) is a relative local maximum',
          'f(c) is a relative local minimum',
          'f(c) is an inflection point',
          'The test is inconclusive'
        ],
        correctAnswer: 1,
        explanation: 'When f\'(c) = 0 and f\'\'(c) > 0, the curve is concave upwards, meaning f(c) is a local minimum.',
        topic: 'Applications of Derivatives'
      },
      {
        id: 13,
        question: 'What is the derivative of the natural exponential function f(x) = e^(3x)?',
        options: ['e^(3x)', '3 * e^(3x)', '3x * e^(3x-1)', '(1/3) * e^(3x)'],
        correctAnswer: 1,
        explanation: 'By the chain rule: d/dx[e^(g(x))] = e^(g(x)) * g\'(x). For g(x) = 3x, g\'(x) = 3, so derivative is 3*e^(3x).',
        topic: 'Chain Rule'
      },
      {
        id: 14,
        question: 'What geometric shape is represented by the equation x^2 / 16 + y^2 / 9 = 1?',
        options: ['Circle', 'Parabola', 'Ellipse', 'Hyperbola'],
        correctAnswer: 2,
        explanation: 'The standard form x^2/a^2 + y^2/b^2 = 1 represents an ellipse centered at the origin.',
        topic: 'Conic Sections'
      },
      {
        id: 15,
        question: 'Evaluate lim (x -> 0) of sin(x) / x.',
        options: ['0', '1', 'Infinity', 'Undefined'],
        correctAnswer: 1,
        explanation: 'This is a fundamental trigonometric limit in calculus: lim (x -> 0) [sin(x) / x] = 1.',
        topic: 'Fundamental Limits'
      }
    ]
  }
};
