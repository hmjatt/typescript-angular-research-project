# CST8333 Programming Language Research Project

## Overview

This project is part of the **CST8333 Programming Language Research** course, showcasing the application of **TypeScript** and other programming concepts. It focuses on processing a CSV dataset (`keystone-throughput-and-capacity.csv`), converting each entry into a `Record` object, and outputting the parsed records to the console.

The program handles file input, error handling, and dataset parsing, while showcasing structured code and documentation practices with JSDoc comments. The author's name, **Harmeet Matharoo**, is displayed periodically during the record output to ensure proper attribution.

### Features

- **CSV Parsing**: Reads and processes a CSV dataset into `Record` objects based on the dataset's columns.
- **File I/O**: Uses Node.js's File System (FS) API to handle CSV input.
- **Error Handling**: Implements exception handling to manage file reading issues.
- **Author Attribution**: Displays the author's name every 10 records.
- **JSDoc**: Fully documented code using JSDoc comments for clarity.
- **Color-coded Terminal Output**: Uses the **Chalk** library to color-code column names and values for better readability in the terminal.

---

## Project Structure

```plaintext
.
├── src
│   ├── models
│   │   └── Record.ts                                    # Contains the Record class definition
│   ├── services         
│   │   └── datasetService.ts                            # Contains the loadDataset function for reading and parsing CSV
│   ├── keystone-throughput-and-capacity.csv             # The dataset file
│   ├── Dataset Source and License - Fall 2024.docx      # Attribution and License for the dataset
│   └── app.ts                                           # Main entry point of the program
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

To run the program and output the records from the dataset:

1. **Start the program**:

   Use the following command to run the program with TypeScript using `ts-node`:

   ```bash
   npm start
   ```

   This command will:
   - Read and parse the `keystone-throughput-and-capacity.csv` file.
   - Convert each row into a `Record` object.
   - Output the records to the console, with the author's name (`Harmeet Matharoo - CST8333 Project`) appearing every 10 records.

2. **Build the program**:

   To compile the TypeScript files into JavaScript, use:

   ```bash
   npm run build
   ```

   This command will transpile the TypeScript code into JavaScript and output the compiled files in the `dist/` folder (or as configured in the `tsconfig.json`).

   Once the project is built, run the compiled JavaScript files with:

   ```bash
   node dist/app.js
   ```

---

## Example Output

```plaintext
Harmeet Matharoo - CST8333 Project
Record 1:
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

--- Harmeet Matharoo - CST8333 Project ---
```

---

## Documentation

To generate the JSDoc documentation:

1. Run the following command to generate HTML documentation from the JSDoc comments:

   ```bash
   npx jsdoc -c jsdoc.json
   ```

2. Open the generated `index.html` file in the browser to view the complete documentation.

---

## License

This project uses a dataset licensed under the **Open Government License - Canada**. Please review the [Open Government License](https://open.canada.ca/en/open-government-licence-canada) before using the dataset.

---

## Author

**Harmeet Matharoo**
