import { db } from "../db/firebase.js";
import { collection, addDoc } from "firebase/firestore";

const questions = [
  {
    question: "Which operator is used for exponentiation?",
    options: ["^", "**", "%", "//"],
    answer: "**",
  },
  {
    question: "What is the output of print(10//3)?",
    options: ["3", "3.33", "4", "1"],
    answer: "3",
  },
  {
    question: "Which of these is a mutable data type?",
    options: ["tuple", "string", "list", "int"],
    answer: "list",
  },
  {
    question: "How do you create a comment in Python?",
    options: ["// comment", "# comment", "/* comment */", "<!-- comment -->"],
    answer: "# comment",
  },
  {
    question: "What does len([1,2,3,4]) return?",
    options: ["3", "4", "5", "Error"],
    answer: "4",
  },
  {
    question: "Which keyword is used for conditional branching?",
    options: ["if", "for", "while", "switch"],
    answer: "if",
  },
  {
    question: "What is the output of print(bool(0))?",
    options: ["True", "False", "0", "1"],
    answer: "False",
  },
  {
    question: "Which method converts a string to lowercase?",
    options: ["lower()", "uppercase()", "toLower()", "down()"],
    answer: "lower()",
  },
  {
    question: "What is the output of print(5%2)?",
    options: ["2", "1", "0", "2.5"],
    answer: "1",
  },
  {
    question: "How do you start a while loop?",
    options: [
      "while condition:",
      "for condition:",
      "loop condition:",
      "while(condition)",
    ],
    answer: "while condition:",
  },
  {
    question: "Which of these is used to handle exceptions?",
    options: ["try-except", "catch", "handle", "throw"],
    answer: "try-except",
  },
  {
    question: "How do you create a Python dictionary?",
    options: [
      "{key1:value1, key2:value2}",
      "[key1:value1]",
      "(key1:value1)",
      "{key1,value1}",
    ],
    answer: "{key1:value1, key2:value2}",
  },
  {
    question: "Which function is used to get input from user?",
    options: ["input()", "read()", "scanf()", "get()"],
    answer: "input()",
  },
  {
    question: "What is the output of print(type([]))?",
    options: ["list", "tuple", "dict", "set"],
    answer: "list",
  },
  {
    question: "Which keyword is used to exit a loop?",
    options: ["break", "stop", "exit", "return"],
    answer: "break",
  },
  {
    question: "Which of these is an immutable type?",
    options: ["list", "dict", "tuple", "set"],
    answer: "tuple",
  },
  {
    question: "What is the output of print('Python'[::-1])?",
    options: ["nohtyP", "Python", "P", "Error"],
    answer: "nohtyP",
  },
  {
    question: "Which keyword is used to define a class?",
    options: ["function", "class", "object", "def"],
    answer: "class",
  },
  {
    question: "What is the output of print(2==2)?",
    options: ["True", "False", "2", "Error"],
    answer: "True",
  },
  {
    question: "Which operator checks identity of objects?",
    options: ["is", "==", "=", "!="],
    answer: "is",
  },
  {
    question: "Which method adds items from another list to a list?",
    options: ["append()", "extend()", "insert()", "add()"],
    answer: "extend()",
  },
  {
    question: "What is the output of print(list(range(3)))?",
    options: ["[0,1,2]", "[1,2,3]", "[0,1,2,3]", "[3]"],
    answer: "[0,1,2]",
  },
  {
    question: "Which keyword is used to define an anonymous function?",
    options: ["lambda", "def", "func", "anonymous"],
    answer: "lambda",
  },
  {
    question: "How do you check the data type of a variable?",
    options: ["type()", "datatype()", "check()", "varType()"],
    answer: "type()",
  },
  {
    question: "Which method removes the last item of a list?",
    options: ["pop()", "remove()", "delete()", "del()"],
    answer: "pop()",
  },
  {
    question: "What is the output of print(3>2 and 2>1)?",
    options: ["True", "False", "1", "0"],
    answer: "True",
  },
];

const addQuestions = async () => {
  for (let q of questions) {
    await addDoc(collection(db, "quizzes"), q);
    console.log(`Added: ${q.question}`);
  }
};

addQuestions();
