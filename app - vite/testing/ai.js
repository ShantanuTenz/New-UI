import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCYCHZvLJ3UM6xiuE_K_yB7t9z86ZZJvkY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Question: Given a sorted array of integers and a target integer, find the starting and ending position of the given target value in the array. If the target is not found in the array, return [-1, -1]. Example 1: Input: nums = [5,7,7,8,8,10], target = 8 Output: [3,4] Example 2: Input: nums = [5,7,7,8,8,10], target = 6 Output: [-1,-1]";

const result = await model.generateContent(prompt);
console.log(result.response.text());