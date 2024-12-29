#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../lib/lib.h"

int total = 0;
int negative_floor_at = -1;

void process_char(char c, int index)
{
    if (c == '(')
        total++;
    else if (c == ')')
        total--;

    if (total == -1 && negative_floor_at == -1)
        negative_floor_at = index + 1;
}

int solve(char *content, int length)
{
    foreach_char(content, process_char);

    printf("Part 1: %d\n", total);
    printf("Part 2: %d\n", negative_floor_at);
    return 0;
}