import Styling from "../../../utility/classes/Styling";

const testMassives = [
    {
        id: 0,
        content:
            "Mauris tempus orci nisl, vitae maximus justo porttitor ac. Vestibulum non magna viverra, sodales dui a, vestibulum augue. Proin dictum elit commodo erat iaculis fringilla. ",
        stylings: [
            new Styling(5, 11, "textAlignmentUpDown"),
            new Styling(32, 39, "strikethrough"),
            new Styling(104, 124, "bold", "textSize22"),
        ],
    },
    {
        id: 1,
        content:
            "Men at some time are masters of their fates: The fault, dear Brutus, is not in our stars, But in ourselves, that we are underlings. This above all: to thine own self be true, And it must follow, as the night the day, Thou canst not then be false to any man",
        stylings: [
            new Styling(4, 27, "backgroundColorOrange", "bold", "textSize22"),
            new Styling(45, 67, "backgroundColorRed"),
            new Styling(193, 209, "backgroundColorCyan", "bold", "fontSize12"),
        ],
    },
    {
        id: 2,
        content:
            "Vestibulum dictum euismod finibus. Suspendisse varius tellus sem, eu imperdiet sapien sollicitudin sit amet. Mauris a faucibus sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce rutrum ante eu facilisis efficitur.",
        stylings: [
            new Styling(1, 6, ["strikethrough", "italics"]),
            new Styling(105, 125, ["strikethrough", "backgroundColorGreen"]),
        ],
    },
    {
        id: 3,
        content:
            "To be, or not to be: that is the question: Whether ’tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take arms against a sea of troubles, And by opposing end them. To die: to sleep...",

        stylings: [
            new Styling(20, 28, ["bold", "underline"]),
            new Styling(150, 199, ["fontSize12", "bold"]),
        ],
    },
    {
        id: 4,
        content:
            "Vestibulum dictum euismod finibus. Suspendisse varius tellus sem, eu imperdiet sapien sollicitudin sit amet. Mauris a faucibus sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce rutrum ante eu facilisis efficitur.",
        stylings: [
            new Styling(1, 25, [
                "strikethrough",
                "italics",
                "backgroundColorRed",
            ]),
        ],
    },
    {
        id: 5,
        content:
            "To be, or not to be: that is the question: Whether ’tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take arms against a sea of troubles, And by opposing end them. To die: to sleep...",

        stylings: [
            new Styling(3, 30, ["bold", "underline", "backgroundColorOrange"]),
        ],
    },
];

export default testMassives;
