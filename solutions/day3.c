#include "../lib/lib.h"
#include "../lib/dynamic_array.h"

typedef struct
{
    int x;
    int y;
} Point;

Point Point_new(int x, int y)
{
    Point p = {x, y};
    return p;
}

int Point_equals(Point p1, Point p2)
{
    return p1.x == p2.x && p1.y == p2.y;
}

Point Point_add(Point p1, Point p2)
{
    return Point_new(p1.x + p2.x, p1.y + p2.y);
}

Point Point_from_arrow(char arrow)
{
    switch (arrow)
    {
    case '^':
        return Point_new(0, 1);
    case 'v':
        return Point_new(0, -1);
    case '>':
        return Point_new(1, 0);
    case '<':
        return Point_new(-1, 0);
    default:
        return Point_new(0, 0);
    }
}

define_dynamic_array(Points, Point);

Points visited;
Point elf_current;
Point robot_current;

int Points_contains(Points *points, Point p)
{
    for (int i = 0; i < points->size; i++)
        if (Point_equals(points->data[i], p))
            return 1;

    return 0;
}

void process_char(char c, int index)
{
    Point arrow = Point_from_arrow(c);
    Point next = Point_add(elf_current, arrow);
    if (!Points_contains(&visited, next))
        Points_push(&visited, next);
    elf_current = next;
}

void process_char_2(char c, int index)
{
    Point arrow = Point_from_arrow(c);
    Point next = index % 2 == 1
                     ? Point_add(elf_current, arrow)
                     : Point_add(robot_current, arrow);

    if (!Points_contains(&visited, next))
        Points_push(&visited, next);

    if (index % 2 == 1)
        elf_current = next;
    else
        robot_current = next;
}

int solve(const char *content, int length)
{
    elf_current = Point_new(0, 0);
    visited = Points_new();

    Points_push(&visited, elf_current);
    foreach_char(content, process_char);

    printf("Part 1: %d\n", visited.size);
    Points_free(&visited);

    elf_current = Point_new(0, 0);
    robot_current = Point_new(0, 0);
    visited = Points_new();

    Points_push(&visited, elf_current);
    foreach_char(content, process_char_2);

    printf("Part 2: %d\n", visited.size);
    Points_free(&visited);

    return 0;
}