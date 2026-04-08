import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowLeftIcon from '../../components/icons/ArrowLeftIcon';
import ArrowRightIcon from '../../components/icons/ArrowRightIcon';
import './HomePage.css';

const assetBase = import.meta.env.BASE_URL;

const showcaseItems = [
    {
        image: `${assetBase}profile-card.png`,
        title: 'Profile',
        description: 'Create your personal fitness profile and define your health goals.',
    },
    {
        image: `${assetBase}dashboard-card.png`,
        title: 'Dashboard',
        description: 'Review your daily progress, nutrition summary, and recent activity.',
    },
    {
        image: `${assetBase}calculator-card.png`,
        title: 'Calculator',
        description: 'Check BMI, daily calories, and recommendations based on your profile.',
    },
    {
        image: `${assetBase}timer-card.png`,
        title: 'Timer',
        description: 'Use presets and countdown sessions to stay focused during workouts.',
    },
    {
        image: `${assetBase}meals-card.png`,
        title: 'Meals',
        description: 'Organize your meals, keep a simple plan, and stay consistent each day.',
    },
    {
        image: `${assetBase}analyzer-card.png`,
        title: 'Analyzer',
        description: 'Upload food visuals and connect them with your nutrition tracking flow.',
    },
];

function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSlidingOut, setIsSlidingOut] = useState(false);
    const slideTimeoutRef = useRef(null);

    const visibleItems = showcaseItems.slice(currentSlide * 3, currentSlide * 3 + 3);
    const totalSlides = Math.ceil(showcaseItems.length / 3);

    useEffect(() => () => {
        if (slideTimeoutRef.current) {
            clearTimeout(slideTimeoutRef.current);
        }
    }, []);

    const handleSlideChange = (nextSlide) => {
        if (
            nextSlide === currentSlide ||
            nextSlide < 0 ||
            nextSlide >= totalSlides ||
            isSlidingOut
        ) {
            return;
        }

        setIsSlidingOut(true);

        slideTimeoutRef.current = setTimeout(() => {
            setCurrentSlide(nextSlide);
            setIsSlidingOut(false);
        }, 260);
    };

    return (
        <div className="home-page">
            <div className="home-hero">
                <div className="home-welcome">
                    <h2>
                        Welcome to your
                    <br />
                        fitness workspace
                    </h2>
                    <p>
                        Start with your profile, keep your meals and calories in one place,
                        and use the analyzer to turn food photos into daily nutrition data.
                    </p>
                </div>

                <img
                    className="home-hero-visual"
                    src={`${assetBase}hero-visual.png`}
                    alt="FitPilot AI visual"
                />

                <div className="home-actions">
                    <Link to="/profile">Set up profile</Link>
                </div>
            </div>
            <div className="home-showcase-wrapper">
                <div className="showcase-controls">
                    <button
                        type="button"
                        onClick={() => handleSlideChange(currentSlide - 1)}
                        disabled={currentSlide === 0 || isSlidingOut}
                    >
                        <ArrowLeftIcon />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSlideChange(currentSlide + 1)}
                        disabled={currentSlide >= totalSlides - 1 || isSlidingOut}
                    >
                        <ArrowRightIcon />
                    </button>
                </div>
                <div className={`home-showcase ${isSlidingOut ? 'is-exiting' : 'is-entering'}`}>
                    {visibleItems.map((item) => (
                    <div className="showcase-card" key={item.title}>
                        <img src={item.image} alt={`${item.title} page visual`} />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                    ))}
                </div>
                </div>

                <div className="home-insights">
                    <div className="home-insight-card">
                        <h3>Nutrition habits that last</h3>
                        <p>
                            Good nutrition usually starts with repeatable structure, not extreme rules.
                            When meals are simple, balanced, and easy to return to, it becomes much
                            easier to stay consistent through busy days, changing schedules, and
                            imperfect routines.
                        </p>
                        <p>
                            A helpful foundation is to build meals around protein, fiber, and enough
                            energy to support the day. Tracking meals, reviewing calories, and paying
                            attention to how often you eat can gradually improve awareness without
                            turning nutrition into stress.
                        </p>
                    </div>

                    <div className="home-insight-card">
                        <h3>Move with consistency</h3>
                        <p>
                            Fitness progress grows best when movement becomes part of your week, not
                            just a short burst of motivation. Even small sessions can create strong
                            results when they are repeated often and matched to a realistic pace.
                        </p>
                        <p>
                            Timers, short workouts, and visible progress markers can make training
                            easier to continue over time. Instead of chasing perfect performance, it
                            often works better to focus on rhythm, recovery, and steady effort that
                            supports long-term strength and energy.
                        </p>
                    </div>
                </div>

            <div className="home-resources">
                <h2>Learning resources</h2>
                <p>Useful video resources for fitness, nutrition, and healthy habits.</p>
                <div className="resource-link-card">
                    <a
                        href="https://www.youtube.com/watch?v=UItWltVZZmE"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Beginner full body workout
                    </a>
                    <p>Start with a simple full-body session and build a repeatable movement routine.</p>
                    </div>

                    <div className="resource-link-card">
                    <a
                        href="https://www.youtube.com/watch?v=2pLT-olgUJs"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Nutrition basics for beginners
                    </a>
                    <p>Learn the foundations of balanced eating, meal structure, and better food habits.</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
