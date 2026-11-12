<template>
  <main component="text-block-instructions">
    <h2>A more in-depth tutorial</h2>
    <p><b>Made by </b>@<b>cRxPtiCz and </b>@<b>Magminer</b></p>
    <br/>
    <br/>
    <p><b><u>Text:</u></b></p>
    <p>Font: MC Ten lowercase regular</p>
    <p>Size: 180</p>
    <p>Make sure to color the text before making it 3d</p>
    <p>Center Text</p>
    <p>3d fx -> 3D and Materials -> 3D (Classic) -> Extrude and Bevel (Classic)</p>
    <p>Angle: 34</p>
    <p>Perspective: 60</p>
    <p>Extrude Depth: 80</p>
    <p>If faces are missing, set the middle angle to 0.001 and press "OK"</p>
    <p>Object -> Expand Appearance</p>
    <br/>
    <p><b><u>Stroke:</u></b></p>
    <p>Select text</p>
    <p>Copy text and paste in place (Ctrl C + Ctrl Shift V)</p>
    <p>Window -> Pathfinder -> Compound Shape; 1st button on top with 2 white squares</p>
    <p>Color (Darker than text)</p>
    <p>Object -> Path -> Offset Path -> 10px or whatever looks good</p>
    <p>Select all and Make Compound Shape</p>
    <p>Put stroke layer on bottom</p>
    <br/>
    <p><b><u>Too many faces:</u></b></p>
    <p>Select all inner text paths and delete them.</p>
    <br/>
    <p><b><u>Bevel:</u></b></p>
    <p>Select all faces you want to edit</p>
    <p>Make compound shape (Window -> Pathfinder -> Compound shape; 1st button on top with 2 white squares.)</p>
    <p>Copy faces and Paste in place (Ctrl + Shift + V)</p>
    <p>3D fx -> 3D and Materials -> 3D (Classic) -> Classic Extrude and Bevel</p>
    <p>Reset everything (Angles & Perspective) to 0 and add a Classic bevel</p>
    <p>Bevel height should be 4 or 5 if you're using 180 text size.</p>
    <p>Object -> Expand Appearance</p>
    <p>Select inner faces and delete them</p>
    <p>Change color of bevel by selecting them all individually. (Top + bottom = lighter, Sides = darker)</p>
    <br/>
    <p><b><u>Shine:</u></b></p>
    <p>Make a WHITE rectangle and resize to however you want</p>
    <p>Select the rectangles and faces of the letters</p>
    <p>Click shape builder tool</p>
    <p>Hold alt and click on the parts outside of the face/letter</p>
    <p>For overlay: Select the rectangles and go to Window -> Transparency</p>
    <p>Where it says "Normal", click the dropdown menu and select "Overlay"</p>
    <p>Rectangle Opacity: 100</p>
    <p>Gradient Opacity: 100 to 0 (Gradient fades from white to the bottom color of the text, e.g. white -> red)</p>
    <br/>
    <p><b><u>Grid/Texture & Coloring:</u></b></p>
    <p>Make a grid using the rectangle grid tool</p>
    <p>Set height of grid to 9</p>
    <p>Add up the width of all letters & spaces in between letters using the cheat sheet</p>
    <p>Set width of grid to the sum of the letters + spaces, then minus 1. (ex: 37-1=36)</p>
    <p>Press E to resize grid and match corners</p>
    <p>Press K to show the live paint bucket tool</p>
    <p>Draw on your grid using the paint bucket with your desired color.</p>
    <br/>
    <p><b><u>Smaller Grid:</u></b></p>
    <p>Follow directions above</p>
    <p>Height = 59 (10x6-1)</p>
    <p>Width = Your original number (ex: 44) times 6 (ex: 44x6 = 264), then minus 1. (263)</p>
    <br/>
    <p><b><u>Bottom rectangle & small text:</u></b></p>
    <p>Make a rectangle and color it</p>
    <p>Add a black stroke around the rectangle using the stroke tutorial above</p>
    <p>Object -> Expand Appearance</p>
    <p>Select bottom face of rectangle and make it gradient to black</p>
    <p>OPTIONAL: Select front face and make bevel using the bevel tutorial above</p>
    <p>Make text with MC Five Lowercase Bold font</p>
    <p>Center text</p>
    <p>Select text and extrude it; angle 34</p>
    <br/>
    <p><b><u>Fading outline:</u></b></p>
    <p>Select all faces you want to edit</p>
    <p>Copy faces and Paste in place (Ctrl + Shift + V)</p>
    <p>Object>path>Offset-path do -4 or whatever works</p>
    <p>Click on the outline face make it a gradient with the gradient angle at -90°</p>
    <p>Make it from transparency to white with the middle point being on 75%</p>
    <p>Decrease the transparency of the face to 50%</p>
    <br/>
    <p><b><u>Exporting:</u></b></p>
    <p>File -> Export -> Export As</p>
    <p>Resolution: High (300 ppi)</p>
    <p>Anti-aliasing: Art Optimized (Super-sampling)</p>
    <p>Check the "Interlaced" box</p>
    <p>Background Color: Transparent</p>
  </main>
</template>
