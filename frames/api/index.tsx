import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'
import { createSystem } from 'frog/ui'
import { handle } from 'frog/vercel'
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
        weight: 500
      }
    ],
  },
  colors: {
    white: '#FFFFFF',
    green: '#58CC02',
    blue: '#2e6cbf',
    red: '#892827'
  }
})

export const app = new Frog({
  title: 'Lingocaster',
  hub: neynar({ apiKey: 'NEYNAR_FROG_FM' }),
  ui: { vars },
  assetsPath: "/",
  basePath: "/api",
})

// app.use('/*', serveStatic({ root: './public' }))

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
  const answerOptions = ['Apple', 'Banana', 'Cherry', 'Date'];

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
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <Text
            font="default"
            size="24"
            weight="700"
            color="white"
          >
            What does ___ mean?
          </Text>
        </div>

        {/* Answer options */}
        {answerOptions.map((option, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              marginBottom: '15px', 
              marginLeft: '20px',
              borderRadius: '10px',
              padding: '10px',
              width: '100%',
            }}
          >
            <Text
              font="manrope"
              weight="500"
              size="18"
              color="white"
            >
              {`${String.fromCharCode(97 + index)}. ${option}`}
            </Text>
          </div>
        ))}
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

app.frame('/q2', (c) => {
  const answerOptions = ['Bob', 'Mary', 'John', 'Jane'];

  return c.res({
    action: '/q3',
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
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <Text
            font="default"
            size="24"
            weight="700"
            color="white"
          >
            What is the name of the person who is ___?
          </Text>
        </div>

        {/* Answer options */}
        {answerOptions.map((option, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              marginBottom: '15px', 
              marginLeft: '20px',
              borderRadius: '10px',
              padding: '10px',
              width: '100%',
            }}
          >
            <Text
              font="manrope"
              weight="500"
              size="18"
              color="white"
            >
              {`${String.fromCharCode(97 + index)}. ${option}`}
            </Text>
          </div>
        ))}
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

app.frame('/q3', (c) => {
  const answerOptions = ['Red', 'Blue', 'Green', 'Yellow'];

  return c.res({
    action: '/q4',
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
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <Text
            font="default"
            size="24"
            weight="700"
            color="white"
          >
            What is the color of the sky?
          </Text>
        </div>

        {/* Answer options */}
        {answerOptions.map((option, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              marginBottom: '15px', 
              marginLeft: '20px',
              borderRadius: '10px',
              padding: '10px',
              width: '100%',
            }}
          >
            <Text
              font="manrope"
              weight="500"
              size="18"
              color="white"
            >
              {`${String.fromCharCode(97 + index)}. ${option}`}
            </Text>
          </div>
        ))}
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

app.frame('/q4', (c) => {
  const answerOptions = ['True', 'False'];

  return c.res({
    action: '/q5',
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
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <Text
            font="default"
            size="24"
            weight="700"
            color="white"
          >
            The sky is always blue.
          </Text>
        </div>

        {/* Answer options */}
        {answerOptions.map((option, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              marginBottom: '15px', 
              marginLeft: '20px',
              borderRadius: '10px',
              padding: '10px',
              width: '100%',
            }}
          >
            <Text
              font="manrope"
              weight="500"
              size="18"
              color="white"
            >
              {`${String.fromCharCode(97 + index)}. ${option}`}
            </Text>
          </div>
        ))}
      </div>
    ),
    intents: [
      <Button value="true">True</Button>,
      <Button value="false">False</Button>,
    ],
  })
})

app.frame('/q5', (c) => {
  const answerOptions = ['True', 'False'];

  return c.res({
    action: '/points',
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
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <Text
            font="default"
            size="24"
            weight="700"
            color="white"
          >
            The product of 2 and 2 is 3.
          </Text>
        </div>

        {/* Answer options */}
        {answerOptions.map((option, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              marginBottom: '15px', 
              marginLeft: '20px',
              borderRadius: '10px',
              padding: '10px',
              width: '100%',
            }}
          >
            <Text
              font="manrope"
              weight="500"
              size="18"
              color="white"
            >
              {`${String.fromCharCode(97 + index)}. ${option}`}
            </Text>
          </div>
        ))}
      </div>
    ),
    intents: [
      <Button value="true">True</Button>,
      <Button value="false">False</Button>,
    ],
  })
})

app.frame('/points', (c) => {
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
          lineHeight: '0.9',
        }}
      >
        {/* Title */}
        <div style={{ display: 'flex' }}>
          <Text
            font="default"
            size="64"
            weight="700"
            color="white"
          >
            +500
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
          points!
        </Text>
        </div>
        {/* <div style={{ display: 'flex', marginTop: '50px' }}>
        <Text
          font="default"
          size="24"
          weight="400"
          color="white"
        >
          You're now at 1000 points
        </Text>
        </div> */}
      </div>
    ),
    intents: [
      <Button action="/streak">Next</Button>,
    ],
  })
})

app.frame('/streak', (c) => {
  const num = 1;
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: '#e9e0cb',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          padding: '20px',
        }}
      >
        <div style={{
          display: 'flex',
          width: '100%',
          overflow: 'hidden'
        }}>
          <Image src={`/${num}.png`} />
        </div>

        {/* Subtitle */}
        <div style={{ display: 'flex', marginTop: '35px' }}>
        <Text
          font="default"
          size="24"
          weight="500"
          color="red"
        >
          {`You're on a ${num} day streak!`}
        </Text>
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://google.com">Mint today's NFT</Button.Link>,
      <Button action="/bet">Next</Button>,
    ],
  })
})

app.frame('/bet', (c) => {
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
          justifyContent: 'flex-start',
        }}
      >
        {/* Title */}
        <div style={{ display: 'flex', marginBottom: '60px', marginTop: '20px' }}>
          <Text
            font="default"
            size="32"
            weight="700"
            color="white"
          >
            Wanna bet...
          </Text>
        </div>

        {/* Two columns */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          width: '100%' 
        }}>
          {/* Left column */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '45%' 
          }}>
            <Text
              font="default"
              size="24"
              weight="700"
              color="white"
            >
              On Yourself
            </Text>
            <div
            style={{ display: 'flex', textAlign: 'center', padding: '10px', marginTop: '10px' }}
            >
            <Text
              font="default"
              size="18"
              weight="400"
              color="white"
              // style={{ textAlign: 'center', marginTop: '10px' }}
            >
              Play for 30 days in a row and earn PYUSD!
            </Text>
            </div>
          </div>

          {/* Right column */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '45%' 
          }}>
            <Text
              font="default"
              size="24"
              weight="700"
              color="white"
            >
              Against a Friend
            </Text>
            <div
            style={{ display: 'flex', textAlign: 'center', padding: '10px', marginTop: '10px' }}
            >
            <Text
              font="default"
              size="18"
              weight="400"
              color="white"
              // style={{ textAlign: 'center', marginTop: '10px' }}
            >
              Bet against a friend and set your own terms in PYUSD!

            </Text>
            </div>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://google.com">Bet on Myself</Button.Link>,
      <Button.Link href="https://google.com">Bet a Friend</Button.Link>,
    ],
  })
})

app.castAction("/action", async (c) => {
  return c.frame({ path: '/' })
},
  { name: "Lingo!", icon: "globe" }
);

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== "undefined";
const isProduction = isEdgeFunction || import.meta.env?.MODE !== "development";
devtools(app, isProduction ? { assetsPath: "/.frog" } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
