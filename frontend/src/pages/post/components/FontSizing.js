function FontSizing({ fontSize }) {
    return (
        <div className="pl-2">
            <p>{fontSize.slice(8)}</p>
        </div>
    );
}

export default FontSizing;
