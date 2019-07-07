import {
  GraphQLList as ListType,
  GraphQLInt as IntType
} from 'graphql';
import fetch from 'node-fetch';
import PartType from '../types/PartType';

// FreeGenes Parts API
const url = 'https://api.freegenes.org/parts/';

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

function filterItems(items, first, skip) {
  if (first) {
    if (skip) {
      return items.slice(skip, skip+first)
    } else {
      return items.slice(0, first)
    }
  } else {
    return items
  }
}

const allParts = {
  type: new ListType(PartType),
  args: {
    first: { type: IntType },
    skip: { type: IntType },
  },
  resolve(_, { first, skip }) {
    // The task has already been executed
    // Return the task
    if (lastFetchTask) {
      return lastFetchTask;
    }

    // It has been more than 10 minutes since the last execution
    // Run the task again
    if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
      lastFetchTime = new Date();
      lastFetchTask = fetch(url)
        .then(response => response.json())
        .then(data => {
          items = data;
          lastFetchTask = null;
          return filterItems(items);
        })
        .catch(err => {
          lastFetchTask = null;
          throw err;
        });

      if (items.length) {
        return filterItems(items);
      }

      return lastFetchTask;
    }

    // It has been less than 10 minutes since the last execution
    // Return the items from the last execution
    return filterItems(items);
  },
};

export default allParts;
