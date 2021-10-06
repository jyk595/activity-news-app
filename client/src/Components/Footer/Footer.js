import MailchimpSubscribe from "react-mailchimp-subscribe";

function Footer() {
  const url = `https://gmail.us5.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&amp;id=${process.env.REACT_APP_MAILCHIMP_ID}`

  return(
    <footer>
      <h1 className="footer-h1">
        <span className="footer-logo-span">Activity.</span>
        <span className="footer-logo-span">News</span>
      </h1>
      <div className="mailchimp-container">
        <h3>Get the trendiest news straight to your inbox.</h3>
        <MailchimpSubscribe 
          url={url}
        />
      </div>
      <div className="footer-copyright">
        <p>© 2021 - Made by John Kim</p>
      </div>
    </footer>
  )
}

export default Footer