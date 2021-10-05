import LogoGif from '../../Images/activitynewslogo.gif';

function Home({ setOpenSignupDialog}) {

  function clickGetStarted() {
    setOpenSignupDialog(true)
  }

  return(
    <div className="home-container">
      <div className="left-home-container">
        <div className="home-explanation-container">
          <h2 className="home-explanation-header">Save anything on the internet.</h2>
          <button 
            className="home-get-started-button"
            onClick={clickGetStarted}
          >
            Get started
          </button>
        </div>

        <img 
          src="https://deathtostock.imgix.net/000/004/979/original/DTS_Daniel_Faro%CC%80_In_Focus_004.jpg?w=805&h=537&fit=clip&dpr=1&auto=compress&q=75&ixlib=js-2.3.1&s=d93304a4c176091f4511cbe53007dd5e" 
          alt="blurry yellow"
        />
        
        <img 
          src="https://deathtostock.imgix.net/000/004/712/original/DTS_MARINA_MELENTIEVA_X_CAROLINE_FAYETTE-24.jpg?w=402&h=537&fit=clip&dpr=1&auto=compress&q=75&ixlib=js-2.3.1&s=96bac4fe4909ecd5325ea9982b1c4ee5" 
          alt="oculus glasses"
        />
        <img
          src="https://deathtostock.imgix.net/000/005/239/original/DTS_Fanette-Guilloud_Internet_22.jpg?w=429&h=537&fit=clip&dpr=1&auto=compress&q=75&ixlib=js-2.3.1&s=815d85b0bb6b0e6f764b8ba249f2e7fd"
          alt="orange coils"
        />

        <div className="home-explanation-container">
          <img 
            className="chrome-tab-preview-img"
            src="https://p69.f3.n0.cdn.getcloudapp.com/items/nOuvqQnx/ea144df6-e8d8-48f1-b6a7-a11d8e806dfb.jpg?source=viewer&v=801f6a042e06fcb55456dd6b6a849c61"
            alt="chrome tab preview"
          />
          <p className="home-explanation-p">When our bookmarks and tabs start getting out of control, there's a solution.</p>
        </div>

        <img
          src="https://deathtostock.imgix.net/000/003/502/original/JG0A9936.jpg?w=624&h=416&fit=clip&dpr=1&auto=compress&q=75&ixlib=js-2.3.1&s=5a8fdd5597a92109a51399a5aa75ae8f"
          alt="woman looking at her phone and not working"
        />
        <img
          src="https://deathtostock.imgix.net/000/005/246/original/DTS_Fanette-Guilloud_Internet_29.jpg?w=367&h=460&fit=clip&dpr=1&auto=compress&q=75&ixlib=js-2.3.1&s=83b5df16df3f88db097bb8154abd12ee"
          alt="blue vibes"
        />
      </div>
      
      <div className="right-home-container">
        <img 
          src="https://deathtostock.imgix.net/000/005/236/original/DTS_Fanette-Guilloud_Internet_19.jpg?w=430&h=537&fit=clip&dpr=1&auto=compress&q=75&ixlib=js-2.3.1&s=2d9789cda71c23daacd64c899d1f6121" 
          alt="hand touch"
        />
        <img 
          src={LogoGif}
          alt="moodboard gif"
        />
        <img 
          src="https://deathtostock.imgix.net/000/004/253/original/daniel-faro_DTS_Skin_013.jpg?w=690&h=460&fit=clip&dpr=1&auto=compress&q=75&ixlib=js-2.3.1&s=786139cccb52dadcd9148698e5c65281" 
          alt="water spill"
        />
        <img 
          src="https://deathtostock.imgix.net/000/002/533/original/DeathtoStock_ModernWorkshop-14.jpg?w=350&h=525&fit=clip&dpr=1&auto=compress&q=75&ixlib=js-2.3.1&s=9efd81bd47bf9ac908410aa8583b4984" 
          alt="tech gadgets"
        />
        <img 
          src="https://deathtostock.imgix.net/000/000/774/original/DTS_Writer2.jpg?w=787&h=525&fit=clip&dpr=1&auto=compress&q=75&ixlib=js-2.3.1&s=0dec75c7c7495d5b031d3f800aca98bd" 
          alt="pile of papers"
        />
      </div>
    </div>
  )
}

export default Home;