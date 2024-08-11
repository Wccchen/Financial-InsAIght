
# IT project

## Overview

This project is designed for Finance Sentiment Analysis by LLM. It utilizes several Python libraries and frameworks, including Django and Hugging Face's  `transformers`  library.


## Installation

### Prerequisites

-   Python 3.8 or above
-   `pip`  (Python package installer)

### Steps

1.  **Clone the repository**
    
    bash
    
    Copy code
    
    `git clone https://stgit.dcs.gla.ac.uk/msc-project-for-information-technology/2023/it-project-2840692l/it-projects.git `
    
2.  **Create a virtual environment**
    
    It's recommended to use a virtual environment to manage dependencies. If you haven't already installed  `virtualenv`, you can install it with:
    
    bash
    
    Copy code
    
    `pip install virtualenv` 
    
    Then, create and activate a virtual environment:
    
    bash
    
    Copy code
    
    ``virtualenv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate` `` 
    
3.  **Install dependencies**
    
    Install the required Python packages by running:
    
    bash
    
    Copy code
    
    `pip install -r requirements.txt` 
    
4.  **Set up the database**
    
    If your project requires a database, you may need to apply migrations:
    
    bash
    
    Copy code
    
    `python manage.py migrate` 
    
5.  **Run the project**
    
    Start the development server:
    
    bash
    
    Copy code
    
    `python manage.py runserver` 
    
    Your project should now be running on  `http://127.0.0.1:8000/`  (or another port if specified).
    

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature-branch`).
6.  Open a pull request.

## License

This project is licensed under the MIT License - see the  LICENSE  file for details.


