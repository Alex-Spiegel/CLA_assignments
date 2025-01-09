// importing Stuff
import { program } from "commander";
import inquirer from 'inquirer';
import { writeFileSync } from "fs";

// ## 1. Implement a Commander.js command
program
    .name("Boilerplate maker for JavaScript and Python")
    .description("CLI that generates boilerplate code for JS or Py")
    .version("1.0.0")

    .option("-n --name <string>", "Specify the name of your function")
    .option("-l --lang <string>", "Specify your prgamming language (enter either 'javascript' or 'python')")
    .option("-i, --inputs <items>", "List of items, separated by comma");

program.parse(process.argv)

// 1.1 Verarbeiten der übergebenen Variablen
    // save user input in options (it's an object!!!!)
    const options = program.opts();

// 1.2 Handle error: missing  name
if (!options.name) {
    console.error(`
        Please enter a function name (-n).
        Or type '--help' for more information.`);
    process.exit(1);
}

// 1.3 Handle error: wrong lang input
if (options.lang !== "javascript" && options.lang !== "python") {
    console.error(`
        Please select your programming language correctly.
        Either type 'javascript' or 'python'.
        Or type '--help' for more information.`);
    process.exit(1);
}

// 1.4 handle PARAMETERS input
let parameters: string[];

if (options.inputs) {
    parameters = options.inputs.split(",");// splits parameters and makes them into an array
} else {
    parameters = [];
}

// 1.5 save function name
const functionName = options.name;

// ## 2. Use the Inquirer module for a brief confirmation
inquirer
    // answer must be passed as an object in an array
    .prompt([
        {
        type: "confirm",
        name: "confirm",
        message: `Do you want to generate boilerplate code for the function ${options.name} in the programming language ${options.lang}?`,
        default: true
        }
    ])

    .then((answers) => {
        if (answers.confirm) {
            // Wenn user "Y" eingibt.
            console.log("Generating boilerplate!");

            // ## 3. Write a function that generates the boiler plate based on selected language
            let boilerplate: string = ""; // erstmal leer vordefinieren
            
            if (options.lang === "javascript") {
                // wenn lang input "javascript" ist, beschreibe boilerplate so!
                boilerplate = `function ${functionName}(${parameters.join(", ")}) {
    // Your code here
    return;
};`;

                // ## 4. Save the generated code appropriately
                const path: string = `${options.name}.js`
                writeFileSync(path, boilerplate);

                console.log(`Boilerplate for '${functionName}' has been saved to '${options.name}.js'`)

            } else if (options.lang === "python") {
                // wenn lang input "python" ist, beschreibe boilerplate so!
                boilerplate = `def ${functionName}(${parameters.join(", ")}):
    # Your code here
    return;`;

                const path: string = `${options.name}.py`
                writeFileSync(path, boilerplate);

                console.log(`Boilerplate for '${functionName}' has been saved to '${options.name}.py'`)

            }

        // End when users say "N"
        } else {
            console.log("Boilerplate generation canceled.");
            process.exit(0);
        }
    })

    .catch((error) => {
        console.error("Error during confirmation:", error);
        process.exit(1);
    });
