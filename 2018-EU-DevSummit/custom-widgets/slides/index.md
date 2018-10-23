<!-- .slide: data-background="img/bg-1.png" data-background-size="cover" -->
<!-- Presenter: Matt -->

# Building Your Own Widget with the ArcGIS API for JavaScript

## Julian Kissling – [@JulianKissling](https://twitter.com/JulianKissling)

## Rene Rubalcava – [@odoenet](https://twitter.com/odoenet)

---

<!-- .slide: data-background="img/sponsor.png" data-background-size="cover" -->

---

# Agenda

- Set up dev environment
- Create a...
  - Custom Class
  - Simple Widget
  - Custom Widget
- Enhance Custom Widget

---

<!-- Presenter: Franco -->
<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->

# Setting up the Dev Environment

---

# Developer environment

<!-- background: section/content will tie into widget dev -->
<!-- background: including TS in all steps because it's needed for widget dev -->

JS API + TypeScript

---

# TypeScript

---

# Typed JavaScript

```ts
interface Person {
  name: string;
  age: number;
}

const person: Person = { name: "Franco", age: 33 };

person.age = "24"; // TS2322: Type '"24"' is not assignable to type 'number'
person.height = 5.11; // TS2339: property 'height' does not exist on type 'Person'
```

---

# JS of the future, now

```ts
// let and const
let canChange = 5;
const cannotChange = 5;

// fat arrow functions
const logName = (person) => console.log(person.name);

// template strings
const greeting = `Hello, my name is ${person.name} and I am ${person.age} years old.`;

// destructuring
const { name, age } = person;

// property shorthand
const shorthand = { person };
```

---

# IDE Support

- Visual Studio
- WebStorm
- Sublime Text
- and more!

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo: [Dev Environment](../demos/1-setup/)

- Install TypeScript + JS API

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo Recap: Dev Environment

- Installed TypeScript + JS API typings
- Built mapping application

---

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->

# Creating a Class

---

# `esri/core/Accessor`

- JavaScript API foundation <!-- .element: class="fragment" data-fragment-index="0" -->
- Consistent developer experience <!-- .element: class="fragment" data-fragment-index="1" -->

```ts
// unified object constructor
const me = new Person({ name: "Franco", age: 33 });

// watch for changes to `age`
me.watch("age", singHappyBirthday);
```

<!-- .element: class="fragment" data-fragment-index="1" -->

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo: [Custom Class](../demos/2-custom-class/)

```ts
// fetches webmaps from a portal and provides APIs to work with them
interface CustomClass {
  // used to fetch webmaps items
  portal: Portal;
  webMapGroupId: string;

  // active webmap and all fetched ones
  readonly active: PortalItem;
  readonly webMaps: PortalItem[];

  // will be updated with the active webmap
  view: MapView;

  // moves to the next webmap
  next(): void;
}
```

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo Recap: Custom Class

- Implemented `CustomClass`
  - Extended `esri/core/Accessor`
  - Created properties with `@property`
  - Typed constructor arguments
  - Created public + private methods

---

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->
<!-- Presenter: Matt -->

# Writing a Widget

---

# About Widgets

- What? <!-- .element: class="fragment" data-fragment-index="1" -->
  - Encapsulated UI components
  - Cohesive (integrated, unified)
  - Single-purpose pieces of functionality
- Why? <!-- .element: class="fragment" data-fragment-index="2" -->
  - Reusable
  - Interchangeable
- How? <!-- .element: class="fragment" data-fragment-index="3" -->
  - Extend `esri/Widgets/Widget`

---

# `esri/widgets/Widget`

- Base widget class (View)
- Extends `esri/core/Accessor`
  - Properties
  - Watching properties
- Lifecycle

---

# Lifecycle

- `constructor`
- `postInitialize`
- `render`
- `destroy`

---

# `render`

- Defines UI
- Reacts to state changes
- Uses JSX (VDOM)

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo: [Simple View](../demos/3-simple-view/)

Write simple widget

---

# Demo Recap: Simple View

- Extended `esri/widgets/Widget`
- Implemented `render()`
- Added a `renderable()` property
- Added `onclick` event
- Added CSS Object + [BEM Methodology](http://getbem.com/)
- Toggled property with event to re-render

---

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->

# Improving Our Widget

---

# Architecture

- Separation of concerns
  - Views + ViewModels
  - UI replacement
  - Easier integration

---

# Views

- Extend `esri/widgets/Widget`
- Rely on ViewModel
- Focus on UI

---

# ViewModels

- Extend `esri/core/Accessor`
- Provide APIs to support View
- Focus on business logic

---

# View + ViewModel in action

<!-- todo: maybe create graphic for this -->

- View renders the state of the VM <!-- .element: class="fragment" data-fragment-index="1" -->
  - Looks at properties on VM and renders accordingly
- User interacts with View (property/method)<!-- .element: class="fragment" data-fragment-index="2" -->
  - Causes a change on VM or View
- View updates <!-- .element: class="fragment" data-fragment-index="5" -->
  - Renders again due to changes on VM

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo: [Updated View](../demos/4-updated-view/)

- Create `WebMapShowCase` to use `CustomClass` as VM
- Render details from the `active` portal item

<!--- mention BEM -->

---

# Demo Recap: Update View

- Paired View and ViewModel
- Rendered property from ViewModel
- Wired up interactivity
- Learned to apply styles
- Dynamically rendered UI based on a property value

---

<!-- Presenter: Franco -->

# Going Further

<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->

---

# Going Further

- <!-- .element: class="fragment" data-fragment-index="0" -->Improve UX
- <!-- .element: class="fragment" data-fragment-index="2" -->Accessibility (`a11y`)

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo: [Going Further (UX)](../demos/5-final-view/)

- Auto-cycle through webmaps
- Show timer in UI
- Support play/pause

---

<!-- .slide: data-background="img/bg-5.png" data-background-size="cover" -->

# Demo Recap: Going Further

- Improved UX
- Added support for extra locale

---

<!-- Presenter: Matt -->
<!-- .slide: data-background="img/bg-4.png" data-background-size="cover" -->

# Final Recap

- Set up dev environment
- Wrote a custom class
- Developed a custom Widget
- Enhanced a Widget
- Went further

---

## Additional Resources

- [Implementing Accessor](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html)
- [Setting up TypeScript](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)
- [Widget Development](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
- [JavaScript API SDK](https://developers.arcgis.com/javascript/)
- [Styling](https://developers.arcgis.com/javascript/latest/guide/styling/index.html)
- [Widget Patterns](https://github.com/jcfranco/4x-widget-patterns)

---

<!-- **please rate us** -->
<!-- .slide: data-background="img/uc18-survey.png" -->

---

# Question Time

> 🤔 Where can I find the slides/source?

👉 [https://github.com/odoe/presentations/tree/master/2018-EU-DevSummit/custom-widgets](https://github.com/odoe/presentations/tree/master/2018-EU-DevSummit/custom-widgets) 👈

---

<!-- .slide: data-background="img/bg-final.png" -->
