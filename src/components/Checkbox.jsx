function Checkbox(props){
    const {value, onChange} = props;

    return(
        <>
        <label className="label-container"><span className={`custom-checkbox ${value? "active": ""}`}></span></label>
        <input className="checkbox" type="Checkbox" checked={value} onChange={onChange}></input>
        </> 
    )
}

export default Checkbox;

