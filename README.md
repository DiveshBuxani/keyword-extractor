# Keyword-Extractor
## Purpose
This is a keyword extractor that takes in a piece of text and outputs the most important keywords based on machine learning models

## Tech Stack
After trying various tech stacks and packages, I settled on using a React frontend with axios and a Python Backend with flask, flask-cors, keybert and sentence-transformers  

## Setup & Use
To use the keyword extractor, you'll first have to download it and you can do by cloning the repo: `git clone https://github.com/DiveshBuxani/keyword-extractor.git`  
After that, open 2 terminal windows. One to navigate to the frontend and the other to the backend.  

In the terminal for the backend, I recommend you to create a virtual environment and use packages there. Otherwise, you can also use your global packages. 
To create a virtual environment, type `python -m venv <environment name>` on windows or `python3 -m venv <environment name>` on mac/linux.
Then, activate it using `env\Scripts\activate` on windows or `source env/bin/activate` on mac/linux.
Afterwards you can install the required packages using the requirements.txt file: `pip install -r requirements.txt`  
After all the packages are installed, simply type `python app.py` to run the backend.

In the terminal for the frontend, simply type `npm install` (assuming you have node.js and npm installed)  
Afterwards, type `npm run dev` to run the frontend.  

At this point, you should have react app running on your localhost.  
Now, simply type in the text that you want to extract keywords from!



