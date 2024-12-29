/**
 * @file dynamic_array.h
 * @brief A header file for defining a dynamic array data structure in C.
 *
 * This file provides macros to define a dynamic array for any data type.
 * The dynamic array supports initialization, resizing, pushing elements,
 * and freeing the allocated memory.
 *
 * Usage:
 *
 * ```cpp
 * define_dynamic_array(IntArray, int);
 *
 * IntArray arr = IntArray_new();
 * IntArray_push(&arr, 10);
 * IntArray_push(&arr, 20);
 * IntArray_free(&arr);
 * ```
 *
 * @macro define_dynamic_array(name, type)
 * Defines a dynamic array structure and associated functions for a given type.
 *
 * @typedef name
 * The dynamic array structure containing:
 * - `type *data`: Pointer to the array data.
 * - `int size`: The current number of elements in the array.
 * - `int capacity`: The current capacity of the array.
 *
 * @function name##_new
 * Initializes a new dynamic array.
 * @return A new dynamic array with zero size and capacity.
 *
 * @function void name##_resize(name *array, int new_capacity)
 * Resizes the dynamic array to the specified capacity.
 * @param array Pointer to the dynamic array.
 * @param new_capacity The new capacity for the array.
 *
 * @function void name##_push(name *array, type value)
 * Adds a new element to the dynamic array. Resizes the array if necessary.
 * @param array Pointer to the dynamic array.
 * @param value The value to be added to the array.
 *
 * @function void name##_free(name *array)
 * Frees the memory allocated for the dynamic array.
 * @param array Pointer to the dynamic array.
 */
#ifndef DYNAMIC_ARRAY_H
#define DYNAMIC_ARRAY_H

#include <stdlib.h>

#define define_dynamic_array(name, type)                                          \
    typedef struct                                                                \
    {                                                                             \
        type *data;                                                               \
        int size;                                                                 \
        int capacity;                                                             \
    } name;                                                                       \
                                                                                  \
    name name##_new()                                                             \
    {                                                                             \
        name array;                                                               \
        array.data = NULL;                                                        \
        array.size = 0;                                                           \
        array.capacity = 0;                                                       \
        return array;                                                             \
    }                                                                             \
                                                                                  \
    void name##_resize(name *array, int new_capacity)                             \
    {                                                                             \
        array->data = (type *)realloc(array->data, new_capacity * sizeof(type));  \
        array->capacity = new_capacity;                                           \
    }                                                                             \
                                                                                  \
    void name##_push(name *array, type value)                                     \
    {                                                                             \
        if (array->size >= array->capacity)                                       \
        {                                                                         \
            name##_resize(array, array->capacity == 0 ? 1 : array->capacity * 2); \
        }                                                                         \
        array->data[array->size++] = value;                                       \
    }                                                                             \
                                                                                  \
    void name##_free(name *array)                                                 \
    {                                                                             \
        free(array->data);                                                        \
        array->data = NULL;                                                       \
        array->size = 0;                                                          \
        array->capacity = 0;                                                      \
    }

#endif