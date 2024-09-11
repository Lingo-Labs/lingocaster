import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'
import { useState } from 'hono/jsx'

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  hub: neynar({ apiKey: 'NEYNAR_FROG_FM' }),
  title: 'Fruit Machine',
})

// Add a state variable for the counter
const [counter, setCounter] = useState(0)

app.use('/*', serveStatic({ root: './public' }))

app.frame('/', (c) => {
  return c.res({
    action: '/translation',
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
      
      </div>
    ),
    intents: [
      <Button action="/increment" value="10">Learn More</Button>,
      <Button>Start!</Button>,
    ],
  })
})

app.frame('/translation', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    action: '/',
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {/* Add counter display */}
        <div style={{ display: 'flex', position: 'absolute', top: 10, right: 10, color: 'white', fontSize: 24 }}>
          Counter: {counter}
        </div>
        {/* <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {'Translation'}
        </div> */}
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter custom fruit..." />,
      <Button action="/increment">Increment Counter</Button>,
      <Button value="oranges">Oranges</Button>,
      <Button value="bananas">Bananas</Button>,
      <Button>Back to Home</Button>,
      // <Button.Transaction target="/test">test</Button.Transaction>,
      // status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

// Add a new frame for incrementing the counter
app.frame('/increment', (c) => {
  const { buttonValue } = c

  setCounter(counter + 1)
  return c.res({
    action: '/',
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to right, #432889, #17101F)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div style={{ color: 'white', fontSize: 60 }}>
          {`Counter Incremented! New Value: ${buttonValue}`}
        </div>
      </div>
    ),
    intents: [
      <Button>Back to Home</Button>,
    ],
  })
})

app.castAction("/action", async (c) => {
  return c.frame({ path: '/' })
},
  { name: "Lingo!", icon: "globe" }
);

devtools(app, { serveStatic })
