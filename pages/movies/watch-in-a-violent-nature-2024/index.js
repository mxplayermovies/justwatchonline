import { useRouter } from 'next/router'
import { FaTelegram } from 'react-icons/fa'
import moviesData from '../../../public/movies.json'
import latestData from '../../../public/latest.json'
import { useEffect, useState, useRef } from 'react'
import Pagination from '../../../components/Pagination'
import Head from 'next/head'
import Image from 'next/image'

import Link from 'next/link'
import HomeStyles from '@styles/styles.module.css'
import Script from 'next/script'



const moviesDetail = ({ movie }) => {
  const router = useRouter()
  const { id } = router.query
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 0 // Assume there are 3 pages

  const [latest, setLatest] = useState(latestData)
  const [playerReady, setPlayerReady] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [seconds, setSeconds] = useState(30) // Example timer duration
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const playerRef = useRef(null)
  const currentIndexRef = useRef(0)


  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const videoPlayerRef = useRef(null);

  const ismovie = movie && movie.videotvitem && movie.videotvitem.length > 0;

  const handleNext = () => {
    if (ismovie && currentEpisodeIndex < movie.videotvitem.length - 1) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    } else if (ismovie) {
      setCurrentEpisodeIndex(0);
    }
  };

  const handlePrevious = () => {
    if (ismovie && currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  };

  const parseVideoItem = item => {
    if (!item) return { id: '', thumbnail: '' };
    const [id, params] = item.split('?');
    const thumbnail = new URLSearchParams(params).get('thumbnail');
    return { id, thumbnail };
  };

  const currentVideoItem = ismovie && movie.videotvitem[currentEpisodeIndex]
    ? parseVideoItem(movie.videotvitem[currentEpisodeIndex])
    : { id: '', thumbnail: '' };

  const movieVideoItem = movie && movie.videomoviesitem && movie.videomoviesitem.length > 0
    ? parseVideoItem(movie.videomoviesitem[0])
    : { id: '', thumbnail: '' };

  const src = ismovie
    ? `https://short.ink/${currentVideoItem.id}`
    : `https://short.ink/${movieVideoItem.id}?thumbnail=${movieVideoItem.thumbnail || movieVideoMoviesItem.thumbnail}`;


  useEffect(() => {
    const detectMobileDevice = () => {
      const userAgent =
        typeof window.navigator === 'undefined' ? '' : navigator.userAgent
      const mobile = Boolean(
        userAgent.match(
          /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      )
      setIsMobileDevice(mobile)
    }

    detectMobileDevice()
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0); // Scroll to the top of the page on route change
    };

    // Scroll to top on initial render
    window.scrollTo(0, 0);

    // Listen for route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup event listener on unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  const handleDownloadClick = () => {
    setShowTimer(true)
    setSeconds(30) // Example timer duration
  }

  useEffect(() => {
    let timer
    if (showTimer && seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [showTimer, seconds])

  

  const uwatchfreeSchema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Movies Central™',
      url: 'https://moviescentral.vercel.app/',
      image: ['https://moviescentral.vercel.app/favicon.ico'],
      logo: {
        '@type': 'ImageObject',
        url: 'https://moviescentral.vercel.app/logo.png',
        width: 280,
        height: 100
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://moviescentral.vercel.app/',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://moviescentral.vercel.app/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    }
  ])


  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Movies Central™',
        item: 'https://moviescentral.vercel.app/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Movies',
        item: movie.baseurl
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: movie.name,
        item: movie.siteurl
      }
    ]
  })

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
        '@id': 'https://moviescentral.vercel.app#website',
        url: 'https://moviescentral.vercel.app',
        name: 'Movies Central™',
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'WebPage',
        '@id': `${movie.siteurl}#webpage`,
        url: movie.siteurl,
        name: `${movie.name} | Movies Central™`,
        datePublished: movie.datePublished,
        dateModified: movie.dateModified,
        isPartOf: {
          '@id': 'https://moviescentral.vercel.app#website'
        },
        inLanguage: 'en-US'
      },
      {
        '@type': 'Person',
        '@id': 'https://moviescentral.vercel.app/author/moviescentral/',
        name: 'Dr Trailer',
        url: 'https://moviescentral.vercel.app/author/moviescentral/',
        image: {
          '@type': 'ImageObject',
          '@id': 'https://gravatar.com/drtrailer2022',
          url: 'https://gravatar.com/drtrailer2022',
          caption: 'Dr Trailer',
          inLanguage: 'en-US'
        },
        sameAs: ['https://moviescentral.vercel.app']
      },
      {
        '@type': 'Article',
        '@id': `${movie.siteurl}#article`,
        headline: ` ${movie.name} | Movies Central™`,
        datePublished: movie.datePublished,
        dateModified: movie.dateModified,
        articleSection: 'Movies',
        author: {
          '@id': 'https://moviescentral.vercel.app/author/moviescentral/'
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        description: movie.synopsis,
        image: movie.image,
        name: ` ${movie.name} | Movies Central™`,
        isPartOf: {
          '@id': `${movie.siteurl}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `${movie.siteurl}#webpage`
        }
      
      },
      {
        '@type': 'BlogPosting',
        '@id': `${movie.siteurl}#blogPost`,
        headline: ` ${movie.name} | Movies Central™`,
        datePublished: movie.datePublished,
        dateModified: movie.dateModified,
        articleSection: 'Movies',
        author: {
          '@id': 'https://moviescentral.vercel.app/author/moviescentral/'
        },
        publisher: {
          '@id': 'https://gravatar.com/drtrailer2022/#person'
        },
        description: movie.synopsis,
        image: movie.image,
        name: ` ${movie.name} | Movies Central™`,
        '@id': `${movie.siteurl}#richSnippet`,
        isPartOf: {
          '@id': `${movie.siteurl}#webpage`
        },
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@id': `${movie.siteurl}#webpage`
        }
        
      }
    ]
  })

  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${movie.siteurl}#webpage`, // Add a comma here
    name: movie.title,
    url: movie.siteurl,
    description: movie.synopsis,
    image: movie.image,
    datePublished: movie.startDate,
    potentialAction: {
      '@type': 'WatchAction',
      target: {
        '@type': 'EntryPoint',
        name: movie.title,
        urlTemplate: movie.siteurl
      }
    },
    locationCreated: {
      '@type': 'Place',
      name: movie.country
    },
    author: {
      '@type': 'Person',
      name: 'DrTrailer',
      url: 'https://gravatar.com/drtrailer2022'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Movies Central™',
      logo: {
        '@type': 'ImageObject',
        url: 'https://moviescentral.vercel.app/og_image.jpg'
      }
    },
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Action Platform',
      value: ['Desktop Web Platform', 'iOS Platform', 'Android Platform']
    }
  }

  // Convert newsArticleSchema and videoObjects to JSON strings
  const newsArticleJson = JSON.stringify(newsArticleSchema)

  const ldJsonData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Movie',
    '@id': `${movie.siteurl}`,
    name: movie.title,
    url: movie.siteurl,
    description: movie.synopsis,
    image: movie.image,
    genre: movie.genre,
    datePublished: movie.datePublished,
    director: {
      '@type': 'Person',
      name: movie.directorname
    },
    actor: movie.starring.map(actor => ({
      '@type': 'Person',
      name: actor
    })),
    potentialAction: {
      '@type': 'WatchAction',
      target: {
        '@type': 'EntryPoint',
        name: movie.title,
        urlTemplate: movie.siteurl
      }
    },
    locationCreated: {
      '@type': 'Place',
      name: movie.country
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      '@id': movie.siteurl,
      ratingValue: 8,
      ratingCount: 5,
      bestRating: '10',
      worstRating: '1'
    },
    author: {
      '@type': 'Person',
      name: 'DrTrailer',
      url: 'https://gravatar.com/drtrailer2022'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Movies Central™',
      logo: {
        '@type': 'ImageObject',
        url: 'https://moviescentral.vercel.app/og_image.jpg'
      }
    },
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Action Platform',
      value: ['Desktop Web Platform', 'iOS Platform', 'Android Platform']
    }
  });

  const moviesSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: movie.title,
    description: movie.text,
    uploadDate: movie.datePublished,
    thumbnailUrl: movie.image,
    duration: 'P34S', // Replace with the actual duration if it's different
    embedUrl: movie.videourl
  })

  return (
    <div>
      <Head>
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
     
        <title>Watch Movie In a Violent Nature (2024) | Movies Central™</title>
        <link rel='canonical' href={movie && movie.siteurl} />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index,follow' />
        <meta name='revisit-after' content='1 days' />
        <meta property='og:locale' content='en_US' />
        <meta property="og:type" content="video.movie" />
        <meta property='og:video' content={`${movie && movie.videourl}`} />
        <meta property='og:video:width' content='1280px' />
        <meta property='og:video:height' content='720px' />
        <meta property='og:video:type' content='video/mp4' />
        <meta
          property='og:title'
          content={`${movie && movie.name} - Movies Central™`}
        />
        <meta
          property='og:description'
          content='Welcome to Movies Central™ – Watch and enjoy HD streaming'
        />

        <meta property='og:url' content={`${movie && movie.siteurl}`} />
        <meta
          name='keywords'
          content={`${movie && movie.keywords}`}
        />
        <meta property='og:site_name' content='Movies Central' />
        {/* <meta property='og:type' content='article' /> */}
        <meta
          property=' og:image:alt'
          content={`${movie && movie.group}`}
        />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta property='article:section' content='Movies' />
        <meta name='author' content='admin' />
        <meta
          property='article:modified_time'
          content='2024-01-01T13:13:13+00:00'
        />
        <meta
          property='og:image'
          content={`${movie && movie.image}`}
        />
        <meta property='og:image:width' content='303px' />
        <meta property='og:image:height' content='430px' />
        <meta property='og:image:type' content='image/webp' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:label1' content='Est. reading time' />
        <meta name='twitter:data1' content='1 minute' />
        <meta
          name='google-site-verification'
          content='4dFu4PUk1pc1IYqU6Brt84akCwNxaoUpKSO3gDW0kJ0'
        />
        <meta
          name='facebook-domain-verification'
          content='du918bycikmo1jw78wcl9ih6ziphd7'
        />
        <meta
          name='dailymotion-domain-verification'
          content='dmv6sg06w9r5eji88'
        />

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: ldJsonData }}
        />

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: uwatchfreeSchema }}
        />

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: rankMathSchema }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: newsArticleJson }}
        />
         <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: moviesSchema }}
      />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
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

            webpushr('setup', { 'key': 'BPnvX1gufyeWbUkYBykeaRgy2SGGB5_giiGqUtjX8Y5jzgKOii5z7_0rQcLJKp_me9euk7xhLdibNsjHkvEShPQ' });
          `
          }}
        />
      </Head>
      <Script src='../../propler/ads.js' defer /> 
      <Script src='../../propler/ads2.js' defer /> 
   

      <div
        className={`w-full`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          textAlign: 'center',
          backgroundColor: '#D3D3D3'
        }}
      >
        <h1
          className='text-black bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-3xl'
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            // marginBottom: '12px'
          }}
        >
          {movie.title}
        </h1>

     
      </div>
      <div
        className={`w-full`}
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
          backgroundColor: '#D3D3D3'
        }}
      >
      <div
          className='shadow-lg flex items-center justify-center'
          role='navigation'
        >
          <ul
            id='menu-header-menu'
            className='menu flex flex-wrap justify-center'
          >
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-35' className='menu-home active'>
                <a
                  href='/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Home<span className='p'></span>
                </a>
              </li>
            </button>

            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-284913' className='menu-softwarecategories'>
                <a href='../trailers/'>
                  <h3 className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'>
                    Trailers<span className='p'></span>
                  </h3>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-11610' className='menu-graphicdesign'>
                <a
                  href='../movies/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Movies<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-84' className='menu-antivirus'>
                <a
                  href='../tvshow/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Tv Show<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-84' className='menu-antivirus'>
                <a
                  href='../adult/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Adult<span className='p'></span>
                </a>
              </li>
            </button>
            <button className='border border-black p-2 m-1 hover:bg-orange-100'>
              <li id='menu-item-194' className='menu-tutorials'>
                <a
                  href='../latest/'
                  className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl'
                >
                  Latest News<span className='p'></span>
                </a>
              </li>
            </button>
          </ul>
        </div>
        <a
          href='https://t.me/watchmoviemovies/'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent font-bold text-3xl mt-2 flex items-center justify-center'
          style={{ marginTop: '25px', marginBottom:'25px' }}
        >
          <span className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl hover:text-blue-800 font-bold mt-2'>
            For Request or Demand Movies Join Telegram
            <i className='fab fa-telegram text-blue-600 hover:text-gray-600 ml-2 w-12 h-12 animate-pulse '></i>
          </span>
        </a>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          route='movies'
          style={{
            marginTop: '50px',
            marginBottom: '50px',
            borderRadius: '50px',
            boxShadow: '0 0 10px 0 #fff',
            filter:
              'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
          }}
        />
        <div className='flex-container'>
          <div className='category-container'>
            <Image
              src={movie.image}
              alt={movie.title}
              width={400}
              height={500}
              quality={90}
              
              loading='lazy'
              style={{
                // width: '400px', // Ensures the image is displayed at this width
                // height: '500px', // Ensures the image is displayed at this height
                margin: 'auto',
                marginTop: '50px',
                marginBottom: '20px',
                borderRadius: '50px',
                boxShadow: '0 0 10px 0 #fff',
                filter:
                  'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
              }}
            />
            <div
              style={{ maxWidth: '800px', width: '100%', marginBottom: '20px' }}
            >
        

              <p className='text-black text-bg font-semibold mt-2'>
                Genre: {movie.genre}
              </p>
              <p className='text-black text-bg font-semibold mt-2'>
                Director: {movie.directorname}
              </p>
              <p className='text-black text-bg font-semibold mt-2'>
                Starring: {movie.starring}
              </p>
              <p className='text-black text-bg font-semibold mt-2'>
                Origin Country: {movie.country}
              </p>
              <p className='text-black text-bg font-semibold mt-2'>
                Language: {movie.language}
              </p>

              <div className={`${HomeStyles.imageGrid} mt-5`}>
                <img
                  className={`${HomeStyles.image} img-fluid lazyload `}
                  src={movie.directorimg}
                  alt={movie.directorname}
                  title={movie.directorname}
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
                  src={movie.actor1img}
                  alt={movie.actor1}
                  title={movie.actor1}
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
                  src={movie.actor2img}
                  alt={movie.actor2}
                  title={movie.actor2}
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
                  src={movie.actor3img}
                  alt={movie.actor3}
                  title={movie.actor3}
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
                  src={movie.actor4img}
                  alt={movie.actor4}
                  title={movie.actor4}
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
                  src={movie.actor5img}
                  alt={movie.actor5}
                  title={movie.actor5}
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
           
              <p
                className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-4xl hover:text-blue-800 font-bold mt-2'
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Watch Online {movie.name}
              </p>
              <div
                style={{
                  width: '100%',
                  height: '500px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
                className='rounded-xl mr-8 flex flex-col border-1 border-blue-600 bg-black p-2'
              >
                {ismovie && (
                  <button
                    onClick={handleNext}
                    disabled={
                      currentEpisodeIndex === movie.videotvitem.length - 1
                    }
                    style={{
                      marginBottom: '10px',
                      padding: '8px 16px',
                      backgroundColor: '#51AFF7',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      alignSelf: 'center'
                    }}
                  >
                    Next - Episode{' '}
                    {currentEpisodeIndex === movie.videotvitem.length - 1
                      ? 1
                      : currentEpisodeIndex + 2}
                  </button>
                )}

                <iframe
                  frameBorder='0'
                  src={src}
                  width='100%'
                  height='450px'
                  allowFullScreen
                  scrolling='0'
                  title='Video Player'
                  style={{
                    filter:
                      'contrast(1.2) saturate(1.3) brightness(1.1) hue-rotate(15deg)'
                  }}
                ></iframe>

                <p className='text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-sm'>
                  *Note: Use Setting in Player to improve the Quality of video
                  to HD Quality 1080p.
                </p>

                {ismovie && (
                  <button
                    onClick={handlePrevious}
                    disabled={currentEpisodeIndex === 0}
                    style={{
                      marginTop: '10px',
                      padding: '8px 16px',
                      backgroundColor: '#32CD32',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      alignSelf: 'center'
                    }}
                  >
                    Prev - Episode{' '}
                    {currentEpisodeIndex === 0
                      ? movie.videotvitem.length
                      : currentEpisodeIndex}
                  </button>
                )}

                <img
                  src={
                    ismovie
                      ? currentVideoItem.thumbnail
                      : movieVideoItem.thumbnail
                  }
                  alt='Video Thumbnail'
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: '10px',
                    width: '100px',
                    height: '56px',
                    borderRadius: '10px'
                  }}
                />
              </div>
              <p
                className='px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl hover:text-blue-800 font-bold mt-2'
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
               Click to Download {movie.name}
              </p>
              <div className='flex flex-col items-center justify-center'></div>
              {movie.mp3player && (
                <MP3Player mp3Url={movie.mp3player} />
              )}
              <div
                className='flex flex-col items-center justify-center'
                style={{
                  marginTop: '50px',
                  marginBottom: '50px',
                  filter:
                    'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                }}
              >
                {!showTimer ? (
                  <button
                    onClick={() => setShowTimer(true)}
                    className='animate-pulse bg-gradient-to-r from-amber-500 to-pink-500 text-black font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-2xl'
                  >
                    Download Now
                  </button>
                ) : (
                  <>
                    <p className='text-3xl font-bold mb-4'>
                      Your download link will be ready in {seconds} seconds...
                    </p>

                    <Script src='https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'></Script>
                    <lottie-player
                      src='https://lottie.host/58d9c7ed-a39e-4cb6-b78a-e7cb1f9bf9cd/RHWR24wQSd.json'
                      background='#D3D3D3'
                      speed='1'
                      style={{ width: '250px' }}
                      loop
                      autoplay
                      direction='1'
                      mode='normal'
                    ></lottie-player>
                    <p
                      className='text-3xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-pink-500 text-black py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300'
                      style={{
                        marginTop: '20px'
                      }}
                    >
                      Official Trailer.
                    </p>

                    <div
                      style={{
                        width: '100%',
                        height: '450px',
                        overflow: 'hidden',
                        marginBottom: '20px'
                      }}
                      className='rounded-xl flex border-1 border-blue-600 bg-black p-2  items-center justify-center'
                    >
                      <div
                        itemscope
                        itemtype='https://schema.org/VideoObject'
                        style={{ display: 'none' }}
                      >
                        <meta itemprop='name' content={movie.title} />
                        <meta
                          itemprop='description'
                          content={movie.text}
                        />
                        <meta
                          itemprop='uploadDate'
                          content={movie.datePublished}
                        />
                        <meta
                          itemprop='thumbnailUrl'
                          content={movie.backimage}
                        />
                        <meta itemprop='duration' content='P34S' />
                        <meta
                          itemprop='embedUrl'
                          content={movie.videourl}
                        />
                      </div>
                      <iframe
                        frameborder='0'
                        src={`https://geo.dailymotion.com/player/xkdl0.html?video=${movie.traileritem}&mute=true&Autoquality=1080p`}
                        width='100%'
                        height='100%'
                        allowfullscreen
                        title='Dailymotion Video Player'
                        allow='autoplay; encrypted-media'
                      ></iframe>
                    </div>
                    {showTimer && seconds <= 0 && (
                      <div>
                        {Object.keys(movie)
                          .filter(key => key.startsWith('downloadlink'))
                          .map((key, index) => (
                            <Link
                              key={index}
                              href={movie[key]}
                              target='_blank'
                            >
                              <div
                                className='bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300'
                                style={{
                                  margin: 'auto',
                                  marginBottom: '50px',
                                  borderRadius: '50px',
                                  boxShadow: '0 0 10px 0 #fff',
                                  filter:
                                    'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                                }}
                              >
                                <span
                                  style={{
                                    color:
                                      key === 'downloadlink1'
                                        ? '#FF0000'
                                        : '#0efa06',
                                    fontSize: '24px',
                                    textShadow: '3px 5px 5px #000'
                                  }}
                                >
                                  <i
                                    className={
                                      key === 'downloadlink1'
                                        ? 'fa fa-magnet'
                                        : 'fa fa-download'
                                    }
                                    aria-hidden='true'
                                  ></i>{' '}
                                </span>
                                Click Here to Download {index + 1}
                              </div>
                            </Link>
                          ))}
                      </div>
                    )}
                  </>
                )}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                route='movies'
                style={{
                  marginTop: '50px',
                  marginBottom: '50px',
                  borderRadius: '50px',
                  boxShadow: '0 0 10px 0 #fff',
                  filter:
                    'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                }}
              />
              {/* <div className='flex flex-col items-center justify-center'>
                <p
                  className='bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300  text-bg text-black text-bg  mt-2 text-3xl mb-2 items-center justify-center '
                  style={{
                    marginTop: '50px',
                    filter:
                      'contrast(1.0) saturate(1.0) brightness(1.0) hue-rotate(0deg)'
                  }}
                >
                  <strong> {movie.head1} </strong>
                </p>
              </div> */}
              <Image
                src={movie.image1}
                alt={movie.name}
                width={1280}
                height={720}
                quality={90}
                
                loading='lazy'
                style={{
               
                  margin: 'auto',
                  marginTop: '50px',
                  marginBottom: '20px',
                  borderRadius: '20px',
                  boxShadow: '0 0 10px 0 #fff',
                  filter:
                    'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                }}
              />
              {/* {movie.news1.split('\n\n').map((paragraph, idx) => (
                <p
                  key={idx}
                  className='description text-black font-bold mt-2 text-xl'
                  style={{
                    marginBottom: '10px',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  {paragraph}
                </p>
              ))} */}
              {/* <div className='flex flex-col items-center justify-center'>
                {movie.head2 && (
                  <p className='bg-gradient-to-r from-amber-500 to-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-bg text-black text-bg mt-2 text-3xl mb-2 items-center justify-center'>
                    <strong>{movie.head2}</strong>
                  </p>
                )}

                {movie.image2 && (
                  <Image
                    src={movie.image2}
                    alt={movie.name}
                    width={1280}
                    height={720}
                    quality={90}
                    
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                    }}
                  />
                )}

                {movie.image3 && (
                  <Image
                    src={movie.image3}
                    alt={movie.name}
                    width={1280}
                    height={720}
                    quality={90}
                    
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                    }}
                  />
                )}

                {movie.image4 && (
                  <Image
                    src={movie.image4}
                    alt={movie.name}
                    width={1280}
                    height={720}
                    quality={90}
                    
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                    }}
                  />
                )}

                {movie.image5 && (
                  <Image
                    src={movie.image5}
                    alt={movie.name}
                    width={1280}
                    height={720}
                    quality={90}
                    
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                    }}
                  />
                )}

                {movie.image6 && (
                  <Image
                    src={movie.image6}
                    alt={movie.name}
                    width={1280}
                    height={720}
                    quality={90}
                    
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                    }}
                  />
                )}

                {movie.image7 && (
                  <Image
                    src={movie.image7}
                    alt={movie.name}
                    width={1280}
                    height={720}
                    quality={90}
                    
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                    }}
                  />
                )}

                {movie.image8 && (
                  <Image
                    src={movie.image8}
                    alt={movie.name}
                    width={1280}
                    height={720}
                    quality={90}
                    
                    loading='lazy'
                    style={{
                      width: '800px', // Ensures the image is displayed at this width
                      height: '400px', // Ensures the image is displayed at this height
                      margin: 'auto',
                      marginBottom: '20px',
                      borderRadius: '50px',
                      boxShadow: '0 0 10px 0 #fff',
                      filter:
                        'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                    }}
                  />
                )}
              </div> */}
              {/* </div>
  </div> */}
            </div>
          </div>
          <div className='sidebar'>
            <p
              className='text-black text-2xl font-bold mt-2'
              style={{
                marginTop: '15px',
                color: '#000',
                font: 'bold',
                textShadow: '1px 2px 2px #000'
              }}
            >
              LATEST ENTERTAINMENT NEWS
            </p>
            <div className='categorylatest-container'>
              <div className='cardlatest-container'>
                {latest.map(latestItem => (
                  <div key={latestItem.id} className='cardlatest'>
                    <a href={`/latest/${latestItem.id}`}>
                      <div className='relative'>
                        <Image
                          src={latestItem.image}
                          alt={latestItem.title}
                          className='rounded-lg mx-auto'
                          width={140} // Specify the desired width
                          height={140} // Specify the desired height
                          quality={90}
                          style={{
                            width: '300px', // Ensures the image is displayed at this width
                            height: '300px', // Ensures the image is displayed at this height
                            filter:
                              'contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)'
                          }}
                        />
                        <p className='text-black text-lg font-semibold mt-2'>
                          {latestItem.name}
                        </p>
                        <div className='bg-gradient-to-r from-pink-700 to-blue-700 bg-clip-text text-transparent text-sm font-semibold mt-2'>
                          {latestItem.text}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          /* Global styles */
          body {
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }

          .section-title {
            color: #000;
            font-weight: bold;
            font-size: 30px;
            text-shadow: 3px 5px 5px #000;
            margin-bottom: 20px;
          }

          .flex-container {
            display: flex;
            justify-content: space-between;
          }

          .main-content {
            flex: 3; /* 60% of the width */
          }

          .sidebar {
            flex: 2; /* 40% of the width */
            padding: 10px;
            border-radius: 8px;
            margin-top: 1px;
          }

          .card-container,
          .cardlatest-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }

          .card,
          .cardlatest {
            width: 100%;
            max-width: 100%;
            border: 1px solid #ccc;
            border-radius: 8px;
            overflow: hidden;
          }

          .relative {
            position: relative;
          }

          .badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.4);
            color: #000;
            padding: 5px;
            border-radius: 5px;
            font-weight: bold;
          }

          .card img {
            width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 8px;
          }

          .text-center {
            text-align: center;
          }

          h1 {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 30px;
            line-height: 1;
            height: 30px;
          }

          @media (max-width: 768px) {
            .flex-container {
              flex-direction: column;
            }

            .main-content,
            .sidebar {
              width: 100%;
            }

            .sidebar {
              margin-top: 20px;
            }
          }
        `}</style>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch("https://moviescentral.vercel.app/movies.json");
  const data = await res.json();
  const selectedMovie = data.find((movie) => movie.id === "INDEX17");
  return {
    props: {
      movie: selectedMovie,
    },
  };
}
export default moviesDetail
