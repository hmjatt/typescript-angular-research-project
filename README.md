# CST8333 Programming Language Research Project

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Concepts Covered](#concepts-covered)
- [Project Structure](#project-structure)
- [How to Run the Project](#how-to-run-the-project)
- [Running the Program](#running-the-program)
- [Testing](#testing)
- [Example Output](#example-output)
- [Documentation](#documentation)
- [License](#license)
- [Author](#author)

## Overview

This project is part of the **CST8333 Programming Language Research** course, focusing on processing a CSV dataset (`keystone-throughput-and-capacity.csv`) using **TypeScript**. The program converts each entry into a `Record` object, outputs the records, and allows user interaction to view, create, update, and delete records.

The program also showcases concepts such as **File I/O**, **API libraries**, and **error handling**. The author's name, **Harmeet Matharoo**, is displayed periodically throughout the program to ensure proper attribution.

---

## Features

- **Object-Oriented Design (OOP)**: Implements a `Record` class to model each pipeline throughput record.
- **CSV Parsing**: Reads and processes a CSV dataset into `Record` objects using the **csv-parse** library.
- **File I/O**: Uses Node.js's File System (FS) API to handle CSV input and output.
- **Error Handling**: Implements exception handling for file reading and writing.
- **User Interaction**: Allows users to create, update, delete records, reload datasets, and save to file via a command-line interface.
- **Author Attribution**: Displays the author's name, **Harmeet Matharoo**, after each menu output.
- **Color-coded Terminal Output**: Uses the **Picocolors** library to color-code terminal output for better readability.

---

## Concepts Covered

This project demonstrates several important programming concepts, including:
- **Variables**: Used throughout the program for user inputs, file paths, record data, etc.
- **Methods**: Functions such as `runProgram`, `loadDataset`, and `displayRecord` handle different parts of the program logic.
- **Object-Oriented Programming (OOP)**: The project utilizes a `Record` class to create structured objects from CSV data.
- **File I/O**: Reads from and writes to CSV files using Node.js's File System API.
- **Exception Handling**: Handles potential errors during file loading, processing, and saving.
- **API Library**: Uses `csv-parse` for parsing CSV files and `picocolors` for terminal output styling.
- **Loop Structures**: The `.forEach()` method is used to loop over records and handle user inputs.
- **Decision Structures**: Uses `switch` statements for menu-based user interaction.

---

## Project Structure

```bash
.
├── src
│   ├── models
│   │   └── Record.ts                                    # Contains the Record class definition
│   ├── services         
│   │   └── datasetService.ts                            # Contains the loadDataset function for reading and parsing CSV
│   │   └── mainService.ts                               # Contains the main program logic (runProgram function)
│   ├── utils
│   │   └── displayUtils.ts                              # Contains the displayRecord function for displaying Record data
│   ├── keystone-throughput-and-capacity.csv             # The dataset file
│   ├── Dataset Source and License - Fall 2024.docx      # Attribution and License for the dataset
│   └── app.ts                                           # Main entry point of the program
├── tests                                                # Contains unit and integration tests
│   ├── mainService.test.ts                              # Tests the mainService logic and user interaction
│   ├── datasetService.test.ts                           # Tests the datasetService for loading and parsing CSVs
│   ├── record.test.ts                                   # Tests the Record class
│   ├── displayUtils.test.ts                             # Tests the displayRecord utility
├── README.md                                            # Project documentation
├── tsconfig.json                                        # TypeScript configuration file
├── package.json                                         # Node.js dependencies and scripts
└── package-lock.json                                    # Dependency lock file
```

---

## How to Run the Project

### Prerequisites

Ensure that the following are installed:

- **Node.js** (version 14.x or later)
- **TypeScript** (version 4.x or later)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/hmjatt/typescript-angular-research-project.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd typescript-angular-research-project
   ```

3. **Install the dependencies**:

   ```bash
   npm install
   ```

4. **Add the dataset file** (if not already included):

   Place the `keystone-throughput-and-capacity.csv` file in the `src` folder.

---

## Running the Program

1. **Start the program**:

   Use the following command to run the program with TypeScript using `ts-node`:

   ```bash
   npm start
   ```

   This command will:
   - Read and parse the `keystone-throughput-and-capacity.csv` file using **csv-parse**.
   - Convert each row into a `Record` object.
   - Output the records to the console, with the author's name (`Harmeet Matharoo - CST8333 Project`) appearing after every menu display.

2. **Build the program**:

   To compile the TypeScript files into JavaScript, use:

   ```bash
   npm run build
   ```

   This command will transpile the TypeScript code into JavaScript and output the compiled files in the `dist/` folder.

   Once the project is built, run the compiled JavaScript files with:

   ```bash
   node dist/app.js
   ```

---

## Testing

The project includes unit and integration tests for various components. These tests are written using **Jest**.

### Running Tests

1. To run all tests, use the following command:

   ```bash
   npm run test
   ```

2. The tests cover:
   - **Unit tests**: Tests for the `Record` class, `datasetService`, and `displayRecord`.
   - **Integration tests**: Tests for the entire program flow in `mainService`.

---

## Example Output

```bash
--- Menu ---  
1. Display all records  
2. Create new record  
3. Update a record  
4. Delete a record  
5. Reload dataset  
6. Save dataset to file  
7. Exit  

Harmeet Matharoo - CST8333 Project  

Choose an option: 1

Record 1:

Record:
Date: 2024-06-01  
Month: 6  
Year: 2024  
Company: TransCanada Keystone Pipeline GP Ltd.  
Pipeline: Keystone pipeline  
Key Point: International boundary at or near Haskett, Manitoba  
Latitude: 48.9989  
Longitude: -97.9577  
Direction Of Flow: south  
Trade Type: export  
Product: domestic light  
Throughput (1000 m3/d): 0  
Committed Volumes (1000 m3/d): 0  
Uncommitted Volumes (1000 m3/d): 0  
Nameplate Capacity (1000 m3/d): 0  
Available Capacity (1000 m3/d): 98.39  
Reason For Variance: Capacity may vary month to month based on CER Regulatory Directive, Downstream Restrictions, Curtailment/Interruptions, Force Majeure and System Operating Factor
```

---

## Documentation

This project uses **TypeDoc** to generate comprehensive documentation from the code comments.

### Generating Documentation

1. To generate the TypeDoc documentation, run:

   ```bash
   npm run docs
   ```

   This command will generate the documentation inside the `docs` folder. It will also open a browser showing the generated documentation.

2. Alternatively, open the `docs/index.html` file in the browser to view the generated documentation.

---

## License

This project uses a dataset licensed under the **Open Government License - Canada**. Please review the [Open Government License](https://open.canada.ca/en/open-government-licence-canada) before using the dataset.

---

## Author

**Harmeet Matharoo**