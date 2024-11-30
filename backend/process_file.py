import sys
import pandas as pd

def process_file(file_path):
    # Add your Python processing code here.
    
    # First script snippet - process or modify the data (you can include your code logic here)
    df = pd.read_csv(file_path)
    print(f"Dataframe: \n{df.head()}")
    
    # Second script snippet - perform actions based on your previous code (such as file writing, etc.)
    df.to_csv('processed_output.csv', index=False)
    print("File processed successfully and saved as 'processed_output.csv'")

if __name__ == "__main__":
    file_path = sys.argv[1]  # Get the file path from the command-line argument
    process_file(file_path)
