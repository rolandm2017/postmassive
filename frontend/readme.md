## styling -> instruction -> Chunk

A styling object contains an array of styles.

const goodStyling = {25, 50, ["bold", "italic"]}

const malformed = {25, 50, ["bold, italic"]} <-- wrong

In other words, .stylings is an array of strings.

### An Instruction object

...has stylings like ".bold .fontSize22"

We keep it as a string because the classNames accepts a string.

## style, styles, styling, stylings

English is a bad language.

singular = style || styling,
plural = styles || stylings,

## ProcessAmount and convertEngagementText

these are the same function. Prune one. A TODO. You wrote the code twice.
