/*
    Secure Bank Ltd.
    Banking Utility Portal

    This JavaScript file demonstrates:
    1. Variables and scope
    2. Operators
    3. Decision-making statements
    4. Loops
    5. Functions
    6. User input
    7. Dynamic output
*/


// ======================================================
// 1. VARIABLES AND SCOPE
// ======================================================

// var - function scoped
var bankName = "Secure Bank Ltd.";

// let - block scoped and can be changed
let currentYear = 2026;

// const - block scoped and cannot be reassigned
const minimumCreditScore = 650;


// Function demonstrating scope
function demonstrateScope() {

    var branchName = "Main Branch";
    let branchCode = 101;
    const bankType = "Private Bank";

    console.log("Bank Name:", bankName);
    console.log("Current Year:", currentYear);
    console.log("Branch Name:", branchName);
    console.log("Branch Code:", branchCode);
    console.log("Bank Type:", bankType);
}


// ======================================================
// 2. LOAN ELIGIBILITY
// ======================================================

function checkLoanEligibility() {

    // Getting values from HTML input controls
    let income = Number(document.getElementById("loanIncome").value);
    let age = Number(document.getElementById("loanAge").value);
    let creditScore = Number(
        document.getElementById("creditScore").value
    );

    let result = document.getElementById("loanResult");

    // Checking whether input values are valid
    if (income <= 0 || age <= 0 || creditScore <= 0) {

        result.innerHTML = "Please enter valid values.";
        return;
    }


    // Logical AND operator
    if (age >= 18 && age <= 60) {

        // Nested if statement
        if (income >= 25000) {

            if (creditScore >= minimumCreditScore) {

                result.innerHTML =
                    "Congratulations! You are eligible for the loan.";

            } else {

                result.innerHTML =
                    "Loan rejected because your credit score is below " +
                    minimumCreditScore + ".";

            }

        } else {

            result.innerHTML =
                "Loan rejected because minimum monthly income is ₹25,000.";

        }

    } else {

        result.innerHTML =
            "Loan rejected because age must be between 18 and 60 years.";
    }
}


// ======================================================
// 3. EMI CALCULATOR
// ======================================================

function calculateEMI() {

    let principal = Number(
        document.getElementById("loanAmount").value
    );

    let annualRate = Number(
        document.getElementById("interestRate").value
    );

    let years = Number(
        document.getElementById("loanTenure").value
    );

    let result = document.getElementById("emiResult");


    // Relational operators
    if (principal <= 0 || annualRate < 0 || years <= 0) {

        result.innerHTML = "Please enter valid loan details.";
        return;
    }


    // Convert annual interest rate to monthly rate
    let monthlyRate = annualRate / 12 / 100;

    // Convert years to months
    let months = years * 12;

    let emi;


    // Conditional statement
    if (monthlyRate === 0) {

        // If interest rate is zero
        emi = principal / months;

    } else {

        /*
            EMI Formula:

            EMI = P × R × (1 + R)^N
                  ----------------
                    (1 + R)^N - 1
        */

        emi =
            principal *
            monthlyRate *
            Math.pow(1 + monthlyRate, months) /
            (Math.pow(1 + monthlyRate, months) - 1);
    }


    // Arithmetic operators
    let totalPayment = emi * months;
    let totalInterest = totalPayment - principal;


    result.innerHTML =
        "Monthly EMI: ₹" + emi.toFixed(2) +
        "<br>Total Payment: ₹" + totalPayment.toFixed(2) +
        "<br>Total Interest: ₹" + totalInterest.toFixed(2);
}


// ======================================================
// 4. SIMPLE INTEREST CALCULATOR
// ======================================================

function calculateInterest() {

    let principal = Number(
        document.getElementById("principal").value
    );

    let rate = Number(
        document.getElementById("simpleRate").value
    );

    let time = Number(
        document.getElementById("time").value
    );

    let result = document.getElementById("interestResult");


    if (principal <= 0 || rate < 0 || time <= 0) {

        result.innerHTML = "Please enter valid values.";
        return;
    }


    // Simple Interest formula
    let interest = (principal * rate * time) / 100;

    let totalAmount = principal + interest;


    result.innerHTML =
        "Simple Interest: ₹" + interest.toFixed(2) +
        "<br>Total Amount: ₹" + totalAmount.toFixed(2);
}


// ======================================================
// 5. ACCOUNT TRANSACTION
// ======================================================

function processTransaction() {

    let balance = Number(
        document.getElementById("accountBalance").value
    );

    let transactionAmount = Number(
        document.getElementById("transaction").value
    );

    let transactionType =
        document.getElementById("transactionType").value;

    let result =
        document.getElementById("accountResult");


    if (balance < 0 || transactionAmount <= 0) {

        result.innerHTML =
            "Please enter valid account details.";

        return;
    }


    /*
        SWITCH STATEMENT

        The switch statement checks the transaction type.
    */

    switch (transactionType) {

        case "deposit":

            // Assignment operator
            balance += transactionAmount;

            result.innerHTML =
                "Amount Deposited: ₹" +
                transactionAmount.toFixed(2) +
                "<br>New Balance: ₹" +
                balance.toFixed(2);

            break;


        case "withdraw":

            if (transactionAmount <= balance) {

                balance -= transactionAmount;

                result.innerHTML =
                    "Amount Withdrawn: ₹" +
                    transactionAmount.toFixed(2) +
                    "<br>New Balance: ₹" +
                    balance.toFixed(2);

            } else {

                result.innerHTML =
                    "Insufficient balance.";

            }

            break;


        default:

            result.innerHTML =
                "Invalid transaction type.";
    }
}


// ======================================================
// 6. USER-DEFINED FUNCTION
// ======================================================

/*
    This reusable function calculates simple interest.

    Parameters:
        principalAmount
        rate
        years

    Return:
        calculated interest
*/

function calculateSimpleInterest(
    principalAmount,
    rate,
    years
) {

    let interest =
        (principalAmount * rate * years) / 100;

    return interest;
}


// ======================================================
// 7. FOR LOOP - INTEREST TABLE
// ======================================================

function generateInterestTable() {

    let principal = Number(
        document.getElementById("tablePrincipal").value
    );

    let rate = Number(
        document.getElementById("tableRate").value
    );

    let tableOutput =
        document.getElementById("interestTable");


    if (principal <= 0 || rate < 0) {

        tableOutput.innerHTML =
            "Please enter valid values.";

        return;
    }


    /*
        HTML table header
    */

    let table = `
        <table>
            <tr>
                <th>Year</th>
                <th>Interest (₹)</th>
                <th>Total Amount (₹)</th>
            </tr>
    `;


    /*
        FOR LOOP

        Calculates interest from
        1 year to 5 years.
    */

    for (let year = 1; year <= 5; year++) {

        let interest =
            calculateSimpleInterest(
                principal,
                rate,
                year
            );

        let total =
            principal + interest;


        table += `
            <tr>
                <td>${year}</td>
                <td>₹${interest.toFixed(2)}</td>
                <td>₹${total.toFixed(2)}</td>
            </tr>
        `;
    }


    table += "</table>";

    tableOutput.innerHTML = table;
}


// ======================================================
// 8. WHILE LOOP - ACCOUNT SUMMARY
// ======================================================

function generateAccountSummary() {

    let startingBalance = Number(
        document.getElementById("summaryBalance").value
    );

    let months = Number(
        document.getElementById("summaryMonths").value
    );

    let output =
        document.getElementById("accountSummary");


    if (startingBalance < 0 || months <= 0) {

        output.innerHTML =
            "Please enter valid values.";

        return;
    }


    let balance = startingBalance;
    let month = 1;

    let summary = `
        <table>
            <tr>
                <th>Month</th>
                <th>Balance (₹)</th>
            </tr>
    `;


    /*
        WHILE LOOP

        Displays the balance for
        each month.
    */

    while (month <= months) {

        summary += `
            <tr>
                <td>${month}</td>
                <td>₹${balance.toFixed(2)}</td>
            </tr>
        `;

        month++;
    }


    summary += "</table>";

    output.innerHTML = summary;
}


// ======================================================
// 9. DO-WHILE LOOP
// ======================================================

function demonstrateDoWhile() {

    let count = 1;

    do {

        console.log("Banking operation number:", count);

        count++;

    } while (count <= 5);
}


// Execute demonstration functions
demonstrateScope();
demonstrateDoWhile();