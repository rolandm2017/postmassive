function Emphasis({ emphasis, onClick }) {
    return (
        <div
            onClick={() => {
                onClick();
            }}
            className="pl-2 pt-2 post_tones-inner-container"
        >
            <p className="post_emphasis">{emphasis}</p>
        </div>
    );
}

export default Emphasis;
