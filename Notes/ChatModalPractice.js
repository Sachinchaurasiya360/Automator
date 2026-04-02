import { ChatGoogle } from "@langchain/google";
import dotenv from "dotenv";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import {z} from 'zod'
dotenv.config();


const chat = new ChatGoogle({
  model: "gemini-2.5-flash",
  apiKey: GOOGLE_API_KEY,
  reasoningEffort:"MEDIUM",
  
  safetySettings: [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_LOW_AND_ABOVE",
    },
    //We can bind tools and use it like the google search tools , whether tools and other tools 
  ],
});

const formatteResponse= z.object({
    Data:z.array(z.object({
        captalOf:z.string().describe("The capital of the city which user is refreing"),
        captialCity:z.string().describe("The actual capital city")

    })
       

    )
})

const structurellm= chat.withStructuredOutput(formatteResponse)
const aiAnswer = await structurellm.invoke([
  new SystemMessage(
    `You are a helpful ai assistent when ever some one ask a question to you , you always answer the question in a very fun way with the jokes`,
  ),
  new HumanMessage("What is the capital of india"),
]);
console.log(aiAnswer)

console.log(aiAnswer.content);
console.log(aiAnswer.response_metadata);
console.log(aiAnswer.usage_metadata);


//Way to bind the tools
const llm = new ChatGoogle("gemini-2.5-flash")
  .bindTools([
  {
    googleSearch: {
      timeRangeFilter: {
        startTime: "2025-01-01T00:00:00Z",
        endTime: "2025-12-31T23:59:59Z",
      },
    },
  },
]);

// urlContext: {}: The urlContext tool allows Gemini to fetch and use content from URLs to ground its responses.
// The codeExecution tool allows Gemini to generate and run Python code to solve complex problems. The model writes 
// the code, executes it, and returns the results with the generated code result and other things
// The googleMaps tool grounds responses with geospatial context from Google Maps. This is useful for place-related queries.
