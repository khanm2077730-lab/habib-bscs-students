import { CppTopic } from '../types';

export const CPP_TOPICS: CppTopic[] = [
  {
    id: 'intro-programming',
    title: '1. What is Programming & How Computers Think',
    category: 'Basics',
    explanation: 'Programming is the process of writing precise instructions that a computer can execute to solve problems, automate tasks, and create software.',
    code: `// A computer follows instructions sequentially from top to bottom
#include <iostream>

int main() {
    std::cout << "Hello, Future Software Engineer!" << std::endl;
    std::cout << "Step 1: Write code" << std::endl;
    std::cout << "Step 2: Compile to machine binary" << std::endl;
    std::cout << "Step 3: Run and celebrate!" << std::endl;
    return 0;
}`,
    expectedOutput: `Hello, Future Software Engineer!
Step 1: Write code
Step 2: Compile to machine binary
Step 3: Run and celebrate!`,
    stepByStep: [
      'Every instruction executes in strict order from top to bottom.',
      'Statements end with a semicolon (;) to mark completion.',
      'Comments starting with // are ignored by the compiler.'
    ],
    practiceTask: 'Modify the code to display your university name, your target semester GPA, and your favorite tech dream job.',
    commonMistakes: 'Forgetting the semicolon (;) at the end of a line is the #1 beginner syntax error!'
  },
  {
    id: 'what-is-cpp',
    title: '2. What is C++ & The Core Skeleton',
    category: 'Basics',
    explanation: 'C++ was developed by Bjarne Stroustrup in 1979 as an extension of the C language. It provides both low-level hardware memory control and high-level object-oriented programming abstractions.',
    code: `#include <iostream> // Preprocessor directive to include I/O stream library

using namespace std; // Allows using cout instead of std::cout

// main() is the universal entry point where execution begins
int main() {
    cout << "Welcome to C++ at Habib BSCS Platform!" << endl;
    return 0; // 0 tells the Operating System that the program ran successfully
}`,
    expectedOutput: `Welcome to C++ at Habib BSCS Platform!`,
    stepByStep: [
      '#include <iostream>: Imports input/output stream capabilities.',
      'using namespace std: Brings standard library identifiers into the current scope.',
      'int main(): The function where CPU starts running instructions.',
      'return 0: Returns exit code 0 (success) to the operating system.'
    ],
    practiceTask: 'Add three separate cout statements with endl to print a 3-line ASCII art box.',
    commonMistakes: 'Typing void main() instead of int main(). C++ standard mandates int main().'
  },
  {
    id: 'cout-and-cin',
    title: '3. Input & Output (cout and cin)',
    category: 'Basics',
    explanation: 'cout (character output) uses the insertion operator (<<) to display data on screen. cin (character input) uses the extraction operator (>>) to read input from the keyboard.',
    code: `#include <iostream>
using namespace std;

int main() {
    int rollNumber = 101;
    cout << "Enter your roll number: " << rollNumber << endl;
    cout << "Welcome student #" << rollNumber << " to the BSCS lab!" << endl;
    return 0;
}`,
    expectedOutput: `Enter your roll number: 101
Welcome student #101 to the BSCS lab!`,
    stepByStep: [
      'cout << "text": The << arrows point outward toward cout (displaying to screen).',
      'cin >> variable: The >> arrows point inward into the variable (saving user input).',
      'endl or \\n inserts a newline and flushes the output buffer.'
    ],
    practiceTask: 'Write a program that takes two integer inputs from a user and prints their sum.',
    commonMistakes: 'Confusing stream operators: using >> with cout or << with cin.'
  },
  {
    id: 'variables-data-types',
    title: '4. Variables & Fundamental Data Types',
    category: 'Data & Operators',
    explanation: 'Variables are labeled memory boxes in RAM. In C++, you must declare the data type so the compiler knows how many bytes to allocate.',
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int age = 19;                 // 4 bytes for whole numbers
    float height = 5.9f;          // 4 bytes for single-precision decimals
    double pi = 3.14159265;       // 8 bytes for high-precision decimals
    char grade = 'A';             // 1 byte for single character
    string student = "Habib Khan";// Text sequence
    bool passed = true;           // 1 byte (true/false)

    cout << "Student: " << student << endl;
    cout << "Age: " << age << " | Grade: " << grade << endl;
    cout << "Passed Exam: " << (passed ? "YES" : "NO") << endl;
    return 0;
}`,
    expectedOutput: `Student: Habib Khan
Age: 19 | Grade: 'A'
Passed Exam: YES`,
    stepByStep: [
      'int: Whole numbers (-2 billion to +2 billion).',
      'float & double: Real numbers with fractional points.',
      'char: Single ASCII character enclosed in single quotes \' \'.',
      'string: String of characters enclosed in double quotes " ".'
    ],
    practiceTask: 'Create variables to calculate the Body Mass Index (BMI) of a person given weight in kg and height in meters.',
    commonMistakes: 'Putting single quotes on strings or double quotes on char variables.'
  },
  {
    id: 'arithmetic-operators',
    title: '5. Arithmetic Operators & Integer Division',
    category: 'Data & Operators',
    explanation: 'C++ provides operators: addition (+), subtraction (-), multiplication (*), division (/), and modulo (%). Watch out for integer division truncation!',
    code: `#include <iostream>
using namespace std;

int main() {
    int a = 17;
    int b = 5;

    cout << "a + b = " << (a + b) << endl;
    cout << "a - b = " << (a - b) << endl;
    cout << "a * b = " << (a * b) << endl;
    cout << "Integer division (17 / 5) = " << (a / b) << " (Truncated!)" << endl;
    cout << "Modulo remainder (17 % 5) = " << (a % b) << endl;
    cout << "Floating division (17.0 / 5) = " << (17.0 / b) << endl;
    return 0;
}`,
    expectedOutput: `a + b = 22
a - b = 12
a * b = 85
Integer division (17 / 5) = 3 (Truncated!)
Modulo remainder (17 % 5) = 2
Floating division (17.0 / 5) = 3.4`,
    stepByStep: [
      'Integer divided by integer always produces an integer in C++ (drops decimal without rounding).',
      'To get decimal division, at least one operand must be a float or double.',
      'Modulo (%) gives the integer remainder after division.'
    ],
    practiceTask: 'Given a total number of seconds (e.g. 3665), convert and print it in hours, minutes, and seconds using / and %.',
    commonMistakes: 'Trying to use the modulo (%) operator with float or double operands (it only works with integers).'
  },
  {
    id: 'if-else-conditions',
    title: '6. Decision Making (if, else if, else)',
    category: 'Control Flow',
    explanation: 'Control the flow of program execution based on conditions evaluated as true or false.',
    code: `#include <iostream>
using namespace std;

int main() {
    int score = 84;

    if (score >= 90) {
        cout << "Grade: A+ (Outstanding!)" << endl;
    } else if (score >= 80) {
        cout << "Grade: A (Very Good)" << endl;
    } else if (score >= 70) {
        cout << "Grade: B (Satisfactory)" << endl;
    } else {
        cout << "Grade: F (Needs Retake)" << endl;
    }
    return 0;
}`,
    expectedOutput: `Grade: A (Very Good)`,
    stepByStep: [
      'The if statement tests a boolean expression in parentheses.',
      'If true, its code block executes and the rest of the chain is skipped.',
      'If false, it checks the subsequent else if blocks in order.',
      'If all prior conditions are false, the final else block runs as default.'
    ],
    practiceTask: 'Write a program to check whether a given year (e.g. 2024) is a Leap Year using logical operators.',
    commonMistakes: 'Using single = (assignment) instead of double == (equality check) inside the if condition.'
  },
  {
    id: 'loops-for-while',
    title: '7. Loops: For, While, and Do-While',
    category: 'Control Flow',
    explanation: 'Loops repeat code blocks automatically. Use for when count is known; while when condition based; do-while when it must run at least once.',
    code: `#include <iostream>
using namespace std;

int main() {
    // 1. For loop
    cout << "For loop (1 to 4): ";
    for (int i = 1; i <= 4; i++) {
        cout << i << " ";
    }
    cout << endl;

    // 2. While loop
    cout << "While loop countdown: ";
    int count = 3;
    while (count > 0) {
        cout << count << " ";
        count--;
    }
    cout << "Blast off!" << endl;

    // 3. Do-While loop
    int num = 100;
    do {
        cout << "Do-While executes once even though condition is false! num = " << num << endl;
    } while (num < 10);

    return 0;
}`,
    expectedOutput: `For loop (1 to 4): 1 2 3 4 
While loop countdown: 3 2 1 Blast off!
Do-While executes once even though condition is false! num = 100`,
    stepByStep: [
      'for (init; test; update): Initializes counter, checks condition, then increments at end of cycle.',
      'while (test): Evaluates condition first; if false initially, loop never runs.',
      'do { ... } while (test): Runs body first, tests condition at the bottom.'
    ],
    practiceTask: 'Print the multiplication table of 7 from 7 x 1 to 7 x 10 using a for loop.',
    commonMistakes: 'Forgetting to increment the loop variable inside a while loop, resulting in a system-freezing infinite loop.'
  },
  {
    id: 'functions-basics',
    title: '8. Modular Functions & Return Values',
    category: 'Data Structures',
    explanation: 'Functions allow dividing large programs into reusable, isolated modules with their own inputs and outputs.',
    code: `#include <iostream>
using namespace std;

// Function declaration and definition
double calculateArea(double length, double width) {
    return length * width;
}

void printGreeting(string studentName) {
    cout << "Welcome to BSCS, " << studentName << "!" << endl;
}

int main() {
    printGreeting("Habib");
    double roomArea = calculateArea(15.5, 12.0);
    cout << "Calculated Floor Area: " << roomArea << " sq meters" << endl;
    return 0;
}`,
    expectedOutput: `Welcome to BSCS, Habib!
Calculated Floor Area: 186 sq meters`,
    stepByStep: [
      'Function header: returnType functionName(parameterList).',
      'Use void when a function does not return any value.',
      'The return statement sends the calculated result back to the caller.'
    ],
    practiceTask: 'Write a function named isEven(int n) that returns true if n is even, false otherwise.',
    commonMistakes: 'Forgetting to return a value from a non-void function.'
  },
  {
    id: 'arrays-fundamentals',
    title: '9. Arrays & Zero-Based Indexing',
    category: 'Data Structures',
    explanation: 'An array is a collection of elements of the same data type stored at contiguous memory locations.',
    code: `#include <iostream>
using namespace std;

int main() {
    int marks[5] = {85, 92, 78, 64, 99};

    cout << "First mark (index 0): " << marks[0] << endl;
    cout << "Last mark  (index 4): " << marks[4] << endl;

    int total = 0;
    for (int i = 0; i < 5; i++) {
        total += marks[i];
    }

    double average = (double)total / 5;
    cout << "Average Score: " << average << endl;
    return 0;
}`,
    expectedOutput: `First mark (index 0): 85
Last mark  (index 4): 99
Average Score: 83.6`,
    stepByStep: [
      'Declared as type arrayName[size].',
      'Elements are accessed via indices from 0 up to size - 1.',
      'Arrays do not check boundaries in C++; accessing marks[5] causes an out-of-bounds error!'
    ],
    practiceTask: 'Write an array scanner that finds the maximum and minimum numbers in an array of 8 integers.',
    commonMistakes: 'Accessing index size instead of size - 1 (off-by-one boundary bug).'
  },
  {
    id: 'strings-manipulation',
    title: '10. C++ Strings & Text Processing',
    category: 'Data Structures',
    explanation: 'The std::string class from <string> provides flexible text handling with useful built-in member methods.',
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string greeting = "Habib BSCS";
    string subject = "Students";
    string fullBrand = greeting + " " + subject;

    cout << "Full String: " << fullBrand << endl;
    cout << "Length: " << fullBrand.length() << " characters" << endl;
    cout << "First character: " << fullBrand[0] << endl;
    cout << "Substring: " << fullBrand.substr(0, 5) << endl;
    return 0;
}`,
    expectedOutput: `Full String: Habib BSCS Students
Length: 20 characters
First character: H
Substring: Habib`,
    stepByStep: [
      'Strings can be concatenated cleanly using the + operator.',
      '.length() or .size() returns total characters in the string.',
      'Individual characters are accessed like an array using [index].'
    ],
    practiceTask: 'Write a program that takes a string input and prints it in reverse order.',
    commonMistakes: 'Using cin >> str to read full sentences; cin stops at the first space! Use getline(cin, str) instead.'
  },
  {
    id: 'basic-calculator',
    title: '11. Building a Functional Console Calculator',
    category: 'Advanced',
    explanation: 'Combine variables, arithmetic operators, and switch-case logic to build a fully working mathematical calculator.',
    code: `#include <iostream>
using namespace std;

int main() {
    double num1 = 45.0, num2 = 15.0;
    char operation = '*';

    cout << "Calculating: " << num1 << " " << operation << " " << num2 << endl;

    switch (operation) {
        case '+':
            cout << "Result = " << (num1 + num2) << endl;
            break;
        case '-':
            cout << "Result = " << (num1 - num2) << endl;
            break;
        case '*':
            cout << "Result = " << (num1 * num2) << endl;
            break;
        case '/':
            if (num2 != 0) {
                cout << "Result = " << (num1 / num2) << endl;
            } else {
                cout << "Error: Division by zero is undefined!" << endl;
            }
            break;
        default:
            cout << "Unknown mathematical operator!" << endl;
    }
    return 0;
}`,
    expectedOutput: `Calculating: 45 * 15
Result = 675`,
    stepByStep: [
      'Switch checks the operator character against case constants.',
      'Each case requires a break statement to prevent fall-through.',
      'Always guard against division by zero before dividing.'
    ],
    practiceTask: 'Extend the calculator to support exponents using the pow() function from <cmath>.',
    commonMistakes: 'Omitting the break statement, causing the code below to execute unintentionally.'
  },
  {
    id: 'common-errors',
    title: '12. Common Programming Errors & How to Fix Them',
    category: 'Advanced',
    explanation: 'Bugs happen to all developers. Learning how to identify compiler errors, runtime crashes, and logic bugs is half the journey of computer science.',
    code: `#include <iostream>
using namespace std;

int main() {
    // 1. Uninitialized variable (Contains garbage value in stack memory!)
    int correctCounter = 0; // Always initialize!

    // 2. Off-by-one loop error
    int items[3] = {10, 20, 30};
    // Safe traversal (i < 3, NOT i <= 3)
    for (int i = 0; i < 3; i++) {
        cout << "items[" << i << "] = " << items[i] << endl;
    }

    // 3. Integer division pitfall
    double ratio = 5.0 / 2; // Write 5.0, not 5 / 2
    cout << "Correct Ratio: " << ratio << endl;
    return 0;
}`,
    expectedOutput: `items[0] = 10
items[1] = 20
items[2] = 30
Correct Ratio: 2.5`,
    stepByStep: [
      'Syntax errors: Caught by compiler (missing semicolon, mismatched braces).',
      'Runtime errors: Crashes during execution (segfault, divide by zero).',
      'Logic errors: Code runs without errors but produces incorrect outputs.'
    ],
    practiceTask: 'Take an intentionally buggy snippet of code and step through it line-by-line using pen and paper to spot 3 subtle errors.',
    commonMistakes: 'Ignoring compiler warnings. Treat all compiler warnings with -Wall as potential bugs!'
  }
];
