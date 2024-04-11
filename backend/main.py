from fastapi import FastAPI
from langchain_community.llms import Ollama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from fastapi.middleware.cors import CORSMiddleware
import llm_module
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Input(BaseModel):
    input: str

# print(llm_module.chain.invoke({"input": "tell me a short, funny story"}))

@app.post('/send-message')
def invoke(input: Input):
    print('got request from client:', input)
    return llm_module.chain.invoke({"input": input})