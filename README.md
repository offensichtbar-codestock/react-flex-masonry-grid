# React Flex Masonry Grid

![Offensichtbar Logo](https://i.postimg.cc/nz9jhvpZ/osb-header-git.jpg)

[![](https://img.shields.io/github/package-json/v/offensichtbar-codestock/react-flex-masonry-grid?color=%23009fe3)](https://github.com/offensichtbar-codestock/react-flex-masonry-grid) [![npm version](https://img.shields.io/npm/v/@offensichtbar-codestock/react-flex-masonry-grid?color=%23009fe3)](https://www.npmjs.com/package/@offensichtbar-codestock/react-flex-masonry-grid)

A fast and lightweight React Component to display a list of objects in a custom component. The grid layout uses the css flexbox feature. In contrast to well-known masonry layouts there is no absolute positioning which makes it faster. The offsets are set with CSS transform style (translateY). The grid responds immediately to browser window resizes and content changes due to the usage of ResizeObserver. The item width is set with the CSS attribute flex-basis and can be customized via props. That means that the item width is nearly the same size on all devices and there is no need to configure media queries.

+ Fully responsive
+ No dependencies
+ Easy customization without having to touch CSS

### Features

+ props are passed through to your custom component
+ grid reacts to deleted items 
+ grid reacts to Risizing and height changes due to the usage of ResizeObserver




## Installation
#### As npm package

```sh
npm install @offensichtbar-codestock/react-flex-masonry-grid --save
```

## Usage
Import `MasonryGrid` into your React component:

```sh
import { MasonryGrid } from '@offensichtbar-codestock/react-flex-masonry-grid';
```

Pass an array of objects you want to render as props to the Component (mandatory props).
Wrapped inside the Component will be your custom component. For each item in the items array the custom component will be rendered inside a list element created by the MasonryGrid component:
```sh
<MasonryGrid items={items}>
    <YourCustomComponent/>
</MasonryGrid>
```
### Configuration
#### Additional props
+ additional
+ id
+ config

The custom component accepts optional additional props, called "additional". The props aren't passed to the custom component inside the MasonryGridComponent:
```sh
<MasonryGrid 
    id="customId"
    items={items}
    additional={additional}
    config={config}>
    <YourCustomComponent/>
</MasonryGrid>
```
The custom component may look like this:
```sh
const YourCustomComponent = ({item, additional}) => {

    return (<div>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <button onClick={ () => additional.deleteItem(item) }>Delete Item</button>
    </div>)
}
```
#### Config Options
A config object for the CSS properties 'padding' and 'flex-basis' can be passed as props to the MasonryGrid component:
```sh
const config = {
    gap: '10px',
    flexbasis: '200px'
}
```
Alternatively, these properties can be set by overwriting the default setting in CSS:
```
ul.gridContainer li.gridItem {
    padding: '10px',
    flex-basis: 15rem;
}
```
#### default values
```
padding: .5rem;
flex-basis: 15rem;
```

## Demo

[Live demo](https://react-ts-smrv7d.stackblitz.io)  
[Stackblitz editor](https://stackblitz.com/edit/react-ts-smrv7d?file=index.tsx)

## Licence
[![](https://img.shields.io/github/license/offensichtbar-codestock/react-flex-masonry-grid?color=%23009fe3)](https://opensource.org/licenses/MIT)