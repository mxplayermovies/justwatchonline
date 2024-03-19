import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon,
  } from 'react-share';
  
  
  const ShareButtons = ({ url, title, image }) => {

    
    return (
      <>
      <div className="bg-transparent flex gap-2 justify-center p-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  filter: 'contrast(1.2) saturate(1.5) brightness(1.3) hue-rotate(0deg)'}}>
        <FacebookShareButton url={url} quote={title} hashtag="#drtrailer">
          <FacebookIcon size={48} round />
        </FacebookShareButton>
        
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={48} round />
        </TwitterShareButton>
    
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={48} round />
        </LinkedinShareButton>
    
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon size={48} round />
        </WhatsappShareButton>
    
        <EmailShareButton url={url} subject={title} body="Check this out!">
          <EmailIcon size={48} round />
        </EmailShareButton>
      </div>
    </>
    
    );
  };
  
  export default ShareButtons;
  