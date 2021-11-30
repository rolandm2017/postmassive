function FontSizing({ fontSize }) {
    return (
        <div className="pl-2 post_bg-lighten">
            <p>{fontSize.slice(8)}</p>
        </div>
    );
}

export default FontSizing;
