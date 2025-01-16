import sys
import os

# Print sys.path to verify if the project root is included
print(sys.path)

# Add the parent directory of 'app' to sys.path (if not already done)
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), "E:\apipython"))
)
