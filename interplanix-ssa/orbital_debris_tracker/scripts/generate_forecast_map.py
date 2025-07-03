import sys
import os

# Append src directory to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from main import main

if __name__ == "__main__":
    main()
