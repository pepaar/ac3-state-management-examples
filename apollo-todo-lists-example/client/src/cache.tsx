import { InMemoryCache, makeVar } from "@apollo/client";
import { VisibilityFilters, VisibilityFilter } from "./models/VisibilityFilter";
import { GET_ALL_TODOS } from "./operations/queries/getAllTodos";
import { GetAllTodos } from "./operations/queries/__generated__/GetAllTodos";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        visibilityFilter: {
          read() {
            return visibilityFilterVar();
          },
        },
        todos: {
          read(existing, { args, cache }) {
            // Default for important list
            if (!existing && args?.listId === "important") {
              const existingTodos = cache.readQuery<GetAllTodos>({
                query: GET_ALL_TODOS,
              });

              return existingTodos?.todos.filter((todo) => todo.listId === "important") || [];
            }

            return existing;
          },
        },
      },
    },
  },
});

/**
 * Set initial values when we create cache variables.
 */

export const visibilityFilterVar = makeVar<VisibilityFilter>(VisibilityFilters.SHOW_ALL);
