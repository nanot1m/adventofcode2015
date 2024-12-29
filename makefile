include .env

export $(shell sed 's/=.*//' .env)

prepare:
	@if [ ! -f input/day$(d).txt ]; then \
		curl -s -b "session=$(SESSION)" "https://adventofcode.com/2015/day/$(d)/input" -o input/day$(d).txt; \
	fi
run: prepare
	@gcc -fsanitize=address -DDAY$(d) -o main ./main.c ./lib/lib.o && time ./main $(d) && rm ./main
build_lib:
	gcc -fsanitize=address -shared -fPIC ./lib/lib.c -o ./lib/lib.o
