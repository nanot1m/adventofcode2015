#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "lib/lib.h"

#if defined(DAY1)
#include "solutions/day1.c"
#elif defined(DAY2)
#include "solutions/day2.c"
#elif defined(DAY3)
#include "solutions/day3.c"
#endif

int main(int argc, char *argv[])
{

    if (argc != 2)
    {
        fprintf(stderr, "Usage: %s <day>\n", argv[0]);
        return 1;
    }

    int day = atoi(argv[1]);
    char filename[30];
    snprintf(filename, sizeof(filename), "input/day%d.txt", day);
    char *content = read_file(filename);

    return solve(content, strlen(content));
}
