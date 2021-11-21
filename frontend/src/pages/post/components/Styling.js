function Styling({ option, stylingType }) {
    return (
        <div>
            <span>Option {option}</span>
            <span>Start:</span>
            <input type="range" />
            <span>End:</span>
            <input type="range" />
            <label>{stylingType}</label>
        </div>
    );
}

export default Styling;
