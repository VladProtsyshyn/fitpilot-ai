import PropTypes from 'prop-types';

function PageHeading({ image, title, alt }) {
    return (
        <div className="page-heading">
            <img src={image} alt={alt} loading="lazy" />
            <h1>{title}</h1>
        </div>
    );
}

PageHeading.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default PageHeading;
