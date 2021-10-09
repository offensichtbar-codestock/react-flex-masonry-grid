import './masonrygrid.css';
import React, {
    useRef, 
    useState,    
    cloneElement,
    useEffect
} from 'react';
import { 
    useGrid
} from './useGrid';

const Item = ({children, item, index, fn, offset, config, additional}) => {

    const itemRef = useRef(null);

    useEffect(() => {
        fn(itemRef.current, index);
    },[item, itemRef, fn, index])

    return (<li key={index} 
        className="gridItem" 
        ref={ itemRef }
        style={{ 
            transform: `translateY(-${ offset || 0 }px)`,
            padding: `${config?.gap}`,
            flexBasis: `${config?.flexbasis}`
        }} 
        >
            { cloneElement(children, {
                item,
                additional
            })}
    </li>)
}

const MasonryGrid = ({ items, children, id, additional, config }) => {

    const [gridContainer, setGridContainer] = useState(null);
    const [elements, setElements] = useState([]);
    const [placeholder, setPlaceholder] = useState([]);
    const elementsRef = useRef([]);
    const {grid, cols, containerHeight} = useGrid(gridContainer, elements);

    const collectElements = (item, index) => {
        if(elementsRef.current.length > items.length) {
            const i = items.length - elementsRef.current.length;
            elementsRef.current = elementsRef.current.slice(0, i);
        }
        elementsRef.current[index] = item;
        if(elementsRef.current.length === items.length) {
            setElements(elementsRef.current);
        }
    }

    useEffect(()=>{
        const emptySpaces = items.length % cols === 0 ? 0 : cols - (items.length % cols);
        const emptyItems = [];
        for(let i = 0; i < emptySpaces; i++) {
            emptyItems.push(<li 
                key={items.length + i}
                className="gridItem"
                style={{
                    padding: config?.gap,
                    flexBasis: config?.flexbasis
                }}/>)
        }
        setPlaceholder(emptyItems)
    },[cols, items, config]);

    return (<ul 
        id={id ? id : 'gridcontainer'} 
        className="gridContainer"
        ref={setGridContainer}
        style={{height: containerHeight}}
        >
        {items.map((item, index) => (
            <Item 
            key={index}
            index={index}
            item={item}
            children={children} 
            additional={additional}
            config={config}
            offset={grid[index]}
            fn={collectElements} />
        ))}
        {placeholder}
    </ul>)
}

export default MasonryGrid
