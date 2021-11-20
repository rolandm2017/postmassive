const testMassives = [
    {
        id: 0,
        content:
            "Mauris tempus orci nisl, vitae maximus justo porttitor ac. Vestibulum non magna viverra, sodales dui a, vestibulum augue. Proin dictum elit commodo erat iaculis fringilla. ",
        stylings: [
            {
                start: 5,
                end: 11,
                className: "textAlignmentUpDown",
            },
            { start: 32, end: 39, className: "strikethrough" },
            { start: 108, end: 104, className: "bold, textSize22" },
        ],
    },
    {
        id: 1,
        content:
            "Phasellus commodo tellus non tellus semper, id ultricies massa dictum. Proin blandit dolor eu diam imperdiet, vitae vulputate augue placerat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        stylings: [
            { start: 5, end: 15, className: "strikethrough, bold, textSize22" },
            { start: 47, end: 53, className: "backgroundRed" },
            {
                start: 193,
                end: 208,
                className: "backgroundCyan, bold, fontSize12",
            },
        ],
    },
    {
        id: 2,
        content:
            "Vestibulum dictum euismod finibus. Suspendisse varius tellus sem, eu imperdiet sapien sollicitudin sit amet. Mauris a faucibus sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce rutrum ante eu facilisis efficitur.",
        startEndPoints: [1, 6, 25, 35, 100, 120, 200, 240],
        stylings: [
            { start: 1, end: 6, className: "strikethrough, italics" },
            { start: 25, end: 35, className: "fontSize24" },
            { start: 100, end: 120, className: "underline, backgroundGreen" },
            { start: 200, end: 240, className: "underline, backgroundRed" },
        ],
    },
    {
        id: 3,
        content:
            "I can see what you see not. Vision milky, then eyes rot. When you turn, they will be gone, Whispering their hidden song. Then you see what cannot be, Shadows move where light should be. Out of darkness, out of mind, Cast down into the Halls of the Blind.",
        stylings: [
            { start: 20, end: 28, className: "bold, underline" },
            { start: 150, end: 199, className: "darthNo" },
        ],
    },
];

export default testMassives;
