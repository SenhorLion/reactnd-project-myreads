# MyReads Project

This is the source code for my final assessment project for Udacity's React Fundamentals course. It is an example of knowledge and skills gained in using `React` and managing state using internal state management.

### Project overview

MyReads is a React application bootstrapped using [Create React App](https://github.com/facebookincubator/create-react-app).
It represents a virtual bookcase to store books and track what you're reading. Using the provided Books API, you can search for books, limited to a fixed list of [SEARCH_TERMS.md](SEARCH_TERMS.md), and add them to a bookshelf.
It uses React's setState to keep track of books moved from one shelf to another.

## TL;DR

To view the finished project in a browser:

* install all project dependencies with `yarn install` or `npm install`
* start the development server with `yarn start` or `npm start`

## Project structure

```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── yarn.lock # yarn lock file.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── api # Includes all api related modules:
    │   ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── components # All component modules:
    │   ├── Book.js # Renders book data.
    │   ├── BookDetail.js # Renders book detail data.
    │   ├── BookShelf.js # Renders book shelf data.
    │   ├── BookShelves.js # Renders list of book shelf data.
    │   ├── Header.js # Reusable header component can be tailored per view.
    │   ├── Loader.js # Loader to give feedback to user per API action.
    │   ├── SearchBooks.js # Renders search book list.
    │   ├── SearchInput.js # Renders input form to capture searchterms.
    │   ├── SelectShelf.js # Select component - Displays book shelf category options and handles shelf selection.
    ├── constants # All constants:
    │   ├── constants.js # Store string copy and messages as constants.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── App.css # Styles for the app.
    ├── App.js # This is the root of your app. The Entry point for all routes.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
