import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Add the script tag for the YouTube IFrame Player API */}
          <script src="https://www.youtube.com/iframe_api" />
          {/* Include Bootstrap and Tailwind CSS */}
         
        </Head>
        <body>
                <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
