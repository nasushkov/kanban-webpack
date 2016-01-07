import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

let noteSource = {
    beginDrag(props){
        return {
            id: props.id
        };
    },
    isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
    }
};

let noteTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;

        if(sourceId !== targetId) {
            targetProps.onMove(sourceId, targetId);
        }
    }
};

@DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))
export default class Note extends React.Component {
    render() {
        const {connectDragSource, connectDropTarget, isDragging, ...props} = this.props;

        return connectDragSource(connectDropTarget(
            <li style={{ opacity: isDragging ? 0 : 1 }} {...props}>{props.children}</li>
        ));
    }
}