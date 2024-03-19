import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ShareButtons from '@components/ShareButtons';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from "react";
import Script from 'next/script';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const scrollSearch = myKey => {
  window.scrollTo(0, 0);
  frontMatter.handleSearch(myKey);
};

export default function Home({ movie }) {
  const [hovered, setHovered] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (event) => {
    event.preventDefault();
    let searchTermLower = searchTerm.toLowerCase();
    let searchURL = `https://www.google.com/search?q=${encodeURIComponent(searchTermLower)}`;
    router.push(searchURL);
  };
  
  // Inside your component
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [videoRef.current]);

  useEffect(() => {
    if (isMobile && isVisible && isPlaying) {
      videoRef.current.play();
    }
  }, [isMobile, isVisible, isPlaying]);

  const handleVideoClick = () => {
    if (isMobile && !isPlaying) {
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // Your other useEffect code here
    // Initialize Webpushr tracking code
    (function (w, d, s, id) {
      if (typeof (w.webpushr) !== 'undefined') return;
      w.webpushr = w.webpushr || function () { (w.webpushr.q = w.webpushr.q || []).push(arguments) };
      var js, fjs = d.getElementsByTagName(s)[0];
      js = d.createElement(s); js.id = id; js.async = 1;
      js.src = "https://cdn.webpushr.com/app.min.js";
      fjs.parentNode.appendChild(js);
    }(window, document, 'script', 'webpushr-jssdk'));

    webpushr('setup', { 'key': 'BPAY4eP3ztVpPCXE9qfVajNsvYu1uH5najgQ_XROuxAfuf_2oBsIlKWsRr4KiJTHxndjoaXkUrNhVc-Ivel3jKM' });
  }, []);


  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowAd(true);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAdClose = () => {
    setShowAd(false);
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch('/movies.json');
      const data = await response.json();
      setMovies(data);
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    const handleContextmenu = e => {
      e.preventDefault();
    }
    document.addEventListener('contextmenu', handleContextmenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextmenu);
    };
  }, []);

  const rankMathSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://justwatchonline.vercel.app/author/watchmoviesonline/",
        "name": "Dr Trailer",
        "url": "https://justwatchonline.vercel.app/author/watchmoviesonline/",
        "image": {
          "@type": "ImageObject",
          "@id": "https://gravatar.com/drtrailer2022",
          "url": "https://gravatar.com/drtrailer2022",
          "caption": "Dr Trailer",
          "inLanguage": "en-US"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://justwatchonline.vercel.app/#organization",
        "name": "Just Watch Online™",
        "url": "https://justwatchonline.vercel.app"
      },
      {
        "@type": "WebSite",
        "@id": "https://justwatchonline.vercel.app/#website",
        "url": "https://justwatchonline.vercel.app",
        "name": "Just Watch Online™",
        "publisher": {
          "@type": "Organization",
          "@id": "https://justwatchonline.vercel.app/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://justwatchonline.vercel.app/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://justwatchonline.vercel.app/#webpage",
        "url": "https://justwatchonline.vercel.app/",
        "name": "Movie",
        "datePublished": "2024-01-13T13:00:00+00:00",
        "dateModified": "2024-01-13T13:13:00+00:00",
        "about": {
          "@type": "Person",
          "@id": "https://justwatchonline.vercel.app/author/watchmoviesonline/",
          "name": "Dr Trailer",
          "url": "https://justwatchonline.vercel.app/author/watchmoviesonline/",
          "image": {
            "@type": "ImageObject",
            "@id": "https://gravatar.com/drtrailer2022",
            "url": "https://gravatar.com/drtrailer2022",
            "caption": "Dr Trailer",
            "inLanguage": "en-US"
          }
        },
        "isPartOf": {
          "@id": "https://justwatchonline.vercel.app/#website"
        },
        "inLanguage": "en-US",
        "mainEntity": [
          {
            "@type": "Article",
            "@id": "https://justwatchonline.vercel.app/",
            "url": "https://justwatchonline.vercel.app/",
            "headline": "Movie",
            "datePublished": "2024-01-13T13:00:00+00:00",
            "dateModified": "2024-01-13T13:13:00+00:00",
            "author": {
              "@type": "Person",
              "@id": "https://justwatchonline.vercel.app/author/watchmoviesonline/",
              "name": "Dr Trailer",
              "url": "https://justwatchonline.vercel.app/author/watchmoviesonline/",
              "image": {
                "@type": "ImageObject",
                "@id": "https://gravatar.com/drtrailer2022",
                "url": "https://gravatar.com/drtrailer2022",
                "caption": "Dr Trailer",
                "inLanguage": "en-US"
              }
            },
            "publisher": {
              "@type": "Organization",
              "@id": "https://justwatchonline.vercel.app/#organization",
              "name": "Just Watch Online™",
              "url": "https://justwatchonline.vercel.app"
            }
          },
          {
            "@type": "Article",
            "@id": "https://justwatchonline.vercel.app/",
            "url": "https://justwatchonline.vercel.app/",
            "headline": "Tvshow",
            "datePublished": "2024-01-13T13:00:00+00:00",
            "dateModified": "2024-01-13T13:13:00+00:00",
            "author": {
              "@type": "Person",
              "@id": "https://justwatchonline.vercel.app/author/watchmoviesonline/",
              "name": "Dr Trailer",
              "url": "https://justwatchonline.vercel.app/author/watchmoviesonline/",
              "image": {
                "@type": "ImageObject",
                "@id": "https://gravatar.com/drtrailer2022",
                "url": "https://gravatar.com/drtrailer2022",
                "caption": "Dr Trailer",
                "inLanguage": "en-US"
              }
            },
            "publisher": {
              "@type": "Organization",
              "@id": "https://justwatchonline.vercel.app/#organization",
              "name": "Just Watch Online™",
              "url": "https://justwatchonline.vercel.app"
            }
          },
          {
            "@type": "Article",
            "@id": "https://justwatchonline.vercel.app/",
            "url": "https://justwatchonline.vercel.app/",
            "headline": "Adult",
            "datePublished": "2024-01-13T13:00:00+00:00",
            "dateModified": "2024-01-13T13:13:00+00:00",
            "author": {
              "@type": "Person",
              "@id": "https://justwatchonline.vercel.app/author/watchmoviesonline/",
              "name": "Dr Trailer",
              "url": "https://justwatchonline.vercel.app/author/watchmoviesonline/",
              "image": {
                "@type": "ImageObject",
                "@id": "https://gravatar.com/drtrailer2022",
                "url": "https://gravatar.com/drtrailer2022",
                "caption": "Dr Trailer",
                "inLanguage": "en-US"
              }
            },
            "publisher": {
              "@type": "Organization",
              "@id": "https://justwatchonline.vercel.app/#organization",
              "name": "Just Watch Online™",
              "url": "https://justwatchonline.vercel.app"
            }
          }
        ]
      }
    ]
  });
  
  return (
    <div className={`w-full bg-gray-600 shadow`}>
      
      <Script
        src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
        strategy="beforeInteractive"
      />

      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        strategy="beforeInteractive"
      />

      <Script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        strategy="beforeInteractive"
      />

    
      <div className={styles.container}>
      <Head>
  <title> Watch Online Free - The Best Movies & Tv Shows Platform HD </title>
  <link rel="sitemap" type="application/xml" title="Sitemap" href="https://justwatchonline.vercel.app/sitemap.xml" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/x-icon" href="wp-content/uploads/2023/05/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="googlebot" content="index,follow" />
  <meta name="revisit-after" content="1 days" />
  <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
  <meta name="keywords" content="movies, watch movie online, free movies, free movies online, free movie streaming, Just Watch Online free streaming, download free" />
  <meta name="description" content="Watch free movies and TV shows online in HD on any device. We offer streaming movies in genres like Action, Horror, Sci-Fi, Crime and Comedy. Watch now !!!" />
  <link rel="canonical" href="https://justwatchonline.vercel.app/" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Watch Online Free - The Best Movies & Tv Shows Platform HD" />
  <meta property="og:description" content="Watch free movies and TV shows online in HD on any device. We offer streaming movies in genres like Action, Horror, Sci-Fi, Crime and Comedy. Watch now !!!" />
  <meta property="og:url" content="https://justwatchonline.vercel.app/" />
  <meta property="og:site_name" content="Watch Online Free - The Best Movies & Tv Shows Platform HD" />
  <meta property="og:image" content="https://justwatchonline.vercel.app/og_image.jpg" style={{ borderRadius: '10%' }} />
  <meta property="og:image:width" content="1280" />
  <meta property="og:image:height" content="720" />
  <meta property="og:image:type" content="image/webp" />
  <meta name="application-name" content="Just Watch Online" />
  <meta property="article:modified_time" content="2024-01-01T13:13:13+00:00" />
  <link rel="sitemap" type="application/xml" title="Sitemap" href="https://justwatchonline.vercel.app/sitemap.xml" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="google-site-verification" content="RNN2teFhD-lV1TQ9qcLQiSO5BLBB4DmztyYJS6QLqDg" />
  <meta name="facebook-domain-verification" content="du918bycikmo1jw78wcl9ih6ziphd7" />
  <meta name='dailymotion-domain-verification' content='dm0zffs8dj8pcb3gd' />
  <meta name="monetag" content="d37258c385441961edc42bec3fb9b7e8" />
  <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: rankMathSchema }}
        />
</Head>
 
        <main className={styles.main} >
     
     
        <div className="py-8">
          <div id="main">
            <div className="container" style={{ justifyContent: 'center', alignItems: 'center', height: '10vh', marginTop: '10px', marginBottom: '10px' }}>
              <div className="home-main">
                <div className="hm-logo"><a title="" href="https://justwatchonline.vercel.app" id="logo-home"></a></div>
                <div className="addthis_inline_share_toolbox mb10"></div>
                <div id="hm-search">
                  <div id="search-homepage" className="search-content">
                    <form onSubmit={handleSearch}>
                      <input
                        className="form-control search-input"
                        type="text"
                        placeholder="Search.."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                    <div id="search-homepage-results"></div>
                  </div>
                </div>
                <div className="hm-button"><a href="https://justwatchonline.vercel.app/" className="btn btn-lg btn-successful" style={{ color: '#40D7BC', fontSize: '24px', textShadow: '3px 5px 5px #000' }}>Just Watch Online™</a></div>
              </div>
            </div>
          </div>
        </div>
      
        <h1 className="flex flex-col text-center py-5 font-bold text-3xl items-center justify-center" style={{ color: "#40D7BC", textShadow: "5px 5px 2px #000" }}>Just Watch Online™ - The Best Movies Platform HD Movies {movie && movie.title} </h1>
        
          <div className="container mt-0 "  >
      
            <Tabs>
              <TabList className={styles.tabList} >
                <Tab className={`${styles.tab} ${styles.home}`} style={{  fontWeight:'bold', textShadow: '2px 5px 5px #000000' }} >Home</Tab>
                <Tab className={`${styles.tab} ${styles.movies}`} style={{  fontWeight:'bold', textShadow: '2px 5px 5px #000000' }} >Movies</Tab>
                <Tab className={`${styles.tab} ${styles.tvshows}`} style={{  fontWeight:'bold', textShadow: '2px 5px 5px #000000' }} >TV Shows</Tab>
                <Tab className={`${styles.tab} ${styles.adult}`} style={{  fontWeight:'bold', textShadow: '2px 5px 5px #000000' }} >Adult</Tab>
              </TabList>

              <TabPanel>
  <div className={`row ${styles.movieList}`} style={{ display: 'flex', justifyContent: 'center' }}>
    {/* Dummy images for Movies */}
    {movies.map((movie, index) => (
      <div key={index} className={`col-md-3 col-sm-6 mb-3 ${styles.movieContainer}`} style={{ position: 'relative' }}>
        <a href={movie["movie.watch"]} className="w-img">
          <div className={`image-container ${styles.moviePoster}`}>
            <img
              src={movie.image}
              alt={movie.title}
              className={` img-fluid lazyload ${styles.movieImage}`}
              style={{
                filter: 'contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)',
                margin: '0 10px', // Adjust the margin as needed
                borderRadius: '20px', // Set border radius
              }}
              loading="lazy"
            />
            <div  style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '5px', borderRadius: '5px' }}>{movie.badge}</div>
            <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '5px', borderRadius: '5px',  fontSize: '20px', textShadow: '3px 3px 3px #40D7BC' }}>{movie.badgegroup}</div>
            
          </div>
        </a>
      </div>
    ))}
  </div>  
  {/* 
  className='animate-blink'
  color: #1e06fa; 
   justify-content: center;
            align-items: center;
            text-shadow: 3px 5px 5px #1e06fa;
  */}
  {/* <style jsx>{`
          .animate-blink {
            animation: blink 3s infinite;
                   
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
        `}</style> */}

</TabPanel>



<TabPanel>
  <div className={`row ${styles.movieList}`} style={{ display: 'flex', justifyContent: 'center' }}>
    {/* Dummy images for Movies */}
    {movies.filter(movie => movie.group === "movies").map((movie, index) => (
      <div key={index} className={`col-md-3 mb-3 ${styles.movieContainer}`}>
        <a href={movie["movie.watch"]} className="w-img">
          <div className={`image-container ${styles.moviePoster}`}>
            <img
              src={movie.image}
              alt={movie.title}
              className={`img-fluid lazyload ${styles.movieImage} `}
              style={{
                filter: 'contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)',
                margin: '0 10px', // Adjust the margin as needed
                borderRadius: '20px', // Set border radius
              }}
              loading="lazy"
            />
           <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '5px', borderRadius: '5px' }}>{movie.badge}</div>
           <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '5px', borderRadius: '5px', fontSize: '18px', textShadow: '3px 3px 3px #40D7BC'  }}>{movie.genre}</div>
          </div>
        </a>
      </div>
    ))}
  </div>
</TabPanel>

<TabPanel>
  <div className={`row ${styles.movieList}`} style={{ display: 'flex', justifyContent: 'center' }}>
    {/* Dummy images for TV Shows */}
    {movies.filter(movie => movie.group === "tvshow").map((movie, index) => (
      <div key={index} className={`col-md-3 mb-3 ${styles.movieContainer}`}>
        <a href={movie["movie.watch"]} className="w-img">
          <div className={`image-container ${styles.moviePoster}`}>
            <img
              src={movie.image}
              alt={movie.title}
              className={`rounded-2xl curve img-fluid lazyload ${styles.movieImage}`}
              style={{
                filter: 'contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)',
                margin: '0 10px', // Adjust the margin as needed
                borderRadius: '20px', // Set border radius
              }}
              loading="lazy"
            />
              <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '5px', borderRadius: '5px' }}>{movie.badge}</div>
              <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '5px', borderRadius: '5px', fontSize: '18px', textShadow: '3px 3px 3px #40D7BC'   }}>{movie.genre}</div>
          </div>
        </a>
      </div>
    ))}
  </div>
</TabPanel>

<TabPanel>
  <div className={`row ${styles.movieList}`} style={{ display: 'flex', justifyContent: 'center' }}>
    {/* Dummy images for Adult */}
    {movies.filter(movie => movie.group === "adult").map((movie, index) => (
      <div key={index} className={`col-md-3 mb-3 ${styles.movieContainer}`}>
        <a href={movie["movie.watch"]} className="w-img">
          <div className={`image-container ${styles.moviePoster}`}>
            <img
              src={movie.image}
              alt={movie.title}
              className={`rounded-2xl curve img-fluid lazyload ${styles.movieImage}`}
              style={{
                filter: 'contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)',
                margin: '0 10px', // Adjust the margin as needed
                borderRadius: '20px', // Set border radius
              }}
              loading="lazy"
            />
           <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '5px', borderRadius: '5px' }}>{movie.badge}</div>
           <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '5px', borderRadius: '5px', fontSize: '18px', textShadow: '3px 3px 3px #40D7BC'  }}>{movie.genre}</div>
          </div>
        </a>
      </div>
    ))}
  </div>
</TabPanel>

            </Tabs>
          </div>
          
        </main>
      </div>
    </div>
  );
}
