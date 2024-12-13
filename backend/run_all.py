import os
import sys
import subprocess

# Define the folder where your Python files are located
folder_path = os.path.dirname(os.path.abspath(__file__))  # This will get the current directory

# Get all Python files in the folder
python_files = [f for f in os.listdir(folder_path) if f.endswith('.py') and f != 'run_all.py']

# Loop through each Python file and run it
for file in python_files:
    file_path = os.path.join(folder_path, file)
    print(f"Running {file}...")
    
    # Use subprocess to run each Python file
    subprocess.run([sys.executable, file_path])
