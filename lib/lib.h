#ifndef LIB_H
#define LIB_H

char *read_file(const char *filename);

/**
 * @brief Iterates over each character in a string and applies a function to it.
 *
 * This function takes a string and a function pointer as arguments. It iterates
 * over each character in the string and calls the provided function with the
 * character and its index as arguments.
 *
 * @param str The input string to iterate over.
 * @param func The function to apply to each character. It should take a char
 *             and an int as parameters, where the char is the current character
 *             and the int is the index of the character in the string.
 */
void foreach_char(const char *str, void (*func)(char, int));

/**
 * @brief Applies a given function to each line of a string.
 *
 * This function iterates over each line in the provided string `str` and
 * applies the function `func` to each line. The function `func` should
 * accept two parameters: a `const char*` representing the line and an
 * `int` representing the line number (starting from 0).
 *
 * @param str The input string containing multiple lines.
 * @param func The function to be applied to each line. It should take
 *             a `const char*` (the line) and an `int` (the line number).
 */
void foreach_line(const char *str, void (*func)(const char *, int));

#endif