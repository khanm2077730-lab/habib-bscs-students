import { NoteItem } from '../types';

export const ALL_NOTES: NoteItem[] = [
  {
    id: 'note-pf-01',
    subjectId: 'pf-theory',
    title: 'C++ Fundamentals, Memory & Flowcharts Complete Guide',
    chapter: 'Chapter 1: Introduction to Programming',
    category: 'lecture-notes',
    fileFormat: 'PDF',
    pages: 14,
    fileSize: '1.8 MB',
    uploadedDate: 'Fall Semester',
    description: 'Comprehensive study guide covering binary data representation, CPU execution cycle, compilers, standard C++ syntax skeleton, and variable scopes.',
    content: `# Habib BSCS Students - Lecture Notes
## Subject: Programming Fundamentals (Theory) - CS-101
### Chapter 1: Introduction to Programming & System Architecture

---
### 1. The Computing Architecture
Every high-level program written in C++ undergoes translation before CPU execution:
1. **Source Code (.cpp)**: Human-readable text written by programmer.
2. **Preprocessing**: Resolves #include directives and macros.
3. **Compilation**: Converts preprocessed code to object code (.o or .obj).
4. **Linking**: Combines object files with runtime libraries into an executable.

---
### 2. Standard C++ Structure
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Habib BSCS Platform" << endl;
    return 0;
}
\`\`\`

---
### 3. Fundamental Data Types & Memory
- **int**: 4 bytes (-2,147,483,648 to +2,147,483,647)
- **float**: 4 bytes (~7 decimal digits precision)
- **double**: 8 bytes (~15 decimal digits precision)
- **char**: 1 byte (Stores single ASCII character, e.g., 'A' = 65)
- **bool**: 1 byte (true: 1, false: 0)

---
### 4. Arithmetic & Precedence
1. Parentheses: ( )
2. Multiplicative: * , / , % (evaluated Left to Right)
3. Additive: + , - (evaluated Left to Right)
*Note on Integer Division: 7 / 2 evaluates to 3. For 3.5, use 7.0 / 2 or static_cast<double>(7)/2.*

---
### 5. Revision Summary
- Always initialize variables before use to avoid garbage values.
- Choose double over float for scientific precision.
- main() must return an integer exit code to the host OS.`
  },
  {
    id: 'note-pf-lab-manual',
    subjectId: 'pf-lab',
    title: 'Complete C++ Lab Manual: Experiments 01 to 10',
    chapter: 'Laboratory Practical Manual',
    category: 'lab-manual',
    fileFormat: 'PDF',
    pages: 22,
    fileSize: '3.4 MB',
    uploadedDate: 'Fall Semester',
    description: 'Official practical lab manual containing 10 lab tasks: command-line compiling, I/O formatting, conditional branches, loops, functions, and array sorting.',
    content: `# Habib BSCS Students - Lab Manual
## Course: Programming Fundamentals Lab (CS-101L)
### Practical Worksheets & Debugging Tasks

---
### Lab Experiment 1: GCC Compiler Toolchain & Formatting
**Objective**: Compile C++ source files using terminal and format console tables with <iomanip>.
\`\`\`bash
g++ -Wall -std=c++17 lab1.cpp -o lab1
./lab1
\`\`\`

---
### Lab Experiment 2: Decision Trees & Tax Calculator
**Objective**: Build a multi-tier tax computation algorithm with nested if-else ladders and input validation.

---
### Lab Experiment 3: Iteration & Prime Number Tester
**Objective**: Implement for and while loops with boolean flags to test primality with O(sqrt(N)) efficiency.

---
### Lab Experiment 4: Array Traversal & Linear Search
**Objective**: Pass integer arrays to modular functions, compute statistical variance, and search elements.

---
### Lab Experiment 5: Bubble Sort & Array Reversal
**Objective**: Implement in-place swapping and ascending order sorting algorithms.

---
### Lab Safety & Best Practices
- Never commit compiled binaries (.exe) to version control.
- Use "-Wall -Wextra" compiler warnings in every compilation.
- Ensure all dynamic memory allocated via 'new' is released with 'delete'.`
  },
  {
    id: 'note-pf-cheatsheet',
    subjectId: 'pf-theory',
    title: 'C++ Quick Revision Cheat Sheet & Syntax Reference',
    chapter: 'All Chapters Quick Revision',
    category: 'revision-sheet',
    fileFormat: 'PDF',
    pages: 6,
    fileSize: '950 KB',
    uploadedDate: 'Fall Semester',
    description: 'Quick-access formula and syntax cheat sheet: operators precedence, loop structures, array declarations, string member functions, and pointers overview.',
    content: `# Habib BSCS Students - Quick Revision Cheat Sheet
## Programming Fundamentals (Theory)

### Quick Syntax Matrix
| Feature | Syntax Example |
| :--- | :--- |
| Variable Declaration | \`int score = 100;\` |
| Output Stream | \`cout << "Value: " << score << endl;\` |
| Input Stream | \`cin >> score;\` |
| Read Full Line | \`getline(cin, stringVar);\` |
| Ternary Operator | \`string res = (score >= 50) ? "Pass" : "Fail";\` |
| For Loop | \`for(int i = 0; i < n; i++) { ... }\` |
| While Loop | \`while(condition) { ... }\` |
| Pass by Reference | \`void update(int &ref) { ref += 10; }\` |

### Key Pitfalls to Avoid
1. Confusing assignment '=' with equality '==' in if conditions.
2. Forgetting 'break;' in switch statements causes accidental fall-through.
3. Accessing array index out-of-bounds (index < 0 or index >= size).
4. Forgetting cin.ignore() when mixing cin >> and getline().`
  },
  {
    id: 'note-ict-01',
    subjectId: 'ict-theory',
    title: 'Computer Architecture, CPU, Memory & Bus Systems',
    chapter: 'Chapter 1: Hardware & System Architecture',
    category: 'lecture-notes',
    fileFormat: 'PDF',
    pages: 12,
    fileSize: '2.1 MB',
    uploadedDate: 'Fall Semester',
    description: 'Detailed study notes covering Von Neumann architecture, CPU subsystems (ALU, CU, Registers), RAM vs ROM, and system bus topologies.',
    content: `# Habib BSCS Students - Lecture Notes
## Subject: Information and Communication Technology (ICT Theory)
### Chapter 1: Computer Hardware & Architecture

---
### 1. Von Neumann Architecture
Modern computing systems share instructions and working data in a unified physical memory space.
- **CPU**: Consists of Arithmetic Logic Unit (ALU), Control Unit (CU), and Registers.
- **Memory Unit**: Primary storage (RAM & ROM).
- **System Bus**:
  1. *Data Bus*: Bidirectional path carrying actual bytes.
  2. *Address Bus*: Unidirectional path specifying memory locations.
  3. *Control Bus*: Synchronizing control and timing signals (Read/Write).

---
### 2. The Memory Hierarchy
Speed decreases and capacity increases as you move down:
1. **Registers** (CPU internal, ~1 nanosecond access)
2. **L1, L2, L3 Cache** (SRAM, extremely fast)
3. **Main Memory** (DRAM, volatile, temporary workspace)
4. **Solid-State Drives (SSD)** (Flash NAND, non-volatile, persistent)
5. **Hard Disk Drives & Optical Media** (Magnetic, mechanical)`
  },
  {
    id: 'note-ict-network',
    subjectId: 'ict-theory',
    title: 'Networking, TCP/IP, OSI Model & Cybersecurity Guide',
    chapter: 'Chapter 2: Networks & Security',
    category: 'lecture-notes',
    fileFormat: 'PDF',
    pages: 16,
    fileSize: '2.6 MB',
    uploadedDate: 'Fall Semester',
    description: 'In-depth guide to networking protocols, OSI 7-layer model, IPv4 vs IPv6, DNS resolution sequence, firewalls, and cryptographic fundamentals.',
    content: `# Habib BSCS Students - Lecture Notes
## Subject: Information & Communication Technology (ICT)
### Chapter 2: Computer Networks & Cybersecurity

---
### 1. The OSI 7-Layer Reference Model
1. **Application (Layer 7)**: HTTP, HTTPS, FTP, DNS, SMTP.
2. **Presentation (Layer 6)**: Encryption, compression, ASCII/Unicode.
3. **Session (Layer 5)**: Establishes, maintains, and terminates connections.
4. **Transport (Layer 4)**: TCP (reliable) and UDP (unreliable, fast).
5. **Network (Layer 3)**: IP routing and packet addressing.
6. **Data Link (Layer 2)**: MAC addressing, Ethernet frames, switches.
7. **Physical (Layer 1)**: Bits transmitted over copper cables, fiber, or radio waves.

---
### 2. Cybersecurity Essentials
- **CIA Triad**: Confidentiality, Integrity, and Availability.
- **Phishing**: Social engineering emails designed to capture credentials.
- **DDoS (Distributed Denial of Service)**: Flooding target servers with artificial traffic.
- **Symmetric vs Asymmetric Encryption**: Symmetric uses one shared secret key; Asymmetric (RSA/ECC) uses a public key for encryption and private key for decryption.`
  },
  {
    id: 'note-ict-lab-manual',
    subjectId: 'ict-lab',
    title: 'ICT Practical Lab Manual: CLI, Networks & Office Suites',
    chapter: 'Laboratory Practical Manual',
    category: 'lab-manual',
    fileFormat: 'PDF',
    pages: 18,
    fileSize: '2.9 MB',
    uploadedDate: 'Fall Semester',
    description: 'Practical lab guide containing command line tasks, network auditing with ping and traceroute, Excel spreadsheet modeling, and HTML page structure.',
    content: `# Habib BSCS Students - ICT Lab Manual
## Course: ICT Lab (ICT-101L)

### Module 1: Windows & Linux Command-Line Proficiency
- Creating hierarchical folder trees via \`mkdir\`.
- File inspection and modification commands (\`type\`, \`cat\`, \`head\`, \`tail\`).
- File permissions with \`chmod\` (r=4, w=2, x=1).

### Module 2: Network Diagnostics
- Verifying latency and packet loss with \`ping\`.
- Mapping gateway hops using \`tracert\` / \`traceroute\`.
- Inspecting active listening ports with \`netstat -ano\`.
- DNS queries with \`nslookup\`.

### Module 3: Advanced Spreadsheet Analysis
- Arithmetic formulas: SUM, AVERAGE, MIN, MAX.
- Conditional logic: =IF(condition, value_if_true, value_if_false).
- Lookup functions: VLOOKUP and XLOOKUP.`
  },
  {
    id: 'note-eng-01',
    subjectId: 'functional-english',
    title: 'Functional English: Grammar, Tenses & Technical Writing',
    chapter: 'Complete Academic English Guide',
    category: 'lecture-notes',
    fileFormat: 'PDF',
    pages: 15,
    fileSize: '1.7 MB',
    uploadedDate: 'Fall Semester',
    description: 'Academic guide on English grammar, eliminating comma splices, mastering subject-verb agreement, writing topic sentences, and formal technical correspondence.',
    content: `# Habib BSCS Students - Study Notes
## Subject: Functional English (ENG-101)

### Section 1: Grammatical Precision
1. **Subject-Verb Agreement**:
   - The plural noun in a prepositional phrase never changes the singular verb of the subject:
     - *Incorrect*: A bouquet of yellow roses were delivered.
     - *Correct*: A bouquet [of yellow roses] was delivered.

2. **Active vs. Passive Voice**:
   - Active: "Dr. Habib published the computer science paper." (Strong, concise)
   - Passive: "The computer science paper was published by Dr. Habib."

3. **Conditionals**:
   - Zero Conditional (Universal Truths): If you heat ice, it melts.
   - First Conditional (Realistic Future): If you study daily, you will excel in the exam.
   - Third Conditional (Past Regret): If you had attended the lab, you would have passed.`
  },
  {
    id: 'note-sci-01',
    subjectId: 'natural-science-theory',
    title: 'Natural Science: Physics Mechanics, Electricity & Matter',
    chapter: 'Chapters 1-3: Physical Sciences Overview',
    category: 'lecture-notes',
    fileFormat: 'PDF',
    pages: 14,
    fileSize: '2.3 MB',
    uploadedDate: 'Fall Semester',
    description: 'Physical science concepts for computing students: kinematics, Newton\'s laws of motion, work and energy, Ohm\'s law, semiconductor physics, and ecology.',
    content: `# Habib BSCS Students - Study Notes
## Subject: Natural Science Theory (SCI-101)

### 1. Classical Mechanics
- **Newton\'s First Law**: Law of inertia (objects persist in uniform motion without external net force).
- **Newton\'s Second Law**: F = m * a (Force in Newtons).
- **Newton\'s Third Law**: Action and reaction are equal in magnitude and opposite in direction.

### 2. Work, Energy & Power
- **Work**: W = F * d * cos(θ) (Joules).
- **Kinetic Energy**: KE = 0.5 * m * v^2.
- **Potential Energy**: PE = m * g * h.
- **Power**: Rate of energy conversion, P = W / t (Watts).

### 3. Semiconductor Electronics
- Silicon doped with Phosphorus creates **n-type** semiconductors (majority carrier: electrons).
- Silicon doped with Boron creates **p-type** semiconductors (majority carrier: holes).
- A p-n junction forms diodes and field-effect transistors (MOSFETs) that form computer chips.`
  },
  {
    id: 'note-sci-lab-manual',
    subjectId: 'natural-science-lab',
    title: 'Natural Science Practical Lab Manual & Measurement Worksheets',
    chapter: 'Laboratory Practical Manual',
    category: 'lab-manual',
    fileFormat: 'PDF',
    pages: 16,
    fileSize: '2.5 MB',
    uploadedDate: 'Fall Semester',
    description: 'Experimental laboratory manual covering Vernier calipers, micrometer screw gauges, simple pendulums, chemical safety, and verification of Ohm\'s law.',
    content: `# Habib BSCS Students - Lab Manual
## Course: Natural Science Lab (SCI-101L)

### Practical Experiment 1: Vernier Caliper Measurements
- Determining instrument least count (0.1 mm).
- Reading main scale division and coinciding vernier scale mark.
- Subtracting zero error to find accurate dimensions of solid cylinders.

### Practical Experiment 2: Verifying Ohm\'s Law
- Assembling series DC power supply, ammeter, test resistor, and parallel voltmeter.
- Recording current response across voltage steps from 1V to 6V.
- Generating V-I graph to compute resistance slope.`
  },
  {
    id: 'note-calc-01',
    subjectId: 'calculus-analytical-geometry',
    title: 'Calculus & Analytical Geometry: Master Formula & Solution Guide',
    chapter: 'Limits, Derivatives, Integrals & Coordinate Geometry',
    category: 'lecture-notes',
    fileFormat: 'PDF',
    pages: 20,
    fileSize: '3.1 MB',
    uploadedDate: 'Fall Semester',
    description: 'Complete mathematical guide featuring limits evaluation, differentiation rules (power, product, quotient, chain), indefinite and definite integrals, and straight lines/circles.',
    content: `# Habib BSCS Students - Master Notes
## Subject: Calculus and Analytical Geometry (MTH-101)

### 1. Limits & Continuity
- **Fundamental Trig Limit**: lim (x -> 0) [sin(x) / x] = 1.
- **Factoring Indeterminate 0/0**:
  lim (x -> 3) [(x^2 - 9)/(x - 3)] = lim (x -> 3) [(x - 3)(x + 3)/(x - 3)] = 3 + 3 = 6.

### 2. Differentiation Rules
- Power Rule: d/dx [x^n] = n * x^(n-1)
- Product Rule: (uv)' = u'v + uv'
- Quotient Rule: (u/v)' = (u'v - uv') / v^2
- Chain Rule: d/dx [f(g(x))] = f'(g(x)) * g'(x)
- Exponential: d/dx [e^(kx)] = k * e^(kx)
- Natural Log: d/dx [ln(x)] = 1/x

### 3. Integration Fundamentals
- Power Rule: ∫ x^n dx = (x^(n+1))/(n+1) + C (for n ≠ -1)
- Exponential: ∫ e^(kx) dx = (1/k) * e^(kx) + C
- Definite Integral: ∫ from a to b f(x)dx = F(b) - F(a)

### 4. Coordinate Geometry
- Distance: d = √[(x2 - x1)^2 + (y2 - y1)^2]
- Slope: m = (y2 - y1) / (x2 - x1)
- Slope-Intercept: y = mx + c
- Circle centered at (h, k) with radius r: (x - h)^2 + (y - k)^2 = r^2`
  },
  {
    id: 'note-calc-cheatsheet',
    subjectId: 'calculus-analytical-geometry',
    title: 'Calculus Quick Revision Sheet & Integral Tables',
    chapter: 'Formulas & Tables',
    category: 'revision-sheet',
    fileFormat: 'PDF',
    pages: 5,
    fileSize: '880 KB',
    uploadedDate: 'Fall Semester',
    description: 'Condensed formula tables for exam revision: trigonometric derivatives and integrals, conic section equations, and second derivative test rules.',
    content: `# Habib BSCS Students - Calculus Quick Cheat Sheet
## Quick Exam Formula Reference

### Derivative Table
- d/dx [sin x] = cos x
- d/dx [cos x] = -sin x
- d/dx [tan x] = sec^2 x
- d/dx [sec x] = sec x tan x
- d/dx [e^x] = e^x
- d/dx [ln x] = 1/x

### Analytical Geometry Equations
- Line: Ax + By + C = 0 (Slope m = -A/B)
- Perpendicular Slope Condition: m1 * m2 = -1
- Parallel Slope Condition: m1 = m2
- Circle: x^2 + y^2 + 2gx + 2fy + c = 0 (Center: (-g, -f), Radius: √(g² + f² - c))
- Ellipse: x^2/a^2 + y^2/b^2 = 1
- Parabola: y^2 = 4ax (Focus at (a, 0))`
  }
];
