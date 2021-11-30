import "./Choice.css";

function Choice({ choice, onClick }) {
    const trimmedChoice = choice.includes("backgroundColor")
        ? choice.slice(15)
        : choice;
    return (
        <div
            className="choice_compactor"
            onClick={() => {
                onClick();
            }}
        >
            <span>{trimmedChoice}</span>
        </div>
    );
}

export default Choice;
