const testMassives = [
    {
        id: 0,
        content:
            "Mauris tempus orci nisl, vitae maximus justo porttitor ac. Vestibulum non magna viverra, sodales dui a, vestibulum augue. Proin dictum elit commodo erat iaculis fringilla. ",
        startEndPoints: [5, 11, 32, 39, 108, 140],
        stylings: ["textAlignmentUpDown", "strikethrough", "bold, textSize22"],
    },
    {
        id: 1,
        content:
            "Phasellus commodo tellus non tellus semper, id ultricies massa dictum. Proin blandit dolor eu diam imperdiet, vitae vulputate augue placerat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        startEndPoints: [5, 15, 47, 53, 193, 208],
        stylings: [
            "strikethrough, bold, textSize22",
            "backgroundRed",
            "backgroundCyan, bold, fontSize12",
        ],
    },
    {
        id: 2,
        content:
            "Vestibulum dictum euismod finibus. Suspendisse varius tellus sem, eu imperdiet sapien sollicitudin sit amet. Mauris a faucibus sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce rutrum ante eu facilisis efficitur.",
        startEndPoints: [1, 6, 25, 35, 100, 120, 200, 240],
        stylings: [
            "strikethrough, italics",
            "fontSize24",
            "underline backgroundGreen",
            "underline backgroundRed",
        ],
    },
    {
        id: 3,
        content:
            "I can see what you see not. Vision milky, then eyes rot. When you turn, they will be gone, Whispering their hidden song. Then you see what cannot be, Shadows move where light should be. Out of darkness, out of mind, Cast down into the Halls of the Blind.",
        startEndPoints: [20, 28, 150, 199],
        stylings: ["bold, underline", "darthNo"],
    },
];

export default testMassives;
