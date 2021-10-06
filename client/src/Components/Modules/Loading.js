import FadeIn from 'react-fade-in';

import LoadingGif from "../../Images/loading.gif";

function Loading() {
  return(
    <FadeIn>
      <div className="loading-animation-container">
        <img 
          src={LoadingGif}
          alt="logo-gif-animation"  
        />
      </div>
    </FadeIn>
  )
}

export default Loading;