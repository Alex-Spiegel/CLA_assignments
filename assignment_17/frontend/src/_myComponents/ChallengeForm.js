"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
});
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import { javascript } from "@codemirror/lang-javascript";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import LanguageMenu from "./LanguageMenu";
import FontSizeMenu from "./FontSizeMenu";
import { MdDelete } from "react-icons/md";

function ChallengeForm({ challengeData }) {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const language = useSelector((state) => state.language.selectedLanguage); // holt die language aus redux store

  // Falls challengeData existiert, Felder vorausfüllen
  // Falls challengeData existiert, Felder vorausfüllen
  const [formData, setFormData] = useState(
    challengeData
      ? {
          title: challengeData.title || "",
          category: challengeData.category || "",
          level: challengeData.level || "Easy",
          description: challengeData.description || "",
          functionName: challengeData.code?.function_name || "",
          code: challengeData.code?.code_text?.text || "",
          codeInputs: challengeData.code?.inputs ?? [
            {
              name: "n",
              type: challengeData.tests?.[0]?.inputs?.[0]?.type || "number",
            },
          ],
          tests: challengeData.tests
            ? challengeData.tests.map((test) => ({
                weight: test.weight,
                inputs:
                  test.inputs.length > 0
                    ? test.inputs.map((input) => ({
                        name: input.name || "n",
                        value: input.value ?? 0, // Default: Zahl 0 oder String ""
                      }))
                    : [{ name: "n", value: 0 }], // Falls `inputs` fehlt
                output: test.output,
              }))
            : [],
        }
      : {
          title: "",
          category: "",
          level: "Easy",
          description: "",
          functionName: "",
          code: "",
          codeInputs: [{ name: "n", type: "number" }],
          tests: [],
        }
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleMarkdownChange(value) {
    setFormData({ ...formData, description: value });
  }

  function handleCodeChange(value) {
    setFormData({ ...formData, code: value });
  }

  // Test hinzufügen
  function addTestCase() {
    setFormData({
      ...formData,
      tests: [
        ...formData.tests,
        { type: "number", value: "", name: "", output: "", weight: 1 },
      ],
    });
  }

  // Test entfernen
  function removeTestCase(index) {
    const updatedTests = formData.tests.filter((_, i) => i !== index);
    setFormData({ ...formData, tests: updatedTests });
  }

  // Testfelder Updaten
  function updateTestCase(index, inputIndex, field, value) {
    const updatedTests = [...formData.tests];

    if (field === "output") {
      // Falls das Feld "output" ist, direkt setzen
      updatedTests[index].output = value;
    } else {
      // Falls inputs leer sind, ein Default-Objekt setzen
      if (!updatedTests[index].inputs) {
        updatedTests[index].inputs = [];
      }

      if (!updatedTests[index].inputs[inputIndex]) {
        updatedTests[index].inputs[inputIndex] = { name: "", value: "" };
      }

      updatedTests[index].inputs[inputIndex][field] = value;
    }

    setFormData({ ...formData, tests: updatedTests });
  }

  // API-Call zu Next.js API
  async function handleSubmit(event) {
    event.preventDefault();

    // Default-Wert für Inputs setzen
    const formattedInputs =
      formData.codeInputs && formData.codeInputs.length > 0
        ? formData.codeInputs.map((input) => ({
            name: input.name || "n",
            type: input.type || "number", // Falls `type` fehlt
          }))
        : [{ name: "n", type: "number" }]; // Falls `inputs` komplett leer sind

    // Code-Objekt richtig formatieren
    const formattedCode = {
      function_name: formData.functionName,
      code_text: {
        language: language || "js",
        text: formData.code,
      },
      inputs: formattedInputs,
    };

    //Test-Objekt richtig formattieren
    const formattedTests = formData.tests.map((test) => ({
      weight: test.weight,
      inputs:
        test.inputs && test.inputs.length > 0
          ? test.inputs.map((input) => ({
              name: input.name || "n", // Falls name fehlt, Standard setzen
              value: input.value ?? 0, // Falls value fehlt, Standard setzen
            }))
          : [{ name: "n", value: 0 }], // Falls inputs leer sind, Standardwert setzen
      output: test.output,
    }));

    // API-Request-Daten mit korrektem Code/ Test-Feld
    const requestData = {
      title: formData.title,
      category: formData.category,
      level: formData.level,
      description: formData.description,
      code: formattedCode,
      tests: formattedTests,
    };

    try {
      const endpoint = challengeData
        ? `/api/challenges/edit/${challengeData._id}` // PATCH für Edit
        : "/api/challenges/new"; // POST für New

      const method = challengeData ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to save challenge");
      }

      alert(
        challengeData
          ? "Challenge updated successfully"
          : "Challenge created successfully"
      );

      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating challenge:", error.message);
      alert(error.message);
    }
  }

  return (
    <div className="mt-10 p-6 shadow-md rounded-md">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Linke Seite - Inputs & Markdown Editor */}
        <div>
          <h1 className="text-xl font-bold mb-4">Create a New Challenge</h1>
          <div>
            <Label htmlFor="title">Title*</Label>
            <Input
              id="title"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category*</Label>
            <Input
              id="category"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="level">Difficulty</Label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="flex flex-col gap-4">
            <Label>Description</Label>
            <SimpleMDE
              value={formData.description}
              onChange={handleMarkdownChange}
            />
          </div>
        </div>

        {/* Rechte Seite - Function Name & Code Editor */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end gap-2">
            <div className="w-3/4">
              <Label htmlFor="functionName">Function Name*</Label>
              <Input
                id="functionName"
                name="functionName"
                placeholder="Function Name"
                value={formData.functionName}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="bg-primary text-white px-4 py-2">
              {challengeData ? "Update" : "Create"}
            </Button>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <Label>Code*</Label>
              <div className="py-2 flex gap-2">
                <LanguageMenu />
                <FontSizeMenu />
              </div>
            </div>
            <CodeMirror
              value={formData.code}
              height="200px"
              placeholder="Enter your code here..."
              extensions={[javascript()]}
              onChange={handleCodeChange}
            />
          </div>

          {/* Test Cases */}
          <div>
            <div className="py-2 flex justify-between items-center">
              <Label>Tests*</Label>
              <Button
                type="button"
                className="bg-primary text-xl font-bold text-white p-4"
                onClick={addTestCase}
              >
                +
              </Button>
            </div>
          </div>

          {formData.tests.map((test, index) => (
            <div key={index} className="p-4 flex gap-2 border">
              <div className="flex items-center justify-center w-12">
                <Button
                  className="size-10 bg-red-400 text-white p-2"
                  type="button"
                  onClick={() => removeTestCase(index)}
                >
                  <MdDelete />
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label htmlFor={`type-${index}`}>Type</Label>
                  <select
                    id={`type-${index}`}
                    className="h-7 mb-5 pl-2"
                    value={test.type}
                    onChange={(e) =>
                      updateTestCase(index, "type", e.target.value)
                    }
                  >
                    <option value="number">number</option>
                    <option value="string">string</option>
                  </select>
                  <Label htmlFor={`value-${index}`}>Value</Label>
                  <Input
                    id={`value-${index}`}
                    className="h-7 pl-2"
                    type="text"
                    value={test.inputs?.[0]?.value || ""}
                    onChange={(e) =>
                      updateTestCase(index, 0, "value", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`name-${index}`}>Name</Label>
                  <Input
                    id={`name-${index}`}
                    className="h-7 pl-2"
                    type="text"
                    value={test.inputs?.[0]?.name || ""}
                    onChange={(e) =>
                      updateTestCase(index, 0, "name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`output-${index}`}>Output</Label>
                  <Input
                    id={`output-${index}`}
                    className="h-7 pl-2"
                    type="text"
                    value={test.output || ""}
                    onChange={(e) =>
                      updateTestCase(index, 0, "output", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`weight-${index}`}>Weight</Label>
                  <Input
                    id={`weight-${index}`}
                    className="h-7 pl-2"
                    type="number"
                    value={test.weight}
                    min="0"
                    max="1"
                    onChange={(e) =>
                      updateTestCase(index, "weight", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default ChallengeForm;
