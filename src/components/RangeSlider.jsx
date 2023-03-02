

function RangeSlider(props){
    const {length, setLength} = props;

    // const [length, setLength]=useState(0)
    return(
        <>
        <div className="length-container">
            <h4 className="static-length">Character Length</h4>
            <h4 className="dynamic-length">{length}</h4>
        </div>
        <input className="range-slider" type='range' min='0' max='20' step="1" value={length} onChange={setLength}/>
        </> 
    )
}

export default RangeSlider;