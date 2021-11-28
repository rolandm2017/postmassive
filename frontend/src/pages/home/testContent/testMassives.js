const testMassives = [
    {
        id: 0,
        content:
            "Mauris tempus orci nisl, vitae maximus justo porttitor ac. Vestibulum non magna viverra, sodales dui a, vestibulum augue. Proin dictum elit commodo erat iaculis fringilla. ",
        stylings: [
            {
                start: 5,
                end: 11,
                stylings: "textAlignmentUpDown",
            },
            { start: 32, end: 39, stylings: "strikethrough" },
            { start: 108, end: 104, stylings: "makeBold, textSize22" },
        ],
    },
    {
        id: 1,
        content:
            "Men at some time are masters of their fates: The fault, dear Brutus, is not in our stars, But in ourselves, that we are underlings. This above all: to thine own self be true, And it must follow, as the night the day, Thou canst not then be false to any man",
        stylings: [
            {
                start: 5,
                end: 26,
                stylings: "backgroundColorBlack, makeBold, textSize22",
            },
            { start: 47, end: 63, stylings: "backgroundColorRed" },
            {
                start: 193,
                end: 209,
                stylings: "backgroundColorCyan, makeBold, fontSize12",
            },
        ],
    },
    {
        id: 2,
        content:
            "Vestibulum dictum euismod finibus. Suspendisse varius tellus sem, eu imperdiet sapien sollicitudin sit amet. Mauris a faucibus sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce rutrum ante eu facilisis efficitur.",
        startEndPoints: [1, 6, 25, 35, 100, 120, 200, 240],
        stylings: [
            { start: 1, end: 6, stylings: "strikethrough, italics" },
            { start: 25, end: 35, stylings: "fontSize24" },
            {
                start: 100,
                end: 120,
                stylings: "underline, backgroundColorGreen",
            },
            {
                start: 200,
                end: 240,
                stylings: "underline, backgroundColorRed",
            },
        ],
    },
    {
        id: 3,
        content:
            "To be, or not to be: that is the question: Whether ’tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take arms against a sea of troubles, And by opposing end them. To die: to sleep...",
        stylings: [
            { start: 20, end: 28, stylings: "makeBold, underline" },
            { start: 150, end: 199, stylings: "darthNo" },
        ],
    },
];

export default testMassives;
