# Bravado

![App Record](https://i.imgur.com/6oaLBmg.gif)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# production url
https://bravadoquest.herokuapp.com/
```

## Overview

This project uses Vuejs with Nuxtjs. All components are automatically imported and assets are loaded through `style-resources`.
The app consists of three main components: `UsersList`, `UsersContainer` and `SearchBar`. They're all imported into `Index` page.

![Components Diagram](https://i.imgur.com/6tJZzkk.png)

### Search
The search component has a debounce function that delays the search action for 1.5s. As a result, the search feature will have better performance, as it won't be receiving multiple filter calls on each pressed key.

It also emits an event to the parent component when a given query param is present - but it depends on VueRouter to do so.

### Users
The users list and filtering was breaked down into two components. The first one is `UsersList`, responsible for listing and emitting an event every time the users reaches the end of the list. The other one is `UsersContainer`, which handles the data fetching and lazyness.

## Improvements

- Search performance: searching takes a while to filter out 20k records if there are too many matches. That can be solved by implementing a lazy search pattern, that searches the first four users in the array and fetch another four when the user scrolls to the bottom.
- Tests coverage: UsersList has 100% of test coverage, but the other components doesn't have tests due to time.
- Dependency injection: debounce and other private functions will make the components that uses them harder to test. We can create Vuejs mixins to inject them into the component lifecycle, so that way we can stub them in our unit tests.
- State management: although this is a simple project, state managing can get messy if we start adding more behavior to react to the users list changes. Perhaps using Vuex would still be an overhead, but I would definitely implement a simple and local store pattern.
