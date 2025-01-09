# **Assignment**

> Construct a Command-Line Interface (CLI) using the commander.js library. The objective of this CLI tool is to generate code boilerplate code.
> 
> The CLI should accept *"function name"*, *"programming language"* and *"list of function inputs"* as arguments to create a boilerplate code.

## 1. Implement a Commander.js command
The CLI usage would be as follows:
```bash
code-cli -n function_name -l javascript -i a,b
```
- -n to specify the function name
- -l to specify the programming language
- -i to specify the list of function inputs (separated by comma)

The CLI should accept two languages as input:
1. JavaScript
2. Python

## 2. Use the Inquirer module for a brief confirmation
Before generating the boilerplate, prompt the user for conﬁrmation
using the Inquirer library, with the message:

```bash
"Do you want to generate boilerplate code for the function ${placeholder.name} in the programming language ${placeholder.language}?"
```

## 3. Write a function that generates the boiler plate
**Boilerplate Example for JavaScript**

```bash
function functionName(a) {
    // Your code here
    return;
}
```

**Boilerplate Example for Python**
```
def functionName(a):
    # Your code here
    return
```

## 4. Save the generated code appropriately
After generating the boilerplate, it should be stored in a file with the same name as the function (~.js for JavaScript & ~.py for python)