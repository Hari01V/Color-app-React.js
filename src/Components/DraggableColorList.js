import React from 'react';
import DraggableColorBox from './DraggableColorBox.js';
import { SortableContainer } from "react-sortable-hoc";

const DraggableColorList = SortableContainer(({ colors, deleteDraggableColorBox }) => {
  return (
    <div className="DraggableColorList" style={{ height: "100%" }}>
      {colors.map((color, index) => (
        <DraggableColorBox
          index={index}
          color={color}
          key={color.name}
          deleteBox={() => deleteDraggableColorBox(color.name)} />))}
    </div>
  );
})

export default DraggableColorList;