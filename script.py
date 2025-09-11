# Let's create the final file structure for deployment
import os

# Create the main directory structure
directories = [
    'assets/css',
    'assets/js', 
    'assets/images'
]

for directory in directories:
    os.makedirs(directory, exist_ok=True)
    
print("Directory structure created:")
for directory in directories:
    print(f"  {directory}/")