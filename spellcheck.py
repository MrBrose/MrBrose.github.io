import os
if os.system("cspell --version") != 0:
	print("cspell is not installed. Please install it using npm.")
	input("Press any key to exit.")

os.system("cspell . --exclude \"**/*.{svg,css}\"")
input("Press any key to exit.")