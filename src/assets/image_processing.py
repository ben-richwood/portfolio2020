import sys # To exit at certain point
import os.path # used to check whether a file exist or not
import subprocess, os, random, math

# grid: 19 thumbnails x 19
# 1104 × 1104
# thumbnail: 58.1 x 58.1

squareLength = 1100/19
squareLength = 59

position = ()
position = ("-geometry", "+" + (str(squareLength*random.randint(3, 12)) + "+" + str(squareLength*random.randint(3, 12))))
command = ("magick", "composite", "-compose", "atop",)+ position +(  "user_pic03.jpg", "sample.jpg", "output.jpg")
subprocess.call(command)


"""
Shell script to build the animation
Can be copy-paste in the terminal
=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=-
convert -delay 0 -dispose none \
        -size 500x500+0+0 sample.gif \
    -dispose previous -delay 60 \
        -page +112+112 user_pic03.jpg \
        -page +112+112 user_pic03.jpg \
    -loop 0 -layers Optimize output.gif
"""

# -page +112+112 user_pic03.jpg \
