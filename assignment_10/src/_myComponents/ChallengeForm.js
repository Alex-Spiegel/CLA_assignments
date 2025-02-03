"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import LanguageMenu from "./LanguageMenu";
import FontSizeMenu from "./FontSizeMenu";
import { MdDelete } from "react-icons/md";

function ChallengeForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    level: "Easy",
    description: "",
    functionName: "",
    code: "",
  });

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

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted: ", formData);
  }

  return (
    // whole container
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
            {/* input für function name */}
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
            {/* Create Button */}
            <Button type="submit" className="bg-primary text-white px-4 py-2">
              Create
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
              extensions={[javascript()]}
              onChange={handleCodeChange}
            />
          </div>
          {/* test cases section */}
          <div>
            <div className="py-2 flex justify-between items-center">
              <Label htmlFor="tests">Tests*</Label>
              <Button
                type="submit"
                className="bg-primary text-xl font-bold
               text-white p-4"
              >
                +
              </Button>
            </div>
          </div>
          <div className="p-4 flex gap-2 border">
            {/* Flexbox für den Button */}
            <div className="flex items-center justify-center w-12">
              <Button
                className="size-10 bg-red-400 text-white p-2"
                type="button"
              >
                <MdDelete />
              </Button>
            </div>

            {/* Flexbox für die 4 Spalten */}

            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="type">Type</Label>
                <select className="h-7 mb-5 pl-2">
                  <option value="number">number</option>
                  <option value="string">string</option>
                </select>
                <Label htmlFor="value">Value</Label>
                <Input className="h-7 pl-2" type="number" value="10"></Input>
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="name">Name</Label>
                <Input className="h-7 pl-2" type="text" value="a"></Input>
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="output">Output</Label>
                <Input className="h-7 pl-2" type="number" value="10"></Input>
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  className="h-7 pl-2"
                  type="number"
                  value="0.8"
                  min="0"
                  max="1"
                ></Input>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChallengeForm;
