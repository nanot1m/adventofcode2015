#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define NULL_TERMINATOR '\0'

char *read_file(const char *filename)
{
    FILE *file = fopen(filename, "rb");
    if (!file)
    {
        perror("Unable to open file");
        return NULL;
    }

    fseek(file, 0, SEEK_END);
    long length = ftell(file);
    fseek(file, 0, SEEK_SET);

    char *buffer = (char *)malloc(length + 1);
    if (!buffer)
    {
        perror("Unable to allocate memory");
        fclose(file);
        return NULL;
    }

    fread(buffer, 1, length, file);
    buffer[length] = NULL_TERMINATOR;

    fclose(file);
    return buffer;
}

void foreach_char(const char *str, void (*func)(char, int))
{
    for (int index = 0; str[index] && str[index] != NULL_TERMINATOR; index++)
    {
        func(str[index], index);
    }
}

void foreach_line(const char *str, void (*func)(const char *, int))
{
    int line_start = 0;
    int line_index = 0;
    for (int index = 0; str[index] && str[index] != NULL_TERMINATOR; index++)
    {
        if (str[index] == '\n')
        {
            char *line = strndup(&str[line_start], index - line_start);
            func(line, line_index);
            free(line);
            line_start = index + 1;
            line_index++;
        }
    }
}