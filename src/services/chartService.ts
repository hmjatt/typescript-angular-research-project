import termkit from 'terminal-kit'; // Terminal-based chart rendering library
import pc from 'picocolors'; // For colorized output in the terminal
import { DetailedRecord } from '../models/DetailedRecord';

const term = termkit.terminal; // Terminal object for rendering graphics

// Array containing the names of the months
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Displays aggregated yearly data for a specific year as a bar chart.
 * Aggregates data by month and visualizes throughput and available capacity.
 * 
 * @param {number} year - The year for which data is to be displayed.
 * @param {DetailedRecord[]} records - Array of `DetailedRecord` objects containing throughput data.
 * 
 * @remarks
 * This function filters records by the specified year, aggregates data by month,
 * and renders a terminal-based bar chart showing throughput and available capacity.
 * 
 * @throws {Error} If no data is available for the specified year.
 * 
 * @see {@link https://github.com/cronvel/terminal-kit terminal-kit Documentation}
 * @see {@link https://github.com/alexeyraspopov/picocolors picocolors Documentation}
 * 
 * @example
 * ```ts
 * displayYearlyData(2023, records);
 * ```
 * 
 * @author
 * Harmeet Matharoo
 */
export const displayYearlyData = (year: number, records: DetailedRecord[]): void => {
    const yearData = records.filter(record => record.Year === year);

    if (yearData.length === 0) {
        console.error(pc.red(`No data found for the year ${year}.`));
        return;
    }

    const aggregatedMonthlyData = Array.from({ length: 12 }, (_, monthIndex) => {
        const monthlyRecords = yearData.filter(record => record.Month === monthIndex + 1);
        return {
            month: monthNames[monthIndex],
            totalThroughput: monthlyRecords.reduce((sum, record) => sum + (record.Throughput || 0), 0),
            totalCapacity: monthlyRecords.reduce((sum, record) => sum + (record.AvailableCapacity || 0), 0),
        };
    });

    const maxThroughput = Math.max(...aggregatedMonthlyData.map(data => data.totalThroughput), 1);
    const maxCapacity = Math.max(...aggregatedMonthlyData.map(data => data.totalCapacity), 1);
    const maxBarLength = Math.min(term.width - 20, 70);

    aggregatedMonthlyData.forEach(({ month, totalThroughput, totalCapacity }) => {
        const throughputBarLength = Math.round((totalThroughput / maxThroughput) * maxBarLength);
        const capacityBarLength = Math.round((totalCapacity / maxCapacity) * maxBarLength);

        term(`${month.padEnd(12)}: `);
        term.bgBlue(' '.repeat(throughputBarLength)).styleReset();
        term(` Throughput: ${totalThroughput.toFixed(2)}\n`);

        term(' '.repeat(14));
        term.bgYellow(' '.repeat(capacityBarLength)).styleReset();
        term(` Capacity: ${totalCapacity.toFixed(2)}\n`);
        term(pc.gray("--------------------\n"));
    });

    term.bold.underline("\nLegend:").styleReset();
    term("\n Blue = Throughput (1000 m³/d)");
    term("\n Yellow = Available Capacity (1000 m³/d)\n\n");
};

/**
 * Renders a horizontal bar chart for a given dataset.
 * The chart groups data either by individual records or by months.
 * 
 * @param {DetailedRecord[]} data - The dataset containing throughput and capacity records.
 * @param {string} title - The title of the chart to display.
 * @param {boolean} [groupByMonth=false] - Whether to group data by month or show individual records.
 * 
 * @remarks
 * This function provides a high-level interface for rendering horizontal bar charts.
 * It supports both monthly aggregation and individual record display.
 * 
 * @see {@link https://github.com/cronvel/terminal-kit terminal-kit Documentation}
 * 
 * @example
 * ```ts
 * displayHorizontalBarChart(records, "Yearly Throughput", true);
 * ```
 * 
 * @author
 * Harmeet Matharoo
 */
export const displayHorizontalBarChart = (
    data: DetailedRecord[],
    title: string,
    groupByMonth = false
): void => {
    term.clear();
    term.bold.underline(`${title} (1000 m³/d)\n\n`);

    const labels = groupByMonth
        ? [...new Set(data.map(record => `${monthNames[record.Month - 1]}`))]
        : data.map((_, index) => `Record ${index + 1}`);
    const throughputValues = groupByMonth
        ? Array.from({ length: 12 }, (_, month) =>
            data.filter(record => record.Month === month + 1)
                .reduce((sum, record) => sum + (record.Throughput || 0), 0))
        : data.map(record => record.Throughput || 0);
    const capacityValues = groupByMonth
        ? Array.from({ length: 12 }, (_, month) =>
            data.filter(record => record.Month === month + 1)
                .reduce((sum, record) => sum + (record.AvailableCapacity || 0), 0))
        : data.map(record => record.AvailableCapacity || 0);

    displayHorizontalBarChartFromData(labels, throughputValues, capacityValues, title);
};

/**
 * Provides an interactive charting menu for users.
 * Enables chart selection for specific months, years, or combined yearly data.
 * 
 * @param {DetailedRecord[]} records - Array of `DetailedRecord` objects.
 * @param {(prompt: string) => Promise<string>} getInput - Function to handle user input.
 * @param {() => void} showMenu - Function to display the main menu.
 * 
 * @remarks
 * This function displays a terminal-based menu and invokes the appropriate charting
 * functions based on the user's choices.
 * 
 * @throws {Error} If user inputs invalid options.
 * 
 * @see {@link https://github.com/cronvel/terminal-kit terminal-kit Documentation}
 * 
 * @example
 * ```ts
 * await interactiveChartMenu(records, getInput, showMenu);
 * ```
 * 
 * @author
 * Harmeet Matharoo
 */
export const interactiveChartMenu = async (
    records: DetailedRecord[],
    getInput: (prompt: string) => Promise<string>,
    showMenu: () => void
): Promise<void> => {
    while (true) {
        console.log(`
        --- Charting Menu ---
        1. Select a specific month in a year
        2. Show all months in a year
        3. Compare combined monthly data across years
        4. Return to main menu
        `);

        // Display author's name at the end of the menu
        console.log(pc.bold(pc.bgCyanBright("Harmeet Matharoo - CST8333 Project")));


        const chartChoice = await getInput("\nChoose a charting option: ");
        switch (chartChoice.trim()) {
            case '1': {
                const year = parseInt(await getInput("\nEnter the year: "), 10);
                const month = parseInt(await getInput("Enter the month (1-12): "), 10);
                const filtered = records.filter(record => record.Year === year && record.Month === month);

                if (filtered.length === 0) {
                    console.error(pc.red("No data found for the selected month and year."));
                } else {
                    displayHorizontalBarChart(filtered, `Data for ${monthNames[month - 1]} ${year}`);
                }
                break;
            }
            case '2': {
                const selectedYear = parseInt(await getInput("\nEnter the year: "), 10);
                if (isNaN(selectedYear)) {
                    console.error(pc.red("Invalid year entered."));
                    break;
                }
                displayYearlyData(selectedYear, records);
                break;
            }
            case '3': {
                const years = Array.from(new Set(records.map(record => record.Year)));
                const aggregatedData = years.map(year => {
                    const yearlyRecords = records.filter(record => record.Year === year);
                    const totalThroughput = yearlyRecords.reduce((sum, record) => sum + (record.Throughput || 0), 0);
                    const totalCapacity = yearlyRecords.reduce((sum, record) => sum + (record.AvailableCapacity || 0), 0);
                    return { year, totalThroughput, totalCapacity };
                });

                const labels = aggregatedData.map(data => `${data.year}`);
                const throughputValues = aggregatedData.map(data => data.totalThroughput);
                const capacityValues = aggregatedData.map(data => data.totalCapacity);

                displayHorizontalBarChartFromData(labels, throughputValues, capacityValues, "Combined Data by Year");
                break;
            }
            case '4':
                showMenu(); // Return to main menu
                return; // Exit the charting menu loop
            default:
                console.error(pc.red("Invalid charting option!"));
        }
    }
};

/**
 * Renders a horizontal bar chart using labels and data values.
 * 
 * @param {string[]} labels - Labels for each bar in the chart.
 * @param {number[]} throughputValues - Array of throughput values.
 * @param {number[]} capacityValues - Array of available capacity values.
 * @param {string} title - Title of the chart to display.
 * 
 * @remarks
 * Bars are scaled proportionally to the maximum value in the dataset.
 * Throughput bars are rendered in blue, and capacity bars in yellow.
 * 
 * @see {@link https://github.com/cronvel/terminal-kit terminal-kit Documentation}
 * 
 * @example
 * ```ts
 * displayHorizontalBarChartFromData(labels, throughputValues, capacityValues, "Yearly Throughput");
 * ```
 * 
 * @author
 * Harmeet Matharoo
 */
export const displayHorizontalBarChartFromData = (
    labels: string[],
    throughputValues: number[],
    capacityValues: number[],
    title: string
): void => {
    const maxValue = Math.max(...throughputValues, ...capacityValues, 1);
    const maxBarLength = Math.min(term.width - 40, 50);

    labels.forEach((label, index) => {
        const throughputBarLength = Math.round((throughputValues[index] / maxValue) * maxBarLength);
        const capacityBarLength = Math.round((capacityValues[index] / maxValue) * maxBarLength);

        term(`${label.padEnd(20)}: `);
        term.bgBlue(' '.repeat(throughputBarLength)).styleReset();
        term(` Throughput: ${throughputValues[index].toFixed(2)}\n`);

        term(' '.repeat(22));
        term.bgYellow(' '.repeat(capacityBarLength)).styleReset();
        term(` Capacity: ${capacityValues[index].toFixed(2)}\n`);

        term(pc.gray("\n--------------------\n"));
    });

    term.bold.underline("\nLegend:").styleReset();
    term("\n Blue = Throughput (1000 m³/d)");
    term("\n Yellow = Available Capacity (1000 m³/d)\n\n");
};
