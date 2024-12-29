#include "../lib/lib.h"

typedef struct Point
{
    int x;
    int y;
} Point;

Point Point_value(int x, int y)
{
    Point p = {x, y};
    return p;
}

int Point_hash(Point p)
{
    return p.x * 100000 + p.y;
}

int Point_equals(Point p1, Point p2)
{
    return p1.x == p2.x && p1.y == p2.y;
}

Point Point_add(Point p1, Point p2)
{
    return Point_value(p1.x + p2.x, p1.y + p2.y);
}

Point Point_from_arrow(char arrow)
{
    switch (arrow)
    {
    case '^':
        return Point_value(0, 1);
    case 'v':
        return Point_value(0, -1);
    case '>':
        return Point_value(1, 0);
    case '<':
        return Point_value(-1, 0);
    default:
        return Point_value(0, 0);
    }
}

typedef struct Points
{
    Point *items;
    int length;
    int capacity;
} Points;

Points Points_value(int capacity)
{
    Points p = {malloc(capacity * sizeof(Point)), 0, capacity};
    return p;
}

void Points_push(Points *p, Point point)
{
    if (p->length == p->capacity)
    {
        p->capacity *= 2;
        p->items = realloc(p->items, p->capacity * sizeof(Point));
    }
    p->items[p->length++] = point;
}

int Points_contains(Points *p, Point point)
{
    for (int i = 0; i < p->length; i++)
    {
        if (Point_equals(p->items[i], point))
        {
            return 1;
        }
    }
    return 0;
}

void Points_print(Points *p)
{
    for (int i = 0; i < p->length; i++)
    {
        printf("(%d, %d)\n", p->items[i].x, p->items[i].y);
    }
}

void Points_free(Points *p)
{
    free(p->items);
}

Points visited;
Point elf_current;
Point robot_current;

void process_char(char c, int index)
{
    Point arrow = Point_from_arrow(c);
    Point next = Point_add(elf_current, arrow);
    if (!Points_contains(&visited, next))
    {
        Points_push(&visited, next);
    }
    elf_current = next;
}

void process_char_2(char c, int index)
{
    Point arrow = Point_from_arrow(c);
    Point next = index % 2 == 1
                     ? Point_add(elf_current, arrow)
                     : Point_add(robot_current, arrow);

    if (!Points_contains(&visited, next))
    {
        Points_push(&visited, next);
    }

    if (index % 2 == 1)
        elf_current = next;
    else
        robot_current = next;
}

int solve(const char *content, int length)
{
    elf_current = Point_value(0, 0);
    visited = Points_value(2);

    Points_push(&visited, elf_current);
    foreach_char(content, process_char);
    printf("Part 1: %d\n", visited.length);
    Points_free(&visited);

    elf_current = Point_value(0, 0);
    robot_current = Point_value(0, 0);
    visited = Points_value(2);

    Points_push(&visited, elf_current);
    foreach_char(content, process_char_2);
    printf("Part 2: %d\n", visited.length);
    Points_free(&visited);

    return 0;
}