/*-----------*/
/* EXAMPLE 1 */
/*-----------*/

// import React, { useState } from "react";
// import { DndContext } from "@dnd-kit/core";
// import { CSS } from "@dnd-kit/utilities";
// import { SortableContext, useSortable } from "@dnd-kit/sortable";
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

// export function SortableExample() {
//   const [items] = useState([1, 3, 2]);

//   return (
//     <DndContext modifiers={[restrictToVerticalAxis]}>
//       <SortableContext items={items}>
//         {items.map((i) => (
//           <SortableItem key={i} id={i} />
//         ))}
//       </SortableContext>
//     </DndContext>
//   );
// }

// function SortableItem(props) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition
//   } = useSortable({ id: props.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     width: "200px"
//   };

//   return (
//     <div
//       className="border rounded text-center text-white bg-primary p-2 mb-1"
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//     >
//       Item {props.id}
//     </div>
//   );
// }

/*-----------*/
/* EXAMPLE 2 */

/*-----------*/

import React, { useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core";
import {
  arrayMove,
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

export function SortableExample() {
  const [items, setItems] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 5, name: "Charlie" },
    { id: 4, name: "Julie" },
    { id: 3, name: "Marie" }
  ]);

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = React.useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const m = arrayMove(items, oldIndex, newIndex);
        console.log("items: ", m);
        return m;
      });
    }

    setActiveId(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map(({ id, name }) => (
          <SortableItem key={id} id={id} name={name} />
        ))}
      </SortableContext>

      <DragOverlay>
        {activeId ? (
          // <Item value={`Item ${activeId}`} />
          <div className="d-flex align-items-center bg-white mb-2 p-2 border rounded shadow">
            <button className="btn btn-sm px-1 me-2">
              <RxDragHandleDots2 />
            </button>
            <p className="m-0">{items.find((i) => i.id === activeId).name}</p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition
  } = useSortable({ id: props.id });

  const style = React.useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
      width: "300px",
      opacity: !isDragging ? 1 : 0.5,
      backgroundColor: isDragging ? "#eee" : "#fff"
    }),
    [transform, transition]
  );

  return (
    <div ref={setNodeRef} style={style} {...props}>
      <div className="d-flex align-items-center mb-2 p-2 border rounded shadow-sm">
        <button
          {...attributes}
          {...listeners}
          className="btn btn-sm px-1 me-2 shadow-none"
        >
          <RxDragHandleDots2 />
        </button>

        <p className="m-0">{props.name}</p>
      </div>
    </div>
  );
}
