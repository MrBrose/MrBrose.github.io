import sys
import os
import pathnav
import colorama

def writeCss(path, font_family, url):
    with open(path, "w") as f:
        f.write(
        f"""@font-face {{
            font-family: {font_family};
            src: url('{url}');
            font-weight: bold;
            font-style: normal;
        }}""")

if __name__ == "__main__":
    fontDirPath = "C:\\"
    fontsDir = pathnav.path(fontDirPath)
    for dir in fontsDir.child_dirs:
        print(f"\n{colorama.Fore.GREEN} Into dir \"{dir}\"")
        fontsDir = pathnav.path(fontDirPath)
        dirObj = fontsDir.into(dir)
        for file in dirObj.child_files:
            fileObj = fontsDir.get_file(file)
            if fileObj.file_type == "ttf" or fileObj.file_type == "otf":
                print(f"    {colorama.Fore.GREEN} Into file \"{file}\"")
                cssFileName = fileObj.file_name.replace("."+fileObj.file_type, "")
                cssFilePath = fileObj.resolved_path.replace(f'.{fileObj.file_type}', '')+".css"
                cssFileUrl = "/"+fileObj.resolved_path.replace("C:\\Users\\Ambrose\\website\\", "").replace('\\', '/')
                writeCss(cssFilePath, cssFileName, cssFileUrl)
                print(f"        {colorama.Fore.GREEN} Created \"{cssFileName}\"\n")
    exit()
    userPath = f"{userPathnav.resolved_path.replace(f'.{userPathnav.file_type}', '')}"
    with open(userPath+".css", "w") as f:
        url = "/"+userPathnav.resolved_path.replace("C:\\Users\\Ambrose\\website\\", "").replace('\\', '/')
        print(url)
        f.write(
f"""@font-face {{
    font-family: {userPathnav.file_name.replace(f'.{userPathnav.file_type}', '')};
    src: url('{url}');
    font-weight: bold;
    font-style: normal;
}}""")
