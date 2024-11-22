debug:
	g++ --std=c++1z -Wall -g  -I ./include -L ./lib -o ./bin/main src/*.cpp src/*.c  -lglfw3 -lGL -lX11 -lpthread -lXrandr -lXi -ldl

run:
	g++ --std=c++1z -Wall -g  -I ./include -L ./lib -o ./bin/main src/*.cpp src/*.c  -lglfw3 -lGL -lX11 -lpthread -lXrandr -lXi -ldl
	./bin/main
start: 
	./bin/main
