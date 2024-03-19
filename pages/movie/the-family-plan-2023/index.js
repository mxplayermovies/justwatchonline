import { useEffect, useState, useRef } from 'react'
import Styles from '@styles/video-player.module.css'
import Head from 'next/head'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import HomeStyles from '@styles/styles.module.css'
import ShareButtons from '@components/ShareButtons'
import Rating from '@components/Rating'
import TrendingMovies from '@components/TrendingMovies'
import YouTubeBackground from '@components/YouTubeBackground'
import DailyMotionBackground from '@components/DailyMotionBackground'
import Max from '@components/Max'
import Script from 'next/script'

const the_family_plan_2023 = ({ movie }) => {
  const [movieData, setMovieData] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [messageShown, setMessageShown] = useState(false) // Define messageShown state
  const [showPopup1, setShowPopup1] = useState(false)
  const [showPopup2, setShowPopup2] = useState(false)
  const [showPopup3, setShowPopup3] = useState(false)
  const [showPopupTrailer, setShowPopupTrailer] = useState(false)

  const togglePopup1 = () => {
    setShowPopup1(!showPopup1)
  }

  const togglePopup2 = () => {
    setShowPopup2(!showPopup2)
  }

  const togglePopup3 = () => {
    setShowPopup3(!showPopup3)
  }

  const togglePopupTrailer = () => {
    setShowPopupTrailer(!showPopupTrailer)
  }

  const fetchMovieData = async movieId => {
    try {
      const response = await fetch('/movies.json')
      const data = await response.json()
      const movie = data.find(movie => movie.id === movieId)

      if (movie) {
        return movie
      } else {
        throw new Error(`Movie data not found for ID: ${movieId}`)
      }
    } catch (error) {
      console.error('Error fetching movie data:', error)
      throw error
    }
  }

  useEffect(() => {
    fetchMovieData('INDEX11')
      .then(data => {
        // Do something with the fetched movie data
      })
      .catch(error => {
        console.error('Error fetching movie data:', error)
      })
  }, [])

  // let player

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch('/movies.json')
        const data = await response.json()
        const movie = data.find(movie => movie.id === 'INDEX11')
        setMovieData(movie)
      } catch (error) {
        console.error('Error fetching movie data:', error)
      }
    }

    fetchMovieDetails()
  }, [])

  useEffect(() => {
    const handleContextmenu = e => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return () => {
      document.removeEventListener('contextmenu', handleContextmenu)
    }
  }, [])

  // const fetchMovieJsonLD = movieId => {
  //   return fetch('/movies.json')
  //     .then(response => response.json())
  //     .then(data => {
  //       const movie = data.find(item => item.id === movieId)
  //       if (movie) {
  //         return movie
  //       } else {
  //         throw new Error('Movie data not found for ID: ' + movieId)
  //       }
  //     })
  // }
  // const onYouTubeIframeAPIReady = () => {
  //   var movieId = 'INDEX11'
  //   fetchMovieJsonLD(movieId)
  //     .then(function (movie) {
  //       var videoId = movie.videoId
  //       initializePlayer(videoId)
  //     })
  //     .catch(function (error) {
  //       console.error('Error fetching movie data:', error)
  //     })
  // }

  // const initializePlayer = videoId => {
  //   player = new YT.Player('player', {
  //     width: '100%',
  //     height: '315',

  //     videoId: videoId,
  //     playerVars: {
  //       autoplay: 1,
  //       iv_load_policy: 3,
  //       mute: 1,
  //       modestbranding: 1,
  //       autohide: 1,
  //       showinfo: 0,
  //       rel: 0,
  //       loop: 1,

  //       mode: 'transparent',
  //       playsinline: 1
  //     },
  //     events: {
  //       onReady: onPlayerReady,
  //       onStateChange: onPlayerStateChange
  //     }
  //   })
  // }

  // const onPlayerReady = event => {
  //   event.target.playVideo()
  // }

  // const onPlayerStateChange = event => {
  //   if (event.data == YT.PlayerState.ENDED) {
  //     player.seekTo(0)
  //     player.playVideo()
  //   }
  // }

  // const togglePopup = () => {
  //   setShowPopup(!showPopup)
  //   if (!showPopup) {
  //     onYouTubeIframeAPIReady()
  //   }
  // }

  // const destroyPlayer = () => {

  // }
  // Apply filter to the YouTube player
  //    const playerElement = document.getElementById('player');
  //    if (playerElement) {
  //      playerElement.style.filter = 'contrast(1.2) saturate(1.5) brightness(1.4) hue-rotate(0deg)';
  //    }
  //  }

  // Apply filter to the player element
  // document.getElementById('player').style.filter = 'contrast(1.8) saturate(1.5) brightness(1.4) hue-rotate(0deg)';
  // }

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const audioIframeRef = useRef(null)
  const predefinedEqualizationValue = 70
  const predefinedNoiseReductionValue = 40
  const audioSourceQuality = 'high'
  const enableNoiseCancellation = true

  useEffect(() => {
    const autoAdjustSoundEnhancements = () => {
      const iframeWindow = audioIframeRef.current.contentWindow

      if (iframeWindow && iframeWindow.postMessage) {
        iframeWindow.postMessage(
          {
            command: 'autoAdjustSoundEnhancements',
            equalizationValue: predefinedEqualizationValue,
            noiseReductionValue: predefinedNoiseReductionValue,
            audioSourceQuality: audioSourceQuality
          },
          '*'
        )
      }
    }

    const loadAudioProcessing = () => {
      autoAdjustSoundEnhancements()

      const iframeAudioElement =
        audioIframeRef.current.contentDocument.getElementById('audioPlayer')

      const iframeAudioContext = new (window.AudioContext ||
        window.webkitAudioContext)()
      const sourceNode =
        iframeAudioContext.createMediaElementSource(iframeAudioElement)

      // Noise cancellation processing
      if (enableNoiseCancellation) {
        const noiseCancellationNode = iframeAudioContext.createBiquadFilter()
        noiseCancellationNode.type = 'highpass' // Using high-pass filter for noise cancellation
        noiseCancellationNode.frequency.value = 2000 // Adjust the cutoff frequency as needed (example: 2000 Hz)
        sourceNode.connect(noiseCancellationNode)
        noiseCancellationNode.connect(iframeAudioContext.destination)
      }

      // Load and apply the impulse response (Mills Greek Theater)
      fetch(
        '../wp-content/themes/website/assets/274600-Future-Wave-Rise-01.wav'
      ) // Update with the actual file path
        .then(response => response.arrayBuffer())
        .then(buffer => iframeAudioContext.decodeAudioData(buffer))
        .then(audioBuffer => {
          const convolverNode = iframeAudioContext.createConvolver()
          convolverNode.buffer = audioBuffer
          sourceNode.connect(convolverNode)
          convolverNode.connect(iframeAudioContext.destination)
        })
        .catch(error => console.error('Error loading impulse response:', error))
    }

    if (audioIframeRef.current) {
      audioIframeRef.current.addEventListener('load', loadAudioProcessing)
    }

    return () => {
      if (audioIframeRef.current) {
        audioIframeRef.current.removeEventListener('load', loadAudioProcessing)
      }
    }
  }, [movie, enableNoiseCancellation])

  const loadVideo = (videoPage, contentType, server) => {
    const videoIframe = document.getElementById('videoIframe')

    const userResponse = confirm(
      `Do you want to load ${
        contentType === 'tvshow' ? 'TV Show Episode' : 'Movie'
      } from Server ${server}?`
    )

    if (userResponse) {
      // If the user clicks "OK"
      if (!messageShown) {
        // Display a message (only if it hasn't been shown before)
        alert(
          `Loading ${
            contentType === 'tvshow' ? 'TV Show Episode' : 'Movie'
          } - Selected Server ${server}`
        )
        setMessageShown(true) // Update messageShown state
      }

      // Set the new source after a short delay
      setTimeout(() => {
        videoIframe.src = videoPage
      }, 30) // Adjust the delay as needed
    } else {
      // If the user clicks "Cancel"
      alert('Video loading canceled.')
    }
  }

  if (!movieData) {
    return (
      <div
        style={{
          marginTop: '200px',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '30px',
          width: '300px',
          height: '300px',
          margin: 'auto'
        }}
      >
        <script src='https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'></script>
        <lottie-player
          src='https://lottie.host/e464e1f9-5f31-40e4-aa92-4ac938922fa2/cWvdLv7onO.json'
          background='#fff'
          speed='1'
          style={{ width: '100%', height: '100%' }}
          loop
          autoplay
          direction='1'
          mode='normal'
        ></lottie-player>
      </div>
    )
  }

  const rankMathSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Person', 'Organization'],
        '@id': 'https://gravatar.com/drtrailer2022/#person',
        name: 'Dr Trailer'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://justwatchonline.vercel.app/#website',
        url: 'https://justwatchonline.vercel.app/',
        name: 'Just Watch Online™',
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'WebPage',
        '@id': `/${movie['movie.watch']}#webpage`,
        url: `/${movie['movie.watch']}`,
        name: `${movie.name} | Just Watch Online™`,
        datePublished: '2024-01-13T13:00:00+00:00',
        dateModified: '2024-01-13T13:13:00+00:00',
        isPartOf: {
          '@id': 'https://justwatchonline.vercel.app/#website'
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'Person',
        '@id': 'https://justwatchonline.vercel.app/author/watchmoviesonline/',
        name: 'Dr Trailer',
        url: 'https://justwatchonline.vercel.app/author/watchmoviesonline/',
        image: {
          '@type': 'ImageObject',
          '@id': 'https://gravatar.com/drtrailer2022',
          url: 'https://gravatar.com/drtrailer2022',
          caption: 'Dr Trailer',
          inLanguage: 'en-US'
        },
        sameAs: ['https://justwatchonline.vercel.app/']
      },
      {
        '@type': 'Article',
        '@id': `/${movie['movie.watch']}#article`,
        headline: `Watch ${movie.name} | Just Watch Online™`,
        datePublished: '2024-01-13T13:00:00+00:00',
        dateModified: '2024-01-13T13:13:00+00:00',
        articleSection: 'Movie',
        author: {
          '@id':
            'https://justwatchonline.vercel.app/author/watchmoviesonline/'
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        description: `Just Watch Online | ${movie.name} for free. Where you can find movies of your interest in full HD quality updated on a daily basis. Watch Now or Download Now to Watch Later!`,
        image: movie.image,
        name: `Watch ${movie.name} | Just Watch Online™`,
        isPartOf: {
          '@id': `/${movie['movie.watch']}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `/${movie['movie.watch']}#webpage`
        }
      },
      {
        '@type': 'BlogPosting',
        '@id': `/${movie['movie.watch']}#blogPost`,
        headline: `Watch ${movie.name} | Just Watch Online™`,
        datePublished: '2024-01-13T13:00:00+00:00',
        dateModified: '2024-01-13T13:13:00+00:00',
        articleSection: 'Movie',
        author: {
          '@id':
            'https://justwatchonline.vercel.app/author/watchmoviesonline/'
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        description: `Just Watch Online | ${movie.name} for free. Where you can find movies of your interest in full HD quality updated on a daily basis. Watch Now or Download Now to Watch Later!`,
        image: movie.image,
        name: `Watch ${movie.name} | Just Watch Online™`,
        '@id': `/${movie['movie.watch']}#richSnippet`,
        isPartOf: {
          '@id': `/${movie['movie.watch']}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `/${movie['movie.watch']}#webpage`
        }
      }
    ]
  })

  const ldJsonData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Movie',
    '@id': `${movie['movie.url']}`,
    name: movie.name,
    url: `/${movie['movie.watch']}`,
    description: movie.synopsis,
    image: movie.poster,
    genre: movie.genre,
    datePublished: movie.yearRelease,
    director: {
      '@type': 'Person',
      name: movie.director
    },
    actor: movie.starring.map(actor => ({
      '@type': 'Person',
      name: actor
    })),
    potentialAction: {
      '@type': 'WatchAction',
      target: [
        {
          '@type': 'EntryPoint',
          name: movie.name, // Removed unnecessary conditional
          urlTemplate: `${movie['movie.url']}` // Updated to use movie.watch
        }
      ]
    },
    locationCreated: {
      '@type': 'Place',
      name: movie.country
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: movie.aggregateRating.ratingValue,
      bestRating: movie.aggregateRating.bestRating,
      worstRating: movie.aggregateRating.worstRating,
      ratingCount: movie.aggregateRating.ratingCount
    },
    author: {
      '@type': 'Person', // Updated to remove unnecessary array
      name: 'DrTrailer',
      url: 'https://gravatar.com/drtrailer2022'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Just Watch Online™',
      logo: {
        '@type': 'ImageObject',
        url: 'https://justwatchonline.vercel.app/og_image.jpg'
      }
    },
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Action Platform',
      value: ['Desktop Web Platform', 'iOS Platform', 'Android Platform']
    }
  })

  const trailerSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${movie.name} | Just Watch Online™`,
    description: movie.trailer.description,
    uploadDate: movie.trailer.uploadDate,
    thumbnailUrl: movie.trailer.thumbnail.contentUrl,
    duration: movie.trailer.duration,
    embedUrl: movie.trailer.embedUrl
  })

  return (
    <div>
      <Head>
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <title> Watch {movie && movie.name} | Just Watch Online™</title>
        <link rel='canonical' href={movie && movie.url} />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index,follow' />
        <meta name='revisit-after' content='1 days' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content={`${movie && movie.name} - Just Watch Online™`}
        />
        <meta
          property='og:description'
          content={`${
            movie && movie.name
          } | The Best Movies Platform HD Movies`}
        />
        <meta
          name='description'
          content='Just Watch Online™ is a movie streaming site. Where you can find movies of your interest in full HD quality updated on daily basis. Watch Now or Download Now to Watch Later!'
        />
        <meta property='og:url' content={`${movie && movie.url}`} />
        <meta name='keywords' content={`${movie && movie.keywords}`} />
        <meta property='og:site_name' content='Just Watch Online' />
        <meta property='og:type' content='article' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta property='article:section' content='Movie' />
        <meta name='author' content='admin' />
        <meta
          property='article:modified_time'
          content='2024-01-01T13:13:13+00:00'
        />
        <meta
          property='og:image'
          content={`https://justwatchonline.vercel.app/wp-content/uploads/2023/06/${
            movie && movie.poster
          }`}
        />
        <meta property='og:image:width' content='303' />
        <meta property='og:image:height' content='430' />
        <meta property='og:image:type' content='image/webp' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:label1' content='Est. reading time' />
        <meta name='twitter:data1' content='1 minute' />
        <meta
          name='google-site-verification'
          content='RNN2teFhD-lV1TQ9qcLQiSO5BLBB4DmztyYJS6QLqDg'
        />
        <meta
          name='facebook-domain-verification'
          content='du918bycikmo1jw78wcl9ih6ziphd7'
        />
        <meta
          name='dailymotion-domain-verification'
          content='dmv6sg06w9r5eji88'
        />

        {/* <script src='https://www.youtube.com/iframe_api' /> */}

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: ldJsonData }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: rankMathSchema }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: trailerSchema }}
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
          integrity='sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=='
          crossorigin='anonymous'
          referrerpolicy='no-referrer'
        />
        {/* Webpushr tracking code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function (w, d, s, id) {
              if (typeof (w.webpushr) !== 'undefined') return;
              w.webpushr = w.webpushr || function () { (w.webpushr.q = w.webpushr.q || []).push(arguments) };
              var js, fjs = d.getElementsByTagName(s)[0];
              js = d.createElement(s); js.id = id; js.async = 1;
              js.src = "https://cdn.webpushr.com/app.min.js";
              fjs.parentNode.appendChild(js);
            }(window, document, 'script', 'webpushr-jssdk'));

            webpushr('setup', { 'key': 'BPAY4eP3ztVpPCXE9qfVajNsvYu1uH5najgQ_XROuxAfuf_2oBsIlKWsRr4KiJTHxndjoaXkUrNhVc-Ivel3jKM' });
          `
          }}
        />
      </Head>

      <Script src='../../propler/ads.js' defer />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '20px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
           textAlign: 'center',
          // background: '#4B5563'

          
        }}
      >
        <div style={{ maxWidth: '800px', width: '100%', marginBottom: '20px' }}>
          <img
            src={movieData.image}
            // style={{
            //   filter:
            //     'contrast(1.2) saturate(1.5) brightness(1.4) hue-rotate(0deg)'
            // }}
            alt={movieData.title}
            style={{
              maxWidth: '100%',
              margin: 'auto',
              marginBottom: '20px',
              borderRadius: '50px',
              boxShadow: '0 0 10px 0 #fff',
              filter:
                'contrast(1.2) saturate(1.5) brightness(1.4) hue-rotate(0deg)'
            }}
          />

          <ShareButtons
            url='https://justwatchonline.vercel.app'
            title='The Best Movies Platform HD Movies'
            image='https://justwatchonline.vercel.app/og_image.jpg'
            style={{ marginBottom: '20px' }}
          />
          <h2
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '34px',
              fontWeight: 'bold',
              marginBottom: '10px',
              color: '#40D7BC',
              textShadow: '2px 5px 5px #000000'
            }}
          >
            {movieData.title}
          </h2>

          <p
            style={{
              marginTop: '20px',
              marginBottom: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 5px 5px #000000'
            }}
          >
            {' '}
            Genre: {movieData.genre.join(', ')}{' '}
          </p>
          <p
            style={{
              marginBottom: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 5px 5px #000000'
            }}
          >
            Synopsis: {movieData.synopsis}
          </p>
          <p
            style={{
              marginBottom: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '25px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 5px 5px #000000'
            }}
          >
            Director: {movieData.directorname}
          </p>

          <p
            style={{
              marginBottom: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 5px 5px #000000'
            }}
          >
            <a href={movieData.imdbLink}>IMDb Rating: {movieData.imdbRating}</a>
          </p>
          {/* <p style={{ marginBottom: '10px', fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#40D7BC', textShadow: '2px 5px 5px #000000' }}>IMDb Link: <a href={movieData.imdbLink}>{movieData.imdbLink}</a></p> */}

          <p
            style={{
              marginBottom: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 5px 5px #000000'
            }}
          >
            Average Time: {movieData.avgTime}
          </p>

          <p
            style={{
              marginBottom: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 5px 5px #000000'
            }}
          >
            Country: {movieData.country}
          </p>
          <p
            style={{
              marginBottom: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 5px 5px #000000'
            }}
          >
            Start Date: {movieData.startDate}
          </p>
          <p
            style={{
              marginBottom: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 5px 5px #000000'
            }}
          >
            Content Rating: {movieData.contentRating}
          </p>
          <p
            style={{
              marginBottom: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 5px 5px #000000'
            }}
          >
            Original Network: {movieData.Originalnetwork}
          </p>
          <p
            style={{
              marginBottom: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 5px 5px #000000'
            }}
          >
            Language: {movieData.language}
          </p>
          <p
            style={{
              marginBottom: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 5px 5px #000000'
            }}
          >
            Time: {movieData.time}
          </p>
          <p
            style={{
              marginBottom: '10px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 5px 5px #000000'
            }}
          >
            Starring: {movieData.starring.join(', ')}
          </p>
        </div>
        <Rating />

        <div className={HomeStyles.movieDetails}>
          {movieData && (
            <div>
              <div className={`${HomeStyles.imageGrid} mt-5`}>
                <img
                  className={`${HomeStyles.image} img-fluid lazyload `}
                  src={movieData.directorimg}
                  alt={movieData.directorname}
                  title={movieData.directorname}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    filter: 'contrast(1.2) saturate(1.2)',
                    boxShadow: '0 0 10px 0 #C0C0C0' // Shadow effect with black color
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={movieData.actor1img}
                  alt={movieData.actor1}
                  title={movieData.actor1}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter: 'contrast(1.2) saturate(1.2)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={movieData.actor2img}
                  alt={movieData.actor2}
                  title={movieData.actor2}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter: 'contrast(1.2) saturate(1.2)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={movieData.actor3img}
                  alt={movieData.actor3}
                  title={movieData.actor3}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter: 'contrast(1.2) saturate(1.2)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={movieData.actor4img}
                  alt={movieData.actor4}
                  title={movieData.actor4}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter: 'contrast(1.2) saturate(1.2)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
                <img
                  className={`${HomeStyles.image} img-fluid lazyload`}
                  src={movieData.actor5img}
                  alt={movieData.actor5}
                  title={movieData.actor5}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px 0 #C0C0C0', // Shadow effect with black color
                    filter: 'contrast(1.2) saturate(1.2)'
                  }}
                  loading='lazy'
                  layout='responsive'
                />
              </div>
            </div>
          )}
        </div>
        <DailyMotionBackground movieId="INDEX11" />
        <h1
          className='flex flex-col text-center py-5 font-bold text-3xl items-center justify-center'
          style={{ color: '#40D7BC', textShadow: '5px 5px 2px #000' }}
        >
          Watch Online Movie {movie && movie.title}{' '}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            className='rating-no ml-15 rating-left'
            style={{
              color: '#1e06fa',
              justifyContent: 'center',
              alignItems: 'center',
              textShadow: '3px 5px 5px #1e06fa',
              fontSize: '20px'
            }}
          >
            <i className='fas fa-video animate-blink '></i>{' '}
            <span className='animate-blink'> Full HD 1080P </span>
          </span>
          <span style={{ marginLeft: '25px' }}></span>{' '}
          {/* This creates a gap between the spans */}
          <span
            className='rating-no ml-15 rating-left'
            style={{
              color: '#fae206',
              justifyContent: 'center',
              alignItems: 'center',
              textShadow: '3px 5px 5px #fae206',
              fontSize: '20px'
            }}
          >
            <i className='fas fa-video'></i>
            <span> HD 720P </span>
          </span>
        </div>

        <style jsx>{`
          .animate-blink {
            animation: blink 1s infinite;
            color: #1e06fa;
            justify-content: center;
            align-items: center;
            text-shadow: 3px 5px 5px #1e06fa;
          }

          @keyframes blink {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>

        {/* <div className={Styles['iframe-container']}>
  <iframe id="videoIframe" className="embed-responsive-item rounded-2xl"
    src={movieData.server1} frameborder="0" scrolling="no"
    allowFullScreen mozRequestFullScreen webkitRequestFullscreen style={{ marginTop: '10px' }}></iframe>
 </div> */}

        <h3
          style={{
            marginTop: '10px',
            color: '#40D7BC',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textShadow: '3px 5px 5px #000',
            fontSize: '35px',
            fontWeight: 'bold'
          }}
        >
          <span style={{ fontSize: '34px', textShadow: '2px 5px 5px #000000' }}>
            &#x1F4E1;
          </span>{' '}
          Select Server Tab
        </h3>

        <div className='container mt-0'>
          <Tabs>
            <TabList className={HomeStyles.tabList}>
              <Tab
                className={`${HomeStyles.tab} ${HomeStyles.server1}`}
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textShadow: '2px 5px 5px #000000'
                }}
              >
                Server 1
              </Tab>
              <Tab
                className={`${HomeStyles.tab} ${HomeStyles.server2}`}
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textShadow: '2px 5px 5px #000000'
                }}
              >
                Server 2
              </Tab>
              <Tab
                className={`${HomeStyles.tab} ${HomeStyles.server3}`}
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textShadow: '2px 5px 5px #000000'
                }}
              >
                Server 3
              </Tab>
            </TabList>
            <TabPanel>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                {Array.from({ length: 10 }, (_, episodeNumber) => {
                  const episodeKey = `episode${episodeNumber + 1}sa1ser1`
                  const episodeUrl = movieData[episodeKey]
                  if (!episodeUrl) return null
                  return (
                    <div
                      className='mb-5 mr-3'
                      key={`episode${episodeNumber + 1}`}
                    >
                      <button
                        className='episode-button relative inline-flex items-center rounded-3xl my-5 justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-bold text-gray-900 group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 scale-100 hover:scale-110 cursor-pointer px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0'
                        onClick={togglePopup1}
                      >
                        <span
                          style={{
                            color: '#15f4ee',
                            fontSize: '24px',
                            textShadow: '3px 5px 5px #000'
                          }}
                        >
                          {' '}
                          <i
                            className='fa fa-play-circle'
                            aria-hidden='true'
                          ></i>{' '}
                          Watch Now
                        </span>
                      </button>
                      {showPopup1 && (
                        <div className='popup-overlay'>
                          <div className='popup'>
                            <button
                              className='close-button'
                              onClick={togglePopup1}
                            >
                              <h2 className='relative inline-flex items-center rounded-3xl my-5 justify-center p-0.5 mb-5 mr-2 overflow-hidden text-xl font-bold text-gray-900 group bg-gradient-to-br from-red-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 scale-100 hover:scale-110  cursor-pointer px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0'>
                                Close
                              </h2>
                            </button>
                            <h2
                              className='text-2xl font-bold'
                              style={{
                                color: '#40D7BC',
                                textShadow: '3px 5px 5px #000'
                              }}
                            >
                              Watch Online Movie {movie && movie.name}
                            </h2>
                            <div className={Styles['iframe-container']}>
                              <iframe
                                className='rounded-3xl mr-8 flex border-1 border-blue-600 bg-gray-600 p-2'
                                webkitallowFullScreen
                                mozallowFullScreen
                                allowFullScreen
                                ref={audioIframeRef}
                                id='audioIframe'
                                src={episodeUrl}
                                style={{
                                  filter:
                                    'contrast(1.2) saturate(1.5) brightness(1.3) hue-rotate(0deg)'
                                }}
                              />
                            </div>
                            <p
                              style={{
                                color: '#40D7BC',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textShadow: '3px 5px 5px #000',
                                fontSize: '15px',
                                fontWeight: 'bold'
                              }}
                            >
                              *Note: Use Setting in Player to improve the
                              Quality of video to HD Quality 1080p.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </TabPanel>

            <TabPanel>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                {Array.from({ length: 10 }, (_, episodeNumber) => {
                  const episodeKey = `episode${episodeNumber + 1}sa1ser2`
                  const episodeUrl = movieData[episodeKey]
                  if (!episodeUrl) return null
                  return (
                    <div
                      className='mb-5 mr-3'
                      key={`episode${episodeNumber + 1}`}
                    >
                      <button
                        className='episode-button relative inline-flex items-center rounded-3xl my-5 justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-bold text-gray-900 group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 scale-100 hover:scale-110 cursor-pointer px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0'
                        onClick={togglePopup2}
                      >
                        <span
                          style={{
                            color: '#0efa06',
                            fontSize: '24px',
                            textShadow: '3px 5px 5px #000'
                          }}
                        >
                          {' '}
                          <i
                            className='fa fa-play-circle'
                            aria-hidden='true'
                          ></i>{' '}
                          Watch Now
                        </span>
                      </button>

                      {showPopup2 && (
                        <div className='popup-overlay'>
                          <div className='popup'>
                            <button
                              className='close-button'
                              onClick={togglePopup2}
                            >
                              <h2 className='relative inline-flex items-center rounded-3xl my-5 justify-center p-0.5 mb-5 mr-2 overflow-hidden text-xl font-bold text-gray-900 group bg-gradient-to-br from-red-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 scale-100 hover:scale-110  cursor-pointer px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0'>
                                Close
                              </h2>
                            </button>
                            <h2
                              className='text-2xl font-bold'
                              style={{
                                color: '#40D7BC',
                                textShadow: '3px 5px 5px #000'
                              }}
                            >
                              Watch Online Movie {movie && movie.name}
                            </h2>
                            <div className={Styles['iframe-container']}>
                              <iframe
                                className='  rounded-3xl  mr-8 flex  border-1 border-blue-600 bg-gray-600 p-2 '
                                webkitallowFullScreen
                                mozallowFullScreen
                                allowFullScreen
                                ref={audioIframeRef}
                                id='audioIframe'
                                src={episodeUrl}
                                style={{
                                  filter:
                                    'contrast(1.2) saturate(1.5) brightness(1.3) hue-rotate(0deg)'
                                }}
                              />
                            </div>
                            <p
                              style={{
                                color: '#40D7BC',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textShadow: '3px 5px 5px #000',
                                fontSize: '15px',
                                fontWeight: 'bold'
                              }}
                            >
                              *Note: Use Setting in Player to improve the
                              Quality of video to HD Quality 1080p.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </TabPanel>

            <TabPanel>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                {Array.from({ length: 10 }, (_, episodeNumber) => {
                  const episodeKey = `episode${episodeNumber + 1}sa1ser3`
                  const episodeUrl = movieData[episodeKey]
                  if (!episodeUrl) return null
                  return (
                    <div
                      className='mb-5 mr-3'
                      key={`episode${episodeNumber + 1}`}
                    >
                      <button
                        className='episode-button relative inline-flex items-center rounded-3xl my-5 justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-bold text-gray-900 group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 scale-100 hover:scale-110 cursor-pointer px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0'
                        onClick={togglePopup3}
                      >
                        <span
                          style={{
                            color: '#f80303',
                            fontSize: '24px',
                            textShadow: '3px 5px 5px #000'
                          }}
                        >
                          {' '}
                          <i
                            className='fa fa-play-circle'
                            aria-hidden='true'
                          ></i>{' '}
                          Watch Now
                        </span>
                      </button>

                      {showPopup3 && (
                        <div className='popup-overlay'>
                          <div className='popup'>
                            <button
                              className='close-button'
                              onClick={togglePopup3}
                            >
                              <h2 className='relative inline-flex items-center rounded-3xl my-5 justify-center p-0.5 mb-5 mr-2 overflow-hidden text-xl font-bold text-gray-900 group bg-gradient-to-br from-red-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 scale-100 hover:scale-110  cursor-pointer px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0'>
                                Close
                              </h2>
                            </button>
                            <h2
                              className='text-2xl font-bold'
                              style={{
                                color: '#40D7BC',
                                textShadow: '3px 5px 5px #000'
                              }}
                            >
                              Watch Online Movie {movie && movie.name}
                            </h2>
                            <div className={Styles['iframe-container']}>
                              <iframe
                                className='  rounded-3xl  mr-8 flex  border-1 border-blue-600 bg-gray-600 p-2 '
                                webkitallowFullScreen
                                mozallowFullScreen
                                allowFullScreen
                                ref={audioIframeRef}
                                id='audioIframe'
                                src={episodeUrl}
                                style={{
                                  filter:
                                    'contrast(1.2) saturate(1.5) brightness(1.3) hue-rotate(0deg)'
                                }}
                              />
                            </div>
                            <p
                              style={{
                                color: '#40D7BC',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textShadow: '3px 5px 5px #000',
                                fontSize: '15px',
                                fontWeight: 'bold'
                              }}
                            >
                              *Note: Use Setting in Player to improve the
                              Quality of video to HD Quality 1080p.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </TabPanel>
          </Tabs>
        </div>

        <style jsx>{`
          .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999; /* Set a high z-index value */
          }

          .popup {
            width: 800px;
            background-color: gray;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            animation: slide-down 0.5s ease;
            position: relative; /* Ensure the z-index works */
            z-index: 10000; /* Set a higher z-index value */
          }

          @keyframes slide-down {
            from {
              transform: translateY(-100%);
            }
            to {
              transform: translateY(0);
            }
          }
        `}</style>

        <hr className='my-5' />
        <div className='container mt-5'>
          <Tabs>
            <TabList className={HomeStyles.tabList}>
              <Tab
                className={`${HomeStyles.tab} ${HomeStyles.server1}`}
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textShadow: '2px 5px 5px #000000'
                }}
              >
                server1
              </Tab>
              <Tab
                className={`${HomeStyles.tab} ${HomeStyles.server2}`}
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textShadow: '2px 5px 5px #000000'
                }}
              >
                server2
              </Tab>
              <Tab
                className={`${HomeStyles.tab} ${HomeStyles.server3}`}
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textShadow: '2px 5px 5px #000000'
                }}
              >
                server3
              </Tab>
            </TabList>
            {movieData && (
              <>
                {/* Server 01 content */}
                <TabPanel>
                  <div className='row mx-auto' style={{ marginTop: '5px' }}>
                    <div
                      className='button-container'
                      style={{
                        marginTop: '10px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                      }}
                    >
                      {Array.from({ length: 10 }, (_, episodeNumber) => {
                        const downloadKey = `download${episodeNumber + 1}s1ser1`
                        const downloadLink = movieData[downloadKey]
                        if (!downloadLink) return null
                        return (
                          <div
                            className='mb-5 mr-3'
                            key={`episode${episodeNumber + 1}`}
                          >
                            <a
                              href={downloadLink}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <button className='episode-button relative inline-flex items-center rounded-3xl my-5 justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-bold text-gray-900 group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 scale-100 hover:scale-110 cursor-pointer px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0'>
                                <span
                                  style={{
                                    color: '#15f4ee',
                                    fontSize: '24px',
                                    textShadow: '3px 5px 5px #000'
                                  }}
                                >
                                  <i
                                    className='fa fa-download'
                                    aria-hidden='true'
                                  ></i>{' '}
                                  Download Now
                                </span>
                              </button>
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className='row mx-auto' style={{ marginTop: '5px' }}>
                    <div
                      className='button-container'
                      style={{
                        marginTop: '10px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                      }}
                    >
                      {Array.from({ length: 10 }, (_, episodeNumber) => {
                        const downloadKey = `download${episodeNumber + 1}s1ser2`
                        const downloadLink = movieData && movieData[downloadKey] // Check if movieData exists
                        if (!downloadLink) return null
                        return (
                          <div
                            className='mb-5 mr-3'
                            key={`episode${episodeNumber + 1}`}
                          >
                            <a
                              href={downloadLink}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <button className='episode-button relative inline-flex items-center rounded-3xl my-5 justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-bold text-gray-900 group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 scale-100 hover:scale-110 cursor-pointer px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0'>
                                <span
                                  style={{
                                    color: '#0efa06',
                                    fontSize: '24px',
                                    textShadow: '3px 5px 5px #000'
                                  }}
                                >
                                  <i
                                    className='fa fa-download'
                                    aria-hidden='true'
                                  >
                                    {' '}
                                  </i>{' '}
                                  Download Now
                                </span>
                              </button>
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </TabPanel>
                {/* Server 03 content */}
                <TabPanel>
                  <div className='row mx-auto' style={{ marginTop: '5px' }}>
                    <div
                      className='button-container'
                      style={{
                        marginTop: '10px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                      }}
                    >
                      {Array.from({ length: 10 }, (_, episodeNumber) => {
                        const downloadKey = `download${episodeNumber + 1}s1ser3`
                        const downloadLink = movieData && movieData[downloadKey]
                        if (!downloadLink) return null
                        return (
                          <div
                            className='mb-5 mr-3'
                            key={`episode${episodeNumber + 1}`}
                          >
                            <a
                              href={downloadLink}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <button className='episode-button relative inline-flex items-center rounded-3xl my-5 justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-bold text-gray-900 group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 scale-100 hover:scale-110 cursor-pointer px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0'>
                                <span
                                  style={{
                                    color: '#f80303',
                                    fontSize: '24px',
                                    textShadow: '3px 5px 5px #000'
                                  }}
                                >
                                  Download Now{' '}
                                  <i
                                    className='fa fa-magnet'
                                    aria-hidden='true'
                                  ></i>
                                </span>
                              </button>
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </TabPanel>
              </>
            )}
          </Tabs>
        </div>
        <div className='flex flex-col py-10 text-blue-600 text-center items-center justify-center'>
          <button
            className='episode-button relative inline-flex items-center rounded-3xl my-5 justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-bold text-gray-900 group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 scale-100 hover:scale-110 cursor-pointer px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0'
            onClick={togglePopup}
          >
            <h2 style={{ color: '#15f4ee', textShadow: '3px 5px 5px #000' }}>
              Watch Official Trailer
            </h2>
          </button>
        </div>
        {showPopup && (
          <div className='popup-overlay'>
            <div className='popup'>
              <button className='close-button' onClick={togglePopup}>
                <h2 className='relative inline-flex items-center rounded-3xl my-5 justify-center p-0.5 mb-5 mr-2 overflow-hidden text-xl font-bold text-gray-900 group bg-gradient-to-br from-red-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 scale-100 hover:scale-110  cursor-pointer px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0'>
                  Close
                </h2>
              </button>
              <h2
                className='text-2xl font-bold'
                style={{
                  color: '#40D7BC',
                  textShadow: '3px 5px 5px #000'
                }}
              >
                Official Trailer {movie && movie.name}
              </h2>
              {/* <div
                id='player'
                style={{
                  filter:
                    'contrast(1.2) saturate(1.5) brightness(1.3) hue-rotate(0deg)'
                }}
              ></div> */}
              <div
                style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden'
                }}
              >
                <iframe
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    overflow: 'hidden',
                    filter:
                      'contrast(1.2) saturate(1.5) brightness(1.3) hue-rotate(0deg)'
                  }}
                  className='  rounded-3xl  mr-8 flex  border-1 border-blue-600 bg-gray-600 p-2 '
                  frameborder='0'
                  type='text/html'
                  ref={audioIframeRef}
                  id='audioIframe'
                  src={`https://geo.dailymotion.com/player/xjrxe.html?video=${
                    movie && movie.video
                  }`}
                  width='100%'
                  height='100%'
                  allowfullscreen
                  title='Dailymotion Video Player'
                  allow='autoplay'
                ></iframe>
              </div>

              <p
                style={{
                  color: '#40D7BC',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textShadow: '3px 5px 5px #000',
                  fontSize: '15px',
                  fontWeight: 'bold'
                }}
              >
                *Note: Use Setting in Player to improve the Quality of video to
                HD Quality 1080p.
              </p>
            </div>
          </div>
        )}
        <style jsx>{`
          .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999; /* Set a high z-index value */
          }

          .popup {
            width: 800px;
            background-color: gray;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            animation: slide-down 0.5s ease;
            position: relative; /* Ensure the z-index works */
            z-index: 10000; /* Set a higher z-index value */
          }

          @keyframes slide-down {
            from {
              transform: translateY(-100%);
            }
            to {
              transform: translateY(0);
            }
          }
        `}</style>

        <div class='container1'>
          <ShareButtons
            url='https://justwatchonline.vercel.app'
            title='The Best Movies Platform HD Movies'
            image='https://justwatchonline.vercel.app/og_image.jpg'
          />
        </div>
        <h2
          className='mb-10 animate-pulse'
          style={{
            color: '#40D7BC',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10vh',
            textShadow: '3px 5px 5px #000'
          }}
        >
          &#x1F604;Trending Movies &#128515;
        </h2>

        <TrendingMovies />
        <Max />
        <div class='container1'>
          <ShareButtons
            url='https://justwatchonline.vercel.app'
            title='The Best Movies Platform HD Movies'
            image='https://justwatchonline.vercel.app/og_image.jpg'
          />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps () {
  const res = await fetch('https://justwatchonline.vercel.app/movies.json')
  const data = await res.json()
  const selectedMovie = data.find(movie => movie.id === 'INDEX11')

  return {
    props: {
      movie: selectedMovie
    }
  }
}

export default the_family_plan_2023;
