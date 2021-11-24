## styling -> instruction -> toBeStyled

A styling object contains an array of styles.

const goodStyling = {25, 50, ["bold", "italic"]}

const malformed = {25, 50, ["bold, italic"]} <-- wrong

### An Instruction object

...has stylings like ".bold .fontSize22"

We keep it as a string because the classNames accepts a string.
