#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int total_part_1 = 0;
int total_part_2 = 0;

void process_line(const char *line, int index)
{
    int l, w, h;
    sscanf(line, "%dx%dx%d", &l, &w, &h);

    int surfaceArea = 2 * l * w + 2 * w * h + 2 * h * l;
    int volume = l * w * h;

    int smallest_area = l * w;
    int smallest_perimeter = 2 * l + 2 * w;
    if (w * h < smallest_area)
    {
        smallest_area = w * h;
        smallest_perimeter = 2 * w + 2 * h;
    }
    if (l * h < smallest_area)
    {
        smallest_area = l * h;
        smallest_perimeter = 2 * l + 2 * h;
    }

    total_part_1 += surfaceArea + smallest_area;
    total_part_2 += volume + smallest_perimeter;
}

int solve(char *content, int length)
{
    foreach_line(content, process_line);
    printf("Part 1: %d\n", total_part_1);
    printf("Part 2: %d\n", total_part_2);
    return 0;
}