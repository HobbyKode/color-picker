import { useState, useRef, useEffect } from "react";

export default function ColorPicker(){
    const [selectedColor, setSelectedColor] = useState({ hex: null, name: null });
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [hoveredColor, setHoveredColor] = useState(null);

    const itemRefs = useRef([]);

    useEffect( () =>{
        if (focusedIndex != null){
            itemRefs.current[focusedIndex]?.focus();
        }
    }, [focusedIndex]);

    

    const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#00FF00" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
    ];

    function handleClick(color){
        setSelectedColor(color);
        
    }

    function handleMouseEnter(color){
        setHoveredColor(color);
           
    }
    function handleMouseLeave(){
        setHoveredColor(null);
    }

    function handleFocus(index){
        setFocusedIndex(index); 
    }

    function handleBlur(){
        setFocusedIndex(null);
    }
    function handleKeyDown(e) {
        
        if (focusedIndex === null) return;
        // Arrow nav: In this version of the arrow navigation, only the Enter/Space key is confirming a selection, 
        // instead of skipping the handleFocus phase
        if (e.key === "ArrowRight"){
            //Can move to the right until it reaches the last item
            //if (focusedIndex === null) return;
            if (focusedIndex < colors.length - 1){
                setHoveredColor(colors[focusedIndex + 1]);
                setFocusedIndex(focusedIndex + 1);
            }
        }else if (e.key === "ArrowLeft"){
            //Can move to the left until it reaches the first item
            //if (focusedIndex === null) return;
            if (focusedIndex > 0){
                setHoveredColor(colors[focusedIndex - 1]);
                setFocusedIndex(focusedIndex - 1);
            }
        }else if (e.key === "Enter" || e.key === " "){
            //Only confirming with those keys
            if (focusedIndex != null){
                setHoveredColor(colors[null]);
                setSelectedColor(colors[focusedIndex]);
            }      
        }
       
    }

    return(
        <div className="color-picker">
            <h1>Color Picker</h1>
             <div className="color-list" role="listbox" aria-label="Color picker">
                {colors.map((color, index) => (
                <div
                    key={index}
                    ref={el => (itemRefs.current[index] = el)}
                    role="option"
                    aria-selected={selectedColor.hex === color.hex}
                    tabIndex={focusedIndex === index ? 0 : -1}   // roving tabindex
                    className={`color-item 
                    ${focusedIndex === index ? 'focused' : ''} 
                    ${selectedColor.hex === color.hex ? 'selected' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleClick(color)}
                    onMouseEnter={() => handleMouseEnter(color)}
                    onMouseLeave={handleMouseLeave}
                    onFocus={() => handleFocus(index)}
                    onBlur={handleBlur}
                     onKeyDown={(e) => handleKeyDown(e, index)}
                >
                    {hoveredColor?.hex === color.hex && (
                    <span className="color-code">{hoveredColor.hex}</span>
                    )}
                    {selectedColor.hex === color.hex && !hoveredColor && (
                    <span className="color-code">{selectedColor.name || color.hex}</span>
                    )}
                </div>
                ))}
            </div>
        </div>
    );
}