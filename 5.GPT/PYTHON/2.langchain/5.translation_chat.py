from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv()

template = "다음 문장을 한국어로 번역해줘:\n\n{sentence}"
prompt = ChatPromptTemplate.from_messages(
  [
    SystemMessagePromptTemplate.from_template("You are a expert translator."),
    HumanMessagePromptTemplate.from_template(template)
  ]
)


llm = ChatOpenAI(
  model='gpt-4o-mini',
  temperature=0.3, # 번역할 거나 최대한 정확하게 창의력을 최소화해서
  max_tokens=1024, # 글이 잘리면 최대 토큰수 증가
)

chain = prompt | llm | RunnableLambda(lambda x : {'translated': x.content.strip()})

result = chain.invoke({'sentence': 
                      """
🌸 Cotton Candy Cat & the Strawberry Post Office 🌸

In Strawberry Village, there’s a tiny, cozy post office.
Its roof smells like sweet strawberry jam, and inside lives the fluffiest worker in the world—
a cotton candy cat named Momo.

Every morning, Momo yawns under her soft little blanket.
“Nyaa~ I wonder how many letters will come today.”

One morning, Momo found a sparkly letter in the mailbox.
On the envelope, it said:

🐭 To: Hamzzi in Cheese Village
From: A Secret Friend in Strawberry Village

Momo tilted her head.
“A secret friend? Hmm… I’m super curious… but first, I’d better deliver it!”

With her fluffy tail swaying like a ribbon, Momo set off on her little journey.
Flowers waved at her as she passed, and a squirrel with a tiny acorn hat shouted, “Hi, Momo~!”

When she arrived in Cheese Village, Hamzzi was napping on a big cheese rock.
Momo tiptoed close and gently placed the letter by his paw.
Then she hid behind a buttercup bush and peeked.

Hamzzi opened the letter and his round cheeks turned all pink.
“Wow… I had a secret friend? Thank you, Momo!”

That night, tucked under a strawberry leaf blanket, Momo smiled.

“Letters warm your heart. Even sweeter than strawberry jam.”
                      """})

print('한글 번역본: ', result['translated'])