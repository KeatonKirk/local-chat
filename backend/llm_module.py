from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage, AIMessage
from langchain.memory import ChatMessageHistory

# https://python.langchain.com/docs/use_cases/chatbots/quickstart/

chat = ChatOllama(model="llama2:13b-chat", temperature=0.1)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant, and you specialize in writing code. You are methodical and careful and always take time to think through complex questions."),
    ("user", "{input}")
])

output_parser = StrOutputParser()

chain = prompt | chat | output_parser
