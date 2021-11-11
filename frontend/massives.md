### Frontend display data for massives

<Massive
                              key={massive._id}
                              author={massive.author.username}
                              displayName={massive.author.displayName}
                              content={massive.text}
                              replies={massive.replies}
                              amps={massive.amplifies}
                              likes={massive.likes}
                              views={massive.viewsFloor}
                              cap={massive.viewsFloor}
                          />

### Benefits of naming policy

1. We always send username and displayName together when massives are concerned.
2. amps is shorter than 'amplifies' and sounds righgt.
