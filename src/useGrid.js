import { useEffect, useState } from "react";

const getCols = (el, list) => {
    return Math.round(el.offsetWidth / list[0].width); 
}

const getRowHeights = (el, list) => {
    const cols = getCols(el, list);
    const cardsAmount = list.length;
    const rows = Math.ceil(cardsAmount / cols );
    let cardsArr = [];
    for(let row = 0; row < rows; row++) {
        cardsArr[row] = [];
    }
    
    for(let card = 0; card < cardsAmount; card++) {
        cardsArr[Math.floor(card / cols)].push(list[card].height);
    }
    
    cardsArr = cardsArr.map(arr => Math.max(...arr));
    

    return cardsArr;
}
const setOffsets = (el, list) => {
    const offsets = [];
    const cols = getCols(el, list);
    const rowHeights = getRowHeights(el, list)
    const cardsAmount = list.length;
    
    for(let i = 0; i < cardsAmount; i++){
        const rowHeight = rowHeights[Math.floor(i / cols)];
        const prevEl = i - cols;
        const offset = rowHeight - list[i].height;
        offsets.push(offset);
        if( prevEl >= 0 ) offsets[i] += offsets[prevEl];
    }
    for(let col = 0; col < cols; col++){
        offsets.unshift(0);
    }
    return offsets
}

const getContainerHeight = (el, gridItems) => {

    const cols = getCols(el, gridItems);
    const cardsAmount = gridItems.length;
    const rows = Math.ceil(cardsAmount / cols );
    const colheights = [];

    for(let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const curr = gridItems[j*cols+i] ? gridItems[j*cols+i].height : 0;
            const prev = colheights[i] || 0;
            colheights[i] = curr + prev;
        }
    }

    if (colheights.length < 1) return 'auto';
    return Math.max(...colheights);
}

/**
 * 
 * @param {node} el – ref representing list <ul>
 * @param {listect} items - ref representing list elements <li>
 * @returns grid array with 
 */
export const useGrid = (el, list) => {
    /* Set card translation for masonry layout */

    const [grid, setGrid] = useState([]);
    const [containerHeight, setContainerHeight] = useState([]);
    const [cols, setCols] = useState(null);

    useEffect(()=>{

        if(!el || !list || list.length < 1) return;  
        
        const resizeObserver = new ResizeObserver(entries => {

            const gridItems = list.map((item, index) => {
                return {
                    id: index,
                    width: item.getBoundingClientRect().width,
                    height: item.getBoundingClientRect().height
                }
            });
            
            const offsets = setOffsets(el, gridItems);
            setGrid(offsets);
            const height = getContainerHeight(el, gridItems);
            setContainerHeight(height);
            const colsAmount = getCols(el, gridItems);
            setCols(colsAmount);
        });
          
        list.forEach(item => {resizeObserver.observe(item)});

        return () => {
            list.forEach(item => {resizeObserver.disconnect()});
        }

    },[el, list]);

    return {
        grid, 
        cols,
        containerHeight
    }
}