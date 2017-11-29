import React from 'react';
import ReactLoading from 'react-loading';

const ReactLoadingComponent = ({type, color, delay, show, height, width}) =>{
    if(!show){
        return(<ReactLoading type={type} color={color} delay={delay} height={height} width={width}/>);
    }
    else{
        return null;
    }
}
export default ReactLoadingComponent;
