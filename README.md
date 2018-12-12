# Vanilla React.js : Notes for Beginners

This repository contains notes and the code for the brilliant [React.js crash course by Mosh Hamedani](https://www.youtube.com/watch?v=Ke90Tje7VS0).

### Libraries used

-   create-react-app@1.5.2
-   bootstrap@4.1.1

### Setup

-   Install VS Code
-   Helpful extensions
    -   Prettier by Esben Petersen
    -   Simple React Snippets by Burke Holland
-   Install bootstrap
-   VS Code theme : Ayu Mirage

### Useful VS Code shortcuts (Mac)

-   command+d after selecting text to edit all occurences with multiple cursors.
-   ctrl+shift+R after selecting a few lines to move those into a new function.

### React basics

-   React components have some state (data) and render function (to render data).
-   Render function uses JSX.
-   Render function creates/outputs React elements.
-   React elements are JS objects and in-memory representation of actual DOM elements.
-   One-to-one mapping between react elements and DOM elements.
-   A tree of react elements is virtual DOM.
-   React diffs old virtual DOM (or old react element) with new virtual DOM (or new react element) and applies only the difference to the actual DOM tree.
-   Virtual DOM is cheap to construct.
-   One root component called App in every react application and every other component is a child component of this App component.
-   App.js will contain App class component.
-   index.js will contain ReactDOM.render(`<App />`, document.getElementById("root"));
-   App should be imported in index.js.
-   let vs const. Use const if not modifying.
-   Apply classes to elements using className attribute since class is a reserved keyword in JS.
-   Import React from 'react' because return of render function is converted to plain javascript by Babel wherein react elements are converted to React.createElement so we are not using react directly but indirectly.
-   No need of curly braces around object names in import statement if it is the default export from that module ('React' in import React from 'react').

### JSX

-   The JSX returned by render function must have only one parent element because the first argument to React.createElement takes in type of the element and Babel won't know the type if multiple elements exist alongside with no parent like `<h1></h1><h2></h2>`.
-   JSX expressions are compiled to react elements.
-   So return this from render function: one parent element with as many child elements put in parenthesis because in JS multi-line return stmt is read properly only with parenthesis otherwise JS assumes return terminates after first line and adds semi-colon automatically.
-   Use React.fragment as parent div in above note to avoid a div that doesn't do anything.
-   JSX expressions are like normal JS objects. You can return them from a fn, pass them to a fn, use as value of a const or variable.
-   JSX is not a templating engine so no ngFor like it is in Angular.
-   In return stmt within render fn, you can add plain JS in curly braces {}.

### Rendering Lists

-   There should be a "key" attribute in `<li>` to help react decide what's changed which is unique to each list element. Or 'key' attribute in every react element that's rendered dynamically using a 'map' for each element in a collection.

### Styling

-   Use "styles" attribute for custom styling. Define a property or an object where keys are camelcased css properties with values.
-   Or use inline styles where you put that object inline.

### Conditional rendering

-   No ngIf like in angular because JSX is not a templating engine.
-   One way: Call a { function } inside render method. Make that function use regular JS to check for conditions and return JSX for different conditions.
-   Another way: { condition `&&` `<JSX>` }

### Event handling

-   Functions in JS are objects so they have properties and methods which can be accessed.
-   Use bind method to bind the function object to the current instance of the class object 'this' : this.handleIncrement = this.handleIncrement.bind(this).
-   If we write a constructor for a class then we need to first call the constructor of the parent class using super().
-   This will require us to call super and bind methods for every event handler function using a constructor.
-   Better solution: Use arrow function!
-   Arrow function dont re-bind the this keyword, they inherit it.
-   Change event handler functions to arrow functions.

### Updating the state

-   React only understands state changes if they are done using setState. setState is inherited from the base Component class. Angular doesnt need this because it automatically detects changes because all browser events are monkey patched. So button clicks or inputs notifies Angular which triggers change detection algos and updates the view.
-   setState takes an object. All key-value pairs in this objects are merged with the existing state. If a key exists, it is overwritten.

### What happens when state changes

-   Whenever setState is seen, React will schedule a call to the render method. An async call. No fixed time. It created a new virtual DOM tree which is compared with the old tree and the diff is applied to the real DOM.

### Passing arugments to event handlers

-   Whenever we need to pass args to event handlers (arrow fns which are called in onClick), call an arrow fn whose body will contain a call to the actual event handler.

```javascript
onClick={ () => this.handleClick(product) }
```

### Composing components

-   Every react component has a property called prop.
-   Prop is a plain JS object. It includes all the attributes that we use when using a component (attribute=value passed when using `<ComponentName />`).
-   'Key' will not be part of props since it is a special attribute to uniquely identify objects.
-   When we use a component and enclose many other react elements within the component, all of these elements are accessed using this.props.children.

```
<Counter><h1></h1></Counter>
```

-   this.props.children will contain `<h1></h1>`.
-   Better idea: just pass data represented by children as props and create children elements in the component itself.

### Debugging react applications

-   Use react developer tools.

### props vs state

-   Props includes data that we give to a component.
-   State includes data that is local or private to that component.
-   Other components cannot access other component's state.
-   Props is read-only. we cannot change the input passed to a component from inside of that component.
-   But if there is need to change the input then put that in the state of that component first and then change it in one of the lifecycle methods.

### raising and handling events

-   Very important rule of thumb in React:
    A component that owns a piece of the state should be the one modifying it.
-   So if you want to update some piece of state in the parent component via an action (like clicking a button in child component) then raise an event from the child component that is passed to parent where that event is handled.
-   How to implement? Add new method in parent to and pass a reference to that method via props to the child component.

### Single source of truth

-   Let's say the data in the state of parent is passed to a child via props but the child has it's local state. This local state needs to be updated everytime the parent changes its own data that was passed via props. The child's view won't change because this view uses local state that wasn't updated.
-   To avoid this we just make the child a controlled component.

### Controlled component

-   A Controlled component doesn't have a local state. It receives all the data via props and raises events to change that event. It is entirely controlled by its parent.

### Keep components in sync/ Lifting state up

-   If there is some state that is shared between a parent and child but a new sibling of the parent comes in which wants that state as well, then lift the state up. Create a new parent for the existing parent and the sibling and pass the state down to these two from the one single parent.

### Stateless Functional Components

-   If a component doesnt have a state of its own and all it does is to print some data that it receives via props to the UI then we can convert that class to a function which is called a Stateless Functional Component.
-   So instead of having a class which extends Component class and has a render method we simply create a const which is an arrow function and returns JSX.
-   this.props only works in class components. we need to remove 'this' and accept 'props' as an argument to the arrow function and use it directly. React will pass props as arg to this function at runtime.

### Lifecycle Hooks

-   Lifecycle hooks allow us to hook into certain moments during lifecycle of a component
-   First phase: Mounting phase. This is when an instance of component is created and inserted into DOM.
-   Mounting phase: 3 hooks - constructor, render, componentDidMount. Called in order by React.
-   Second phase: Update phase - happens when state or props of a component get changed.
-   Update phase: 2 hooks - render, componentDidUpdate.
-   Third phase: UnMounting phase - happens just before a component is removed from DOM.
-   UnMounting phase: 1 hook - componentWillUnMount
-   Other hooks present but rarely used.
-   We cannot use lifecycle methods in stateless functional components.

Common use cases

-   constructor: initial properties and state based on props we receive from outside.
-   cannot use setState in construcor because it can only be called once the component is rendered and placed in the DOM.
-   render: when a component is rendered all its children components are rendered recursively.
-   componentDidMount: make AJAX calls. setState can be used and assigned data from ajax call.
-   componentDidUpdate: called when there is a state or props change. Called with two args: prevProps, prevState. Make conditional ajax calls if needed based on difference between prevProps and props (current).
-   componentWillUnMount: called just before a component is removed from DOM. Allows us to do any kind of cleanup. Good place to avoid memory leaks.
