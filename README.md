# CST8333 Programming Language Research Project

## Overview

This project is part of the **CST8333 Programming Language Research** course and aims to demonstrate various programming concepts using **TypeScript**. It focuses on reading and processing a CSV dataset (`keystone-throughput-and-capacity.csv`), parsing the data into record objects, and outputting them to the console. 

The program reads the dataset, creates `Record` objects for each entry, and displays the records with the author's name repeated every 10 records.

### Features

- **CSV Parsing:** Reads and processes a CSV dataset into `Record` objects.
- **Error Handling:** Includes exception handling for file reading issues.
- **JSDoc:** The code is fully documented using JSDoc comments.
- **Author Attribution:** Displays the author's name (`Harmeet Matharoo`) periodically while printing records for visibility.

---

## Project Structure

```plaintext
.
├── src
│   ├── models
│   │   └── Record.ts          # Contains the Record class definition
│   ├── services
│   │   └── datasetService.ts   # Contains the loadDataset function to read and parse the CSV
│   ├── keystone-throughput-and-capacity.csv # The dataset file (add this to the project)
│   └── main.ts                # Main entry point of the program
├── README.md                  # Project documentation
├── tsconfig.json              # TypeScript configuration file
├── package.json               # Node.js dependencies and scripts
└── package-lock.json          # Dependency lock file
```

---

## How to Run the Project

### Prerequisites

Make sure to have the following installed:

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

```bash
npx ts-node src/main.ts
```

This command will:

- Parse the `keystone-throughput-and-capacity.csv` file.
- Output each record to the console.
- Display the author's name (`Harmeet Matharoo - CST8333 Project`) every 10 records for visibility.

---

## Example Output

```plaintext
Harmeet Matharoo - CST8333 Project
Record {
  date: '2024-06-01',
  month: 6,
  year: 2024,
  company: 'TransCanada Keystone Pipeline GP Ltd.',
  pipeline: 'Keystone pipeline',
  keyPoint: 'International boundary at or near Haskett',
  latitude: 48.9989,
  longitude: -97.9577,
  directionOfFlow: 'south',
  tradeType: 'export',
  product: 'domestic heavy',
  throughput: 15.072396612903225,
  committedVolumes: 18.113609354838708,
  uncommittedVolumes: 0,
  nameplateCapacity: 0,
  availableCapacity: 0,
  reasonForVariance: 'NEB/REGULATORY DIRECTIVE'
}

--- Harmeet Matharoo - CST8333 Project ---

... (additional records)
```

---

## Documentation

To generate the JSDoc documentation:

1. Run the following command to generate HTML documentation from the JSDoc comments:

   ```bash
   npx jsdoc -c jsdoc.json
   ```

2. Open the generated `index.html` file in the browser to view the full documentation.

---

## License

This project uses a dataset licensed under the **Open Government License - Canada**. Please review the [Open Government License](https://open.canada.ca/en/open-government-licence-canada) before using the dataset.

---

## Author

**Harmeet Matharoo**
```a
