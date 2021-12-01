function FontSizing({ fontSize }) {
    return (
        <div className="post_bg-lighten post_">
            <p>{fontSize.slice(8)}</p>
        </div>
    );
}

export default FontSizing;
