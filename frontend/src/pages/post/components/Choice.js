import "./Choice.css";

function Choice({ choice, onClick }) {
    return (
        <div
            className="choice_compactor"
            onClick={() => {
                onClick();
            }}
        >
            <span>{choice}</span>
        </div>
    );
}

export default Choice;
