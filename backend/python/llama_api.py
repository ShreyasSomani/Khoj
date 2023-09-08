import os
import replicate
import concurrent.futures

#Function to generate LLM response for the first prompt
def generate_llm_response(prompt):
    return replicate.run(
        'a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',
        input={
            "prompt": prompt,
            "temperature": 0.1,
            "top_p": 0.9,
            "max_length": 300,
            "repetition_penalty": 1
        }
    )

#Prompts
keyword = input()
pre_prompt = ""
prompt_input = f"Ingredients to purchase for preparing {keyword} without mentioning quantity within 200 characters in bullets?"
second_prompt = f"Generate relevant keywords related to {keyword} for quick commerce"
third_prompt = f"Generate nutritional value of the contents of {keyword}"

#Set the REPLICATE_API_TOKEN environment variable
os.environ["REPLICATE_API_TOKEN"] = "r8_341wDnvDtEIWt8IlkOTWHpXIK7O909i3HpoPS"

#Create a ThreadPoolExecutor with 3 threads
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
    #Execute all three LLM responses concurrently
    future1 = executor.submit(generate_llm_response, f"{pre_prompt} {prompt_input} Assistant: ")
    future2 = executor.submit(generate_llm_response, f"{pre_prompt} {second_prompt} Assistant: ")
    future3 = executor.submit(generate_llm_response, f"{pre_prompt} {third_prompt} Assistant: ")

    #Get the results from all three futures
    full_response = future1.result()
    second_response = future2.result()
    third_response = future3.result()

#Process and print the results
full_text = ""
for item in full_response:
    full_text += item

second_text = ""
for item in second_response:
    second_text += item

third_text = ""
for item in third_response:
    third_text += item

print("Full Response:")
print(full_text)
print("\nSecond Response:")
print(second_text)
print("\nThird Response:")  #Corrected variable name here
print(third_text)  #Corrected variable name here
