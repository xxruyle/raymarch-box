# raymarch-box 
Parallax raymarching

https://fileadmin.cs.lth.se/cs/Education/EDAN35/projects/2023/VoxelRayMarcher.pdf

## Building and integrating dependecies 
1) Compile glfw  using cmake `https://www.glfw.org/download.html` to get  libglfw3.a and GLFW include 
2) Install glad https://glad.dav1d.de/ and get glad.h and glad.c 
3) For Linux: in makefile to link use: `-lglfw3 -lGL -lX11 -lpthread -lXrandr -lXi -ldl`

