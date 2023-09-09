from flask import Flask, request, jsonify
import os
import replicate
import concurrent.futures
import re
app = Flask(__name__)

# Function to generate LLM response for the first prompt
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

@app.route('/hello')
def hello():
    return "hello"

@app.route('/generate_llama_responses')
def generate_responses():
    try:
        # Get the keyword from the request JSON data
        #keyword = request.json['keyword']
        keyword = request.args.get('keyword')

        # Prompts
        # pre_prompt = ""
        prompt_input = f"Ingredients to purchase for preparing {keyword}  without mentioning quantity ?"
        #second_prompt = f"Generate relevant keywords related to {keyword}  for quick commerce"
        

        # Set the REPLICATE_API_TOKEN environment variable
        os.environ["REPLICATE_API_TOKEN"] = "r8_e9a2Rzgk3JQu385zWT0TMhb8Ns5cthl3QeLmf"

        # Create a ThreadPoolExecutor with 3 threads
        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
            # Execute all three LLM responses concurrently
            future1 = executor.submit(generate_llm_response, f" {prompt_input}")
            #future2 = executor.submit(generate_llm_response, f" {second_prompt}")
         

            # Get the results from all three futures
            full_response = future1.result()
            #second_response = future2.result()
            # third_response = future3.result()
        ingredient_pattern = r'\* (.*?)(?:\n|\*)'
        #keyword_pattern = r'\d+\.\s(.*?)\n'

        full_text = "".join(full_response)
        
        ingredients_matches = re.findall(ingredient_pattern, full_text, re.IGNORECASE)
        
        # Process and combine the results
        #second_text = "".join(second_response)
        #keyword_matches = re.findall(keyword_pattern, second_text)

        #third_text = "".join(third_response)
        ingredients_list = [ingredient.strip().lower() for ingredient in ingredients_matches]
        # Create a response dictionary
        
        response_data = {
            "name": keyword,
            "ingredients": ingredients_list,
            #"Keywords": keyword_matches,
            #"third_response": third_text
        }


        return jsonify(response_data)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)



