function Emphasis({ emphasis, onClick }) {
    return (
        <div
            onClick={() => {
                onClick();
            }}
            className="post_tones-inner-container"
        >
            <p className="post_emphasis">{emphasis}</p>
        </div>
    );
}

export default Emphasis;
