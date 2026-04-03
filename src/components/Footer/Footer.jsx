import MailIcon from '../icons/MailIcon';
import YouTubeIcon from '../icons/YouTubeIcon';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className="footer-brand">
            <p>FitPilot AI</p>
            <p>Personal fitness and nutrition workspace.</p>
            </div>

            <div className="footer-links">
                <a href="mailto:yourname@example.com" aria-label="Email">
                    <MailIcon />
                </a>

                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                    <YouTubeIcon />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
