import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'
import { createSystem } from 'frog/ui'
// import { useState } from 'hono/jsx'

const { Image, Text, vars } = createSystem({
  fonts: {
    default: [
      {
        name: 'Poppins',
        source: 'google',
        weight: 400,
      }
    ],
    manrope: [
      {
        name: 'Poppins',
        source: 'google',
        weight: 700,
      },
      {
        name: 'Poppins',
        source: 'google',
        weight: 700,
      }
    ],
  },
  colors: {
    white: '#FFFFFF',
    green: '#58CC02',
    blue: '#2e6cbf'
  }
})

export const app = new Frog({
  hub: neynar({ apiKey: 'NEYNAR_FROG_FM' }),
  title: 'Fruit Machine',
  ui: { vars }
})

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
          padding: '20px',
        }}
      >
        {/* Circular image */}
        <div style={{
          borderRadius: '50%',
          display: 'flex',
          width: '160px',
          height: '160px',
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image src="/duolingo.png" />
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            color: 'white',
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '15px',
          }}
        >
          <Text size="48" weight="700">Lingocaster</Text>
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            color: 'white',
            fontSize: '18px',
            marginBottom: '30px',
            maxWidth: '85%',
          }}
        >
          <Text size="20" font="manrope" weight="400">Learn a new language, earn rewards with streaks, & bet against friends!</Text>

        </div>
      </div>
    ),
    intents: [
      <Button action="/translation">Start learning!</Button>,
    ],
  })
})

app.frame('/translation', (c) => {
  return c.res({
    action: '/phrases',
    image: (
      <div
        style={{
          alignItems: 'flex-start',
          background: '#58CC02',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          padding: '40px',
        }}
      >
        {/* Title */}
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <Text
            font="default"
            size="32"
            weight="700"
            color="white"
          >
            Translation:
          </Text>
        </div>

        {/* White rounded rectangle */}
        <div
          style={{
            display: 'flex',
            background: 'white',
            borderRadius: '15px',
            lineHeight: '1',
            flexGrow: 1,
            padding: '20px',
            width: '100%',
          }}
        >
          {/* Blue sample text */}
          <div style={{ display: 'flex', color: 'black' }}>
            <Text
              font="default"
              size="20"
              color="blue"
            >
              Sample translation text goes here. This is where the translated content will be displayed.
            </Text>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button action="/">Back</Button>,
      <Button>Next</Button>,
    ],
  })
})

app.frame('/phrases', (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'flex-start',
          background: '#58CC02',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          padding: '40px',
        }}
      >
        {/* Title */}
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <Text
            font="default"
            size="32"
            weight="700"
            color="white"
          >
            Here's what each phrase means:
          </Text>
        </div>

        {/* White rounded rectangle */}
        <div
          style={{
            display: 'flex',
            background: 'white',
            borderRadius: '15px',
            lineHeight: '1',
            flexGrow: 1,
            padding: '20px',
            width: '100%',
          }}
        >
          {/* Blue sample text */}
          <div style={{ display: 'flex', color: 'black' }}>
            <Text
              font="default"
              size="20"
              color="blue"
            >
              Sample translation text goes here. This is where the translated content will be displayed.
            </Text>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button action="/translation">Back</Button>,
      <Button action="/quiztime">Next</Button>,
    ],
  })
})

app.frame('/quiztime', (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          padding: '40px',
          justifyContent: 'center',
        }}
      >
        {/* Title */}
        <div style={{ display: 'flex', marginBottom: '8px' }}>
          <Text
            font="default"
            size="64"
            weight="700"
            color="white"
          >
            Quiz Time!
          </Text>
        </div>

        {/* Subtitle */}
        <div style={{ display: 'flex', marginBottom: '10px' }}>
        <Text
          font="default"
          size="24"
          weight="400"
          color="white"
        >
          6 questions
        </Text>
        </div>
      </div>
    ),
    intents: [
      <Button action="/phrases">Back</Button>,
      <Button action="/q1">Start Quiz!</Button>,
    ],
  })
})


app.frame('/q1', (c) => {
  return c.res({
    action: '/q2',
    image: (
      <div
        style={{
          alignItems: 'flex-start',
          background: '#58CC02',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          padding: '40px',
        }}
      >
        {/* Title */}
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <Text
            font="default"
            size="24"
            weight="700"
            color="white"
          >
            What does ___ mean?
          </Text>
        </div>

        {/* White rounded rectangle */}
        <div
          style={{
            display: 'flex',
            background: 'white',
            borderRadius: '15px',
            lineHeight: '1',
            flexGrow: 1,
            padding: '20px',
            width: '100%',
          }}
        >
          {/* Blue sample text */}
          <div style={{ display: 'flex', color: 'black' }}>
            <Text
              font="default"
              size="20"
              color="blue"
            >
              Sample translation text goes here. This is where the translated content will be displayed.
            </Text>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button>a</Button>,
      <Button>b</Button>,
      <Button>c</Button>,
      <Button>d</Button>,
    ],
  })
})

app.castAction("/action", async (c) => {
  return c.frame({ path: '/' })
},
  { name: "Lingo!", icon: "globe" }
);

devtools(app, { serveStatic })
